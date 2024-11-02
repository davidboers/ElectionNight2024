import json
import csv

import utils

out = []

"""
Data Sources:

* County-level presidential results: MIT Election Data and Science Lab, 2018, "County Presidential Election Returns 2000-2020", https://doi.org/10.7910/DVN/VOQCHQ, Harvard Dataverse, V13, UNF:6:GILlTHRWH0LbH2TItBsb2w== [fileUNF]
* Precinct-level senate results 2020: MIT Election Data and Science Lab, 2022, "U.S. Senate Precinct-Level Returns 2018", https://doi.org/10.7910/DVN/DGNAFS, Harvard Dataverse, V1, UNF:6:dr9zFvbjKX1uuiHEwwj1JQ== [fileUNF]
* Precinct-level gubernatorial results 2020: MIT Election Data and Science Lab, 2022, "State Precinct-Level Returns 2020", https://doi.org/10.7910/DVN/OKL2K1, Harvard Dataverse, V4

Note: Some modifications have been made to all files.
"""

with open('./mit-translator.json', 'r') as file:
    translator = json.load(file)

data = {}

def record_data(office, county_fips, candidate, votes: int):
    if office not in data:
        data[office] = {}

    if county_fips not in data[office]:
        data[office][county_fips] = {}

    if candidate in data[office][county_fips]:
        data[office][county_fips][candidate] += votes
    else:
        data[office][county_fips][candidate] = votes

with open('./mit-data/countypres_2000-2020.csv', 'r') as file:
    csv_reader = csv.reader(file)

    for year,state,state_po,county_name,county_fips,office,candidate,party,candidatevotes,totalvotes,version,mode in csv_reader:
        if not year == '2020':
            continue

        if state_po not in ['AZ', 'KY', 'IA', 'OK', 'AR', 'GA', 'VA', 'NC', 'SC', 'MD']:
            if not mode == 'TOTAL':
                continue

        if len(county_fips) < 5:
            county_fips = '0' + county_fips

        candidatevotes = int(candidatevotes)
        record_data(office, county_fips, candidate, candidatevotes)

with open('./mit-data/SENATE_precinct_general.csv', 'r') as file:
    csv_reader = csv.reader(file)

    for precinct,office,party_detailed,party_simplified,mode,votes,county_name,county_fips,jurisdiction_name,jurisdiction_fips,candidate,district,magnitude,dataverse,year,stage,state,special,writein,state_po,state_fips,state_cen,state_ic,date,readme_check in csv_reader:
        if precinct == 'precinct':
            continue

        votes = int(votes)

        if state_po in ['MA', 'NH', 'VT', 'ME', 'RI', 'CT']:
            record_data(office, county_fips, candidate, votes)
            county_fips = jurisdiction_fips[5:]

        record_data(office, county_fips, candidate, votes)

with open('./mit-data/STATE_precinct_general.csv', 'r') as file:
    csv_reader = csv.reader(file)

    for precinct,office,party_detailed,party_simplified,mode,votes,county_name,county_fips,jurisdiction_name,jurisdiction_fips,candidate,district,dataverse,year,stage,state,special,writein,state_po,state_fips,state_cen,state_ic,date,readme_check,magnitude in csv_reader:
        if precinct == 'precinct':
            continue

        if office not in ['GOVERNOR', 'GOVERNOR AND LIEUTENANT GOVERNOR']:
            continue
        office = 'GOVERNOR' # For Montana

        votes = int(votes)

        if state_po in ['NH', 'VT']:
            record_data(office, county_fips, candidate, votes)
            county_fips = jurisdiction_fips[5:]

        record_data(office, county_fips, candidate, votes)

def get_votes(office, state, county_fips, candidate):
    try:
        office2 = translator['office'][office]
        office_candidates = translator['candidates'][office]
        candidate_2020 = office_candidates[candidate] if office == 'president' else office_candidates[state][candidate]
        if candidate_2020 == 'NA': # Party did not contest last time
            return -1
        return data[office2][county_fips][candidate_2020]
    except KeyError as e:
        print('   '.join([office, county_fips, candidate, state, ':', e.args[0]]))
        return 0
    except:
        print('other error')

# Somehow idk make a residual entry in the .csv file for each county. 

def get_vars_for_contest(meta: list, office):
    for c_meta in meta:
        if c_meta['contest']['isBallot']:
            continue

        county_file_name = './temp-2024/' + office + '/' + c_meta['contest']['id'].replace(':', '_') + '/counties.json'

        with open(county_file_name, 'r') as file:
            data = json.load(file)

            state_fips = c_meta['contest']['stateFips']
            state_name = utils.fips_to_state(state_fips)
            for county in data['counties']:
                county_name = utils.fips_to_county(state_fips, county['id'])

                for candidate in county['results']:
                    candidate_meta = c_meta['candidates'][candidate['id']]
                    candidate_name = candidate_meta['shortName']

                    votes = get_votes(office, state_name, county['id'], candidate_name)

                    if votes != -1: # Provided the party contested last time
                        out.append([
                            office,
                            data['id'],
                            state_name,
                            county['id'],
                            county_name,
                            'results',
                            candidate['id'],
                            candidate_name,
                            str(votes)
                        ])

with open('./temp-2024/scramble-manifest.json', 'r') as manifest_file:
    manifest = json.load(manifest_file)

    for item in manifest:
        meta_file_name = item['meta-file']
        office = item['office']

        meta_file = open(meta_file_name, 'r')
        meta = json.load(meta_file)
        meta_file.close()

        get_vars_for_contest(meta, office)


out_file = open('./swing_from.csv', 'w')
out_header = [
    'office',
    'contest_id',
    'contest_name',
    'county_id',
    'county_name',
    'var_type',
    'candidate_id',
    'candidate_name',
    'var'
]
out_file.write(','.join(out_header) + '\n')
for line in out:
    out_file.write(','.join(line) + '\n')
out_file.close()