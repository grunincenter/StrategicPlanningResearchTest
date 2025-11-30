// --- 1. Load the Data (Manually converted from schools.csv) ---
// This array contains the school data we want to plot.
const schoolData = [
    { name: "New York University School of Law", lat: 40.7302, lon: -73.9972 },
    { name: "Columbia Law School", lat: 40.8085, lon: -73.9634 },
    { name: "Georgetown University Law Center", lat: 38.8953, lon: -77.0146 },
    { name: "Yale Law School", lat: 41.3101, lon: -72.9261 },
    { name: "Northwestern Pritzker School of Law", lat: 41.8988, lon: -87.6231 },
    { name: "UC Berkeley School of Law", lat: 37.87, lon: -122.2534 },
    { name: "University of Michigan School of Law", lat: 42.2743, lon: -83.7402 },
    { name: "University of Virginia School of Law", lat: 38.0315, lon: -78.5034 },
    { name: "UCLA School of Law", lat: 34.074, lon: -118.4418 },
    { name: "Boston College Law School", lat: 42.3484, lon: -71.1685 },
    { name: "University of Missouri-Kansas City School of Law", lat: 39.0305, lon: -94.577 },
    { name: "University of Washington School of Law", lat: 47.657, lon: -122.313 },
    { name: "Brooklyn Law School", lat: 40.6946, lon: -73.9877 },
    { name: "Northeastern University School of Law", lat: 42.3392, lon: -71.0908 },
    { name: "Pace University Elisabeth Haub School of Law", lat: 41.0403, lon: -73.7647 },
    { name: "Pepperdine Caruso School of Law", lat: 34.04, lon: -118.71 },
    { name: "West Virginia University College of Law", lat: 39.65, lon: -79.96 }
];

// --- 2. Initialize the Leaflet Map ---
// Center the map roughly on the US and set a starting zoom level (4 is good for the US)
// 'map' here must match the ID of the div in your index.html
const map = L.map('mapid').setView([40.0, -98.0], 4);

// Add the tile layer (the actual map image tiles from OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// --- 3. Add Markers for Schools ---
schoolData.forEach(school => {
    L.marker([school.lat, school.lon])
        .bindPopup(school.name) // Add the school name as a popup when clicked
        .addTo(map);
});
