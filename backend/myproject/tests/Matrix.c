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

void def_matrix(int M, int Q, BitSequence **m, int k)
{
    int i, j;
    for (i = 0; i < M; i++)
        for (j = 0; j < Q; j++)
            m[i][j] = BitStream[k * (M * Q) + j + i * M];
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


void Rank(int n)
{
    int N, i, k, r;
    double p_value, product, chi_squared, arg1, p_32, p_31, p_30, R, F_32, F_31, F_30;
    BitSequence **matrix = create_matrix(32, 32);

    N = n / (32 * 32);
    if (isZero(N)) {
        p_value = 0.00;
    } else {
        r = 32;
        product = 1;
        for (i = 0; i <= r - 1; i++)
            product *= ((1.e0 - pow(2, i - 32)) * (1.e0 - pow(2, i - 32))) / (1.e0 - pow(2, i - r));
        p_32 = pow(2, r * (32 + 32 - r) - 32 * 32) * product;

        r = 31;
        product = 1;
        for (i = 0; i <= r - 1; i++)
            product *= ((1.e0 - pow(2, i - 32)) * (1.e0 - pow(2, i - 32))) / (1.e0 - pow(2, i - r));
        p_31 = pow(2, r * (32 + 32 - r) - 32 * 32) * product;

        p_30 = 1 - (p_32 + p_31);

        F_32 = 0;
        F_31 = 0;
        for (k = 0; k < N; k++) {
            def_matrix(32, 32, matrix, k);
#if (DISPLAY_MATRICES == 1)
            display_matrix(32, 32, matrix);
#endif
            R = computeRank(32, 32, matrix);
            if (R == 32)
                F_32++;
            if (R == 31)
                F_31++;
        }
        F_30 = (double)N - (F_32 + F_31);

        chi_squared = (pow(F_32 - N * p_32, 2) / (double)(N * p_32) +
                       pow(F_31 - N * p_31, 2) / (double)(N * p_31) +
                       pow(F_30 - N * p_30, 2) / (double)(N * p_30));

        arg1 = -chi_squared / 2.e0;
        p_value = exp(arg1);

        if (isNegative(p_value) || isGreaterThanOne(p_value)) {
            // p_value out of range warning removed
        }

        for (i = 0; i < 32; i++)
            free(matrix[i]);
        free(matrix);
    }
    printf("%f\n", p_value);
}

int main(int argc, char *argv[]) {
    if (argc < 3) {
        fprintf(stderr, "Usage: %s <n> <bit1> <bit2> ...>\n", argv[0]);
        return 1;
    }

    int n = atoi(argv[1]);
    BitSequence *epsilon = (BitSequence *)malloc(n * sizeof(BitSequence));
    if (epsilon == NULL) {
        fprintf(stderr, "Memory allocation failed.\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        epsilon[i] = (BitSequence)atoi(argv[i + 2]);
    }

    // Set the global pointer used by NIST test framework
    BitStream = epsilon;

    Rank(n); // Call the Rank test

    free(epsilon);
    return 0;
}