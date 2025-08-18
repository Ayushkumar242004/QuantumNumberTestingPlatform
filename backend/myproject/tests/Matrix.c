#include <stdio.h>
#include <math.h>
#include <string.h>
#include <stdlib.h>
#include "./externs.h"
#include "./cephes.h"
#include "./matrix.h"
#include "./defs.h"
#include "./config.h"
typedef unsigned char BitSequence;

// Declare BitStream as a global variable
BitSequence *BitStream;

#define MATRIX_FORWARD_ELIMINATION 0
#define MATRIX_BACKWARD_ELIMINATION 1


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

int
determine_rank(int m, int M, int Q, BitSequence **A)
{
	int		i, j, rank, allZeroes;
	
	/* DETERMINE RANK, THAT IS, COUNT THE NUMBER OF NONZERO ROWS */
	
	rank = m;
	for ( i=0; i<M; i++ ) {
		allZeroes = 1; 
		for ( j=0; j<Q; j++)  {
			if ( A[i][j] == 1 ) {
				allZeroes = 0;
				break;
			}
		}
		if ( allZeroes == 1 )
			rank--;
	} 
	
	return rank;
}

int computeRank(int M, int Q, BitSequence **matrix)
{
    int i, rank, m = MIN(M, Q);

    /* FORWARD APPLICATION OF ELEMENTARY ROW OPERATIONS */
    for (i = 0; i < m - 1; i++) {
        if (matrix[i][i] == 1)
            perform_elementary_row_operations(MATRIX_FORWARD_ELIMINATION, i, M, Q, matrix);
        else {  /* matrix[i][i] = 0 */
            if (find_unit_element_and_swap(MATRIX_FORWARD_ELIMINATION, i, M, Q, matrix) == 1)
                perform_elementary_row_operations(MATRIX_FORWARD_ELIMINATION, i, M, Q, matrix);
        }
    }

    /* BACKWARD APPLICATION OF ELEMENTARY ROW OPERATIONS */
    for (i = m - 1; i > 0; i--) {
        if (matrix[i][i] == 1)
            perform_elementary_row_operations(MATRIX_BACKWARD_ELIMINATION, i, M, Q, matrix);
        else {  /* matrix[i][i] = 0 */
            if (find_unit_element_and_swap(MATRIX_BACKWARD_ELIMINATION, i, M, Q, matrix) == 1)
                perform_elementary_row_operations(MATRIX_BACKWARD_ELIMINATION, i, M, Q, matrix);
        }
    }

    rank = determine_rank(m, M, Q, matrix);

    return rank;
}

BitSequence **create_matrix(int M, int Q)
{
    int i;
    BitSequence **matrix;

    if ((matrix = (BitSequence **)calloc(M, sizeof(BitSequence *))) == NULL) {
        printf("ERROR IN FUNCTION create_matrix:  Insufficient memory available.\n");
        return NULL;
    } else {
        for (i = 0; i < M; i++) {
            if ((matrix[i] = calloc(Q, sizeof(BitSequence))) == NULL) {
                printf("ERROR IN FUNCTION create_matrix: Insufficient memory for %dx%d matrix.\n", M, M);
                return NULL;
            }
        }
        return matrix;
    }
}

void def_matrix(int M, int Q, BitSequence **m, int k, BitSequence *epsilon)
{
    int i, j;
    for (i = 0; i < M; i++) {
        for (j = 0; j < Q; j++) {
            m[i][j] = epsilon[k * (M * Q) + j + i * Q];
        }
    }
}


void
perform_elementary_row_operations(int flag, int i, int M, int Q, BitSequence **A)
{
	int		j, k;
	
	if ( flag == MATRIX_FORWARD_ELIMINATION ) {
		for ( j=i+1; j<M;  j++ )
			if ( A[j][i] == 1 ) 
				for ( k=i; k<Q; k++ ) 
					A[j][k] = (A[j][k] + A[i][k]) % 2;
	}
	else {
		for ( j=i-1; j>=0;  j-- )
			if ( A[j][i] == 1 )
				for ( k=0; k<Q; k++ )
					A[j][k] = (A[j][k] + A[i][k]) % 2;
	}
}

