# Bhairav Robotics — Configuration Guide

How-to reference for common site updates.

---

## 1. Changing the Career Page Email (Where Resumes Are Sent)

Resume submissions now use **EmailJS** (client-side email service) so the career form works without a backend server. This means it works on Vercel, Netlify, or any static host.

### Step 1 — Create an EmailJS account

1. Go to [emailjs.com](https://www.emailjs.com) and sign up (free: 200 emails/month)
2. Add an **Email Service** — connect your Zoho or Gmail inbox (this is where applications will be received)
3. Note the **Service ID** (e.g., `service_abc123`)

### Step 2 — Create an email template

1. In EmailJS dashboard → **Email Templates** → **Create New Template**
2. Use these variables in the template:

```
Subject: New Career Application — {{fullName}}

Name: {{fullName}}
Email: {{email}}
Phone: {{phone}}
Application Type: {{type}}
Field: {{field}}

Resume attached as PDF.
```

3. Note the **Template ID** (e.g., `template_xyz789`)

### Step 3 — Get your Public Key

1. In EmailJS dashboard → **Account** → **API Keys**
2. Copy your **Public Key**

### Step 4 — Set environment variables

**For local development:**

Create `frontend/.env`:
```
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**For Vercel deployment:**

1. Go to Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add these three variables with the same names and your EmailJS values

### Step 5 — Update the email recipient

The recipient is determined by the **Email Service** you configured in Step 1. To change the recipient email:

1. Go to EmailJS dashboard → **Email Services**
2. Edit your service → change the recipient email address

### Key files involved

| File | What it does |
|------|-------------|
| `frontend/.env` | EmailJS credentials (local dev) |
| `frontend/src/pages/Careers.jsx` | Career form UI — sends via EmailJS |
| `frontend/.env.example` | Template for environment variables |

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
