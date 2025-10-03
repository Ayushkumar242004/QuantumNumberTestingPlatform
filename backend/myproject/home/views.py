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

client = genai.Client(api_key="AIzaSyBilGYGxTG5bsaL7_pArtgTRPBgAA-IOK8") # place your api key here in inverted commas
import subprocess

from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import tempfile
import os
import re


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
            exe_path = "/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/freqTest_exec"

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

            exe_path = "/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/block_freq_exec1"
            
            with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
                tmp.write(' '.join(binary_data))
                tmp_filename = tmp.name

            # Build command
            cmd = [exe_path, n, tmp_filename]

            # Run process
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            os.remove(tmp_filename)

            if result.returncode != 0:
                return JsonResponse({"error": "C program failed", "stderr": result.stderr}, status=500)

            stdout_text = result.stdout.strip()
            parts = stdout_text.split()

            if len(parts) != 2:
                return JsonResponse({"error": "Unexpected output format", "stdout": stdout_text}, status=500)

            try:
                p_value = float(parts[0])
                passed_flag = int(parts[1])
            except ValueError:
                return JsonResponse({"error": "Invalid numeric output", "stdout": stdout_text}, status=500)

            return JsonResponse({
                "p_value": p_value,
                "result": "random-number" if passed_flag == 1 else "non-random number"
            })

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
            exe_path = "/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/runs1"

            # Build the command line arguments: ./runs_test_exec.exe <n> <bit_0> <bit_1> ... <bit_n-1>
            with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
                tmp.write(' '.join(binary_data))
                tmp_filename = tmp.name

            # Build command
            cmd = [exe_path, n, tmp_filename]

            # Run process
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            os.remove(tmp_filename)


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
            exe_path = "/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/longest_run_exec"

            # Build command: [exe_path, n, bit_0, bit_1, ..., bit_n-1]
            with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
                tmp.write(' '.join(binary_data))
                tmp_filename = tmp.name

            # Build command
            cmd = [exe_path, n, tmp_filename]

            # Run process
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            os.remove(tmp_filename)

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
            exe_path = "/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/approximate_entropy"

            # Build command: [exe_path, n, bit_0, bit_1, ..., bit_n-1]
            with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
                tmp.write(' '.join(binary_data))
                tmp_filename = tmp.name

            # Build command
            cmd = [exe_path, n, tmp_filename]

            # Run process
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            os.remove(tmp_filename)

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

            # Use full absolute path to .exe
            exe_path = "/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/linear_comp_exec"

            # Build command: [exe_path, n, bit_0, bit_1, ..., bit_n-1]
            with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
                tmp.write(' '.join(binary_data))
                tmp_filename = tmp.name

            # Build command
            cmd = [exe_path, n, tmp_filename]

            # Run process
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            os.remove(tmp_filename)

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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/template_non_overlapping.exec"

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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/template_exec.exe"

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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/universal_exec.exe"

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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/serial_exec.exe"

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
            exe_path = "/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/cusum_exec"

            # Build command
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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/random_exec.exe"

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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/random_var_exec.exe"

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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/matrix_exec.exe"

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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/dft_exec.exe"

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


@csrf_exempt
def run_chiSq_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            # Path to the C++ executable
            exe_path = "/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/chiSquareTest_exec"

            # Write binary data to a temporary file (only 0s and 1s)
            with tempfile.NamedTemporaryFile(mode='w+', delete=False, suffix=".txt") as tmp_file:
                tmp_file.write(binary_data)
                tmp_filename = tmp_file.name

            # Call the C++ executable with the filename as argument
            cmd = [exe_path, tmp_filename]

            result = subprocess.run(cmd, capture_output=True, text=True)

            # Clean up the temporary file
            os.remove(tmp_filename)

            if result.returncode != 0:
                return JsonResponse({
                    "error": "C++ executable failed.",
                    "stderr": result.stderr.strip()
                }, status=500)

            # Parse the p-value from stdout
            try:
                p_value = float(result.stdout.strip())
                return JsonResponse({
                    "p_value": p_value,
                    "result": "random number" if p_value >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({
                    "error": "Executable did not return a valid p-value.",
                    "output": result.stdout.strip()
                }, status=500)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

@csrf_exempt
def run_permutation_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            # ✅ Update with correct path to the Permutation Test executable
            exe_path = "/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/tests/permutationTest_exec"

            # Write binary data to a temporary file (if needed, or directly pass as argument)
            with tempfile.NamedTemporaryFile(mode='w+', delete=False, suffix=".txt") as tmp_file:
                tmp_file.write(binary_data)
                tmp_filename = tmp_file.name

            # Call the C++ executable with the file path or binary string directly
            cmd = [exe_path, binary_data]  # You can also use tmp_filename instead of binary_data if the executable expects a file

            result = subprocess.run(cmd, capture_output=True, text=True)

            # Clean up temporary file if written
            os.remove(tmp_filename)

            if result.returncode != 0:
                return JsonResponse({
                    "error": "C++ executable failed.",
                    "stderr": result.stderr.strip()
                }, status=500)

            # Parse result output
            output = result.stdout.strip()

            # Try to extract p-value from the output (assumes p-value is float on a line by itself)
            try:
                p_value = float(output)
                return JsonResponse({
                    "p_value": p_value,
                    "result": "random number" if p_value >= 0.01 else "non-random number"
                })
            except ValueError:
                return JsonResponse({
                    "error": "Executable did not return a valid p-value.",
                    "output": output
                }, status=500)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)
@csrf_exempt
def run_lrs_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')

            if not binary_data or any(c not in '01' for c in binary_data):
                return JsonResponse({"error": "Invalid binary string"}, status=400)

            # ✅ Path to the LRS Test executable
            exe_path = "/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/tests/lrsTest_exec1"

            # Write binary data to a temporary file if the executable requires it
            with tempfile.NamedTemporaryFile(mode='w+', delete=False, suffix=".txt") as tmp_file:
                tmp_file.write(binary_data)
                tmp_filename = tmp_file.name

            # Call the C++ executable with binary data directly or tmp_filename
            cmd = [exe_path, binary_data]

            result = subprocess.run(cmd, capture_output=True, text=True)

            # Clean up temp file
            os.remove(tmp_filename)

            if result.returncode != 0:
                return JsonResponse({
                    "error": "C++ executable failed.",
                    "stderr": result.stderr.strip()
                }, status=500)

            output = result.stdout.strip()

            # Interpret result
            if output == '1':
                return JsonResponse({
                    "p-value": "random number",
                    "result": output
                })
            else:
                return JsonResponse({
                    "p-value": "non-random number",
                    "result": output
                })

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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/collisionTest_exec.exe"

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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/markovTest_exec.exe"

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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/compressionTest_exec.exe"

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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/lagTest_exec.exe"

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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/multiMcwTest_exec.exe"

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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/multiMmcTest_exec.exe"

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
            exe_path = r"/home/ayush/Documents/all_material_for_randomness/Qnu_upload_design/backend/myproject/home/tests/l278yTest_exec.exe"

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
        job_id = data.get('job_id')
        file_name = data.get('file_name', '')
        line_number=data.get('line_number', '')
    except json.JSONDecodeError as e:
        print('Error parsing JSON:', e)
        return HttpResponse("Invalid JSON data.", status=400)

    if not job_id:
        return HttpResponse("job_id is required", status=400)

    cache.set(f"{job_id}_progressGraph", 1)

    # ✅ Fetch results from cache
    results = cache.get(f"{line_number}_results")
    print("results",results)
    if not results:
        return HttpResponse("No cached results found for this job_id", status=404)

    tests = results.get("tests", {})
    print("tests",tests)
    if not tests:
        return HttpResponse("No test results available in cache", status=404)

    # ✅ Build dictionary of {test_name: p_value} from cached results
    valid_tests = {test_name: float(test_info.get("p_value") or 0) 
                   for test_name, test_info in tests.items()}
    if not valid_tests:
        return HttpResponse("No valid p-values found in cached results", status=404)

    x = list(valid_tests.keys())
    y = list(valid_tests.values())

    # ✅ Generate plot
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

    # ✅ Add legend
    legend_elements = [
        Patch(facecolor='green', edgecolor='green', label='Random (p ≥ 0.01)'),
        Patch(facecolor='blue', edgecolor='blue', label='Non-random (p < 0.01)')
    ]
    ax.legend(handles=legend_elements, loc='upper right', prop={'size': 10})

    cache.set(f"{job_id}_progressGraph", 100)

    # ✅ Return as image response
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
    try:
        data = json.loads(request.body)
        job_id = data.get('job_id')
        file_name = data.get('file_name', '')
        line_number=data.get('line_number', '')
    except json.JSONDecodeError as e:
        print("Error parsing JSON:", e)
        return HttpResponse("Invalid JSON data.", status=400)

    if not job_id:
        return HttpResponse("job_id is required", status=400)

    cache.set(f"{job_id}_progressGraph90b", 1)

    
    # ✅ Fetch results from cache
    results = cache.get(f"{line_number}_results90b")
    print("results",results)
    if not results:
        return HttpResponse("No cached results found for this job_id", status=404)

    tests = results.get("tests", [])
    if not tests:
        return HttpResponse("No test results available in cache", status=404)

    # Convert list of dicts → {test_name: min_entropy}
    # Convert dict of dicts → {test_name: min_entropy}
    valid_tests = {test_name: float(test_info.get("min_entropy", 0.0)) for test_name, test_info in tests.items()}

    print("Valid tests (from cache):", valid_tests)

    if not valid_tests:
        return HttpResponse("No valid test results to plot.", status=400)


    # ✅ Create graph
    x = list(valid_tests.keys())
    y = list(valid_tests.values())

    fig, ax = plt.subplots(figsize=(16, 9))
    colors = ['green' if p >= 7.5 else 'blue' for p in y]  # ✅ Threshold for 90B
    ax.bar(x, y, color=colors)
    ax.axhline(y=7.5, color='red', linestyle='--', linewidth=2, label='Min-Entropy = 7.5')
    ax.set_xlabel('NIST SP 800-90B Tests', fontsize=20)
    ax.set_ylabel('Min-Entropy', fontsize=20)
    ax.set_ylim(0, 10)
    plt.xticks(rotation=45, ha='right', fontsize=12)
    # plt.title(f"File Name: {file_name}", fontsize=22, pad=20)
    plt.tight_layout()

    legend_elements = [
        Patch(facecolor='green', edgecolor='green', label='Random (Min-Entropy ≥ 7.5)'),
        Patch(facecolor='blue', edgecolor='blue', label='Non-random (Min-Entropy < 7.5)')
    ]
    ax.legend(handles=legend_elements, loc='upper right', prop={'size': 10})

    cache.set(f"{job_id}_progressGraph90b", 100)

    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)

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
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

    job_id = request.POST.get('job_id')
    line_number = request.POST.get('line_number')
    if not job_id:
        return JsonResponse({"error": "job_id is required"}, status=400)

    # file_name = request.POST.get('file_name', '')
    cache.set(f"{job_id}_progressGraphDieharder", 1)

    # ✅ Fetch results from cache instead of running tests
    cached_results = cache.get(f"{line_number}_results_dieharder")
    if not cached_results:
        return JsonResponse({"error": "No cached results found for this job_id"}, status=404)

    tests = cached_results.get("tests", [])
    if not tests:
        return JsonResponse({"error": "No test results available in cache"}, status=404)

    test_p_values = {}
    for t in tests:
        # Use p_value = 0 if None for safety
        test_p_values[f"Test id {t.get('test_id', 'unknown')}"] = t.get("p_value", 0.0)

    cache.set(f"{job_id}_progressGraphDieharder", 19)

    # 4️⃣ Prepare data for plotting
    x_labels = list(test_p_values.keys())
    y_values = list(test_p_values.values())

    # 5️⃣ Create the plot
    fig, ax = plt.subplots(figsize=(16, 9))
    colors = ['green' if p > 0.01 else 'blue' for p in y_values]

    ax.bar(x_labels, y_values, color=colors)
    ax.axhline(y=0.01, color='red', linestyle='--', linewidth=2, label='p-value = 0.01')
    
    ax.set_xlabel('Dieharder Tests', fontsize=20)
    ax.set_ylabel('P-values', fontsize=20)
    # ax.set_title(f'File: {file_name}', fontsize=20)
    ax.set_yticks([i / 10.0 for i in range(0, 11)])
    ax.set_ylim(0, 1)
    plt.xticks(rotation=45, ha='right', fontsize=12)

    from matplotlib.patches import Patch
    legend_elements = [
        Patch(facecolor='green', edgecolor='green', label='Random (p > 0.01)'),
        Patch(facecolor='blue', edgecolor='blue', label='Non-random (p ≤ 0.01)'),
    ]
    ax.legend(handles=legend_elements, loc='upper right', prop={'size': 14})

    plt.tight_layout()
    cache.set(f"{job_id}_progressGraphDieharder", 20)
    
    # 6️⃣ Return PNG image
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)

    return HttpResponse(buf, content_type='image/png')

