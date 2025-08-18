#include "./shared/utils.h"
#include <cmath>
#include <vector>
#include <string>
#include <iostream>
#include <fstream>

using namespace std;

// Section 6.3.3 - Markov Estimate
double markov_test(uint8_t* data, long len, const int verbose, const char *label){
    if (len <= 1) return -1.0;

    long i, C_0 = 0, C_1, C_00 = 0, C_10 = 0;
    double H_min = 128.0, tmp_min_entropy, P_0, P_1, P_00, P_01, P_10, P_11, entEst;

    for(i = 0; i < len - 1; i++) {
        if(data[i] == 0) {
            C_0++;
            if(data[i+1] == 0) C_00++;
        } else if(data[i+1] == 0) C_10++;
    }

    C_1 = len - 1 - C_0;

    P_00 = (C_0 > 0) ? ((double)C_00 / C_0) : 0.0;
    P_01 = 1.0 - P_00;

    P_10 = (C_1 > 0) ? ((double)C_10 / C_1) : 0.0;
    P_11 = 1.0 - P_10;

    if(data[len - 1] == 0) C_0++;

    P_0 = (double)C_0 / len;
    P_1 = 1.0 - P_0;

    if (P_00 > 0.0) {
        tmp_min_entropy = -log2(P_0) - 127.0 * log2(P_00); 
        if(tmp_min_entropy < H_min) H_min = tmp_min_entropy;
    }

    if(P_01 > 0.0 && P_10 > 0.0) {
        tmp_min_entropy = -log2(P_0) - 64.0 * log2(P_01) - 63.0 * log2(P_10);
        if(tmp_min_entropy < H_min) H_min = tmp_min_entropy;
    }

    if(P_01 > 0.0 && P_11 > 0.0) {
        tmp_min_entropy = -log2(P_0) - log2(P_01) - 126.0 * log2(P_11);
        if(tmp_min_entropy < H_min) H_min = tmp_min_entropy;
    }

    if(P_10 > 0.0 && P_00 > 0.0) {
        tmp_min_entropy = -log2(P_1) - log2(P_10) - 126.0 * log2(P_00);
        if(tmp_min_entropy < H_min) H_min = tmp_min_entropy;
    }

    if(P_10 > 0.0 && P_01 > 0.0) {
        tmp_min_entropy = -log2(P_1) - 64.0 * log2(P_10) - 63.0 * log2(P_01);
        if(tmp_min_entropy < H_min) H_min = tmp_min_entropy;
    }

    if(P_11 > 0.0) {
        tmp_min_entropy = -log2(P_1) - 127.0 * log2(P_11);
        if(tmp_min_entropy < H_min) H_min = tmp_min_entropy;
    }

    entEst = fmin(H_min / 128.0, 1.0);
    return entEst;
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
    if (argc != 2) {
        cerr << "Usage: markovTest_exec <file_path>\n";
        return 0;
    }

    string file_path = argv[1];

    // Read file content
    ifstream infile(file_path);
    if (!infile) {
        cerr << "Error: Could not open file " << file_path << "\n";
        return 0;
    }

    string bit_input;
    infile >> bit_input;  // Reads as one continuous string (0s and 1s)
    infile.close();

    bool is_valid = true;
    vector<uint8_t> bit_data = bitstring_to_bytes(bit_input, is_valid);

    int n = (int)bit_data.size(); // Compute n from data length

    if (!is_valid || n <= 1) {
      
        return 0;
    }

    double min_entropy = markov_test(bit_data.data(), bit_data.size(), 1, "markov");

    cout << min_entropy << endl;

    if (min_entropy == -1.0) return 1;  // Invalid / error
    else if (min_entropy >= 0.997) return 1;  // Random
    else return 0;  // Non-random
}
