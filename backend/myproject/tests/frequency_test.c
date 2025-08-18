#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <gsl/gsl_sf_gamma.h> // For gsl_sf_gamma_inc_Q

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

double frequency_test(int *bits, int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += (bits[i] == 1) ? 1 : -1;
    }

    double s_obs = fabs(sum) / sqrt(n);
    return erfc(s_obs / sqrt(2.0));
}

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
        double p = frequency_test(&epsilon[i * n], n);
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
