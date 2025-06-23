#include "./shared/utils.h"
#include <map>
#include <array>
#include <vector>
#include <string>
#include <cstring>
#include <cassert>
#include <cmath>
#include <iostream>

using namespace std;

#define D_MMC 16
#define MAX_ENTRIES 100000

static double binaryMultiMMCPredictionEstimate(const uint8_t *S, long L, const int verbose, const char *label) {
    long scoreboard[D_MMC] = {0};
    long *binaryDict[D_MMC];
    long winner = 0;
    long curWinner;
    long curRunOfCorrects = 0;
    long maxRunOfCorrects = 0;
    long correctCount = 0;
    long j, d, i;
    uint32_t curPattern = 0;
    long dictElems[D_MMC] = {0};

    assert(L > 3);
    assert(D_MMC < 31); // to make bit shifts well defined

    // Allocate and zero initialize predictors
    for (j = 0; j < D_MMC; j++) {
        binaryDict[j] = new long[1U << (j + 2)];
        memset(binaryDict[j], 0, sizeof(long) * (1U << (j + 2)));
    }

    // Initialize MMC counts
    for (d = 0; d < D_MMC; d++) {
        curPattern = ((curPattern << 1) | (S[d] & 1));
        (BINARYDICTLOC(d + 1, curPattern))[S[d + 1] & 1] = 1;
        dictElems[d] = 1;
    }

    for (i = 2; i < L; i++) {
        bool found_x = false;
        curWinner = winner;
        curPattern = 0;

        for (d = 0; (d < D_MMC) && (d <= i - 2); d++) {
            uint8_t curPrediction = 2;
            long curCount;
            long *binaryDictEntry;

            curPattern |= ((uint32_t)(S[i - d - 1] & 1) << d);
            binaryDictEntry = BINARYDICTLOC(d + 1, curPattern);

            if ((d == 0) || found_x) {
                if ((binaryDictEntry[0] > binaryDictEntry[1])) {
                    curPrediction = 0;
                    curCount = binaryDictEntry[0];
                } else {
                    curPrediction = 1;
                    curCount = binaryDictEntry[1];
                }
                found_x = (curCount != 0);
            }

            if (found_x) {
                if (curPrediction == S[i]) {
                    scoreboard[d]++;
                    if (scoreboard[d] >= scoreboard[winner]) winner = d;
                    if (d == curWinner) {
                        correctCount++;
                        curRunOfCorrects++;
                        if (curRunOfCorrects > maxRunOfCorrects)
                            maxRunOfCorrects = curRunOfCorrects;
                    }
                } else if (d == curWinner) {
                    curRunOfCorrects = 0;
                }

                if (binaryDictEntry[S[i] & 1] != 0) {
                    binaryDictEntry[S[i] & 1]++;
                } else if (dictElems[d] < MAX_ENTRIES) {
                    binaryDictEntry[S[i] & 1] = 1;
                    dictElems[d]++;
                }
            } else if (dictElems[d] < MAX_ENTRIES) {
                binaryDictEntry[S[i] & 1] = 1;
                dictElems[d]++;
            }
        }
    }

    for (j = 0; j < D_MMC; j++) {
        delete[] binaryDict[j];
    }

    return predictionEstimate(correctCount, L - 2, maxRunOfCorrects, 2, "MultiMMC", verbose, label);
}

// General MultiMMC function for non-binary alphabets
double multi_mmc_test(uint8_t *data, long len, int alph_size, const int verbose, const char *label) {
    if (alph_size == 2) return binaryMultiMMCPredictionEstimate(data, len, verbose, label);

    array<map<array<uint8_t, D_MMC>, PostfixDictionary>, D_MMC> M;
    int winner = 0, cur_winner;
    int entries[D_MMC] = {0};
    long scoreboard[D_MMC] = {0};
    long i, d, N, C = 0, run_len = 0, max_run_len = 0;
    array<uint8_t, D_MMC> x;

    if (len < 3) {
        printf("\t*** Warning: not enough samples to run multiMMC test (need more than %d) ***\n", 3);
        return -1.0;
    }

    N = len - 2;

    memset(x.data(), 0, D_MMC);
    for (d = 0; d < D_MMC; d++) {
        if (d < N) {
            memcpy(x.data(), data, d + 1);
            M[d][x].incrementPostfix(data[d + 1], true);
            entries[d] = 1;
        }
    }

    for (i = 2; i < len; i++) {
        bool found_x = false;
        cur_winner = winner;
        memset(x.data(), 0, D_MMC);

        for (d = 0; (d < D_MMC) && (i - 2 >= d); d++) {
            map<array<uint8_t, D_MMC>, PostfixDictionary>::iterator curp;

            if ((d == 0) || found_x) {
                memcpy(x.data(), data + i - d - 1, d + 1);
                curp = M[d].find(x);
                found_x = (curp != M[d].end());
            }

            if (found_x) {
                long predictCount;
                if (curp->second.predict(predictCount) == data[i]) {
                    if (++scoreboard[d] >= scoreboard[winner]) winner = d;
                    if (d == cur_winner) {
                        C++;
                        if (++run_len > max_run_len) max_run_len = run_len;
                    }
                } else if (d == cur_winner) {
                    run_len = 0;
                }

                if (curp->second.incrementPostfix(data[i], entries[d] < MAX_ENTRIES)) {
                    entries[d]++;
                }
            } else if (entries[d] < MAX_ENTRIES) {
                memcpy(x.data(), data + i - d - 1, d + 1);
                M[d][x].incrementPostfix(data[i], true);
                entries[d]++;
            }
        }
    }

    return predictionEstimate(C, N, max_run_len, alph_size, "MultiMMC", verbose, label);
}

// Converts bit string "010101" to vector<uint8_t>
vector<uint8_t> bitstring_to_bytes(const string &bitstr, bool &valid) {
    vector<uint8_t> result;
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

int main(int argc, char *argv[]) {
    if (argc != 2) return 1;

    string bit_input = argv[1];
    bool is_valid = true;
    vector<uint8_t> bit_data = bitstring_to_bytes(bit_input, is_valid);

    if (!is_valid || bit_data.size() <= 1) {
        cout << -1.0 << endl;
        return -1;
    }

    double min_entropy = multi_mmc_test(bit_data.data(), bit_data.size(), 2, 0, "mmc");

    if (std::isnan(min_entropy) || min_entropy == -1.0  || min_entropy == -0.0 ) {
        cout << -1.0 << endl;
        return -1;
    }

    cout << min_entropy << endl;
    return (min_entropy >= 0.997) ? 1 : 0;
}
