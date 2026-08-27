# Waste2Worth backend

Express REST API for the existing Waste2Worth frontend. It uses MongoDB when `MONGODB_URI` is configured and falls back to an in-memory store for local development. The frontend currently stores data in localStorage and does not call this API, so no frontend files were changed.

## Run

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

Set `MONGODB_URI` in `.env` to your MongoDB Atlas connection string. `SEED_DEMO=true` creates the demo accounts and starter marketplace data on an empty database.

## Deploy to Vercel

Create a separate Vercel project with the `backend` folder as its root directory. Add these environment variables in Vercel:

- `MONGODB_URI`: your MongoDB Atlas connection string
- `JWT_SECRET`: a long, random production secret
- `CLIENT_ORIGIN`: the deployed frontend URL
- `SEED_DEMO`: `true` for the first deployment, then `false` after the demo data is seeded

The Vercel function is exposed under `/api`, and the health endpoint is `/api/health`.

API root: `http://localhost:5000/api`

Health check: `GET /api` returns `{ "success": true, "message": "WASTE2WORTH backend is running" }`.

Demo accounts: `admin@ecomart.in / Admin@123`, `seller@ecomart.in / Seller@123`, `buyer@ecomart.in / Buyer@123`, `TRM001 / Manager@123`, `DRV001 / Driver@123`.

Authentication uses `Authorization: Bearer <token>`. Role names are `ADMIN`, `SELLER`, `BUYER`, `TRANSPORT_MANAGER`, and `TRANSPORT_DRIVER`.

## Railway settings

- Root Directory: `backend`
- Start Command: `npm start`
- Required variables: `PORT` (Railway provides this), `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`, and `SEED_DEMO`

Set `FRONTEND_URL` to the Netlify site URL, for example `https://your-site.netlify.app`. Localhost origins on ports 5173 and 4173 remain enabled.
