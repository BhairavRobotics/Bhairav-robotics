# Bhairav Robotics Monorepo

Clean repository layout with clear separation between frontend and backend services.

## Folder structure

- `frontend/` → React + Vite app using JSX
- `backend/` → Node.js API service with modular route handlers

## Run locally

```bash
npm install
npm run dev:frontend
npm run dev:backend
```

## Root scripts

- `npm run dev` → frontend dev server
- `npm run dev:frontend` → frontend dev server
- `npm run dev:backend` → backend dev server
- `npm run build` → frontend production build
- `npm run test` → frontend tests
- `npm run test:backend` → backend unit tests
- `npm run test:all` → backend + frontend tests
- `npm run lint` → frontend lint checks

## JSX migration status

- Frontend app files are JSX/JS based.
- Vite, Vitest, and Tailwind configs are JavaScript-based.
- `frontend/components.json` is configured with `tsx: false`.
