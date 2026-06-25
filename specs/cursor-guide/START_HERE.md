# The Bridge Hub — START HERE
## Cursor Build Reference — Read This First

> This is the orientation document for building The Bridge Hub.
> Read this file completely before opening any other file.
> Every decision referenced here is locked. Do not second-guess them.
> Last updated: June 2026

---

## What you are building

A trauma-informed online psychological screening tool for women aged
28-45 who are overwhelmed and carrying unidentified patterns. The tool
administers five validated psychological instruments across 104 questions
(~15 minutes), generates a personalised report called the Nervous System Map,
and converts completions into booked Clarity Calls with a therapist.

This is not a quiz. It is a clinical screening tool with a warm,
editorial, field-guide aesthetic. It must feel safe at every step.

---

## The builder

Caroline Jones. Solo. Intermediate technical level. Software
engineering diploma. Building with Cursor. Do not over-engineer.
Prefer clear, readable code over clever abstractions.

---

## Tech stack — locked, do not change

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js 14 App Router | No Pages Router |
| Styling | Tailwind CSS | Custom tokens in tailwind.config |
| Database | Supabase | EU region. Magic link auth. No passwords. |
| Transactional email | Resend | PDF delivery, magic links, confirmation |
| Nurture email | Kit (formerly ConvertKit) | Opt-in list only |
| Booking | Cal.com | Free plan at launch. Embedded on /book route. |
| PDF generation | React PDF (@react-pdf/renderer) | Generated on booking confirmation only |
| Hosting | Vercel | Auto-deploy from GitHub |
| AI generation | OpenRouter | S6 touchpoint: `google/gemini-2.5-flash` (in code). Report/PDF: `OPENROUTER_MODEL` (default `google/gemini-2.5-pro`) |
| Repository | GitHub private repo | |

---

## Route map — locked

| Route | Screen | Key behaviour |
|---|---|---|
| / | S1 Landing | No session. Cookie consent on first visit. |
| /begin | S2 What to expect | No session. Breathing overlay introduced. |
| /save | S3 Email + name capture | Session created on submit to Supabase. |
| /assessment | S5 Question shell | All 104 questions. Auto-save per answer. |
| /results | S6 Touchpoint 1 | AI-generated rows. Clarity Call CTA. |
| /book | S7 Booking | Phone capture + Cal.com embed. |
| /confirmed | S8 Confirmation | PDF triggered. Kit nurture if opted in. |
| /resume | R1 Re-entry | Email input for magic link. |
| /expired | R2 Expired link | New link request. |

---

## Assessment sections — locked order

| # | Internal name | User-facing name | Instrument | Items |
|---|---|---|---|---|
| 1 | body | The Body Room | MAIA-2 | 27 |
| 2 | stress | The Load | PSS-10 | 10 |
| 3 | mood | The Fog | PHQ-8 | 8 |
| 4 | carrying | The Weight You Carry | PCL-5 | 20 |
| 5 | emotional | The Weather Inside | PID-5-SF | 39 |

Total: 104 items across 5 sections. Section 1 is always The Body Room (MAIA-2).

---

## Session architecture — locked

- Session created at S3 on email submit (Supabase)
- Auto-save after every answer: section index, question index, all
  answers, timestamps
- localStorage for instant same-device restore
- Supabase is source of truth. If conflict, Supabase wins.
- Magic link: 30-day expiry, single-use, via Resend
- Forward-only navigation. No back button. No browser back during
  assessment.
- On resume: land at exact question, no transition replay
- After section-order changes (June 2026): do not resume pre-change
  in-progress sessions — start a fresh session via /save for testing

---

## PDF timing — locked

PDF generates on booking confirmation (S8) ONLY.
Never before. Nothing generated or stored until booking confirmed.
This is a deliberate GDPR position. Do not change it.

---

## Key decisions that are locked — do not revisit

