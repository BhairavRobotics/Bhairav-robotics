# Bhairav Robotics

Clean repository layout with clear separation between frontend and backend services.

## Folder structure

- `frontend/` → React + Vite app using JSX
- `backend/` → Node.js API service with modular route handlers

## Run locally

To start the backend and frontend servers locally, you can use the commands specified in the package.json files for each folder.

```bash
# In the backend directory
cd backend
npm install
npm run dev

# In the frontend directory
cd frontend
npm install
npm run dev
```

## Available Scripts

### Backend (`backend/package.json`)
- `npm run dev` → Runs the backend server with watch mode
- `npm run start` → Starts the backend server
- `npm run test` → Runs backend tests

### Frontend (`frontend/package.json`)
- `npm run dev` → Starts the Vite React frontend
- `npm run build` → Builds the frontend for production
- `npm run preview` → Previews the production build
- `npm run lint` → Runs ESLint checks
- `npm run test` → Runs frontend tests using Vitest

## Deployment

The live site is deployed on **Vercel** (production branch: `main`). Pushing to `main` auto-triggers a deployment.

For more details on configuration (Web3Forms keys, team photos, text changes, etc.), see [`GUIDE.md`](GUIDE.md).

## JSX migration status

- Frontend app files are JSX/JS based.
- Vite, Vitest, and Tailwind configs are JavaScript-based.
- `frontend/components.json` is configured with `tsx: false`.
