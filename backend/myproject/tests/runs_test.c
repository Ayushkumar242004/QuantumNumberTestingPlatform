#include <stdio.h>
#include <math.h>
#include <stdlib.h>

#define ALPHA 0.01

int *epsilon;

int isNegative(double x) {
    return x < 0.0;
}

int isGreaterThanOne(double x) {
    return x > 1.0;
}

void Runs(int n, int *eps) {
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

    printf("%f\n", p_value);
}

#include <stdio.h>
#include <stdlib.h>

void Runs(int n, int *epsilon); // forward declaration

int main(int argc, char *argv[]) {
    if (argc < 3) {
        fprintf(stderr, "Usage: %s <n> <bit1> <bit2> ...\n", argv[0]);
        return 1;
    }

    int n = atoi(argv[1]);

    if (argc != 3) {
    fprintf(stderr, "Usage: %s <n> <input_file>\n", argv[0]);
    return 1;
}

    int *epsilon = (int *)malloc(n * sizeof(int));
    if (!epsilon) {
        fprintf(stderr, "Memory allocation failed.\n");
        return 1;
    }

    FILE *fp = fopen(argv[2], "r");
    if (!fp) {
        fprintf(stderr, "Failed to open input file.\n");
        free(epsilon);
        return 1;
    }
    for (int i = 0; i < n; i++) {
        fscanf(fp, "%d", &epsilon[i]);
    }
    fclose(fp);

    Runs(n, epsilon);
    free(epsilon);
    return 0;
}
