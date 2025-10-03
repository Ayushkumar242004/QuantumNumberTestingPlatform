import google.generativeai as genai
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
import pathlib, logging

logger = logging.getLogger(__name__)

# Configure Gemini API
genai.configure(api_key="AIzaSyBilGYGxTG5bsaL7_pArtgTRPBgAA-IOK8")

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

            prompt = """This file consists of NIST and Dieharder tests...
                        [your full prompt here]"""

            model = genai.GenerativeModel("models/gemini-2.5-flash")
            response = model.generate_content([prompt, uploaded_doc])

            return Response({"analysis": response.text}, status=200)

        except Exception as e:
            logger.error(f"Error while processing: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=500)