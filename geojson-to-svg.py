import geopandas as gpd
import json

import utils

# curl https://www.politico.com/2024-election/results/_next/static/media/districts.asset.87823d2b.json -o districts.json
# Then use mapshaper.org to convert ArcGIS to GeoJSON
# Thanks again to ChatGPT for this script!

def geometry_to_svg_path(geometry):
    """Convert a geometry into an SVG path string."""
    if geometry.geom_type == 'Polygon':
        path_data = f"M {geometry.exterior.coords[0][0]} {geometry.exterior.coords[0][1]} "
        for x, y in geometry.exterior.coords[1:]:
            path_data += f"L {x} {y} "
        path_data += "Z"  # Close the path
        return path_data
    
    elif geometry.geom_type == 'MultiPolygon':
        path_data = ""
        for polygon in geometry.geoms:
            if path_data:  # If there are previous polygons, add a space
                path_data += " "
            path_data += f"M {polygon.exterior.coords[0][0]} {polygon.exterior.coords[0][1]} "
            for x, y in polygon.exterior.coords[1:]:
                path_data += f"L {x} {y} "
            path_data += "Z"  # Close the polygon
        return path_data

    return None

def geojson_to_svg(geojson_file):
    # Read the GeoJSON file
    gdf = gpd.read_file(geojson_file)

    out = []

    # Loop through the geometries in the GeoDataFrame
    for _, row in gdf.iterrows():
        geometry = row.geometry
        fips = str(row.code)
        svg_path = geometry_to_svg_path(geometry)
        nm = utils.fips_to_state(fips[:2]) + '-' + fips[2:]

        if svg_path is not None:
            out.append({"id": nm, "geo": svg_path})

    print('Districts successfully translated: ' + str(len(out)))

    with open('input.json', 'w') as out_file:
        json.dump(out, out_file, indent=4)

if __name__ == "__main__":
    geojson_file = 'districts.json'  # Replace with your GeoJSON file path
    geojson_to_svg(geojson_file)