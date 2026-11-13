# FoodLink GPS and Pickup Workflow Update — 2026-11-13

- Added owner store address, municipality, landmark, and confirmed map pin to Profile.
- Owner must save a store address and confirmed coordinates before marking an order Ready for Pickup.
- Store municipality must match the order municipality.
- New orders snapshot the store pickup address and coordinates; existing orders resolve missing store data from the owner's current profile.
- Rider current GPS continues to publish for assigned and picked-up orders. Location updates are sent to the order participants, including the rider's own live tracking page.
- Rider navigation destination is the owner's store while order status is Assigned. After Food Picked Up (`Picked Up`), destination switches to the customer's confirmed pin.
- Rider API responses hide customer address, coordinates, and landmark until the order is Picked Up (or Delivered).
- Rider order cards show store pickup address before pickup, not customer address.

## Browser GPS requirement
Geolocation requires a secure browser context. `http://localhost:5173` works on the same computer; devices opening the app through a plain LAN IP such as `http://192.168.x.x:5173` need HTTPS for browser GPS permission to work.
