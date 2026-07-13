# Marketing — start here

Everything for the marketing workstream lives in **`apps/marketing/`**.

---

## Onboard read order

| # | Doc | Why |
|---|-----|-----|
| 1 | [roadmap_marketing.md](../roadmap_marketing.md) | Pages, build phases, what's next |
| 2 | [seo-ai-discoverability.md](seo-ai-discoverability.md) | SEO + AI research, definitions, Caroline launch checklist |
| 3 | [bridge-hub-implementation-roadmap.md](bridge-hub-implementation-roadmap.md) | Audit task list — credentials, copy, conversion (Phase 4c) |
| 4 | [design-system.md](design-system.md) | Colors, typography, motion, sections |
| 5 | [../integration-boundaries.md](../integration-boundaries.md) | What marketing may not touch |
| 6 | [brand.md](brand.md) | Voice and positioning |
| 7 | `apps/marketing/content/` | Locked copy — [copy-briefs.md](../../apps/marketing/content/copy-briefs.md) |

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