- No AMPD composite scores (PID-5-SF). Not calculated, not stored.
- No back button anywhere in the assessment
- No visible timer to the user
- Breathing overlay is the only break mechanism
- Disclaimer on every screen: "This is a screening tool, not a
  clinical diagnosis."
- Completion time tracked silently — surfaces in therapist briefing only
- Kit replaces Mailchimp throughout
- Phone number collected at S7, NOT inside Cal.com
- Cal.com free plan at launch
- PID-5-SF: 39 items (10 facets; Depressivity uses 3 items). Safety,
  Unusual Beliefs, and Perceptual Dysregulation items removed June 2026.

---

## File map — what each document contains

Read these files for the workstream they cover. Do not mix them up.

### Design and UX
| File | Contains |
|---|---|
| DESIGN_SYSTEM.md | All design tokens, colours, typography, component specs, all five chart implementations with exact SVG values |
| chat-04-design-system-v1.md | Visual identity reference — section worlds, breathing overlay, background textures |
| chat-04-ux-roadmap-v7.md | Complete UX and user journey — all 7 phases |
| chat-04-wireframe-descriptions-v1.md | Screen-by-screen structural pseudocode |
| chat-04-phase6-interaction-spec-v1.md | Interaction timings, animation specs, state transitions |

### Scoring and results
| File | Contains |
|---|---|
| chat-03-scoring-engine-pseudocode-v2.md | Complete scoring functions for all 5 instruments. Source of truth for all calculations. |
| chat-03-phase2-normative-data-v2.md | Band cutoffs, normative means and SDs, percentile lookup tables |
| chat-03-scoring-results-roadmap-v2.md | Full results architecture, AI payload structure, dimensional framework |
| chat-03-layer2-content-library-v2.md | Original clinical Layer 2 blocks — USE FOR THERAPIST BRIEFING ONLY |

### Copy
| File | Contains |
|---|---|
| COPY_REFERENCE.md | Map of every copy slot, which file is authoritative, static vs AI-generated |
| chat-05-layer2-user-facing-v1.md | All 88 user-facing Layer 2 blocks — USE FOR CLIENT REPORT |
| chat-05-report-pseudocode-v4.md | Complete client report structure, all layers, chart specs, conditional logic |
| chat-05-therapist-briefing-v1.md | Therapist briefing framing copy and Call Preparation Brief AI prompt |
| chat-05-phase3-copy-v3.md | Touchpoint 1 copy slots, synthesis and row JSON payloads, confirmation email and SMS |
| chat-05-sample-client-report-v5.html | Working sample of the full client report — visual reference |

### Architecture
| File | Contains |
|---|---|
| ARCHITECTURE.md | Supabase schema, API routes, scoring engine integration, PDF generation flow, email triggers |
| bridge-hub-questionnaire-reference.md | All 104 items, scales, section order — single source for question data |

---

## Where to begin

1. Read this file completely
2. Read DESIGN_SYSTEM.md — understand the visual language before writing a line of UI
3. Read ARCHITECTURE.md — understand the data model before writing a line of logic
4. Read chat-03-scoring-engine-pseudocode-v2.md — understand the scoring before building the assessment
5. Build in this order with Cursor:
   - Supabase schema
   - Authentication and session management
   - Assessment shell and question routing
   - Scoring engine
   - Results page (Touchpoint 1)
   - Report generation (PDF)
   - Booking flow
   - Email triggers

---

## Global rules — enforce always

1. Mobile first. Every component designed for mobile. Desktop is
   an adaptation.
2. Disclaimer on every screen: "This is a screening tool, not a
   clinical diagnosis."
3. No clinical labels in client-facing text. See COPY_REFERENCE.md.
4. PDF only on booking confirmation.
5. Forward-only assessment. No back.
6. Auto-save after every answer.
7. Supabase EU region only. No data outside EU.
8. No health data stored before S3 consent.

---

*If anything conflicts with the master brief, the master brief wins.*
*If anything conflicts with this file, this file wins over other docs.*
