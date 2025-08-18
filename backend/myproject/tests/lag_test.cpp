#include "./shared/utils.h"
#include <fstream>

#define D_LAG 128U
#define LAGMASK (D_LAG-1)

/*Convention:
 * if start==end, the buffer is empty. Start and end values are not ANDed, so range from 0...255
 * This extended range allows for use of all the entries of the buffer
 * See https://www.snellman.net/blog/archive/2016-12-13-ring-buffers/
 * The actual data locations range 0...127
 * start&LAGMASK is the index of the oldest data
 * end&LAGMASK is the index where the *next* data goes.
 */

struct lagBuf {
	uint8_t start;
	uint8_t end;
	long buf[D_LAG];
};

/* Lag prediction estimate (6.3.8)
 * This is a somewhat counter-intuitive approach to this test; the original idea for this approach is due
 * to David Oksner. The straight forward way is simply to check j symbols back for each case (where j runs
 * 1 to 128). It ends up that this is bizarrely slow.
 * This approach is to keep a list of offsets where we encountered each symbol (in a ring buffer,
 * which can store at most D (128) prior elements.
 * For this, one needs only check and update the current symbol's ring buffer, and we only need to spend
 * time looking at values that correspond to counters that must be updated.
 */
double lag_test(uint8_t *S, long L, int k, const int verbose, const char *label) {
	long scoreboard[D_LAG] = {0};
	int winner = 0;
	long curRunOfCorrects = 0;
	long maxRunOfCorrects = 0;
	long correctCount = 0;
	lagBuf *ringBuffers;
	long highScore = 0;

	assert(S != NULL);
	assert(L > 2);
	assert(k >= 2);

	ringBuffers = new lagBuf[k];

	//Flag all the rings as empty
	for (int j = 0; j < k; j++) {
		ringBuffers[j].start = 0;
		ringBuffers[j].end = 0;
	}

	// Account for the very first symbol (there isn't a guess for this one)
	ringBuffers[S[0]].buf[0] = 0;
	ringBuffers[S[0]].start = 0;
	ringBuffers[S[0]].end = 1;

	// The rest of the values yield a prediction
	for (long i = 1; i < L; i++) {
		const uint8_t curSymbol = S[i];
		lagBuf *const curRingBuffer = &(ringBuffers[curSymbol]); // The pointer itself is a constant (not the structure it points to)

		// Check the prediction first
		if (curSymbol == S[i - winner - 1]) {
			correctCount++;
			curRunOfCorrects++;
			if (curRunOfCorrects > maxRunOfCorrects) {
				maxRunOfCorrects = curRunOfCorrects;
			}
		} else {
			curRunOfCorrects = 0;
		}

		// Update counters
		if (curRingBuffer->start != curRingBuffer->end) {
			uint8_t counterIndex = curRingBuffer->end;
			const long cutoff = (i >= D_LAG) ? (i - D_LAG) : 0;  // Cutoff is the oldest stream index that should be present in the buffer

			do {
				counterIndex--;
				if (curRingBuffer->buf[counterIndex&LAGMASK] >= cutoff) {
					long curScore;
					long curOffset;
					curOffset = i - curRingBuffer->buf[counterIndex&LAGMASK] - 1;
					assert(curOffset < D_LAG);
					curScore = ++scoreboard[curOffset];

					if (curScore >= highScore) {
						winner = curOffset;
						highScore = curScore;
					}
				} else {
					// The correct start was the prior symbol (which is the next symbol in the buffer)
					curRingBuffer->start = (uint8_t)(counterIndex + 1U);
					break;
				}
			} while (counterIndex != curRingBuffer->start);
		}

		// Add the new symbol
		// Are we already full? If so, advance the start index.
		if((uint8_t)(curRingBuffer->end - curRingBuffer->start) == D_LAG) curRingBuffer->start++;
		//Add the current offset and adjust the end index
		curRingBuffer->buf[(curRingBuffer->end)&LAGMASK] = i;
		curRingBuffer->end++;
		assert((uint8_t)(curRingBuffer->end - curRingBuffer->start) <= D_LAG);
	}

	delete[] ringBuffers;

	return predictionEstimate(correctCount, L-1, maxRunOfCorrects, k, "Lag", verbose, label);
}
vector<uint8_t> bitstring_to_bytes(const string& bitstr) {
    vector<uint8_t> result;
    result.reserve(bitstr.size());
    for (char c : bitstr) {
        if (c == '0') result.push_back(0);
        else if (c == '1') result.push_back(1);
        else {
            cerr << "Invalid character in bit string: " << c << endl;
            exit(1);
        }
    }
    return result;
}

int main(int argc, char* argv[]) {
    if (argc != 2) {
        cerr << "Usage: lagTest_exec <file_path>\n";
        return 0; // return 0 for any errors
    }

    ifstream infile(argv[1]);
    if (!infile) {
        cerr << "Error opening file\n";
        return 0; // return 0 for any errors
    }

    string bit_input;
    infile >> bit_input;
    infile.close();

    vector<uint8_t> bit_data = bitstring_to_bytes(bit_input);
    if (bit_data.empty()) {
        cerr << "Invalid bit string\n";
        return 0; // return 0 for any errors
    }

    // k = 2 → number of unique symbols: 0, 1
    double min_entropy = lag_test(bit_data.data(), bit_data.size(), 2, 0, "Lag");

    cout << min_entropy << endl;

    if (min_entropy >= 0.997)
        return 1;  // Random
    else
        return 0;  // Non-random
}