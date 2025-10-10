import os
from celery import Celery
import logging
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

app = Celery('myproject')

app.config_from_object('django.conf:settings', namespace='CELERY')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)

# Configure task routes and queues
app.conf.task_routes = {
    'accounts.tasks.*': {'queue': 'accounts'},
    'reports.tasks.*': {'queue': 'reports'},
    '*.execute_nist_tests': {'queue': 'nist_tests'},
}

# Task-specific settings for better concurrency control
app.conf.task_acks_late = True
app.conf.task_reject_on_worker_lost = True
app.conf.worker_prefetch_multiplier = 1  # Process one task at a time per worker
app.conf.worker_max_tasks_per_child = 100  # Restart worker after 100 tasks
app.conf.worker_disable_rate_limits = False

# Serialization
app.conf.task_serializer = 'json'
app.conf.result_serializer = 'json'
app.conf.accept_content = ['json']

# Result backend settings
app.conf.result_backend_transport_options = {
    'master_name': 'mymaster',
    'retry_policy': {
        'timeout': 5.0
    }
}

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')