# Screening — start here

Assessment funnel, scoring, results, booking, API. **Not** marketing landing pages.

---

## Onboard read order

| # | Doc | Why |
|---|-----|-----|
| 1 | [roadmap_screening.md](../roadmap_screening.md) | Build phases 0–8 — authoritative checklist |
| 2 | [../current-status.md](../current-status.md) | What's done vs pending |
| 3 | [../README.md](../README.md) | Stack, routes, spec index |
| 4 | `specs/cursor-guide/START_HERE.md` | Locked decisions |

Run `git status` + `git log -10` after reading. Marketing roadmap: [roadmap_marketing.md](../roadmap_marketing.md).

---

## Funnel (this workstream)

```
/begin → /save → /assessment → /results → /book → /confirmed
```

Marketing (`/`, `/bridge-map`) links in at `/begin` via `SCREENING_START`.

---

## Code paths

```
app/begin/, app/save/, app/assessment/, app/results/, app/book/
app/api/
lib/scoring/, lib/supabase/, lib/ai/, lib/pdf/
specs/
```

---

## Cursor

- **Window:** Bridge Hub — Screening
- **Skill:** `bridge-hub-onboard`
- **Rule:** `.cursor/rules/screening.mdc`
