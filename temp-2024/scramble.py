import glob
import os
import json
import random

random.seed(201636415)

candidate_agg = {}

def update_votes(office, c_id, data):
    if isinstance(data, dict):
        for key, value in data.items():
            if key == 'votes':
                cnd_id = data['id']
                party = get_party(office, cnd_id)
                if party in ['gop', 'dem']:
                    data[key] = random.randint(10000, 100000)
                else:
                    data[key] = random.randint(100, 1000)
                
                if cnd_id in candidate_agg[office][c_id].keys():
                    candidate_agg[office][c_id][cnd_id] += data[key]
                else:
                    candidate_agg[office][c_id][cnd_id] = data[key]
            else:
                update_votes(office, c_id, value)  # Recursively update nested dictionaries
    elif isinstance(data, list):
        for item in data:
            update_votes(office, c_id, item)  # Recursively update items in the list

def update_votes_agg(office, c_id, data):
    if isinstance(data, dict):
        for key, value in data.items():
            if key == 'votes':
                cnd_id = data['id']
                if cnd_id in candidate_agg[office][c_id].keys():
                    data['votes'] = candidate_agg[office][c_id][cnd_id]
            else:
                update_votes_agg(office, c_id, value)  # Recursively update nested dictionaries
    elif isinstance(data, list):
        for item in data:
            update_votes_agg(office, c_id, item)  # Recursively update items in the list

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
    candidate_agg[office] = {}

    for file_name in files:

        with open(file_name, 'r') as file:
            try:
                data = json.load(file)
                c_id = data['id']
                candidate_agg[office][c_id] = {}
            except json.decoder.JSONDecodeError:
                print('json decode error in ' + file_name)
                continue

        update_votes(office, c_id, data)

        with open(file_name, 'w') as file:
            json.dump(data, file, indent=4)
            
scramble_for_office('president')
scramble_for_office('senate')
scramble_for_office('governor')

for office in candidate_agg.keys():
    file_name = './temp-2024/2024-11-05-collection-' + office + '/summaries.json'

    for c_id in candidate_agg[office].keys():

        with open(file_name, 'r') as file:
            data: list = json.load(file)

        update_votes_agg(office, c_id, data)

        with open(file_name, 'w') as file:
            json.dump(data, file, indent=4)