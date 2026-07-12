# Integration boundaries — marketing vs screening

*Locked: June 2026. Enforced in code and Cursor rules.*

Two workstreams share one **git repo** but deploy as **two Next.js apps** (marketing `:3000`, screening `:3001`). They integrate only at documented touchpoints.

---

## Folder ownership

| Marketing only | Screening only | Shared (use sparingly) |
|----------------|----------------|------------------------|
| `apps/marketing/` | `app/api/`, `app/assessment/`, … | `app/layout.tsx` (screening fonts) |
| `apps/marketing/components/` | `components/assessment/`, … | `components/ui/Disclaimer` (duplicated in marketing app) |
| `apps/marketing/lib/marketing/` | `lib/scoring/`, … | — |
| `apps/marketing/content/` | `specs/` | — |
| `docs/marketing/` | `specs/` | — |

---

## Marketing may

- Import `components/ui/Disclaimer` (local copy in `apps/marketing/`)
- Link to screening via `SCREENING_START` / `screeningUrl()` — not relative `/begin`
- Use Framer Motion in `apps/marketing/components/marketing/`
- Read `apps/marketing/content/` and `docs/marketing/`

## Marketing must not

- Import `lib/scoring/*`, `lib/supabase/*`, `lib/ai/*`, `lib/pdf/*`
- Add or edit routes under `app/api/`
- Use `AppShell` or screening wireframe components
- Edit `specs/chat-03` through `specs/chat-05`

## Screening may

- Full access to `app/api/`, scoring, Supabase, PDF, OpenRouter
- Edit `specs/` and screening routes

## Screening must not

- Edit `app/(marketing)/` or root `components/marketing/` (moved to `apps/marketing/`)

---

## Integration touchpoints

| From | To | Mechanism |
|------|-----|-----------|
| Marketing CTA | Screening start | `SCREENING_START` in `apps/marketing/lib/marketing/routes.ts` → `NEXT_PUBLIC_SCREENING_URL/begin` |
| Screening results | Marketing | Nav links to `/work-with-me/coaching` and `/work-with-me/speaking` (no hub page) |
| Marketing Cal.com pages | Booking webhook | Embed on marketing; webhook stays `app/api/booking/cal-webhook` |
| Both | Disclaimer | Same legal line on all client-facing screens |

---

## Visual worlds (do not merge)

| | Marketing | Screening |
|---|-----------|-----------|
| Layout | Full-width, Nav + Footer | `AppShell`, phone-width |
| Motion | Framer Motion, aurora, carousel | Breathing overlay, section transitions |
| Design doc | [marketing/design-system.md](marketing/design-system.md) | [specs/cursor-guide/DESIGN_SYSTEM.md](../specs/cursor-guide/DESIGN_SYSTEM.md) |

---

## When a change affects both

- Env URLs: `.env.example`, both Vercel projects
- Run `npm run smoke:test` and `npm run smoke:marketing` after cross-deploy changes