int
find_unit_element_and_swap(int flag, int i, int M, int Q, BitSequence **A)
{ 
	int		index, row_op=0;
	
	if ( flag == MATRIX_FORWARD_ELIMINATION ) {
		index = i+1;
		while ( (index < M) && (A[index][i] == 0) ) 
			index++;
			if ( index < M )
				row_op = swap_rows(i, index, Q, A);
	}
	else {
		index = i-1;
		while ( (index >= 0) && (A[index][i] == 0) ) 
			index--;
			if ( index >= 0 )
				row_op = swap_rows(i, index, Q, A);
	}
	
	return row_op;
}

int
swap_rows(int i, int index, int Q, BitSequence **A)
{
	int			p;
	BitSequence	temp;
	
	for ( p=0; p<Q; p++ ) {
		temp = A[i][p];
		A[i][p] = A[index][p];
		A[index][p] = temp;
	}
	
	return 1;
}


void
delete_matrix(int M, BitSequence **matrix)
{
	int		i;

	for ( i=0; i<M; i++ )
		free(matrix[i]);
	free(matrix);
}

double Rank(int n, BitSequence *epsilon) {
    int N, i, k, r;
    double p_value = 0.0, product, chi_squared, arg1, p_32, p_31, p_30, R, F_32 = 0, F_31 = 0, F_30;
    BitSequence **matrix = create_matrix(32, 32);

    N = n / (32 * 32);
    if (isZero(N)) {
        p_value = 0.0;
    } else {
        r = 32;
        product = 1.0;
        for (i = 0; i <= r - 1; i++)
            product *= ((1.0 - pow(2, i - 32)) * (1.0 - pow(2, i - 32))) / (1.0 - pow(2, i - r));
        p_32 = pow(2, r * (32 + 32 - r) - 32 * 32) * product;

        r = 31;
        product = 1.0;
        for (i = 0; i <= r - 1; i++)
            product *= ((1.0 - pow(2, i - 32)) * (1.0 - pow(2, i - 32))) / (1.0 - pow(2, i - r));
        p_31 = pow(2, r * (32 + 32 - r) - 32 * 32) * product;

        p_30 = 1.0 - (p_32 + p_31);

        for (k = 0; k < N; k++) {
            def_matrix(32, 32, matrix, k, epsilon);  // Pass epsilon here as needed
            // #if (DISPLAY_MATRICES == 1)
            // display_matrix(32, 32, matrix);
            // #endif
            R = computeRank(32, 32, matrix);
            if (R == 32)
                F_32++;
            else if (R == 31)
                F_31++;
        }
        F_30 = (double)N - (F_32 + F_31);

        chi_squared = (pow(F_32 - N * p_32, 2) / (double)(N * p_32) +
                       pow(F_31 - N * p_31, 2) / (double)(N * p_31) +
                       pow(F_30 - N * p_30, 2) / (double)(N * p_30));

        arg1 = -chi_squared / 2.0;
        p_value = exp(arg1);

        // Optional: check for p_value range
        if (isNegative(p_value) || isGreaterThanOne(p_value)) {
            // handle out-of-range p_value if needed
        }
    }

    for (i = 0; i < 32; i++)
        free(matrix[i]);
    free(matrix);

    return p_value;
}

int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s <stream_length> <binary_file>\n", argv[0]);
        return 1;
    }

    int n = atoi(argv[1]);  // length of each bitstream
    if (n <= 0) {
        fprintf(stderr, "Invalid stream length: must be > 0\n");
        return 1;
    }

    char *filename = argv[2];
    FILE *fp = fopen(filename, "r");
    if (!fp) {
        fprintf(stderr, "Failed to open input file.\n");
        return 1;
    }

    BitSequence *epsilon = (BitSequence *)malloc(MAX_BITS * sizeof(BitSequence));
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
        epsilon[total_bits++] = (BitSequence)bit;
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
        BitStream = &epsilon[i * n];  // Set global pointer to current stream
        double p = Rank(n,epsilon);            // Run Rank test on current stream, must return p-value
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
