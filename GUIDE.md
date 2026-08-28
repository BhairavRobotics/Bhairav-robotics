# Bhairav Robotics — Configuration Guide

How-to reference for common site updates.

---

## 1. Changing the Career / Contact Page Email (Where Applications Are Sent)

Both the **Careers** and **Contact** forms use **Web3Forms** (client-side email service) so they work without a backend server on any static host (Vercel, Netlify, etc.). Web3Forms is free, unlimited, and supports **PDF resume attachments**.

Both forms deliver to: **`ravi.sarma@bhairavrobotics.in`**

### Step 1 — Create a Web3Forms account

1. Go to [web3forms.com](https://www.web3forms.com) and sign up (free, unlimited emails)
2. At signup you'll be asked for the email that should **receive** submissions — enter `ravi.sarma@bhairavrobotics.in`
3. Web3Forms gives you an **Access Key** for the careers form

### Step 2 — Set up two separate forms

Web3Forms gives one Access Key per form. You need **two keys** (both can deliver to the same inbox):

| Form | Access Key env var | Recipient |
|------|--------------------|-----------|
| **Careers** | `VITE_WEB3FORMS_ACCESS_KEY` | `ravi.sarma@bhairavrobotics.in` |
| **Contact** | `VITE_WEB3FORMS_CONTACT_KEY` | `ravi.sarma@bhairavrobotics.in` |

To create the contact form's key, go to Web3Forms → create/view your forms → manage each form's Access Key.

### Step 3 — Set environment variables

**For local development:**

Create `frontend/.env`:
```
VITE_WEB3FORMS_ACCESS_KEY=your_careers_access_key
VITE_WEB3FORMS_CONTACT_KEY=your_contact_access_key
```

**For Vercel deployment:**

1. Go to Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add both variables with your Web3Forms keys
3. **Redeploy** the project

### Step 4 — Update the recipient email

The recipient is determined by the email address you registered with Web3Forms when creating the form. To change it:

1. Go to Web3Forms dashboard → your form settings
2. Update the destination email address

### Key files involved

| File | What it does |
|------|-------------|
| `frontend/.env` | Web3Forms keys (local dev) |
| `frontend/.env.example` | Template for the variables |
| `frontend/src/pages/Careers.jsx` | Career form — sends resume + details via Web3Forms |
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
