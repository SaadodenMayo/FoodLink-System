# FoodLink fix – Owner Ready for Pickup and startup motion intro

## Changes
- Owner order actions now show the API's actual error message instead of failing silently.
- Ready for Pickup cards show a direct reminder and Profile shortcut when the store address or map pin is missing.
- Owner action buttons show a busy/disabled state while the server update is processing.
- The root route shows the animated FoodLink portal intro on a fresh browser tab/session before role selection.
- Selecting Customer or Staff records the portal choice for the current tab, logs out any previous session in that tab, and opens the correct login form.
- Successful login/registration records the portal selection so navigation to `/` opens the correct dashboard rather than looping back to the intro.
- Existing order rules remain: owner must have a store address and confirmed pin, and the store municipality must match the order municipality before Ready for Pickup can succeed.

## Owner workflow
1. Open Profile.
2. Enter the store address and choose the correct municipality.
3. Click the map to confirm the exact store pin.
4. Save Profile.
5. Open Orders and click Ready for Pickup.
6. If the server rejects the change, the exact reason now appears on that order card.

## Startup intro
A fresh tab displays the FoodLink motion intro and Customer / Admin-Owner-Rider selection. After selecting a portal and signing in, the dashboard remains accessible on refresh in that tab. Opening a separate fresh tab starts the intro again.

## Verification
- ZIP archive integrity checked.
- TypeScript full build not verified in this environment because npm dependency installation timed out. Run `npm install`, `npm install --prefix client`, `npm install --prefix server`, then `npm run build` locally.
