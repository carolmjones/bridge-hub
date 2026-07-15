# Marketing — start here

Everything for the marketing workstream lives in **`apps/marketing/`**.

---

## Onboard read order

| # | Doc | Why |
|---|-----|-----|
| 1 | [roadmap_marketing.md](../roadmap_marketing.md) | Pages, build phases, what's next |
| 2 | [launch-runbook.md](launch-runbook.md) | **Go-live checklist** — Vercel deploy, Kit env, copy sign-off, domain, PepTalk |
| 3 | [seo-ai-discoverability.md](seo-ai-discoverability.md) | SEO + AI research, definitions, Caroline launch checklist |
| 4 | [seo-launch-checklist.md](seo-launch-checklist.md) | Domain cutover + Search Console steps (Caroline) |
| 5 | [phase3-content-proposals.md](phase3-content-proposals.md) | Proposed `/insights/*` and `/clarity-call` pages — approve before build |
| 6 | [bridge-hub-implementation-roadmap.md](bridge-hub-implementation-roadmap.md) | Audit task list — credentials, copy, conversion (Phase 4c) |
| 7 | [design-system.md](design-system.md) | Colors, typography, motion, sections |
| 8 | [../integration-boundaries.md](../integration-boundaries.md) | What marketing may not touch |
| 9 | [brand.md](brand.md) | Voice and positioning |
| 10 | `apps/marketing/content/` | Locked copy — [copy-briefs.md](../../apps/marketing/content/copy-briefs.md) |

Run `git status` + `git log -10` after reading. Screening: [roadmap_screening.md](../roadmap_screening.md).

---

## Local dev

```bash
npm run dev:marketing   # http://localhost:3000
```

Screening runs separately: `npm run dev:screening` → **http://localhost:3001**

---

## Design prototypes (visual QA)

| What | Where |
|------|-------|
| Runnable previews | `apps/marketing/design/handoff/design_files/*.html` |
| Copy, synapse `PTS` | `apps/marketing/design/handoff/design_files/*.dc.html` |
| Production images | `apps/marketing/public/images/` |

---

## Code paths

```
apps/marketing/
  app/                 ← pages
  components/marketing/
  content/             ← locked copy
  lib/marketing/       ← routes.ts (SCREENING_START → screening deploy)
  public/images/
```

CTAs → `SCREENING_START` in `apps/marketing/lib/marketing/routes.ts`.
