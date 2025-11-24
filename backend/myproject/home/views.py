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
from django.core.cache import caches
cache = caches['default']

@csrf_exempt
def create_graph(request):
    try:
        data = json.loads(request.body)
        job_id = str(data.get('job_id', ''))
        line_number = str(data.get('line_number', ''))
        file_name = data.get('file_name', '')
    except json.JSONDecodeError as e:
        print('Error parsing JSON:', e)
        return HttpResponse("Invalid JSON data.", status=400)

    # Optional: mark graph generation started
    cache.set(f"{job_id}_progressGraph", 1)

    # ✅ Fetch results from cache
    cache_key = f"{line_number}_results"
    results = cache.get(cache_key)
    print("Cache key used:", cache_key)
    print("Cached results:", results)

    if not results:
        return HttpResponse("No cached results found for this line_number", status=404)

    tests = results.get("tests", {})
    if not tests:
        return HttpResponse("No test results available in cache", status=404)

    # ✅ Build dictionary of {test_name: p_value} from cached results
    valid_tests = {
        test_name: float(test_info.get("p_value") or 0)
        for test_name, test_info in tests.items()
    }
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

    # ✅ Mark graph generation done
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
        # AIAnalysis_subtitle,
        # gemini_analysis_paragraph,
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
        # AIAnalysis_subtitle,
        # gemini_analysis_paragraph,
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

    # # ✅ AI Analysis with Gemini
    # ai_prompt = (
    #     "Perform a detailed analysis of the results from all the statistical tests. "
    #     "For each test, display the test name along with its p-value and indicate whether "
    #     "the result is Random or Non-Random based on the condition that if p-value > 0.05, "
    #     "the number is considered Random; otherwise, it is Non-Random. "
    #     "In the analysis, mention that basis of selecting random or non-random is majority of tests response. "
    #     "Finally, summarize how many tests indicate Random and how many indicate Non-Random, along with their names."
    # )

    # response1 = client.models.generate_content(
    #     model="gemini-2.0-flash",
    #     contents=[{"text": ai_prompt}, {"text": json.dumps(results)}],
    # )

    # if response1.candidates:
    #     gemini_analysis = response1.candidates[0].content.parts[0].text
    # else:
    #     gemini_analysis = "No AI Analysis."

    cache.set(f"{job_id}_progressReportDieharder", 26)

    # formatted_output = format_markdown(gemini_analysis)
    # bullet_points = formatted_output.replace("<ul>", "").replace("</ul>", "").split("<li>")
    # bullet_points = [point.replace("</li>", "").strip() for point in bullet_points if point.strip()]

    # gemini_analysis_paragraph = ListFlowable(
    #     [ListItem(Paragraph(point, styles['Normal'])) for point in bullet_points],
    #     bulletType='bullet',
    # )

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
        # AIAnalysis_subtitle,
        # gemini_analysis_paragraph,
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
from django.test import RequestFactory

@csrf_exempt
def generate_pdf_report_server(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

    try:
        # Get file and metadata from request
        uploaded_file = request.FILES.get("file")
        scheduled_time_str = request.POST.get("scheduled_time", "")
        job_id = request.POST.get("job_id", str(uuid.uuid4()))
        line_number = request.POST.get("line", "")
        userId = request.POST.get("user_id", "")
        fileName = request.POST.get("file_name", uploaded_file.name if uploaded_file else "")

        if not uploaded_file:
            return JsonResponse({"error": "No file uploaded"}, status=400)

        cache.set(f"{job_id}_progressReportServer", 0)

        # Save uploaded file to temporary location
        with tempfile.NamedTemporaryFile(delete=False, suffix=".bin") as tmp_file:
            for chunk in uploaded_file.chunks():
                tmp_file.write(chunk)
            uploaded_file_path = tmp_file.name

        cache.set(f"{job_id}_progressReportServer", 2)
        
        print("Fetching results from cache...")

        # ✅ Fetch results from all three test categories from cache
        nist22_results = cache.get(f"{line_number}_results")
        nist90b_results = cache.get(f"{line_number}_results90b") 
        dieharder_results = cache.get(f"{line_number}_results_dieharder")

        cache.set(f"{job_id}_progressReportServer", 10)

        # Initialize results dictionaries
        nist22_tests = {}
        nist90b_tests = {}
        dieharder_tests = {}
        
        # Process NIST 22B results
        if nist22_results:
            nist22_tests = nist22_results.get("tests", {})
            nist22_final = nist22_results.get("final_result", "N/A")
        else:
            nist22_final = "No data"

        # Process NIST 90B results
        if nist90b_results:
            nist90b_tests = nist90b_results.get("tests", {})
            nist90b_final = nist90b_results.get("final_result", "N/A")
        else:
            nist90b_final = "No data"

        # Process Dieharder results
        if dieharder_results:
            dieharder_tests_list = dieharder_results.get("tests", [])
            dieharder_final = dieharder_results.get("final_result", "N/A")
            
            # Convert dieharder list to dict for easier processing
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
                "15": "Diehard Overlapping Sums Test",
                "16": "Diehard Runs Test",
                "17": "Diehard Craps Test",
            }
            
            for test in dieharder_tests_list:
                if isinstance(test, dict):
                    test_id = test.get("test_id", "")
                    test_name = test_id_name_map.get(test_id, f"Test {test_id}")
                    assessment = test.get("assessment", "")
                    
                    # ✅ Check if "POOR" is in the assessment - if yes, then non-random
                    if "POOR" in assessment.upper():
                        result = "non-random number"
                    elif "PASSED" in assessment.upper() or "WEAK" in assessment.upper():
                        result = "random number"
                    else:
                        # Default to non-random if unclear
                        result = "non-random number"
                    
                    dieharder_tests[test_name] = {
                        "p_value": test.get("p_value", 0),
                        "result": result,
                        "raw_assessment": assessment  # Keep original for reference
                    }
        else:
            dieharder_final = "No data"

        cache.set(f"{job_id}_progressReportServer", 20)

        # ✅ Calculate final result based on majority
        total_tests = len(nist22_tests) + len(nist90b_tests) + len(dieharder_tests)
        
        # Count passed tests for each category
        nist22_passed = sum(1 for test in nist22_tests.values() 
                           if test.get("result", "").lower() == "random number")
        nist90b_passed = sum(1 for test in nist90b_tests.values() 
                            if test.get("result", "").lower() == "random number")
        dieharder_passed = sum(1 for test in dieharder_tests.values() 
                              if test.get("result", "").lower() == "random number")

        total_passed = nist22_passed + nist90b_passed + dieharder_passed
        final_text = 'random number' if total_passed > (total_tests // 2) else 'non-random number'
        
        print(f"Final Result: {final_text} (Total: {total_passed}/{total_tests})")
        print(f"NIST 22B: {nist22_passed}/{len(nist22_tests)}")
        print(f"NIST 90B: {nist90b_passed}/{len(nist90b_tests)}")
        print(f"Dieharder: {dieharder_passed}/{len(dieharder_tests)}")

        cache.set(f"{job_id}_progressReportServer", 30)

        # ✅ Generate graphs for all three categories
        print("Generating graphs...")
        
        # Generate NIST 22B graph
        nist22_graph_response = create_graph_for_report(line_number, "nist22")
        nist22_graph_buffer = nist22_graph_response.content
        nist22_graph_io = BytesIO(nist22_graph_buffer)
        
        # Generate NIST 90B graph
        nist90b_graph_response = create_graph_for_report(line_number, "nist90b")
        nist90b_graph_buffer = nist90b_graph_response.content
        nist90b_graph_io = BytesIO(nist90b_graph_buffer)
        
        # Generate Dieharder graph
        dieharder_graph_response = create_graph_for_report(line_number, "dieharder")
        dieharder_graph_buffer = dieharder_graph_response.content
        dieharder_graph_io = BytesIO(dieharder_graph_buffer)
        
        cache.set(f"{job_id}_progressReportServer", 40)

        # ✅ Prepare PDF
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'inline; filename="comprehensive_report.pdf"'

        buffer = BytesIO()
        doc = SimpleDocTemplate(
            buffer, pagesize=A4,
            rightMargin=10, leftMargin=10,
            topMargin=10, bottomMargin=30, 
            title="QNU Labs Comprehensive Report"
        )

        styles = getSampleStyleSheet()
        title = Paragraph("Comprehensive Test Report - QNu Labs", styles['Title'])
        title_space = Spacer(1, 0.0 * inch)
        
        subtitle_style = styles['Heading2']
        subtitle_style.fontName = 'Helvetica-Bold'
        subtitle_style.fontSize = 12
        subtitle_style.underline = True
        
        nist_subtitle = Paragraph("Statistical Tests Results:", subtitle_style)
        graph_subtitle = Paragraph("Graphical Analysis:", subtitle_style)
        subtitle_space = Spacer(1, 0.5 * inch)
        
        bold_red_style = ParagraphStyle(
            'BoldRed', parent=styles['Normal'], fontSize=12, fontName='Helvetica-Bold', textColor='red'
        )

        cache.set(f"{job_id}_progressReportServer", 45)

        # ✅ Build comprehensive table data
        data1 = [
            ['Test Type', 'Result', 'Test type', 'Result'],
        ]

        def result_text(test_data):
            """Extract result from test data"""
            if isinstance(test_data, dict):
                result = test_data.get("result", "")
                # For Dieharder tests, we've already processed "POOR" to "non-random number"
                return result
            return "non-random number"

        # NIST 22B Tests
        nist22_test_mapping = {
            'Frequency Test': '1. Frequency Test',
            'Frequency Block Test': '2. Frequency Test within a Block', 
            'Runs Test': '3. Runs Test',
            'Longest One Block Test': '4. Test for the longest Run of Ones',
            'Binary Matrix Rank Test': '5. Binary Matrix Rank Test',
            'Discrete Fourier Transform Test': '6. Discrete Fourier Transform Test',
            'Non Overlapping Test': '7. Non-overlapping Template Match',
            'Overlapping Test': '8. Overlapping Template Matching Test',
            'Universal Test': '9. Maurers Universal test',
            'Linear Complexity Test': '10. Linear complexity Test',
            'Serial Test': '11. Serial Test',
            'Approximate Entropy Test': '12. Approximate Entropy Test',
            'Cusum Test': '13. Cumulative Sum Test',
            'Random Excursion Test': '14. Random Excursions Test',
            'Random Excursion Variant Test': '15. Random Excursions Variant Test'
        }

        # Add NIST 22B tests in pairs
        nist22_items = list(nist22_tests.items())
        for i in range(0, len(nist22_items), 2):
            if i < len(nist22_items):
                test1_name, test1_data = nist22_items[i]
                display_name1 = nist22_test_mapping.get(test1_name, f"16. {test1_name}")
                result1 = result_text(test1_data)
                
                if i + 1 < len(nist22_items):
                    test2_name, test2_data = nist22_items[i + 1]
                    display_name2 = nist22_test_mapping.get(test2_name, f"17. {test2_name}")
                    result2 = result_text(test2_data)
                    data1.append([
                        Paragraph(display_name1, styles['Normal']), result1,
                        Paragraph(display_name2, styles['Normal']), result2
                    ])
                else:
                    data1.append([
                        Paragraph(display_name1, styles['Normal']), result1, '', ''
                    ])

        # NIST 90B Tests
        nist90b_start_idx = 16
        nist90b_items = list(nist90b_tests.items())
        for i, (test_name, test_data) in enumerate(nist90b_items):
            display_name = f"{nist90b_start_idx + i}. {test_name}"
            result = result_text(test_data)
            if i % 2 == 0:
                if i + 1 < len(nist90b_items):
                    next_test_name, next_test_data = nist90b_items[i + 1]
                    next_display_name = f"{nist90b_start_idx + i + 1}. {next_test_name}"
                    next_result = result_text(next_test_data)
                    data1.append([
                        Paragraph(display_name, styles['Normal']), result,
                        Paragraph(next_display_name, styles['Normal']), next_result
                    ])
                else:
                    data1.append([
                        Paragraph(display_name, styles['Normal']), result, '', ''
                    ])

        # Dieharder Tests
        dieharder_start_idx = nist90b_start_idx + len(nist90b_items)
        dieharder_items = list(dieharder_tests.items())
        for i, (test_name, test_data) in enumerate(dieharder_items):
            display_name = f"{dieharder_start_idx + i}. {test_name}"
            result = result_text(test_data)
            if i % 2 == 0:
                if i + 1 < len(dieharder_items):
                    next_test_name, next_test_data = dieharder_items[i + 1]
                    next_display_name = f"{dieharder_start_idx + i + 1}. {next_test_name}"
                    next_result = result_text(next_test_data)
                    data1.append([
                        Paragraph(display_name, styles['Normal']), result,
                        Paragraph(next_display_name, styles['Normal']), next_result
                    ])
                else:
                    data1.append([
                        Paragraph(display_name, styles['Normal']), result, '', ''
                    ])

        # Add final result row
        data1.append([
            Paragraph('Final Result', styles['Normal']), 
            Paragraph(final_text, bold_red_style), 
            '', ''
        ])

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

        cache.set(f"{job_id}_progressReportServer", 50)

        # ✅ Logo
        logo_path = os.path.join(os.path.dirname(__file__), 'qnulogo.png')
        logo_image = Image(logo_path, width=0.5 * inch, height=0.5 * inch)
        logo_table = Table([[logo_image]], colWidths=[6.5 * inch], rowHeights=[0.5 * inch])
        logo_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (0, 0), 'CENTRE'),
            ('VALIGN', (100, 100), (0, 0), 'TOP'),
        ]))

        # ✅ Summary section
        summary_style = ParagraphStyle(
            'Summary',
            parent=styles['Normal'],
            fontSize=11,
            fontName='Helvetica-Bold',
            textColor=colors.darkblue,
            spaceAfter=12
        )
        
        summary_text = f"""
        <b>Test Summary:</b><br/>
        • NIST SP 800-22B Tests: {nist22_passed}/{len(nist22_tests)} passed<br/>
        • NIST SP 800-90B Tests: {nist90b_passed}/{len(nist90b_tests)} passed<br/>
        • Dieharder Tests: {dieharder_passed}/{len(dieharder_tests)} passed<br/>
        • <b>Overall: {total_passed}/{total_tests} tests passed</b><br/>
        • <b>Final Verdict: {final_text.upper()}</b>
        """
        
        summary_paragraph = Paragraph(summary_text, summary_style)

        cache.set(f"{job_id}_progressReportServer", 55)

        # ✅ Create graph images for PDF
        nist22_graph_image = Image(nist22_graph_io, width=7 * inch, height=4.5 * inch)
        nist90b_graph_image = Image(nist90b_graph_io, width=7 * inch, height=4.5 * inch)
        dieharder_graph_image = Image(dieharder_graph_io, width=7 * inch, height=4.5 * inch)

        # ✅ Build the PDF with multiple pages
        elements = [
            logo_table,
            title,
            title_space,
            summary_paragraph,
            Spacer(1, 0.2 * inch),
            nist_subtitle,
            table1,
            
            # Page break for graphs
            PageBreak(),
            graph_subtitle,
            Spacer(1, 0.2 * inch),
            Paragraph("NIST SP 800-22B Tests:", styles['Heading3']),
            nist22_graph_image,
            Spacer(1, 0.2 * inch),
            Paragraph("NIST SP 800-90B Tests:", styles['Heading3']),
            nist90b_graph_image,
            Spacer(1, 0.2 * inch),
            Paragraph("Dieharder Tests:", styles['Heading3']),
            dieharder_graph_image,
        ]

        doc.build(elements)
        
        response.write(buffer.getvalue())
        buffer.close()

        # Cleanup temporary file
        try:
            os.remove(uploaded_file_path)
        except:
            pass
            
        cache.set(f"{job_id}_progressReportServer", 100)
        return response

    except Exception as e:
        # Cleanup temporary file in case of error
        try:
            if 'uploaded_file_path' in locals():
                os.remove(uploaded_file_path)
        except:
            pass
        return JsonResponse({"error": str(e)}, status=500)