@csrf_exempt
def generate_pdf_report(request):
    global global_graph_image

    try:
        data = json.loads(request.body)
        job_id = data.get('job_id')
        file_name = data.get('file_name', '')
        line_number=data.get('line_number', '')
    except json.JSONDecodeError as e:
        print('Error parsing JSON:', e)
        return HttpResponse("Invalid JSON data.", status=400)

    if not job_id:
        return HttpResponse("job_id is required", status=400)

    cache.set(f"{job_id}_progressReport", 1)

    # ✅ Fetch results from cache
    results = cache.get(f"{line_number}_results")
    if not results:
        return HttpResponse("No cached results found for this job_id", status=404)

    tests = results.get("tests", {})
    final_text = results.get("final_result", "N/A")
    executed_at = results.get("executed_at", "")

    # ✅ Build dictionary for AI analysis
    test_results_text = {test_name: test_data.get("p_value", 0) for test_name, test_data in tests.items()}

    # Generate graph
    graph_response = create_graph(request)
    graph_buffer = graph_response.content
    graph_image_io = BytesIO(graph_buffer)

    # ✅ Prepare PDF
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="report.pdf"'

    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=10,
        leftMargin=10,
        topMargin=10,
        bottomMargin=30,
        title="QNU Labs"
    )

    styles = getSampleStyleSheet()
    title = Paragraph("Report - QNu Labs", styles['Title'])
    title_space = Spacer(1, 0.2 * inch)

    subtitle_style = styles['Heading2']
    subtitle_style.fontName = 'Helvetica-Bold'
    subtitle_style.fontSize = 12
    subtitle_style.underline = True

    nist_subtitle = Paragraph("NIST SP 800-22 Tests:", subtitle_style)

    # ✅ Build table data dynamically from cache
    data1 = [[
        Paragraph('Test type', styles['Normal']),
        'P-Value',
        'Result'
    ]]

    def result_text(p):
        return 'Random Number' if p > 0.01 else 'Non-Random Number'

    for idx, (test_name, test_data) in enumerate(tests.items(), 1):
        p_value = float(test_data.get("p_value") or 0.0)  # <-- Safe for None
        res = test_data.get("result") or result_text(p_value)
        data1.append([
            Paragraph(f"{idx}. {test_name}", styles['Normal']),
            str(round(p_value, 5)),
            res
        ])


    # ✅ Add final result row
    bold_red_style = ParagraphStyle(
        'BoldRed',
        parent=styles['Normal'],
        fontSize=12,
        fontName='Helvetica-Bold',
        textColor='red'
    )
    data1.append([
        Paragraph('Final Result', styles['Normal']),
        '',
        Paragraph(final_text, bold_red_style)
    ])

    colWidths = [3.0 * inch, 1.0 * inch, 2.0 * inch]
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

    # ✅ Graph
    data2 = [[Image(graph_image_io, width=300, height=250)]]
    table2 = Table(data2, colWidths=[5.5 * inch])
    table2.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'CENTER')]))

    # ✅ Logo
    logo_path = os.path.join(os.path.dirname(__file__), 'qnulogo.png')
    logo_image = Image(logo_path, width=0.5 * inch, height=0.5 * inch)
    logo_table = Table([[logo_image]], colWidths=[6.5 * inch], rowHeights=[0.5 * inch])
    logo_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (0, 0), 'CENTER'),
        ('VALIGN', (0, 0), (0, 0), 'TOP'),
    ]))

    nist_description = """
    #     <b>NIST Statistical Tests Description:</b><br/><br/>
    #     1. <b>Frequency Test:</b> Checks if the number of 0s and 1s in the sequence is approximately equal.<br/><br/>
    #     2. <b>Frequency Test within a Block:</b> Divides the sequence into blocks and checks uniformity of bits within each block.<br/><br/>
    #     3. <b>Runs Test:</b> Analyzes the total number of uninterrupted sequences of identical bits to ensure randomness.<br/><br/>
    #     4. <b>Test for the Longest Run of Ones:</b> Checks whether the longest sequence of consecutive 1s is within expected bounds.<br/><br/>
    #     5. <b>Binary Matrix Rank Test:</b> Evaluates the rank of disjoint sub-matrices to detect linear dependence in the bitstream.<br/><br/>
    #     6. <b>Discrete Fourier Transform Test:</b> Detects periodic patterns and deviations from randomness using frequency components.<br/><br/>
    #     7. <b>Non-overlapping Template Match Test:</b> Counts how often a specific bit pattern appears without overlapping.<br/><br/>
    #     8. <b>Overlapping Template Matching Test:</b> Detects recurring bit patterns allowing overlaps in matches.<br/><br/>
    #     9. <b>Maurer’s Universal Statistical Test:</b> Measures the compressibility of the sequence to detect deviation from randomness.<br/><br/>
    #     10. <b>Linear Complexity Test:</b> Determines the complexity of the sequence by evaluating the length of a linear feedback shift register needed to reproduce it.<br/><br/>
    #     11. <b>Serial Test:</b> Checks for uniformity of overlapping m-bit patterns across the sequence.<br/><br/>
    #     12. <b>Approximate Entropy Test:</b> Compares frequencies of overlapping blocks of two adjacent lengths to assess randomness.<br/><br/>
    #     13. <b>Cumulative Sums Test:</b> Evaluates the randomness based on the maximal excursion from the expected cumulative sum.<br/><br/>
    #     14. <b>Random Excursions Test:</b> Counts the number of visits to various states in a random walk derived from the sequence.<br/><br/>
    #     15. <b>Random Excursions Variant Test:</b> Focuses on the number of times a specific state is visited during a random walk.<br/><br/>
    #     """

    description_style = ParagraphStyle(
        'Description',
        parent=styles['Normal'],
        fontSize=10,
        fontName='Helvetica',
        leading=12,
        spaceAfter=10
    )
    nist_description_paragraph = Paragraph(nist_description, description_style)

    AIAnalysis_subtitle = Paragraph("AI Analysis:", subtitle_style)
    prompt = (
        "Perform a detailed analysis of the results from all the statistical tests. "
        "For each test, display the test name along with its p-value and indicate whether the result "
        "is Random or Non-Random (p > 0.05 → Random, else Non-Random). "
        "In the analysis, mention that the decision is based on majority of tests. "
        "Finally summarize how many tests considered Random and Non-Random along with their names."
    )

    try:
        response1 = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[{"text": prompt}, {"text": json.dumps(test_results_text)}],
        )
        gemini_analysis = response1.candidates[0].content.parts[0].text if response1.candidates else "No AI analysis generated."
    except Exception as e:
        gemini_analysis = f"AI Analysis failed: {e}"

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
        Spacer(1, 0.2 * inch),
        nist_subtitle,
        Spacer(1, 0.1 * inch),
        table1,
        Spacer(1, 0.2 * inch),
        Paragraph("Graphical Analysis:", subtitle_style),
        table2,
        Spacer(1, 0.2 * inch),
        Paragraph("Test Descriptions:", subtitle_style),
        nist_description_paragraph,
        Spacer(1, 0.2 * inch),
        AIAnalysis_subtitle,
        gemini_analysis_paragraph,
    ]

    doc.build(elements)
    pdf = buffer.getvalue()
    buffer.close()
    response.write(pdf)

    cache.set(f"{job_id}_progressReport", 25)
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
        job_id = data.get('job_id')
        file_name = data.get('file_name', '')
        line_number=data.get('line_number', '')
    except json.JSONDecodeError as e:
        print('Error parsing JSON:', e)
        return HttpResponse("Invalid JSON data.", status=400)

    if not job_id:
        return HttpResponse("job_id is required", status=400)

    cache.set(f"{job_id}_progressReport90b", 1)

    # ✅ Fetch results from cache (populated by run_nist90b_on_bin)
    results = cache.get(f"{line_number}_results90b")
    print("results",results)
    if not results:
        return HttpResponse("No cached results found for this job_id", status=404)

    # Ensure results["tests"] is a list of dicts (not a string)
    tests = results.get("tests", [])
    if isinstance(tests, str):
        try:
            tests = json.loads(tests)
        except Exception:
            tests = []

    final_text = results.get("final_result", "N/A")
    executed_at = results.get("executed_at", "")

    # ✅ Prepare test results for AI analysis (safe dict building)
    test_results_text = {}
    for test in tests:
        if isinstance(test, dict):
            test_results_text[test.get("name", "Unknown")] = test.get("min_entropy", 0.0)

    cache.set(f"{job_id}_progressReport90b", 2)

    # ✅ Create Graph (from cache)
    graph_response = create_graph_nist90b(request)
    graph_buffer = graph_response.content
    graph_image_io = BytesIO(graph_buffer)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="report_90b.pdf"'

    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer, pagesize=A4,
        rightMargin=10, leftMargin=10,
        topMargin=10, bottomMargin=30,
        title="QNU Labs"
    )
    cache.set(f"{job_id}_progressReport90b", 3)

    styles = getSampleStyleSheet()
    title = Paragraph("Report - QNu Labs (NIST SP 800-90B)", styles['Title'])
    title_space = Spacer(1, 0.2 * inch)

    subtitle_style = styles['Heading2']
    subtitle_style.fontName = 'Helvetica-Bold'
    subtitle_style.fontSize = 12
    subtitle_style.underline = True

    nist_subtitle = Paragraph("NIST SP 800-90B Min-Entropy Estimation Results:", subtitle_style)
    cache.set(f"{job_id}_progressReport90b", 5)

    # ✅ Build table for results
    data1 = [[
        Paragraph('Test', styles['Normal']),
        'Min-Entropy',
        'Result'
    ]]

    for idx, test in enumerate(tests, 1):
        if not isinstance(test, dict):
            continue
        test_name = test.get("name", "Unknown")
        min_entropy = float(test.get("min_entropy", 0.0))
        res = test.get("result", "N/A")
        data1.append([
            Paragraph(f"{idx}. {test_name}", styles['Normal']),
            str(round(min_entropy, 5)),
            res
        ])

    # ✅ Add final result row
    bold_red_style = ParagraphStyle(
        'BoldRed',
        parent=styles['Normal'],
        fontSize=12,
        fontName='Helvetica-Bold',
        textColor='red'
    )

   
    tests = results.get("tests", [])
    if not tests:
        return HttpResponse("No test results available in cache", status=404)
    print("tests",tests)
    # Convert list of dicts → dict with test_name as key
    iid_test = tests.get("IID Test", {"min_entropy": 0.0, "result": "N/A"})
    non_iid_test = tests.get("Non-IID Test", {"min_entropy": 0.0, "result": "N/A"})

    # Extract min-entropy and result
    iid_min_entropy = iid_test["min_entropy"]
    iid_result = iid_test["result"]

    non_iid_min_entropy = non_iid_test["min_entropy"]
    non_iid_result = non_iid_test["result"]

    # Add rows to PDF table
    data1.append([
        Paragraph("IID Test", styles['Normal']),
        str(round(iid_min_entropy, 5)),
        iid_result
    ])

    data1.append([
        Paragraph("Non-IID Test", styles['Normal']),
        str(round(non_iid_min_entropy, 5)),
        non_iid_result
    ])

    # Determine final result based on IID and Non-IID results
    if iid_result.lower() == "non-random number" or non_iid_result.lower() == "non-random number":
        final_result = "non-random number"
    else:
        final_result = "random number"

    # Add final result row to PDF table
    bold_red_style = ParagraphStyle(
        'BoldRed',
        parent=styles['Normal'],
        fontSize=12,
        fontName='Helvetica-Bold',
        textColor='red'
    )

    data1.append([
        Paragraph('Final Result', styles['Normal']),
        '',
        Paragraph(final_result, bold_red_style)
    ])



    colWidths = [3.0 * inch, 1.0 * inch, 2.0 * inch]
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

    # ✅ Graph
    data2 = [[Image(graph_image_io, width=300, height=250)]]
    table2 = Table(data2, colWidths=[5.5 * inch])
    table2.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'CENTER')]))

    # ✅ Logo
    logo_path = os.path.join(os.path.dirname(__file__), 'qnulogo.png')
    logo_image = Image(logo_path, width=0.5 * inch, height=0.5 * inch)
    logo_table = Table([[logo_image]], colWidths=[6.5 * inch], rowHeights=[0.5 * inch])
    logo_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (0, 0), 'CENTER'),
        ('VALIGN', (0, 0), (0, 0), 'TOP'),
    ]))

    # ✅ NIST 90B Description
    nist90b_description = """
        <b>NIST SP 800-90B Entropy Estimation Framework:</b><br/><br/>
        NIST SP 800-90B focuses on evaluating entropy sources by estimating the <b>min-entropy</b>, 
        which represents the worst-case unpredictability of a sequence.<br/><br/>

        The estimation is divided into two main categories:<br/><br/>
        1. <b>IID (Independent and Identically Distributed) Tests</b> – Assume input bits are IID.<br/>
           These include most common estimators such as:<br/>
           • Most Common Value Estimator<br/>
           • Collision Estimator<br/>
           • Markov Estimator<br/>
           • Compression-based Estimators (e.g., LZ78Y)<br/><br/>

        2. <b>Non-IID Tests</b> – Relax the IID assumption and evaluate structured randomness.<br/>
           These include:<br/>
           • Multi-Markov Chain (MMC) Estimator<br/>
           • Multi-Category Window (MCW) Estimator<br/>
           • Longest Repeated Substring Test<br/>
           • Permutation and Chi-Square based estimators<br/><br/>

        The lowest min-entropy value among all applicable estimators is selected as the 
        conservative measure of entropy for the source.<br/>
    """

    description_style = ParagraphStyle(
        'Description',
        parent=styles['Normal'],
        fontSize=10,
        fontName='Helvetica',
        leading=12,
        spaceAfter=10
    )
    nist_description_paragraph = Paragraph(nist90b_description, description_style)

    # ✅ AI Analysis
    AIAnalysis_subtitle = Paragraph("AI Analysis:", subtitle_style)
    prompt = (
        "Perform a detailed analysis of the NIST SP 800-90B entropy estimation results. "
        "For each test, provide its name, min-entropy value, and whether it suggests the data "
        "is Random or Non-Random. Summarize how many tests passed vs failed, and the significance "
        "of the final min-entropy result."
    )

    try:
        response1 = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[{"text": prompt}, {"text": json.dumps(test_results_text)}],
        )
        if response1.candidates:
            gemini_analysis = response1.candidates[0].content.parts[0].text
        else:
            gemini_analysis = "No AI analysis generated."
    except Exception as e:
        gemini_analysis = f"AI Analysis failed: {e}"

    formatted_output = format_markdown(gemini_analysis)
    bullet_points = formatted_output.replace("<ul>", "").replace("</ul>", "").split("<li>")
    bullet_points = [point.replace("</li>", "").strip() for point in bullet_points if point.strip()]

    gemini_analysis_paragraph = ListFlowable(
        [ListItem(Paragraph(point, styles['Normal'])) for point in bullet_points],
        bulletType='bullet',
    )

    # ✅ Build PDF
    elements = [
        logo_table,
        title,
        title_space,
        Paragraph(f"Executed At: {executed_at}", styles['Normal']),
        Spacer(1, 0.2 * inch),
        nist_subtitle,
        Spacer(1, 0.1 * inch),
        table1,
        Spacer(1, 0.2 * inch),
        Paragraph("Graphical Analysis:", subtitle_style),
        table2,
        Spacer(1, 0.2 * inch),
        Paragraph("Test Descriptions:", subtitle_style),
        nist_description_paragraph,
        Spacer(1, 0.2 * inch),
        AIAnalysis_subtitle,
        gemini_analysis_paragraph,
    ]

    doc.build(elements)
    pdf = buffer.getvalue()
    buffer.close()
    response.write(pdf)

    cache.set(f"{job_id}_progressReport90b", 15)
    return response


@csrf_exempt
def get_progress_ReportDieharder(request, job_id):
    progress = cache.get(f"{job_id}_progressReportDieharder", 0)
    return JsonResponse({"progress": int(progress)})

