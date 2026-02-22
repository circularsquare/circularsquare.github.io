import pandas as pd
import requests
import time
import os

base_data_file = 'worldcities.csv'
cache_file = 'city_wiki_views_cache.csv'
output_file = 'cities.csv'

# 1. Load or Build the Cache
if os.path.exists(cache_file):
    print("Found cached data. Loading from CSV...")
    df = pd.read_csv(cache_file)
else:
    print("No cache found. Fetching from Wikimedia API (this will take a while)...")
    
    df = pd.read_csv(base_data_file)
    df = df[df['population'] >= 100000].copy()

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
    df.to_csv(cache_file, index=False)
    print(f"Successfully saved {len(df)} cities to cache!")

# 2. Apply the Scoring Formula
df['game_score'] = df['population'] * (df['wiki_views'] ** 0.3)

# 3. Extract Top n000
top_1000 = df.sort_values(by='game_score', ascending=False).head(3000)

# 4. Format and Export to CSV
# Keep only the needed columns and rename 'city' to 'name'
export_df = top_1000[['city', 'country', 'lat', 'lng']].copy()
export_df.rename(columns={'city': 'name'}, inplace=True)

# Round coordinates to 4 decimal places for a cleaner file
export_df['lat'] = export_df['lat'].round(5)
export_df['lng'] = export_df['lng'].round(5)

# Export without the dataframe index
export_df.to_csv(output_file, index=False)

print(f"{output_file} generated successfully!")