#include "./shared/utils.h"
#include <cmath>  // for isnan

#define NUM_WINS 4

// Section 6.3.7 - Multi Most Common in Window (MCW) Prediction Estimate
double multi_mcw_test(uint8_t *data, long len, int alph_size, const int verbose, const char *label){
	int winner;
	int W[NUM_WINS] = {63, 255, 1023, 4095};
	long i, j, k, N, C, run_len, max_run_len, max_pos; 
	long scoreboard[NUM_WINS] = {0};
	long max_cnts[NUM_WINS] = {0};
	std::vector<std::vector<long>> win_cnts(NUM_WINS, std::vector<long>(alph_size, 0));
	std::vector<std::vector<long>> win_poses(NUM_WINS, std::vector<long>(alph_size, 0));
	uint8_t frequent[NUM_WINS];
	
	if(len < W[NUM_WINS-1]+1){
		return -1.0;
	}

	N = len-W[0];
	winner = 0;
	C = 0;
	run_len = 0;
	max_run_len = 0;
	for(i = 0; i < NUM_WINS; i++){
		for(j = 0; j < alph_size; j++){
			win_cnts[i][j] = 0;
			win_poses[i][j] = 0;
		}
	}

	for(i = 0; i < W[NUM_WINS-1]; i++){
		for(j = 0; j < NUM_WINS; j++){
			if(i < W[j]){
				if(max_cnts[j] <= ++win_cnts[j][data[i]]){
					max_cnts[j] = win_cnts[j][data[i]];
					frequent[j] = data[i];
				}
				win_poses[j][data[i]] = i;
			}
		}
	}

	for (i = W[0]; i < len; i++){
		if(frequent[winner] == data[i]){
			C++;
			if(++run_len > max_run_len) max_run_len = run_len;
		}
		else run_len = 0;

		for(j = 0; j < NUM_WINS; j++){
			if((i >= W[j]) && (frequent[j] == data[i])){
				if(++scoreboard[j] >= scoreboard[winner]) winner = j;
			}
		}
	
		for(j = 0; j < NUM_WINS; j++){
			if(i >= W[j]){
				win_cnts[j][data[i-W[j]]]--;
				win_cnts[j][data[i]]++;
				win_poses[j][data[i]] = i;
				if((data[i-W[j]] != frequent[j]) && (max_cnts[j] <= win_cnts[j][data[i]])){
					max_cnts[j] = win_cnts[j][data[i]];
					frequent[j] = data[i];
				}
				else if(data[i-W[j]] == frequent[j]){
					max_cnts[j]--;
					max_pos = i-W[j];
					for(k = 0; k < alph_size; k++){
						if((max_cnts[j] < win_cnts[j][k]) || ((max_cnts[j] == win_cnts[j][k]) && (max_pos <= win_poses[j][k]))){
							max_cnts[j] = win_cnts[j][k];
							frequent[j] = k;
							max_pos = win_poses[j][k];
						}
					}
				}
			}
		}
	}

	return(predictionEstimate(C, N, max_run_len, alph_size, "MultiMCW", verbose, label));
}


vector<uint8_t> bitstring_to_bytes(const string& bitstr, bool& valid) {
    vector<uint8_t> result;
    result.reserve(bitstr.size());
    valid = true;
    for (char c : bitstr) {
        if (c == '0') result.push_back(0);
        else if (c == '1') result.push_back(1);
        else {
            valid = false;
            return {};
        }
    }
    return result;
}

int main(int argc, char* argv[]) {
    if (argc != 2) return 1;

    string bit_input = argv[1];
    bool is_valid = true;
    vector<uint8_t> bit_data = bitstring_to_bytes(bit_input, is_valid);
    if (!is_valid || bit_data.size() <= 1) {
        cout << -1.0 << endl;
        return -1;
    }

    double min_entropy = multi_mcw_test(bit_data.data(), bit_data.size(), 2, 0, "mcw");

    if (std::isnan(min_entropy) || min_entropy == -1.0) {
        cout << -1.0 << endl;
        return -1;
    }

    cout << min_entropy << endl;
    return (min_entropy >= 0.997) ? 1 : 0;
}
