# FoodLink Enhancements – 12 November 2026

## Implemented
1. Rider municipality routing for Saint Bernard and Cabalian, two seeded riders per municipality, approval cap of two active riders per municipality, municipality filtering, and 10 active order limit per rider.
2. Customer permanent/additional addresses, municipality choice, map pin picker, and checkout address/pin validation. Orders carry the selected delivery address, landmark text, and coordinates to live tracking.
3. Rider delivery proof image is mandatory before Delivered; customer order view displays the uploaded proof.
4. Password show/hide and confirm password on registration.
5. Separate customer and staff login routes. Owner/rider signups require business permit/license and remain Pending until admin approval. Admin account verification screen exposes attached files.
6. Foodpanda fee fixed at ₱60; Independent Rider fee capped at ₱120.
7. Customer-only food and rider rating after delivery. Food averages show on food cards and owner menu; rider averages are included in order details and admin account list.
8. Add-to-cart success toast.
9. Customer profile picture upload and participant avatars in chat lists.
10. Food-themed login animation, button transitions, card motion, and orange dark-mode hover styling.

## Verification notes
- ZIP archive integrity is checked after packaging.
- TypeScript compiler parsing was run. Full type/build verification was not possible because dependency installation timed out in this environment; missing package/type declarations were reported. Do not treat this as a successful production build.
- GCash remains a simulated demo payment. Uploaded images and verification documents are base64 in the local JSON store; use secure file storage and a real payment gateway before production deployment.
