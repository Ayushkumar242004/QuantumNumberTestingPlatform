#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <gsl/gsl_sf_gamma.h>

#define ALPHA 0.01

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

int *epsilon;

int isNegative(double x) {
    return x < 0.0;
}

int isGreaterThanOne(double x) {
    return x > 1.0;
}

double Runs(int n, int *eps) {
    epsilon = eps;

    int S = 0;
    for (int k = 0; k < n; k++)
        if (epsilon[k])
            S++;

    double pi = (double)S / (double)n;
    double p_value;

    if (fabs(pi - 0.5) > (2.0 / sqrt(n))) {
        p_value = 0.0;
    } else {
        double V = 1;
        for (int k = 1; k < n; k++)
            if (epsilon[k] != epsilon[k - 1])
                V++;

        double erfc_arg = fabs(V - 2.0 * n * pi * (1 - pi)) / 
                          (2.0 * pi * (1 - pi) * sqrt(2 * n));
        p_value = erfc(erfc_arg);
    }

    return p_value; 
}

#include <stdio.h>
#include <stdlib.h>

double Runs(int n, int *epsilon); // forward declaration

int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s <stream_length> <binary_file>\n", argv[0]);
        return 1;
    }

    int n = atoi(argv[1]);
    char *filename = argv[2];

    FILE *fp = fopen(filename, "r");
    if (!fp) {
        perror("File open error");
        return 1;
    }

    int *epsilon = (int *)malloc(MAX_BITS * sizeof(int));
    if (!epsilon) {
        fprintf(stderr, "Memory allocation error.\n");
        fclose(fp);
        return 1;
    }

    int bit, total_bits = 0;
    while (fscanf(fp, "%1d", &bit) == 1 && total_bits < MAX_BITS) {
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
        fprintf(stderr, "Memory allocation error.\n");
        free(epsilon);
        return 1;
    }

    int pass_count = 0;
    for (int i = 0; i < num_streams; i++) {
        double p = Runs(n, &epsilon[i * n]);
        p_values[i] = p;
        if (p >= P_THRESHOLD) pass_count++;
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