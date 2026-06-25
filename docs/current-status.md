# The Bridge Hub — Current Status

> Honest snapshot of planning and implementation progress.
> Reconciled against git history and [roadmap.md](roadmap.md).
> Last updated: June 2026

---

## Summary

**Planning is substantially complete** across workstreams Chat 02–06. Specifications, copy, scoring logic, UX wireframes, and design tokens are build-ready.

**Implementation is in progress.** Phases 0–3 are complete in code; Phase 4 (Touchpoint 1 results screen) is partially built locally. Supabase schema is migrated; local smoke test passes 19/19 checks.

**Production (Vercel):** Live at https://bridge-hub-indol.vercel.app (Phase 4 AI requires `OPENROUTER_API_KEY` on Vercel).

---

## Build phases (implementation)

| Phase | Status | Notes |
|-------|--------|-------|
| 0 — Repo & env | **Complete** | Next.js 14, Tailwind, `.env.bridgehub`, Vercel linked |
| 1 — Data layer | **Complete** | Supabase EU, RLS, magic link auth, migration applied |
| 2 — Assessment UI | **Complete** | S1–S3, S5 (115 questions), R1/R2, auto-save |
| 3 — Scoring engine | **Complete** | `lib/scoring/`, `complete-section` API, smoke test |
| 4 — Results (S6) | **Complete** | Touchpoint 1 UI, results API, OpenRouter AI + cache |
| 5–8 | Not started | Booking, PDF, therapist dashboard, email, launch |

**Authoritative checklist:** [roadmap.md](roadmap.md)

---

## What runs today (local)

```bash
npm run build && npm run start   # http://localhost:3000
npm run smoke:test               # 19/19 checks when server is running
npm run db:verify                # Supabase tables + storage bucket
```

| Route | Screen | Status |
|-------|--------|--------|
| `/` | S1 Landing | Working |
| `/begin` | S2 What to expect | Working |
| `/save` | S3 Email capture | Working |
| `/assessment` | S5 Questions | Working (auth required) |
| `/results` | S6 Touchpoint 1 | Full UI locally; stub on deployed `main` until Phase 4 pushed |
| `/book` | S7 Booking | Placeholder |
| `/resume`, `/expired` | R1/R2 | Working |

---

## Workstream status (planning)

| Workstream | Status | Key deliverables |
|------------|--------|------------------|
| Chat 01 — Product naming | **Complete** | The Bridge Hub name locked |
| Chat 02 — Assessment architecture | **Complete** | 5 instruments, 115 items, PID-5-SF |
| Chat 03 — Scoring | **Mostly complete** | Pseudocode v2, normative data, patterns PF-01–08, framework Q1–Q8. **Pending:** edge cases (3.3), AI pattern library (3.4) |
| Chat 04 — UX | **Mostly complete** | Wireframes S1–S8, R1–R2, journey map. **Pending:** formal interaction spec doc |
| Chat 05 — Copy | **Mostly complete** | Layer 2, Touchpoint 1 copy, report pseudocode |
| Chat 06 — Design | **Complete** | DESIGN_SYSTEM.md, brand assets |
| Chat 07 — Development | **In progress** | Phases 0–3 shipped; Phase 4 started |
| Chat 08–11 | **Not started** | Email automation, booking polish, GDPR, launch QA |

---

## Production deployment checklist

1. **Find your Vercel URL** — Vercel → bridge-hub → Deployments → Production → Visit (not `bridge-hub.vercel.app`)
2. **Set env vars** in Vercel (Production + Preview): `NEXT_PUBLIC_APP_URL`, Supabase keys, `RESEND_API_KEY`
3. **Redeploy** after env vars are set
4. **Supabase Auth** — add production URL to Site URL and Redirect URLs (`/api/auth/verify`)
5. Optional: `PRODUCTION_APP_URL=https://… npm run sync:production` (needs tokens in `.env.bridgehub`)

See [README.md](../README.md) and [scripts/sync-production.mjs](../scripts/sync-production.mjs).

---

## Git history (what shipped when)

| Commit | Phase |
|--------|-------|
| `0af67ab` | Phases 0–2 — app, auth, assessment |
| `244c707` | Phase 3 — scoring engine |
| `7038046` | Phase 3 — extended smoke test |

Phase 4 work (results screen) is local-only until next commit/push.

---

## Stale documentation warnings

Trust file content, git history, and [roadmap.md](roadmap.md) over older checkboxes.

| Stale doc says | Actual state |
|----------------|--------------|
| This file previously said “Implementation has not started” | **Outdated** — Phases 0–3 complete |
| `chat-05-roadmap-v2.md` marks Touchpoint 1 as Pending | `chat-05-phase3-copy-v3.md` exists — build-ready |
| Master brief lists Mailchimp | Locked decision is **Kit** |
| Master brief colour tokens | Superseded by `DESIGN_SYSTEM.md` |

---

## Next step

Continue **Phase 5** per [roadmap.md](roadmap.md): `/book` + Cal.com embed, booking webhook, Nervous System Map PDF.
