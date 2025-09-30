import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings")
django.setup()

from django.core.cache import cache

results = cache.get(f"{12345}_results90b")
print(results)
