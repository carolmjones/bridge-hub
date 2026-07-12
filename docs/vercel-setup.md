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
NEXT_PUBLIC_MARKETING_URL=https://carolinejones.co
NEXT_PUBLIC_SCREENING_URL=https://app.carolinejones.co
NEXT_PUBLIC_APP_URL=https://app.carolinejones.co
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
```

Until `app.carolinejones.co` is connected, use your screening `*.vercel.app` URL for `NEXT_PUBLIC_SCREENING_URL` and `NEXT_PUBLIC_APP_URL`.

## 2. Marketing (`bridge-hub-marketing`)

| Setting | Value |
|---------|-------|
| Root Directory | `apps/marketing` |
| Framework | Next.js |
| Build Command | `npm run build` |
| Install Command | `npm install` |

**Production URL:** `https://bridge-hub-marketing.vercel.app` (until custom domain is live)

**Environment variables**:

```
NEXT_PUBLIC_MARKETING_URL=https://carolinejones.co
NEXT_PUBLIC_SCREENING_URL=https://app.carolinejones.co
NEXT_PUBLIC_MUX_PLAYBACK_ID=...
MUX_TOKEN_ID=...
MUX_TOKEN_SECRET=...
KIT_API_KEY=...
KIT_FREE_CLASS_FORM_ID=...
KIT_STILL_NOT_SURE_TAG_ID=...
KIT_HEALING_REVOLUTION_TAG_ID=...
```

## 3. Custom domain — `carolinejones.co` (marketing)

1. Vercel → **bridge-hub-marketing** → Settings → **Domains**
2. Add `carolinejones.co` and `www.carolinejones.co`
3. At your domain registrar, add the DNS records Vercel displays. Typical:
   - **Apex** `@` / `carolinejones.co` → A `76.76.21.21`
   - **www** → CNAME `cname.vercel-dns.com`
4. Wait for **Valid Configuration** in Vercel
5. Set `NEXT_PUBLIC_MARKETING_URL=https://carolinejones.co` on **both** projects; redeploy marketing
6. Optional: redirect `www` → apex in Vercel

## 4. Custom domain — `app.carolinejones.co` (screening, when ready)

1. Vercel → screening project → Settings → **Domains** → Add `app.carolinejones.co`
2. Registrar: CNAME `app` → `cname.vercel-dns.com`
3. Update Supabase Auth redirect URLs and `NEXT_PUBLIC_SCREENING_URL` / `NEXT_PUBLIC_APP_URL` on both projects

## 5. Redeploy both

After setting URLs on both projects, redeploy so CTAs, sitemap canonicals, and `/` redirect resolve correctly.

## Local parity

```bash
npm run dev:marketing   # :3000
npm run dev:screening   # :3001
```
