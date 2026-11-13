# Rider pickup notification and My Deliveries fix

## Changes
- When an owner changes an order to `Ready for Pickup`, the API now creates a `New delivery available` notification for every active rider assigned to the same municipality.
- Municipality comparison now normalizes supported labels such as `Cabalian`, `Cabalian, Southern Leyte`, `Saint Bernard`, and `St. Bernard` to the canonical municipality names.
- New orders store the canonical municipality (`Cabalian` or `Saint Bernard`).
- Rider order listing and rider acceptance use the same normalized municipality comparison, so eligible unassigned Ready for Pickup orders appear in My Deliveries and can be accepted.
- Existing assignment rules remain: the first eligible rider to accept gets the order; other riders cannot accept it after assignment; the 10-active-delivery limit remains enforced.

## Test note
ZIP integrity checked. Full npm build was not verified in this environment because project dependencies (React, Axios, Lucide, etc.) are not installed in the extracted workspace. Run `npm install`, `npm install --prefix client`, `npm install --prefix server`, then `npm run build` locally.