def create_graph_for_report(line_number, test_type):
    """Helper function to generate graphs for the report"""
    import io
    import matplotlib.pyplot as plt
    from matplotlib.patches import Patch
    
    # Fetch results from cache based on test type
    if test_type == "nist22":
        cache_key = f"{line_number}_results"
        results = cache.get(cache_key)
        if not results:
            return HttpResponse("No NIST 22B results found", status=404)
        
        tests = results.get("tests", {})
        valid_tests = {
            test_name: float(test_info.get("p_value") or 0)
            for test_name, test_info in tests.items()
        }
        
        x = list(valid_tests.keys())
        y = list(valid_tests.values())
        
        fig, ax = plt.subplots(figsize=(12, 6))
        colors = ['green' if p >= 0.01 else 'blue' for p in y]
        ax.bar(x, y, color=colors)
        ax.axhline(y=0.01, color='red', linestyle='--', linewidth=2, label='p-value = 0.01')
        ax.set_xlabel('NIST SP 800-22B Tests', fontsize=14)
        ax.set_ylabel('p-value', fontsize=14)
        ax.set_yticks([i / 10.0 for i in range(0, 11)])
        ax.set_ylim(0, 1)
        plt.xticks(rotation=45, ha='right', fontsize=10)
        plt.tight_layout()

        legend_elements = [
            Patch(facecolor='green', edgecolor='green', label='Random (p ≥ 0.01)'),
            Patch(facecolor='blue', edgecolor='blue', label='Non-random (p < 0.01)')
        ]
        ax.legend(handles=legend_elements, loc='upper right', prop={'size': 8})

    elif test_type == "nist90b":
        cache_key = f"{line_number}_results90b"
        results = cache.get(cache_key)
        if not results:
            return HttpResponse("No NIST 90B results found", status=404)
        
        tests = results.get("tests", {})
        valid_tests = {test_name: float(test_info.get("min_entropy", 0.0)) for test_name, test_info in tests.items()}

        x = list(valid_tests.keys())
        y = list(valid_tests.values())

        fig, ax = plt.subplots(figsize=(12, 6))
        colors = ['green' if p >= 7.5 else 'blue' for p in y]
        ax.bar(x, y, color=colors)
        ax.axhline(y=7.5, color='red', linestyle='--', linewidth=2, label='Min-Entropy = 7.5')
        ax.set_xlabel('NIST SP 800-90B Tests', fontsize=14)
        ax.set_ylabel('Min-Entropy', fontsize=14)
        ax.set_ylim(0, 10)
        plt.xticks(rotation=45, ha='right', fontsize=10)
        plt.tight_layout()

        legend_elements = [
            Patch(facecolor='green', edgecolor='green', label='Random (Min-Entropy ≥ 7.5)'),
            Patch(facecolor='blue', edgecolor='blue', label='Non-random (Min-Entropy < 7.5)')
        ]
        ax.legend(handles=legend_elements, loc='upper right', prop={'size': 8})

    elif test_type == "dieharder":
        cache_key = f"{line_number}_results_dieharder"
        results = cache.get(cache_key)
        if not results:
            return HttpResponse("No Dieharder results found", status=404)
        
        tests = results.get("tests", [])
        test_p_values = {}
        test_id_name_map = {
            "0": "Birthdays", "1": "Overlapping", "2": "Ranks 31x31", "4": "Ranks 6x8",
            "5": "Bitstream", "6": "OPSO", "7": "OQSO", "8": "DNA", "9": "Count 1s Stream",
            "10": "Count 1s Byte", "11": "Parking Lot", "12": "Min Distance", "13": "3D Spheres",
            "14": "Squeeze", "15": "Overlapping Sums", "16": "Runs", "17": "Craps"
        }
        
        for t in tests:
            test_id = t.get('test_id', '')
            short_name = test_id_name_map.get(test_id, f"Test {test_id}")
            test_p_values[short_name] = t.get("p_value", 0.0)

        x_labels = list(test_p_values.keys())
        y_values = list(test_p_values.values())

        fig, ax = plt.subplots(figsize=(12, 6))
        colors = ['green' if p > 0.01 else 'blue' for p in y_values]
        ax.bar(x_labels, y_values, color=colors)
        ax.axhline(y=0.01, color='red', linestyle='--', linewidth=2, label='p-value = 0.01')
        ax.set_xlabel('Dieharder Tests', fontsize=14)
        ax.set_ylabel('P-values', fontsize=14)
        ax.set_yticks([i / 10.0 for i in range(0, 11)])
        ax.set_ylim(0, 1)
        plt.xticks(rotation=45, ha='right', fontsize=8)
        plt.tight_layout()

        legend_elements = [
            Patch(facecolor='green', edgecolor='green', label='Random (p > 0.01)'),
            Patch(facecolor='blue', edgecolor='blue', label='Non-random (p ≤ 0.01)'),
        ]
        ax.legend(handles=legend_elements, loc='upper right', prop={'size': 8})

    else:
        return HttpResponse("Invalid test type", status=400)

    # Convert to image response
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', dpi=100)
    buf.seek(0)
    plt.close(fig)

    return HttpResponse(buf, content_type='image/png')

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

