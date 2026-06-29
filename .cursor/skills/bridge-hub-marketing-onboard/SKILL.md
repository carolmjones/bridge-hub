---
name: bridge-hub-marketing-onboard
description: >-
  Onboard to the Bridge Hub marketing workstream — landing pages, Bridge Map,
  and conversion copy. Use in the Marketing Cursor window. Do not load
  screening specs unless integrating at documented touchpoints.
---

# Bridge Hub Marketing Onboard

Run at the start of every **Marketing** Cursor session on `~/bridge-hub`.

## What this workstream is

Marketing site in **`apps/marketing/`** — separate Vercel deploy from screening. Local: `npm run dev:marketing` → `:3000`.

**Not:** questionnaire, scoring, Supabase, or root `app/api/` routes.

## Onboarding checklist

```
- [ ] Read docs/marketing/README.md
- [ ] Read docs/roadmap_marketing.md
- [ ] Read docs/integration-boundaries.md
- [ ] Read task-specific apps/marketing/content/ file if editing copy
- [ ] Run git status + git log -10
```

## Read order

| File | Why |
|------|-----|
| [docs/marketing/README.md](../../docs/marketing/README.md) | Entry point |
| [docs/roadmap_marketing.md](../../docs/roadmap_marketing.md) | Pages, status, build phases |
| [docs/marketing/design-system.md](../../docs/marketing/design-system.md) | Tokens, motion, sections |
| [docs/integration-boundaries.md](../../docs/integration-boundaries.md) | What marketing may not touch |

## Critical rules

1. Work only in `apps/marketing/` unless coordinating env/deploy docs.
2. CTAs use `SCREENING_START` → `NEXT_PUBLIC_SCREENING_URL/begin` (screening deploy).
3. Framer Motion in `apps/marketing/components/marketing/` only.
4. No clinical labels. Trauma-informed tone.
5. Copy locked after Caroline approval.

## Key paths

```
apps/marketing/        ← marketing Next.js app
docs/roadmap_marketing.md
docs/marketing/        ← design system, brand
```

## After onboarding

Summarise in 3–5 bullets what marketing phase you're in and which page you're building. Then proceed.
