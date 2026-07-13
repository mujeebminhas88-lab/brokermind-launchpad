# Deployment

## Repository

GitHub

↓

Vercel

↓

Production

---

## Production Services

Frontend
Vercel

Database
Supabase

Email
MailerLite

Analytics
Google Analytics

Search
Google Search Console

---

## Environment Variables

Frontend

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

MAILERLITE_API_KEY

GOOGLE_ANALYTICS_ID

---

## Deployment Rules

- Never commit secrets
- Environment variables only
- Every merge to main should be deployable
- Production database changes require a migration
