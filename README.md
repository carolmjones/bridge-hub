# The Bridge Hub

Trauma-informed online psychological screening tool for women aged 28–45.

**Docs:** [docs/README.md](docs/README.md) · **Build plan:** [docs/roadmap.md](docs/roadmap.md)

## Stack

Next.js 14 (App Router) · Tailwind CSS · Supabase (EU) · Vercel

## Local development

```bash
npm install
# Edit .env.bridgehub with Supabase + Resend keys
# Run supabase/migrations/001_initial_schema.sql in Supabase SQL Editor (once)
npm run dev
```

Environment variables load from `.env.bridgehub` automatically. Add the same names in **Vercel → Environment Variables** for production.

**Production URL:** Find yours in Vercel → Deployments → Production → Visit. Do **not** use `bridge-hub.vercel.app` — that subdomain belongs to another project. Set `NEXT_PUBLIC_APP_URL` to your actual `*.vercel.app` URL (or custom domain).

```bash
# After first successful Vercel deploy (optional — needs tokens in .env.bridgehub)
PRODUCTION_APP_URL=https://your-project.vercel.app npm run sync:production
```

See `.env.example` for `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, and `SUPABASE_ACCESS_TOKEN` (optional, for automated sync).

## Phase 1 API routes

| Route | Purpose |
|-------|---------|
| `POST /api/session/create` | S3 — email, first_name, opted_in → user + session + auth |
| `POST /api/auth/request-magic-link` | R1/R2 — send resume link |
| `GET /api/auth/verify?token=` | Magic link verify → redirect |
| `GET /api/session/resume` | Load active session + responses (auth required) |

Open [http://localhost:3000](http://localhost:3000).

## Project layout

```
app/           Next.js routes
components/    UI and PDF components
lib/           Scoring, content, Supabase clients, API helpers
specs/         Authoritative build specifications
docs/          Project documentation
```

This is **not** the Caroline Pipeline repo (`~/pipeline`).
