#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include "cephes.h"

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

#define MAXNUMOFTEMPLATES 148

int *epsilon;  // Global for simplicity like in NIST
double ALPHA = 0.01;

double NonOverlappingTemplateMatchings(int m, int n, int *epsilon) {
    int numOfTemplates[100] = {0, 0, 2, 4, 6, 12, 20, 40, 74, 148, 284, 568, 1116,
                               2232, 4424, 8848, 17622, 35244, 70340, 140680, 281076, 562152};

    unsigned int bit, W_obs, *Wj = NULL;
    FILE *fp = NULL;
    double sum, chi2, p_value, lambda, pi[6], varWj;
    int i, j, k, match, SKIP, M, N, K = 5;
    char directory[100];
    int *sequence = NULL;

    N = 8;
    M = n / N;

    if ((Wj = (unsigned int *)calloc(N, sizeof(unsigned int))) == NULL)
        return -1;

    lambda = (M - m + 1) / pow(2, m);
    varWj = M * (1.0 / pow(2.0, m) - (2.0 * m - 1.0) / pow(2.0, 2.0 * m));
    sprintf(directory, "templates/template%d", m);

    if (((fp = fopen(directory, "r")) == NULL) || ((sequence = (int *)calloc(m, sizeof(int))) == NULL)) {
        if (sequence != NULL) free(sequence);
        if (Wj != NULL) free(Wj);
        return -1;
    }

    SKIP = 1;
    // numOfTemplates[m] = numOfTemplates[m] / SKIP; // Not used anywhere so can omit

    // Fix probability distribution pi initialization:
    sum = 0.0;
    for (i = 0; i < K; i++) {
        pi[i] = exp(-lambda + i * log(lambda) - cephes_lgam(i + 1));
        sum += pi[i];
    }
    pi[K] = 1.0 - sum;

    // Read the template bits
    for (k = 0; k < m; k++) {
        if (fscanf(fp, "%d", &bit) != 1) {
            fprintf(stderr, "Error reading template bits.\n");
            free(sequence);
            free(Wj);
            fclose(fp);
            return -1;
        }
        sequence[k] = bit;
    }

    fclose(fp);

    for (i = 0; i < N; i++) {
        W_obs = 0;
        for (j = 0; j < M - m + 1; j++) {
            match = 1;
            for (k = 0; k < m; k++) {
                if (sequence[k] != epsilon[i * M + j + k]) {
                    match = 0;
                    break;
                }
            }
            if (match == 1) {
                W_obs++;
                j += m - 1;  // move forward m bits to ensure non-overlapping
            }
        }
        Wj[i] = W_obs;
    }

    chi2 = 0.0;
    for (i = 0; i < N; i++) {
        chi2 += pow(((double)Wj[i] - lambda) / sqrt(varWj), 2);
    }
    p_value = cephes_igamc(N / 2.0, chi2 / 2.0);

    free(sequence);
    free(Wj);

    return p_value;
}


#include <stdio.h>
#include <math.h>
#include "./cephes.h"

static const double	rel_error = 1E-12;

double MACHEP = 1.11022302462515654042E-16;		// 2**-53
double MAXLOG = 7.09782712893383996732224E2;	// log(MAXNUM)
double MAXNUM = 1.7976931348623158E308;			// 2**1024*(1-MACHEP)
double PI     = 3.14159265358979323846;			// pi, duh!

static double big = 4.503599627370496e15;
static double biginv =  2.22044604925031308085e-16;

int sgngam = 0;

double
cephes_igamc(double a, double x)
{
	double ans, ax, c, yc, r, t, y, z;
	double pk, pkm1, pkm2, qk, qkm1, qkm2;

	if ( (x <= 0) || ( a <= 0) )
		return( 1.0 );

	if ( (x < 1.0) || (x < a) )
		return( 1.e0 - cephes_igam(a,x) );

	ax = a * log(x) - x - cephes_lgam(a);

	if ( ax < -MAXLOG ) {
		printf("igamc: UNDERFLOW\n");
		return 0.0;
	}
	ax = exp(ax);

	/* continued fraction */
	y = 1.0 - a;
	z = x + y + 1.0;
	c = 0.0;
	pkm2 = 1.0;
	qkm2 = x;
	pkm1 = x + 1.0;
	qkm1 = z * x;
	ans = pkm1/qkm1;

	do {
		c += 1.0;
		y += 1.0;
		z += 2.0;
		yc = y * c;
		pk = pkm1 * z  -  pkm2 * yc;
		qk = qkm1 * z  -  qkm2 * yc;
		if ( qk != 0 ) {
			r = pk/qk;
			t = fabs( (ans - r)/r );
			ans = r;
		}
		else
			t = 1.0;
		pkm2 = pkm1;
		pkm1 = pk;
		qkm2 = qkm1;
		qkm1 = qk;
		if ( fabs(pk) > big ) {
			pkm2 *= biginv;
			pkm1 *= biginv;
			qkm2 *= biginv;
			qkm1 *= biginv;
		}
	} while ( t > MACHEP );

	return ans*ax;
}

