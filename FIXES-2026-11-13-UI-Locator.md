# FoodLink UI Polish & Rider Locator Update

- Owner order action buttons now have consistent compact sizing, alignment, wrapping, and spacing.
- Rider tracking controls are compact and do not stretch across the map width.
- Live tracking customer destination marker is clickable and opens customer name/address/landmark details.
- Added a Rider-only Start Locator control. It requests a driving route from the rider's latest live GPS position to the customer's confirmed map pin using the public OSRM routing service and renders the route as a bold orange Leaflet polyline.
- Added clear route loading/error/waiting messages when GPS or destination coordinates are unavailable.
- Replaced the intro's floating food emoji orbit with a large cinematic food photograph and subtle glow/float treatment; removed decorative food emoji from the login art.

Notes:
- Start Locator requires the rider's live GPS position, a confirmed customer address pin, and internet access to the public routing service.
- This update changes UI and route presentation only; it does not alter the order state workflow or existing role permissions.
