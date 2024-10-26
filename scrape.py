import json

input_json_file = './input.json'  # Replace with your input file path
output_json_file = './output.json'  # Replace with your desired output file path

out = open(output_json_file, 'w')

def transform_json(input_file, output_file):
    # Read the original JSON data
    with open(input_file, 'r') as f:
        data = json.load(f)

    with open('./stuff.csv', 'r') as stuff:
        stuff_file = stuff.readlines()
    
    geos = {}
    for item in data:
        if 'id' in item and 'geo' in item:
            geos[item['id']] = item['geo']

    # Transform the data
    transformed_data = {}
    for line in stuff_file:
        [ap_id, d_id] = line.split(',')[:2]

        if d_id in geos:
            transformed_data[ap_id] = {
                'name': d_id,
                'abvr': d_id,
                'geo': geos[d_id],
                'block': {
                    'x': 0,
                    'y': 0
                }
            }
    
    # Write the transformed data to a new JSON file
    with open(output_file, 'w') as f:
        json.dump(transformed_data, f, indent=4)

# Example usage

transform_json(input_json_file, output_json_file)

print(f"Transformed data has been written to {output_json_file}.")