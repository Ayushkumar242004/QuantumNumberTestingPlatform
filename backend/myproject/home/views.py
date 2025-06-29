from django.http import JsonResponse
from tests.template_matching_test import TemplateMatching
from tests.spectral import SpectralTest
from tests.autocorrelation_test import AutocorrelationTest
from tests.adaptive_statistical_test import AdaptiveStatisticalTest
from PIL import Image as PILImage
from tests.autocorrelation_test import AutocorrelationTest
from tests.adaptive_statistical_test import AdaptiveStatisticalTest
from reportlab.platypus import PageBreak

from tests.mcv_test import MostCommonValueTest
from tests.minEntropy_test import MinEntropyTest
from tests.multiBlock_test import MultiBlockEntropyTest
from tests.predictor_test import PredictorTest
from tests.ttuple_test import TTupleTest


from tests.Birthday_spacings_test import BirthdaySpacingsTest
from tests.parking_lot_test import ParkingLotTest
from tests.overlapping_5_permutation_test import Overlapping5PermutationTest
from tests.minimum_distance_test import MinimumDistanceTest
from tests.rank_31matrix_test import Ranks31x31MatricesTest
from tests.spheres_test import Spheres3DTest
from tests.rank_32matrix_test import Ranks32x32MatricesTest
from tests.craps_test import CrapsTest
from tests.bitstream_test import BitstreamTest
from tests.gcd_test import MarsagliaTsangGCDTest
from tests.opso_test import OPSOTest
from tests.oqso_test import OQSOTest
from tests.dna_test import DNATest
from tests.count_one_stream_test import CountThe1sStreamTest
from tests.count_one_byte_test import CountThe1sByteTest
from tests.simple_gcd_test import MarsagliaTsangSimpleGCDTest
from tests.generalized_minimum_test import GeneralizedMinimumDistanceTest
from tests.u01_linear_complexity_test import TestU01LinearComplexityTest
from tests.u01_longest_substring_test import TestU01LongestRepeatedSubstringTest
from tests.u01_matrix_rank_test import TestU01MatrixRankTest

from tests.minEntropy_test import MinEntropyTest
from tests.ttuple_test import TTupleTest
from tests.mcv_test import MostCommonValueTest
from tests.multiBlock_test import MultiBlockEntropyTest
from tests.predictor_test import PredictorTest

from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib import colors
from io import BytesIO
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

from django.http import StreamingHttpResponse
from reportlab.platypus import Image
from reportlab.lib.utils import ImageReader
import mimetypes
import numpy as np

from django.conf import settings
import os
#streaming
import base64
import time
import datetime
import requests
from django.http import StreamingHttpResponse
from django.shortcuts import render
#report
import matplotlib
matplotlib.use('Agg')  # Use a non-GUI backend for Matplotlib
import matplotlib.pyplot as plt
import io
from django.http import HttpResponse
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet
import reportlab
from reportlab.platypus import Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfform
# from reportlab.pdfimage import ImageReader
from io import BytesIO
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from google import genai
# import google.generativeai as genai  # ✅ Correct

from google.genai import types
from django.core.cache import cache
import  uuid

client = genai.Client(api_key="AIzaSyBEgltUoSm5vFEvDxOd29yZ1hJ3apSYpqg") # place your api key here in inverted commas
import subprocess

@csrf_exempt
def run_frequency_test(request):
    import tempfile
    import os

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            n = str(len(binary_data))
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\freqTest_exec.exe"

            # Write binary data to a temporary file (space-separated 0/1)
            with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
                tmp.write(' '.join(binary_data))
                tmp_filename = tmp.name

            # Build command: exe_path n tmp_filename
            cmd = [exe_path, n, tmp_filename]

            # Run process
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            # Clean up temp file
            os.remove(tmp_filename)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            try:
                p_value = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value,
                    "result": "random number" if p_value >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({"error": "Invalid output from executable", "stdout": result.stdout}, status=500)

        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)
@csrf_exempt  # Remove this in production or secure with CSRF token handling
def run_frequency_block_test(request):
    if request.method == 'POST':
        try:
            # Parse the binary data from the JSON body
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data:
                # If there's no binary data, return an empty JsonResponse with status code 204 (No Content)
                return JsonResponse({}, status=204)
            
            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\block_freq_exec.exe"

            # Build command
            cmd = [exe_path, n] + epsilon_list

            # Run process
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            try:
                p_value = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value,
                    "result": "random number" if p_value >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({"error": "Invalid output from executable", "stdout": result.stdout}, status=500)

        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)



@csrf_exempt  # Remove in production or secure with CSRF token
def run_runs_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # Validate binary string
            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            # Absolute path to the compiled executable (.exe)
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\runs.exec"

            # Build the command line arguments: ./runs_test_exec.exe <n> <bit_0> <bit_1> ... <bit_n-1>
            cmd = [exe_path, n] + epsilon_list

            # Run the subprocess
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({
                    "error": "C program execution failed",
                    "stderr": result.stderr
                }, status=500)

            # Parse the p-value
            try:
                p_value = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value,
                    "result": "random number" if p_value >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({
                    "error": "Invalid output from executable",
                    "stdout": result.stdout
                }, status=500)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt  # Remove this in production or secure with CSRF token
def run_longest_one_block_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # Validate binary string
            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            # Absolute path to the compiled executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\longest_run_exec.exe"

            # Build command: [exe_path, n, bit_0, bit_1, ..., bit_n-1]
            cmd = [exe_path, n] + epsilon_list

            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({
                    "error": "C program execution failed",
                    "stderr": result.stderr
                }, status=500)

            # Parse the p-value
            try:
                p_value = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value,
                    "result": "random number" if p_value >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({
                    "error": "Invalid output from executable",
                    "stdout": result.stdout
                }, status=500)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt  # Remove this in production or secure with CSRF token handling
def run_approximate_entropy_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # Validate binary string
            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            # Use full absolute path to .exe
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\approximate_entropy.exec"

            # Build command
            cmd = [exe_path, n] + epsilon_list

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            try:
                p_value = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value,
                    "result": "random number" if p_value >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({"error": "Invalid output from executable", "stdout": result.stdout}, status=500)

        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)



@csrf_exempt  # Remove this in production or secure with CSRF token handling
def run_linear_complexity_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # Validate binary string
            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            # Full absolute path to the executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\linear_comp_exec.exe"

            # Build command
            cmd = [exe_path, n] + epsilon_list

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            try:
                p_value = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value,
                    "result": "random number" if p_value >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({"error": "Invalid output from executable", "stdout": result.stdout}, status=500)

        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt  # Remove this in production or secure with CSRF token handling
def run_non_overlapping_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # Validate binary string
            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            # Full absolute path to the executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\template_non_overlapping.exec"

            # Build command
            cmd = [exe_path, n] + epsilon_list

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            try:
                p_value = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value,
                    "result": "random number" if p_value >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({"error": "Invalid output from executable", "stdout": result.stdout}, status=500)

        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt  # Remove this in production or secure with CSRF token handling
def run_overlapping_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # Validate binary string
            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            # Full absolute path to the executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\template_exec.exe"

            # Build command
            cmd = [exe_path, n] + epsilon_list

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            try:
                p_value = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value,
                    "result": "random number" if p_value >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({"error": "Invalid output from executable", "stdout": result.stdout}, status=500)

        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt  # Remove this in production or secure with CSRF token handling
def run_universal_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # Validate binary string
            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            # Full absolute path to the executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\universal_exec.exe"

            # Build command
            cmd = [exe_path, n] + epsilon_list

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            try:
                p_value = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value,
                    "result": "random number" if p_value >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({"error": "Invalid output from executable", "stdout": result.stdout}, status=500)

        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt  # Remove this in production or secure with CSRF token handling
def run_serial_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # Validate binary string
            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            # Full absolute path to the executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\serial_exec.exe"

            # Build command
            cmd = [exe_path, n] + epsilon_list

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            try:
                p_value1 = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value1,
                    "result": "random number" if p_value1 >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({"error": "Invalid output from executable", "stdout": result.stdout}, status=500)

        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt  # Remove this in production or secure with CSRF token handling
def run_cumulative_sums_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # Validate binary string
            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            # Full absolute path to the executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\cusum_exec.exe"

            # Build command
            cmd = [exe_path, n] + epsilon_list

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            try:
                p_value1 = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value1,
                    "result": "random number" if p_value1 >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({"error": "Invalid output from executable", "stdout": result.stdout}, status=500)

        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)



@csrf_exempt  # Remove this in production or secure with CSRF token handling
def run_random_excursions_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # Validate binary string
            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            # Full absolute path to the executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\random_exec.exe"

            # Build command
            cmd = [exe_path, n] + epsilon_list

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            try:
                p_value1 = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value1,
                    "result": "random number" if p_value1 >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({"error": "Invalid output from executable", "stdout": result.stdout}, status=500)

        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt  # Remove this in production or secure with CSRF token handling
def random_excursions_variant_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # Validate binary string
            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            # Full absolute path to the executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\random_var_exec.exe"

            # Build command
            cmd = [exe_path, n] + epsilon_list

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            try:
                p_value1 = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value1,
                    "result": "random number" if p_value1 >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({"error": "Invalid output from executable", "stdout": result.stdout}, status=500)

        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt  # Remove this in production or secure with CSRF token handling
def run_binary_matrix_rank_text(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # Validate binary string
            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            # Full absolute path to the executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\matrix_exec.exe"

            # Build command
            cmd = [exe_path, n] + epsilon_list

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            try:
                p_value1 = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value1,
                    "result": "random number" if p_value1 >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({"error": "Invalid output from executable", "stdout": result.stdout}, status=500)

        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt  # Remove this in production or secure with CSRF token handling
def run_dft_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # Validate binary string
            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            # Full absolute path to the executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\dft_exec.exe"

            # Build command
            cmd = [exe_path, n] + epsilon_list

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            try:
                p_value1 = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value1,
                    "result": "random number" if p_value1 >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({"error": "Invalid output from executable", "stdout": result.stdout}, status=500)

        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)



@csrf_exempt  # Use only in development; ensure CSRF handling in production
def run_spectral_test(request):
    if request.method == 'POST':
        try:
            # Parse binary data from JSON body
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')
            
            if not binary_data:
                # If no binary data, return an empty JsonResponse with status code 204 (No Content)
                return JsonResponse({}, status=204)
            
            # Call the spectral_test method from SpectralTest
            p_value, result = SpectralTest.spectral_test(binary_data)

            print("run_spectral_test p_value:", p_value)
            print("run_spectral_test Result:", result)
            
            # Prepare the response data
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)



