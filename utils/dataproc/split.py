import json
import sys

if len(sys.argv) != 2:
    print("Usage: python split.py <input json file>")
    exit(1)

with open(sys.argv[1]) as f:
    data = json.load(f)

# Create four different lists based on the conditions
uppsala_autumn_2023 = [obj for obj in data if obj['campus'] == 'Uppsala' and obj['academicPeriodName'] == 'Autumn 2023']
uppsala_spring_2024 = [obj for obj in data if obj['campus'] == 'Uppsala' and obj['academicPeriodName'] == 'Spring 2024']
visby_autumn_2023 = [obj for obj in data if obj['campus'] == 'Visby' and obj['academicPeriodName'] == 'Autumn 2023']
visby_spring_2024 = [obj for obj in data if obj['campus'] == 'Visby' and obj['academicPeriodName'] == 'Spring 2024']

# Write each list to a separate file
with open('uppsala_autumn_2023.json', 'w') as f:
    json.dump(uppsala_autumn_2023, f, indent=2)

with open('uppsala_spring_2024.json', 'w') as f:
    json.dump(uppsala_spring_2024, f, indent=2)

with open('visby_autumn_2023.json', 'w') as f:
    json.dump(visby_autumn_2023, f, indent=2)

with open('visby_spring_2024.json', 'w') as f:
    json.dump(visby_spring_2024, f, indent=2)

