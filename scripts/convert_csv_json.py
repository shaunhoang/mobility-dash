import pandas as pd
import os

source_root = 'data-source'
destination_root = 'public/data'

# --- Script ---

# Check if the source directory exists to prevent errors
if not os.path.isdir(source_root):
    print(f"Error: Source directory '{source_root}' not found. Please create it and add your CSV files.")
    exit()

print(f"Starting conversion from '{source_root}' to '{destination_root}'...")

for dirpath, dirnames, filenames in os.walk(source_root):
    # Preserves the folder structure (e.g., 'data-source/kpi' -> 'public/data/kpi')
    relative_path = os.path.relpath(dirpath, source_root)
    destination_dir = os.path.join(destination_root, relative_path)

    # Create the destination folder if it doesn't already exist
    os.makedirs(destination_dir, exist_ok=True)

    # Loop through all files found in the current directory
    for filename in filenames:
        # Process only the .csv files
        if filename.endswith('.csv'):
            source_file_path = os.path.join(dirpath, filename)
            
            # Create the new JSON filename
            json_filename = filename.replace('.csv', '.json')
            destination_file_path = os.path.join(destination_dir, json_filename)
            
            print(f"  - Converting '{source_file_path}' to '{destination_file_path}'")

            try:
                # Read the CSV file using pandas
                df = pd.read_csv(source_file_path)
                
                # Convert and save the DataFrame to a JSON file
                df.to_json(destination_file_path, orient='records', indent=2)
            except Exception as e:
                print(f"    An error occurred with {filename}: {e}")

print("\nConversion complete.")
