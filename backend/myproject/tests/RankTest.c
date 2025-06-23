#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define ALPHA 0.01

typedef unsigned char BitSequence;

// Create a 2D matrix of BitSequence
BitSequence **create_matrix(int rows, int cols) {
    BitSequence **matrix = (BitSequence **)malloc(rows * sizeof(BitSequence *));
    if (!matrix) return NULL;
    for (int i = 0; i < rows; i++) {
        matrix[i] = (BitSequence *)calloc(cols, sizeof(BitSequence));
        if (!matrix[i]) {
            for (int j = 0; j < i; j++) free(matrix[j]);
            free(matrix);
            return NULL;
        }
    }
    return matrix;
}

// Dummy functions for bit tests (you can replace or implement real versions as needed)
int isZero(int x) { return x == 0; }
int isNegative(double x) { return x < 0; }
int isGreaterThanOne(double x) { return x > 1; }

// Set matrix bits from input bits (each matrix is 32x32 bits)
// The k-th 32x32 matrix is filled from the input bit array epsilon.
void def_matrix(int rows, int cols, BitSequence **matrix, int k, const int *epsilon) {
    int start = k * rows * cols;
    for (int i = 0; i < rows; i++)
        for (int j = 0; j < cols; j++)
            matrix[i][j] = epsilon[start + i * cols + j];
}

// Compute rank of 32x32 bit matrix (over GF(2)) using Gaussian elimination
int computeRank(int rows, int cols, BitSequence **matrix) {
    int rank = 0;
    BitSequence **mat = create_matrix(rows, cols);
    if (!mat) return -1; // memory error

    // Copy matrix
    for (int i = 0; i < rows; i++)
        for (int j = 0; j < cols; j++)
            mat[i][j] = matrix[i][j];

    for (int row = 0; row < rows; row++) {
        int pivot_col = -1;
        for (int col = 0; col < cols; col++) {
            if (mat[row][col]) {
                pivot_col = col;
                break;
            }
        }
        if (pivot_col == -1)
            continue;  // No pivot in this row
        rank++;

        // Eliminate below
        for (int i = row + 1; i < rows; i++) {
            if (mat[i][pivot_col]) {
                for (int j = pivot_col; j < cols; j++) {
                    mat[i][j] ^= mat[row][j];
                }
            }
        }
    }

    // Free temporary matrix
    for (int i = 0; i < rows; i++) free(mat[i]);
    free(mat);
    return rank;
}

void RankTest(int n, const int *epsilon) {
    int N = n / (32 * 32);
    double p_value;
    
    if (isZero(N)) {
        printf("RANK TEST\n");
        printf("Error: Insufficient # Of Bits To Define A 32x32 Matrix\n");
        p_value = 0.0;
    } else {
        int r;
        double product, p_32, p_31, p_30;
        double F_32 = 0, F_31 = 0, F_30;
        double chi_squared, arg1;
        
        BitSequence **matrix = create_matrix(32, 32);
        if (!matrix) {
            fprintf(stderr, "Memory allocation failed.\n");
            return;
        }
        
        // Compute probabilities p_32 and p_31
        r = 32;
        product = 1.0;
        for (int i = 0; i <= r - 1; i++) {
            product *= ((1.0 - pow(2.0, i - 32)) * (1.0 - pow(2.0, i - 32))) / (1.0 - pow(2.0, i - r));
        }
        p_32 = pow(2.0, r * (32 + 32 - r) - 32 * 32) * product;
        
        r = 31;
        product = 1.0;
        for (int i = 0; i <= r - 1; i++) {
            product *= ((1.0 - pow(2.0, i - 32)) * (1.0 - pow(2.0, i - 32))) / (1.0 - pow(2.0, i - r));
        }
        p_31 = pow(2.0, r * (32 + 32 - r) - 32 * 32) * product;
        
        p_30 = 1.0 - (p_32 + p_31);
        
        // Calculate frequencies
        for (int k = 0; k < N; k++) {
            def_matrix(32, 32, matrix, k, epsilon);
            int R = computeRank(32, 32, matrix);
            if (R == 32) F_32++;
            else if (R == 31) F_31++;
        }
        F_30 = (double)N - (F_32 + F_31);
        
        // Chi-squared test statistic
        chi_squared = (pow(F_32 - N * p_32, 2) / (N * p_32)) +
                      (pow(F_31 - N * p_31, 2) / (N * p_31)) +
                      (pow(F_30 - N * p_30, 2) / (N * p_30));
        
        arg1 = -chi_squared / 2.0;
        
        p_value = exp(arg1);
       
        if (isNegative(p_value) || isGreaterThanOne(p_value)) {
            printf("WARNING:  P_VALUE IS OUT OF RANGE.\n");
        }
        
        printf("%s\tp_value = %f\n", (p_value < ALPHA) ? "FAILURE" : "SUCCESS", p_value);
        
        // Free matrix
        for (int i = 0; i < 32; i++) free(matrix[i]);
        free(matrix);
    }
}

#include <stdio.h>
#include <stdlib.h>

void RankTest(int n, const int *epsilon);

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <bit_length> <bit1> <bit2> ...\n", argv[0]);
        return 1;
    }
    int n = atoi(argv[1]);
    if (argc != n + 2) {
        fprintf(stderr, "Expected %d bits, got %d.\n", n, argc - 2);
        return 1;
    }

    int *epsilon = malloc(n * sizeof(int));
    if (!epsilon) {
        fprintf(stderr, "Memory allocation failed.\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        epsilon[i] = atoi(argv[i + 2]);
        if (epsilon[i] != 0 && epsilon[i] != 1) {
            fprintf(stderr, "Invalid bit value at position %d: %d\n", i, epsilon[i]);
            free(epsilon);
            return 1;
        }
    }

    RankTest(n, epsilon);
    free(epsilon);
    return 0;
}
