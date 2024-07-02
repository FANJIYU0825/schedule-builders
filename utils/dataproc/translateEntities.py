import json
import html
import sys

if len(sys.argv) != 2:
    print("Usage: python translateEntities.py <input json file>")
    exit(1)

def decode_entities(json_file):
    with open(json_file, 'r') as file:
        data = json.load(file)

    def remove_html_entities(data):
        if isinstance(data, dict):
            for key, value in data.items():
                data[key] = remove_html_entities(value)
        elif isinstance(data, list):
            for i in range(len(data)):
                data[i] = remove_html_entities(data[i])
        elif isinstance(data, str):
            data = html.unescape(data)
        return data

    cleaned_data = remove_html_entities(data)

    with open(json_file, 'w') as file:
        json.dump(cleaned_data, file, ensure_ascii=False, indent=4)

decode_entities(sys.argv[1])