from myproject.task_locks import NISTTaskLock
import logging
from celery import shared_task
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import os, datetime, pytz, gc, uuid, subprocess

logger = logging.getLogger(__name__)
TOTAL_STEPS = 18

@shared_task(bind=True)
def execute_nist_tests(self, job_data):
    """
    Execute NIST tests with queueing and consistent lock handling.
    NOTE: NISTTaskLock API expected:
      - acquire_nist_lock(user_id) -> bool
      - add_to_queue(user_id, job_data) -> position
      - get_queue_length(user_id) -> int
      - get_next_job(user_id) -> job_data or None
      - release_nist_lock(user_id)
    """
    uploaded_file_path = None
    job_id = job_data.get('job_id', str(uuid.uuid4()))
    user_id = job_data.get('userId')
    line_number = job_data.get('line_number')
    if not line_number or not str(line_number).isdigit():
        logger.error(f"[TASK ERROR] Invalid line_number '{line_number}'")
        raise Exception("Invalid line_number")

    fileName = job_data.get('fileName')

    logger.info(f"🚀 [TASK START] Task {self.request.id} job_id={job_id} user={user_id}")

    try:
        # progress helper
        def update_progress(step):
            try:
                # ✅ CAP progress at 100% maximum
                capped_step = min(step, TOTAL_STEPS)
                progress = round((capped_step / TOTAL_STEPS) * 100)
                logger.info(f"📈 [PROGRESS] job={job_id} step={capped_step}/{TOTAL_STEPS} => {progress}%")
                cache.set(f"{job_id}_progress", progress, timeout=3600)
                supabase.table("results").update({"progress": progress}) \
                    .eq("user_id", int(user_id)).eq("line", int(line_number)).execute()
            except Exception as e:
                logger.warning(f"[PROGRESS WARN] could not update progress: {e}")
        update_progress(1)

        NISTTaskLock.release_nist_lock(user_id)
        cache.delete(f"nist_queue_{user_id}")

        # 🗝️ Acquire a fresh lock
        if not NISTTaskLock.acquire_nist_lock(user_id):
            logger.warning(f"🔒 [LOCK FAILED] Could not acquire lock for user={user_id}")
            return {"status": "locked", "message": f"Another task running for user {user_id}"}

        logger.info(f"✅ [LOCK ACQUIRED] user={user_id}")

        # scheduled time check
        kolkata_tz = pytz.timezone("Asia/Kolkata")
        scheduled_time_str = job_data.get('scheduled_time_str')
        scheduled_time_str1 = job_data.get('scheduled_time_str1')
        scheduled_time = kolkata_tz.localize(datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S"))
        current_time = datetime.datetime.now(kolkata_tz)
        time_diff = (scheduled_time - current_time).total_seconds()
        logger.info(f"⏰ [TIME CHECK] now={current_time.isoformat()} scheduled={scheduled_time.isoformat()} diff={time_diff}s")

        if time_diff > 0:
            logger.info(f"⏳ [DEFER] Job {job_id} scheduled for future. Scheduling new Celery task after {time_diff}s")
            update_progress(2)
            NISTTaskLock.release_nist_lock(user_id)

            # Schedule the same task to run after the required delay
            execute_nist_tests.apply_async(
                kwargs={'job_data': job_data},
                countdown=int(time_diff),
                queue='nist_tests'
            )

            return {"status": "scheduled", "delay_seconds": time_diff}


        update_progress(2)

        # file checks
        uploaded_file_path = job_data.get('uploaded_file_path')
        if not uploaded_file_path or not os.path.exists(uploaded_file_path):
            logger.error(f"❌ [FILE NOT FOUND] {uploaded_file_path}")
            raise Exception(f"File not found: {uploaded_file_path}")

        num_bits = os.path.getsize(uploaded_file_path) * 8
        logger.info(f"📊 [FILE INFO] {uploaded_file_path} size_bytes={os.path.getsize(uploaded_file_path)} bits={num_bits}")

        assess_path = os.path.join(STS_PATH, "assess")
        if not os.path.exists(assess_path):
            logger.error(f"❌ [ASSESS MISSING] {assess_path}")
            raise Exception(f"Assess binary not found: {assess_path}")

        update_progress(3)
       
        # Build automated input for assess.
        # Keep the sequence explicit & logged. Adjust if your assess expects different numbers.
        automated_input = f"0\n{uploaded_file_path}\n1\n0\n1\n1\n".encode()  # 4th value switched to '1' for binary if that's correct for your assess
        logger.info(f"⚙️ [ASSESS START] ./assess {num_bits} (cwd={STS_PATH})")
        logger.debug(f"📥 [AUTOMATED INPUT] {automated_input.decode()}")

        proc = subprocess.Popen(
            ["./assess", str(num_bits)],
            cwd=STS_PATH,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        stdout, stderr = proc.communicate(input=automated_input)

        # Save stdout/stderr for future debugging
        stdout_str = stdout.decode() if stdout else ""
        stderr_str = stderr.decode() if stderr else ""
        with open(os.path.join(STS_PATH, f"assess_stdout_{job_id}.txt"), "w") as f:
            f.write(stdout_str)
        with open(os.path.join(STS_PATH, f"assess_stderr_{job_id}.txt"), "w") as f:
            f.write(stderr_str)
        logger.info(f"📄 [ASSESS DONE] returncode={proc.returncode} stdout_len={len(stdout_str)} stderr_len={len(stderr_str)}")

        experiment_path = os.path.join(STS_PATH, "experiments", "AlgorithmTesting")
        if proc.returncode != 0 and not os.path.exists(experiment_path):
            logger.error("❌ [ASSESS FAILED] Non-zero return and no experiments created.")
            raise Exception(f"Assess failed (rc={proc.returncode}). See logs in {STS_PATH}")

        update_progress(4)

        # Process result files
        if not os.path.exists(experiment_path):
            logger.error("❌ [EXPERIMENT MISSING] " + experiment_path)
            raise Exception(f"Experiment path not found: {experiment_path}")

        test_results = {}
        random_count = 0
        non_random_count = 0
        step = 4

        for test_name, result_file in TEST_FOLDERS.items():
            test_folder = os.path.join(experiment_path, test_name)
            results_file = os.path.join(test_folder, result_file)
            logger.info(f"🔎 [READ TEST] {test_name} -> {results_file}")

            if not os.path.isfile(results_file):
                logger.warning(f"⚠️ [MISSING] {results_file}")
                test_results[test_name] = {"p_value": 0, "result": "no data"}
                update_progress(step)
                step += 1
                continue

            p_values = []
            try:
                with open(results_file, "r") as f:
                    for line in f:
                        try:
                            p = float(line.strip())
                            p_values.append(p)
                        except ValueError:
                            logger.debug(f"[SKIP LINE] {line.strip()}")
                            continue
            except Exception as e:
                logger.error(f"❌ [READ ERROR] {results_file} - {e}")
                test_results[test_name] = {"p_value": 0, "result": "error"}
                update_progress(step)
                step += 1
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

        final_verdict = "random number" if random_count >= non_random_count else "non-random number"
        executed_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        logger.info(f"🏁 [VERDICT] job={job_id} verdict={final_verdict} randoms={random_count} nonrandoms={non_random_count}")

        # Store the results in cache with debugging
        try:
            cache_key = f"{str(line_number)}_results"
            logger.error(f"[CACHE WRITE] Attempting to write results for key={cache_key}")

            cache_value = {
                "job_id": job_id,
                "file_name": fileName,
                "tests": test_results,
                "final_result": final_verdict,
                "executed_at": executed_at,
                "random_count": random_count,
                "non_random_count": non_random_count,
            }

            # 1️⃣ Write into cache
            write_ok = cache.set(cache_key, cache_value, timeout=3600)
            logger.error(f"[CACHE WRITE] cache.set returned: {write_ok}")

            # 2️⃣ Verify from cache
            read_back = cache.get(cache_key)
            logger.error(f"[CACHE VERIFY] Read-back value for {cache_key}: {read_back}")

            if read_back is None:
                logger.error(f"[CACHE FAIL] ❌ Cache write failed for key={cache_key}")
            else:
                logger.error(f"[CACHE SUCCESS] ✅ Results successfully stored for key={cache_key}")

        except Exception as cache_error:
            logger.error(f"[CACHE EXCEPTION] ❌ Failed to store results for {cache_key}: {cache_error}")


        update_progress(TOTAL_STEPS)

        # Upsert final result to supabase
        try:
            current_time = datetime.datetime.now().isoformat()
            supabase.table("results").upsert({
                "user_id": int(user_id),
                "line": int(line_number),
                "binary_data": " ",
                "scheduled_time": scheduled_time_str1,
                "upload_time": current_time,
                "result": final_verdict,
                "progress": 100,
                "file_name": fileName,
                "updated_at": current_time
            }, ignore_duplicates=False).execute()
            logger.info("[SUPABASE] final result upserted")
        except Exception as e:
            logger.warning(f"[SUPABASE WARN] could not upsert final result: {e}")

        logger.info(f"✅ [TASK SUCCESS] job={job_id}")
        return {"status": "completed", "job_id": job_id, "final_result": final_verdict}

    except Exception as e:
        logger.error(f"💥 [TASK ERROR] job={job_id} error={e}")
        logger.error("".join((traceback.format_exc(),)))
        # propagate to be visible in Celery logs
        raise

    finally:
        # Always clean up
        try:
            NISTTaskLock.release_nist_lock(user_id)
            cache.delete(f"nist_queue_{user_id}")
            logger.info(f"🔓 [LOCK & QUEUE CLEARED] user={user_id}")
        except Exception as e:
            logger.warning(f"⚠️ [LOCK RELEASE ERROR] {e}")

        if uploaded_file_path and os.path.exists(uploaded_file_path):
            try:
                os.remove(uploaded_file_path)
                logger.info(f"🗑️ [FILE REMOVED] {uploaded_file_path}")
            except Exception as e:
                logger.warning(f"⚠️ [CLEANUP ERROR] {e}")

# @csrf_exempt
# def run_nist_tests(request):
#     if request.method != "POST":
#         return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

#     try:
#         uploaded_file = request.FILES.get("file")
#         scheduled_time_str = request.POST.get("scheduled_time", "")
#         scheduled_time_str1= request.POST.get("scheduled_time_str", "")
#         job_id = request.POST.get("job_id", str(uuid.uuid4()))
#         line_number = request.POST.get("line", "")
#         user_id = request.POST.get("user_id", "")
#         fileName = request.POST.get("file_name", uploaded_file.name if uploaded_file else "")

#         if not uploaded_file:
#             return JsonResponse({"error": "No file uploaded"}, status=400)
#         if not scheduled_time_str:
#             return JsonResponse({"error": "scheduled_time is required"}, status=400)
#         if not user_id:
#             return JsonResponse({"error": "user_id is required"}, status=400)

#         # Save uploaded file to temporary location
#         temp_file_path = os.path.join(STS_PATH, f"{job_id}_{uploaded_file.name}")
#         with open(temp_file_path, "wb+") as f:
#             for chunk in uploaded_file.chunks():
#                 f.write(chunk)

#         # Prepare job_data
#         job_data = {
#             'uploaded_file_path': temp_file_path,
#             'scheduled_time_str': scheduled_time_str,
#             'scheduled_time_str1': scheduled_time_str1,
#             'job_id': job_id,
#             'line_number': line_number,
#             'userId': user_id,
#             'fileName': fileName,
#         }

#         # Calculate countdown for scheduling (0 if due now)
#         kolkata_tz = pytz.timezone("Asia/Kolkata")
#         scheduled_time = kolkata_tz.localize(datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S"))
#         current_time = datetime.datetime.now(kolkata_tz)
#         countdown = max(0, int((scheduled_time - current_time).total_seconds()))

#         # Set initial progress
#         cache.set(f"{job_id}_progress", 0, timeout=3600)

#         # ALWAYS queue a Celery task (task will add to internal queue or run immediately)
#         task = execute_nist_tests.apply_async(kwargs={'job_data': job_data}, countdown=countdown, queue='nist_tests')

#         message = "NIST tests processing started" if countdown == 0 else "NIST tests scheduled"
#         return JsonResponse({
#             "status": "success",
#             "job_id": job_id,
#             "task_id": task.id,
#             "message": message,
#             "scheduled_time": scheduled_time_str,
#         })

#     except Exception as e:
#         logger.error(f"[RUN_NIST ERROR] {e}")
#         return JsonResponse({"error": str(e)}, status=500)

# ...existing code...

# @csrf_exempt
# def run_nist_tests(request):
#     if request.method != "POST":
#         return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

#     try:
#         uploaded_file = request.FILES.get("file")
#         scheduled_time_str = request.POST.get("scheduled_time", "")
#         scheduled_time_str1 = request.POST.get("scheduled_time_str", "")
#         job_id = request.POST.get("job_id", str(uuid.uuid4()))
#         line_number = request.POST.get("line", "")
#         user_id = request.POST.get("user_id", "")
#         fileName = request.POST.get("file_name", uploaded_file.name if uploaded_file else "")

#         if not uploaded_file:
#             return JsonResponse({"error": "No file uploaded"}, status=400)
#         if not scheduled_time_str:
#             return JsonResponse({"error": "scheduled_time is required"}, status=400)
#         if not user_id:
#             return JsonResponse({"error": "user_id is required"}, status=400)

#         # Ensure STS_PATH exists and write upload to disk-backed temp file to avoid keeping large blobs in memory
#         os.makedirs(STS_PATH, exist_ok=True)
#         tmp = tempfile.NamedTemporaryFile(delete=False,
#                                          prefix=f"{job_id}_",
#                                          suffix=os.path.splitext(fileName)[1] or ".bin",
#                                          dir=STS_PATH)
#         try:
#             for chunk in uploaded_file.chunks(chunk_size=8192):
#                 tmp.write(chunk)
#             tmp.flush()
#             temp_file_path = tmp.name
#         finally:
#             tmp.close()

#         # Prepare job_data (pass path only, not file bytes)
#         job_data = {
#             "uploaded_file_path": temp_file_path,
#             "scheduled_time_str": scheduled_time_str,
#             "scheduled_time_str1": scheduled_time_str1,
#             "job_id": job_id,
#             "line_number": line_number,
#             "userId": user_id,
#             "fileName": fileName,
#         }

#         # Calculate countdown for scheduling (0 if due now)
#         kolkata_tz = pytz.timezone("Asia/Kolkata")
#         scheduled_time = kolkata_tz.localize(datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S"))
#         current_time = datetime.datetime.now(kolkata_tz)
#         countdown = max(0, int((scheduled_time - current_time).total_seconds()))

#         # Set initial progress
#         cache.set(f"{job_id}_progress", 0, timeout=3600)

#         # ALWAYS queue a Celery task (task will add to internal queue or run immediately)
#         task = execute_nist_tests.apply_async(kwargs={"job_data": job_data}, countdown=countdown, queue="nist_tests")

#         message = "NIST tests processing started" if countdown == 0 else "NIST tests scheduled"
#         return JsonResponse({
#             "status": "success",
#             "job_id": job_id,
#             "task_id": task.id,
#             "message": message,
#             "scheduled_time": scheduled_time_str,
#         })

#     except Exception as e:
#         logger.error(f"[RUN_NIST ERROR] {e}", exc_info=True)
#         # Attempt to cleanup temp file if it was created and we failed before queuing
#         try:
#             if 'temp_file_path' in locals() and os.path.exists(temp_file_path):
#                 os.remove(temp_file_path)
#         except Exception:
#             pass
#         return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def run_nist_tests(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid method"}, status=405)

    try:
        uploaded_file = request.FILES.get("file")
        scheduled_time_str = request.POST.get("scheduled_time", "")
        scheduled_time_str1 = request.POST.get("scheduled_time_str", "")
        job_id = request.POST.get("job_id", str(uuid.uuid4()))
        user_id = request.POST.get("user_id", "")
        line_number = request.POST.get("line", "")
        if not line_number or not line_number.strip():
            return JsonResponse({"error": "line_number is required"}, status=400)

        fileName = uploaded_file.name

        if not uploaded_file:
            return JsonResponse({"error": "No file uploaded"}, status=400)

        # STREAM DIRECTLY TO DISK (NO RAM USAGE)
        os.makedirs(STS_PATH, exist_ok=True)
        temp_file_path = os.path.join(STS_PATH, f"{job_id}_{fileName}")

        with open(temp_file_path, "wb") as dest:
            for i, chunk in enumerate(uploaded_file.chunks(chunk_size=5*1024 * 1024)):
                dest.write(chunk)
                logger.warning(f"[UPLOAD] wrote chunk #{i} size={len(chunk)} bytes")


        job_data = {
            "uploaded_file_path": temp_file_path,
            "scheduled_time_str": scheduled_time_str,
            "scheduled_time_str1": scheduled_time_str1,
            "job_id": job_id,
            "line_number": line_number,
            "userId": user_id,
            "fileName": fileName,
        }

        cache.set(f"{job_id}_progress", 0, timeout=3600)

        kolkata = pytz.timezone("Asia/Kolkata")
        scheduled_time = kolkata.localize(datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S"))
        now = datetime.datetime.now(kolkata)
        countdown = max(0, int((scheduled_time - now).total_seconds()))

        task = execute_nist_tests.apply_async(kwargs={"job_data": job_data}, countdown=countdown, queue="nist_tests")

        return JsonResponse({
            "status": "success",
            "job_id": job_id,
            "task_id": task.id,
            "message": "NIST tests scheduled",
            "scheduled_time": scheduled_time_str,
        })

    except Exception as e:
        logger.error(f"[RUN_NIST ERROR] {e}", exc_info=True)
        return JsonResponse({"error": str(e)}, status=500)


from celery.result import AsyncResult

@csrf_exempt
def check_task_status(request, task_id):
    """Check status of a Celery task"""
    task_result = AsyncResult(task_id)
    
    response_data = {
        'task_id': task_id,
        'status': task_result.status,
    }
    
    if task_result.status == 'SUCCESS':
        response_data['result'] = task_result.result
    elif task_result.status == 'FAILURE':
        response_data['error'] = str(task_result.result)
        
    return JsonResponse(response_data)

@csrf_exempt
def check_job_status(request, job_id):
    """Check status by job ID using your existing cache system"""
    progress = cache.get(f"{job_id}_progress")
    results = cache.get(f"{job_id}_results")
    
    response_data = {
        'job_id': job_id,
        'progress': progress or 0,
    }
    
    if results:
        response_data['results'] = results
        response_data['status'] = 'completed'
    elif progress == 100:
        response_data['status'] = 'processing'
    else:
        response_data['status'] = 'queued'
        
    return JsonResponse(response_data)

@shared_task(bind=True)
def run_after_delay_nist22b(self, job_data):
    """Wrapper task that waits until scheduled time and reuses NIST execution flow."""
    user_id = job_data['userId']
    job_id = job_data['job_id']
    scheduled_time_str = job_data['scheduled_time_str']

    kolkata_tz = pytz.timezone("Asia/Kolkata")
    scheduled_time = kolkata_tz.localize(datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S"))
    current_time = datetime.datetime.now(kolkata_tz)
    wait_seconds = (scheduled_time - current_time).total_seconds()

    if wait_seconds > 0:
        logger.info(f"Sleeping for {wait_seconds} seconds before running job {job_id}")
        time.sleep(wait_seconds)

    # Once time reached, call the actual test executor
    execute_nist_tests.delay(job_data)


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

from myproject.task_locks import NIST90BTaskLock
import logging
from celery import shared_task
import os, datetime, pytz, gc, uuid, subprocess, re, tempfile

logger = logging.getLogger(__name__)
TOTAL_STEPS_90B = 8

@shared_task(bind=True)
def execute_nist90b_tests(self, job_data):
    """
    Execute NIST 90B tests with queueing and consistent lock handling.
    """
    uploaded_file_path = None
    job_id = job_data.get('job_id', str(uuid.uuid4()))
    user_id = job_data.get('userId')
    line_number = job_data.get('line_number')
    fileName = job_data.get('fileName')

    logger.info(f"🚀 [90B TASK START] Task {self.request.id} job_id={job_id} user={user_id}")

    try:
        # ✅ IMPROVED Progress helper with better error handling
        def update_progress(step):
            try:
                progress = round((step / TOTAL_STEPS_90B) * 100)
                logger.info(f"📈 [90B PROGRESS] job={job_id} step={step}/{TOTAL_STEPS_90B} => {progress}%")
                
                # Update cache
                cache.set(f"{job_id}_progress_90b", progress, timeout=3600)
                
                # ✅ IMPROVED: Update Supabase progress with better error handling
                response = supabase.table("results2").update({
                    "progress": progress,
                    "updated_at": datetime.datetime.now().isoformat()
                }).eq("user_id", int(user_id)).eq("line", int(line_number)).execute()
                
                # ✅ Check if update was successful
                if hasattr(response, 'error') and response.error:
                    logger.error(f"❌ [90B SUPABASE PROGRESS ERROR] Failed to update progress: {response.error}")
                else:
                    logger.info(f"✅ [90B SUPABASE PROGRESS] Successfully updated to {progress}%")
                    
            except Exception as e:
                logger.error(f"❌ [90B PROGRESS ERROR] step={step}: {e}")
                # Don't raise exception here, just log it

        update_progress(1)

        # 🗝️ Acquire lock FIRST (don't release it immediately)
        if not NIST90BTaskLock.acquire_90b_lock(user_id):
            logger.warning(f"🔒 [90B LOCK FAILED] Could not acquire lock for user={user_id}")
            return {"status": "locked", "message": f"Another 90B task running for user {user_id}"}

        logger.info(f"✅ [90B LOCK ACQUIRED] user={user_id}")

        # Scheduled time check
        kolkata_tz = pytz.timezone("Asia/Kolkata")
        scheduled_time_str = job_data.get('scheduled_time_str')
        scheduled_time = kolkata_tz.localize(datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S"))
        current_time = datetime.datetime.now(kolkata_tz)
        time_diff = (scheduled_time - current_time).total_seconds()
        logger.info(f"⏰ [90B TIME CHECK] now={current_time.isoformat()} scheduled={scheduled_time.isoformat()} diff={time_diff}s")

        if time_diff > 0:
            logger.info(f"⏳ [90B DEFER] Job {job_id} scheduled for future. Scheduling new Celery task after {time_diff}s")
            update_progress(2)
            NIST90BTaskLock.release_90b_lock(user_id)  # Release only when deferring

            # Schedule the same task to run after the required delay
            execute_nist90b_tests.apply_async(
                kwargs={'job_data': job_data},
                countdown=int(time_diff),
                queue='nist90b_tests'
            )

            # ✅ CRITICAL: Return immediately to stop current task execution
            return {"status": "scheduled", "delay_seconds": time_diff}

        # ✅ Only proceed with test execution if time_diff <= 0
        update_progress(2)

        # File checks
        uploaded_file_path = job_data.get('uploaded_file_path')
        if not uploaded_file_path or not os.path.exists(uploaded_file_path):
            logger.error(f"❌ [90B FILE NOT FOUND] {uploaded_file_path}")
            raise Exception(f"File not found: {uploaded_file_path}")

        file_size_bytes = os.path.getsize(uploaded_file_path)
        file_size_bits = file_size_bytes * 8
        MAX_BITS = 1_000_000
        n_samples = min(file_size_bits, MAX_BITS)
        logger.info(f"📊 [90B FILE INFO] {uploaded_file_path} size_bytes={file_size_bytes} bits={file_size_bits}")

        # Define tests
        tests_executables = {
            "IID Test": {
                "exe": os.path.join(CPP_FOLDER, "ea_iid"),
                "args": ["-v", uploaded_file_path]
            },
            "Non-IID Test": {
                "exe": os.path.join(CPP_FOLDER, "ea_non_iid"),
                "args": ["-v", uploaded_file_path]
            },
        }

        results = {}
        passed_count = 0
        step_counter = 3
        combined_output = ""

        # ✅ IMPROVED: Add small delays between progress updates to avoid rate limiting
        import time
        
        # Run each test
        for test_name, test_info in tests_executables.items():
            exe_path = test_info["exe"]
            args = test_info["args"]

            if not os.path.isfile(exe_path) or not os.access(exe_path, os.X_OK):
                results[test_name] = {"min_entropy": 0.0, "result": "executable missing"}
                step_counter += 1
                update_progress(step_counter)
                time.sleep(0.1)  # Small delay to avoid rapid updates
                continue

            try:
                logger.info(f"🔧 [90B RUNNING TEST] {test_name} with {exe_path}")
                result = subprocess.run([exe_path] + args, capture_output=True, text=True, shell=False)
                output = result.stdout.strip()
                error_output = result.stderr.strip()

                logger.info(f"=== {test_name} Output ===")
                logger.info(output)
                if error_output:
                    logger.error(f"=== {test_name} Error ===")
                    logger.error(error_output)

                combined_output += f"=== {test_name} Output ===\n{output}\n\n"

                # Extract min_entropy from stdout
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
                logger.error(f"❌ [90B TEST ERROR] {test_name}: {e}")
                min_entropy = 0.0
                verdict = "non-random number"

            results[test_name] = {"min_entropy": min_entropy, "result": verdict}
            step_counter += 1
            update_progress(step_counter)
            time.sleep(0.1)  # Small delay to avoid rapid updates

        # Store combined output in cache
        cache.set(f"{line_number}_download90b", combined_output, timeout=3600)
        update_progress(6)

        # Final verdict
        final_text = "random number" if passed_count >= (len(tests_executables) // 2 + 1) else "non-random number"
        executed_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        logger.info(f"🏁 [90B VERDICT] job={job_id} verdict={final_text} passed={passed_count}/{len(tests_executables)}")

        update_progress(7)

        # Store results in cache
        job_results = {
            "job_id": job_id,
            "tests": results,
            "final_result": final_text,
            "executed_at": executed_at,
        }
        cache.set(f"{line_number}_results90b", job_results, timeout=3600)

        update_progress(8)

        # ✅ IMPROVED: Upload final results to Supabase with better error handling
        try:
            current_time = datetime.datetime.now().isoformat()
            response = supabase.table("results2").upsert(
                {
                    "user_id": int(user_id),
                    "line": int(line_number),
                    "binary_data": " ",
                    "scheduled_time": scheduled_time.isoformat(),
                    "upload_time": current_time,
                    "result": final_text,
                    "progress": 100,
                    "file_name": fileName,
                    "updated_at": current_time
                },
                ignore_duplicates=False
            ).execute()
            
            if hasattr(response, 'error') and response.error:
                logger.error(f"❌ [90B SUPABASE FINAL ERROR] Failed to upsert final result: {response.error}")
            else:
                logger.info("[90B SUPABASE] final result upserted successfully")
                
        except Exception as e:
            logger.error(f"❌ [90B SUPABASE WARN] could not upsert final result: {e}")

        logger.info(f"✅ [90B TASK SUCCESS] job={job_id}")
        return {
            "status": "completed", 
            "job_id": job_id, 
            "final_result": final_text,
            "tests": results
        }

    except Exception as e:
        logger.error(f"💥 [90B TASK ERROR] job={job_id} error={e}")
        logger.error("".join(traceback.format_exc()))
        
        # ✅ Update progress to indicate error
        try:
            supabase.table("results2").update({
                "progress": 0,
                "result": f"Error: {str(e)}",
                "updated_at": datetime.datetime.now().isoformat()
            }).eq("user_id", int(user_id)).eq("line", int(line_number)).execute()
        except Exception as update_error:
            logger.error(f"❌ [90B ERROR PROGRESS UPDATE FAILED] {update_error}")
            
        raise

    finally:
        # Always clean up - release lock and remove temp files
        try:
            NIST90BTaskLock.release_90b_lock(user_id)
            logger.info(f"🔓 [90B LOCK RELEASED] user={user_id}")
        except Exception as e:
            logger.warning(f"⚠️ [90B LOCK RELEASE ERROR] {e}")

        if uploaded_file_path and os.path.exists(uploaded_file_path):
            try:
                os.remove(uploaded_file_path)
                logger.info(f"🗑️ [90B FILE REMOVED] {uploaded_file_path}")
            except Exception as e:
                logger.warning(f"⚠️ [90B CLEANUP ERROR] {e}")
                
# @csrf_exempt
# def run_nist90b_on_bin(request):
#     """
#     Accepts a .bin file via POST and runs all official NIST SP800-90B tests.
#     Uses queue-based execution similar to run_nist_tests.
#     """
#     if request.method != "POST":
#         return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

#     try:
#         # Read form fields
#         file = request.FILES.get('file')
#         scheduled_time_str = request.POST.get('scheduled_time', '')
#         job_id = request.POST.get('job_id', str(uuid.uuid4()))
#         line_number = request.POST.get('line', '')
#         userId = request.POST.get('user_id', '')
#         fileName = request.POST.get('file_name', file.name if file else '')

#         if not file:
#             return JsonResponse({"error": "No file uploaded. Send a '.bin' file."}, status=400)

#         if not scheduled_time_str:
#             return JsonResponse({"error": "scheduled_time is required"}, status=400)

#         if not userId:
#             return JsonResponse({"error": "user_id is required"}, status=400)

#         # Save uploaded file to temporary location
#         temp_file_path = os.path.join(CPP_FOLDER, f"{job_id}_{file.name}")
#         with open(temp_file_path, "wb+") as f:
#             for chunk in file.chunks():
#                 f.write(chunk)

#         # Prepare job_data
#         job_data = {
#             'uploaded_file_path': temp_file_path,
#             'scheduled_time_str': scheduled_time_str,
#             'job_id': job_id,
#             'line_number': line_number,
#             'userId': userId,
#             'fileName': fileName,
#         }

#         # Calculate countdown for scheduling
#         kolkata_tz = pytz.timezone("Asia/Kolkata")
#         scheduled_time = kolkata_tz.localize(datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S"))
#         current_time = datetime.datetime.now(kolkata_tz)
#         countdown = max(0, int((scheduled_time - current_time).total_seconds()))

#         # Set initial progress
#         cache.set(f"{job_id}_progress_90b", 0, timeout=3600)

#         # Queue Celery task
#         task = execute_nist90b_tests.apply_async(
#             kwargs={'job_data': job_data}, 
#             countdown=countdown, 
#             queue='nist90b_tests'
#         )

#         message = "NIST 90B tests processing started" if countdown == 0 else "NIST 90B tests scheduled"
#         return JsonResponse({
#             "status": "success",
#             "job_id": job_id,
#             "task_id": task.id,
#             "message": message,
#             "scheduled_time": scheduled_time_str,
#         })

#     except Exception as e:
#         logger.error(f"[RUN_NIST90B ERROR] {e}")
#         return JsonResponse({"error": str(e)}, status=500)

# @csrf_exempt
# def run_nist90b_on_bin(request):
#     """
#     Accepts a .bin file via POST and runs all official NIST SP800-90B tests.
#     Uses disk-backed storage (tempfile) to avoid memory overload with large files.
#     Queues execution using Celery.
#     """
#     if request.method != "POST":
#         return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

#     try:
#         # Read form fields
#         uploaded_file = request.FILES.get('file')
#         scheduled_time_str = request.POST.get('scheduled_time', '')
#         job_id = request.POST.get('job_id', str(uuid.uuid4()))
#         line_number = request.POST.get('line', '')
#         userId = request.POST.get('user_id', '')
#         fileName = request.POST.get('file_name', uploaded_file.name if uploaded_file else '')

#         if not uploaded_file:
#             return JsonResponse({"error": "No file uploaded. Send a '.bin' file."}, status=400)

#         if not scheduled_time_str:
#             return JsonResponse({"error": "scheduled_time is required"}, status=400)

#         if not userId:
#             return JsonResponse({"error": "user_id is required"}, status=400)

#         # Ensure folder exists for temp files
#         os.makedirs(CPP_FOLDER, exist_ok=True)

#         # Write uploaded data to disk using a secure temp file
#         tmp = tempfile.NamedTemporaryFile(
#             delete=False,
#             prefix=f"{job_id}_",
#             suffix=os.path.splitext(fileName)[1] or ".bin",
#             dir=CPP_FOLDER
#         )

#         try:
#             for chunk in uploaded_file.chunks(chunk_size=8192):
#                 tmp.write(chunk)
#             tmp.flush()
#             temp_file_path = tmp.name
#         finally:
#             tmp.close()

#         # Prepare job_data (file path only)
#         job_data = {
#             'uploaded_file_path': temp_file_path,
#             'scheduled_time_str': scheduled_time_str,
#             'job_id': job_id,
#             'line_number': line_number,
#             'userId': userId,
#             'fileName': fileName,
#         }

#         # Calculate countdown
#         kolkata_tz = pytz.timezone("Asia/Kolkata")
#         scheduled_time = kolkata_tz.localize(
#             datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S")
#         )
#         current_time = datetime.datetime.now(kolkata_tz)
#         countdown = max(0, int((scheduled_time - current_time).total_seconds()))

#         # Set initial progress
#         cache.set(f"{job_id}_progress_90b", 0, timeout=3600)

#         # Queue Celery task
#         task = execute_nist90b_tests.apply_async(
#             kwargs={'job_data': job_data},
#             countdown=countdown,
#             queue='nist90b_tests'
#         )

#         message = "NIST 90B tests processing started" if countdown == 0 else "NIST 90B tests scheduled"
#         return JsonResponse({
#             "status": "success",
#             "job_id": job_id,
#             "task_id": task.id,
#             "message": message,
#             "scheduled_time": scheduled_time_str,
#         })

#     except Exception as e:
#         logger.error(f"[RUN_NIST90B ERROR] {e}", exc_info=True)
#         try:
#             # Clean up partially written temp file
#             if 'temp_file_path' in locals() and os.path.exists(temp_file_path):
#                 os.remove(temp_file_path)
#         except Exception:
#             pass
#         return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def run_nist90b_on_bin(request):
    """
    Accepts a .bin file via POST and runs NIST SP800-90B tests.
    Now uses DIRECT-TO-DISK streaming exactly like run_nist_tests.
    Ensures no RAM usage by chunking file writes.
    """
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

    try:
        uploaded_file = request.FILES.get("file")
        scheduled_time_str = request.POST.get("scheduled_time", "")
        job_id = request.POST.get("job_id", str(uuid.uuid4()))
        userId = request.POST.get("user_id", "")
        line_number = request.POST.get("line", "")

        if not line_number or not line_number.strip():
            return JsonResponse({"error": "line_number is required"}, status=400)

        if not uploaded_file:
            return JsonResponse({"error": "No file uploaded"}, status=400)

        if not scheduled_time_str:
            return JsonResponse({"error": "scheduled_time is required"}, status=400)

        if not userId:
            return JsonResponse({"error": "user_id is required"}, status=400)

        fileName = uploaded_file.name

        # ====== STREAM DIRECTLY TO DISK (NO MEMORY USED) ======
        os.makedirs(CPP_FOLDER, exist_ok=True)
        temp_file_path = os.path.join(CPP_FOLDER, f"{job_id}_{fileName}")

        with open(temp_file_path, "wb") as dest:
            for i, chunk in enumerate(uploaded_file.chunks(chunk_size=5 * 1024 * 1024)):
                dest.write(chunk)
                logger.warning(f"[UPLOAD-90B] wrote chunk #{i} size={len(chunk)} bytes")

        logger.warning(f"[UPLOAD-90B COMPLETE] File saved to {temp_file_path}")

        # Build job data
        job_data = {
            "uploaded_file_path": temp_file_path,
            "scheduled_time_str": scheduled_time_str,
            "job_id": job_id,
            "line_number": line_number,
            "userId": userId,
            "fileName": fileName,
        }

        # Initialize progress
        cache.set(f"{job_id}_progress_90b", 0, timeout=3600)

        # Scheduled execution
        kolkata_tz = pytz.timezone("Asia/Kolkata")
        scheduled_time = kolkata_tz.localize(datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S"))
        now = datetime.datetime.now(kolkata_tz)
        countdown = max(0, int((scheduled_time - now).total_seconds()))

        # Queue the task
        task = execute_nist90b_tests.apply_async(
            kwargs={"job_data": job_data},
            countdown=countdown,
            queue="nist90b_tests"
        )

        msg = "NIST 90B tests started" if countdown == 0 else "NIST 90B tests scheduled"
        return JsonResponse({
            "status": "success",
            "job_id": job_id,
            "task_id": task.id,
            "message": msg,
            "scheduled_time": scheduled_time_str,
        })

    except Exception as e:
        logger.error(f"[RUN_NIST90B ERROR] {e}", exc_info=True)
        try:
            if 'temp_file_path' in locals() and os.path.exists(temp_file_path):
                os.remove(temp_file_path)
        except:
            pass
        return JsonResponse({"error": str(e)}, status=500)


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




from myproject.task_locks import DieharderTaskLock
import logging
from celery import shared_task
from django.core.cache import cache
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os, datetime, pytz, uuid, subprocess, re, traceback, tempfile

logger = logging.getLogger(__name__)
TOTAL_STEPS_DIEHARDER = 20

@shared_task(bind=True)
def execute_dieharder_tests(self, job_data):
    """
    Execute Dieharder tests with queueing and consistent lock handling.
    """
    uploaded_file_path = None
    job_id = job_data.get('job_id', str(uuid.uuid4()))
    user_id = job_data.get('userId')
    line_number = job_data.get('line_number')
    fileName = job_data.get('fileName')

    logger.info(f"🚀 [DIEHARDER TASK START] Task {self.request.id} job_id={job_id} user={user_id}")

    try:
        # Progress helper
        def update_progress(step):
            try:
                progress = round((step / TOTAL_STEPS_DIEHARDER) * 100)
                logger.info(f"📈 [DIEHARDER PROGRESS] job={job_id} step={step}/{TOTAL_STEPS_DIEHARDER} => {progress}%")
                cache.set(f"{job_id}_progress_dieharder", progress, timeout=3600)
                # Update Supabase progress
                supabase.table("results3").update({"progress": progress}) \
                    .eq("user_id", int(user_id)).eq("line", int(line_number)).execute()
            except Exception as e:
                logger.warning(f"[DIEHARDER PROGRESS WARN] could not update progress: {e}")

        update_progress(1)

        # 🗝️ Acquire lock FIRST
        if not DieharderTaskLock.acquire_dieharder_lock(user_id):
            logger.warning(f"🔒 [DIEHARDER LOCK FAILED] Could not acquire lock for user={user_id}")
            return {"status": "locked", "message": f"Another Dieharder task running for user {user_id}"}

        logger.info(f"✅ [DIEHARDER LOCK ACQUIRED] user={user_id}")

        # Scheduled time check
        kolkata_tz = pytz.timezone("Asia/Kolkata")
        scheduled_time_str = job_data.get('scheduled_time_str')
        scheduled_time = kolkata_tz.localize(datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S"))
        current_time = datetime.datetime.now(kolkata_tz)
        time_diff = (scheduled_time - current_time).total_seconds()
        logger.info(f"⏰ [DIEHARDER TIME CHECK] now={current_time.isoformat()} scheduled={scheduled_time.isoformat()} diff={time_diff}s")

        if time_diff > 0:
            logger.info(f"⏳ [DIEHARDER DEFER] Job {job_id} scheduled for future. Scheduling new Celery task after {time_diff}s")
            update_progress(2)
            DieharderTaskLock.release_dieharder_lock(user_id)  # Release only when deferring

            # Schedule the same task to run after the required delay
            execute_dieharder_tests.apply_async(
                kwargs={'job_data': job_data},
                countdown=int(time_diff),
                queue='dieharder_tests'
            )

            # ✅ CRITICAL: Return immediately to stop current task execution
            return {"status": "scheduled", "delay_seconds": time_diff}

        # ✅ Only proceed with test execution if time_diff <= 0
        update_progress(2)

        # File checks
        uploaded_file_path = job_data.get('uploaded_file_path')
        if not uploaded_file_path or not os.path.exists(uploaded_file_path):
            logger.error(f"❌ [DIEHARDER FILE NOT FOUND] {uploaded_file_path}")
            raise Exception(f"File not found: {uploaded_file_path}")

        file_size_bytes = os.path.getsize(uploaded_file_path)
        logger.info(f"📊 [DIEHARDER FILE INFO] {uploaded_file_path} size_bytes={file_size_bytes}")

        # Define Dieharder test IDs
        dieharder_test_ids = [
            "2", "1", "4", "5", "6", "7", "8", "9", "10", "11", "12",
            "13", "14", "15", "16", "17"
        ]

        update_progress(3)

        results = []
        passed_count = 0
        step_counter = 4
        combined_output = ""

        # Dieharder executable path
        dieharder_executable = str(settings.TESTS_DIR / "dieharder-2.6.24/dieharder/dieharder")

        if not os.path.isfile(dieharder_executable) or not os.access(dieharder_executable, os.X_OK):
            logger.error(f"❌ [DIEHARDER EXECUTABLE MISSING] {dieharder_executable}")
            raise Exception(f"Dieharder executable not found or not executable: {dieharder_executable}")

        # ✅ Function to clean and sanitize output
        def clean_output(text):
            """Remove binary characters and ensure clean text output"""
            if not text:
                return ""
            
            # If bytes, decode first
            if isinstance(text, bytes):
                try:
                    text = text.decode('utf-8', errors='replace')
                except:
                    text = text.decode('latin-1', errors='replace')
            
            # Remove non-printable characters except newlines, tabs, and carriage returns
            cleaned = ""
            for char in text:
                if (32 <= ord(char) <= 126) or char in '\n\r\t':
                    cleaned += char
                else:
                    # Replace with space or remove (for control characters)
                    if ord(char) in [9, 10, 13]:  # tab, newline, carriage return
                        cleaned += char
                    else:
                        cleaned += ' '  # replace other non-printables with space
            
            # Remove excessive whitespace
            cleaned = re.sub(r'[ \t]+', ' ', cleaned)
            cleaned = re.sub(r'\n\s*\n', '\n\n', cleaned)
            
            return cleaned.strip()

        # Run each Dieharder test
        for test_id in dieharder_test_ids:
            command = [
                dieharder_executable,
                "-d", test_id,
                "-g", "66",  # raw binary input
                "-f", uploaded_file_path
            ]

            try:
                logger.info(f"🔧 [DIEHARDER RUNNING TEST] Test ID: {test_id}")
                
                # ✅ Use text mode with explicit encoding
                process = subprocess.run(
                    command,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    text=True,  # ✅ Force text mode
                    encoding='utf-8',  # ✅ Explicit encoding
                    errors='replace',  # ✅ Replace encoding errors
                    timeout=300  # 5 minutes timeout per test
                )
                
                # ✅ Clean both stdout and stderr
                output = clean_output(process.stdout)
                error_output = clean_output(process.stderr)

                logger.info(f"=== Dieharder Test {test_id} Output ===")
                logger.info(output[:500] + "..." if len(output) > 500 else output)  # Log first 500 chars
                
                if error_output:
                    logger.error(f"=== Dieharder Test {test_id} Error ===")
                    logger.error(error_output[:500] + "..." if len(error_output) > 500 else error_output)

                # ✅ Add cleaned output to combined output
                test_output = f"=== Output for test {test_id} ===\n{output}\n"
                if error_output:
                    test_output += f"=== Errors for test {test_id} ===\n{error_output}\n"
                test_output += "\n"
                
                combined_output += test_output

                # Parse results from cleaned output
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

                test_result = {
                    "test_id": test_id,
                    "p_value": p_value if p_value is not None else 0.0,
                    "assessment": assessment or "non-random number"
                }

                if assessment and "PASSED" in assessment.upper():
                    passed_count += 1
                    test_result["result"] = "random number"
                else:
                    test_result["result"] = "non-random number"

                results.append(test_result)

            except subprocess.TimeoutExpired:
                logger.error(f"⏰ [DIEHARDER TIMEOUT] Test {test_id} timed out")
                results.append({
                    "test_id": test_id, 
                    "error": "Timeout", 
                    "result": "non-random number"
                })
                combined_output += f"=== Output for test {test_id} ===\nTimeout: Test took longer than 5 minutes\n\n"
                
            except Exception as e:
                logger.error(f"❌ [DIEHARDER TEST ERROR] Test {test_id}: {e}")
                results.append({
                    "test_id": test_id, 
                    "error": str(e), 
                    "result": "non-random number"
                })
                combined_output += f"=== Output for test {test_id} ===\nError: {str(e)}\n\n"

            step_counter += 1
            update_progress(step_counter)

        # ✅ Final cleaning of combined output before storage
        combined_output = clean_output(combined_output)
        
        # ✅ Store cleaned combined output in cache
        cache.set(f"{line_number}_download_dieharder", combined_output, timeout=3600)
        logger.info(f"✅ [DIEHARDER OUTPUT STORED] line={line_number}, output_length={len(combined_output)}")
        
        # ✅ Also store in job cache for backward compatibility
        cache.set(f"{job_id}_raw_output_dieharder", combined_output, timeout=3600)
        
        update_progress(19)

        # Final verdict
        final_text = "random number" if passed_count > len(dieharder_test_ids) / 2 else "non-random number"
        executed_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        logger.info(f"🏁 [DIEHARDER VERDICT] job={job_id} verdict={final_text} passed={passed_count}/{len(dieharder_test_ids)}")

        # Store results in cache
        job_results = {
            "job_id": job_id,
            "tests": results,
            "final_result": final_text,
            "executed_at": executed_at,
            "passed_count": passed_count,
            "total_tests": len(dieharder_test_ids)
        }
        cache.set(f"{line_number}_results_dieharder", job_results, timeout=3600)

        update_progress(20)

        # Upload final results to Supabase
        try:
            current_time = datetime.datetime.now().isoformat()
            supabase.table("results3").upsert(
                {
                    "user_id": int(user_id),
                    "line": int(line_number),
                    "binary_data": " ",
                    "scheduled_time": scheduled_time.isoformat(),
                    "upload_time": current_time,
                    "result": final_text,
                    "progress": 100,
                    "file_name": fileName,
                    "updated_at": current_time
                },
                ignore_duplicates=False
            ).execute()
            logger.info("[DIEHARDER SUPABASE] final result upserted")
        except Exception as e:
            logger.warning(f"[DIEHARDER SUPABASE WARN] could not upsert final result: {e}")

        logger.info(f"✅ [DIEHARDER TASK SUCCESS] job={job_id}")
        return {
            "status": "completed", 
            "job_id": job_id, 
            "final_result": final_text,
            "tests": results,
            "passed_count": passed_count,
            "total_tests": len(dieharder_test_ids)
        }

    except Exception as e:
        logger.error(f"💥 [DIEHARDER TASK ERROR] job={job_id} error={e}")
        logger.error("".join(traceback.format_exc()))
        raise

    finally:
        # Always clean up - release lock and remove temp files
        try:
            DieharderTaskLock.release_dieharder_lock(user_id)
            logger.info(f"🔓 [DIEHARDER LOCK RELEASED] user={user_id}")
        except Exception as e:
            logger.warning(f"⚠️ [DIEHARDER LOCK RELEASE ERROR] {e}")

        if uploaded_file_path and os.path.exists(uploaded_file_path):
            try:
                os.remove(uploaded_file_path)
                logger.info(f"🗑️ [DIEHARDER FILE REMOVED] {uploaded_file_path}")
            except Exception as e:
                logger.warning(f"⚠️ [DIEHARDER CLEANUP ERROR] {e}")

# @csrf_exempt
# def generate_final_ans_dieharder(request):
#     """
#     Accepts a .bin file via POST and runs Dieharder tests.
#     Uses queue-based execution similar to other tests.
#     """
#     if request.method != "POST":
#         return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

#     try:
#         # Read form fields
#         file = request.FILES.get('file')
#         scheduled_time_str = request.POST.get('scheduled_time', '')
#         job_id = request.POST.get('job_id', str(uuid.uuid4()))
#         line_number = request.POST.get('line', '')
#         userId = request.POST.get('user_id', '')
#         fileName = request.POST.get('file_name', file.name if file else '')

#         if not file:
#             return JsonResponse({"error": "No file uploaded"}, status=400)

#         if not scheduled_time_str:
#             return JsonResponse({"error": "scheduled_time is required"}, status=400)

#         if not userId:
#             return JsonResponse({"error": "user_id is required"}, status=400)

#         # Save uploaded file to temporary location
#         temp_file_path = os.path.join(settings.TESTS_DIR, f"{job_id}_{file.name}")
#         with open(temp_file_path, "wb+") as f:
#             for chunk in file.chunks():
#                 f.write(chunk)

#         # Prepare job_data
#         job_data = {
#             'uploaded_file_path': temp_file_path,
#             'scheduled_time_str': scheduled_time_str,
#             'job_id': job_id,
#             'line_number': line_number,
#             'userId': userId,
#             'fileName': fileName,
#         }

#         # Calculate countdown for scheduling
#         kolkata_tz = pytz.timezone("Asia/Kolkata")
#         scheduled_time = kolkata_tz.localize(datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S"))
#         current_time = datetime.datetime.now(kolkata_tz)
#         countdown = max(0, int((scheduled_time - current_time).total_seconds()))

#         # Set initial progress
#         cache.set(f"{job_id}_progress_dieharder", 0, timeout=3600)

#         # Queue Celery task
#         task = execute_dieharder_tests.apply_async(
#             kwargs={'job_data': job_data}, 
#             countdown=0,  # Start immediately, let task handle deferral
#             queue='dieharder_tests'
#         )

#         message = "Dieharder tests processing started" if countdown == 0 else "Dieharder tests scheduled"
#         return JsonResponse({
#             "status": "success",
#             "job_id": job_id,
#             "task_id": task.id,
#             "message": message,
#             "scheduled_time": scheduled_time_str,
#         })

#     except Exception as e:
#         logger.error(f"[RUN_DIEHARDER ERROR] {e}")
#         return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def generate_final_ans_dieharder(request):
    """
    Accepts a .bin file via POST and runs Dieharder tests.
    Streams upload directly to disk (chunked) to avoid memory spikes for large files.
    Queues execution via Celery.
    """
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

    try:
        uploaded_file = request.FILES.get("file")
        scheduled_time_str = request.POST.get("scheduled_time", "")
        job_id = request.POST.get("job_id", str(uuid.uuid4()))
        line_number = request.POST.get("line", "")
        userId = request.POST.get("user_id", "")
        # uploaded_file may be None, handle below
        fileName = uploaded_file.name if uploaded_file else request.POST.get("file_name", "")

        if not uploaded_file:
            return JsonResponse({"error": "No file uploaded"}, status=400)
        if not scheduled_time_str:
            return JsonResponse({"error": "scheduled_time is required"}, status=400)
        if not userId:
            return JsonResponse({"error": "user_id is required"}, status=400)
        if not line_number or not str(line_number).strip():
            return JsonResponse({"error": "line is required"}, status=400)

        # Ensure tests directory exists (use settings.TESTS_DIR as in your code)
        os.makedirs(settings.TESTS_DIR, exist_ok=True)

        # Build disk path (no big memory usage)
        temp_file_path = os.path.join(settings.TESTS_DIR, f"{job_id}_{fileName}")

        # Write to disk chunk-by-chunk
        # use a reasonably large chunk (e.g. 5MB) to reduce syscall overhead but avoid RAM spikes
        chunk_size = 5 * 1024 * 1024
        written = 0
        with open(temp_file_path, "wb") as dest:
            for i, chunk in enumerate(uploaded_file.chunks(chunk_size=chunk_size)):
                dest.write(chunk)
                written += len(chunk)
                logger.warning(f"[UPLOAD-DIEHARDER] wrote chunk #{i} size={len(chunk)} bytes (total_written={written})")

        logger.warning(f"[UPLOAD-DIEHARDER COMPLETE] File saved to {temp_file_path} (bytes={written})")

        # Prepare job_data (pass path only)
        job_data = {
            "uploaded_file_path": temp_file_path,
            "scheduled_time_str": scheduled_time_str,
            "job_id": job_id,
            "line_number": line_number,
            "userId": userId,
            "fileName": fileName,
        }

        # Calculate countdown for scheduling
        kolkata_tz = pytz.timezone("Asia/Kolkata")
        scheduled_time = kolkata_tz.localize(
            datetime.datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S")
        )
        current_time = datetime.datetime.now(kolkata_tz)
        countdown = max(0, int((scheduled_time - current_time).total_seconds()))

        # Set initial progress
        cache.set(f"{job_id}_progress_dieharder", 0, timeout=3600)

        # Queue the Celery task (use countdown computed above)
        task = execute_dieharder_tests.apply_async(
            kwargs={"job_data": job_data},
            countdown=countdown,
            queue="dieharder_tests"
        )

        message = "Dieharder tests processing started" if countdown == 0 else "Dieharder tests scheduled"
        return JsonResponse({
            "status": "success",
            "job_id": job_id,
            "task_id": task.id,
            "message": message,
            "scheduled_time": scheduled_time_str,
        })

    except Exception as e:
        logger.error(f"[RUN_DIEHARDER ERROR] {e}", exc_info=True)
        # Attempt cleanup of partially written file
        try:
            if 'temp_file_path' in locals() and os.path.exists(temp_file_path):
                os.remove(temp_file_path)
                logger.warning(f"[CLEANUP] removed partial file {temp_file_path}")
        except Exception as cleanup_err:
            logger.warning(f"[CLEANUP ERROR] could not remove {temp_file_path}: {cleanup_err}")
        return JsonResponse({"error": str(e)}, status=500)


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
def get_progress_dieharder(request, line_number):
    """
    Get progress for Dieharder tests by line number
    """
    try:
        # Get the latest job_id for this line_number from cache or database
        job_results = cache.get(f"{line_number}_results_dieharder")
        if job_results:
            job_id = job_results.get('job_id')
            progress = cache.get(f"{job_id}_progress_dieharder", 0)
        else:
            # Fallback: try to get progress from Supabase
            try:
                response = supabase.table("results3").select("progress").eq("line", int(line_number)).execute()
                if response.data:
                    progress = response.data[0].get('progress', 0)
                else:
                    progress = 0
            except Exception as e:
                progress = 0
        
        return JsonResponse({"progress": int(progress), "line_number": line_number})
    
    except Exception as e:
        logger.error(f"[GET_PROGRESS_DIEHARDER ERROR] line_number={line_number}: {e}")
        return JsonResponse({"progress": 0, "line_number": line_number})

@csrf_exempt
def get_output_dieharder(request, line_number):
    """
    Get output for Dieharder tests by line number
    """
    try:
        output = cache.get(f"{line_number}_download_dieharder", "")
        
        if not output:
            # Try to get from job results cache
            job_results = cache.get(f"{line_number}_results_dieharder")
            if job_results and 'job_id' in job_results:
                job_id = job_results['job_id']
                output = cache.get(f"{job_id}_raw_output_dieharder", "")
        
        if not output:
            output = "No output available for this line number."
        
        # ✅ Ensure output is string (not bytes)
        if isinstance(output, bytes):
            output = output.decode('utf-8', errors='ignore')
        
        return JsonResponse({"output": output, "line_number": line_number})
    
    except Exception as e:
        logger.error(f"[GET_OUTPUT_DIEHARDER ERROR] line_number={line_number}: {e}")
        return JsonResponse({"output": f"Error retrieving output: {str(e)}", "line_number": line_number})

import os
import paramiko
from django.http import JsonResponse, FileResponse
from django.conf import settings
import tempfile
import subprocess
from django.views.decorators.csrf import csrf_exempt

# SSH configuration (default values)
SSH_HOST = "34.131.201.196"
SSH_USER = "qunu"
SSH_KEY = os.path.join(settings.BASE_DIR, "qunu-gcp.pem")  # PEM file stored securely
WRAPPER_SCRIPT = "/home/qunu/fetch_qrng.sh"  # wrapper script on VM
REMOTE_DIR = "/home/qunu/qrng_files"  # must match wrapper script output

@csrf_exempt
def fetch_qrng(request):
    """
    Endpoint: POST /api/fetch-qrng
    Body: { "size_mb": 1, "host": "optional_ip" }
    """
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)

    try:
        # Parse data from request
        if request.content_type == "application/json":
            import json
            data = json.loads(request.body)
        else:
            data = request.POST

        size_mb = int(data.get("size_mb", 1))
        size_mb = min(max(size_mb, 1), 10)  # Limit between 1-10MB
        
        # Get host from request, use default if not provided
        custom_host = data.get("host")
        
        # Use custom host if provided, otherwise use default
        ssh_host = custom_host if custom_host else SSH_HOST
        ssh_user = SSH_USER  # Keep user same
        ssh_key = SSH_KEY   # Keep key same

        # Create a temporary local file
        tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".bin")
        tmp_file.close()
        local_path = tmp_file.name

        # Connect to remote VM via SSH
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        
        # Connect using the determined host (uses default SSH port 22)
        ssh.connect(ssh_host, username=ssh_user, key_filename=ssh_key)

        # Run wrapper script on remote VM using sudo
        remote_file_path = f"{REMOTE_DIR}/qrng_{size_mb}MB.bin"
        dd_cmd = f"sudo {WRAPPER_SCRIPT} {size_mb}"

        stdin, stdout, stderr = ssh.exec_command(dd_cmd)
        exit_status = stdout.channel.recv_exit_status()
        if exit_status != 0:
            error_msg = stderr.read().decode()
            ssh.close()
            return JsonResponse({"error": error_msg}, status=500)

        # Fetch the generated binary via SFTP
        sftp = ssh.open_sftp()
        sftp.get(remote_file_path, local_path)
        sftp.remove(remote_file_path)  # Clean up remote file
        sftp.close()
        ssh.close()

        # Run your existing randomness tests on the local file
        result = subprocess.run(
            ["python3", "server_tests.py", local_path],
            capture_output=True,
            text=True,
        )

        # Return the binary file for download
        response = FileResponse(open(local_path, "rb"), as_attachment=True, filename="qrng.bin")
        return response

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500),

import os
import tempfile

def save_uploaded_file_to_disk(uploaded_file, dest_dir, prefix=""):
    os.makedirs(dest_dir, exist_ok=True)
    suffix = os.path.splitext(getattr(uploaded_file, "name", ""))[1] or ".bin"
    tmp = tempfile.NamedTemporaryFile(delete=False, prefix=prefix, suffix=suffix, dir=dest_dir)
    try:
        for chunk in uploaded_file.chunks():
            tmp.write(chunk)
        tmp.flush()
        path = tmp.name
    finally:
        tmp.close()
    return path