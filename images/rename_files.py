import os

def rename_files_in_folder(folder_path):
    # List all files in the specified directory
    for filename in os.listdir(folder_path):
        # Check if the file name contains the string to be removed
        if '-removebg-preview' in filename:
            # Generate the new file name by replacing the target string
            new_filename = filename.replace('-removebg-preview', '')
            # Form the full file path for the old and new file names
            old_file = os.path.join(folder_path, filename)
            new_file = os.path.join(folder_path, new_filename)
            # Rename the file
            os.rename(old_file, new_file)
            print(f'Renamed: {filename} to {new_filename}')

# Specify the path to your folder here
folder_path = 'C:\\Users\\Tsidia\\Desktop\\Asteroids\\images'

# Call the function to rename files
rename_files_in_folder(folder_path)
