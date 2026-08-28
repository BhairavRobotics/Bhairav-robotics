# Bhairav Robotics — Configuration Guide

How-to reference for common site updates.

---

## 1. Changing the Career / Contact Page Email (Where Applications Are Sent)

Both forms are **client-side email services** so they work without a backend server on any static host (Vercel, Netlify, etc.).

- **Careers** uses **Forminit** — free, supports **file uploads** (PDF/Word resumes stored + attached to the notification email).
- **Contact** uses **Web3Forms** — free, text-only messages.

Both forms deliver to: **`ravi.sarma@bhairavrobotics.in`**

### Step 1 — Create a Forminit account (Careers form)

1. Go to [forminit.com](https://forminit.com) and sign up (free, 100 submissions/month, 100 MB file storage)
2. Create a new form. Set the notification email recipient to `ravi.sarma@bhairavrobotics.in`
3. Forminit gives you a **form ID** (used in the public form endpoint `https://forminit.com/f/{formId}`)

### Step 2 — Create a Web3Forms account (Contact form)

1. Go to [web3forms.com](https://www.web3forms.com) and sign up
2. Create a form whose receiving email is `ravi.sarma@bhairavrobotics.in`
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

## 2. Changing Leader / Team Member Photos

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

## 3. Other Common Changes

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
