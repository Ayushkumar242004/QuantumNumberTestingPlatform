#include <stdio.h>
#include <math.h>
#include <stdlib.h>

#define ALPHA 0.01

double Frequency(int n, int epsilon[]) {
    int i;
    double sum = 0.0;
    for (i = 0; i < n; i++)
        sum += 2 * epsilon[i] - 1;

    double s_obs = fabs(sum) / sqrt(n);
    double f = s_obs / 1.41421356237309504880; // sqrt(2)
    double p_value = erfc(f);
    return p_value;
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Insufficient arguments.\n");
        return 1;
    }

    int n = atoi(argv[1]);
    int *epsilon = (int *)malloc(n * sizeof(int));
    if (epsilon == NULL) {
        fprintf(stderr, "Memory allocation failed.\n");
        return 1;
    }
    for (int i = 0; i < n; i++) {
        epsilon[i] = atoi(argv[i + 2]);
    }

    double p_value = Frequency(n, epsilon);
    printf("%f\n", p_value); // Print to be captured by Django
    free(epsilon);
    return 0;
}