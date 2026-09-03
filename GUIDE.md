# Bhairav Robotics — Configuration Guide

How-to reference for common site updates.

---

## 1. Changing the Career / Contact Page Email (Where Applications Are Sent)

Both forms are **client-side email services** so they work without a backend server on any static host (Vercel, Netlify, etc.).

- **Careers** uses **Forminit** — free, supports **file uploads** (PDF/Word resumes stored + attached to the notification email).
- **Contact** uses **Web3Forms** — free, text-only messages.

Both forms deliver to: **`contact@bhairavrobotics.in`**

### Step 1 — Create a Forminit account (Careers form)

1. Go to [forminit.com](https://forminit.com) and sign up (free, 100 submissions/month, 100 MB file storage)
2. Create a new form. Set the notification email recipient to `contact@bhairavrobotics.in`
3. Forminit gives you a **form ID** (used in the public form endpoint `https://forminit.com/f/{formId}`)

### Step 2 — Create a Web3Forms account (Contact form)

1. Go to [web3forms.com](https://www.web3forms.com) and sign up
2. Create a form whose receiving email is `contact@bhairavrobotics.in`
3. Note the **Access Key** for the contact form

### Step 3 — Set environment variables

**For local development:**

Create `frontend/.env`:
```
VITE_FORM_INIT_CAREERS_ID=your_careers_form_id
VITE_WEB3FORMS_CONTACT_KEY=your_contact_access_key
```

**For Vercel deployment:**

1. Go to Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add `VITE_FORM_INIT_CAREERS_ID` and `VITE_WEB3FORMS_CONTACT_KEY`
3. **Redeploy** the project

### Step 4 — Update the recipient email

- **Forminit:** Go to Forminit dashboard → your form → notification settings → change the destination email address.
- **Web3Forms:** Go to Web3Forms dashboard → your form settings → update the destination email address.

### Key files involved

| File | What it does |
|------|-------------|
| `frontend/.env` | Service credentials (local dev) |
| `frontend/.env.example` | Template for the variables |
| `frontend/src/pages/Careers.jsx` | Career form — sends resume (PDF/Word) + details via Forminit |
| `frontend/src/pages/Contact.jsx` | Contact form — sends message via Web3Forms |

---

## 2. Product Brochures Sent by Email (Download Brochure)

The **"Download Brochure"** button routes to a request form where visitors enter their email. On submit, our backend emails the product brochure **to the requester** (with the PDF attached) **and notifies the team** at `contact@bhairavrobotics.in` who asked for which product.

Because emailing with an attachment needs server-side code, this runs as a **Vercel serverless function** (`/api/brochure`) so it works on the static Vercel site with **no separate backend host**.

### How it works

1. `TechSpecs.jsx` shows the "Download Brochure" button only for products that have a `brochure` field in `frontend/src/data/products.js`.
2. The button links to `/download-brochure?id=<product-id>` → `frontend/src/pages/BrochureRequest.jsx`.
3. On submit, the page POSTs `{ name, email, productId }` to `/api/brochure` (same origin).
4. The Vercel function `api/brochure.js` sends the PDF via SMTP to the requester, then sends a notification to `HR_EMAIL` (default `contact@bhairavrobotics.in`).

### Adding / changing a brochure

- **Wired products** (have `brochure` + `brochureName`): Vrishabh only. Rakshak, Shvana, and Prabal have none (button hidden).
- Put the PDF under `frontend/src/assets/` (or `frontend/src/assets/brochures/`).
- Import it in `frontend/src/data/products.js` and add `brochure` / `brochureName` to that product. Prabal has none (button hidden).
- The Vercel function `api/brochure.js` has its own `BROCHURES` map — **keep it in sync**: add each productId → `{ file, name, productName }` so the email attaches the correct PDF.

### SMTP (email) configuration

The function reads these env vars (set in Vercel dashboard, then **redeploy**). Their values come from `backend/.env` (Zoho SMTP):

| Variable | Example | Purpose |
|----------|---------|---------|
| `SMTP_HOST` | `smtp.zoho.in` | SMTP server |
| `SMTP_PORT` | `465` | Port (465 = secure) |
| `SMTP_SECURE` | `true` | Use TLS |
| `EMAIL_USER` | `contact@bhairavrobotics.in` | Sender / SMTP login |
| `EMAIL_PASS` | (app password) | SMTP password — never commit |
| `HR_EMAIL` | `contact@bhairavrobotics.in` | Team notification recipient |

If these are missing, the function returns a 500 "Email service is not configured".

### Local development

`frontend/vite.config.js` proxies `/api` → `http://localhost:3001`, and the route/controller in `backend/` (`POST /api/brochure`) handles it when you run the backend with `backend/.env`.

| File | What it does |
|------|-------------|
| `api/brochure.js` | Vercel serverless function — emails brochure + team notification (production) |
| `api/package.json` | Declares `nodemailer` for the function |
| `backend/src/controllers/brochureController.js` | Same logic for local backend dev |
| `frontend/src/pages/BrochureRequest.jsx` | Request form (collects name/email, posts to `/api/brochure`) |
| `frontend/src/data/products.js` | Product → brochure PDF mapping |
| `vercel.json` | Rewrites `/api/*` so the SPA catch-all doesn't swallow the function |

---

## 3. Changing Leader / Team Member Photos

All team photos live in a single folder and are referenced in one file.

### Step 1 — Replace the image file

**Directory:** `frontend/src/assets/team/`

Current files:
- `MohanRaj Gangadharan.jpeg`
- `Ramakrishna Commuri.jpeg`
- `Ravi Kishore.jpeg`
- `Sai Shravanth.jpeg`

Replace the `.jpeg` file with the new photo. Keep the same filename to avoid code changes, or note the new filename for Step 2.

### Step 2 — Update imports (only if filename changed)

**File:** `frontend/src/pages/AboutUs.jsx` — lines 5–8

```jsx
import mohanRajImage from "../assets/team/MohanRaj Gangadharan.jpeg";
import ramakrishnaImage from "../assets/team/Ramakrishna Commuri.jpeg";
import raviKishoreImage from "../assets/team/Ravi Kishore.jpeg";
import saiShravanthImage from "../assets/team/Sai Shravanth.jpeg";
```

Update the import path if the new filename is different.

### Step 3 — Update team info (if name, role, or description changed)

**File:** `frontend/src/pages/AboutUs.jsx` — lines 10–35

The `teamMembers` array holds name, role, description, and image reference for each person. Edit the relevant fields.

### Step 4 — Rebuild or restart the frontend

```bash
cd frontend
npm run dev
```

### Key files involved

| File | What it does |
|------|-------------|
| `frontend/src/assets/team/*.jpeg` | Actual photo files on disk |
| `frontend/src/pages/AboutUs.jsx` | Imports photos, defines team data, renders the team section |

---

## 4. Other Common Changes

### Updating the website email shown on Contact page / Footer

- **Contact page:** `frontend/src/pages/Contact.jsx` — search for `contact@bhairavrobotics.com`
- **Footer:** `frontend/src/sections/Footer.jsx` — search for `contact@bhairavrobotics.com`

These are display-only text values; changing them does not affect where emails are sent.

### Changing the browser tab title

**File:** `frontend/index.html` — line 11

```html
<title>Born to Defend — Next-Gen Defense & Industrial Robotics</title>
```

### Updating the header tagline

**File:** `frontend/src/components/Header.jsx` — line 139

```jsx
Born to Defend
```

### Updating the hero heading

**File:** `frontend/src/sections/Hero.jsx` — line 93–94

```jsx
Strength Through Technology,{" "}
<span className="text-gradient">Built for the Frontline</span>
```
