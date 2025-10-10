# task_locks.py - CORRECTED VERSION
from django.core.cache import cache
import time

class TaskLock:
    """Utility class to handle task locking for concurrent execution prevention"""
    
    @staticmethod
    def acquire_lock(lock_key, timeout=3600):
        """
        Acquire a lock for a task
        Returns True if lock acquired, False if already locked
        """
        return cache.add(f'task_lock_{lock_key}', 'true', timeout)
    
    @staticmethod
    def release_lock(lock_key):
        """Release a lock for a task"""
        cache.delete(f'task_lock_{lock_key}')
    
    @staticmethod
    def is_locked(lock_key):
        """Check if a task is currently locked"""
        return cache.get(f'task_lock_{lock_key}') is not None

from django.core.cache import cache
import json

class NISTTaskLock:
    """Simple Redis/Cache-based lock & queue manager for NIST tasks."""

    @staticmethod
    def acquire_nist_lock(user_id: int) -> bool:
        """Try to acquire a lock for a given user."""
        key = f"nist_lock_{user_id}"
        if cache.get(key):
            return False
        cache.set(key, "locked", timeout=3600)
        return True

    @staticmethod
    def release_nist_lock(user_id: int):
        """Release lock for a user."""
        cache.delete(f"nist_lock_{user_id}")

    @staticmethod
    def add_to_queue(user_id: int, job_data: dict) -> int:
        """Add job to user queue."""
        qkey = f"nist_queue_{user_id}"
        queue = json.loads(cache.get(qkey) or "[]")
        queue.append(job_data)
        cache.set(qkey, json.dumps(queue), timeout=3600)
        return len(queue)

    @staticmethod
    def get_next_job(user_id: int):
        """Pop the next job from the queue."""
        qkey = f"nist_queue_{user_id}"
        queue = json.loads(cache.get(qkey) or "[]")
        if not queue:
            return None
        next_job = queue.pop(0)
        cache.set(qkey, json.dumps(queue), timeout=3600)
        return next_job
