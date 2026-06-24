# The Bridge Hub — Project Documentation

> Entry point for builders. Read this before opening any other file.
> Last updated: June 2026

---

## What this is

The Bridge Hub is a trauma-informed online psychological screening tool for women aged 28–45 who are overwhelmed and carrying patterns they cannot name. It administers five validated clinical instruments across 115 questions (~35–45 minutes), generates a personalised **Nervous System Map** report, and converts completions into booked **Clarity Calls** with a therapist.

This is not a quiz. It is a clinical screening tool with a warm, editorial, field-guide aesthetic. It must feel safe at every step.

**Builder:** Caroline Jones, solo. Building with Cursor. Prefer clear, readable code over clever abstractions.

**This repo is not** the Caroline Pipeline content system (`~/pipeline`).

---

## Goals (equal weight)

1. Get women to book a Clarity Call
2. Build the email list (Kit nurture)
3. Establish authority and trust

---

## Target user

Women aged 28–45, global English audience. Overwhelmed, carrying unidentified patterns, not in crisis but not okay. Entry point: Instagram → landing page → screening → results → booking.

---

## Tech stack — locked

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js 14 App Router | No Pages Router. Monolith on Vercel. |
| Styling | Tailwind CSS | Custom tokens from DESIGN_SYSTEM |
| Database + auth | Supabase | EU region. Magic link auth. No passwords. |
| Transactional email | Resend | PDF delivery, magic links, confirmation |
| Nurture email | Kit (formerly ConvertKit) | Opt-in list only |
| Booking | Cal.com | Free plan at launch. Embedded on `/book`. |
| PDF generation | React PDF (`@react-pdf/renderer`) | Generated on booking confirmation only |
| Hosting | Vercel | Auto-deploy from GitHub |
| AI generation | OpenRouter | `claude-sonnet-4-6` for all AI calls |
| Repository | GitHub private repo | This repo |

> **Note:** The master brief still references Mailchimp and older design tokens. Locked decisions in `specs/cursor-guide/` supersede the master brief where they conflict. Kit replaces Mailchimp. DESIGN_SYSTEM.md replaces master brief colour tokens.

---

## Route map — locked

| Route | Screen | Key behaviour |
|---|---|---|
| `/` | S1 Landing | No session. Cookie consent on first visit. |
| `/begin` | S2 What to expect | No session. Breathing overlay introduced. |
| `/save` | S3 Email + name capture | Session created on submit to Supabase. |
| `/assessment` | S5 Question shell | All 115 questions. Auto-save per answer. |
| `/results` | S6 Touchpoint 1 | AI-generated rows. Clarity Call CTA. |
| `/book` | S7 Booking | Phone capture + Cal.com embed. |
| `/confirmed` | S8 Confirmation | PDF triggered. Kit nurture if opted in. |
| `/resume` | R1 Re-entry | Email input for magic link. |
| `/expired` | R2 Expired link | New link request. |

---

## Assessment sections — locked order

| # | Internal name | User-facing name | Instrument | Items |
|---|---|---|---|---|
| 1 | stress | The Load | PSS-10 | 10 |
| 2 | mood | The Fog | PHQ-8 | 8 |
| 3 | body | The Body Room | MAIA-2 | 27 |
| 4 | carrying | The Weight You Carry | PCL-5 | 20 |
| 5 | emotional | The Weather Inside | PID-5-SF | 50 |

**Total:** 115 items across 5 sections.

---

## Documentation index

| Doc | Purpose |
|---|---|
| [current-status.md](current-status.md) | What is done vs pending across all workstreams |
| [roadmap.md](roadmap.md) | Implementation phases 0–8 (repo init through launch) |
| [architecture.md](architecture.md) | Frontend/backend split, API routes, data model summary |
| [design-system.md](design-system.md) | Visual tokens, charts, assets — summary with pointers |
| [ORGANIZATION.md](ORGANIZATION.md) | Pipeline vs Bridge Hub — separate repos and Cursor windows |

---

## Spec files — authoritative sources

### Cursor handoff (read first for any build task)

| File | Contains |
|---|---|
| [specs/cursor-guide/START_HERE.md](../specs/cursor-guide/START_HERE.md) | Orientation, stack, routes, locked decisions |
| [specs/cursor-guide/FILE_OVERVIEW.md](../specs/cursor-guide/FILE_OVERVIEW.md) | What every file is and which version to use |
| [specs/cursor-guide/ARCHITECTURE.md](../specs/cursor-guide/ARCHITECTURE.md) | Full Supabase schema, API routes, PDF/email flow |
| [specs/cursor-guide/DESIGN_SYSTEM.md](../specs/cursor-guide/DESIGN_SYSTEM.md) | All design tokens, components, chart SVG specs |
| [specs/cursor-guide/COPY_REFERENCE.md](../specs/cursor-guide/COPY_REFERENCE.md) | Copy slot map, band labels, forbidden phrases |

### Scoring (Chat 03)

