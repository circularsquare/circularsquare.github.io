import pandas as pd
import requests
import time
import os

# Define your file paths
base_data_file = 'worldcities.csv'
cache_file = 'city_wiki_views_cache.csv'

# 1. Check for the cache
if os.path.exists(cache_file):
    print("Found cached data. Loading from CSV...")
    df = pd.read_csv(cache_file)
else:
    print("No cache found. Fetching from Wikimedia API (this will take a while)...")
    
    # Load and filter the base Simplemaps data down to 100k+
    df = pd.read_csv(base_data_file)
    df = df[df['population'] >= 300000].copy()

    def get_wiki_views(city_name):
        """Fetches Wikipedia pageviews, floors at 1000."""
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
    print(f"Fetching Wikipedia data for {len(df)} cities...")
    # Fetch the views and build the new column
    df['wiki_views'] = df['city_ascii'].apply(get_wiki_views)
    
    # Save the dataframe to a CSV so you never have to run the API loop again
    df.to_csv(cache_file, index=False)
    print(f"Successfully saved {len(df)} cities to cache!")

# 2. Apply the updated scoring formula (Population * WikiViews^0.25)
df['game_score'] = df['population'] * (df['wiki_views'] ** 0.25)

# 3. Extract Top 1000
top_1000 = df.sort_values(by='game_score', ascending=False).head(1000)

# 4. Format and Export to JavaScript
js_output = "const CITIES_HARD = [\n  ...CITIES_MEDIUM,\n"

for _, row in top_1000.iterrows():
    # Format lat/lng to 4 decimal places
    lat = round(row['lat'], 4)
    lng = round(row['lng'], 4)
    
    # Escape quotes to prevent syntax errors in your JS
    name = str(row['city']).replace('"', '\\"') 
    country = str(row['country']).replace('"', '\\"')
    
    js_output += f'  {{ name: "{name}", country: "{country}", latlng: [{lat}, {lng}] }},\n'

js_output += "];"

with open("cities_hard.js", "w", encoding="utf-8") as f:
    f.write(js_output)

print("cities_hard.js generated successfully!")