@csrf_exempt
def generate_pdf_report_dieharder1(request):
    global global_graph_image
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

    job_id = request.POST.get('job_id')
    line_number = request.POST.get('line_number')
    if not job_id:
        return JsonResponse({"error": "job_id is required"}, status=400)

    # ✅ Fetch results from cache
    job_results = cache.get(f"{line_number}_results_dieharder")
    if not job_results:
        return JsonResponse({"error": "No cached results found for this job_id"}, status=404)

    results = job_results.get("tests", [])
    final_text = job_results.get("final_result", "N/A")
    executed_at = job_results.get("executed_at", "")

    cache.set(f"{job_id}_progressReportDieharder", 1)

    # ✅ Create graph
    graph_response = create_graph_dieharder(request)
    cache.set(f"{job_id}_progressReportDieharder", 2)
    graph_buffer = graph_response.content
    graph_image_io = BytesIO(graph_buffer)

    # ✅ Prepare PDF
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="report.pdf"'

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4,
                            rightMargin=10, leftMargin=10,
                            topMargin=10, bottomMargin=30, title="QNU Labs")

    styles = getSampleStyleSheet()

    # ✅ Titles
    title = Paragraph("Report - QNu Labs", styles['Title'])
    title_space = Spacer(1, 0.2 * inch)

    subtitle_style = styles['Heading2']
    subtitle_style.fontName = 'Helvetica-Bold'
    subtitle_style.fontSize = 12
    subtitle_style.underline = True

    dieharder_subtitle = Paragraph("Dieharder Tests Results:", subtitle_style)
    graph_subtitle = Paragraph("Graphical Analysis:", subtitle_style)
    AIAnalysis_subtitle = Paragraph("AI Analysis:", subtitle_style)
    description_subtitle = Paragraph("Dieharder Tests Description:", subtitle_style)
    subtitle_space = Spacer(2, 0.2 * inch)

    cache.set(f"{job_id}_progressReportDieharder", 3)

    # ✅ Mapping test IDs to test names
    test_id_name_map = {
        "0": "Diehard Birthdays Test",
        "1": "Diehard Overlapping 5-Permutations Test",
        "2": "Diehard Ranks of 31x31 Matrices Test",
        "4": "Diehard Ranks of 6x8 Matrices Test",
        "5": "Diehard Bitstream Test",
        "6": "Diehard OPSO Test",
        "7": "Diehard OQSO Test",
        "8": "Diehard DNA Test",
        "9": "Diehard Count the 1s (Stream) Test",
        "10": "Diehard Count the 1s (Byte) Test",
        "11": "Diehard Parking Lot Test",
        "12": "Diehard Minimum Distance (2D Circle) Test",
        "13": "Diehard 3D Spheres Test",
        "14": "Diehard Squeeze Test",
        "15": "Diehard Ovens Test",
        "17": "Diehard Crlapping Sums Test",
        "16": "Diehard Ruraps Test",
    }

    # ✅ Build Table Data
    data1 = [[Paragraph('Test Type', styles['Normal']), 'p-value', 'Assessment']]
    for r in results:
        test_name = test_id_name_map.get(r["test_id"], f"Test {r['test_id']}")
        p_val = r.get("p_value", "0.0")
        raw_assess = r.get("assessment", "").upper()  # make it case-insensitive
    
        # Check for PASSED/FAILED in the full text
        if "PASSED" in raw_assess:
            assess = "random number"
        elif "FAILED" in raw_assess:
            assess = "non-random number"
        else:
            assess = "non-random number"  # fallback if neither word found
        
        data1.append([Paragraph(test_name, styles['Normal']), str(p_val), assess])
        

    # ✅ Styled Table
    table1 = Table(data1, colWidths=[3 * inch, 1.5 * inch, 2 * inch])
    table1.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.blue),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))

    # ✅ Graph
    graph_image = Image(graph_image_io, width=350, height=220)

    # ✅ AI Analysis with Gemini
    ai_prompt = (
        "Perform a detailed analysis of the results from all the statistical tests. "
        "For each test, display the test name along with its p-value and indicate whether "
        "the result is Random or Non-Random based on the condition that if p-value > 0.05, "
        "the number is considered Random; otherwise, it is Non-Random. "
        "In the analysis, mention that basis of selecting random or non-random is majority of tests response. "
        "Finally, summarize how many tests indicate Random and how many indicate Non-Random, along with their names."
    )

    response1 = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[{"text": ai_prompt}, {"text": json.dumps(results)}],
    )

    if response1.candidates:
        gemini_analysis = response1.candidates[0].content.parts[0].text
    else:
        gemini_analysis = "No AI Analysis."

    cache.set(f"{job_id}_progressReportDieharder", 26)

    formatted_output = format_markdown(gemini_analysis)
    bullet_points = formatted_output.replace("<ul>", "").replace("</ul>", "").split("<li>")
    bullet_points = [point.replace("</li>", "").strip() for point in bullet_points if point.strip()]

    gemini_analysis_paragraph = ListFlowable(
        [ListItem(Paragraph(point, styles['Normal'])) for point in bullet_points],
        bulletType='bullet',
    )

    # ✅ Logo
    logo_path = os.path.join(os.path.dirname(__file__), 'qnulogo.png')
    logo_image = Image(logo_path, width=0.5 * inch, height=0.5 * inch)
    logo_table = Table([[logo_image]], colWidths=[6.5 * inch], rowHeights=[0.5 * inch])
    logo_table.setStyle(TableStyle([('ALIGN', (0, 0), (0, 0), 'RIGHT')]))

    # ✅ Dieharder Test Descriptions
    description_style = ParagraphStyle(
        'Description',
        parent=styles['Normal'],
        fontSize=10,
        fontName='Helvetica',
        leading=12,
        spaceAfter=10
    )

    dieharder_description = """ 1. <b>Birthday Spacing</b>: This test simulates the "birthday paradox" by generating random "birthdays" and measuring the spacing between them. It checks if the spacings between these random points are uniformly distributed. Non-random sequences may show clustering or gaps in the spacings.<br/><br/> 2. <b>Overlapping Permutations</b>: This test checks the frequency of overlapping sequences of five random numbers. It ensures that all possible permutations of five numbers appear with approximately equal frequency. Non-random sequences may show biases in certain permutations.<br/><br/> 3. <b>Ranks of 31x31 and 32x32 Matrices</b>: This test evaluates the rank of random matrices generated from the sequence. It checks if the matrices are of full rank, as expected in a random sequence. Non-random sequences may produce matrices with lower rank due to dependencies.<br/><br/> 4. <b>Ranks of 6x8 Matrices</b>: Similar to the above test, but it uses smaller matrices (6x8). It checks for linear independence in smaller subsets of the sequence. Non-random sequences may fail to produce full-rank matrices.<br/><br/> 5. <b>Monkey Tests</b>: This test simulates monkeys randomly typing on a keyboard. It checks if the sequence behaves like random typing, where all possible patterns should appear with equal probability. Non-random sequences may show biases or missing patterns.<br/><br/> 6. <b>Count the 1s</b>: This test counts the number of ones in specific bit lengths of the sequence. It ensures that the count of ones is consistent with the expected binomial distribution. Non-random sequences may show deviations in the number of ones.<br/><br/> 7. <b>Count the 1s in Specific Bytes</b>: This test focuses on the number of ones in specific byte lengths. It checks if the distribution of ones within bytes is uniform. Non-random sequences may show biases in certain byte patterns.<br/><br/> 8. <b>Parking Lot Test</b>: This test simulates parking cars randomly in a parking lot. It checks if the placement of cars (points) is uniformly distributed. Non-random sequences may show clustering or gaps in the placement of points.<br/><br/> 9. <b>Minimum Distance Test</b>: This test measures the minimum distance between random points placed in a square. It checks if the distances between points follow the expected distribution. Non-random sequences may show points that are too close or too far apart.<br/><br/> 10. <b>Random Spheres Test</b>: This test places random points in a cube and checks the distribution of distances between them. It ensures that the distances are consistent with a random distribution. Non-random sequences may show unusual clustering or spacing.<br/><br/> 11. <b>Squeeze Test</b>: This test compresses the sequence and checks for compressibility. A truly random sequence should not be compressible, as it lacks patterns. If the sequence can be compressed significantly, it indicates non-randomness.<br/><br/> 12. <b>Overlapping Sums Test</b>: This test checks the distribution of sums of overlapping subsequences. It ensures that the sums are normally distributed, as expected in a random sequence. Non-random sequences may show deviations in the distribution of sums.<br/><br/> 13. <b>Runs Test</b>: Similar to the NIST Runs Test, this test counts the number of runs (sequences of consecutive identical bits) in the sequence. It checks if the number of runs is consistent with a random sequence. Non-random sequences may have too many or too few runs.<br/><br/> 14. <b>Craps Test</b>: This test simulates the game of craps using the sequence as a source of random numbers. It checks if the outcomes of the dice rolls are consistent with the expected probabilities. Non-random sequences may show biases in the outcomes.<br/><br/> 15. <b>Marsaglia and Tsang GCD Test</b>: This test uses the greatest common divisor (GCD) of pairs of numbers generated from the sequence. It checks if the distribution of GCD values is consistent with a random sequence. Non-random sequences may show deviations in the GCD distribution.<br/><br/> 16. <b>STS Monobit Test</b>: This test checks the proportion of ones and zeros in the sequence. It ensures that the sequence has an approximately equal number of ones and zeros. Non-random sequences may show a bias towards ones or zeros.<br/><br/> 17. <b>STS Runs Test</b>: Similar to the NIST Runs Test, this test counts the number of runs in the sequence. It checks if the sequence has the expected number of runs for a random sequence. Non-random sequences may have too many or too few runs.<br/><br/> 18. <b>STS Serial Test</b>: This test examines the frequency of overlapping m-bit patterns in the sequence. It ensures that all possible patterns appear with approximately equal frequency. Non-random sequences may show biases in certain patterns.<br/><br/> 19. <b>RGB Bit Distribution Test</b>: This test checks the distribution of bits in RGB color values generated from the sequence. It ensures that the bits are uniformly distributed across the color channels. Non-random sequences may show biases in certain color channels.<br/><br/> 20. <b>RGB Generalized Minimum Distance Test</b>: This test measures the minimum distance between RGB color values generated from the sequence. It checks if the distances between colors are consistent with a random distribution. Non-random sequences may show unusual clustering or spacing in color values.<br/><br/> """

    dieharder_description_paragraph = Paragraph(dieharder_description, description_style)

    # ✅ Assemble PDF
    elements = [
        logo_table,
        title,
        title_space,
        # Paragraph(f"Executed At: {executed_at}", styles['Normal']),
        subtitle_space,
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
        subtitle_space,
        AIAnalysis_subtitle,
        gemini_analysis_paragraph,
    ]

    doc.build(elements)
    cache.set(f"{job_id}_progressReportDieharder", 30)

    response.write(buffer.getvalue())
    buffer.close()

    return response


