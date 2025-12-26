# clear_locks.py
from django.core.cache import cache
import redis

def clear_stuck_locks():
    print("🧹 [CLEARING STUCK LOCKS]")
    
    r = redis.Redis(host='100.86.167.54', port=6379, db=0)
    
    # Clear all nist-related locks for user 63
    lock_pattern = "task_lock_nist_63_*"
    lock_keys = r.keys(lock_pattern)
    
    for key in lock_keys:
        print(f"🗑️ [REMOVING LOCK] {key.decode()}")
        r.delete(key)
    
    # Clear queue
    queue_key = "nist_queue_63"
    if r.exists(queue_key):
        r.delete(queue_key)
        print(f"🗑️ [REMOVED QUEUE] {queue_key}")
    
    print("✅ [LOCKS CLEARED]")

if __name__ == "__main__":
    clear_stuck_locks()