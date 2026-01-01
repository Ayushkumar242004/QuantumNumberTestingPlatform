import google.generativeai as genai
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
import pathlib, logging

logger = logging.getLogger(__name__)

class ReportUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        uploaded_file = request.FILES.get("file")
        api_key = request.data.get("api_key", "").strip()
        
        if not uploaded_file:
            return Response({"error": "No file uploaded"}, status=400)
        
        if not api_key:
            return Response({"error": "API key is required. Please provide your Gemini API key."}, status=400)

        try:
            # Configure Gemini API with user-provided key
            genai.configure(api_key=api_key)
            
            file_path = pathlib.Path(f"/tmp/{uploaded_file.name}")
            with file_path.open("wb") as f:
                for chunk in uploaded_file.chunks():
                    f.write(chunk)

            print("📄 PDF saved locally for processing.")

            # Upload PDF to Gemini
            try:
                uploaded_doc = genai.upload_file(path=str(file_path))
            except Exception as upload_error:
                logger.error(f"Error uploading file to Gemini: {str(upload_error)}", exc_info=True)
                error_msg = str(upload_error)
                if "API key" in error_msg or "authentication" in error_msg.lower() or "invalid" in error_msg.lower():
                    return Response({
                        "error": f"Invalid API key. Please check your Gemini API key and try again.",
                        "details": error_msg
                    }, status=401)
                elif "quota" in error_msg.lower() or "limit" in error_msg.lower():
                    return Response({
                        "error": f"API quota exceeded. Please check your Gemini API quota.",
                        "details": error_msg
                    }, status=429)
                else:
                    return Response({
                        "error": f"Failed to upload file to Gemini: {error_msg}",
                        "details": error_msg
                    }, status=400)

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
            - Extract each test's result (Pass / Fail / Weak / Non-Random).
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
            - "Tests Detected"
            - "Summary Table (Passed / Failed / Weak / Total)"
            - "Detailed Interpretation"
            - "Final Randomness Verdict"

            Be precise, structured, and avoid inventing results. Base everything strictly on the content of the uploaded document.
            """

            try:
                # Using gemini-1.5-flash for better free tier availability
                # Alternative models: gemini-1.5-pro, gemini-2.0-flash-exp
                model = genai.GenerativeModel("models/gemini-2.5-flash")
                response = model.generate_content([prompt, uploaded_doc])
                
                if not response or not response.text:
                    return Response({
                        "error": "No response received from Gemini API. Please try again.",
                        "details": "Empty response from model"
                    }, status=500)
                
                return Response({"analysis": response.text}, status=200)
                
            except Exception as genai_error:
                logger.error(f"Error generating content with Gemini: {str(genai_error)}", exc_info=True)
                error_msg = str(genai_error)
                
                # Handle specific Gemini API errors
                if "API key" in error_msg or "authentication" in error_msg.lower() or "invalid" in error_msg.lower() or "unauthorized" in error_msg.lower():
                    return Response({
                        "error": "Invalid API key. Please check your Gemini API key and try again.",
                        "details": error_msg
                    }, status=401)
                elif "quota" in error_msg.lower() or "limit" in error_msg.lower() or "429" in error_msg:
                    return Response({
                        "error": "API quota exceeded. Please check your Gemini API quota or try again later.",
                        "details": error_msg
                    }, status=429)
                elif "permission" in error_msg.lower() or "forbidden" in error_msg.lower() or "403" in error_msg:
                    return Response({
                        "error": "Permission denied. Please check your API key permissions.",
                        "details": error_msg
                    }, status=403)
                elif "model" in error_msg.lower() and "not found" in error_msg.lower():
                    return Response({
                        "error": "Model not found. Please check if the model name is correct.",
                        "details": error_msg
                    }, status=400)
                else:
                    return Response({
                        "error": f"Gemini API error: {error_msg}",
                        "details": error_msg
                    }, status=500)

        except Exception as e:
            logger.error(f"Error while processing: {str(e)}", exc_info=True)
            error_msg = str(e)
            return Response({
                "error": f"An error occurred while processing your request: {error_msg}",
                "details": error_msg
            }, status=500)