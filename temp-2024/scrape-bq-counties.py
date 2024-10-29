import json
import os

def scrape_bq_counties(group_name, meta_file_name):
    with open(meta_file_name, 'r') as meta_file:
        meta = json.load(meta_file)
        group_dir = './temp-2024/' + group_name
        if not os.path.isdir(group_dir):
            os.mkdir(group_dir)


        for item in meta:
            state_fips = item['contest']['stateFips']
            c_id:str = item['contest']['id']
            out = {}
            out['id'] = c_id
            out['counties'] = []
            geo_file_name = './county-maps/state_counties_' + state_fips + '.json'
            with open(geo_file_name, 'r') as geo_file:
                geo = json.load(geo_file)
                features = geo['features']
                for f in features:
                    county_fips = f['properties']['code']
                    counties = {
                        "id": county_fips,
                        "results": [
                            { "id": "1", "votes": 0 },
                            { "id": "2", "votes": 0 }
                        ],
                        "progress": {
                            "mode": "eevp",
                            "pct": 0
                        }
                    }
                    out['counties'].append(counties)
                
            c_id_mod = c_id.replace(':', '_')
            contest_dir = group_dir + '/' + c_id_mod
            if not os.path.isdir(contest_dir):
                os.mkdir(contest_dir)
            with open(contest_dir + '/counties.json', 'w') as out_file:
                json.dump(out, out_file, indent=4)

scrape_bq_counties('abortion-questions', './temp-2024/abortion-questions-meta.json')
scrape_bq_counties('rcv-questions', './temp-2024/rcv-questions-meta.json')
scrape_bq_counties('other-questions', './temp-2024/other-questions-meta.json')