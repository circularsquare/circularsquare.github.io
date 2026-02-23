import pandas as pd

# 1. Read the GDP csv (skipping the 4 rows of metadata at the top)
# Make sure your file is actually named 'gdp.csv'
df_gdp = pd.read_csv('gdp.csv', skiprows=4)

# 2. Find the last available GDP year for each country
# Isolate just the columns that are years (e.g., '1960' to '2024')
year_columns = [col for col in df_gdp.columns if col.isnumeric()]

# Forward fill missing values across the years, then grab the very last column
df_gdp['gdp_pc'] = df_gdp[year_columns].ffill(axis=1).iloc[:, -1]

# 3. Handle Country Name Mismatches
# World Bank uses formal political names. Simplemaps uses common names.
country_mapping = {
    "Russian Federation": "Russia",
    "Egypt, Arab Rep.": "Egypt",
    "Iran, Islamic Rep.": "Iran",
    "Korea, Rep.": "Korea, South",  # Updated for Simplemaps
    "Korea, Dem. People's Rep.": "Korea, North", # Updated for Simplemaps
    "Venezuela, RB": "Venezuela",
    "Syrian Arab Republic": "Syria",
    "Yemen, Rep.": "Yemen",
    "Viet Nam": "Vietnam",
    "Slovak Republic": "Slovakia",
    "Kyrgyz Republic": "Kyrgyzstan",
    "Lao PDR": "Laos",
    "Congo, Dem. Rep.": "Congo (Kinshasa)",
    "Congo, Rep.": "Congo (Brazzaville)",
    "Brunei Darussalam": "Brunei",
    "Micronesia, Fed. Sts.": "Micronesia",
    "Turkiye": "Turkey",
    "Myanmar": "Burma", 
    "Sao Tome and Principe": "São Tomé and Príncipe",
    "Cote d'Ivoire": "Côte d’Ivoire", # Fixed the fancy apostrophe
    "Hong Kong SAR, China": "Hong Kong",
    "Macao SAR, China": "Macau",
    "Somalia, Fed. Rep.": "Somalia",
    "Puerto Rico (US)": "Puerto Rico",
    "Curacao": "Curaçao",
    "West Bank and Gaza": "West Bank" # WB groups Gaza and West Bank together
}

# Apply the mapping. If a country isn't in the map, it keeps its original name.
df_gdp['Country Name'] = df_gdp['Country Name'].replace(country_mapping)

# 4. Clean up and export
# We only need the country name and the final GDP value
df_clean_gdp = df_gdp[['Country Name', 'gdp_pc']].dropna(subset=['gdp_pc']).copy()
df_clean_gdp.rename(columns={'Country Name': 'country'}, inplace=True)

# Export to a clean CSV
df_clean_gdp.to_csv('clean_gdp.csv', index=False)
print(f"Processed {len(df_clean_gdp)} countries. Saved to clean_gdp.csv!")