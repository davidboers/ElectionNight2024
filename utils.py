import us
import json

def fips_to_state(fips_code):
    # Ensure the FIPS code is a string
    fips_code = str(fips_code).zfill(2)  # Pad with zero if necessary

    # Search for the state by FIPS code
    for state in us.states.STATES:
        if state.fips == fips_code:
            return state.abbr
    
    return "Invalid FIPS code"

def fips_to_county(state_fips, fips_code):
    fips_code = str(fips_code).zfill(2)

    with open('./county-maps/state_counties_' + state_fips + '.json', 'r') as map_file:
        data = json.load(map_file)
        features = data['features']

        for feature in features:
            properties = feature['properties']
            code = properties['code']
            name = properties['name']

            if code == fips_code:
                return name

    return "Invalid FIPS code"