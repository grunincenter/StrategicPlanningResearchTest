import pandas as pd
import folium

# --- Configuration ---
# Assuming 'schools.csv' is in a 'data' subfolder, adjust the path as necessary.
# If 'schools.csv' is in the same directory as map_generator.py, use: file_path = "schools.csv"
# Based on your previous structure hint, we'll assume it's in a 'data' folder.
file_path = "data/schools.csv"
output_map_filename = "law_schools_map.html"

# --- 1. Read the Data ---
try:
    df = pd.read_csv(file_path)
except FileNotFoundError:
    print(f"Error: The file '{file_path}' was not found. Please check your file path.")
    # Exit the script if the file is missing
    exit()

# --- 2. Filter and Prepare Data ---
# Select the necessary columns
map_df = df[['school_name', 'latitude', 'longitude']].copy()

# Convert coordinates to numeric and handle any missing or bad data
map_df['latitude'] = pd.to_numeric(map_df['latitude'], errors='coerce')
map_df['longitude'] = pd.to_numeric(map_df['longitude'], errors='coerce')
map_df.dropna(subset=['latitude', 'longitude'], inplace=True)

# Check if there's any data left to plot
if map_df.empty:
    print("Error: No valid latitude/longitude data found in the CSV file to generate a map.")
    exit()

# --- 3. Generate the Map ---
print("Generating map...")

# Calculate the center of the map for initial view
center_lat = map_df['latitude'].mean()
center_lon = map_df['longitude'].mean()

# Create a base map using Folium (centered on the average location, zoomed out)
m = folium.Map(location=[center_lat, center_lon], zoom_start=4)

# Add markers for each school
for index, row in map_df.iterrows():
    folium.Marker(
        [row['latitude'], row['longitude']],
        # The popup will display the school name when clicked
        popup=row['school_name'],
        # Use a distinctive icon (blue university icon)
        icon=folium.Icon(color='blue', icon='university', prefix='fa')
    ).add_to(m)

# --- 4. Save the Map ---
m.save(output_map_filename)

print(f"\n✅ Success! The interactive map has been saved as: {output_map_filename}")
print("You can now open this file in your web browser or commit it to GitHub.")
