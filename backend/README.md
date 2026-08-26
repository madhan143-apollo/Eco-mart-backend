# Waste2Worth backend

Express REST API for the existing Waste2Worth frontend. It uses MongoDB when `MONGODB_URI` is configured and falls back to an in-memory store for local development.

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

Deploy the `Frontend` folder as a second Vercel project. In the frontend project's environment variables, set `VITE_API_URL` to the backend deployment URL ending in `/api`, for example `https://your-backend-project.vercel.app/api`. Set `CLIENT_ORIGIN` in the backend project to the deployed frontend URL, for example `https://your-frontend-project.vercel.app`. Redeploy the frontend after setting `VITE_API_URL`, because Vite embeds it during the build.

MongoDB Atlas uses the backend server's outbound connection, not a stable Vercel IP. In Atlas, open **Security > Database & Network Access > IP Access List**, add `0.0.0.0/0`, and save it. This is required for Vercel's dynamic IP addresses, but it exposes the database network endpoint broadly, so protect it with a strong database password and least-privilege database user. Never commit `MONGODB_URI`, `JWT_SECRET`, or other secrets; configure them in Vercel Environment Variables.

The Vercel function is exposed under `/api`, and the health endpoint is `/api/health`.

API root: `http://localhost:5000/api`

Demo accounts: `admin@ecomart.in / Admin@123`, `seller@ecomart.in / Seller@123`, `buyer@ecomart.in / Buyer@123`, `TRM001 / Manager@123`, `DRV001 / Driver@123`.

Authentication uses `Authorization: Bearer <token>`. Role names are `ADMIN`, `SELLER`, `BUYER`, `TRANSPORT_MANAGER`, and `TRANSPORT_DRIVER`.
