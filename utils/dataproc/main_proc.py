import os
import sys

if len(sys.argv) != 2:
    print("Usage: python3 main_proc.py <input json file>")
    exit(1)

# remove .json from filename
output_filename = sys.argv[1][:-5] + '_preproc.json'

os.system('python preproc.py ' + sys.argv[1] + ' ' + output_filename)
os.system('python translateEntities.py ' + output_filename)
os.system('python removehtml.py ' + output_filename)
os.system('python split.py ' + output_filename)
os.system('rm ' + output_filename)