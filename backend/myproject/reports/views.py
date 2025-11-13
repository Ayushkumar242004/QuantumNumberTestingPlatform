import google.generativeai as genai
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
import pathlib, logging

logger = logging.getLogger(__name__)

# Configure Gemini API
genai.configure(api_key="AIzaSyB8IfudROmJXg9ovOM7EUVUCBpX8qxt3k0")

class ReportUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        uploaded_file = request.FILES.get("file")
        if not uploaded_file:
            return Response({"error": "No file uploaded"}, status=400)

        try:
            file_path = pathlib.Path(f"/tmp/{uploaded_file.name}")
            with file_path.open("wb") as f:
                for chunk in uploaded_file.chunks():
                    f.write(chunk)

            print("📄 PDF saved locally for processing.")

            # Upload PDF to Gemini
            uploaded_doc = genai.upload_file(path=str(file_path))

            prompt = """
            You are an expert in randomness testing and statistical test interpretation.

            The uploaded file contains one or more of these possible test suites:
            - NIST SP 800-22 Statistical Test Suite (NIST 22)
            - NIST SP 800-90B Entropy Estimation Tests (NIST 90B)
            - Dieharder Statistical Test Suite

            Your task:
            1. Automatically detect which test suites are present in the document. 
            (Some reports may have NIST 22 only, some NIST 90B only, some Dieharder only, or a combination of them.)

            2. For every test found:
            - Extract all test names.
            - Extract each test’s result (Pass / Fail / Weak / Non-Random).
            - Extract their p-values, scores, entropy estimates, or any relevant statistical numbers.
            - If a significance level α is mentioned (commonly 0.01), explain its meaning.

            3. Provide a summary analysis:
            - Count how many tests indicate **randomness**.
            - Count how many tests indicate **non-randomness** or **failure**.
            - If weak passes or borderline values exist, also count them.

            4. Give a final interpretation:
            - What do the test outcomes imply about randomness of the data?
            - Are the results strong or weak?
            - Mention significance of the reported numbers (p-value meaning, entropy significance, etc.).
            - If the document contains multiple types of randomness tests, compare and consolidate insights.

            5. Output Format:
            - “Tests Detected”
            - “Summary Table (Passed / Failed / Weak / Total)”
            - “Detailed Interpretation”
            - “Final Randomness Verdict”

            Be precise, structured, and avoid inventing results. Base everything strictly on the content of the uploaded document.
            """


            model = genai.GenerativeModel("models/gemini-2.5-pro")

            response = model.generate_content([prompt, uploaded_doc])

            return Response({"analysis": response.text}, status=200)

        except Exception as e:
            logger.error(f"Error while processing: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=500)