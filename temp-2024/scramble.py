import glob
import os
import json
import random

random.seed(201636415)

def update_votes(office, data):
    if isinstance(data, dict):
        for key, value in data.items():
            if key == 'votes':
                id = data['id']
                party = get_party(office, id)
                if party in ['gop', 'dem']:
                    data[key] = random.randint(10000, 20000)
                else:
                    data[key] = random.randint(100, 1000)
            else:
                update_votes(office, value)  # Recursively update nested dictionaries
    elif isinstance(data, list):
        for item in data:
            update_votes(office, item)  # Recursively update items in the list

def get_party(office, cnd_id: str):
    file_name = './temp-2024/2024-11-05-collection-' + office + '/combined.json'

    with open(file_name, 'r') as file:
        data: list = json.load(file)

        for c in data:
            candidates: dict = c['candidates']
            if cnd_id in candidates.keys():
                return candidates[cnd_id]['party']

def scramble_for_office(office):
    pattern = os.path.join('./temp-2024/' + office + '/', '*/counties.json')

    files = glob.glob(pattern)

    for file_name in files:

        with open(file_name, 'r') as file:
            try:
                data = json.load(file)
                id = data['id']
            except json.decoder.JSONDecodeError:
                print('json decode error in ' + file_name)
                continue

        update_votes(office, data)

        with open(file_name, 'w') as file:
            json.dump(data, file, indent=4)
            
scramble_for_office('president')
scramble_for_office('senate')
scramble_for_office('governor')
