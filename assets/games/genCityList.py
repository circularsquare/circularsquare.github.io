import pandas as pd
import requests
import time
import os
import numpy as np

base_data_file = 'worldcities.csv'
manual_coords_file = 'citiesmanual.csv'
cache_file = 'city_wiki_views_cache.csv'
output_file = 'cities.csv'

# 1. Load base city data
print("Loading base city data...")
df = pd.read_csv(base_data_file)
df = df[df['population'] >= 100000].copy()

# Apply Manual Coordinate Overrides
if os.path.exists(manual_coords_file):
    print(f"Found {manual_coords_file}. Applying custom coordinates...")
    manual_df = pd.read_csv(manual_coords_file)
    
    if 'name' in manual_df.columns:
        manual_df.rename(columns={'name': 'city'}, inplace=True)
        
    df = df.merge(manual_df[['city', 'country', 'lat', 'lng']], 
                  on=['city', 'country'], 
                  how='left', 
                  suffixes=('', '_manual'))
    
    df['lat'] = df['lat_manual'].combine_first(df['lat'])
    df['lng'] = df['lng_manual'].combine_first(df['lng'])
    df.drop(columns=['lat_manual', 'lng_manual'], inplace=True)
else:
    print(f"No {manual_coords_file} found. Proceeding with base coordinates...")

# 2. Load and Apply GDP
gdp = pd.read_csv('clean_gdp.csv')
df = df.merge(gdp, on='country', how='left')

# Manual GDP overrides for places World Bank ignores
manual_gdps = {
    'Taiwan': 32000,
    'Reunion': 25000,
    'Martinique': 25000,
    'Guadeloupe': 25000,
    'Gaza Strip': 3500
}
for country, gdp_val in manual_gdps.items():
    df.loc[df['country'] == country, 'gdp_pc'] = gdp_val

print(f"Missing GDP data ratio: {df.gdp_pc.isna().mean():.2%}")
df['gdp_pc'] = df['gdp_pc'].fillna(10000)

# 3. Handle Wikipedia Views (Cache Check)
if os.path.exists(cache_file):
    print("Found cached Wikipedia views. Mapping to current data...")
    cache_df = pd.read_csv(cache_file)
    views_map = cache_df[['city_ascii', 'wiki_views']].drop_duplicates()
    df = df.merge(views_map, on='city_ascii', how='left')
    df['wiki_views'] = df['wiki_views'].fillna(1000)
else:
    print("No cache found. Fetching from Wikimedia API (this will take a while)...")
    def get_wiki_views(city_name):
        article = str(city_name).replace(" ", "_")
        url = f"https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user/{article}/monthly/2025010100/2025013100"
        headers = {"User-Agent": "GuessTheCityGame/1.0 (your@email.com)"}
        try:
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                views = response.json()['items'][0]['views']
                return max(views, 1000)
        except Exception:
            pass
        time.sleep(0.05) 
        return 1000 

    df['wiki_views'] = df['city_ascii'].apply(get_wiki_views)
    df[['city_ascii', 'wiki_views']].to_csv(cache_file, index=False)
    print(f"Successfully saved {len(df)} cities to cache!")

# 4. Apply the Scoring Formula
# Assign 1.5 multiplier if it's a primary national capital, otherwise 1.0
df['capital_mult'] = np.where(df['capital'] == 'primary', 2.0, 1.0)

# Calculate final game score
df['game_score'] = df['population'] * (df['gdp_pc'] ** 0.4) * (df['wiki_views'] ** 0.5) * df['capital_mult']

# 5. Extract Top 3000
top_3000 = df.sort_values(by='game_score', ascending=False).head(3000)

# 6. Format and Export to CSV
export_df = top_3000[['city', 'country', 'lat', 'lng']].copy()
export_df.rename(columns={'city': 'name'}, inplace=True)

export_df['lat'] = export_df['lat'].round(5)
export_df['lng'] = export_df['lng'].round(5)

export_df.to_csv(output_file, index=False)
print(f"{output_file} generated successfully!")