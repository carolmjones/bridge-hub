# The Bridge Hub

Trauma-informed online psychological screening tool for women aged 28–45.

**Docs:** [docs/README.md](docs/README.md) · **Screening:** [docs/roadmap_screening.md](docs/roadmap_screening.md) · **Marketing:** [docs/roadmap_marketing.md](docs/roadmap_marketing.md)

## Stack

Next.js 14 (App Router) · Tailwind CSS · Supabase (EU) · Vercel

## Local development

Two apps, one repo:

```bash
npm install
# Edit .env.bridgehub — see .env.example (MARKETING_URL :3000, SCREENING_URL :3001)
npm run dev:marketing   # http://localhost:3000 — landing, Bridge Map
npm run dev:screening   # http://localhost:3001 — assessment, results, API
```

Environment variables load from `.env.bridgehub`. Set the same names on **both** Vercel projects — see [docs/infra-decision.md](docs/infra-decision.md).

**Production:** Two Vercel deploys — screening (repo root) and marketing (`apps/marketing`). Set `NEXT_PUBLIC_APP_URL` to the screening URL; set `NEXT_PUBLIC_MARKETING_URL` and `NEXT_PUBLIC_SCREENING_URL` on both.

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
| `POST /api/results/generate-ai-content` | S6 — OpenRouter synthesis + row observations (cached) |

Open **http://localhost:3001** for screening (`/begin`, `/assessment`, …). Marketing site: **http://localhost:3000**.

## Project layout

```
apps/marketing/  Marketing site (separate Vercel deploy)
app/             Screening routes + API
components/    UI and PDF components
lib/           Scoring, content, Supabase clients, API helpers
specs/         Authoritative build specifications
docs/          Project documentation
```

This is **not** the Caroline Pipeline repo (`~/pipeline`).
