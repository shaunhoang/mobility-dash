import pandas as pd
import os

# Define the directories to process
dir_names = ['datacatalogue', 'kpi']

# Construct the source and destination paths
source_dirs = [f'data-source/{d}' for d in dir_names]
json_dirs = [f'public/data/{d}' for d in dir_names]

# Loop through each source and destination pair
for csv_source_dir, json_output_dir in zip(source_dirs, json_dirs):

    print(f"Starting conversion from '{csv_source_dir}' to '{json_output_dir}'...")

    # Check if the source directory exists before proceeding
    if not os.path.isdir(csv_source_dir):
        print(f"  - Warning: Source directory not found, skipping: {csv_source_dir}")
        continue

    # Create the output directory if it doesn't exist
    os.makedirs(json_output_dir, exist_ok=True)

    # Loop through all files in the source directory
    for filename in os.listdir(csv_source_dir):
        if filename.endswith('.csv'):
            csv_file_path = os.path.join(csv_source_dir, filename)
            json_filename = filename.replace('.csv', '.json')
            json_output_path = os.path.join(json_output_dir, json_filename)
            
            print(f"  - Converting '{csv_file_path}' to '{json_output_path}'")

            try:
                # Read the CSV file
                df = pd.read_csv(csv_file_path)
                
                # Convert and save to JSON
                df.to_json(json_output_path, orient='records', indent=2)
            except Exception as e:
                print(f"    Error converting file {filename}: {e}")

print("Conversion complete.")
