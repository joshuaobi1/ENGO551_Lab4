# ENGO551_Lab4

## Overview

In Lab 4, we extend the functionality of the web mapping application developed in Lab 3 by designing a beautiful map layer with Mapbox Studio. This layer is then integrated into the existing GeoWeb application, providing users with the ability to toggle between the original base map and the newly designed Mapbox layer.


## Project Structure

app.py: Flask application server script, serving the web mapping interface.
index.html: The main HTML page that includes the interface for the map and layer toggling functionality.
main.js: JavaScript file handling the client-side logic for map interaction, including adding the custom Mapbox layer to the Leaflet map.
style.css: Custom styles for the web application, ensuring a user-friendly experience and responsive design.

## Custom Map Layer Design

The custom map layer was designed in Mapbox Studio with the following considerations:

- *Components:* Utilized components from the Mapbox 'Navigation' base style, emphasizing clarity and visual distinction for traffic data.
- *Styling Elements:*
  - **Radius:** Adjusted the radius of point features to ensure visibility at various zoom levels.
  - **Color:** Chose a color palette stands out against the base math but also classifies the traffic incidents making distinction possible.
  - **Blur & Opacity:** Applied subtle opacity to balance prominence against other map elements.

## Integration with Leaflet.js

The Mapbox layer is added to the Leaflet map using the L.TileLayer class, which refers to the Mapbox tileset endpoints. This integration is done via `main.js` which constructs the Leaflet map and adds the necessary layer control to toggle the custom layer.

## Usage Instructions

- To view the map, navigate to the root URL of the deployed Flask application.
- The date range picker still allows for selection of a date range to filter building permits.
- The Mapbox layer can be toggled on and off using the layer control in the top-right corner of the map interface.

## Additional Information

A valid Mapbox user id, style id and access token is required to load the custom layer without issues.
