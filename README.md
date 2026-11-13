# FoodLink — Integrated Online Ordering & Delivery Tracking System

A role-based, full-stack TypeScript project for System Integration and Architecture 1. One API and shared data store connect Admin, Food Business Owner, Rider, and Customer workspaces.

## Stack
- React + TypeScript + Vite
- Node.js + Express + TypeScript REST API
- Socket.IO for real-time refresh, chat message delivery, and rider location events
- React Router, React `useState` / context state
- Leaflet + OpenStreetMap for the delivery map
- JWT authentication and bcrypt password hashing
- JSON-file persistence for a zero-configuration classroom demo
- `database/schema.mysql.sql` provides the normalized MySQL 8 schema for migration to XAMPP/MySQL

## Requirements
- Node.js 20 or newer (LTS recommended)
- npm
- VS Code

## Run in VS Code
1. Extract the ZIP.
2. Open the `foodlink-integrated` folder in VS Code.
3. Open Terminal in that folder.
4. Install root dependencies: `npm install`
5. Install backend dependencies: `cd server` then `npm install`, then `cd ..`
6. Install frontend dependencies: `cd client` then `npm install`, then `cd ..`
7. Start both apps: `npm run dev`
8. Open `http://localhost:5173`.

Backend API: `http://localhost:5000/api/health`.

## Demo accounts
All demo accounts use password `password123`.

| Role | Email |
|---|---|
| Admin | admin@foodlink.test |
| Food Owner | owner@foodlink.test |
| Rider | rider@foodlink.test |
| Customer | customer@foodlink.test |

You can also register new customer, owner, and rider accounts. New registrations are marked Pending for admin review; pending accounts can sign in in this demo, while suspended accounts cannot.

## Main integrated flow
1. Customer browses the shared food catalog, filters by category, adds items to cart, and places an order (one store per checkout).
2. Owner receives a notification and sees the order in the owner workspace; accepts it, prepares it, and marks it Ready for Pickup.
3. Available riders see ready-for-pickup orders, accept a delivery assignment, then confirm food pickup.
4. While a rider is delivering, the rider workspace requests browser GPS permission and streams coordinates to the API. Customer and owner see updates on the order tracking map through Socket.IO.
5. Rider marks Delivered. The customer, owner, and rider receive notifications; the rider's delivery fee is credited to the rider wallet.
6. Customer, owner, and rider can use the order-linked chat. Messages support emoji reactions and reply references.
7. Admin can view accounts and suspend/reactivate accounts.

## Important demo limitations — read before presenting
This is a runnable academic prototype, not a production payment or dispatch platform.
- The app currently persists data in `server/data/db.json` (created automatically on first API start). The MySQL schema is supplied as a migration/reference artifact; the runtime has not yet been switched to MySQL.
- GCash checkout is simulated as a successful payment for demonstrating the integration flow. It does **not** connect to GCash, Maya, or a payment gateway and must not be used to collect real money. Production needs a verified provider checkout + signed webhook before crediting an owner wallet.
- Customer wallet cash-in is also simulated. Production needs a payment provider and reconciliation.
- Live map uses browser geolocation from the rider's device. Rider must allow location permission and keep the delivery page open. GPS accuracy, background tracking, route directions, and production map keys require further deployment work. The initial marker is a demo coordinate until real GPS is received.
- Calling is not connected to a telephony provider. Use the order chat for the demo.
- Chat currently supports text, reply references, and a single emoji reaction per message; read receipts, media attachments, typing indicators, and multi-reaction persistence can be added.
- Ratings are represented in the UI concept/flow but a dedicated rating API and review screen are not yet implemented.
- The sample app uses image URLs. Production should validate uploads and store images in object storage.

## Project structure

```text
foodlink-integrated/
├── client/
│   └── src/
│       ├── components/       # Layout, chat
│       ├── context/          # Shared application state + Socket.IO
│       ├── pages/            # Auth, dashboards, orders, wallet, map, etc.
│       ├── services/         # Axios API client
│       ├── styles.css
│       ├── types.ts
│       └── main.tsx
├── server/
│   ├── data/                 # Runtime JSON database is created here
│   └── src/
│       ├── middleware/        # JWT authentication and role authorization
│       ├── db.ts              # Demo persistence + seed data
│       └── index.ts           # REST API + Socket.IO events
├── database/schema.mysql.sql
└── README.md
```

