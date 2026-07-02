# Vercel — two deploys from one repo

*After pushing to GitHub (`git push origin main`).*

## 1. Screening (existing project)

| Setting | Value |
|---------|-------|
| Root Directory | `.` (default) |
| Framework | Next.js |
| Build Command | `npm run build:screening` |

**Environment variables** (Production + Preview):

```
NEXT_PUBLIC_MARKETING_URL=https://your-marketing-domain.vercel.app
NEXT_PUBLIC_SCREENING_URL=https://your-screening-domain.vercel.app
NEXT_PUBLIC_APP_URL=https://your-screening-domain.vercel.app
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
```

## 2. Marketing (`bridge-hub-marketing`)

| Setting | Value |
|---------|-------|
| Root Directory | `apps/marketing` |
| Framework | Next.js |
| Build Command | `npm run build` |
| Install Command | `npm install` |

**Production URL:** `https://bridge-hub-marketing.vercel.app`

**Environment variables**:

```
NEXT_PUBLIC_MARKETING_URL=https://thebridgehub.com
NEXT_PUBLIC_SCREENING_URL=https://bridge-hub-indol.vercel.app
NEXT_PUBLIC_MUX_PLAYBACK_ID=...
MUX_TOKEN_ID=...
MUX_TOKEN_SECRET=...
KIT_API_KEY=...
KIT_FREE_CLASS_FORM_ID=...
```

## 3. Redeploy both

After setting URLs on both projects, redeploy so CTAs and `/` redirect resolve correctly.

## Local parity

```bash
npm run dev:marketing   # :3000
npm run dev:screening   # :3001
```
