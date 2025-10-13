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

class NIST90BTaskLock:
    """Lock and queue management for NIST 90B tests with consistent JSON serialization"""
    
    @staticmethod
    def acquire_90b_lock(user_id):
        """Acquire lock for 90B tests"""
        lock_key = f"nist90b_lock_{user_id}"
        if cache.get(lock_key):
            return False
        cache.set(lock_key, True, timeout=3600)  # 1 hour timeout
        return True

    @staticmethod
    def release_90b_lock(user_id):
        """Release lock for 90B tests"""
        lock_key = f"nist90b_lock_{user_id}"
        cache.delete(lock_key)

    @staticmethod
    def add_to_90b_queue(user_id, job_data):
        """Add job to 90B queue with JSON serialization"""
        queue_key = f"nist90b_queue_{user_id}"
        queue_json = cache.get(queue_key)
        queue = json.loads(queue_json) if queue_json else []
        queue.append(job_data)
        cache.set(queue_key, json.dumps(queue), timeout=3600)
        return len(queue) - 1

    @staticmethod
    def get_90b_queue_length(user_id):
        """Get 90B queue length"""
        queue_key = f"nist90b_queue_{user_id}"
        queue_json = cache.get(queue_key)
        return len(json.loads(queue_json)) if queue_json else 0

    @staticmethod
    def get_next_90b_job(user_id):
        """Get next job from 90B queue"""
        queue_key = f"nist90b_queue_{user_id}"
        queue_json = cache.get(queue_key)
        if not queue_json:
            return None
        queue = json.loads(queue_json)
        if not queue:
            return None
        next_job = queue.pop(0)
        cache.set(queue_key, json.dumps(queue), timeout=3600)
        return next_job

    @staticmethod
    def update_90b_queue(user_id, queue):
        """Update 90B queue"""
        queue_key = f"nist90b_queue_{user_id}"
        cache.set(queue_key, json.dumps(queue), timeout=3600)