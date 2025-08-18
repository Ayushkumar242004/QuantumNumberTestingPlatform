#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define ALPHA 0.01

#include <gsl/gsl_sf_gamma.h>

#define MAX_BITS 120000000  // 25 million bits (for 24MB binary file)
#define P_THRESHOLD 0.01


double chi_square_uniformity(double *p_values, int num_streams, int bins) {
    int *counts = (int *)calloc(bins, sizeof(int));
    if (counts == NULL) {
        fprintf(stderr, "Memory allocation error.\n");
        exit(1);
    }

    for (int i = 0; i < num_streams; i++) {
        int bin = (int)(p_values[i] * bins);
        if (bin == bins) bin = bins - 1;
        counts[bin]++;
    }

    double expected = (double)num_streams / bins;
    double chi_square = 0.0;

    for (int i = 0; i < bins; i++) {
        double diff = counts[i] - expected;
        chi_square += (diff * diff) / expected;
    }

    free(counts);
    double p_uniform = gsl_sf_gamma_inc_Q((bins - 1) / 2.0, chi_square / 2.0);
    return p_uniform;
}

int isNegative(double x) {
    return x < 0.0;
}

int isGreaterThanOne(double x) {
    return x > 1.0;
}

double expected_value[17] = {
    0, 0, 0, 0, 0, 0, 5.2177052, 6.1962507, 7.1836656,
    8.1764248, 9.1723243, 10.170032, 11.168765,
    12.168070, 13.167693, 14.167488, 15.167379
};

double variance[17] = {
    0, 0, 0, 0, 0, 0, 2.954, 3.125, 3.238, 3.311,
    3.356, 3.384, 3.401, 3.410, 3.416, 3.419, 3.421
};

double Universal(int n, int *epsilon) {
    int i, j, p, L = 5, Q, K;
    double arg, sqrt2, sigma, phi, sum, p_value, c;
    long *T, decRep;

    if (n >= 387840)     L = 6;
    if (n >= 904960)     L = 7;
    if (n >= 2068480)    L = 8;
    if (n >= 4654080)    L = 9;
    if (n >= 10342400)   L = 10;
    if (n >= 22753280)   L = 11;
    if (n >= 49643520)   L = 12;
    if (n >= 107560960)  L = 13;
    if (n >= 231669760)  L = 14;
    if (n >= 496435200)  L = 15;
    if (n >= 1059061760) L = 16;

    Q = 10 * (int)pow(2, L);
    K = (int)(floor(n / L) - Q);
    p = (int)pow(2, L);

    if (L < 6 || L > 16 || Q < 10 * pow(2, L) || (T = (long *)calloc(p, sizeof(long))) == NULL) {
        // Error case - return 0 p-value (fail)
        return 0.0;
    }

    c = 0.7 - 0.8 / L + (4 + 32 / (double)L) * pow(K, -3.0 / L) / 15.0;
    sigma = c * sqrt(variance[L] / (double)K);
    sqrt2 = sqrt(2);
    sum = 0.0;

    for (i = 0; i < p; i++)
        T[i] = 0;

    for (i = 1; i <= Q; i++) {
        decRep = 0;
        for (j = 0; j < L; j++)
            decRep += epsilon[(i - 1) * L + j] * (1 << (L - 1 - j));
        T[decRep] = i;
    }

    for (i = Q + 1; i <= Q + K; i++) {
        decRep = 0;
        for (j = 0; j < L; j++)
            decRep += epsilon[(i - 1) * L + j] * (1 << (L - 1 - j));
        sum += log2(i - T[decRep]);
        T[decRep] = i;
    }

    phi = sum / K;
    arg = fabs(phi - expected_value[L]) / (sqrt2 * sigma);
    p_value = erfc(arg);

    free(T);
    return p_value;
}



#include <stdio.h>
#include <stdlib.h>

double Universal(int n, int *epsilon);

int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s <stream_length> <binary_file>\n", argv[0]);
        return 1;
    }

    int n = atoi(argv[1]);  // Length of each bitstream
    char *filename = argv[2];

    if (n <= 0) {
        fprintf(stderr, "Invalid stream length: must be > 0\n");
        return 1;
    }

    FILE *fp = fopen(filename, "r");
    if (!fp) {
        fprintf(stderr, "Failed to open input file.\n");
        return 1;
    }

    int *epsilon = (int *)malloc(MAX_BITS * sizeof(int));
    if (!epsilon) {
        fprintf(stderr, "Memory allocation failed.\n");
        fclose(fp);
        return 1;
    }

    int bit, total_bits = 0;
    while (fscanf(fp, "%1d", &bit) == 1 && total_bits < MAX_BITS) {
        if (bit != 0 && bit != 1) {
            fprintf(stderr, "Invalid bit in input file.\n");
            free(epsilon);
            fclose(fp);
            return 1;
        }
        epsilon[total_bits++] = bit;
    }
    fclose(fp);

    if (total_bits < n) {
        fprintf(stderr, "Not enough bits for one complete bitstream.\n");
        free(epsilon);
        return 1;
    }

    int num_streams = total_bits / n;
    double *p_values = (double *)malloc(num_streams * sizeof(double));
    if (!p_values) {
        fprintf(stderr, "Memory allocation failed.\n");
        free(epsilon);
        return 1;
    }

    int pass_count = 0;
    for (int i = 0; i < num_streams; i++) {
        double p = Universal(n, &epsilon[i * n]);
        p_values[i] = p;
        if (p >= P_THRESHOLD) {
            pass_count++;
        }
    }

    double proportion = (double)pass_count / num_streams;
    int proportion_pass = proportion >= 0.96;

    double chi_p = chi_square_uniformity(p_values, num_streams, 10);
    int uniformity_pass = chi_p >= P_THRESHOLD;

    int final_pass = (proportion_pass && uniformity_pass) ? 1 : 0;

    printf("%.6f %d\n", chi_p, final_pass);

    free(p_values);
    free(epsilon);
    return 0;
}