@csrf_exempt
def run_birthday_spacings_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])
            print('data is printing:',binary_data)

            

            if isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            elif isinstance(binary_data, str):
                # If binary_data is a string, just use it directly
                filtered_binary_data = binary_data.strip()  # Strip to remove any extra spaces or newlines
            else:
                # If neither string nor list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            if not filtered_binary_data:
                # If no valid binary string is found, return an error
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            
            # Call the Birthday Spacings Test method
            p_value, result = BirthdaySpacingsTest.BirthdaySpacingsTest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except ValueError as ve:
            # Handle invalid binary data conversion
            print("ValueError:", str(ve))
            return JsonResponse({"error": "Invalid binary data format"}, status=400)
        except Exception as e:
            # Log the error and return a 500 status code
            print("Error in run_birthday_spacings_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


def run_bitstream_test(request):
    # Check if the request method is POST
    if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # If there's no binary data, return an empty JsonResponse with status code 204 (No Content)
            if not binary_data:
                return JsonResponse({}, status=204)
            
            # Handle both string and list formats for binary_data
            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If neither a string nor list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            # If no valid binary string is found, return an error
            if not filtered_binary_data:
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            # Call the BitstreamTest method
            p_value, result = BitstreamTest.BitstreamTest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            print("Error in run_bitstream_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        # If the request method is not POST
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)



@csrf_exempt
def run_parking_lot_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # If no binary_data is provided, return an empty JsonResponse with status code 204 (No Content)
            if not binary_data:
                return JsonResponse({}, status=204)

            # Handle both string and list formats for binary_data
            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            # If no valid binary string is found, return an error
            if not filtered_binary_data:
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            print('Filtered binary data:', filtered_binary_data)

            # Call the Parking Lot Test method
            p_value, result = ParkingLotTest.ParkingLotTest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except ValueError as ve:
            # Handle invalid binary data conversion
            print("ValueError:", str(ve))
            return JsonResponse({"error": "Invalid binary data format"}, status=400)
        except Exception as e:
            # Log the error and return a 500 status code
            print("Error in run_parking_lot_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        # If the request method is not POST
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

# def run_overlapping_5_test(request):
#     # Example binary data received from the request query parameters
#     binary_data = request.GET.get('binary_data', '')

#     if not binary_data:
#         # If there's no binary data, return an empty JsonResponse with status code 204 (No Content)
#         return JsonResponse({}, status=204)
    
#     # Print the request URL and parameters
#     # print("Request URL:", request.get_full_path())
#     # print("Request Parameters:", request.GET)

#     # Call the block_frequency method
#     p_value, result = Overlapping5PermutationTest.Overlapping5PermutationTest(binary_data)

#     print("run_overlapping_5_test p_value:", p_value)
#     print("run_overlapping_5_test Result:", result)
    
#     # Prepare the response data
#     if result:
#         result_text = "random number"
#     else:
#         result_text = "non-random number"
        
#     response_data = {
#         'p_value': p_value,
#         'result': result_text
#     }

#     return JsonResponse(response_data)

@csrf_exempt
def run_overlapping_5_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)


            # Extract the first non-empty, non-whitespace string
            # filtered_binary_data = next((item for item in binary_data if item.strip()), None)

            if not filtered_binary_data:
                # If no valid binary string is found, return an error
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            # Call the Overlapping 5 Permutation Test method
            p_value, result = Overlapping5PermutationTest.Overlapping5PermutationTest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except ValueError as ve:
            # Handle invalid binary data conversion
            print("ValueError:", str(ve))
            return JsonResponse({"error": "Invalid binary data format"}, status=400)
        except Exception as e:
            # Log the error and return a 500 status code
            print("Error in run_overlapping_5_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt
def run_minimum_distance_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)


            # Extract the first non-empty, non-whitespace string
            # filtered_binary_data = next((item for item in binary_data if item.strip()), None)

            if not filtered_binary_data:
                # If no valid binary string is found, return an error
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            # Call the Minimum Distance Test method
            p_value, result = MinimumDistanceTest.MinimumDistanceTest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except ValueError as ve:
            # Handle invalid binary data conversion
            print("ValueError:", str(ve))
            return JsonResponse({"error": "Invalid binary data format"}, status=400)
        except Exception as e:
            # Log the error and return a 500 status code
            print("Error in run_minimum_distance_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)




@csrf_exempt
def run_31matrix_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)


            # Extract the first non-empty, non-whitespace string
            # filtered_binary_data = next((item for item in binary_data if item.strip()), None)

            if not filtered_binary_data:
                # If no valid binary string is found, return an error
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            # Call the Ranks 31x31 Matrices Test method
            p_value, result = Ranks31x31MatricesTest.Ranks31x31MatricesTest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except ValueError as ve:
            # Handle invalid binary data conversion
            print("ValueError:", str(ve))
            return JsonResponse({"error": "Invalid binary data format"}, status=400)
        except Exception as e:
            # Log the error and return a 500 status code
            print("Error in run_31matrix_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt
def run_spheres_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)


            # Extract the first non-empty, non-whitespace string
            
            if not filtered_binary_data:
                # If no valid binary string is found, return an error
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            # Call the Spheres 3D Test method
            p_value, result = Spheres3DTest.Spheres3DTest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except ValueError as ve:
            # Handle invalid binary data conversion
            print("ValueError:", str(ve))
            return JsonResponse({"error": "Invalid binary data format"}, status=400)
        except Exception as e:
            # Log the error and return a 500 status code
            print("Error in run_spheres_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt
def run_32matrix_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            if not filtered_binary_data:
                # If no valid binary string is found, return an error
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            # Call the Ranks 32x32 Matrices Test method
            p_value, result = Ranks32x32MatricesTest.Ranks32x32MatricesTest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except ValueError as ve:
            # Handle invalid binary data conversion
            print("ValueError:", str(ve))
            return JsonResponse({"error": "Invalid binary data format"}, status=400)
        except Exception as e:
            # Log the error and return a 500 status code
            print("Error in run_32matrix_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)



@csrf_exempt
def run_craps_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            if not filtered_binary_data:
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            # Call the Craps Test method
            p_value, result = CrapsTest.CrapsTest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except ValueError as ve:
            print("ValueError:", str(ve))
            return JsonResponse({"error": "Invalid binary data format"}, status=400)
        except Exception as e:
            print("Error in run_craps_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def run_bitstream_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            if not filtered_binary_data:
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            # Call the Bitstream Test method
            p_value, result = BitstreamTest.BitstreamTest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except ValueError as ve:
            print("ValueError:", str(ve))
            return JsonResponse({"error": "Invalid binary data format"}, status=400)
        except Exception as e:
            print("Error in run_bitstream_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def run_gcd_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            if not filtered_binary_data:
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            # Call the GCD Test method
            p_value, result = MarsagliaTsangGCDTest.MarsagliaTsangGCDTest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except ValueError as ve:
            print("ValueError:", str(ve))
            return JsonResponse({"error": "Invalid binary data format"}, status=400)
        except Exception as e:
            print("Error in run_gcd_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)



@csrf_exempt
def run_opso_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            if not filtered_binary_data:
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            # Call the OPSO Test method
            p_value, result = OPSOTest.OPSOTest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except ValueError as ve:
            print("ValueError:", str(ve))
            return JsonResponse({"error": "Invalid binary data format"}, status=400)
        except Exception as e:
            print("Error in run_opso_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def run_oqso_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            if not filtered_binary_data:
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            # Call the OQSO Test method
            p_value, result = OQSOTest.OQSOTest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except ValueError as ve:
            print("ValueError:", str(ve))
            return JsonResponse({"error": "Invalid binary data format"}, status=400)
        except Exception as e:
            print("Error in run_oqso_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def run_dna_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            if not filtered_binary_data:
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            # Call the DNA Test method
            p_value, result = DNATest.DNATest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except ValueError as ve:
            print("ValueError:", str(ve))
            return JsonResponse({"error": "Invalid binary data format"}, status=400)
        except Exception as e:
            print("Error in run_dna_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def run_count_one_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            
            if not filtered_binary_data:
                return JsonResponse({"error": "No valid binary data provided"}, status=400)

            # Call the Count The 1s Stream Test method
            p_value, result = CountThe1sStreamTest.CountThe1sStreamTest(filtered_binary_data)

            # Prepare the response
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except ValueError as ve:
            print("ValueError:", str(ve))
            return JsonResponse({"error": "Invalid binary data format"}, status=400)
        except Exception as e:
            print("Error in run_count_one_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)



@csrf_exempt
def run_count_one_byte_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            # Call the CountThe1sByteTest method with the binary data
            p_value, result = CountThe1sByteTest.CountThe1sByteTest(filtered_binary_data)

            # Prepare the response based on the result
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            print("Error in run_count_one_byte_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt
def run_simple_gcd_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            if not filtered_binary_data:
                return JsonResponse({"error": "No valid binary data provided"}, status=400)


            # Call the Marsaglia Tsang Simple GCD Test method with the binary data
            p_value, result = MarsagliaTsangSimpleGCDTest.MarsagliaTsangSimpleGCDTest(filtered_binary_data)

            # Prepare the response based on the result
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            print("Error in run_simple_gcd_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)



@csrf_exempt
def run_general_minimum_distance_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            if not filtered_binary_data:
                return JsonResponse({"error": "No valid binary data provided"}, status=400)


            # Call the Generalized Minimum Distance Test method with the binary data
            p_value, result = GeneralizedMinimumDistanceTest.GeneralizedMinimumDistanceTest(filtered_binary_data)

            # Prepare the response based on the result
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            print("Error in run_general_minimum_distance_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def run_u01_linear_complexity_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            if not filtered_binary_data:
                return JsonResponse({"error": "No valid binary data provided"}, status=400)


            # Call the TestU01 Linear Complexity Test method with the binary data
            p_value, result = TestU01LinearComplexityTest.TestU01LinearComplexityTest(filtered_binary_data)

            # Prepare the response based on the result
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            print("Error in run_u01_linear_complexity_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def run_u01_longest_repeated_substring_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            if not filtered_binary_data:
                return JsonResponse({"error": "No valid binary data provided"}, status=400)


            # Call the TestU01 Longest Repeated Substring Test method with the binary data
            p_value, result = TestU01LongestRepeatedSubstringTest.TestU01LongestRepeatedSubstringTest(filtered_binary_data)

            # Prepare the response based on the result
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            print("Error in run_u01_longest_repeated_substring_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def run_matrix_rank_test(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            binary_data = data.get('binary_data', [])

            if not binary_data:
                return JsonResponse({}, status=204)


            if isinstance(binary_data, str):
                # If binary_data is a string, strip it of any leading/trailing spaces
                filtered_binary_data = binary_data.strip()
            elif isinstance(binary_data, list):
                # If binary_data is a list, filter out any empty or whitespace-only strings
                filtered_binary_data = next((item for item in binary_data if item.strip()), None)
            else:
                # If binary_data is neither a string nor a list, return an error
                return JsonResponse({"error": "Invalid data format for binary_data"}, status=400)

            if not filtered_binary_data:
                return JsonResponse({"error": "No valid binary data provided"}, status=400)


            # Call the TestU01 Matrix Rank Test method with the binary data
            p_value, result = TestU01MatrixRankTest.TestU01MatrixRankTest(filtered_binary_data)

            # Prepare the response based on the result
            result_text = "random number" if result else "non-random number"
            response_data = {
                'p_value': p_value,
                'result': result_text
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            print("Error in run_matrix_rank_test:", str(e))
            return JsonResponse({"error": "Internal server error"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt  # Remove this in production or secure with CSRF token handling
def run_chi_square_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            # Validate binary string
            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(epsilon_list))

            # Full absolute path to the executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\dft_exec.exe"

            # Build command
            cmd = [exe_path, n] + epsilon_list

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            try:
                p_value1 = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value1,
                    "result": "random number" if p_value1 >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({"error": "Invalid output from executable", "stdout": result.stdout}, status=500)

        except FileNotFoundError:
            return JsonResponse({"error": "Executable not found. Check path."}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def run_mcv_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            p_value, result = MostCommonValueTest.MostCommonValueTest(binary_data)

            result_text = "random number" if result == 1 else "non-random number"
            return JsonResponse({'p_value': p_value, 'result': result_text})
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt
def run_collision_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            # Absolute path to the compiled C++ executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\collisionTest_exec.exe"

            # Prepare command
            cmd = [exe_path, binary_data]

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode not in [0, 1]:
                return JsonResponse({"error": "Executable failed to run properly."}, status=500)

            min_entropy_str = result.stdout.strip()
            min_entropy = float(min_entropy_str) if min_entropy_str else 0.0

            result_text = "random number" if result.returncode == 1 else "non-random number"

            return JsonResponse({
                'min_entropy': min_entropy,
                'result': result_text
            })

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def run_markov_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            # Absolute path to the compiled C++ executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\markovTest_exec.exe"

            # Prepare command
            cmd = [exe_path, binary_data]

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode not in [0, 1]:
                return JsonResponse({"error": "Executable failed to run properly."}, status=500)

            min_entropy_str = result.stdout.strip()
            min_entropy = float(min_entropy_str) if min_entropy_str else 0.0

            result_text = "random number" if result.returncode == 1 else "non-random number"

            return JsonResponse({
                'min_entropy': min_entropy,
                'result': result_text
            })

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def run_compression_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            # Absolute path to the compiled C++ executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\compressionTest_exec.exe"

            # Prepare command
            cmd = [exe_path, binary_data]

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode not in [0, 1]:
                return JsonResponse({"error": "Executable failed to run properly."}, status=500)

            min_entropy_str = result.stdout.strip()
            min_entropy = float(min_entropy_str) if min_entropy_str else 0.0

            result_text = "random number" if result.returncode == 1 else "non-random number"

            return JsonResponse({
                'min_entropy': min_entropy,
                'result': result_text
            })

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt
def run_lag_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            # Absolute path to the compiled lag test executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\lagTest_exec.exe"

            # Prepare command
            cmd = [exe_path, binary_data]

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode not in [0, 1]:
                return JsonResponse({"error": "Executable failed to run properly."}, status=500)

            min_entropy_str = result.stdout.strip()
            min_entropy = float(min_entropy_str) if min_entropy_str else 0.0

            result_text = "random number" if result.returncode == 1 else "non-random number"

            return JsonResponse({
                'min_entropy': min_entropy,
                'result': result_text
            })

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt
def run_mcw_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            # Absolute path to the compiled lag test executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\multiMcwTest_exec.exe"

            # Prepare command
            cmd = [exe_path, binary_data]

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode not in [0, 1]:
                return JsonResponse({"error": "Executable failed to run properly."}, status=500)

            min_entropy_str = result.stdout.strip()
            min_entropy = float(min_entropy_str) if min_entropy_str else 0.0

            result_text = "random number" if result.returncode == 1 else "non-random number"

            return JsonResponse({
                'min_entropy': min_entropy,
                'result': result_text
            })

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def run_mmc_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            # Absolute path to the compiled lag test executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\multiMmcTest_exec.exe"

            # Prepare command
            cmd = [exe_path, binary_data]

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            
            min_entropy_str = result.stdout.strip()
            min_entropy = float(min_entropy_str) if min_entropy_str else 0.0

            result_text = "random number" if result.returncode == 1 else "non-random number"

            return JsonResponse({
                'min_entropy': min_entropy,
                'result': result_text
            })

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def run_longest_repeated_substring_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            p_value, result = TestU01LongestRepeatedSubstringTest.TestU01LongestRepeatedSubstringTest(binary_data)

            result_text = "random number" if result == 1 else "non-random number"
            return JsonResponse({'p_value': p_value, 'result': result_text})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt
def run_multi_block_entropy_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            p_value, result = MultiBlockEntropyTest.MultiBlockEntropyTest(binary_data)

            result_text = "random number" if result == 1 else "non-random number"
            return JsonResponse({'p_value': p_value, 'result': result_text})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt
def run_lz78y_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            # Path to the compiled LZ78Y lag test executable
            exe_path = r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\l278yTest_exec.exe"

            # Prepare command
            cmd = [exe_path, binary_data]

            # Run the executable
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode not in [0, 1]:
                return JsonResponse({"error": "Executable failed to run properly."}, status=500)

            min_entropy_str = result.stdout.strip()
            try:
                min_entropy = float(min_entropy_str)
            except ValueError:
                return JsonResponse({"error": "Failed to parse entropy output."}, status=500)

            result_text = "random number" if result.returncode == 1 else "non-random number"

            return JsonResponse({
                'min_entropy': min_entropy,
                'result': result_text
            })

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)
@csrf_exempt
def run_min_entropy_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            p_value, result = MinEntropyTest.MinEntropyTest(binary_data)

            result_text = "random number" if result == 1 else "non-random number"
            return JsonResponse({'p_value': p_value, 'result': result_text})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def run_predictor_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            p_value, result = PredictorTest.PredictorTest(binary_data)

            result_text = "random number" if result == 1 else "non-random number"
            return JsonResponse({'p_value': p_value, 'result': result_text})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)



def send_binary_data(request):
    binary_data = '101010'  # Example binary data as a string
    response_data = {
        'binary_data': binary_data
    }
    return JsonResponse(response_data)

def fetch_binary_data():
    # Replace this URL with the actual URL of the external server
    url = "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new"
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for HTTP errors
    return response.content

def binary_event_stream():
    while True:
        try:
            binary_data = fetch_binary_data()
            encoded_data = base64.b64encode(binary_data).decode('utf-8')
            yield f'data: {encoded_data}\n\n'
        except requests.RequestException as e:
            yield f'data: Error fetching data: {e}\n\n'
        time.sleep(0.5)  # Adjust the sleep time as needed

def sse_binary_view(request):
    response = StreamingHttpResponse(binary_event_stream(), content_type='text/event-stream')
    response['Cache-Control'] = 'no-cache'
    response['X-Accel-Buffering'] = 'no'  # Disable buffering for nginx
    return response

def sse_binary_example_view(request):
    return render(request, 'myapp/sse_binary_example.html')

global_graph_image=None


@csrf_exempt
def create_graph(request):
    try:
        data = json.loads(request.body)
        binary_data = data.get('binary_data', '')
        job_id = data.get('job_id', str(uuid.uuid4()))
    except json.JSONDecodeError as e:
        print('Error parsing JSON:', e)
        return HttpResponse("Invalid JSON data.", status=400)

    if not binary_data or any(c not in '01' for c in binary_data):
        return HttpResponse("Invalid or missing binary data", status=400)

    epsilon_list = [str(int(b)) for b in binary_data]
    n = str(len(epsilon_list))

    test_p_values = {}
    cache.set(f"{job_id}_progressGraph", 0)

    def run_test_exe(exe_path, test_name):
        try:
            with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
                        tmp.write(' '.join(epsilon_list))
                        tmp_filename = tmp.name
            cmd = [exe_path, str(n), tmp_filename]
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)
            if result.returncode != 0:
                print(f"Error in {test_name}: Return code {result.returncode}, stderr: {result.stderr}")
                return -1

            output = result.stdout.strip()
            print(f"{test_name} output:", output)

            p_value = float(output)
            return p_value if 0 <= p_value <= 1 else -1

        except Exception as e:
            print(f"Exception in {test_name}:", e)
            return -1

    def safe_test_call(exe_path, test_name):
        try:
            p_value = run_test_exe(exe_path, test_name)
            return 0 if p_value in [-1, None] else p_value
        except Exception as e:
            print(f"Error in {test_name}:", e)
            return 0

    tests_executables = {
            'Frequency Test': ('fre', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\freqTest_exec.exe"),
            'Frequency Block Test': ('freBlock', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\freqBlockTest_exec.exe"),
            'Runs Test': ('runs', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\runsTest_exec.exe"),
            'Longest One Block Test': ('oneBlock', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\lonRunTest_exec.exe"),
            'Approximate Entropy Test': ('appEntropy', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\appETest_exec.exe"),
            'Linear Complexity Test': ('linComp', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\linCompTest_exec.exe"),
            'Non Overlapping Test': ('nonOver', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\tempNOTest_exec.exe"),
            'Overlapping Test': ('over', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\tempOTest_exec.exe"),
            'Universal Test': ('univ', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\univ_exec.exe"),
            'Serial Test': ('serial', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\serialTest_exec.exe"),
            'Cusum Test': ('cusum', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\cusTest_exec.exe"),
            'Random Excursion Test': ('re', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\ranETest_exec.exe"),
            'Random Excursion Variant Test': ('rev', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\ranEVTest_exec.exe"),
            'Binary Matrix Rank Test': ('rank', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\rankTest_exec.exe"),
            # 'DFT Test': ('dft', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\dftTest_exec.exe"),
    }

    for i, (display_name, (label, exe_path)) in enumerate(tests_executables.items(), start=1):
        test_p_values[display_name] = safe_test_call(exe_path, display_name)
        cache.set(f"{job_id}_progressGraph", i+1)

    # Prepare valid test data
    valid_tests = {k: (0 if v is None or v > 1 else v) for k, v in test_p_values.items()}
    print('Valid tests:', valid_tests)

    if not valid_tests:
        return HttpResponse("No valid test results to plot.", status=400)

    x = list(valid_tests.keys())
    y = list(valid_tests.values())

    # Generate plot
    fig, ax = plt.subplots(figsize=(16, 9))
    colors = ['green' if p >= 0.01 else 'blue' for p in y]
    ax.bar(x, y, color=colors)
    ax.axhline(y=0.01, color='red', linestyle='--', linewidth=2, label='p-value = 0.01')
    ax.set_xlabel('NIST SP 800-22B Tests', fontsize=20)
    ax.set_ylabel('p-value', fontsize=20)
    ax.set_yticks([i / 10.0 for i in range(0, 11)])
    ax.set_ylim(0, 1)
    plt.xticks(rotation=45, ha='right', fontsize=12)
    plt.tight_layout()

    legend_elements = [
        Patch(facecolor='green', edgecolor='green', label='Random (p ≥ 0.01)'),
        Patch(facecolor='blue', edgecolor='blue', label='Non-random (p < 0.01)')
    ]
    ax.legend(handles=legend_elements, loc='upper right', prop={'size': 10})

    cache.set(f"{job_id}_progressGraph", 16)

    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)

    return HttpResponse(buf, content_type='image/png')


@csrf_exempt
def get_progress_graph(request, job_id):
    progress = cache.get(f"{job_id}_progressGraph", 0)
    return JsonResponse({"progress": int(progress)})

import subprocess
from matplotlib.patches import Patch


@csrf_exempt
def create_graph_nist90b(request):
    # Parse incoming JSON
    try:
        data = json.loads(request.body)
        binary_data = data.get('binary_data', '')
        job_id = data.get('job_id', str(uuid.uuid4()))
    except json.JSONDecodeError as e:
        print('Error parsing JSON:', e)
        return HttpResponse("Invalid JSON data.", status=400)

    if not binary_data:
        return HttpResponse("Binary data is required.", status=400)

    test_p_values = {}
    cache.set(f"{job_id}_progressGraph90b", 0)

    def run_test_exe(exe_path, binary_data):
        try:
            result = subprocess.run([exe_path, binary_data], capture_output=True, text=True, shell=False)
            if result.returncode != 0:
                print(f"Error in {exe_path}, Return Code: {result.returncode}")
                return -1
            output = result.stdout.strip()
            print(f"{exe_path} output:", output)
            if not output:
                return -1
            p_value = float(output)
            return p_value if 0 <= p_value <= 1 else -1
        except Exception as e:
            print(f"Exception in {exe_path}:", e)
            return -1

    def safe_test_call(exe_path, test_name, binary_data):
        try:
            p_value = run_test_exe(exe_path, binary_data)
            print(f'{test_name} p_value:', p_value)
            return 0 if p_value in [-1, None] else p_value
        except Exception as e:
            print(f'Error in {test_name}:', e)
            return 0

    # Dictionary of test display name → (label, path to .exe)
    tests_executables = {

        'Collision Test': ('col', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\collisionTest_exec.exe"),
        'Markov Test': ('markov',  r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\markovTest_exec.exe"),
        'Compression Test': ('compression',  r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\compressionTest_exec.exe"),
        'LZ78Y Test': ('l278y',r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\l278yTest_exec.exe"),
        'Lag Test': ('lag', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\lagTest_exec.exe"),
        'MCW Test': ('mcw',  r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\multiMcwTest_exec.exe"),
        'MMC Test': ('mmc', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\multiMmcTest_exec.exe"),
    }

    # Run each executable
    for i, (display_name, (label, exe_path)) in enumerate(tests_executables.items(), start=1):
        test_p_values[display_name] = safe_test_call(exe_path, label, binary_data)
        cache.set(f"{job_id}_progressGraph90b", i)

    # Filter valid p-values
    valid_tests = {k: (0 if v is None or v > 1 else v) for k, v in test_p_values.items()}
    print('Valid tests:', valid_tests)

    if not valid_tests:
        return HttpResponse("No valid test results to plot.", status=400)

    # Create the plot
    x = list(valid_tests.keys())
    y = list(valid_tests.values())
    fig, ax = plt.subplots(figsize=(16, 9))

    colors = ['green' if p > 0.01 else 'blue' for p in y]
    ax.bar(x, y, color=colors)
    ax.axhline(y=0.01, color='red', linestyle='--', linewidth=2, label='p-value = 0.01')
    ax.set_xlabel('NIST SP 800-90B Tests', fontsize=20)
    ax.set_ylabel('Min-Entropy', fontsize=20)
    ax.set_yticks([i / 10.0 for i in range(0, 11)])
    ax.set_ylim(0, 1)
    plt.xticks(rotation=45, ha='right', fontsize=12)
    plt.tight_layout()

    legend_elements = [
        Patch(facecolor='green', edgecolor='green', label='Random (Min-Entropy >= 0.997)'),
        Patch(facecolor='blue', edgecolor='blue', label='Non-random (Min-Entropy < 0.997)')
    ]
    ax.legend(handles=legend_elements, loc='upper right', prop={'size': 10})

    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)
    cache.set(f"{job_id}_progressGraph90b", 7)
    
    return HttpResponse(buf, content_type='image/png')

@csrf_exempt
def get_progress_graph90b(request, job_id):
    progress = cache.get(f"{job_id}_progressGraph90b", 0)
    return JsonResponse({"progress": int(progress)})


@csrf_exempt
def get_progress_graphDieharder(request, job_id):
    progress = cache.get(f"{job_id}_progressGraphDieharder", 0)
    return JsonResponse({"progress": int(progress)})


@csrf_exempt
def create_graph_dieharder(request):
    try:
        data = json.loads(request.body)
        binary_data = data.get('binary_data', '')
        job_id = data.get('job_id', str(uuid.uuid4()))
    except json.JSONDecodeError as e:
        print('Error parsing JSON:', e)
        return HttpResponse("Invalid JSON data.", status=400)


    binary_data = binary_data.replace('%0A', '').replace('%20', '').replace(' ', '').replace('\n', '').replace('\r', '')
    
    if not binary_data:
        return HttpResponse("Binary data is required.", status=400)

    # Dictionary to store p-values with error handling
    test_p_values = {}
    cache.set(f"{job_id}_progressGraphDieharder", 0)

    # Wrap test calls in try-except blocks and ensure p-values are numeric
    def safe_test_call(test_func, test_name, binary_data):
        result = test_func(binary_data)

        p_value = result[0]
        print(test_name, p_value)

        # If p_value is not defined (None) or equals -1, return 0
        if p_value is None or p_value == -1  or str(p_value).strip() == '':
            return 0
        if p_value > 1:
            return 0
        try:
            return float(p_value)
        except ZeroDivisionError:
            # Handle float division by zero
            return 0

    
    test_p_values['Birthday Spacing Test'] = safe_test_call(BirthdaySpacingsTest.BirthdaySpacingsTest, 'Birthday Spacing Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 1)
    test_p_values['Parking Lot Test'] = safe_test_call(ParkingLotTest.ParkingLotTest, 'Parking Lot Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 2)
    test_p_values['Overlapping Permutation 5 Test'] = safe_test_call(Overlapping5PermutationTest.Overlapping5PermutationTest, 'Overlapping Permutation 5 Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 3)
    test_p_values['Minimum Distance Test'] = safe_test_call(MinimumDistanceTest.MinimumDistanceTest, 'Minimum Distance Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 4)
    test_p_values['Ranks of 31x31 Test'] = safe_test_call(Ranks31x31MatricesTest.Ranks31x31MatricesTest, 'Ranks of 31x31 Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 5)
    test_p_values['3d Spheres Test'] = safe_test_call(Spheres3DTest.Spheres3DTest, '3d Spheres Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 6)
    test_p_values['Ranks of 32x32 Test'] = safe_test_call(Ranks32x32MatricesTest.Ranks32x32MatricesTest, 'Ranks of 32x32 Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 7)
    test_p_values['Craps Test'] = safe_test_call(CrapsTest.CrapsTest, 'Craps Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 8)
    test_p_values['Bitstream Test'] = safe_test_call(BitstreamTest.BitstreamTest, 'Bitstream Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 9)
    test_p_values['Marsaglia-Tsang GCD Test'] = safe_test_call(MarsagliaTsangGCDTest.MarsagliaTsangGCDTest, 'Marsaglia-Tsang GCD Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 10)
    test_p_values['OPSO Test'] = safe_test_call(OPSOTest.OPSOTest, 'OPSO Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 11)
    test_p_values['OQSO Test'] = safe_test_call(OQSOTest.OQSOTest, 'OQSO Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 12)
    test_p_values['DNA Test'] = safe_test_call(DNATest.DNATest, 'DNA Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 13)
    test_p_values['Count the one(stream) Test'] = safe_test_call(CountThe1sStreamTest.CountThe1sStreamTest, 'Count the one(stream) Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 14)
    test_p_values['Count the one(byte) Test'] = safe_test_call(CountThe1sByteTest.CountThe1sByteTest, 'Count the one(byte) Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 15)
    test_p_values['Marsaglia Tsang Simple GCD Test'] = safe_test_call(MarsagliaTsangSimpleGCDTest.MarsagliaTsangSimpleGCDTest, 'Marsaglia Tsang Simple GCD Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 16)
    test_p_values['Generalized Minimum Distance Test'] = safe_test_call(GeneralizedMinimumDistanceTest.GeneralizedMinimumDistanceTest, 'Generalized Minimum Distance Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 17)
    test_p_values['TestU01 Linear Complexity Test'] = safe_test_call(TestU01LinearComplexityTest.TestU01LinearComplexityTest, 'TestU01 Linear Complexity Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 18)
    test_p_values['TestU01 Longest Repeated Substring Test'] = safe_test_call(TestU01LongestRepeatedSubstringTest.TestU01LongestRepeatedSubstringTest, 'TestU01 Longest Repeated Substring Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 19)
    test_p_values['TestU01 Matrix Rank Test'] = safe_test_call(TestU01MatrixRankTest.TestU01MatrixRankTest, 'TestU01 Matrix Rank Test', binary_data)
    cache.set(f"{job_id}_progressGraphDieharder", 20)

    
    
    valid_tests = {k: (0 if v is None or v > 1 else v) for k, v in test_p_values.items()}

    if not valid_tests:
        return HttpResponse("No valid test results to plot.", status=400)

    # Extract test names and p-values for plotting
    x = list(valid_tests.keys())
    y = list(valid_tests.values())

    # Create the plot
    fig, ax = plt.subplots(figsize=(16, 9))

    # Assign color based on the p-value threshold (0.05)
    colors = ['green' if p > 0.01 else 'blue' for p in y]

    # Plot the histogram with colors based on the condition
    ax.bar(x, y, color=colors)

    # Draw a horizontal dotted red line at p_value = 0.05
    ax.axhline(y=0.01, color='red', linestyle='--', linewidth=2, label='p-value = 0.01')

    # Label the axes
    ax.set_xlabel('Dieharder Tests', fontsize=20)
    ax.set_ylabel('P-values', fontsize=20)
    ax.set_title('P-values of Dieharder Tests', fontsize=20)

    # Set y-axis ticks at intervals of 0.1
    ax.set_yticks([i / 10.0 for i in range(0, 11)])  # 0.0, 0.1, 0.2, ..., 1.0

    # Set y-axis limits between 0 and 1
    ax.set_ylim(0, 1)

    # Rotate x-axis labels for better visibility
    plt.xticks(rotation=45, ha='right', fontsize=12)

    # Ensure tight layout to avoid overlap
    plt.tight_layout()
    cache.set(f"{job_id}_progressGraphDieharder", 21)

    # Add a custom legend for the color categories
    from matplotlib.patches import Patch
    legend_elements = [Patch(facecolor='green', edgecolor='green', label='Random (p > 0.01)'),
                       Patch(facecolor='blue', edgecolor='blue', label='Non-random (p ≤ 0.01)')]

    # Add the legend for the colors
    ax.legend(handles=legend_elements, loc='upper right', prop={'size': 14})

    # Create a BytesIO object to hold the image
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)

    global_graph_image = buf
   
    # Close the figure to free memory
    plt.close(fig)
    cache.set(f"{job_id}_progressGraphDieharder", 22)

    # Return the image as a response
    # return HttpResponse(buf, content_type='image/png')
    return HttpResponse(buf, content_type='image/png')


@csrf_exempt
def generate_pdf_report(request):
    global global_graph_image

    try:
        data = json.loads(request.body)
        binary_data = data.get('binary_data', '')
        job_id = data.get('job_id', str(uuid.uuid4()))
    except json.JSONDecodeError as e:
        print('Error parsing JSON:', e)
        return HttpResponse("Invalid JSON data.", status=400)

    cache.set(f"{job_id}_progressReport", 1)
    # Prepare binary data for .exe tests
    epsilon_list = [str(int(b)) for b in binary_data]
    n = str(len(epsilon_list))

    # Create an HttpResponse object with PDF headers
    graph_response = create_graph(request)
    graph_buffer = graph_response.content
    graph_image_io = BytesIO(graph_buffer)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="report.pdf"'

    # Set up the PDF buffer and document template with margins
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4,
                             rightMargin=10, leftMargin=10,
                             topMargin=10, bottomMargin=30, title="QNU Labs")

    styles = getSampleStyleSheet()
    date_style = ParagraphStyle('Date', parent=styles['Normal'], fontSize=10, fontName='Helvetica-Bold',  alignment=2, spaceAfter=10)
    title = Paragraph("Report-QNu Labs", styles['Title'])
    title_space = Spacer(1, 0.0 * inch)

    subtitle_style = styles['Heading2']
    subtitle_style.fontName = 'Helvetica-Bold'
    subtitle_style.fontSize = 12
    subtitle_style.underline = True

    nist_subtitle = Paragraph("NIST SP 800-22 Tests:", subtitle_style)
    graph_subtitle = Paragraph("Graphical Analysis:", subtitle_style)
    description_subtitle = Paragraph("Test Descriptions:", subtitle_style)
    subtitle_space = Spacer(1, 0.0 * inch)
    graph_space = Spacer(1, 0.0 * inch)

    cache.set(f"{job_id}_progressReport", 2)

    # --- NEW: Use .exe for all tests ---
    def run_test_exe(exe_path, test_name):
        try:
            with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
                        tmp.write(' '.join(epsilon_list))
                        tmp_filename = tmp.name
            cmd = [exe_path, str(n), tmp_filename]
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)
            if result.returncode != 0:
                print(f"Error in {test_name}: Return code {result.returncode}, stderr: {result.stderr}")
                return -1
            output = result.stdout.strip()
            print(f"{test_name} output:", output)
            p_value = float(output)
            return p_value if 0 <= p_value <= 1 else -1
        except Exception as e:
            print(f"Exception in {test_name}:", e)
            return -1

    def safe_test_call(exe_path, test_name):
        try:
            p_value = run_test_exe(exe_path, test_name)
            return 0 if p_value in [-1, None] else p_value
        except Exception as e:
            print(f"Error in {test_name}:", e)
            return 0
    cache.set(f"{job_id}_progressReport", 3)

    tests_executables = {
            'Frequency Test': ('fre', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\freqTest_exec.exe"),
            'Frequency Block Test': ('freBlock', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\freqBlockTest_exec.exe"),
            'Runs Test': ('runs', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\runsTest_exec.exe"),
            'Longest One Block Test': ('oneBlock', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\lonRunTest_exec.exe"),
            'Approximate Entropy Test': ('appEntropy', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\appETest_exec.exe"),
            'Linear Complexity Test': ('linComp', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\linCompTest_exec.exe"),
            'Non Overlapping Test': ('nonOver', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\tempNOTest_exec.exe"),
            'Overlapping Test': ('over', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\tempOTest_exec.exe"),
            'Universal Test': ('univ', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\univ_exec.exe"),
            'Serial Test': ('serial', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\serialTest_exec.exe"),
            'Cusum Test': ('cusum', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\cusTest_exec.exe"),
            'Random Excursion Test': ('re', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\ranETest_exec.exe"),
            'Random Excursion Variant Test': ('rev', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\ranEVTest_exec.exe"),
            'Binary Matrix Rank Test': ('rank', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\rankTest_exec.exe"),
            # 'DFT Test': ('dft', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\dftTest_exec.exe"),
    }

    test_results = {}
    x = 0
    m = 4
    for display_name, (label, exe_path) in tests_executables.items():
        p_value = safe_test_call(exe_path, display_name)
        test_results[display_name] = p_value
        cache.set(f"{job_id}_progressReport", m)
        m += 1
        if p_value > 0.01:
            x += 1
    
    # Prepare result text for each test
    def result_text(p):
        return 'random number' if p > 0.01 else 'non-random number'

    # Map test names to table rows
    frequency_test_text = result_text(test_results['Frequency Test'])
    frequency_test_block_text = result_text(test_results['Frequency Block Test'])
    runs_text = result_text(test_results['Runs Test'])
    longest_run_of_ones_text = result_text(test_results['Longest One Block Test'])
    binary_matrix_rank_text = result_text(test_results['Binary Matrix Rank Test'])
    # dft_text = result_text(test_results['DFT Test'])
    non_overlapping_text = result_text(test_results['Non Overlapping Test'])
    overlapping_text = result_text(test_results['Overlapping Test'])
    maurers_universal_text = result_text(test_results['Universal Test'])
    linear_complexity_text = result_text(test_results['Linear Complexity Test'])
    serial_text = result_text(test_results['Serial Test'])
    approximate_entropy_text = result_text(test_results['Approximate Entropy Test'])
    cumulative_sums_text = result_text(test_results['Cusum Test'])
    random_excursion_text = result_text(test_results['Random Excursion Test'])
    random_excursion_variant_text = result_text(test_results['Random Excursion Variant Test'])
    # For the following, you may need to adjust if you want to keep autocorrelation/adaptive statistical test results
    cache.set(f"{job_id}_progressReport", 19)
    final_text = 'random number' if x > 8 else 'non-random number'

    bold_red_style = ParagraphStyle(
        'BoldRed',
        parent=styles['Normal'],
        fontSize=12,
        fontName='Helvetica-Bold',
        textColor='red'
    )

    data1 = [
        [Paragraph('Test type', styles['Normal']), 'Result', 'Test type', 'Result'],
        [Paragraph('1. Frequency Test', styles['Normal']), frequency_test_text,
         Paragraph('2. Frequency Test within a Block', styles['Normal']), frequency_test_block_text],
        [Paragraph('3. Runs Test', styles['Normal']), runs_text,
         Paragraph('4. Test for the longest Run of Ones', styles['Normal']), longest_run_of_ones_text],
        [Paragraph('5. Binary Matrix Rank Test', styles['Normal']), binary_matrix_rank_text,
         Paragraph('6. Discrete Fourier Transform Test', styles['Normal']), 'non-random number'],
        [Paragraph('7. Non-overlapping Template Match', styles['Normal']), non_overlapping_text,
         Paragraph('8. Overlapping Template Matching Test', styles['Normal']), overlapping_text],
        [Paragraph('9. Maurers Universal test', styles['Normal']), maurers_universal_text,
         Paragraph('10. Linear complexity Test', styles['Normal']), linear_complexity_text],
        [Paragraph('11. Serial Test', styles['Normal']), serial_text,
         Paragraph('12. Approximate Entropy Test', styles['Normal']), approximate_entropy_text],
        [Paragraph('13. Cumulative Sum Test', styles['Normal']), cumulative_sums_text,
         Paragraph('14. Random Excursions Test', styles['Normal']), random_excursion_text],
        [Paragraph('15. Random Excursions Variant Test', styles['Normal']), random_excursion_variant_text, '', ''],
        [Paragraph('Final Result', styles['Normal']), Paragraph(final_text, bold_red_style)],
    ]
    cache.set(f"{job_id}_progressReport", 20)
    colWidths = [2 * inch, 1.5 * inch, 2 * inch, 1.5 * inch]
    table1 = Table(data1, colWidths=colWidths)
    table1.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.blue),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))

    data2 = [
        [Image(graph_image_io, width=400, height=370)]
    ]
    table2 = Table(data2, colWidths=[4 * inch])
    table2.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'CENTER')]))

    logo_path = os.path.join(os.path.dirname(__file__), 'qnulogo.png')
    logo_image = Image(logo_path, width=0.5 * inch, height=0.5 * inch)
    logo_table = Table([[logo_image]], colWidths=[6.5 * inch], rowHeights=[0.5 * inch])
    logo_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (0, 0), 'CENTRE'),
        ('VALIGN', (100, 100), (0, 0), 'TOP'),
    ]))

    nist_description = """
    <b>NIST Statistical Tests Description:</b><br/><br/>
    ...existing description...
    """
    cache.set(f"{job_id}_progressReport", 22)
    description_style = ParagraphStyle(
        'Description',
        parent=styles['Normal'],
        fontSize=10,
        fontName='Helvetica',
        leading=12,
        spaceAfter=10
    )

    nist_description_paragraph = Paragraph(nist_description, description_style)
    cache.set(f"{job_id}_progressReport", 23)
    # AI Analysis (unchanged)
    test_results_text = {
        "Frequency Test": frequency_test_text,
        "Frequency Test within a Block": frequency_test_block_text,
        "Runs Test": runs_text,
        "Test for the Longest Run of Ones": longest_run_of_ones_text,
        "Binary Matrix Rank Test": binary_matrix_rank_text,
        # "Discrete Fourier Transform Test": dft_text,
        "Non-overlapping Template Match": non_overlapping_text,
        "Overlapping Template Matching Test": overlapping_text,
        "Maurers Universal test": maurers_universal_text,
        "Linear complexity Test": linear_complexity_text,
        "Serial Test": serial_text,
        "Approximate Entropy Test": approximate_entropy_text,
        "Cumulative Sum Test": cumulative_sums_text,
        "Random Excursions Test": random_excursion_text,
        "Random Excursions Variant Test": random_excursion_variant_text,
    }

    AIAnalysis_subtitle = Paragraph("AI Analysis:", subtitle_style)
    prompt = "Perform a detailed analysis of the results from all the statistical tests. For each test, display the test name along with its p-value and indicate whether the result is Random or Non-Random based on the condition that if p-value > 0.05 e.g: test_name: test_result, the number is considered Random; otherwise, it is Non-Random. In the analysis, mention that basis of selecting random or non random is majority of tests response. Finally tell these many tests give random number or non random number as a result along with their names"

    response1 = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[{"text": prompt}, {"text": json.dumps(test_results_text)}],
    )
    if response1.candidates:
        gemini_analysis = response1.candidates[0].content.parts[0].text
    else:
        gemini_analysis = ""

    cache.set(f"{job_id}_progressReport", 24)

    formatted_output = format_markdown(gemini_analysis)
    bullet_points = formatted_output.replace("<ul>", "").replace("</ul>", "").split("<li>")
    bullet_points = [point.replace("</li>", "").strip() for point in bullet_points if point.strip()]

    gemini_analysis_paragraph = ListFlowable(
        [ListItem(Paragraph(point, styles['Normal'])) for point in bullet_points],
        bulletType='bullet',
    )

    elements = [
        logo_table,
        title,
        title_space,
        nist_subtitle,
        subtitle_space,
        table1,
        subtitle_space,
        graph_subtitle,
        table2,
        subtitle_space,
        description_subtitle,
        subtitle_space,
        nist_description_paragraph,
        AIAnalysis_subtitle,
        gemini_analysis_paragraph,
    ]
    doc.build(elements)
    cache.set(f"{job_id}_progressReport", 25)
    pdf = buffer.getvalue()
    buffer.close()
    response.write(pdf)

    return response

@csrf_exempt
def get_progress_nist(request, job_id):
    progress = cache.get(f"{job_id}_progressReport", 0)
    return JsonResponse({"progress": int(progress)})

import markdown
def format_markdown(gemini_analysis):
    """Convert the text response into a list of bullet points with bold text up to the first semicolon."""
    # Remove any extra "*" and split the response into lines
    cleaned_analysis = gemini_analysis.replace("*", "").splitlines()

    # Process each line to ensure proper formatting
    formatted_points = []
    for line in cleaned_analysis:
        line = line.strip()
        if ";" in line:
            # Split the line at the first semicolon
            parts = line.split(";", 1)
            bold_part = f"<b>{parts[0].strip()}</b>"  # Make the part before the semicolon bold
            rest_part = parts[1].strip()  # Keep the rest of the line as is
            line = f"{bold_part}; {rest_part}"  # Combine the bold and non-bold parts
        if line:  # Add non-empty lines as list items
            formatted_points.append(f"<li>{line}</li>")

    # Combine the formatted points into an unordered list
    return f"<ul>{''.join(formatted_points)}</ul>"

@csrf_exempt
def get_progress_nist90b(request, job_id):
    progress = cache.get(f"{job_id}_progressReport90b", 0)
    return JsonResponse({"progress": int(progress)})

from reportlab.platypus import ListFlowable, ListItem


@csrf_exempt
def generate_pdf_report_nist90b(request):
    global global_graph_image

    try:
        data = json.loads(request.body)
        job_id = data.get('job_id', str(uuid.uuid4()))
        binary_data = data.get('binary_data', '')
    except json.JSONDecodeError as e:
        print('Error parsing JSON:', e)
        return HttpResponse("Invalid JSON data.", status=400)
    cache.set(f"{job_id}_progressReport90b", 0)

    # Create an HttpResponse object with PDF headers
    graph_response = create_graph_nist90b(request)
    graph_buffer = graph_response.content
    graph_image_io = BytesIO(graph_buffer)
    cache.set(f"{job_id}_progressReport90b", 2)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="report.pdf"'

    # Set up the PDF buffer and document template with margins
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4,
                             rightMargin=10, leftMargin=10,
                             topMargin=10, bottomMargin=30, title="QNU Labs")

    styles = getSampleStyleSheet()
    date_style = ParagraphStyle('Date', parent=styles['Normal'], fontSize=10, fontName='Helvetica-Bold',  alignment=2, spaceAfter=10)
    title = Paragraph("Report-QNu Labs", styles['Title'])
    title_space = Spacer(1, 0.0 * inch)

    subtitle_style = styles['Heading2']
    subtitle_style.fontName = 'Helvetica-Bold'
    subtitle_style.fontSize = 12
    subtitle_style.underline = True

    nist_subtitle = Paragraph("NIST SP 800-90B Tests:", subtitle_style)
    graph_subtitle = Paragraph("Graphical Analysis:", subtitle_style)
    description_subtitle = Paragraph("Test Descriptions:", subtitle_style)
    subtitle_space = Spacer(1, 0.0 * inch)
    graph_space = Spacer(1, 0.0 * inch)
    cache.set(f"{job_id}_progressReport90b", 3)

    # --- NEW: Use .exe for all tests ---
    def run_test_exe(exe_path, test_name):
        try:
            cmd = [exe_path, binary_data]
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)
            if result.returncode not in [0, 1]:
                print(f"Error in {test_name}: Return code {result.returncode}, stderr: {result.stderr}")
                return None, "non-random number"
            output = result.stdout.strip()
            print(f"{test_name} output:", output)
            min_entropy = float(output) if output else 0.0
            result_text = "random number" if result.returncode == 1 else "non-random number"
            return min_entropy, result_text
        except Exception as e:
            print(f"Exception in {test_name}:", e)
            return None, "non-random number"

    def safe_test_call(exe_path, test_name):
        try:
            min_entropy, result_text = run_test_exe(exe_path, test_name)
            return (min_entropy if min_entropy is not None else 0.0), result_text
        except Exception as e:
            print(f"Error in {test_name}:", e)
            return 0.0, "non-random number"

    # Paths to executables for each test
    tests_executables = {
        'Collision Test': ('col', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\collisionTest_exec.exe"),
        'Markov Test': ('markov',  r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\markovTest_exec.exe"),
        'Compression Test': ('compression',  r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\compressionTest_exec.exe"),
        'LZ78Y Test': ('l278y', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\l278yTest_exec.exe"),
        'Lag Test': ('lag', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\lagTest_exec.exe"),
        'MCW Test': ('mcw', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\multiMcwTest_exec.exe"),
        'MMC Test': ('mmc', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\multiMmcTest_exec.exe"),
    }

    test_results = {}
    passed_test_count = 0
    progress_counter = 4

    for test_name, (label, exe_path) in tests_executables.items():
        min_entropy, result_text = safe_test_call(exe_path, test_name)
        test_results[test_name] = {
            "min_entropy": min_entropy,
            "result": result_text
        }
        if result_text == "random number":
            passed_test_count += 1
        cache.set(f"{job_id}_progressReport90b", progress_counter)
        progress_counter += 1

    # Final decision based on number of passed tests
    final_text = 'random number' if passed_test_count > 4 else 'non-random number'

    # Dynamically set the result text based on the test outcome
    collision_test_text = test_results['Collision Test']['result']
    markov_test_text = test_results['Markov Test']['result']
    compression_test_text = test_results['Compression Test']['result']
    lz78y_test_text = test_results['LZ78Y Test']['result']
    lag_test_text = test_results['Lag Test']['result']
    mcw_test_text = test_results['MCW Test']['result']
    mmc_test_text = test_results['MMC Test']['result']
    cache.set(f"{job_id}_progressReport90b", 11)
    bold_red_style = ParagraphStyle(
        'BoldRed',
        parent=styles['Normal'],
        fontSize=12,
        fontName='Helvetica-Bold',
        textColor='red'
    )

    data1 = [
        [Paragraph('Test type', styles['Normal']), 'Result', 'Test type', 'Result'],
        [Paragraph('1. Collision Test', styles['Normal']), collision_test_text,
         Paragraph('2. Markov Test', styles['Normal']), markov_test_text],
        [Paragraph('3. Compression Test', styles['Normal']), compression_test_text,
         Paragraph('4. LZ78Y Test', styles['Normal']), lz78y_test_text],
        [Paragraph('5. Lag Test', styles['Normal']), lag_test_text,
         Paragraph('6. MCW Test', styles['Normal']), mcw_test_text],
        [Paragraph('7. MMC Test', styles['Normal']), mmc_test_text, '', ''],
        [Paragraph('Final Result', styles['Normal']), Paragraph(final_text, bold_red_style)],
    ]
    cache.set(f"{job_id}_progressReport90b", 12)
    colWidths = [2 * inch, 1.5 * inch, 2 * inch, 1.5 * inch]
    table1 = Table(data1, colWidths=colWidths)
    table1.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.blue),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))

    data2 = [
        [Image(graph_image_io, width=400, height=350)]
    ]
    table2 = Table(data2, colWidths=[4 * inch])
    table2.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'CENTER')]))

    logo_path = os.path.join(os.path.dirname(__file__), 'qnulogo.png')
    logo_image = Image(logo_path, width=0.5 * inch, height=0.5 * inch)
    logo_table = Table([[logo_image]], colWidths=[6.5 * inch], rowHeights=[0.5 * inch])
    logo_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (0, 0), 'CENTRE'),
        ('VALIGN', (100, 100), (0, 0), 'TOP'),
    ]))

    nist_description = """
    <b>NIST SP 800-90B Statistical Tests Description:</b><br/><br/>
    1. <b>Collision Test</b>: Evaluates how often identical sequences (or "collisions") appear in the data. Frequent collisions indicate a lack of randomness.<br/><br/>
    2. <b>Markov Test</b>: Analyzes the transition probabilities between symbols in a sequence to detect dependencies. A truly random sequence should have transitions that are statistically independent.<br/><br/>
    3. <b>Compression Test</b>: Checks whether the sequence can be significantly compressed. Highly compressible sequences are likely non-random, as random sequences should have little redundancy.<br/><br/>
    4. <b>LZ78Y Test</b>: Based on the Lempel-Ziv compression algorithm, this test measures the complexity of the sequence by checking how efficiently it can be parsed into unique substrings.<br/><br/>
    5. <b>Lag Test</b>: Examines the correlation between bits separated by a fixed lag. Random sequences should not exhibit significant correlation at any lag.<br/><br/>
    6. <b>MCW Test</b>: Identifies the most frequent value in the sequence and assesses whether it appears too often, which would indicate a lack of randomness.<br/><br/>
    7. <b>MMC Test</b>: Examines the frequency of multi-bit patterns appearing in the sequence. A deviation from expected frequencies suggests non-randomness.<br/><br/>
    """

    description_style = ParagraphStyle(
        'Description',
        parent=styles['Normal'],
        fontSize=10,
        fontName='Helvetica',
        leading=12,
        spaceAfter=10
    )

    nist_description_paragraph = Paragraph(nist_description, description_style)
    cache.set(f"{job_id}_progressReport90b", 13)
    # AI Analysis (unchanged)
    test_results_text = {
        "Collision Test": collision_test_text,
        "Markov Test": markov_test_text,
        "Compression Test": compression_test_text,
        "LZ78Y Test": lz78y_test_text,
        "Lag Test": lag_test_text,
        "MCW Test": mcw_test_text,
        "MMC Test": mmc_test_text,
    }

    AIAnalysis_subtitle = Paragraph("AI Analysis:", subtitle_style)
    prompt = "Perform a detailed analysis of the results from all the statistical tests. For each test, display the test name along with its min-entropy and indicate whether the result is Random or Non-Random based on the executable's output. In the analysis, mention that the basis of selecting random or non-random is the majority of tests' response. Finally, tell how many tests give random number or non-random number as a result along with their names."

    response1 = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[{"text": prompt}, {"text": json.dumps(test_results_text)}],
    )
    if response1.candidates:
        gemini_analysis = response1.candidates[0].content.parts[0].text
    else:
        gemini_analysis = ""

    cache.set(f"{job_id}_progressReport90b", 14)

    formatted_output = format_markdown(gemini_analysis)
    bullet_points = formatted_output.replace("<ul>", "").replace("</ul>", "").split("<li>")
    bullet_points = [point.replace("</li>", "").strip() for point in bullet_points if point.strip()]

    gemini_analysis_paragraph = ListFlowable(
        [ListItem(Paragraph(point, styles['Normal'])) for point in bullet_points],
        bulletType='bullet',
    )

    elements = [
        logo_table,
        title,
        title_space,
        nist_subtitle,
        subtitle_space,
        table1,
        subtitle_space,
        graph_subtitle,
        table2,
        subtitle_space,
        description_subtitle,
        subtitle_space,
        nist_description_paragraph,
        AIAnalysis_subtitle,
        gemini_analysis_paragraph,
    ]
    doc.build(elements)
    cache.set(f"{job_id}_progressReport90b", 15)
    pdf = buffer.getvalue()
    buffer.close()
    response.write(pdf)

    return response

@csrf_exempt
def get_progress_graph90b(request, job_id):
    progress = cache.get(f"{job_id}_progressReport90b", 0)
    return JsonResponse({"progress": int(progress)})

@csrf_exempt
def get_progress_ReportDieharder(request, job_id):
    progress = cache.get(f"{job_id}_progressReportDieharder", 0)
    return JsonResponse({"progress": int(progress)})

@csrf_exempt
def generate_pdf_report_dieharder(request):
    global global_graph_image

    try:
        data = json.loads(request.body)
        binary_data = data.get('binary_data', '')
        job_id = data.get('job_id', str(uuid.uuid4()))
    except json.JSONDecodeError as e:
        print('Error parsing JSON:', e)
        return HttpResponse("Invalid JSON data.", status=400)
    cache.set(f"{job_id}_progressReportDieharder", 0)

    # Clean up binary data
    binary_data = binary_data.replace('%0A', '').replace('%20', '').replace(' ', '').replace('\n', '').replace('\r', '')

    # Create a HttpResponse object with PDF headers
    graph_response = create_graph_dieharder(request)
    cache.set(f"{job_id}_progressReportDieharder", 2)
    graph_buffer = graph_response.content
    graph_image_io = BytesIO(graph_buffer)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="report.pdf"'

    # Set up the PDF buffer and document template with margins
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4,
                            rightMargin=10, leftMargin=10,
                            topMargin=10, bottomMargin=30, title="QNU Labs")

    # Set up styles
    styles = getSampleStyleSheet()

    # Add a headline (title)
    title = Paragraph("Report-QNu Labs", styles['Title'])
    title_space = Spacer(1, 0.0 * inch)  # Small spacer below the title

    # Add subtitles with underlining
    subtitle_style = styles['Heading2']
    subtitle_style.fontName = 'Helvetica-Bold'
    subtitle_style.fontSize = 12
    subtitle_style.underline = True

    dieharder_subtitle = Paragraph("Dieharder Tests:", subtitle_style)
    graph_subtitle = Paragraph("Graphical Analysis:", subtitle_style)

    subtitle_space = Spacer(2, 0.0 * inch)  # Spacer below the subtitles
    cache.set(f"{job_id}_progressReportDieharder", 3)
    x = 0  # Counter for random results

    # Perform tests and increment x for each test that returns True
    birthday_test_result = BirthdaySpacingsTest.BirthdaySpacingsTest(binary_data)[1]
    x += 1 if birthday_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 4)
    parking_test_block_result = ParkingLotTest.ParkingLotTest(binary_data)[1]
    x += 1 if parking_test_block_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 5)

    overlapping_5_test_result = Overlapping5PermutationTest.Overlapping5PermutationTest(binary_data)[1]
    x += 1 if overlapping_5_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 6)

    minimum_distance_test_result = MinimumDistanceTest.MinimumDistanceTest(binary_data)[1]
    x += 1 if minimum_distance_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 7)

    rank_31_test_result = Ranks31x31MatricesTest.Ranks31x31MatricesTest(binary_data)[1]
    x += 1 if rank_31_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 8)

    spheres_test_result = Spheres3DTest.Spheres3DTest(binary_data)[1]
    x += 1 if spheres_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 9)

    rank_32_result = Ranks32x32MatricesTest.Ranks32x32MatricesTest(binary_data)[1]
    x += 1 if rank_32_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 10)

    craps_test_result = CrapsTest.CrapsTest(binary_data)[1]
    x += 1 if craps_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 11)

    bitstream_test_result = BitstreamTest.BitstreamTest(binary_data)[1]
    x += 1 if bitstream_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 12)

    gcd_test_result = MarsagliaTsangGCDTest.MarsagliaTsangGCDTest(binary_data)[1]
    x += 1 if gcd_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 13)

    opso_test_result = OPSOTest.OPSOTest(binary_data)[1]
    x += 1 if opso_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 14)

    oqsq_test_result = OQSOTest.OQSOTest(binary_data)[1]
    x += 1 if oqsq_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 15)

    dna_test_result = DNATest.DNATest(binary_data)[1]
    x += 1 if dna_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 16)

    count_one_stream_test_result = CountThe1sStreamTest.CountThe1sStreamTest(binary_data)[1]
    x += 1 if count_one_stream_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 17)

    count_one_byte_test_result = CountThe1sByteTest.CountThe1sByteTest(binary_data)[1]
    x += 1 if count_one_byte_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 18)

    simple_gcd_test_result = MarsagliaTsangSimpleGCDTest.MarsagliaTsangSimpleGCDTest(binary_data)[1]
    x += 1 if simple_gcd_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 19)

    generalized_minimum_test_result = GeneralizedMinimumDistanceTest.GeneralizedMinimumDistanceTest(binary_data)[1]
    x += 1 if generalized_minimum_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 20)

    u01_linear_complexity_test_result = TestU01LinearComplexityTest.TestU01LinearComplexityTest(binary_data)[1]
    x += 1 if u01_linear_complexity_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 21)

    u01_longest_repeated_test_result = TestU01LongestRepeatedSubstringTest.TestU01LongestRepeatedSubstringTest(binary_data)[1]
    x += 1 if u01_longest_repeated_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 22)

    u01_matrix_rank_test_result = TestU01MatrixRankTest.TestU01MatrixRankTest(binary_data)[1]
    x += 1 if u01_matrix_rank_test_result else 0
    cache.set(f"{job_id}_progressReportDieharder", 23)

    final_text = 'random number' if x > 10 else 'non-random number'
    cache.set(f"{job_id}_progressReportDieharder", 24)

    # Dynamically set the result text based on the test outcome
    birthday_text = 'random number' if birthday_test_result else 'non-random number'
    parking_text = 'random number' if parking_test_block_result else 'non-random number'
    overlapping_5_text = 'random number' if overlapping_5_test_result else 'non-random number'
    minimum_distance_text = 'random number' if minimum_distance_test_result else 'non-random number'
    rank31x31_text = 'random number' if rank_31_test_result else 'non-random number'
    spheres_text = 'random number' if spheres_test_result else 'non-random number'
    rank32x32_text = 'random number' if rank_32_result else 'non-random number'
    craps_text = 'random number' if craps_test_result else 'non-random number'
    bitstream_text = 'random number' if bitstream_test_result else 'non-random number'
    gcd_text = 'random number' if gcd_test_result else 'non-random number'
    opso_text = 'random number' if opso_test_result else 'non-random number'
    oqsq_text = 'random number' if oqsq_test_result else 'non-random number'
    dna_text = 'random number' if dna_test_result else 'non-random number'
    one_stream_text = 'random number' if count_one_stream_test_result else 'non-random number'
    one_byte_text = 'random number' if count_one_byte_test_result else 'non-random number'
    simple_gcd_text = 'random number' if simple_gcd_test_result else 'non-random number'
    generalized_minimum_text = 'random number' if generalized_minimum_test_result else 'non-random number'
    u01_linear_text = 'random number' if u01_linear_complexity_test_result else 'non-random number'
    u01longest_text = 'random number' if u01_longest_repeated_test_result else 'non-random number'
    u01_matrix_text = 'random number' if u01_matrix_rank_test_result else 'non-random number'

    # Sample Table Data for the first table with "Final Result" in the last row
    data1 = [
        [Paragraph('Test type', styles['Normal']), 'Result', 'Test type', 'Result'],
        [Paragraph('1. Birthday Spacing', styles['Normal']), birthday_text, Paragraph('2. Parking Lot Test', styles['Normal']), parking_text],
        [Paragraph('3. Overlapping 5 Permutation', styles['Normal']), overlapping_5_text, Paragraph('4. Minimum Distance Test', styles['Normal']), minimum_distance_text],
        [Paragraph('5. Ranks of 31x31 Test', styles['Normal']), rank31x31_text, Paragraph('6. 3D Spheres Test', styles['Normal']), spheres_text],
        [Paragraph('7. Ranks of 32x32 Test', styles['Normal']), rank32x32_text, Paragraph('8. Craps Test', styles['Normal']), craps_text],
        [Paragraph('9. Bitstream Test', styles['Normal']), bitstream_text, Paragraph('10. Marsaglia-Tsang GCD Test', styles['Normal']), gcd_text],
        [Paragraph('11. OPSO Test', styles['Normal']), opso_text, Paragraph('12. OQSO Test', styles['Normal']), oqsq_text],
        [Paragraph('13. DNA Test', styles['Normal']), dna_text, Paragraph('14. Count the Ones (Stream) Test', styles['Normal']), one_stream_text],
        [Paragraph('15. Count the Ones (Bytes) Test', styles['Normal']), one_byte_text, Paragraph('16. Marsaglia-Tsang Simple GCD Test', styles['Normal']), simple_gcd_text],
        [Paragraph('17. Generalized Minimum Distance Test', styles['Normal']), generalized_minimum_text, Paragraph('18. TestU01 Linear Complexity Test', styles['Normal']), u01_linear_text],
        [Paragraph('19. TestU01 Longest Repeated Substring Test', styles['Normal']), u01longest_text, Paragraph('20. TestU01 Matrix Rank Test', styles['Normal']), u01_matrix_text],
        [Paragraph('Final Result', styles['Normal']), Paragraph(final_text, styles['Heading2'])],
    ]

    test_results = {
        "Birthday Test":  birthday_text,
        "Parking Test": parking_text,
        "Overlapping Test": overlapping_5_text,
        "Minimum Distance Test": minimum_distance_text,
        "31x31 Rank Test":  rank31x31_text,
        "Spheres Test": spheres_text ,
        "32x32 Rank Test": rank32x32_text,
        "Craps Test": craps_text,
        "Bitstream test":  bitstream_text,
        "GCD Test": gcd_text,
        "OPSO Test": opso_text,
        "OQSO Test": oqsq_text,
        "DNA Test": dna_text,
        "One stream Test": one_stream_text,
        "One byte Test": one_byte_text,
        "Simple Gcd Test": simple_gcd_text,
        "Generalised Minimum Test": generalized_minimum_text,
        "U01 Linear Test": u01_linear_text,
        "U01 Longest Test": u01longest_text,
        "U01 Matrix Test": u01_matrix_text,
    }
    cache.set(f"{job_id}_progressReportDieharder", 25)
    AIAnalysis_subtitle = Paragraph("AI Analysis:", subtitle_style)

    # Create the prompt
    prompt = "Perform a detailed analysis of the results from all the statistical tests. For each test, display the test name along with its p-value and indicate whether the result is Random or Non-Random based on the condition that if p-value > 0.05 e.g: test_name: test_result, the number is considered Random; otherwise, it is Non-Random. In the analysis, mention that basis of selecting random or non random is majority of tests response. Finally tell these many tests give random number or non random number as a result along with their names"

    # Send request to Gemini
    response1 = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[{"text": prompt}, {"text": json.dumps(test_results)}],
    )
    if response1.candidates:
        gemini_analysis = response1.candidates[0].content.parts[0].text
        # print(gemini_analysis)
    else:
        print("No response received from Gemini.")
    
    cache.set(f"{job_id}_progressReportDieharder", 26)

    description_style = ParagraphStyle(
        'Description',
        parent=styles['Normal'],
        fontSize=10,
        fontName='Helvetica',
        leading=12,
        spaceAfter=10
    )

    formatted_output = format_markdown(gemini_analysis)

    # Convert the formatted output into a list of bullet points
    bullet_points = formatted_output.replace("<ul>", "").replace("</ul>", "").split("<li>")
    bullet_points = [point.replace("</li>", "").strip() for point in bullet_points if point.strip()]

    # Create a ListFlowable for the bullet points
    gemini_analysis_paragraph = ListFlowable(
        [ListItem(Paragraph(point, styles['Normal'])) for point in bullet_points],
        bulletType='bullet',
        
    )
    
    AIAnalysis_subtitle = Paragraph("AI Analysis:", subtitle_style)

    cache.set(f"{job_id}_progressReportDieharder", 27)

    # Adjust column widths
    colWidths = [2 * inch, 1.5 * inch, 2 * inch, 1.5 * inch]

    # Create the first table object with adjusted column widths
    table1 = Table(data1, colWidths=colWidths)

    # Apply styles to the first table
    table1.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.blue),  # Header background color
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),  # Header text color
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),  # Center text alignment
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),  # Bold header
        ('FONTSIZE', (0, 0), (-1, -1), 10),  # Set font size
        ('GRID', (0, 0), (-1, -1), 1, colors.black),  # Add gridlines
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),  # Center vertically
    ]))

    # Use the BytesIO object to create an Image
    graph_image = Image(graph_image_io, width=7 * inch, height=4.5 * inch)

    cache.set(f"{job_id}_progressReportDieharder", 28)

    # Add a paragraph with the current date
    # current_date = datetime.now().strftime("%B %d, %Y")  # Format as "December 06, 2024"
    date_style = ParagraphStyle('Date', parent=styles['Normal'], fontSize=10, fontName='Helvetica-Bold', alignment=2, spaceAfter=10)
    # date_paragraph = Paragraph(f"Date: {current_date}", date_style)

    # Add logo on the top-right corner
    logo_path = os.path.join(os.path.dirname(__file__), 'qnulogo.png')
    logo_image = Image(logo_path, width=0.5 * inch, height=0.5 * inch)
    logo_table = Table([[logo_image]], colWidths=[6.5 * inch], rowHeights=[0.5 * inch])
    logo_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (0, 0), 'CENTRE'),  # Align logo to the left
        ('VALIGN', (100, 100), (0, 0), 'TOP'),  # Align logo to the top
    ]))
    cache.set(f"{job_id}_progressReportDieharder", 29)
    description_subtitle = Paragraph("Dieharder Tests Description:", subtitle_style)
    # Dieharder Tests Description
    dieharder_description = """
    1. <b>Birthday Spacing</b>: This test simulates the "birthday paradox" by generating random "birthdays" and measuring the spacing between them. It checks if the spacings between these random points are uniformly distributed. Non-random sequences may show clustering or gaps in the spacings.<br/><br/>
    2. <b>Overlapping Permutations</b>: This test checks the frequency of overlapping sequences of five random numbers. It ensures that all possible permutations of five numbers appear with approximately equal frequency. Non-random sequences may show biases in certain permutations.<br/><br/>
    3. <b>Ranks of 31x31 and 32x32 Matrices</b>: This test evaluates the rank of random matrices generated from the sequence. It checks if the matrices are of full rank, as expected in a random sequence. Non-random sequences may produce matrices with lower rank due to dependencies.<br/><br/>
    4. <b>Ranks of 6x8 Matrices</b>: Similar to the above test, but it uses smaller matrices (6x8). It checks for linear independence in smaller subsets of the sequence. Non-random sequences may fail to produce full-rank matrices.<br/><br/>
    5. <b>Monkey Tests</b>: This test simulates monkeys randomly typing on a keyboard. It checks if the sequence behaves like random typing, where all possible patterns should appear with equal probability. Non-random sequences may show biases or missing patterns.<br/><br/>
    6. <b>Count the 1s</b>: This test counts the number of ones in specific bit lengths of the sequence. It ensures that the count of ones is consistent with the expected binomial distribution. Non-random sequences may show deviations in the number of ones.<br/><br/>
    7. <b>Count the 1s in Specific Bytes</b>: This test focuses on the number of ones in specific byte lengths. It checks if the distribution of ones within bytes is uniform. Non-random sequences may show biases in certain byte patterns.<br/><br/>
    8. <b>Parking Lot Test</b>: This test simulates parking cars randomly in a parking lot. It checks if the placement of cars (points) is uniformly distributed. Non-random sequences may show clustering or gaps in the placement of points.<br/><br/>
    9. <b>Minimum Distance Test</b>: This test measures the minimum distance between random points placed in a square. It checks if the distances between points follow the expected distribution. Non-random sequences may show points that are too close or too far apart.<br/><br/>
    10. <b>Random Spheres Test</b>: This test places random points in a cube and checks the distribution of distances between them. It ensures that the distances are consistent with a random distribution. Non-random sequences may show unusual clustering or spacing.<br/><br/>
    11. <b>Squeeze Test</b>: This test compresses the sequence and checks for compressibility. A truly random sequence should not be compressible, as it lacks patterns. If the sequence can be compressed significantly, it indicates non-randomness.<br/><br/>
    12. <b>Overlapping Sums Test</b>: This test checks the distribution of sums of overlapping subsequences. It ensures that the sums are normally distributed, as expected in a random sequence. Non-random sequences may show deviations in the distribution of sums.<br/><br/>
    13. <b>Runs Test</b>: Similar to the NIST Runs Test, this test counts the number of runs (sequences of consecutive identical bits) in the sequence. It checks if the number of runs is consistent with a random sequence. Non-random sequences may have too many or too few runs.<br/><br/>
    14. <b>Craps Test</b>: This test simulates the game of craps using the sequence as a source of random numbers. It checks if the outcomes of the dice rolls are consistent with the expected probabilities. Non-random sequences may show biases in the outcomes.<br/><br/>
    15. <b>Marsaglia and Tsang GCD Test</b>: This test uses the greatest common divisor (GCD) of pairs of numbers generated from the sequence. It checks if the distribution of GCD values is consistent with a random sequence. Non-random sequences may show deviations in the GCD distribution.<br/><br/>
    16. <b>STS Monobit Test</b>: This test checks the proportion of ones and zeros in the sequence. It ensures that the sequence has an approximately equal number of ones and zeros. Non-random sequences may show a bias towards ones or zeros.<br/><br/>
    17. <b>STS Runs Test</b>: Similar to the NIST Runs Test, this test counts the number of runs in the sequence. It checks if the sequence has the expected number of runs for a random sequence. Non-random sequences may have too many or too few runs.<br/><br/>
    18. <b>STS Serial Test</b>: This test examines the frequency of overlapping m-bit patterns in the sequence. It ensures that all possible patterns appear with approximately equal frequency. Non-random sequences may show biases in certain patterns.<br/><br/>
    19. <b>RGB Bit Distribution Test</b>: This test checks the distribution of bits in RGB color values generated from the sequence. It ensures that the bits are uniformly distributed across the color channels. Non-random sequences may show biases in certain color channels.<br/><br/>
    20. <b>RGB Generalized Minimum Distance Test</b>: This test measures the minimum distance between RGB color values generated from the sequence. It checks if the distances between colors are consistent with a random distribution. Non-random sequences may show unusual clustering or spacing in color values.<br/><br/>
    """

    description_style = ParagraphStyle(
        'Description',
        parent=styles['Normal'],
        fontSize=10,
        fontName='Helvetica',
        leading=12,
        spaceAfter=10
    )

    dieharder_description_paragraph = Paragraph(dieharder_description, description_style)

    # Build the PDF document
    elements = [
        logo_table,
        # date_paragraph,
        title,
        title_space,
        dieharder_subtitle,
        subtitle_space,
        table1,
        subtitle_space,
        graph_subtitle,
        subtitle_space,
        graph_image,
        subtitle_space,
        description_subtitle,
        dieharder_description_paragraph,
        AIAnalysis_subtitle,
        gemini_analysis_paragraph,
    ]

    doc.build(elements)
    cache.set(f"{job_id}_progressReportDieharder", 30)
    # Write the PDF to the HttpResponse
    response.write(buffer.getvalue())
    buffer.close()

    return response

@csrf_exempt
def generate_pdf_report_server(request):
    global global_graph_image
    try:
        data = json.loads(request.body)
        binary_data = data.get('binary_data', '')
        job_id = data.get('job_id', str(uuid.uuid4()))
    except json.JSONDecodeError as e:
        print('Error parsing JSON:', e)
        return HttpResponse("Invalid JSON data.", status=400)

    cache.set(f"{job_id}_progressReportServer", 0)
    binary_data = binary_data.replace('%0A', '').replace('%20', '').replace(' ', '').replace('\n', '').replace('\r', '')

    # Prepare binary data for .exe tests (NIST SP 800-22)
    epsilon_list = [str(int(b)) for b in binary_data]
    n = str(len(epsilon_list))
    cache.set(f"{job_id}_progressReportServer", 2)
    # Generate graphs for all three test sets
    graph_response1 = create_graph(request)
    cache.set(f"{job_id}_progressReportServer", 3)
    graph_response = create_graph_dieharder(request)
    cache.set(f"{job_id}_progressReportServer", 4)
    graph_response2 = create_graph_nist90b(request)
    cache.set(f"{job_id}_progressReportServer", 5)
    graph_buffer1 = graph_response1.content
    graph_buffer = graph_response.content
    graph_buffer2 = graph_response2.content

    graph_image_io1 = BytesIO(graph_buffer1)
    graph_image_io = BytesIO(graph_buffer)
    graph_image_io2 = BytesIO(graph_buffer2)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="report.pdf"'

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4,
                            rightMargin=10, leftMargin=10,
                            topMargin=10, bottomMargin=30, title="QNU Labs")

    styles = getSampleStyleSheet()
    title = Paragraph("Report-QNu Labs", styles['Title'])
    title_space = Spacer(1, 0.0 * inch)
    subtitle_style = styles['Heading2']
    subtitle_style.fontName = 'Helvetica-Bold'
    subtitle_style.fontSize = 12
    subtitle_style.underline = True
    nist_subtitle = Paragraph("Statistical Tests:", subtitle_style)
    subtitle_space = Spacer(1, 0.5 * inch)
    graph_subtitle = Paragraph("Graphical Analysis:", subtitle_style)
    bold_red_style = ParagraphStyle(
        'BoldRed', parent=styles['Normal'], fontSize=12, fontName='Helvetica-Bold', textColor='red'
    )
    cache.set(f"{job_id}_progressReportServer", 6)
    def run_test_exe(exe_path, test_name):
        try:
            cmd = [exe_path, n] + epsilon_list
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)
            if result.returncode != 0:
                print(f"Error in {test_name}: Return code {result.returncode}, stderr: {result.stderr}")
                return -1
            output = result.stdout.strip()
            print(f"{test_name} output:", output)
            p_value = float(output)
            return p_value if 0 <= p_value <= 1 else -1
        except Exception as e:
            print(f"Exception in {test_name}:", e)
            return -1

    def safe_test_call(exe_path, test_name):
        try:
            p_value = run_test_exe(exe_path, test_name)
            return 0 if p_value in [-1, None] else p_value
        except Exception as e:
            print(f"Error in {test_name}:", e)
            return 0

    nist22_executables = {
        'Frequency Test': ('fre', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\frequency_test_exec.exe"),
        'Frequency Block Test': ('freBlock', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\block_freq_exec.exe"),
        'Runs Test': ('runs', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\runs.exec"),
        'Longest One Block Test': ('oneBlock', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\longest_run_exec.exe"),
        'Approximate Entropy Test': ('appEntropy', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\approximate_entropy.exec"),
        'Linear Complexity Test': ('linComp', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\linear_comp_exec.exe"),
        'Non Overlapping Test': ('nonOver', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\template_non_overlapping.exec"),
        'Overlapping Test': ('over', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\template_exec.exe"),
        'Universal Test': ('univ', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\universal_exec.exe"),
        # 'Serial Test': ('serial', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\serial_exec.exe"),
        'Cusum Test': ('cusum', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\cusum_exec.exe"),
        'Random Excursion Test': ('re', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\random_exec.exe"),
        'Random Excursion Variant Test': ('rev', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\random_var_exec.exe"),
        'Binary Matrix Rank Test': ('rank', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\matrix_exec.exe"),
        'DFT Test': ('dft', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\dft_exec.exe"),
    }

    nist22_results = {}
    nist22_passed = 0
    m=7
    for display_name, (label, exe_path) in nist22_executables.items():
        p_value = safe_test_call(exe_path, display_name)
        cache.set(f"{job_id}_progressReportServer", m)
        m=m+1
        nist22_results[display_name] = p_value
        if p_value > 0.01:
            nist22_passed += 1

    def result_text(p):
        return 'random number' if p > 0.01 else 'non-random number'

    cache.set(f"{job_id}_progressReportServer",22)

    l=23
    # --- NIST SP 800-90B (.exe) ---
    def run_test_exe_90b(exe_path, test_name):
        try:
            cmd = [exe_path, binary_data]
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)
            if result.returncode not in [0, 1]:
                print(f"Error in {test_name}: Return code {result.returncode}, stderr: {result.stderr}")
                return None, "non-random number"
            cache.set(f"{job_id}_progressReportServer", m)
            m=m+1
            output = result.stdout.strip()
            print(f"{test_name} output:", output)
            min_entropy = float(output) if output else 0.0
            result_text = "random number" if result.returncode == 1 else "non-random number"
            return min_entropy, result_text
        except Exception as e:
            print(f"Exception in {test_name}:", e)
            return None, "non-random number"

    def safe_test_call_90b(exe_path, test_name):
        try:
            min_entropy, result_text = run_test_exe_90b(exe_path, test_name)
            return (min_entropy if min_entropy is not None else 0.0), result_text
        except Exception as e:
            print(f"Error in {test_name}:", e)
            return 0.0, "non-random number"

    nist90b_executables = {
        'Collision Test': ('col', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\collisionTest_exec.exe"),
        'Markov Test': ('markov',  r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\markovTest_exec.exe"),
        'Compression Test': ('compression',  r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\compressionTest_exec.exe"),
        'LZ78Y Test': ('l278y', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\l278yTest_exec.exe"),
        'Lag Test': ('lag', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\lagTest_exec.exe"),
        'MCW Test': ('mcw', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\multiMcwTest_exec.exe"),
        'MMC Test': ('mmc', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\multiMmcTest_exec.exe"),
    }
    cache.set(f"{job_id}_progressReportServer", 31)
    nist90b_results = {}
    nist90b_passed = 0
    for test_name, (label, exe_path) in nist90b_executables.items():
        min_entropy, result_text1 = safe_test_call_90b(exe_path, test_name)
        nist90b_results[test_name] = {
            "min_entropy": min_entropy,
            "result": result_text1
        }
        if result_text1 == "random number":
            nist90b_passed += 1

    # ...inside generate_pdf_report_server...
    cache.set(f"{job_id}_progressReportServer", 32)
    def safe_bool(val):
        try:
           
            if isinstance(val, np.generic):
                return bool(val)
        except ImportError:
            pass
        return bool(val)

    def safe_pvalue(val):
        try:
            
            if isinstance(val, np.generic):
                val = float(val)
        except ImportError:
            pass
        if not isinstance(val, (int, float)) or val < 0 or val > 1:
            return 0.0
        return val

    cache.set(f"{job_id}_progressReportServer", 33)

    x = 0  # Counter for random results
    cache.set(f"{job_id}_progressReportDieharder", 0)

    # Dieharder tests with robust error handling and normalization
    try:
        _, birthday_test_result = BirthdaySpacingsTest.BirthdaySpacingsTest(binary_data)
        birthday_test_result = safe_bool(birthday_test_result)
    except Exception as e:
        print(f"Error in BirthdaySpacingsTest: {e}")
        birthday_test_result = False
    x += 1 if birthday_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 34)

    try:
        _, parking_test_block_result = ParkingLotTest.ParkingLotTest(binary_data)
        parking_test_block_result = safe_bool(parking_test_block_result)
    except Exception as e:
        print(f"Error in ParkingLotTest: {e}")
        parking_test_block_result = False
    x += 1 if parking_test_block_result else 0
    cache.set(f"{job_id}_progressReportServer", 35)

    try:
        _, overlapping_5_test_result = Overlapping5PermutationTest.Overlapping5PermutationTest(binary_data)
        overlapping_5_test_result = safe_bool(overlapping_5_test_result)
    except Exception as e:
        print(f"Error in Overlapping5PermutationTest: {e}")
        overlapping_5_test_result = False
    x += 1 if overlapping_5_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 36)

    try:
        _, minimum_distance_test_result = MinimumDistanceTest.MinimumDistanceTest(binary_data)
        minimum_distance_test_result = safe_bool(minimum_distance_test_result)
    except Exception as e:
        print(f"Error in MinimumDistanceTest: {e}")
        minimum_distance_test_result = False
    x += 1 if minimum_distance_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 37)

    try:
        _, rank_31_test_result = Ranks31x31MatricesTest.Ranks31x31MatricesTest(binary_data)
        rank_31_test_result = safe_bool(rank_31_test_result)
    except Exception as e:
        print(f"Error in Ranks31x31MatricesTest: {e}")
        rank_31_test_result = False
    x += 1 if rank_31_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 38)

    try:
        _, spheres_test_result = Spheres3DTest.Spheres3DTest(binary_data)
        spheres_test_result = safe_bool(spheres_test_result)
    except Exception as e:
        print(f"Error in Spheres3DTest: {e}")
        spheres_test_result = False
    x += 1 if spheres_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 39)
    try:
        _, rank_32_result = Ranks32x32MatricesTest.Ranks32x32MatricesTest(binary_data)
        rank_32_result = safe_bool(rank_32_result)
    except Exception as e:
        print(f"Error in Ranks32x32MatricesTest: {e}")
        rank_32_result = False
    x += 1 if rank_32_result else 0
    cache.set(f"{job_id}_progressReportServer", 40)

    try:
        _, craps_test_result = CrapsTest.CrapsTest(binary_data)
        craps_test_result = safe_bool(craps_test_result)
    except Exception as e:
        print(f"Error in CrapsTest: {e}")
        craps_test_result = False
    x += 1 if craps_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 41)
    try:
        _, bitstream_test_result = BitstreamTest.BitstreamTest(binary_data)
        bitstream_test_result = safe_bool(bitstream_test_result)
    except Exception as e:
        print(f"Error in BitstreamTest: {e}")
        bitstream_test_result = False
    x += 1 if bitstream_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 42)

    try:
        _, gcd_test_result = MarsagliaTsangGCDTest.MarsagliaTsangGCDTest(binary_data)
        gcd_test_result = safe_bool(gcd_test_result)
    except Exception as e:
        print(f"Error in MarsagliaTsangGCDTest: {e}")
        gcd_test_result = False
    x += 1 if gcd_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 43)

    try:
        _, opso_test_result = OPSOTest.OPSOTest(binary_data)
        opso_test_result = safe_bool(opso_test_result)
    except Exception as e:
        print(f"Error in OPSOTest: {e}")
        opso_test_result = False
    x += 1 if opso_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 44)

    try:
        _, oqsq_test_result = OQSOTest.OQSOTest(binary_data)
        oqsq_test_result = safe_bool(oqsq_test_result)
    except Exception as e:
        print(f"Error in OQSOTest: {e}")
        oqsq_test_result = False
    x += 1 if oqsq_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 45)

    try:
        _, dna_test_result = DNATest.DNATest(binary_data)
        dna_test_result = safe_bool(dna_test_result)
    except Exception as e:
        print(f"Error in DNATest: {e}")
        dna_test_result = False
    x += 1 if dna_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 46)

    try:
        _, count_one_stream_test_result = CountThe1sStreamTest.CountThe1sStreamTest(binary_data)
        count_one_stream_test_result = safe_bool(count_one_stream_test_result)
    except Exception as e:
        print(f"Error in CountThe1sStreamTest: {e}")
        count_one_stream_test_result = False
    x += 1 if count_one_stream_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 47)

    try:
        _, count_one_byte_test_result = CountThe1sByteTest.CountThe1sByteTest(binary_data)
        count_one_byte_test_result = safe_bool(count_one_byte_test_result)
    except Exception as e:
        print(f"Error in CountThe1sByteTest: {e}")
        count_one_byte_test_result = False
    x += 1 if count_one_byte_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 48)

    try:
        _, simple_gcd_test_result = MarsagliaTsangSimpleGCDTest.MarsagliaTsangSimpleGCDTest(binary_data)
        simple_gcd_test_result = safe_bool(simple_gcd_test_result)
    except Exception as e:
        print(f"Error in MarsagliaTsangSimpleGCDTest: {e}")
        simple_gcd_test_result = False
    x += 1 if simple_gcd_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 49)

    try:
        _, generalized_minimum_test_result = GeneralizedMinimumDistanceTest.GeneralizedMinimumDistanceTest(binary_data)
        generalized_minimum_test_result = safe_bool(generalized_minimum_test_result)
    except Exception as e:
        print(f"Error in GeneralizedMinimumDistanceTest: {e}")
        generalized_minimum_test_result = False
    x += 1 if generalized_minimum_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 50)

    try:
        _, u01_linear_complexity_test_result = TestU01LinearComplexityTest.TestU01LinearComplexityTest(binary_data)
        u01_linear_complexity_test_result = safe_bool(u01_linear_complexity_test_result)
    except Exception as e:
        print(f"Error in TestU01LinearComplexityTest: {e}")
        u01_linear_complexity_test_result = False
    x += 1 if u01_linear_complexity_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 51)

    try:
        _, u01_longest_repeated_test_result = TestU01LongestRepeatedSubstringTest.TestU01LongestRepeatedSubstringTest(binary_data)
        u01_longest_repeated_test_result = safe_bool(u01_longest_repeated_test_result)
    except Exception as e:
        print(f"Error in TestU01LongestRepeatedSubstringTest: {e}")
        u01_longest_repeated_test_result = False
    x += 1 if u01_longest_repeated_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 52)

    try:
        _, u01_matrix_rank_test_result = TestU01MatrixRankTest.TestU01MatrixRankTest(binary_data)
        u01_matrix_rank_test_result = safe_bool(u01_matrix_rank_test_result)
    except Exception as e:
        print(f"Error in TestU01MatrixRankTest: {e}")
        u01_matrix_rank_test_result = False
    x += 1 if u01_matrix_rank_test_result else 0
    cache.set(f"{job_id}_progressReportServer", 53)

    final_text = 'random number' if x > 10 else 'non-random number'

    # Dynamically set the result text based on the test outcome
    birthday_text = 'random number' if birthday_test_result else 'non-random number'
    parking_text = 'random number' if parking_test_block_result else 'non-random number'
    overlapping_5_text = 'random number' if overlapping_5_test_result else 'non-random number'
    minimum_distance_text = 'random number' if minimum_distance_test_result else 'non-random number'
    rank31x31_text = 'random number' if rank_31_test_result else 'non-random number'
    spheres_text = 'random number' if spheres_test_result else 'non-random number'
    rank32x32_text = 'random number' if rank_32_result else 'non-random number'
    craps_text = 'random number' if craps_test_result else 'non-random number'
    bitstream_text = 'random number' if bitstream_test_result else 'non-random number'
    gcd_text = 'random number' if gcd_test_result else 'non-random number'
    opso_text = 'random number' if opso_test_result else 'non-random number'
    oqsq_text = 'random number' if oqsq_test_result else 'non-random number'
    dna_text = 'random number' if dna_test_result else 'non-random number'
    one_stream_text = 'random number' if count_one_stream_test_result else 'non-random number'
    one_byte_text = 'random number' if count_one_byte_test_result else 'non-random number'
    simple_gcd_text = 'random number' if simple_gcd_test_result else 'non-random number'
    generalized_minimum_text = 'random number' if generalized_minimum_test_result else 'non-random number'
    u01_linear_text = 'random number' if u01_linear_complexity_test_result else 'non-random number'
    u01longest_text = 'random number' if u01_longest_repeated_test_result else 'non-random number'
    u01_matrix_text = 'random number' if u01_matrix_rank_test_result else 'non-random number'
    cache.set(f"{job_id}_progressReportServer", 54)
    dieharder_results = {
        'Birthday Spacing': birthday_text,
        'Parking Lot': parking_text,
        'Overlapping 5 Permutation': overlapping_5_text,
        'Minimum Distance': minimum_distance_text,
        'Ranks 31x31': rank31x31_text,
        'Spheres 3D': spheres_text,
        'Ranks 32x32': rank32x32_text,
        'Craps': craps_text,
        'Bitstream': bitstream_text,
        'Marsaglia-Tsang GCD': gcd_text,
        'OPSO': opso_text,
        'OQSO': oqsq_text,
        'DNA': dna_text,
        'Count the 1s (Stream)': one_stream_text,
        'Count the 1s (Byte)': one_byte_text,
        'Marsaglia-Tsang Simple GCD': simple_gcd_text,
        'Generalized Minimum Distance': generalized_minimum_text,
        'TestU01 Linear Complexity': u01_linear_text,
        'TestU01 Longest Repeated Substring': u01longest_text,
        'TestU01 Matrix Rank': u01_matrix_text,
    }

    cache.set(f"{job_id}_progressReportServer", 55)
    final_text = 'random number' if (nist22_passed + nist90b_passed + x) > 23 else 'non-random number'

    # Prepare table data (showing all tests)
    data1 = [
        ['Test Type', 'Result', 'Test type', 'Result'],
        [Paragraph('1. Frequency Test', styles['Normal']), result_text(nist22_results['Frequency Test']),
         Paragraph('2. Frequency Test within a Block', styles['Normal']), result_text(nist22_results['Frequency Block Test'])],
        [Paragraph('3. Runs Test', styles['Normal']), result_text(nist22_results['Runs Test']),
         Paragraph('4. Test for the longest Run of Ones', styles['Normal']), result_text(nist22_results['Longest One Block Test'])],
        [Paragraph('5. Binary Matrix Rank Test', styles['Normal']), result_text(nist22_results['Binary Matrix Rank Test']),
         Paragraph('6. Discrete Fourier Transform Test', styles['Normal']), result_text(nist22_results['DFT Test'])],
        [Paragraph('7. Non-overlapping Template Match', styles['Normal']), result_text(nist22_results['Non Overlapping Test']),
         Paragraph('8. Overlapping Template Matching Test', styles['Normal']), result_text(nist22_results['Overlapping Test'])],
        [Paragraph('9. Maurers Universal test', styles['Normal']), result_text(nist22_results['Universal Test']),
         Paragraph('10. Linear complexity Test', styles['Normal']), result_text(nist22_results['Linear Complexity Test'])],
        [Paragraph('11. Serial Test', styles['Normal']), result_text(nist22_results['Serial Test']),
         Paragraph('12. Approximate Entropy Test', styles['Normal']), result_text(nist22_results['Approximate Entropy Test'])],
        [Paragraph('13. Cumulative Sum Test', styles['Normal']), result_text(nist22_results['Cusum Test']),
         Paragraph('14. Random Excursions Test', styles['Normal']), result_text(nist22_results['Random Excursion Test'])],
        [Paragraph('15. Random Excursions Variant Test', styles['Normal']), result_text(nist22_results['Random Excursion Variant Test']), '', ''],
        [Paragraph('16. Collision Test', styles['Normal']), nist90b_results['Collision Test']['result'],
         Paragraph('17. Markov Test', styles['Normal']), nist90b_results['Markov Test']['result']],
        [Paragraph('18. Compression Test', styles['Normal']), nist90b_results['Compression Test']['result'],
         Paragraph('19. LZ78Y Test', styles['Normal']), nist90b_results['LZ78Y Test']['result']],
        [Paragraph('20. Lag Test', styles['Normal']), nist90b_results['Lag Test']['result'],
         Paragraph('21. MCW Test', styles['Normal']), nist90b_results['MCW Test']['result']],
        [Paragraph('22. MMC Test', styles['Normal']), nist90b_results['MMC Test']['result'], '', ''],
        [Paragraph('23. Birthday Spacing', styles['Normal']),birthday_text,
         Paragraph('24. Parking Lot', styles['Normal']), parking_text],
        [Paragraph('25. Overlapping 5 Permutation', styles['Normal']), overlapping_5_text,
         Paragraph('26. Minimum Distance', styles['Normal']), minimum_distance_text],
        [Paragraph('27. Ranks 31x31', styles['Normal']), rank31x31_text,
         Paragraph('28. Spheres 3D', styles['Normal']),  spheres_text],
        [Paragraph('29. Ranks 32x32', styles['Normal']), rank32x32_text,
         Paragraph('30. Craps', styles['Normal']), craps_text],
        [Paragraph('31. Bitstream', styles['Normal']), bitstream_text,
         Paragraph('32. Marsaglia-Tsang GCD', styles['Normal']), gcd_text],
        [Paragraph('33. OPSO', styles['Normal']), opso_text,
         Paragraph('34. OQSO', styles['Normal']), oqsq_text],
        [Paragraph('35. DNA', styles['Normal']), dna_text,
         Paragraph('36. Count the 1s (Stream)', styles['Normal']), one_stream_text],
        [Paragraph('37. Count the 1s (Byte)', styles['Normal']), one_byte_text,
         Paragraph('38. Marsaglia-Tsang Simple GCD', styles['Normal']), simple_gcd_text ],
        [Paragraph('39. Generalized Minimum Distance', styles['Normal']), generalized_minimum_text,
         Paragraph('40. TestU01 Linear Complexity', styles['Normal']), u01_linear_text],
        [Paragraph('41. TestU01 Longest Repeated Substring', styles['Normal']), u01longest_text,
         Paragraph('42. TestU01 Matrix Rank', styles['Normal']), u01_matrix_text],
        [Paragraph('Final Result', styles['Normal']), Paragraph(final_text, bold_red_style)],
    ]

    colWidths = [2 * inch, 1.5 * inch, 2 * inch, 1.5 * inch]
    table1 = Table(data1, colWidths=colWidths)
    table1.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.blue),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))

    # Images for graphs
    graph_image1 = Image(graph_image_io1, width=7 * inch, height=4.5 * inch)
    graph_image = Image(graph_image_io, width=7 * inch, height=4.5 * inch)
    graph_image2 = Image(graph_image_io2, width=7 * inch, height=4.5 * inch)
    cache.set(f"{job_id}_progressReportServer", 56)
    # Logo
    logo_path = os.path.join(os.path.dirname(__file__), 'qnulogo.png')
    logo_image = Image(logo_path, width=0.5 * inch, height=0.5 * inch)
    logo_table = Table([[logo_image]], colWidths=[6.5 * inch], rowHeights=[0.5 * inch])
    logo_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (0, 0), 'CENTRE'),
        ('VALIGN', (100, 100), (0, 0), 'TOP'),
    ]))

    
    # AI Analysis
    all_results_text = {}
    all_results_text.update({k: result_text(v) for k, v in nist22_results.items()})
    all_results_text.update({k: v['result'] for k, v in nist90b_results.items()})
    all_results_text.update(dieharder_results)
    cache.set(f"{job_id}_progressReportServer", 57)
    AIAnalysis_subtitle = Paragraph("AI Analysis:", subtitle_style)
    prompt = "Perform a detailed analysis of the results from all the statistical tests. For each test, display the test name along with its result and indicate whether the result is Random or Non-Random. In the analysis, mention that the basis of selecting random or non random is the majority of tests' response. Finally, tell how many tests give random number or non random number as a result along with their names."

    response1 = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[{"text": prompt}, {"text": json.dumps(all_results_text)}],
    )
    if response1.candidates:
        gemini_analysis = response1.candidates[0].content.parts[0].text
    else:
        gemini_analysis = ""

    formatted_output = format_markdown(gemini_analysis)
    bullet_points = formatted_output.replace("<ul>", "").replace("</ul>", "").split("<li>")
    bullet_points = [point.replace("</li>", "").strip() for point in bullet_points if point.strip()]

    gemini_analysis_paragraph = ListFlowable(
        [ListItem(Paragraph(point, styles['Normal'])) for point in bullet_points],
        bulletType='bullet',
    )
    cache.set(f"{job_id}_progressReportServer", 58)
    # Build the PDF
    elements = [
        logo_table,
        title,
        title_space,
        nist_subtitle,
        table1,
        subtitle_space,
        graph_subtitle,
        subtitle_space,
        graph_image1,
        subtitle_space,
        graph_image,
        subtitle_space,
        graph_image2,
        subtitle_space,
        AIAnalysis_subtitle,
        gemini_analysis_paragraph,
    ]
    cache.set(f"{job_id}_progressReportServer", 59)
    doc.build(elements)
    response.write(buffer.getvalue())
    buffer.close()
    cache.set(f"{job_id}_progressReportServer", 60)
    return response

@csrf_exempt
def get_progress_server(request, job_id):
    progress = cache.get(f"{job_id}_progressReportServer", 0)
    return JsonResponse({"progress": int(progress)})

import uuid
from django.core.cache import cache
import tempfile

@csrf_exempt
def generate_final_ans(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')
            scheduled_time_str = data.get('scheduled_time', '')
            job_id = data.get('job_id', str(uuid.uuid4()))
            cache.set(f"{job_id}_progress", 0)
            
            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            if not scheduled_time_str:
                return JsonResponse({"error": "scheduled_time is required"}, status=400)

            try:
                scheduled_time = datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S")
            except ValueError:
                return JsonResponse({"error": "Invalid scheduled_time format. Use 'YYYY-MM-DD HH:MM:SS'."}, status=400)

            current_time = datetime.datetime.now()
            time_difference = (scheduled_time - current_time).total_seconds()
            if time_difference > 0:
                time.sleep(time_difference)

            # Prepare input for the executable
            epsilon_list = [str(int(b)) for b in binary_data]
            n = str(len(binary_data))

            test_p_values = {}
            x = 0  # counter for number of tests with p_value > 0.01

            cache.set(f"{job_id}_progress", 1)

            def run_test_exe(exe_path, test_name):
                try:
                    with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
                        tmp.write(' '.join(epsilon_list))
                        tmp_filename = tmp.name
                    cmd = [exe_path, str(n), tmp_filename]
                    result = subprocess.run(cmd, capture_output=True, text=True, shell=False)
                    
                    os.remove(tmp_filename)

                    if result.returncode != 0:
                        print(f"Error in {test_name}: Return code {result.returncode}, stderr: {result.stderr}")
                        return -1

                    output = result.stdout.strip()
                    print(f"{test_name} output:", output)

                    p_value = float(output)
                    return p_value if 0 <= p_value <= 1 else -1

                except Exception as e:
                    print(f"Exception in {test_name}:", e)
                    return -1

            def safe_test_call(exe_path, test_name):
                try:
                    p_value = run_test_exe(exe_path, test_name)
                    return 0 if p_value in [-1, None] else p_value
                except Exception as e:
                    print(f"Error in {test_name}:", e)
                    return 0
            cache.set(f"{job_id}_progress", 2)
            tests_executables = {
                'Frequency Test': ('fre', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\freqTest_exec.exe"),
                'Frequency Block Test': ('freBlock', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\freqBlockTest_exec.exe"),
                'Runs Test': ('runs', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\runsTest_exec.exe"),
                'Longest One Block Test': ('oneBlock', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\lonRunTest_exec.exe"),
                'Approximate Entropy Test': ('appEntropy', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\appETest_exec.exe"),
                'Linear Complexity Test': ('linComp', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\linCompTest_exec.exe"),
                'Non Overlapping Test': ('nonOver', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\tempNOTest_exec.exe"),
                'Overlapping Test': ('over', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\tempOTest_exec.exe"),
                'Universal Test': ('univ', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\univ_exec.exe"),
                'Serial Test': ('serial', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\serialTest_exec.exe"),
                'Cusum Test': ('cusum', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\cusTest_exec.exe"),
                'Random Excursion Test': ('re', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\ranETest_exec.exe"),
                'Random Excursion Variant Test': ('rev', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\ranEVTest_exec.exe"),
                'Binary Matrix Rank Test': ('rank', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\rankTest_exec.exe"),
                # 'DFT Test': ('dft', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\dftTest_exec.exe"),
            }

            m=3

            for i, (display_name, (label, exe_path)) in enumerate(tests_executables.items(), start=1):
                p_value = safe_test_call(exe_path, display_name)
                test_p_values[display_name] = p_value
                cache.set(f"{job_id}_progress", m)
                m=m+1
                if p_value > 0.01:
                    x += 1
                
            valid_tests = {k: (0 if v is None or v > 1 else v) for k, v in test_p_values.items()}
            print('Valid tests:', valid_tests)

            final_text = 'random number' if x > 8 else 'non-random number'

            response_data = {
                "final_result": final_text,
                "executed_at": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            }

            cache.set(f"{job_id}_progress", 18)

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt
def get_progress(request, job_id):
    progress = cache.get(f"{job_id}_progress", 0)
    return JsonResponse({"progress": int(progress)})

@csrf_exempt
def generate_final_ans_nist90b(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')
            scheduled_time_str = data.get('scheduled_time', '')
            job_id = data.get('job_id', str(uuid.uuid4()))
            cache.set(f"{job_id}_progress90b", 0)
            # Validate binary data
            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            # Validate scheduled time format
            if not scheduled_time_str:
                return JsonResponse({"error": "scheduled_time is required"}, status=400)

            try:
                scheduled_time = datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S")
            except ValueError:
                return JsonResponse({"error": "Invalid scheduled_time format. Use 'YYYY-MM-DD HH:MM:SS'."}, status=400)

            # Wait until the scheduled time
            current_time = datetime.datetime.now()
            time_difference = (scheduled_time - current_time).total_seconds()
            if time_difference > 0:
                print(f"Waiting {time_difference:.2f} seconds until the scheduled time...")
                time.sleep(time_difference)

            # Initialize result tracking
            passed_test_count = 0
            test_results = {}
            progress_counter = 3

            cache.set(f"{job_id}_progress90b", 1)

            def run_test_exe(exe_path, test_name):
                try:
                    cmd = [exe_path, binary_data]
                    result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

                    if result.returncode not in [0, 1]:
                        print(f"Error in {test_name}: Return code {result.returncode}, stderr: {result.stderr}")
                        return None, "non-random number"

                    output = result.stdout.strip()
                    print(f"{test_name} output:", output)

                    min_entropy = float(output) if output else 0.0
                    result_text = "random number" if result.returncode == 1 else "non-random number"
                    return min_entropy, result_text

                except Exception as e:
                    print(f"Exception in {test_name}:", e)
                    return None, "non-random number"

            def safe_test_call(exe_path, test_name):
                try:
                    min_entropy, result_text = run_test_exe(exe_path, test_name)
                    return (min_entropy if min_entropy is not None else 0.0), result_text
                except Exception as e:
                    print(f"Error in {test_name}:", e)
                    return 0.0, "non-random number"
            cache.set(f"{job_id}_progress90b", 2)
            # Paths to executables for each test
            tests_executables = {
                'Collision Test': ('col', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\collisionTest_exec.exe"),
                'Markov Test': ('markov',  r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\markovTest_exec.exe"),
                'Compression Test': ('compression',  r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\compressionTest_exec.exe"),
                'LZ78Y Test': ('l278y', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\l278yTest_exec.exe"),
                'Lag Test': ('lag', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\lagTest_exec.exe"),
                'MCW Test': ('mcw', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\multiMcwTest_exec.exe"),
                'MMC Test': ('mmc', r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\tests\multiMmcTest_exec.exe"),
            }

            # Run each test
            for test_name, (label, exe_path) in tests_executables.items():
                min_entropy, result_text = safe_test_call(exe_path, test_name)
                test_results[test_name] = {
                    "min_entropy": min_entropy,
                    "result": result_text
                }

                if result_text == "random number":
                    passed_test_count += 1

                cache.set(f"{job_id}_progress90b", progress_counter)
                progress_counter += 1

            # Final decision based on number of passed tests
            final_text = 'random number' if passed_test_count > 4 else 'non-random number'

            response_data = {
                "final_result": final_text,
                "executed_at": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            }

            cache.set(f"{job_id}_progress90b", 10)

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def get_progress90b(request, job_id):
    progress = cache.get(f"{job_id}_progress90b", 0)
    return JsonResponse({"progress": int(progress)})



@csrf_exempt
def generate_final_ans_dieharder(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')
            scheduled_time_str = data.get('scheduled_time', '')
            job_id = data.get('job_id', str(uuid.uuid4()))
            cache.set(f"{job_id}_progress_dieharder", 0)

            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            if not scheduled_time_str:
                return JsonResponse({"error": "scheduled_time is required"}, status=400)

            try:
                scheduled_time = datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S")
            except ValueError:
                return JsonResponse({"error": "Invalid scheduled_time format. Use 'YYYY-MM-DD HH:MM:SS'."}, status=400)

            current_time = datetime.datetime.now()
            time_difference = (scheduled_time - current_time).total_seconds()
            if time_difference > 0:
                time.sleep(time_difference)

            x = 0
            cache.set(f"{job_id}_progress_dieharder", 1)
            tests = [
                BirthdaySpacingsTest.BirthdaySpacingsTest,
                ParkingLotTest.ParkingLotTest,
                Overlapping5PermutationTest.Overlapping5PermutationTest,
                MinimumDistanceTest.MinimumDistanceTest,
                Ranks31x31MatricesTest.Ranks31x31MatricesTest,
                Spheres3DTest.Spheres3DTest,
                Ranks32x32MatricesTest.Ranks32x32MatricesTest,
                CrapsTest.CrapsTest,
                BitstreamTest.BitstreamTest,
                MarsagliaTsangGCDTest.MarsagliaTsangGCDTest,
                OPSOTest.OPSOTest,
                OQSOTest.OQSOTest,
                DNATest.DNATest,
                CountThe1sStreamTest.CountThe1sStreamTest,
                CountThe1sByteTest.CountThe1sByteTest,
                MarsagliaTsangSimpleGCDTest.MarsagliaTsangSimpleGCDTest,
                GeneralizedMinimumDistanceTest.GeneralizedMinimumDistanceTest,
                TestU01LinearComplexityTest.TestU01LinearComplexityTest,
                TestU01LongestRepeatedSubstringTest.TestU01LongestRepeatedSubstringTest,
                TestU01MatrixRankTest.TestU01MatrixRankTest
            ]

            total_tests = len(tests)
            cache.set(f"{job_id}_progress_dieharder", 2)
            m=3
            for i, test in enumerate(tests):
                try:
                    result = test(binary_data)[1]
                    print(i)
                    if result:
                        x += 1
                except Exception as e:
                    print(f"Error in test {test.__name__}: {e}")
                finally:
                    cache.set(f"{job_id}_progress_dieharder", m)
                    m=m+1

            final_text = 'random number' if x > 10 else 'non-random number'

            response_data = {
                "final_result": final_text,
                "executed_at": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
            cache.set(f"{job_id}_progress_dieharder", 22)
            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


@csrf_exempt
def get_progress_dieharder(request, job_id):
    progress = cache.get(f"{job_id}_progress_dieharder", 0)
    return JsonResponse({"progress": int(progress)})

from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class DieharderTestView(APIView):
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            r"C:\Users\Ayush Kumar\Documents\all_material_for_randomness\Qnu_upload_files\QNU_Project_New_Design\backend\myproject\home\dieharder-2.6.24\dieharder\dieharder",
            "-d", "12",
            "-g", "66",
            "-f", tmpfile_path
        ]

        try:
            # Run dieharder
            process = subprocess.run(
                command,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                universal_newlines=True,
                timeout=300
            )
            output = process.stdout
            error = process.stderr

            # Initialize defaults
            p_value = None
            assessment = None

            # Parse p-value and assessment
            for line in output.splitlines():
                line = line.strip()
                if line.startswith("Kuiper KS: p ="):
                    try:
                        p_value = float(line.split("=")[1].strip())
                    except Exception:
                        p_value = None
                if line.startswith("Assessment:"):
                    assessment = line.replace("Assessment:", "").strip()

            return Response({
               
                "p_value": p_value,
                "assessment": assessment
            })

        except subprocess.TimeoutExpired:
            return Response({"error": "Dieharder test timed out."}, status=500)

        finally:
            if os.path.exists(tmpfile_path):
                os.remove(tmpfile_path)


