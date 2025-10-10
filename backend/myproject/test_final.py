# test_final.py
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from home.tasks import execute_nist_tests

print("Testing Celery-Redis connection...")

try:
    result = execute_nist_tests.apply_async(
        kwargs={'job_data': {
            'uploaded_file_path': '/tmp/test',
            'scheduled_time_str': '2025-10-08 11:00:00',
            'job_id': 'test-final',
            'line_number': '1', 
            'userId': '123',
            'fileName': 'test.bin'
        }}
    )
    print(f"✅ SUCCESS: Task submitted with ID: {result.id}")
except Exception as e:
    print(f"❌ FAILED: {e}")
    import traceback
    traceback.print_exc()