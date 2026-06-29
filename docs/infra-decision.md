# Infrastructure decision — two Vercel deploys, one repo

*Updated: June 2026*

## Decision: Option B — monorepo, two Vercel projects

Marketing and screening share **`carolmjones/bridge-hub`** but deploy as **separate Next.js apps**.

| Deploy | Root directory | Local dev | Production URL (example) |
|--------|--------------|-----------|--------------------------|
| **Marketing** | `apps/marketing` | `npm run dev:marketing` → `:3000` | `thebridgehub.com` |
| **Screening** | repo root | `npm run dev:screening` → `:3001` | `app.thebridgehub.com` |

Shared: GitHub repo. Screening keeps Supabase, Resend, OpenRouter, Cal.com webhooks.

## Environment URLs

Set on **both** Vercel projects (marketing needs screening URL for CTAs; screening needs marketing URL for `/` redirect):

| Variable | Marketing deploy | Screening deploy |
|----------|------------------|------------------|
| `NEXT_PUBLIC_MARKETING_URL` | This site's URL | Marketing site URL |
| `NEXT_PUBLIC_SCREENING_URL` | Screening app URL | This site's URL |
| `NEXT_PUBLIC_APP_URL` | — | Same as screening URL (auth, emails) |

Local defaults in `.env.example`: marketing `:3000`, screening `:3001`.

## CTA routing

Marketing CTAs use `SCREENING_START` in `apps/marketing/lib/marketing/routes.ts` — resolves to `NEXT_PUBLIC_SCREENING_URL/begin`.

## Vercel setup

1. **Screening** (existing project): Root Directory = `.` (default)
2. **Marketing** (new project): Root Directory = `apps/marketing`, same GitHub repo

## Cursor workstreams

Two Cursor windows on `~/bridge-hub` — see [integration-boundaries.md](integration-boundaries.md).
