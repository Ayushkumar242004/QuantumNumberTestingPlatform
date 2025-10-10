from celery import Task
from django.core.cache import cache
import time

class SingleTaskLock:
    """Prevent multiple instances of the same task from running concurrently"""
    
    @staticmethod
    def acquire_lock(task_id, timeout=3600):
        """Acquire a lock for a task"""
        return cache.add(f'task_lock_{task_id}', 'true', timeout)
    
    @staticmethod
    def release_lock(task_id):
        """Release a lock for a task"""
        cache.delete(f'task_lock_{task_id}')

class ThrottledTask(Task):
    """Base task class with throttling support"""
    
    def __init__(self):
        self.lock_timeout = 3600  # 1 hour
    
    def acquire_lock(self, *args, **kwargs):
        lock_key = self.get_lock_key(*args, **kwargs)
        return SingleTaskLock.acquire_lock(lock_key, self.lock_timeout)
    
    def release_lock(self, *args, **kwargs):
        lock_key = self.get_lock_key(*args, **kwargs)
        SingleTaskLock.release_lock(lock_key)
    
    def get_lock_key(self, *args, **kwargs):
        """Override this to create custom lock keys"""
        return f"{self.name}_{str(kwargs)}"