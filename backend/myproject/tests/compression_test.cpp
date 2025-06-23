#include "./shared/utils.h"
#include <cmath>
#include <cfloat>
#include <cassert>
#include <cstdio>
#include <cstring>
#include <cstdlib>


// === Kahan summation ===
inline void kahan_add(double &sum, double &comp, double in){
    double y = in - comp;
    double t = sum + y;
    comp = (t - sum) - y;
    sum = t;
}

// === G function from UL NIST comments ===
double G(double z, int d, long num_blocks){
    double Ai = 0.0, Ai_comp = 0.0;
    double firstSum = 0.0, firstSum_comp = 0.0;
    long v = num_blocks - d;
    double Ad1;

    long double Bi;
    long double Bterm;
    long double ai;
    long double aiScaled;
    bool underflowTruncate;

    assert(d > 0);
    assert(num_blocks > d);

    Bterm = (1.0L - (long double)z);
    Bi = Bterm;

    for (int i = 2; i <= d; i++) {
        kahan_add(Ai, Ai_comp, log2l((long double)i) * Bi);
        Bi *= Bterm;
    }

    Ad1 = Ai;
    underflowTruncate = false;

    for (long i = d + 1; i <= num_blocks - 1; i++) {
        ai = log2l((long double)i) * Bi;
        kahan_add(Ai, Ai_comp, (double)ai);
        aiScaled = (long double)(num_blocks - i) * ai;
        if ((double)aiScaled > 0.0) {
            kahan_add(firstSum, firstSum_comp, (double)aiScaled);
        } else {
            underflowTruncate = true;
            break;
        }
        Bi *= Bterm;
    }

    kahan_add(firstSum, firstSum_comp, ((double)(num_blocks - d)) * Ad1);

    if (!underflowTruncate) {
        ai = log2l((long double)num_blocks) * Bi;
        kahan_add(Ai, Ai_comp, (double)ai);
    }

    return 1.0 / (double)v * z * (z * firstSum + (Ai - Ad1));
}

double com_exp(double p, unsigned int alph_size, int d, long num_blocks){
    double q = (1.0 - p) / ((double)alph_size - 1.0);
    return G(p, d, num_blocks) + ((double)alph_size - 1.0) * G(q, d, num_blocks);
}

// === Compression Estimate Test ===
double compression_test(uint8_t* data, long len, const int verbose, const char *label){
    int j, d = 1000, b = 6;
    long i, num_blocks = len / b, v;
    unsigned int block, alph_size = 1 << b;
    double X = 0.0, X_comp = 0.0, sigma = 0.0, sigma_comp = 0.0;
    double p, entEst, ldomain, hdomain, lbound, hbound, lvalue, hvalue, pVal, lastP;

    if (num_blocks <= d) {
        return -1.0;
    }

    unsigned int* dict = new unsigned int[alph_size]();
    for (i = 0; i < d; i++) {
        block = 0;
        for (j = 0; j < b; j++) block |= (data[i * b + j] & 0x1) << (b - j - 1);
        dict[block] = i + 1;
    }

    v = num_blocks - d;
    for (i = d; i < num_blocks; i++) {
        block = 0;
        for (j = 0; j < b; j++) block |= (data[i * b + j] & 0x1) << (b - j - 1);
        double logVal = log2(i + 1 - dict[block]);
        kahan_add(X, X_comp, logVal);
        kahan_add(sigma, sigma_comp, logVal * logVal);
        dict[block] = i + 1;
    }

    X /= v;
    sigma = 0.5907 * sqrt(sigma / (v - 1.0) - X * X);
    X -= ZALPHA * sigma / sqrt(v);

    if (com_exp(1.0 / (double)alph_size, alph_size, d, num_blocks) > X) {
        ldomain = 1.0 / (double)alph_size;
        hdomain = 1.0;
        lbound = ldomain;
        hbound = hdomain;
        lvalue = DBL_INFINITY;
        hvalue = -DBL_INFINITY;
        p = (lbound + hbound) / 2.0;
        pVal = com_exp(p, alph_size, d, num_blocks);

        for (j = 0; j < ITERMAX; j++) {
            if (relEpsilonEqual(pVal, X, ABSEPSILON, RELEPSILON, 4)) break;
            if (X < pVal) {
                lbound = p;
                lvalue = pVal;
            } else {
                hbound = p;
                hvalue = pVal;
            }
            if (lbound >= hbound || 
                !(INCLOSEDINTERVAL(lbound, ldomain, hdomain) && INCLOSEDINTERVAL(hbound, ldomain, hdomain)) ||
                !INCLOSEDINTERVAL(X, lvalue, hvalue)) {
                p = ldomain;
                break;
            }
            lastP = p;
            p = (lbound + hbound) / 2.0;
            if (!INOPENINTERVAL(p, lbound, hbound)) {
                p = hbound;
                break;
            }
            if (lastP == p) {
                p = hbound;
                break;
            }
            pVal = com_exp(p, alph_size, d, num_blocks);
            if (!INCLOSEDINTERVAL(pVal, lvalue, hvalue)) {
                p = hbound;
                break;
            }
        }
    } else {
        p = -1.0;
    }

    if (p > 1.0 / (double)alph_size) {
        entEst = -log2(p) / b;
    } else {
        p = 1.0 / (double)alph_size;
        entEst = 1.0;
    }

    delete[] dict;
    return entEst;
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
        cerr << "Usage: compressionTest_exec <binary_string>\n";
        return 1;
    }

    string bit_input = argv[1];
    vector<uint8_t> bit_data = bitstring_to_bytes(bit_input);

    double min_entropy = compression_test(bit_data.data(), bit_data.size(), 1, "Compression");

    // Print ONLY the entropy
    cout << min_entropy << endl;

    if (min_entropy >= 0.997)
        return 1;  // Random
    else
        return 0;  // Non-random
}


