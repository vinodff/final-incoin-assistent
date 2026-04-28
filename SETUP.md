# Incoin Assistant — Setup Guide

## Stack
- React 18 + Vite 5
- Tailwind CSS 3
- Supabase (Auth + Database)
- Razorpay (Payments)
- GitHub Pages (Hosting via GitHub Actions)

---

## 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) → New Project
2. Open **SQL Editor** and run the entire contents of `supabase/schema.sql`
3. Copy your project credentials from **Settings → API**:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`

---

## 2. Razorpay Setup

1. Create an account at [razorpay.com](https://razorpay.com)
2. Go to **Settings → API Keys** → Generate Test Key
3. Copy your **Key ID** → `VITE_RAZORPAY_KEY_ID`

> Use `rzp_test_...` for testing, `rzp_live_...` for production

---

## 3. Local Development

```bash
# Copy the env file
cp .env.example .env

# Fill in your values in .env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_RAZORPAY_KEY_ID=rzp_test_xxxx
VITE_BASE_PATH=/   # use / for local

# Install and run
npm install
npm run dev
```

---

## 4. GitHub Pages Deployment

### Step 1: Create GitHub repo
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/incoin-assistant.git
git push -u origin main
```

### Step 2: Add GitHub Secrets
Go to your repo → **Settings → Secrets and variables → Actions** → New repository secret:

| Secret Name | Value |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `VITE_RAZORPAY_KEY_ID` | Your Razorpay Key ID |
| `VITE_BASE_PATH` | `/incoin-assistant/` (your repo name in slashes) |

### Step 3: Enable GitHub Pages
Go to repo → **Settings → Pages**:
- Source: **GitHub Actions**

### Step 4: Push to deploy
Any push to `main` triggers automatic deployment via `.github/workflows/deploy.yml`.

Your site will be live at: `https://YOUR_USERNAME.github.io/incoin-assistant/`

---

## 5. Supabase Auth Email Redirect (Important)

In Supabase → **Authentication → URL Configuration**:
- Site URL: `https://YOUR_USERNAME.github.io/incoin-assistant`
- Redirect URLs: `https://YOUR_USERNAME.github.io/incoin-assistant/**`

---

## Project Structure

```
src/
├── context/AuthContext.jsx   # Supabase auth state
├── lib/
│   ├── supabase.js           # Supabase client
│   ├── razorpay.js           # Razorpay payment logic
│   └── plans.js              # Pricing plans config
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── PricingCard.jsx
│   └── ToolCard.jsx
└── pages/
    ├── Landing.jsx
    ├── Pricing.jsx
    ├── Dashboard.jsx
    ├── Login.jsx
    └── Signup.jsx
```