| File | Use for |
|---|---|
| [specs/chat-03/chat-03-scoring-engine-pseudocode-v2.md](../specs/chat-03/chat-03-scoring-engine-pseudocode-v2.md) | All scoring calculations — source of truth |
| [specs/chat-03/chat-03-phase2-normative-data-v2.md](../specs/chat-03/chat-03-phase2-normative-data-v2.md) | Band cutoffs, normative means/SDs, percentiles |
| [specs/chat-03/chat-03-scoring-results-roadmap-v2.md](../specs/chat-03/chat-03-scoring-results-roadmap-v2.md) | Results architecture, dimensional framework, patterns |
| [specs/chat-03/chat-03-layer2-content-library-v2.md](../specs/chat-03/chat-03-layer2-content-library-v2.md) | Clinical Layer 2 blocks — **therapist briefing only** |

### UX (Chat 04)

| File | Use for |
|---|---|
| [specs/chat-04/chat-04-ux-roadmap-v7.md](../specs/chat-04/chat-04-ux-roadmap-v7.md) | Full UX roadmap and journey map |
| [specs/chat-04/chat-04-wireframe-descriptions-v1.md](../specs/chat-04/chat-04-wireframe-descriptions-v1.md) | Screen-by-screen structural pseudocode |
| [specs/chat-04/chat-04-phase4-save-return-v1.md](../specs/chat-04/chat-04-phase4-save-return-v1.md) | Save and return / magic link architecture |
| [specs/chat-04/chat-04-design-system-v1.md](../specs/chat-04/chat-04-design-system-v1.md) | Section worlds, breathing overlay, backgrounds |

### Copy (Chat 05)

| File | Use for |
|---|---|
| [specs/chat-05/chat-05-layer2-user-facing-v1.md](../specs/chat-05/chat-05-layer2-user-facing-v1.md) | User-facing Layer 2 blocks — **client report only** |
| [specs/chat-05/chat-05-report-pseudocode-v4.md](../specs/chat-05/chat-05-report-pseudocode-v4.md) | Full client report structure and conditional logic |
| [specs/chat-05/chat-05-therapist-briefing-v1.md](../specs/chat-05/chat-05-therapist-briefing-v1.md) | Therapist briefing framing and AI prompt |
| [specs/chat-05/chat-05-phase3-copy-v3.md](../specs/chat-05/chat-05-phase3-copy-v3.md) | Touchpoint 1 copy, AI prompts, confirmation email |
| [specs/chat-05/chat-05-sample-client-report-v5.html](../specs/chat-05/chat-05-sample-client-report-v5.html) | Visual reference for PDF/report components |

### Master brief

| File | Notes |
|---|---|
| [specs/master-brief/the-bridge-hub-master-brief.md](../specs/master-brief/the-bridge-hub-master-brief.md) | Project-wide source of truth — superseded where cursor-guide docs conflict |

### Assets

| Path | Contains |
|---|---|
| [specs/assets/](../specs/assets/) | Logos, section backgrounds, UI boards, brand assets |

---

## Read order for implementation

1. This file
2. [design-system.md](design-system.md) then [specs/cursor-guide/DESIGN_SYSTEM.md](../specs/cursor-guide/DESIGN_SYSTEM.md)
3. [architecture.md](architecture.md) then [specs/cursor-guide/ARCHITECTURE.md](../specs/cursor-guide/ARCHITECTURE.md)
4. [specs/chat-03/chat-03-scoring-engine-pseudocode-v2.md](../specs/chat-03/chat-03-scoring-engine-pseudocode-v2.md)
5. [roadmap.md](roadmap.md) — follow build phases in order

---

## Build order (from START_HERE)

1. Supabase schema
2. Authentication and session management
3. Assessment shell and question routing
4. Scoring engine
5. Results page (Touchpoint 1)
6. Report generation (PDF)
7. Booking flow
8. Email triggers

---

## Global rules — enforce always

1. **Mobile first.** Desktop is an adaptation of mobile.
2. **Disclaimer on every screen:** "This is a screening tool, not a clinical diagnosis."
3. **No clinical labels** in client-facing text. See COPY_REFERENCE.md.
4. **Safety flag data** never reaches any client-facing pipeline.
5. **PDF only on booking confirmation** (S8). Never before.
6. **Forward-only assessment.** No back button.
7. **Auto-save after every answer.**
8. **Supabase EU region only.** No data outside EU.
9. **No health data stored before S3 consent.**

---

## Two critical content rules

**Rule 1 — Two Layer 2 versions, two uses:**
- `chat-05-layer2-user-facing-v1.md` → client report ONLY
- `chat-03-layer2-content-library-v2.md` → therapist briefing ONLY
- Never mix them.

**Rule 2 — Safety flags are architecturally isolated:**
- Separate `safety_flags` Supabase table
- Service role access only
- No connection to PDF, email, or user-facing results pipelines

---

*If anything conflicts between files, the master brief wins — except where cursor-guide docs explicitly supersede it (Kit vs Mailchimp, design tokens, item count).*
