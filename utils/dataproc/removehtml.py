import json
import re
import sys

if len(sys.argv) != 2:
    print("Usage: python removehtml.py <input json file>")
    exit(1)

# Read the JSON file
filename = sys.argv[1]

with open(filename, 'r') as file:
    courses = json.load(file)

# Function to remove HTML tags from a string
def remove_html_tags(text):
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text)

# Iterate over the course objects and remove HTML tags from all fields
for course in courses:
    for key, value in course.items():
        if isinstance(value, str):
            course[key] = remove_html_tags(value)

# Save the modified objects back to the file
with open(filename, 'w') as file:
    json.dump(courses, file, indent=4)

print("HTML tags removed and updated JSON file saved.")
