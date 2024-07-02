import json
import sys

if len(sys.argv) != 3:
    print("Usage: python3 preproc.py <input json file> <output json file>")
    exit(1)

with open(sys.argv[1]) as f:
    data = json.load(f)

for obj in data:
    academic_period = obj['academicPeriodName']
    year = academic_period[:4]
    period = obj['period']

    if academic_period.endswith('p1') or academic_period.endswith('p2'):
        obj['academicPeriodName'] = f"Spring {year}"
    elif academic_period.endswith('p4') or academic_period.endswith('p5'):
        obj['academicPeriodName'] = f"Autumn {year}"
    else:
        del obj
        continue

    if period == 'P':
        obj['period'] = 'First cycle'
    elif period == 'V':
        obj['period'] = 'Second cycle'
    elif period == 'G':
        obj['period'] = 'General entry requirements'

    del obj['remarks']
    del obj['language']
    del obj['durationAcademicPeriods']
    del obj['teacher']
    del obj['externalID']
    del obj['pleaseNote']
    del obj['syllabus']

with open(sys.argv[2], 'w') as f:
    json.dump(data, f, indent=2)