## Useful API routes
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/foods`, `POST /api/foods`
- `GET /api/orders`, `POST /api/orders`, `PATCH /api/orders/:id`
- `POST /api/orders/:id/location`
- `GET /api/notifications`, `PATCH /api/notifications/:id/read`
- `GET /api/messages`, `POST /api/messages`, `PATCH /api/messages/:id/reaction`
- `POST /api/wallet/cashin`
- `GET /api/admin/users`, `PATCH /api/admin/users/:id`

## Before a real deployment
Replace JSON persistence with MySQL transactions, enforce owner/rider approval, implement verified GCash payment webhooks, add address and pickup/dropoff management, secure image uploads, rate-limit authentication, add audit logs, and run end-to-end tests.


### Local photo upload and fixes
- Owner business logos and food photos are selected with the device file picker; URL entry is not required.
- Food photos are resized/compressed in the browser before being saved by the demo API.
- Chat screen includes a missing icon import fix and message-send error feedback.
- Food publishing now validates required fields, blocks repeated submits while publishing, and displays API errors.


## Latest integration fixes (2026-11-11)
- Authentication tokens are stored in `sessionStorage`, so each independently opened browser tab can sign in as a different role (Admin, Owner, Rider, Customer). Open each tab separately and sign in to the intended demo account.
- Food owners can publish food posts without a separate admin approval step; the owner role is checked by the API.
- Owner profile logo/business-name updates are propagated to existing food listings, which are returned to customers with the store logo.
- Owner order chat list shows the assigned rider name once a rider accepts an order. The order conversation is shared by its customer, owner, and assigned rider.
- Rider GPS sharing runs while the rider is Assigned (heading to pickup) and Picked Up (on delivery), including when the rider changes pages inside the app.
- Customer and owner tracking pages show the map, rider marker, and follow the marker as GPS updates arrive. The rider must allow browser location access; GPS works on localhost or a secure HTTPS origin.
- New orders no longer get a fake hard-coded rider coordinate. The map shows a waiting state until the rider's real GPS coordinates arrive.

## FoodLink Enhancement Pack (November 2026)

This build adds the following workflows:

- Municipality-based rider dispatch for **Saint Bernard** and **Cabalian**. Approved rider accounts are limited to two per municipality. Riders only see and accept orders in their assigned municipality. A rider may have at most **10 active (Assigned / Picked Up) orders**.
- Customer profile addresses: permanent and optional temporary/additional address, municipality selection, and a map pin picker. Checkout is blocked until the customer has a permanent address and confirmed coordinates. The selected address, landmark text, and pin are saved into the order and shown on tracking.
- Riders must upload a delivery proof image before marking an order Delivered. The customer can view that proof on the order card.
- Registration password visibility and confirmation. Customer login is separate from the Admin / Owner / Rider portal. Owner and rider accounts are Pending until admin approval; owners attach a business permit and riders attach a license/proof. Admin can open the submitted documents from Account Verification.
- Foodpanda delivery fee is fixed at **₱60**. Independent rider fee is configurable up to **₱120**.
- Customers can rate delivered food and rider service. Food ratings appear on food listings; rider averages are visible to the admin and on owner order details.
- Add-to-cart confirmation toast, customer profile photos, and profile avatars in private chat lists.
- FoodLink-themed login motion graphics and subtle interface/button animations. Hover backgrounds use orange, including in dark mode.

### Demo accounts (fresh database)

Password for all demo accounts: `password123`

- Customer: `customer@foodlink.test`
- Owner: `owner@foodlink.test`
- Admin: `admin@foodlink.test`
- Cabalian rider 1: `rider@foodlink.test`
- Cabalian rider 2: `rider2.cabalian@foodlink.test`
- Saint Bernard rider 1: `rider1.saintbernard@foodlink.test`
- Saint Bernard rider 2: `rider2.saintbernard@foodlink.test`

The initial demo database is generated at `server/data/db.json` on first server start. If that file already exists from an earlier build, the server keeps its existing data and does not overwrite it with new demo riders. Back up the file before deleting it to regenerate the fresh demo data.

### Start the project

From the extracted project root:

```bash
npm install
npm install --prefix client
npm install --prefix server
npm run dev
```

Open `http://localhost:5173`. Allow browser location permission on the rider account for live GPS. Map pin selection and map tiles require an internet connection. This remains a classroom/demo implementation: GCash is simulated, not a live payment gateway, and uploaded documents/proof images are stored as base64 in the JSON demo database rather than production-grade secure object storage.


## November 13, 2026 – Reliability and login experience update

- The first page at `http://localhost:5173` now starts with a FoodLink animated intro. After the intro animation, choose either Customer or Admin / Owner / Rider; each selection opens its matching animated login form.
- Added a portal-selection return link on both login forms.
- Improved client refresh handling so one failed authenticated request does not prevent foods, orders, notifications, or messages from refreshing independently.
- Fixed notification persistence so registration, order, delivery, and admin account-status notifications are saved together with their related data update.
- Strengthened order status permissions: owners can only advance their own orders through valid preparation states; riders can only accept a ready order in their municipality, pick up their own assigned order, and deliver it after pickup with a proof photo.
- Enforced the 10-active-delivery rider limit at the server, not only in the interface.
- Customer delivery pins must be explicitly clicked/confirmed on the map before saving the profile address.
- Cart quantity is capped at the server-supported maximum of 50 per food item.
- Dark/light theme choice is applied again after a page reload, and the profile picture is shown in the top and sidebar account avatars.

### Verification note

All TypeScript/TSX source files passed a syntax transpilation check. A full dependency-based TypeScript build and browser/API runtime test could not be completed in this environment because package installation did not finish. Please run `npm install`, `npm install --prefix client`, `npm install --prefix server`, then `npm run build` on the development computer before presenting/deploying the project.
