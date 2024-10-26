import glob
import os
import json
import random

random.seed(201636415)

candidate_agg = {}

def update_votes(meta_file, c_id, data):
    if isinstance(data, dict):
        for key, value in data.items():
            if key == 'votes':
                cnd_id = data['id']
                party = get_party(meta_file, cnd_id)
                if party in ['gop', 'dem']:
                    data[key] = random.randint(10000, 100000)
                else:
                    data[key] = random.randint(100, 1000)

                if cnd_id in candidate_agg[c_id].keys():
                    candidate_agg[c_id][cnd_id] += data[key]
                else:
                    candidate_agg[c_id][cnd_id] = data[key]
            else:
                update_votes(meta_file, c_id, value)  # Recursively update nested dictionaries
    elif isinstance(data, list):
        for item in data:
            update_votes(meta_file, c_id, item)  # Recursively update items in the list

def update_votes_agg(data):
    if isinstance(data, list):
        for item in data:
            c_id = item['id']
            results = item['results']

            for result in results:
                cnd_id = result['id']
                if cnd_id in candidate_agg[c_id].keys():
                    result['votes'] = candidate_agg[c_id][cnd_id]
            
def get_party(summary_file, cnd_id: str):
    with open(summary_file, 'r') as file:
        data: list = json.load(file)

        for c in data:
            candidates: dict = c['candidates']
            if cnd_id in candidates.keys():
                return candidates[cnd_id]['party']

def scramble_for_office(counties_glob_path, meta_file, summary_file, office):
    pattern = os.path.join(counties_glob_path)
    files = glob.glob(pattern)

    for file_name in files:
        with open(file_name, 'r') as file:
            try:
                data = json.load(file)
                c_id = data['id']                
                candidate_agg[c_id] = {}
            except json.decoder.JSONDecodeError:
                print('json decode error in ' + file_name)
                continue

        update_votes(meta_file, c_id, data)

        with open(file_name, 'w') as file:
            json.dump(data, file, indent=4)

    with open(summary_file, 'r') as file:
        data: list = json.load(file)

        contests = data['contests']
        update_votes_agg(contests)

    with open(summary_file, 'w') as file:
        json.dump(data, file, indent=4)
            
with open('./temp-2024/scramble-manifest.json', 'r') as manifest_file:
    manifest = json.load(manifest_file)

    for item in manifest:
        county_glob = item['county-glob']
        meta_file = item['meta-file']
        summary_file = item['summary-file']
        office = item['office']

        scramble_for_office(county_glob, meta_file, summary_file, office)

#sprint(candidate_agg['bq:az:139'])