double
cephes_igam(double a, double x)
{
	double ans, ax, c, r;

	if ( (x <= 0) || ( a <= 0) )
		return 0.0;

	if ( (x > 1.0) && (x > a ) )
		return 1.e0 - cephes_igamc(a,x);

	/* Compute  x**a * exp(-x) / gamma(a)  */
	ax = a * log(x) - x - cephes_lgam(a);
	if ( ax < -MAXLOG ) {
		printf("igam: UNDERFLOW\n");
		return 0.0;
	}
	ax = exp(ax);

	/* power series */
	r = a;
	c = 1.0;
	ans = 1.0;

	do {
		r += 1.0;
		c *= x/r;
		ans += c;
	} while ( c/ans > MACHEP );

	return ans * ax/a;
}


/* A[]: Stirling's formula expansion of log gamma
 * B[], C[]: log gamma function between 2 and 3
 */
static unsigned short A[] = {
	0x6661,0x2733,0x9850,0x3f4a,
	0xe943,0xb580,0x7fbd,0xbf43,
	0x5ebb,0x20dc,0x019f,0x3f4a,
	0xa5a1,0x16b0,0xc16c,0xbf66,
	0x554b,0x5555,0x5555,0x3fb5
};
static unsigned short B[] = {
	0x6761,0x8ff3,0x8901,0xc095,
	0xb93e,0x355b,0xf234,0xc0e2,
	0x89e5,0xf890,0x3d73,0xc114,
	0xdb51,0xf994,0xbc82,0xc131,
	0xf20b,0x0219,0x4589,0xc13a,
	0x055e,0x5418,0x0c67,0xc12a
};
static unsigned short C[] = {
	/*0x0000,0x0000,0x0000,0x3ff0,*/
	0x12b2,0x1cf3,0xfd0d,0xc075,
	0xd757,0x7b89,0xaa0d,0xc0d0,
	0x4c9b,0xb974,0xeb84,0xc10a,
	0x0043,0x7195,0x6286,0xc131,
	0xf34c,0x892f,0x5255,0xc143,
	0xe14a,0x6a11,0xce4b,0xc13e
};

#define MAXLGM 2.556348e305


/* Logarithm of gamma function */
double
cephes_lgam(double x)
{
	double	p, q, u, w, z;
	int		i;

	sgngam = 1;

	if ( x < -34.0 ) {
		q = -x;
		w = cephes_lgam(q); /* note this modifies sgngam! */
		p = floor(q);
		if ( p == q ) {
lgsing:
			goto loverf;
		}
		i = (int)p;
		if ( (i & 1) == 0 )
			sgngam = -1;
		else
			sgngam = 1;
		z = q - p;
		if ( z > 0.5 ) {
			p += 1.0;
			z = p - q;
		}
		z = q * sin( PI * z );
		if ( z == 0.0 )
			goto lgsing;
		/*      z = log(PI) - log( z ) - w;*/
		z = log(PI) - log( z ) - w;
		return z;
	}

	if ( x < 13.0 ) {
		z = 1.0;
		p = 0.0;
		u = x;
		while ( u >= 3.0 ) {
			p -= 1.0;
			u = x + p;
			z *= u;
		}
		while ( u < 2.0 ) {
			if ( u == 0.0 )
				goto lgsing;
			z /= u;
			p += 1.0;
			u = x + p;
		}
		if ( z < 0.0 ) {
			sgngam = -1;
			z = -z;
		}
		else
			sgngam = 1;
		if ( u == 2.0 )
			return( log(z) );
		p -= 2.0;
		x = x + p;
		p = x * cephes_polevl( x, (double *)B, 5 ) / cephes_p1evl( x, (double *)C, 6);

		return log(z) + p;
	}

	if ( x > MAXLGM ) {
loverf:
		printf("lgam: OVERFLOW\n");

		return sgngam * MAXNUM;
	}

	q = ( x - 0.5 ) * log(x) - x + log( sqrt( 2*PI ) );
	if ( x > 1.0e8 )
		return q;

	p = 1.0/(x*x);
	if ( x >= 1000.0 )
		q += ((   7.9365079365079365079365e-4 * p
		        - 2.7777777777777777777778e-3) *p
				+ 0.0833333333333333333333) / x;
	else
		q += cephes_polevl( p, (double *)A, 4 ) / x;

	return q;
}

