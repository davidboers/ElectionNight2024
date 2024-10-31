import glob
import os
import json
import random
import datetime

random.seed(201636415)

candidate_agg = {}

start_time = datetime.datetime(2024, 11, 5, 18, 0, 0)
end_time = datetime.datetime(2024, 11, 6, 3, 0, 0)

def rand_time():
    return start_time + datetime.timedelta(hours=random.randint(0, 9), minutes=random.randint(0, 60), seconds=random.randint(0, 60))

def update_votes(meta_file, c_id, data):
    if isinstance(data, dict):
        for key, value in data.items():
            if key == 'votes':
                cnd_id = data['id']
                party = get_party(meta_file, cnd_id)
                if party in ['gop', 'dem'] or cnd_id == '1445': # Democrat, Republican, or Bernie Sanders
                    data[key] = random.randint(10000, 100000)
                else:
                    data[key] = random.randint(100, 1000)

                if cnd_id in candidate_agg[c_id].keys():
                    candidate_agg[c_id][cnd_id] += data[key]
                else:
                    candidate_agg[c_id][cnd_id] = data[key]

            elif key == 'pct':
                data[key] = random.randint(0, 100) / 100
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

            item['progress']['pct'] = random.randint(0, 100) / 100
            item['calls'] = [{
                'type': 'winner',
                'timestamp': rand_time().isoformat(),
                'contestId': c_id,
                'subjectId': sorted(results, key=lambda k: k['votes'], reverse=True)[0]['id'],
                'callerId': 'scrambler'
            }]
            
def get_party(meta, cnd_id: str):
    for c in meta:
        candidates: dict = c['candidates']
        if cnd_id in candidates.keys():
            return candidates[cnd_id]['party']

def scramble_for_office(counties_glob_path, meta_path, summary_path, office):
    pattern = os.path.join(counties_glob_path)
    files = glob.glob(pattern)

    meta_file = open(meta_path, 'r')
    meta = json.load(meta_file)
    meta_file.close()

    for file_name in files:
        with open(file_name, 'r') as file:
            try:
                data = json.load(file)
                c_id = data['id']                
                candidate_agg[c_id] = {}
            except json.decoder.JSONDecodeError:
                print('json decode error in ' + file_name)
                continue

        update_votes(meta, c_id, data)

        with open(file_name, 'w') as file:
            json.dump(data, file, indent=4)

    with open(summary_path, 'r') as summary_file:
        data: list = json.load(summary_file)

        contests = data['contests']
        update_votes_agg(contests)

    with open(summary_path, 'w') as summary_file:
        json.dump(data, summary_file, indent=4)

with open('./temp-2024/scramble-manifest.json', 'r') as manifest_file:
    manifest = json.load(manifest_file)

    for item in manifest:
        county_glob = item['county-glob']
        meta_file = item['meta-file']
        summary_file = item['summary-file']
        office = item['office']

        scramble_for_office(county_glob, meta_file, summary_file, office)

# US House elections are not broken down by county.
file = open('./temp-2024/2024-11-05-collection-house/summaries.json', 'r')
meta_file = open('./temp-2024/2024-11-05-collection-house/combined.json', 'r')
data = json.load(file)
meta = json.load(meta_file)
file.close()
meta_file.close()

contests = data['contests']

if isinstance(contests, list):
    for item in contests:
        c_id = item['id']
        results = item['results']

        for result in results:
            cnd_id = result['id']
            party = get_party(meta, cnd_id)
            if party in ['gop', 'dem']:
                result['votes'] = random.randint(10000, 100000)
            else:
                result['votes'] = random.randint(100, 1000)

        item['progress']['pct'] = random.randint(0, 100) / 100

with open('./temp-2024/2024-11-05-collection-house/summaries.json', 'w') as file:
    json.dump(data, file, indent=4)
 