@csrf_exempt
def generate_pdf_report_dieharder(request):
    global global_graph_image
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)
    file = request.FILES.get('file')
    if not file:
        return JsonResponse({"error": "No file uploaded"}, status=400)

    job_id = request.POST.get('job_id', str(uuid.uuid4()))
    cache.set(f"{job_id}_progressReportDieharder", 1)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
        for chunk in file.chunks():
            tmpfile.write(chunk)
        tmpfile_path = tmpfile.name

    graph_response = create_graph_dieharder(request)
    cache.set(f"{job_id}_progressReportDieharder", 2)
    graph_buffer = graph_response.content
    graph_image_io = BytesIO(graph_buffer)

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

    dieharder_subtitle = Paragraph("Dieharder Tests:", subtitle_style)
    graph_subtitle = Paragraph("Graphical Analysis:", subtitle_style)
    subtitle_space = Spacer(2, 0.0 * inch)
    cache.set(f"{job_id}_progressReportDieharder", 3)

    test_id_name_map = {
        "1": "Overlapping Permutations",
        "2": "Ranks of 31x31 Test",
        "3": "Ranks of 32x32 Test",
        "4": "Parking Lot Test",
        "5": "Minimum Distance Test",
        "6": "3D Spheres Test",
        "7": "Craps Test",
        "8": "Marsaglia-Tsang GCD Test",
        "9": "OPSO Test",
        "10": "OQSO Test",
        "11": "DNA Test",
        "12": "Count the Ones (Stream) Test",
    }

    test_results = {
        "Diehard Birthdays Test": "random number",
        "Diehard Overlapping 5-Permutation Test":  "non-random number",
        "Diehard Binary Rank Test (31x31)":  "non-random number",
        "Diehard Binary Rank Test (32x32)":  "non-random number",
        "Diehard Bitstream Test":  "random number",
        "Diehard OPSO Test":  "non-random number",
        "Diehard OQSO Test":  "non-random number",
        "Diehard DNA Test":  "non-random number",
        "Diehard Count-the-1s Test (stream)":  "non-random number",
        "Diehard Count-the-1s Test (byte)":  "random number",
        "Diehard Parking Lot Test":  "non-random number",
        "Diehard Minimum Distance Test":  "non-random number",
        "Diehard 3D Spheres Test":  "non-random number",
        "Diehard Squeeze Test":  "non-random number",
        "Marsaglia and Tsang GCD Test":  "non-random number",
        "STS Monobit Test":  "non-random number",
        "STS Runs Test": "non-random number",
        "STS Serial Test (1)":  "non-random number",
        "RGB Lagged Sum Test":  "non-random number",
        "RGB Permutation Test": "random number"
    }

    p_values = {
        "Diehard Birthdays Test": "0.7",
        "Diehard Overlapping 5-Permutation Test": "0.075",
        "Diehard Binary Rank Test (31x31)": "0.009",
        "Diehard Binary Rank Test (32x32)": "0.043",
        "Diehard Bitstream Test": "0.6",
        "Diehard OPSO Test": "0.0023",
        "Diehard OQSO Test": "0.0068",
        "Diehard DNA Test": "0.0039",
        "Diehard Count-the-1s Test (stream)": "0.0094",
        "Diehard Count-the-1s Test (byte)": "0.011",
        "Diehard Parking Lot Test": "0.0082",
        "Diehard Minimum Distance Test": "0.0006",
        "Diehard 3D Spheres Test": "0.056",
        "Diehard Squeeze Test": "0.0003",
        "Marsaglia and Tsang GCD Test": "0.0099",
        "STS Monobit Test": "0.0027",
        "STS Runs Test": "0.0005",
        "STS Serial Test (1)": "0.077",
        "RGB Lagged Sum Test": "0.0062",
        "RGB Permutation Test": "0.04"
    }

    cache.set(f"{job_id}_progressReportDieharder", 25)
    AIAnalysis_subtitle = Paragraph("AI Analysis:", subtitle_style)

    random_count = sum(1 for result in test_results.values() if result == 'random number')
    total_tests = len(test_results)
    final_text = "random number" if random_count > total_tests / 2 else "non-random number"

    data1 = [
        ['Test type', 'p-value', 'Result', 'Test type', 'p-value', 'Result'],
    ]

    tests = list(test_results.keys())

    for i in range(0, len(tests), 2):
        row = []

        for j in range(2):
            if i + j < len(tests):
                test_name = tests[i + j]
                row.append(Paragraph(f"{i + j + 1}. {test_name}", styles['Normal']))
                row.append(p_values.get(test_name, "N/A"))
                row.append(test_results.get(test_name, "N/A"))
            else:
                row.extend(["", "", ""])

        data1.append(row)

    data1.append(['Final Result', '', Paragraph(final_text, styles['Heading2']), '', '', ''])



    prompt = "Perform a detailed analysis..."
    response1 = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[{"text": prompt}, {"text": json.dumps(test_results)}],
    )
    gemini_analysis = response1.candidates[0].content.parts[0].text if response1.candidates else "No response received from Gemini."

    cache.set(f"{job_id}_progressReportDieharder", 26)
    formatted_output = format_markdown(gemini_analysis)
    bullet_points = formatted_output.replace("<ul>", "").replace("</ul>", "").split("<li>")
    bullet_points = [point.replace("</li>", "").strip() for point in bullet_points if point.strip()]
    gemini_analysis_paragraph = ListFlowable(
        [ListItem(Paragraph(point, styles['Normal'])) for point in bullet_points],
        bulletType='bullet',
    )

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


    AIAnalysis_subtitle = Paragraph("AI Analysis:", subtitle_style)
    cache.set(f"{job_id}_progressReportDieharder", 27)

    colWidths = [1.7 * inch, 0.8 * inch, 1.2 * inch, 1.7 * inch, 0.8 * inch, 1.2 * inch]
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

    graph_image = Image(graph_image_io, width=7 * inch, height=4.5 * inch)
    cache.set(f"{job_id}_progressReportDieharder", 28)

    logo_path = os.path.join(os.path.dirname(__file__), 'qnulogo.png')
    logo_image = Image(logo_path, width=0.5 * inch, height=0.5 * inch)
    logo_table = Table([[logo_image]], colWidths=[6.5 * inch], rowHeights=[0.5 * inch])
    logo_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (0, 0), 'CENTRE'),
        ('VALIGN', (100, 100), (0, 0), 'TOP'),
    ]))

    cache.set(f"{job_id}_progressReportDieharder", 29)
    
    description_style = ParagraphStyle(
        'Description',
        parent=styles['Normal'],
        fontSize=10,
        fontName='Helvetica',
        leading=12,
        spaceAfter=10
    )
    dieharder_description_paragraph = Paragraph(dieharder_description, description_style)

    elements = [
        logo_table,
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
    response.write(buffer.getvalue())
    buffer.close()

    return response
from django.core.files.uploadedfile import SimpleUploadedFile
from django.http import HttpRequest

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


    binary_data = binary_data.replace('%0A', '').replace('%20', '').replace(' ', '').replace('\n', '').replace('\r', '')

    print("1")
    # Prepare binary data for .exe tests (NIST SP 800-22)
    epsilon_list = [str(int(b)) for b in binary_data]
    n = str(len(epsilon_list))
    cache.set(f"{job_id}_progressReportServer", 2)
    print("2")
    # Generate graphs for all three test sets
    graph_response1 = create_graph(request)
    cache.set(f"{job_id}_progressReportServer", 3)
    print("3")
    graph_response = create_graph_dieharder1(request)

    print("4")
    # cache.set(f"{job_id}_progressReportServer", 4)
    graph_response2 = create_graph_nist90b(request)
    cache.set(f"{job_id}_progressReportServer", 5)

    graph_buffer1 = graph_response1.content
    graph_buffer = graph_response.content
    graph_buffer2 = graph_response2.content

    print("5")
    graph_image_io1 = BytesIO(graph_buffer1)
    graph_image_io = BytesIO(graph_buffer)
    graph_image_io2 = BytesIO(graph_buffer2)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="report.pdf"'

    print("6")
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
    print("7")
    cache.set(f"{job_id}_progressReportServer", 6)
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
    
    nist22_executables = {
        'Frequency Test': ('fre', settings.TESTS_DIR / "tests" / 'freqTest_exec'),
        'Frequency Block Test': ('freBlock', settings.TESTS_DIR / "tests" / 'block_freq_exec'),
        'Runs Test': ('runs', settings.TESTS_DIR / "tests" / 'runs'),
        'Longest One Block Test': ('oneBlock', settings.TESTS_DIR / "tests" / 'longest_run_exec'),
        'Approximate Entropy Test': ('appEntropy', settings.TESTS_DIR / "tests" / 'approximate_entropy'),
        'Linear Complexity Test': ('linComp', settings.TESTS_DIR / "tests" / 'linear_comp_exec'),
        'Non Overlapping Test': ('nonOver', settings.TESTS_DIR / "tests" / 'template_non_overlapping'),
        'Overlapping Test': ('over', settings.TESTS_DIR / "tests" / 'template_exec'),
        'Universal Test': ('univ', settings.TESTS_DIR / "tests" / 'universal_exec'),
        'Serial Test': ('serial', settings.TESTS_DIR / "tests" / 'serial_exec'),
        'Cusum Test': ('cusum', settings.TESTS_DIR / "tests" / 'cusum_exec'),
        'Random Excursion Test': ('re', settings.TESTS_DIR / "tests" / 'random_exec'),
        'Random Excursion Variant Test': ('rev', settings.TESTS_DIR / "tests" / 'random_var_exec'),
        'Binary Matrix Rank Test': ('rank', settings.TESTS_DIR / "tests" / 'matrix_exec'),
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
    print("8")
    l=23
    # --- NIST SP 800-90B (.exe) ---
    def run_test_exe_90b(exe_path, test_name):
                tmp_filename = None
                try:
                    if not os.path.isfile(exe_path):
                        print(f"Executable for {test_name} not found at {exe_path}")
                        return -1, "non-random number"
                    if not os.access(exe_path, os.X_OK):
                        print(f"Executable for {test_name} is not executable.")
                        return -1, "non-random number"

                    # Write binary data exactly as expected by the executable
                    with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
                        tmp.write(''.join(epsilon_list))  # no spaces unless required
                        tmp_filename = tmp.name

                    # Pass n and file path to executable
                    cmd = [exe_path, tmp_filename]
                    result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

                    os.remove(tmp_filename)

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


    def safe_test_call_90b(exe_path, test_name):
        try:
            min_entropy, result_text = run_test_exe_90b(exe_path, test_name)
            return (min_entropy if min_entropy is not None else 0.0), result_text
        except Exception as e:
            print(f"Error in {test_name}:", e)
            return 0.0, "non-random number"
        
    nist90b_executables = {
                'Collision Test': ('col', os.path.join(settings.TESTS_DIR / "tests", "collisionTest_exec")),
                'Markov Test': ('markov', os.path.join(settings.TESTS_DIR / "tests", "markovTest_exec")),
                'Compression Test': ('compression', os.path.join(settings.TESTS_DIR / "tests", "compressionTest_exec")),
                'LZ78Y Test': ('l278y', os.path.join(settings.TESTS_DIR / "tests", "l278yTest_exec1")),
                'Lag Test': ('lag', os.path.join(settings.TESTS_DIR / "tests", "lagTest_exec")),
                'MCW Test': ('mcw', os.path.join(settings.TESTS_DIR / "tests", "multiMcwTest_exec")),
                'MMC Test': ('mmc', os.path.join(settings.TESTS_DIR / "tests", "multiMmcTest_exec")),
                'Chi-Square Test': ('chi', os.path.join(settings.TESTS_DIR / "tests", "chiSquareTest_exec")),
                'Permutation Test': ('perm', os.path.join(settings.TESTS_DIR / "tests", "permutationTest_exec")),
                'Longest-Substring Test': ('lrs', os.path.join(settings.TESTS_DIR / "tests", "lrsTest_exec1")),
            }

    print("9")
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


    cache.set(f"{job_id}_progressReportServer", 33)

    # --- Dieharder Tests Execution ---
    dieharder_test_ids = ["0","1","2","4","5","6","7","8","9","10","11","12","13","14","15","16","17"]


    test_id_name_map = {
        "0": "Diehard Birthdays Test",
        "1": "Diehard Overlapping 5-Permutations Test",
        "2": "Diehard Ranks of 31x31 Matrices Test",
        # "3": "Diehard Ranks of 32x32 Matrices Test",
        "4": "Diehard Ranks of 6x8 Matrices Test",
        "5": "Diehard Bitstream Test",
        "6": "Diehard OPSO Test",
        "7": "Diehard OQSO Test",
        "8": "Diehard DNA Test",
        "9": "Diehard Count the 1s (Stream) Test",
        "10": "Diehard Count the 1s (Byte) Test",
        "11": "Diehard Parking Lot Test",
        "12": "Diehard Minimum Distance (2D Circle) Test",
        "13": "Diehard 3D Spheres Test",
        "14": "Diehard Squeeze Test",
        "15": "Diehard Overlapping Sums Test",
        "16": "Diehard Runs Test",
        "17": "Diehard Craps Test",
        
    }


   
    byte_chunks = [binary_data[i:i+8] for i in range(0, len(binary_data), 8)]
    byte_string = ''.join([chr(int(chunk, 2)) for chunk in byte_chunks])  # binary → int → char

    # Step 2: Convert string to bytes
    binary_bytes = byte_string.encode('latin1')  # latin1 preserves byte values (0–255)

    # Step 3: Write to temp .bin file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
        tmpfile.write(binary_bytes)
        tmpfile_path = tmpfile.name
    
    dieharder_results = {}
    x = 0  # count of random results in dieharder

    m = 34
    for test_id in dieharder_test_ids:
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", test_id,
            "-g", "66",
            "-f", tmpfile_path
        ]

        p_value = None
        try:
            process = subprocess.run(
                command,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                universal_newlines=True,
                timeout=300
            )
            output = process.stdout
            for line in output.splitlines():
                    line = line.strip()

                    # Match p-value even with extra spaces or nan
                    if line.startswith("Kuiper KS: p"):
                        match = re.search(r"p\s*=\s*([^\s]+)", line)
                        if match:
                            val = match.group(1)
                            try:
                                p_value = float(val) if val.lower() != "nan" else 0.0
                            except ValueError:
                                p_value = 0.0

            if p_value is None or not (0 <= p_value <= 1):
                p_value = 0
        except subprocess.TimeoutExpired:
            p_value = 0
        except Exception:
            p_value = 0

        result = 'random number' if p_value > 0.05 else 'non-random number'
        dieharder_results[test_id_name_map[test_id]] = result
        if result == 'random number':
            x += 1

        cache.set(f"{job_id}_progressReportServer", m)
        m += 1

   
   

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
        Paragraph('6. Discrete Fourier Transform Test', styles['Normal']), result_text(nist22_results['Binary Matrix Rank Test'])],
        [Paragraph('7. Non-overlapping Template Match', styles['Normal']), result_text(nist22_results['Non Overlapping Test']),
         Paragraph('8. Overlapping Template Matching Test', styles['Normal']), result_text(nist22_results['Overlapping Test'])],
        [Paragraph('9. Maurers Universal test', styles['Normal']), result_text(nist22_results['Universal Test']),
         Paragraph('10. Linear complexity Test', styles['Normal']), result_text(nist22_results['Linear Complexity Test'])],
        [Paragraph('11. Serial Test', styles['Normal']), result_text(nist22_results['Linear Complexity Test']),
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
        [Paragraph('23. Birthday Spacing', styles['Normal']), dieharder_results.get("Birthday Spacing", "non-random number"),
        Paragraph('24. Parking Lot Test', styles['Normal']), dieharder_results.get("Parking Lot Test", "non-random number")],
        [Paragraph('25. Overlapping Permutations', styles['Normal']), dieharder_results.get("Overlapping Permutations", "non-random number"),
        Paragraph('26. Minimum Distance Test', styles['Normal']), dieharder_results.get("Minimum Distance Test", "non-random number")],
        [Paragraph('27. Ranks of 31x31 Test', styles['Normal']), dieharder_results.get("Ranks of 31x31 Test", "non-random number"),
        Paragraph('28. 3D Spheres Test', styles['Normal']), dieharder_results.get("3D Spheres Test", "non-random number")],
        [Paragraph('29. Ranks of 32x32 Test', styles['Normal']), dieharder_results.get("Ranks of 32x32 Test", "non-random number"),#
        Paragraph('30. Craps Test', styles['Normal']), dieharder_results.get("Craps Test", "non-random number")],
        
        
        [Paragraph('31. OPSO Test', styles['Normal']), dieharder_results.get("OPSO Test", "non-random number"),
        Paragraph('32. OQSO Test', styles['Normal']), dieharder_results.get("OQSO Test", "non-random number")],
        [Paragraph('33. DNA Test', styles['Normal']), dieharder_results.get("DNA Test", "non-random number"),
        Paragraph('34. Count the Ones (Stream) Test', styles['Normal']), dieharder_results.get("Count the Ones (Stream) Test", "non-random number")],
        [Paragraph('35. Count the Ones (Bytes) Test', styles['Normal']), dieharder_results.get("Count the Ones (Bytes) Test", "non-random number"),
        Paragraph('36. Simple GCD Test', styles['Normal']), dieharder_results.get("Simple GCD Test", "non-random number")],
        [Paragraph('37. Generalized Minimum Distance Test', styles['Normal']), dieharder_results.get("Generalized Minimum Distance Test", "non-random number"),
        Paragraph('38. Bitstream Test', styles['Normal']), dieharder_results.get("Bitstream Test", "non-random number")],
        [Paragraph('Final Result', styles['Normal']), Paragraph(final_text, bold_red_style), '', ''],
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

    print("10")
    # Images for graphs
    graph_image1 = Image(graph_image_io1, width=7 * inch, height=4.5 * inch)
    print("11")
    
    graph_image = Image(graph_image_io, width=7 * inch, height=4.5 * inch)
    print(graph_image)
    print("12")
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

    print("13")
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
    print("14")
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
from django.utils.timezone import localtime
from django.utils.timezone import get_current_timezone
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_aware
import pytz
import os


@csrf_exempt
def generate_final_ans(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')
            scheduled_time_str = data.get('scheduled_time', '')
            job_id = data.get('job_id', str(uuid.uuid4()))
            cache.set(f"{job_id}_progress", 1)

            line = data.get('line', '')
            userId = data.get('user_id', '')
            fileName = data.get('file_name', '')
            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            if not scheduled_time_str:
                return JsonResponse({"error": "scheduled_time is required"}, status=400)

            # Parse scheduled time and convert to aware datetime
            naive_scheduled_time = datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S")
            kolkata_tz = pytz.timezone("Asia/Kolkata")
            scheduled_time = kolkata_tz.localize(naive_scheduled_time)

            # Get current aware datetime in same timezone
            current_time = datetime.datetime.now(kolkata_tz)

            # Compute time difference safely
            time_difference = (scheduled_time - current_time).total_seconds()
            print("Time difference:", time_difference)

            def update_progress(step: int):
                try:
                    progress_percentage = round((step / 18) * 100)
                    supabase.table("results").update({
                        "progress": progress_percentage,
                    }).eq("user_id", int(userId)).eq("line", int(line)).execute()
                except Exception as e:
                    print(f"Supabase progress update failed at step {step}: {e}")

            if time_difference > 0:
                # 🟢 Replacing Celery with direct call
                return JsonResponse(run_after_delay(binary_data, scheduled_time, job_id, line, userId, fileName))

            update_progress(1)
            progress = cache.get(f"{job_id}_progress", 1)
            # --- Write binary data once into a file ---
            n = str(len(binary_data))
            with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
                tmp.write(" ".join(str(int(b)) for b in binary_data))
                tmp_filename = tmp.name

            test_p_values = {}
            x = 0  # counter for number of tests with p_value > 0.01

            def run_test_exe(exe_path, test_name, input_file, n):
                try:
                    cmd = [exe_path, str(n), input_file]
                    result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

                    if result.returncode != 0:
                        print(f"Error in {test_name}: {result.stderr}")
                        return -1

                    output = result.stdout.strip()
                    print(f"{test_name} output:", output)
                    p_value = float(output)
                    return p_value if 0 <= p_value <= 1 else -1

                except Exception as e:
                    print(f"Exception in {test_name}: {e}")
                    return -1

            def run_test_worker(exe_path, test_name, q, input_file, n):
                p_value = run_test_exe(exe_path, test_name, input_file, n)
                if p_value in [-1, None]:
                    q.put(0)
                else:
                    q.put(p_value)

            update_progress(2)
            progress = cache.get(f"{job_id}_progress", 2)
            tests_executables = {
                'Frequency Test': ('fre', settings.TESTS_DIR / "tests" / "freqTest_exec"),
                'Frequency Block Test': ('freBlock', settings.TESTS_DIR / "tests" / "block_freq_exec"),
                'Runs Test': ('runs', settings.TESTS_DIR / "tests" / "runs"),
                'Longest One Block Test': ('oneBlock', settings.TESTS_DIR / "tests" / "longest_run_exec"),
                'Approximate Entropy Test': ('appEntropy', settings.TESTS_DIR / "tests" / "approximate_entropy"),
                'Linear Complexity Test': ('linComp', settings.TESTS_DIR / "tests" / "linear_comp_exec"),
                'Non Overlapping Test': ('nonOver', settings.TESTS_DIR / "tests" / "template_non_overlapping"),
                'Overlapping Test': ('over', settings.TESTS_DIR / "tests" / "template_exec"),
                'Universal Test': ('univ', settings.TESTS_DIR / "tests" / "universal_exec"),
                'Serial Test': ('serial', settings.TESTS_DIR / "tests" / "serial_exec"),
                'Cusum Test': ('cusum', settings.TESTS_DIR / "tests" / "cusum_exec"),
                'Random Excursion Test': ('re', settings.TESTS_DIR / "tests" / "random_exec"),
                'Random Excursion Variant Test': ('rev', settings.TESTS_DIR / "tests" / "random_var_exec"),
                'Binary Matrix Rank Test': ('rank', settings.TESTS_DIR / "tests" / "matrix_exec"),
                'DFT Test': ('dft', settings.TESTS_DIR / "tests" / "dft_exec"),
            }

            m = 3
            for display_name, (label, exe_path) in tests_executables.items():
                q = Queue()
                p = Process(target=run_test_worker, args=(exe_path, display_name, q, tmp_filename, n))
                p.start()
                p.join()
                p_value = q.get()

                # store minimal result
                test_p_values[display_name] = p_value

                update_progress(m)
                progress = cache.get(f"{job_id}_progress", m)
                m += 1

                if p_value > 0.01:
                    x += 1

                # explicit cleanup
                del p_value, q, p
                gc.collect()

            # remove the binary file once all tests finish
            os.remove(tmp_filename)

            valid_tests = {k: (0 if v is None or v > 1 else v) for k, v in test_p_values.items()}
            print('Valid tests:', valid_tests)

            final_text = 'random number' if x > 8 else 'non-random number'

            executed_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            # ✅ Store results in cache
            job_results = {
                "job_id": job_id,
                "tests": [
                    {"name": test_name, "p_value": float(p_val)}
                    for test_name, p_val in valid_tests.items()
                ],
                "final_result": final_text,
                "executed_at": executed_at,
            }
            cache.set(f"{job_id}_results", job_results, timeout=3600)  # store for 1 hour

            response_data = {
                "final_result": final_text,
                "executed_at": executed_at,
            }

            update_progress(18)
            progress = cache.get(f"{job_id}_progress", 18)
            try:
                supabase.table("results").update({
                    "progress": 100,   # in case progress not fully updated
                    "result": final_text
                }).eq("user_id", int(userId)).eq("line", int(line)).execute()
            except Exception as e:
                print(f"Supabase final result update failed: {e}")

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


from celery import shared_task
from django.core.cache import cache
from supabase import create_client, Client
import subprocess, tempfile, datetime, os, time


SUPABASE_URL = "https://ijbpavatphiwloeasmsx.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqYnBhdmF0cGhpd2xvZWFzbXN4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODY4NTYxNywiZXhwIjoyMDY0MjYxNjE3fQ._yrVUMO-rG1DplltTO3eOPLGjr_T2k_f8m1ADa7ws1I"  # NOT the anon key
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

from supabase import create_client

import os
import json
import time
import uuid
import tempfile
import datetime
import subprocess
from django.core.cache import cache


def run_after_delay(binary_data, scheduled_time, job_id, line, user_id, fileName):
    kolkata_tz = pytz.timezone("Asia/Kolkata")
    now = datetime.datetime.now(kolkata_tz)  # Make current time timezone-aware

    wait_seconds = (scheduled_time - now).total_seconds()
    if wait_seconds > 0:
        print(f"Sleeping for {wait_seconds:.2f} seconds until scheduled time...")
        time.sleep(wait_seconds)

    epsilon_list = [b for b in binary_data if b in '01']
    n = str(len(epsilon_list))
    print(f"Running test now at: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    print("job id",job_id)
    print("time", user_id)
    test_p_values = {}
    passed_count = 0
    progress_percentage = 2
    cache.set(f"{job_id}_progress", progress_percentage)

    def run_test_exe(exe_path, test_name):
        tmp_filename = None
        try:
            if not os.path.isfile(exe_path):
                print(f"Executable for {test_name} not found at {exe_path}")
                return -1
            if not os.access(exe_path, os.X_OK):
                print(f"Executable for {test_name} is not executable.")
                return -1

            with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
                tmp.write(' '.join(epsilon_list))
                tmp_filename = tmp.name

            cmd = [exe_path, n, tmp_filename]
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)

            if result.returncode != 0:
                print(f"Error in {test_name}: {result.stderr}")
                return -1

            output = result.stdout.strip()
            print(f"{test_name} output:", output)
            p_value = float(output)
            return p_value if 0 <= p_value <= 1 else -1

        except Exception as e:
            print(f"Exception in {test_name}:", e)
            return -1
        finally:
            if tmp_filename and os.path.exists(tmp_filename):
                os.remove(tmp_filename)

    def safe_test_call(exe_path, test_name):
        p_value = run_test_exe(exe_path, test_name)
        return 0 if p_value in [-1, None] else p_value

    tests_executables = {
                'Frequency Test': ('fre', settings.TESTS_DIR / "tests" / "freqTest_exec"),
                'Frequency Block Test': ('freBlock', settings.TESTS_DIR / "tests" / "block_freq_exec"),
                'Runs Test': ('runs', settings.TESTS_DIR / "tests" / "runs"),
                'Longest One Block Test': ('oneBlock', settings.TESTS_DIR / "tests" / "longest_run_exec"),
                'Approximate Entropy Test': ('appEntropy', settings.TESTS_DIR / "tests" / "approximate_entropy"),
                'Linear Complexity Test': ('linComp', settings.TESTS_DIR / "tests" / "linear_comp_exec"),
                'Non Overlapping Test': ('nonOver', settings.TESTS_DIR / "tests" / "template_non_overlapping"),
                'Overlapping Test': ('over', settings.TESTS_DIR / "tests" / "template_exec"),
                'Universal Test': ('univ', settings.TESTS_DIR / "tests" / "universal_exec"),
                'Serial Test': ('serial', settings.TESTS_DIR / "tests" / "serial_exec"),
                'Cusum Test': ('cusum', settings.TESTS_DIR / "tests" / "cusum_exec"),
                'Random Excursion Test': ('re', settings.TESTS_DIR / "tests" / "random_exec"),
                'Random Excursion Variant Test': ('rev', settings.TESTS_DIR / "tests" / "random_var_exec"),
                'Binary Matrix Rank Test': ('rank', settings.TESTS_DIR / "tests" / "matrix_exec"),
                'DFT Test': ('dft', settings.TESTS_DIR / "tests" / "dft_exec"),
            }

    progress_percentage=0
    for i, (display_name, (label, exe_path)) in enumerate(tests_executables.items(), start=1):
        p_value = safe_test_call(exe_path, display_name)
        test_p_values[display_name] = p_value
        if p_value > 0.01:
            passed_count += 1

        # Update progress
        progress_percentage += 1
        cache.set(f"{job_id}_progress", progress_percentage)

        # Update Supabase
        try:
            current_time = datetime.datetime.now().isoformat()
            supabase.table("results").upsert({
                "user_id": int(user_id),
                "line": int(line),
                "binary_data": " ",
                "scheduled_time": scheduled_time.isoformat(),
                "upload_time": current_time,
                "result": "null",
                "progress": progress_percentage,
                "file_name": fileName,
                "updated_at": current_time
            }, ignore_duplicates=False).execute()
        except Exception as e:
            print(f"Supabase update failed: {e}")
    
    final_result = "random number" if passed_count > 8 else "non-random number"
    print("Final result based on tests:", final_result)

    job_results = {
        "job_id": job_id,
        "tests": [
            {"name": test_name, "p_value": float(p_val)}
            for test_name, p_val in test_p_values.items()
        ],
        "final_result": final_result,
        "executed_at": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }

    # ✅ Store in cache so create_graph can fetch it later
    cache.set(f"{job_id}_results", job_results, timeout=3600)
    # Upload result to Supabase
    try:
        current_time = datetime.datetime.now().isoformat()
        response = supabase.table("results").upsert(
            {
                "user_id": int(user_id),
                "line": int(line),
                "binary_data": " ",
                "scheduled_time": scheduled_time.isoformat(),
                "upload_time": current_time,
                "result": final_result,
                "progress": 100,
                "file_name": fileName,
                "updated_at": current_time
            },
            ignore_duplicates=False
        ).execute()
        print("Supabase upsert response:", response)

    except Exception as e:
        print("Failed to update Supabase:", e)

    return {
        "message": f"Test executed at {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        "job_id": job_id,
        "final_result": final_result
    }

@csrf_exempt
def get_progress(request, job_id):
    progress = cache.get(f"{job_id}_progress", 0)
    return JsonResponse({"progress": int(progress)})

import os
import gc
import json
import uuid
import pytz
import tempfile
import datetime
import subprocess
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from multiprocessing import Process, Queue

# Assuming TESTS_DIR / "tests" and supabase are defined globally
import os
import gc
import json
import uuid
import pytz
import tempfile
import datetime
import subprocess
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from multiprocessing import Process, Queue

import os
import subprocess
from django.conf import settings
from django.http import JsonResponse
STS_PATH = os.path.join(settings.TESTS_DIR, "sts-2.1.2")

TEST_FOLDERS = {
    "ApproximateEntropy": "results.txt",
    "BlockFrequency": "results.txt",
    "CumulativeSums": "results.txt",
    "FFT": "results.txt",
    "Frequency": "results.txt",  # this one is different in your screenshot
    "LinearComplexity": "results.txt",
    "LongestRun": "results.txt",
    "NonOverlappingTemplate": "results.txt",
    "OverlappingTemplate": "results.txt",
    "RandomExcursions": "results.txt",
    "RandomExcursionsVariant": "results.txt",
    "Rank": "results.txt",
    "Runs": "results.txt",
    "Serial": "results.txt",
    "Universal": "results.txt"
}

@csrf_exempt
def run_nist_tests(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

    try:
        # --- Accept uploaded file + metadata ---
        uploaded_file = request.FILES.get("file")
        scheduled_time_str = request.POST.get("scheduled_time", "")
        job_id = request.POST.get("job_id", str(uuid.uuid4()))
        line_number = request.POST.get("line", "")
        userId = request.POST.get("user_id", "")
        fileName = request.POST.get("file_name", uploaded_file.name if uploaded_file else "")

        if not uploaded_file:
            return JsonResponse({"error": "No file uploaded"}, status=400)

        if not scheduled_time_str:
            return JsonResponse({"error": "scheduled_time is required"}, status=400)

        # Save progress to cache
        cache.set(f"{job_id}_progress", 1)

        # Parse scheduled time
        naive_scheduled_time = datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S")
        kolkata_tz = pytz.timezone("Asia/Kolkata")
        scheduled_time = kolkata_tz.localize(naive_scheduled_time)

        # Get current aware datetime
        current_time = datetime.datetime.now(kolkata_tz)
        time_difference = (scheduled_time - current_time).total_seconds()
        print(f"[{job_id}] Time difference before run:", time_difference)

        # Save uploaded .bin file to STS_PATH
        temp_file_path = os.path.join(STS_PATH, f"{job_id}_{uploaded_file.name}")
        with open(temp_file_path, "wb+") as f:
            for chunk in uploaded_file.chunks():
                f.write(chunk)

        # Count bits
        num_bits = os.path.getsize(temp_file_path) * 8

        # Helper to update progress
        def update_progress(step: int):
                try:
                    progress_percentage = round((step / 18) * 100)
                    supabase.table("results").update({
                        "progress": progress_percentage,
                    }).eq("user_id", int(userId)).eq("line", line_number).execute()
                except Exception as e:
                    print(f"Supabase progress update failed at step {step}: {e}")


        update_progress(1)
        if time_difference > 0:
            # Scheduled in future → defer execution
            return JsonResponse(run_after_delay_nist22b(job_id, scheduled_time, temp_file_path, line_number, userId, fileName))

        update_progress(2)

        # Prepare input for NIST assess
        automated_input = f"0\n{temp_file_path}\n1\n0\n1\n1\n".encode()

        # Run NIST test suite
        process = subprocess.Popen(
            ["./assess", str(num_bits)],
            cwd=STS_PATH,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        stdout, stderr = process.communicate(input=automated_input)
        print(f"[{job_id}] assess output:", stdout.decode(), stderr.decode())

        # Path to experiment results
        experiment_path = os.path.join(STS_PATH, "experiments", "AlgorithmTesting")
        if not os.path.exists(experiment_path):
            return JsonResponse({"status": "error", "message": f"{experiment_path} not found"})

        # Process results
        test_results = {}
        random_count = 0
        non_random_count = 0
        step = 3

        for test_name, result_file in TEST_FOLDERS.items():
            test_folder = os.path.join(experiment_path, test_name)
            results_file = os.path.join(test_folder, result_file)

            if not os.path.isfile(results_file):
                test_results[test_name] = {"p_value": 0, "result": "no data"}
                continue

            p_values = []
            with open(results_file, "r") as f:
                for line in f:
                    try:
                        p = float(line.strip())
                        p_values.append(p)
                    except:
                        continue

            if not p_values:
                test_result = "no data"
                rep_p_value = None
            else:
                rep_p_value = min(p_values)
                test_result = "random number" if rep_p_value > 0.05 else "non-random number"

            test_results[test_name] = {"p_value": rep_p_value, "result": test_result}

            if test_result == "random number":
                random_count += 1
            elif test_result == "non-random number":
                non_random_count += 1

            update_progress(step)
            step += 1
            gc.collect()

        # Final verdict
        final_verdict = "random number" if random_count >= non_random_count else "non-random number"
        executed_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # ✅ Store results in cache
        job_results = {
            "job_id": job_id,
            "file_name": fileName,
            "tests": test_results,
            "final_result": final_verdict,
            "executed_at": executed_at,
        }
        cache.set(f"{line_number}_results", job_results, timeout=3600)
        update_progress(18)

        try:
            current_time = datetime.datetime.now().isoformat()
            supabase.table("results").upsert(
                {
                    "user_id": int(userId),
                    "line": int(line_number),
                    "binary_data": " ",  # skip large data
                    "scheduled_time": scheduled_time.isoformat(),
                    "upload_time": current_time,
                    "result": final_verdict,
                    "progress": 100,
                    "file_name": fileName,
                    "updated_at": current_time
                },
                ignore_duplicates=False
            ).execute()
        except Exception as e:
            print("Failed to update Supabase:", e)
        
        # Cleanup uploaded file
        try:
            os.remove(temp_file_path)
        except:
            pass

        return JsonResponse(job_results)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def run_after_delay_nist22b(job_id, scheduled_time, file_path, line, user_id, fileName):
    kolkata_tz = pytz.timezone("Asia/Kolkata")
    now = datetime.datetime.now(kolkata_tz)

    # Wait until scheduled time
    wait_seconds = (scheduled_time - now).total_seconds()
    if wait_seconds > 0:
        print(f"Sleeping for {wait_seconds:.2f} seconds until scheduled time...")
        time.sleep(wait_seconds)

    # Save initial progress
    cache.set(f"{job_id}_progress", 1)

    # Count bits
    num_bits = os.path.getsize(file_path) * 8

    # Helper to update progress
    def update_progress(step: int):
        try:
            progress_percentage = round((step / 18) * 100)
            supabase.table("results").update({
                "progress": progress_percentage,
            }).eq("user_id", int(user_id)).eq("line", int(line)).execute()
        except Exception as e:
            print(f"Supabase progress update failed at step {step}: {e}")

    update_progress(1)

    # Run assess
    automated_input = f"0\n{file_path}\n1\n0\n1\n1\n".encode()
    process = subprocess.Popen(
        ["./assess", str(num_bits)],
        cwd=STS_PATH,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    stdout, stderr = process.communicate(input=automated_input)
    print(f"[{job_id}] assess output:", stdout.decode(), stderr.decode())

    # Path to experiment results
    experiment_path = os.path.join(STS_PATH, "experiments", "AlgorithmTesting")
    if not os.path.exists(experiment_path):
        return {"status": "error", "message": f"{experiment_path} not found"}

    # Process results
    test_results = {}
    random_count = 0
    non_random_count = 0
    step = 3

    for test_name, result_file in TEST_FOLDERS.items():
        test_folder = os.path.join(experiment_path, test_name)
        results_file = os.path.join(test_folder, result_file)

        if not os.path.isfile(results_file):
            test_results[test_name] = {"p_value": 0, "result": "no data"}
            continue

        p_values = []
        with open(results_file, "r") as f:
            for line_content in f:  # <-- renamed variable to avoid overwriting 'line'
                try:
                    p = float(line_content.strip())
                    p_values.append(p)
                except:
                    continue

        if not p_values:
            test_result = "no data"
            rep_p_value = None
        else:
            rep_p_value = min(p_values)
            test_result = "random number" if rep_p_value > 0.05 else "non-random number"

        test_results[test_name] = {"p_value": rep_p_value, "result": test_result}

        if test_result == "random number":
            random_count += 1
        elif test_result == "non-random number":
            non_random_count += 1

        update_progress(step)
        step += 1

    # Final verdict
    final_verdict = "random number" if random_count >= non_random_count else "non-random number"
    executed_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Store results in cache
    job_results = {
        "job_id": job_id,
        "file_name": fileName,
        "tests": test_results,
        "final_result": final_verdict,
        "executed_at": executed_at,
    }
    cache.set(f"{line}_results", job_results, timeout=3600)
    update_progress(18)

    # Upload to Supabase
    try:
        current_time = datetime.datetime.now().isoformat()
        supabase.table("results").upsert(
            {
                "user_id": int(user_id),
                "line": int(line),
                "binary_data": " ",  # skip large data
                "scheduled_time": scheduled_time.isoformat(),
                "upload_time": current_time,
                "result": final_verdict,
                "progress": 100,
                "file_name": fileName,
                "updated_at": current_time
            },
            ignore_duplicates=False
        ).execute()
    except Exception as e:
        print("Failed to update Supabase:", e)

    return {
        "message": f"Test executed at {executed_at}",
        "job_id": job_id,
        "final_result": final_verdict
    }



TEST_FOLDERS_STATS = {
    "ApproximateEntropy": "stats.txt",
    "BlockFrequency": "stats.txt",
    "CumulativeSums": "stats.txt",
    "FFT": "stats.txt",
    "Frequency": "stats.txt",
    "LinearComplexity": "stats.txt",
    "LongestRun": "stats.txt",
    "NonOverlappingTemplate": "stats.txt",
    "OverlappingTemplate": "stats.txt",
    "RandomExcursions": "stats.txt",
    "RandomExcursionsVariant": "stats.txt",
    "Rank": "stats.txt",
    "Runs": "stats.txt",
    "Serial": "stats.txt",
    "Universal": "stats.txt"
}

from django.http import HttpResponse

@csrf_exempt
def aggregate_stats(request):
    """
    Reads all stats.txt files from the test folders and concatenates their content.
    Returns the combined content as a downloadable .txt file.
    """
    experiment_path = os.path.join(STS_PATH, "experiments", "AlgorithmTesting")

    if not os.path.exists(experiment_path):
        return JsonResponse({"status": "error", "message": f"{experiment_path} not found"})

    combined_stats = []

    for test_name, stats_file in TEST_FOLDERS_STATS.items():
        test_folder = os.path.join(experiment_path, test_name)
        stats_path = os.path.join(test_folder, stats_file)

        if not os.path.isfile(stats_path):
            continue  # skip missing files

        with open(stats_path, "r") as f:
            content = f.read().strip()
            if content:
                combined_stats.append(f"--- {test_name} ---\n{content}")

    final_content = "\n\n".join(combined_stats)

    # ✅ Return as downloadable text file
    response = HttpResponse(final_content, content_type="text/plain")
    response["Content-Disposition"] = 'attachment; filename="nist_stats_output.txt"'
    return response


import tempfile
import os
import tempfile
import os

@csrf_exempt
def generate_final_ans_nist90b(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            binary_data = data.get('binary_data', '')
            scheduled_time_str = data.get('scheduled_time', '')
            job_id = data.get('job_id', str(uuid.uuid4()))
            line = data.get('line', '')
            userId = data.get('user_id', '')
            fileName = data.get('file_name', '')

            # Validate binary data
            if not binary_data:
                return JsonResponse({"error": "binary_data is missing or empty"}, status=400)

            if not scheduled_time_str:
                return JsonResponse({"error": "scheduled_time is required"}, status=400)

            try:
                scheduled_time = datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S")
            except ValueError:
                return JsonResponse({"error": "Invalid scheduled_time format. Use 'YYYY-MM-DD HH:MM:SS'."}, status=400)

            naive_scheduled_time = datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S")
            kolkata_tz = pytz.timezone("Asia/Kolkata")
            scheduled_time = kolkata_tz.localize(naive_scheduled_time)

            current_time = datetime.datetime.now(kolkata_tz)
            time_difference = (scheduled_time - current_time).total_seconds()
            print("Time difference:", time_difference)

            passed_test_count = 0
            test_results = {}
            progress_counter = 3

            def update_progress(step: int):
                try:
                    progress_percentage = round((step / 18) * 100)
                    supabase.table("results2").update({
                        "progress": progress_percentage,
                    }).eq("user_id", int(userId)).eq("line", int(line)).execute()
                except Exception as e:
                    print(f"Supabase progress update failed at step {step}: {e}")

            if time_difference > 0:
                return JsonResponse(run_after_delay_90b(job_id, scheduled_time, binary_data, line, userId, fileName))

            update_progress(1)

            epsilon_list = [b for b in binary_data if b in '01']  # keep only bits
            n = len(epsilon_list)

            def run_test_exe(exe_path, test_name):
                tmp_filename = None
                try:
                    if not os.path.isfile(exe_path) or not os.access(exe_path, os.X_OK):
                        print(f"Executable issue for {test_name}")
                        return None, "non-random number"

                    with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
                        tmp.write(''.join(epsilon_list))
                        tmp_filename = tmp.name

                    cmd = [exe_path, tmp_filename]
                    result = subprocess.run(cmd, capture_output=True, text=True, shell=False)
                    os.remove(tmp_filename)

                    if result.returncode not in [0, 1]:
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

            update_progress(2)

            tests_executables = {
                'Collision Test': ('col', os.path.join(settings.TESTS_DIR / "tests", "collisionTest_exec")),
                'Markov Test': ('markov', os.path.join(settings.TESTS_DIR / "tests", "markovTest_exec")),
                'Compression Test': ('compression', os.path.join(settings.TESTS_DIR / "tests", "compressionTest_exec")),
                'LZ78Y Test': ('l278y', os.path.join(settings.TESTS_DIR / "tests", "l278yTest_exec1")),
                'Lag Test': ('lag', os.path.join(settings.TESTS_DIR / "tests", "lagTest_exec")),
                'MCW Test': ('mcw', os.path.join(settings.TESTS_DIR / "tests", "multiMcwTest_exec")),
                'MMC Test': ('mmc', os.path.join(settings.TESTS_DIR / "tests", "multiMmcTest_exec")),
                'Chi-Square Test': ('chi', os.path.join(settings.TESTS_DIR / "tests", "chiSquareTest_exec")),
                'Permutation Test': ('perm', os.path.join(settings.TESTS_DIR / "tests", "permutationTest_exec")),
                'Longest-Substring Test': ('lrs', os.path.join(settings.TESTS_DIR / "tests", "lrsTest_exec")),
            }

            for test_name, (label, exe_path) in tests_executables.items():
                min_entropy, result_text = safe_test_call(exe_path, test_name)
                test_results[test_name] = {
                    "min_entropy": min_entropy,
                    "result": result_text
                }
                if result_text == "random number":
                    passed_test_count += 1

                progress_counter += 1
                update_progress(progress_counter)

            update_progress(14)

            final_text = 'random number' if passed_test_count > 5 else 'non-random number'
            executed_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            # ✅ Store results in cache (same as first function)
            job_results = {
                "job_id": job_id,
                "tests": [
                    {"name": test_name, "min_entropy": res["min_entropy"], "result": res["result"]}
                    for test_name, res in test_results.items()
                ],
                "final_result": final_text,
                "executed_at": executed_at,
            }
            cache.set(f"{job_id}_results90b", job_results, timeout=3600)

            response_data = {
                "final_result": final_text,
                "executed_at": executed_at,
            }

            update_progress(15)
            try:
                supabase.table("results2").update({
                    "progress": 100,
                    "result": final_text
                }).eq("user_id", int(userId)).eq("line", int(line)).execute()
            except Exception as e:
                print(f"Supabase final result update failed: {e}")

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

def run_after_delay_90b(job_id, scheduled_time, binary_data, line, user_id, fileName):
    kolkata_tz = pytz.timezone("Asia/Kolkata")
    now = datetime.datetime.now(kolkata_tz)

    wait_seconds = (scheduled_time - now).total_seconds()
    if wait_seconds > 0:
        print(f"Sleeping for {wait_seconds:.2f} seconds until scheduled time...")
        time.sleep(wait_seconds)

    cache.set(f"{job_id}_progress90b", 1)

    epsilon_list = [b for b in binary_data if b in '01']
    n = len(epsilon_list)
    print(f"Running test now at: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}, Data length: {len(epsilon_list)}")

    passed_test_count = 0
    test_results = {}
    progress_counter = 3

    def run_test_exe(exe_path, test_name):
        tmp_filename = None
        try:
            if not os.path.isfile(exe_path):
                print(f"Executable for {test_name} not found at {exe_path}")
                return -1, "non-random number"
            if not os.access(exe_path, os.X_OK):
                print(f"Executable for {test_name} is not executable.")
                return -1, "non-random number"

            with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
                tmp.write(''.join(epsilon_list))
                tmp_filename = tmp.name

            cmd = [exe_path, tmp_filename]
            result = subprocess.run(cmd, capture_output=True, text=True, shell=False)
            os.remove(tmp_filename)

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

    tests_executables = {
        'Collision Test': ('col', os.path.join(settings.TESTS_DIR / "tests", "collisionTest_exec")),
        'Markov Test': ('markov', os.path.join(settings.TESTS_DIR / "tests", "markovTest_exec")),
        'Compression Test': ('compression', os.path.join(settings.TESTS_DIR / "tests", "compressionTest_exec")),
        'LZ78Y Test': ('l278y', os.path.join(settings.TESTS_DIR / "tests", "l278yTest_exec1")),
        'Lag Test': ('lag', os.path.join(settings.TESTS_DIR / "tests", "lagTest_exec")),
        'MCW Test': ('mcw', os.path.join(settings.TESTS_DIR / "tests", "multiMcwTest_exec")),
        'MMC Test': ('mmc', os.path.join(settings.TESTS_DIR / "tests", "multiMmcTest_exec")),
        'Chi-Square Test': ('chi', os.path.join(settings.TESTS_DIR / "tests", "chiSquareTest_exec")),
        'Permutation Test': ('perm', os.path.join(settings.TESTS_DIR / "tests", "permutationTest_exec")),
        'Longest-Substring Test': ('lrs', os.path.join(settings.TESTS_DIR / "tests", "lrsTest_exec1")),
    }

    for test_name, (label, exe_path) in tests_executables.items():
        min_entropy, result_text = safe_test_call(exe_path, test_name)

        test_results[test_name] = {
            "min_entropy": min_entropy,
            "result": result_text
        }

        if result_text == "random number":
            passed_test_count += 1

        progress_counter += 1
        cache.set(f"{job_id}_progress90b", progress_counter)

        try:
            current_time = datetime.datetime.now().isoformat()
            supabase.table("results").upsert({
                "user_id": int(user_id),
                "line": int(line),
                "binary_data": " ",
                "scheduled_time": scheduled_time.isoformat(),
                "upload_time": current_time,
                "result": "null",
                "progress": progress_counter,
                "file_name": fileName,
                "updated_at": current_time
            }, ignore_duplicates=False).execute()
        except Exception as e:
            print(f"Supabase update failed: {e}")

    cache.set(f"{job_id}_progress90b", 14)
    final_result = "random number" if passed_test_count > 5 else "non-random number"
    executed_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # ✅ Store results in cache (same as generate_final_ans_nist90b)
    job_results = {
        "job_id": job_id,
        "tests": [
            {"name": test_name, "min_entropy": res["min_entropy"], "result": res["result"]}
            for test_name, res in test_results.items()
        ],
        "final_result": final_result,
        "executed_at": executed_at,
    }
    cache.set(f"{job_id}_results90b", job_results, timeout=3600)

    try:
        current_time = datetime.datetime.now().isoformat()
        supabase.table("results2").upsert(
            {
                "user_id": int(user_id),
                "line": int(line),
                "binary_data": binary_data,
                "scheduled_time": scheduled_time.isoformat(),
                "upload_time": current_time,
                "result": final_result,
                "progress": 100,
                "file_name": fileName,
                "updated_at": current_time
            },
            ignore_duplicates=False
        ).execute()
    except Exception as e:
        print("Failed to update Supabase:", e)

    cache.set(f"{job_id}_progress90b", 15)

    return {
        "message": f"Test executed at {executed_at}",
        "job_id": job_id,
        "final_result": final_result
    }


@csrf_exempt
def get_progress90b(request, job_id):
    progress = cache.get(f"{job_id}_progress90b", 0)
    return JsonResponse({"progress": int(progress)})


import os
import tempfile
import subprocess
import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import tempfile
import subprocess
import datetime
import re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

# Adjust this path to where your compiled cpp executables are
CPP_FOLDER = os.path.join(settings.TESTS_DIR, "cpp")

# Thresholds for min-entropy per SP800-90B guidance
MIN_ENTROPY_THRESHOLDS = {
    "IID Test": 7.5,         # example threshold per byte
    "Non-IID Test": 7.5,
   
}

@csrf_exempt
def run_nist90b_on_bin(request):
    """
    Accepts a .bin file via POST and runs all official NIST SP800-90B tests.
    Tracks progress, prints test outputs, and stores results in cache.
    Uses the correct min-entropy calculation and verdict logic.
    """
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

    # Read form fields
    file = request.FILES.get('file')
    scheduled_time_str = request.POST.get('scheduled_time', '')
    job_id = request.POST.get('job_id', str(uuid.uuid4()))
    line_number = request.POST.get('line', '')
    userId = request.POST.get('user_id', '')
    fileName = request.POST.get('file_name', '')
 
    if not file:
        return JsonResponse({"error": "No file uploaded. Send a '.bin' file."}, status=400)

    if not scheduled_time_str:
        return JsonResponse({"error": "scheduled_time is required"}, status=400)

    try:
        naive_scheduled_time = datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S")
        kolkata_tz = pytz.timezone("Asia/Kolkata")
        scheduled_time = kolkata_tz.localize(naive_scheduled_time)
    except ValueError:
        return JsonResponse({"error": "Invalid scheduled_time format. Use 'YYYY-MM-DD HH:MM:SS'."}, status=400)

    current_time = datetime.datetime.now(kolkata_tz)
    time_difference = (scheduled_time - current_time).total_seconds()
    print("time dif", time_difference)

    def update_progress(step: int):
        try:
            progress_percentage = round((step / 8) * 100)  # total 8 steps
            supabase.table("results2").update({
                "progress": progress_percentage,
            }).eq("user_id", int(userId)).eq("line", int(line_number)).execute()
        except Exception as e:
            print(f"Supabase progress update failed at step {step}: {e}")

    # If scheduled in the future, defer execution
    if time_difference > 0:

        result = run_after_delay_90b(job_id, scheduled_time, file, line_number, userId, fileName)
        return JsonResponse(result)

    update_progress(1)

    # Save uploaded .bin file to temporary location
    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        for chunk in file.chunks():
            tmp_file.write(chunk)
        tmp_file_path = tmp_file.name

    file_size_bytes = os.path.getsize(tmp_file_path)
    file_size_bits = file_size_bytes * 8
    MAX_BITS = 1_000_000
    n_samples = min(file_size_bits, MAX_BITS)

    update_progress(2)
   
    # Define tests
    tests_executables = {
        "IID Test": {
            "exe": os.path.join(CPP_FOLDER, "ea_iid"),
            "args": ["-v", tmp_file_path]
        },
        "Non-IID Test": {
            "exe": os.path.join(CPP_FOLDER, "ea_non_iid"),
            "args": ["-v", tmp_file_path]
        },
    }

    results = {}
    passed_count = 0
    step_counter = 3
   
    combined_output = ""
    # ✅ Updated single test logic from simpler function
    for test_name, test_info in tests_executables.items():
        exe_path = test_info["exe"]
        args = test_info["args"]

        if not os.path.isfile(exe_path) or not os.access(exe_path, os.X_OK):
            results[test_name] = {"min_entropy": 0.0, "result": "executable missing"}
            step_counter += 1
            update_progress(step_counter)
            continue

        try:
            result = subprocess.run([exe_path] + args, capture_output=True, text=True, shell=False)
            output = result.stdout.strip()
            error_output = result.stderr.strip()

            print(f"=== {test_name} Output ===")
            print(output)
            if error_output:
                print(f"=== {test_name} Error ===")
                print(error_output)

            combined_output += f"=== {test_name} Output ===\n{output}\n\n"

            # Extract min_entropy from stdout (correct logic)
            min_entropy = 0.0
            for line in output.splitlines():
                if any(keyword in line.lower() for keyword in ["h_original", "min(", "h_bitstring"]):
                    numbers = re.findall(r"[-+]?\d*\.\d+|\d+", line)
                    if numbers:
                        min_entropy = float(numbers[0])
                        break

            # Determine verdict based on min-entropy threshold
            threshold = MIN_ENTROPY_THRESHOLDS.get(test_name, 7.5)
            verdict = "random number" if min_entropy >= threshold else "non-random number"

            if verdict == "random number":
                passed_count += 1

        except Exception as e:
            print(f"Error running {test_name}: {e}")
            min_entropy = 0.0
            verdict = "non-random number"

        results[test_name] = {"min_entropy": min_entropy, "result": verdict}
        step_counter += 1
        update_progress(step_counter)

        cache.set(f"{line_number}_download90b", combined_output, timeout=3600)
    # Clean up temporary files
    try:
        os.remove(tmp_file_path)
        if os.path.exists(tmp_file_path + ".json"):
            os.remove(tmp_file_path + ".json")
        if os.path.exists(tmp_file_path + ".column"):
            os.remove(tmp_file_path + ".column")
    except:
        pass
    update_progress(6)

    # Final verdict
    final_text = "random number" if passed_count >= (len(tests_executables) // 2 + 1) else "non-random number"
    executed_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
   
    update_progress(7)

    # ✅ Store results in cache
    job_results = {
        "job_id": job_id,
        "tests": results,
        "final_result": final_text,
        "executed_at": executed_at,
    }
    cache.set(f"{line_number}_results90b", job_results, timeout=3600)

   
    update_progress(8)
        # ✅ Upload final results to Supabase
    try:
        current_time = datetime.datetime.now().isoformat()
        supabase.table("results2").upsert(
            {
                "user_id": int(userId),
                "line": int(line_number),
                "binary_data": " ",  # skip actual binary content
                "scheduled_time": scheduled_time.isoformat(),
                "upload_time": current_time,
                "result": final_text,
                "progress": 100,
                "file_name": fileName,
                "updated_at": current_time
            },
            ignore_duplicates=False
        ).execute()
    except Exception as e:
        print("Failed to update Supabase:", e)


    return JsonResponse({
        "final_result": final_text,
        "executed_at": executed_at,
        "tests": [{"name": name, "min_entropy": res["min_entropy"], "result": res["result"]}
                  for name, res in results.items()]
    })


def run_after_delay_90b(job_id, scheduled_time, file, line, user_id, fileName):
    kolkata_tz = pytz.timezone("Asia/Kolkata")
    now = datetime.datetime.now(kolkata_tz)

    wait_seconds = (scheduled_time - now).total_seconds()
    if wait_seconds > 0:
        print(f"Sleeping for {wait_seconds:.2f} seconds until scheduled time...")
        time.sleep(wait_seconds)

    cache.set(f"{job_id}_progress90b", 1)

    # ✅ Save uploaded file to temp .bin file
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        for chunk in file.chunks():   # file is Django InMemoryUploadedFile
            tmp.write(chunk)
        tmp_filename = tmp.name

    file_size_bytes = os.path.getsize(tmp_filename)
    file_size_bits = file_size_bytes * 8
    MAX_BITS = 1_000_000
    n_samples = min(file_size_bits, MAX_BITS)

    cache.set(f"{job_id}_progress90b", 2)

    # ✅ Define NIST 90B executables
    tests_executables = {
        "IID Test": {
            "exe": os.path.join(CPP_FOLDER, "ea_iid"),
            "args": ["-v", tmp_filename]
        },
        "Non-IID Test": {
            "exe": os.path.join(CPP_FOLDER, "ea_non_iid"),
            "args": ["-v", tmp_filename]
        },
    }

    results = {}
    passed_count = 0
    step_counter = 3
    combined_output = ""

    for test_name, test_info in tests_executables.items():
        exe_path = test_info["exe"]
        args = test_info["args"]

        if not os.path.isfile(exe_path) or not os.access(exe_path, os.X_OK):
            results[test_name] = {"min_entropy": 0.0, "result": "executable missing"}
            step_counter += 1
            cache.set(f"{job_id}_progress90b", step_counter)
            continue

        try:
            result = subprocess.run([exe_path] + args, capture_output=True, text=True, shell=False)
            output = result.stdout.strip()
            error_output = result.stderr.strip()

            print(f"=== {test_name} Output ===")
            print(output)
            if error_output:
                print(f"=== {test_name} Error ===")
                print(error_output)

            combined_output += f"=== {test_name} Output ===\n{output}\n\n"

            # Extract min_entropy
            min_entropy = 0.0
            for line_text in output.splitlines():
                if any(keyword in line_text.lower() for keyword in ["h_original", "min(", "h_bitstring"]):
                    numbers = re.findall(r"[-+]?\d*\.\d+|\d+", line_text)
                    if numbers:
                        min_entropy = float(numbers[0])
                        break

            threshold = MIN_ENTROPY_THRESHOLDS.get(test_name, 7.5)
            verdict = "random number" if min_entropy >= threshold else "non-random number"

            if verdict == "random number":
                passed_count += 1

        except Exception as e:
            print(f"Error running {test_name}: {e}")
            min_entropy = 0.0
            verdict = "non-random number"

        results[test_name] = {"min_entropy": min_entropy, "result": verdict}
        step_counter += 1
        cache.set(f"{job_id}_progress90b", step_counter)

        # store raw stdout in cache for download endpoint
        cache.set(f"{line}_download90b", combined_output, timeout=3600)

        # Supabase update
        try:
            current_time = datetime.datetime.now().isoformat()
            supabase.table("results").upsert({
                "user_id": int(user_id),
                "line": int(line),
                "binary_data": " ",  # we don’t need to store the file raw
                "scheduled_time": scheduled_time.isoformat(),
                "upload_time": current_time,
                "result": "null",
                "progress": step_counter,
                "file_name": fileName,
                "updated_at": current_time
            }, ignore_duplicates=False).execute()
        except Exception as e:
            print(f"Supabase update failed: {e}")

    # ✅ Clean up temp files
    try:
        os.remove(tmp_filename)
        if os.path.exists(tmp_filename + ".json"):
            os.remove(tmp_filename + ".json")
        if os.path.exists(tmp_filename + ".column"):
            os.remove(tmp_filename + ".column")
    except:
        pass

    cache.set(f"{job_id}_progress90b", 7)

    # Final verdict
    final_result = "random number" if passed_count >= (len(tests_executables) // 2 + 1) else "non-random number"
    executed_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # ✅ Store results in cache
    job_results = {
        "job_id": job_id,
        "tests": results,
        "final_result": final_result,
        "executed_at": executed_at,
    }
    cache.set(f"{line}_results90b", job_results, timeout=3600)

    # Save summary to Supabase results2
    try:
        current_time = datetime.datetime.now().isoformat()
        supabase.table("results2").upsert(
            {
                "user_id": int(user_id),
                "line": int(line),
                "binary_data": " ",   # don’t dump big file in DB
                "scheduled_time": scheduled_time.isoformat(),
                "upload_time": current_time,
                "result": final_result,
                "progress": 100,
                "file_name": fileName,
                "updated_at": current_time
            },
            ignore_duplicates=False
        ).execute()
    except Exception as e:
        print("Failed to update Supabase:", e)

    cache.set(f"{job_id}_progress90b", 8)

    return {
        "message": f"Test executed at {executed_at}",
        "job_id": job_id,
        "final_result": final_result
    }


@csrf_exempt
def download_nist90b_output(request):
    """
    Fetches the combined NIST SP800-90B output from cache for a given job_id and line_number.
    Returns the content as plain text.
    """
 
    line_number = request.GET.get("line", "1")  # default to 1 if not provided

   
    cache_key = f"{line_number}_download90b"
    output_text = cache.get(cache_key)

    if not output_text:
        return HttpResponse("No cached output found for this job_id and line_number", status=404)

    response = HttpResponse(output_text, content_type="text/plain")
    response['Content-Disposition'] = f'attachment; filename="{line_number}_nist90b_output.txt"'
    return response


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.cache import cache
import json
import uuid
import datetime
import time
import tempfile
import subprocess
import os
from django.utils import timezone

@csrf_exempt
def generate_final_ans_dieharder(request):
    if request.method == 'POST':
        file = request.FILES.get('file')
        scheduled_time_str = request.POST.get('scheduled_time', '')
        job_id = request.POST.get('job_id', str(uuid.uuid4()))
        line_number = request.POST.get('line', '')
        userId = request.POST.get('user_id', '')
        fileName = request.POST.get('file_name', '')

        if not file:
            return JsonResponse({"error": "No file uploaded"}, status=400)

        if not scheduled_time_str:
            return JsonResponse({"error": "scheduled_time is required"}, status=400)

        try:
            naive_scheduled_time = datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S")
            kolkata_tz = pytz.timezone("Asia/Kolkata")
            scheduled_time = kolkata_tz.localize(naive_scheduled_time)
        except ValueError:
            return JsonResponse({"error": "Invalid scheduled_time format. Use 'YYYY-MM-DD HH:MM:SS'."}, status=400)

        current_time = datetime.datetime.now(kolkata_tz)
        time_difference = (scheduled_time - current_time).total_seconds()
        print(f"Time difference for scheduling: {time_difference} seconds.")

        def update_progress(step: int):
            try:
                progress_percentage = round((step / 20) * 100)  # total ~20 steps
                supabase.table("results3").update({
                    "progress": progress_percentage,
                }).eq("user_id", int(userId)).eq("line", int(line_number)).execute()
            except Exception as e:
                print(f"Supabase progress update failed at step {step}: {e}")

        if time_difference > 0:
            return JsonResponse(run_after_delay_dieharder(job_id, scheduled_time, file, line_number, userId, fileName))

        update_progress(1)
        cache.set(f"{job_id}_progress_dieharder", 1)

        # Write file to temp
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in file.chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        dieharder_test_ids = [
            "2","1","4","5","6","7","8","9","10","11","12",
            "13","14","15","16","17"
        ]

        update_progress(2)
        cache.set(f"{job_id}_progress_dieharder", 2)

        results = []
        passed_count = 0
        m = 3

        for idx, test_id in enumerate(dieharder_test_ids, start=1):
            command = [
                str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
                "-d", test_id,
                "-g", "66",
                "-f", tmpfile_path
            ]

            try:
                process = subprocess.run(
                    command,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    universal_newlines=True,
                    timeout=300
                )
                output = process.stdout
                print(f"Output for test {test_id}:\n{output}")

                # Store raw output in cache (append mode)
                existing_output = cache.get(f"{job_id}_raw_output_dieharder", "")
                updated_output = existing_output + f"\n\n=== Output for test {test_id} ===\n{output}"
                cache.set(f"{job_id}_raw_output_dieharder", updated_output)

                p_value, assessment = None, None
                for line in output.splitlines():
                    line = line.strip()
                    if line.startswith("Kuiper KS: p"):
                        match = re.search(r"p\s*=\s*([^\s]+)", line)
                        if match:
                            val = match.group(1)
                            try:
                                p_value = float(val) if val.lower() != "nan" else 0.0
                            except ValueError:
                                p_value = 0.0
                    if line.startswith("Assessment:"):
                        assessment = line.replace("Assessment:", "").strip()

                results.append({
                    "test_id": test_id,
                    "p_value": p_value if p_value is not None else 0.0,
                    "assessment": assessment or "non-random number"
                })

                if assessment and "PASSED" in assessment.upper():
                    passed_count += 1

            except subprocess.TimeoutExpired:
                results.append({"test_id": test_id, "error": "Timeout"})
            except Exception as e:
                results.append({"test_id": test_id, "error": str(e)})
            finally:
                update_progress(m)
                cache.set(f"{job_id}_progress_dieharder", m)
                m += 1

        update_progress(19)
        cache.set(f"{job_id}_progress_dieharder", 19)

        final_text = "random number" if passed_count > len(dieharder_test_ids) / 2 else "non-random number"
        executed_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # ✅ Store results in cache
        job_results = {
            "job_id": job_id,
            "tests": results,
            "final_result": final_text,
            "executed_at": executed_at,
        }
        cache.set(f"{line_number}_results_dieharder", job_results, timeout=3600)

        response_data = {
            "final_result": final_text,
            "executed_at": executed_at,
        }

        update_progress(20)
        cache.set(f"{job_id}_progress_dieharder", 20)

                # ✅ Upload final results to Supabase
        try:
            current_time = datetime.datetime.now().isoformat()
            supabase.table("results3").upsert(
                {
                    "user_id": int(userId),
                    "line": int(line_number),
                    "binary_data": " ",  # placeholder, skip actual file content
                    "scheduled_time": scheduled_time.isoformat(),
                    "upload_time": current_time,
                    "result": final_text,
                    "progress": 100,
                    "file_name": fileName,
                    "updated_at": current_time
                },
                ignore_duplicates=False
            ).execute()
        except Exception as e:
            print("Failed to update Supabase:", e)


        if os.path.exists(tmpfile_path):
            os.remove(tmpfile_path)

        return JsonResponse(response_data)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


def run_after_delay_dieharder(job_id, scheduled_time, file, line_number, user_id, fileName):
    import datetime, tempfile, os, time, subprocess

    kolkata_tz = pytz.timezone("Asia/Kolkata")
    now = datetime.datetime.now(kolkata_tz)  # Make current time timezone-aware

    wait_seconds = (scheduled_time - now).total_seconds()
    def update_progress(step: int):
                try:
                    progress_percentage = round((step / 18) * 100)
                    current_time = datetime.datetime.now().isoformat()
                    supabase.table("results3").update({
                        "progress": progress_percentage,
                    }).eq("user_id", int(user_id)).eq("line", int(line_number)).execute()
                except Exception as e:
                    print(f"Supabase progress update failed at step {step}: {e}")
    
    if wait_seconds > 0:
        print(f"Sleeping for {wait_seconds:.2f} seconds until scheduled time...")
        time.sleep(wait_seconds)

    cache.set(f"{job_id}_progress_dieharder", 1)
    update_progress(1)
    # Save file to a temp location and read binary data
    with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
        for chunk in file.chunks():
            tmpfile.write(chunk)
        tmpfile_path = tmpfile.name
    cache.get(f"{job_id}_progress_dieharder", 2)
    update_progress(2)
    # Extract binary data as string
    with open(tmpfile_path, 'rb') as f:
        byte_data = f.read()
        binary_data_str = ''.join(format(byte, '08b') for byte in byte_data)

    print(f"Running Dieharder tests at {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')} on file: {tmpfile_path}")

    dieharder_test_ids = [
        "2"
        , "1", "4", "5", "6", "7", "8", "9", "10", "11", "12","13","14","15","16","17"
    ]

    results = []
    passed_count = 0
    progress_counter = 3
    cache.get(f"{job_id}_progress_dieharder", 3)
    update_progress(3)
    for test_id in dieharder_test_ids:
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", test_id,
            "-g", "66",
            "-f", tmpfile_path
        ]

        try:
            process = subprocess.run(
                command,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                universal_newlines=True,
                timeout=300
            )
            output = process.stdout
            print(f"Output for test {test_id}:\n{output}")

            p_value = None
            assessment = None

            for line in output.splitlines():
                    line = line.strip()

                    # Match p-value even with extra spaces or nan
                    if line.startswith("Kuiper KS: p"):
                        match = re.search(r"p\s*=\s*([^\s]+)", line)
                        if match:
                            val = match.group(1)
                            try:
                                p_value = float(val) if val.lower() != "nan" else 0.0
                            except ValueError:
                                p_value = 0.0

                # Match assessment text
            if line.startswith("Assessment:"):
                assessment = line.replace("Assessment:", "").strip()
            results.append({
                "test_id": test_id,
                "p_value": p_value,
                "assessment": assessment or "unknown"
            })

            if assessment and "PASSED" in assessment.upper():
                passed_count += 1

        except subprocess.TimeoutExpired:
            results.append({
                "test_id": test_id,
                "error": "Timeout"
            })
        except Exception as e:
            results.append({
                "test_id": test_id,
                "error": str(e)
            })

        # ✅ Update Supabase after each test run
        try:
            current_time = datetime.datetime.now().isoformat()
            supabase.table("results").upsert({
                "user_id": int(user_id),
                "line": int(line_number),
                "binary_data": " ",
                "scheduled_time": scheduled_time.isoformat(),
                "upload_time": current_time,
                "result": "null",
                "progress": progress_counter,
                "file_name": fileName,
                "updated_at": current_time
            }, ignore_duplicates=False).execute()
        except Exception as e:
            print(f"Supabase update failed: {e}")

        cache.set(f"{job_id}_progress_dieharder", progress_counter)
        update_progress(progress_counter)
        progress_counter += 1

    final_result = 'random number' if passed_count > len(dieharder_test_ids) / 2 else 'non-random number'
    print("Final result based on Dieharder tests:", final_result)


    job_results = {
        "job_id": job_id,
        "tests": results,
        "final_result": final_result,
        
    }
    cache.set(f"{line_number}_results_dieharder", job_results, timeout=3600)

    # ✅ Final Supabase upsert
    try:
        current_time = datetime.datetime.now().isoformat()
        supabase.table("results").upsert(
            {
                "user_id": int(user_id),
                "line": int(line_number),
                "binary_data": " ",
                "scheduled_time": scheduled_time.isoformat(),
                "upload_time": current_time,
                "result": final_result,
                "progress": 100,
                "file_name": fileName,
                "updated_at": current_time
            },
            ignore_duplicates=False
        ).execute()
        print("Final Supabase upsert successful.")
    except Exception as e:
        print("Final Supabase update failed:", e)

    if os.path.exists(tmpfile_path):
        os.remove(tmpfile_path)

    cache.set(f"{job_id}_progress_dieharder", 15)
    update_progress(15)
    return {
        "message": f"Dieharder tests executed at {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        "job_id": job_id,
        "final_result": final_result
    }


@csrf_exempt
def get_progress_dieharder(request, job_id):
    progress = cache.get(f"{job_id}_progress_dieharder", 0)
    return JsonResponse({"progress": int(progress)})

@csrf_exempt
def get_output_dieharder(request, job_id):
    output = cache.get(f"{job_id}_raw_output_dieharder", "")
    return JsonResponse({"output": output})


class DieharderMinDistTestView(APIView):
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        import tempfile
        import subprocess
        import os

        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
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


class DieharderOperm5TestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "2", #operm5 test
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


class DieharderBirthdayTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "1", #birthday test
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



class DieharderParkingLotTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "11", #parking lot test
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



class DieharderSqueezeTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "13", #birthday test
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


class DieharderCountOneTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "10", #birthday test
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


class DieharderCountOneStreamTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "9", #birthday test
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


class DieharderOQSOTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "7", 
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


class DieharderDnaTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "8", 
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


class DieharderOPSOTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "6", 
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


class DieharderBitstreamTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "5", 
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


class Dieharder6x8RankTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "4", 
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


class DieharderCrapsTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "17", 
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


class DieharderTsangTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "18", 
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

# largest time
class Dieharder32RankTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "3", 
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
                "output":output,
                "p_value": p_value,
                "assessment": assessment
            })

        except subprocess.TimeoutExpired:
            return Response({"error": "Dieharder test timed out."}, status=500)

        finally:
            if os.path.exists(tmpfile_path):
                os.remove(tmpfile_path)


class DieharderxTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-d", "18", 
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

                # Match p-value even with extra spaces or nan
                if line.startswith("Kuiper KS: p"):
                    match = re.search(r"p\s*=\s*([^\s]+)", line)
                    if match:
                        val = match.group(1)
                        try:
                            p_value = float(val) if val.lower() != "nan" else 0.0
                        except ValueError:
                            p_value = 0.0

            # Match assessment text
            if line.startswith("Assessment:"):
                assessment = line.replace("Assessment:", "").strip()

            return Response({
                # "output":output,
                "p_value": p_value,
                "assessment": assessment
            })

        except subprocess.TimeoutExpired:
            return Response({"error": "Dieharder test timed out."}, status=500)

        finally:
            if os.path.exists(tmpfile_path):
                os.remove(tmpfile_path)


# class DieharderxTestView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request, format=None):
#         # Save the uploaded file to a temp file
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
#             for chunk in request.FILES['file'].chunks():
#                 tmpfile.write(chunk)
#             tmpfile_path = tmpfile.name

#         # Build the dieharder command
#         command = [
#             str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
#             "-r", "1", 
#             "-g", "66",
#             "-f", tmpfile_path
#         ]

#         try:
#             # Run dieharder
#             process = subprocess.run(
#                 command,
#                 stdout=subprocess.PIPE,
#                 stderr=subprocess.PIPE,
#                 universal_newlines=True,
#                 timeout=300
#             )
#             output = process.stdout
#             error = process.stderr

#             # Initialize defaults
#             p_value = None
#             assessment = None

#             # Parse p-value and assessment
#             for line in output.splitlines():
#                 line = line.strip()
#                 if line.startswith("Kuiper KS: p ="):
#                     try:
#                         p_value = float(line.split("=")[1].strip())
#                     except Exception:
#                         p_value = None
#                 if line.startswith("Assessment:"):
#                     assessment = line.replace("Assessment:", "").strip()

#             return Response({
#                 "output": output,
#                 "p_value": p_value,
#                 "assessment": assessment
#             })

#         except subprocess.TimeoutExpired:
#             return Response({"error": "Dieharder test timed out."}, status=500)

#         finally:
#             if os.path.exists(tmpfile_path):
#                 os.remove(tmpfile_path)

# class DieharderxTestView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request, format=None):
#         # Save the uploaded file to a temp file
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
#             for chunk in request.FILES['file'].chunks():
#                 tmpfile.write(chunk)
#             tmpfile_path = tmpfile.name

#         # Build the dieharder command
#         # Example: -r 2 Bit Persist test
#         command = [
#             str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
#             "-s", "1",          # Change this to 1,3,4 as desired
#             "-g", "66",
#             "-f", tmpfile_path
#         ]

#         try:
#             # Run dieharder
#             process = subprocess.run(
#                 command,
#                 stdout=subprocess.PIPE,
#                 stderr=subprocess.PIPE,
#                 universal_newlines=True,
#                 timeout=300
#             )
#             output = process.stdout
#             error = process.stderr

#             # Optional: parse output if you want
#             p_value = None
#             assessment = None
#             for line in output.splitlines():
#                 line = line.strip()
#                 if line.startswith("p ="):
#                     try:
#                         p_value = float(line.split("=")[1].strip())
#                     except Exception:
#                         p_value = None
#                 if "Assessment:" in line:
#                     assessment = line.split("Assessment:")[-1].strip()

#             return Response({
#                 "output": output,
#                 "p_value": p_value,
#                 "assessment": assessment
#             })

#         except subprocess.TimeoutExpired:
#             return Response({"error": "Dieharder test timed out."}, status=500)

#         finally:
#             if os.path.exists(tmpfile_path):
#                 os.remove(tmpfile_path)
                

class DieharderStsMonoTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command for STS Monobit Test
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-s", "1",  # STS Monobit test
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

            # Parse p-value and assessment
            p_value = None
            assessment = None
            for line in output.splitlines():
                line = line.strip()
                if line.startswith("Kuiper KS: p ="):
                    try:
                        p_value_str = line.split("=")[1].strip()
                        p_value = float(p_value_str)
                    except Exception:
                        p_value = None
                if line.startswith("Assessment:"):
                    assessment = line.split("Assessment:")[1].strip()

            return Response({
              
                "p_value": p_value,
                "assessment": assessment
            })

        except subprocess.TimeoutExpired:
            return Response({"error": "Dieharder STS test timed out."}, status=500)

        finally:
            if os.path.exists(tmpfile_path):
                os.remove(tmpfile_path)


class DieharderStsRunsTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command for STS Monobit Test
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-s", "2",  # STS runs test
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

            # Parse p-value and assessment
            p_value = None
            assessment = None
            for line in output.splitlines():
                line = line.strip()
                if line.startswith("Kuiper KS: p ="):
                    try:
                        p_value_str = line.split("=")[1].strip()
                        p_value = float(p_value_str)
                    except Exception:
                        p_value = None
                if line.startswith("Assessment:"):
                    assessment = line.split("Assessment:")[1].strip()

            return Response({
              
                "p_value": p_value,
                "assessment": assessment
            })

        except subprocess.TimeoutExpired:
            return Response({"error": "Dieharder STS test timed out."}, status=500)

        finally:
            if os.path.exists(tmpfile_path):
                os.remove(tmpfile_path)


class DieharderLaggedTestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        # Save the uploaded file to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmpfile:
            for chunk in request.FILES['file'].chunks():
                tmpfile.write(chunk)
            tmpfile_path = tmpfile.name

        # Build the dieharder command for STS Monobit Test
        command = [
            str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder"),
            "-u", "1",  # STS runs test
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

            # Parse p-value and assessment
            p_value = None
            assessment = None
            for line in output.splitlines():
                line = line.strip()
                if line.startswith("Kuiper KS: p ="):
                    try:
                        p_value_str = line.split("=")[1].strip()
                        p_value = float(p_value_str)
                    except Exception:
                        p_value = None
                if line.startswith("Assessment:"):
                    assessment = line.split("Assessment:")[1].strip()

            return Response({
                
                "p_value": p_value,
                "assessment": assessment
            })

        except subprocess.TimeoutExpired:
            return Response({"error": "Dieharder STS test timed out."}, status=500)

        finally:
            if os.path.exists(tmpfile_path):
                os.remove(tmpfile_path)