double
cephes_polevl(double x, double *coef, int N)
{
	double	ans;
	int		i;
	double	*p;

	p = coef;
	ans = *p++;
	i = N;

	do
		ans = ans * x  +  *p++;
	while ( --i );

	return ans;
}

double
cephes_p1evl(double x, double *coef, int N)
{
	double	ans;
	double	*p;
	int		i;

	p = coef;
	ans = x + *p++;
	i = N-1;

	do
		ans = ans * x  + *p++;
	while ( --i );

	return ans;
}

double
cephes_erf(double x)
{
	static const double two_sqrtpi = 1.128379167095512574;
	double	sum = x, term = x, xsqr = x * x;
	int		j = 1;

	if ( fabs(x) > 2.2 )
		return 1.0 - cephes_erfc(x);

	do {
		term *= xsqr/j;
		sum -= term/(2*j+1);
		j++;
		term *= xsqr/j;
		sum += term/(2*j+1);
		j++;
	} while ( fabs(term)/sum > rel_error );

	return two_sqrtpi*sum;
}

double
cephes_erfc(double x)
{
	static const double one_sqrtpi = 0.564189583547756287;
	double	a = 1, b = x, c = x, d = x*x + 0.5;
	double	q1, q2 = b/d, n = 1.0, t;

	if ( fabs(x) < 2.2 )
		return 1.0 - cephes_erf(x);
	if ( x < 0 )
		return 2.0 - cephes_erfc(-x);

	do {
		t = a*n + b*x;
		a = b;
		b = t;
		t = c*n + d*x;
		c = d;
		d = t;
		n += 0.5;
		q1 = q2;
		q2 = b/d;
	} while ( fabs(q1-q2)/q2 > rel_error );

	return one_sqrtpi*exp(-x*x)*q2;
}


double
cephes_normal(double x)
{
	double arg, result, sqrt2=1.414213562373095048801688724209698078569672;

	if (x > 0) {
		arg = x/sqrt2;
		result = 0.5 * ( 1 + erf(arg) );
	}
	else {
		arg = -x/sqrt2;
		result = 0.5 * ( 1 - erf(arg) );
	}

	return( result);
}


#include <stdio.h>
#include <stdlib.h>

extern int *epsilon;
extern double NonOverlappingTemplateMatchings(int m, int n,int *epsilon);

int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s <stream_length> <binary_file>\n", argv[0]);
        return 0;
    }

    int n = atoi(argv[1]);  // Length of each bitstream
    int m = 9;              // Template length — modify if needed
    char *filename = argv[2];

    if (n <= 0 || m <= 0) {
        fprintf(stderr, "Invalid parameters: n and m must be > 0\n");
        return 0;
    }

    FILE *fp = fopen(filename, "r");
    if (!fp) {
        fprintf(stderr, "Failed to open input file.\n");
        return 0;
    }

    int *epsilon = (int *)malloc(MAX_BITS * sizeof(int));
    if (!epsilon) {
        fprintf(stderr, "Memory allocation failed.\n");
        fclose(fp);
        return 0;
    }

    int bit, total_bits = 0;
    while (fscanf(fp, "%1d", &bit) == 1 && total_bits < MAX_BITS) {
        if (bit != 0 && bit != 1) {
            fprintf(stderr, "Invalid bit in input file.\n");
            free(epsilon);
            fclose(fp);
            return 0;
        }
        epsilon[total_bits++] = bit;
    }
    fclose(fp);

    if (total_bits < n) {
        fprintf(stderr, "Not enough bits for one complete bitstream.\n");
        free(epsilon);
        return 0;
    }

    int num_streams = total_bits / n;
    double *p_values = (double *)malloc(num_streams * sizeof(double));
    if (!p_values) {
        fprintf(stderr, "Memory allocation error.\n");
        free(epsilon);
        return 0;
    }

    int pass_count = 0;
    for (int i = 0; i < num_streams; i++) {
        double p = NonOverlappingTemplateMatchings(m, n, &epsilon[i * n]);
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
