#include <iostream>
#include <vector>
#include <cmath>
#include <cstdint>
#include <string>

using namespace std;

#define ZALPHA 1.96

double collision_test(uint8_t* data, long len) {
    long v = 0, i = 0;
    int t_v;
    double X, s = 0.0, p, entEst;

    while (i < len - 1) {
        if (data[i] == data[i + 1])
            t_v = 2;
        else if (i < len - 2)
            t_v = 3;
        else break;

        v++;
        s += t_v * t_v;
        i += t_v;
    }

    if (v < 2) return 0.0;

    X = i / (double)v;
    s = sqrt((s - (i * X)) / (v - 1));
    X -= ZALPHA * s / sqrt(v);
    if (X < 2.0) X = 2.0;

    if (X < 2.5) {
        p = 0.5 + sqrt(1.25 - 0.5 * X);
        entEst = -log2(p);
    } else {
        p = 0.5;
        entEst = 1.0;
    }

    return entEst;
}

vector<uint8_t> bitstring_to_bytes(const string& bits) {
    vector<uint8_t> result;
    for (char c : bits) {
        if (c == '0') result.push_back(0);
        else if (c == '1') result.push_back(1);
        else {
            cerr << "Invalid bit: " << c << endl;
            exit(1);
        }
    }
    return result;
}

int main(int argc, char* argv[]) {
    if (argc != 2) {
        cerr << "Usage: collisionTest_exec <binary_string>\n";
        return 1;
    }

    string bit_input = argv[1];
    vector<uint8_t> bit_data = bitstring_to_bytes(bit_input);
    double min_entropy = collision_test(bit_data.data(), bit_data.size());

    cout << min_entropy << endl;

    if (min_entropy >= 0.997)
        return 1;  // Random
    else
        return 0;  // Non-random
}
