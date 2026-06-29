# The Bridge Hub — Current Status

> Honest snapshot of planning and implementation progress.
> Reconciled against git history and [roadmap_screening.md](roadmap_screening.md).
> Last updated: June 2026

---

## Summary

**Planning is substantially complete** across workstreams Chat 02–06. Specifications, copy, scoring logic, UX wireframes, and design tokens are build-ready.

**Implementation:** Phases 0–4 are complete in code. Supabase schema is migrated; local smoke test passes 19/19 checks.

**Marketing (June 2026):** Phase 1 scaffold shipped — `app/(marketing)/` serves `/` and `/bridge-map` (placeholders). Screening unchanged at `/begin`, `/assessment`, `/api/*`. See [roadmap_marketing.md](roadmap_marketing.md).

**Production (Vercel):** Live at https://bridge-hub-indol.vercel.app — set `OPENROUTER_API_KEY` on Vercel for S6 AI. Results-screen AI uses **`google/gemini-2.5-flash`** (hardcoded in `lib/ai/touchpoint-ai.ts`); `OPENROUTER_MODEL` applies to future report/PDF AI only.

**After June 2026 reorder:** Use a new session via `/save` when testing; don't resume pre-change in-progress sessions.

---

## Build phases (implementation)

| Phase | Status | Notes |
|-------|--------|-------|
| 0 — Repo & env | **Complete** | Next.js 14, Tailwind, `.env.bridgehub`, Vercel linked |
| 1 — Data layer | **Complete** | Supabase EU, RLS, magic link auth, migration applied |
| 2 — Assessment UI | **Complete** | S1–S3, S5 (104 questions), R1/R2, auto-save |
| 3 — Scoring engine | **Complete** | `lib/scoring/`, `complete-section` API, smoke test |
| 4 — Results (S6) | **Complete** | Touchpoint 1 UI, Flash AI (7 calls), compiled overview, clinical language rule |
| 5–8 | Not started | Booking, PDF, therapist dashboard, email, launch |

**Authoritative checklists:** [roadmap_screening.md](roadmap_screening.md) (assessment funnel) · [roadmap_marketing.md](roadmap_marketing.md) (website pages)

---

## What runs today (local)

```bash
npm run build && npm run start   # http://localhost:3000
npm run smoke:test               # 19/19 checks when server is running
npm run db:verify                # Supabase tables + storage bucket
```

| Route | Screen | Status |
|-------|--------|--------|
| `/` | Marketing landing | Placeholder (marketing workstream) |
| `/bridge-map` | Bridge Map | Placeholder (marketing workstream) |
| `/begin` | S2 What to expect | Working |
| `/save` | S3 Email capture | Working |
| `/assessment` | S5 Questions | Working (auth required) |
| `/results` | S6 Touchpoint 1 | Full UI + AI generation |
| `/book` | S7 Booking | Placeholder |
| `/resume`, `/expired` | R1/R2 | Working |

---

## Workstream status (planning)

| Workstream | Status | Key deliverables |
|------------|--------|------------------|
| Chat 01 — Product naming | **Complete** | The Bridge Hub name locked |
| Chat 02 — Assessment architecture | **Complete** | 5 instruments, 104 items, PID-5-SF (39) |
| Chat 03 — Scoring | **Mostly complete** | Pseudocode v2, normative data, patterns PF-01–08, framework Q1–Q8. **Pending:** edge cases (3.3), AI pattern library (3.4) |
| Chat 04 — UX | **Mostly complete** | Wireframes S1–S8, R1–R2, journey map. **Pending:** formal interaction spec doc |
| Chat 05 — Copy | **Mostly complete** | Layer 2, Touchpoint 1 copy, report pseudocode |
| Chat 06 — Design | **Complete** | DESIGN_SYSTEM.md, brand assets |
| Chat 07 — Development | **In progress** | Phases 0–4 shipped; Phase 5 next |
| Chat 08–11 | **Not started** | Email automation, booking polish, GDPR, launch QA |

---

## Production deployment checklist

1. **Find your Vercel URL** — Vercel → bridge-hub → Deployments → Production → Visit (not `bridge-hub.vercel.app`)
2. **Set env vars** in Vercel (Production + Preview): `NEXT_PUBLIC_APP_URL`, Supabase keys, `RESEND_API_KEY`, `OPENROUTER_API_KEY`
3. **Redeploy** after env vars are set
4. **Supabase Auth** — add production URL to Site URL and Redirect URLs (`/api/auth/verify`)
5. Optional: `PRODUCTION_APP_URL=https://… npm run sync:production` (needs tokens in `.env.bridgehub`)

See [README.md](../README.md) and [scripts/sync-production.mjs](../scripts/sync-production.mjs).

---

## Git history (recent)

| Commit | Summary |
|--------|---------|
| `d4124ec` | top_endorsed_items diversity (max 3 per instrument) |
| `a2b2d9d` | S6 AI → Gemini Flash; compiled overview section |
| `a9d8c39` | AI timeout fix; sequential per-slot generation |
| `0e667a0` | Assessment reorder (104 items); S6 copy refresh |
| `244c707` | Phase 3 — scoring engine |

---

## Stale documentation warnings

Trust file content, git history, and [roadmap_screening.md](roadmap_screening.md) over older checkboxes.

| Stale doc says | Actual state |
|----------------|--------------|
| `chat-05-roadmap-v2.md` marks Touchpoint 1 as Pending | Phase 4 S6 built — see roadmap |
| Master brief lists Mailchimp | Locked decision is **Kit** |
| Master brief colour tokens | Superseded by `DESIGN_SYSTEM.md` |
| S6 AI uses `OPENROUTER_MODEL` Pro | Touchpoint uses **Flash** in code; Pro reserved for report AI |

---

## Next step

- **Screening:** Continue **Phase 5** per [roadmap_screening.md](roadmap_screening.md): `/book` + Cal.com embed, booking webhook, Nervous System Map PDF.
- **Marketing:** Continue **Phase 2** per [roadmap_marketing.md](roadmap_marketing.md): design port landing + Bridge Map.
