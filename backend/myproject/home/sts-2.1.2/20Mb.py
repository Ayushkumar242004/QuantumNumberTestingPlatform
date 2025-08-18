import os
import random

def generate_binary_txt_file(filename="binary_data.txt", size_mb=20):
    size_in_bytes = size_mb * 1024*150   # Convert MB to bytes
    num_bits = size_in_bytes * 8           # Since 1 byte = 8 bits

    with open(filename, "w") as f:
        # Generate in chunks to avoid memory issues
        chunk_size = 1_000_000  # 1 million bits per chunk
        bits_written = 0

        while bits_written < num_bits:
            remaining = num_bits - bits_written
            current_chunk_size = min(chunk_size, remaining)
            binary_chunk = ''.join(random.choices('01', k=current_chunk_size))
            f.write(binary_chunk)
            bits_written += current_chunk_size

    print(f"✅ File '{filename}' with {size_mb}MB of binary data generated.")

# Example usage:
generate_binary_txt_file()
