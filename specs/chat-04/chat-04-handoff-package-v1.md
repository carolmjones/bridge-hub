# The Bridge Hub — Chat 04 Handoff Package — v1
## Everything the downstream chats need from Chat 04

> This is the single handoff document from Chat 04 (UX + User Journey).
> Each section below is addressed to a specific receiving chat.
> All decisions are locked and approved by Caroline Jones.
> Last updated: June 2026

---

## FOR CHAT 05 — Copy

### Screen inventory with copy slots

Every item marked COPY SLOT needs final language from Chat 05.
All placeholder text in wireframes is directional only.

**S1 — Landing page**
- Headline: welcoming, atmospheric, not problem-framing. Direction: "Something in you has been asking to be understood."
- Subline: what this is + time estimate (30-40 minutes)
- CTA: "Begin your map"
- Urgent help link text

**S2 — What to expect**
- Title: field-guide tone, not rules page. Direction: "Before we begin"
- Breathing intro prompt
- Trust items (4): time, sections overview, confidential, validated tools
- Clinical credibility line: these are the same tools used by clinicians worldwide
- CTA: "I'm ready to begin"

**S3 — Email + name capture**
- Title: "Save your place" direction
- Body text explaining progress saving
- Kit opt-in checkbox label
- GDPR consent block text + privacy policy link

**Breathing overlay**
- Label in UI: "Take a breath"
- Explanation text at top
- Stage labels: Breathe in / Hold / Breathe out
- Close button: "I'm ready — continue"

**Section transitions (×5) — new names locked**
1. The Load — "This section looks at the pressure your body may have learned to hold."
2. The Fog — "We'll explore how life has been feeling lately."
3. The Body Room — "This section explores what your body has been noticing, holding, and signalling."
4. The Weight You Carry — "We'll look at what you've been carrying and how it shows up."
5. The Weather Inside — "This section explores your emotional patterns, protection, and what changes the weather inside."

**PCL-5 write-in (5d)**
- Intro text acknowledging difficult content
- Subtext: optional, won't affect results
- Field placeholder
- Two buttons: Skip / Begin section 4

**S6 — Touchpoint 1 (results + Clarity Call)**
- Screening complete eyebrow
- Affirming headline: acknowledge what they've done
- Synthesis paragraph (AI-generated per user, Chat 03 logic)
- Credibility block: validated tools, measured not estimated
- Results overview label: "Your map"
- Each result row: plain language, no scores, no band labels
- Full report block: what it contains, how it goes deeper
- Clarity Call paragraph: warm, personal, outcome = clarity
- CTA: "Book your free Clarity Call"
- Report note: scored using published psychometric methods

**S7 — Booking screen**
- Heading: "Choose a time that works for you"
- Phone field hint: "We'll send a reminder text before your call. No other use."

**S8 — Booking confirmation**
- Headline: "You're booked in. We'll see you soon." direction
- Subline about confirmation email
- Three next steps copy

**R1 — Re-entry**
- "Welcome back" + progress saved message

**R2 — Expired link**
- "This link has expired" + "No worries" message

### Voice rules (from master brief)
Never use: "journey", "nervous system broken", "diagnosis", "disorder"
Always use: patterns, stress load, nervous system regulation, body awareness
No em dashes. No filler phrases. Warm, direct.

### Key copy direction notes
- Time estimate: 30-40 minutes (not 45)
- Credibility: validated clinical tools used by clinicians and researchers worldwide
- Clarity Call: named consistently throughout, always "Free Clarity Call" or "your free Clarity Call"
- Results language: "What your answers may be showing" — never "Your score indicates"
- Overall principle: whisper, not shout

---

## FOR CHAT 06 — Design (COMPLETED BY CAROLINE)

Chat 06 scope has been completed directly by Caroline.
Full design system documented in: `chat-04-design-system-v1.md`

Covers: colour palette, typography (Cormorant Garamond + Inter),
buttons, cards, forms, icons, section worlds, breathing overlay,
backgrounds/textures, layout rules.

Visual reference files:
- `wireframe-board-onboarding.png` — S1, S2, breathing overlay, S3
- `wireframe-board-assessment.png` — question shell, transitions, write-in
- `wireframe-board-results-booking.png` — Touchpoint 1, booking, confirmation, re-entry, expired
- `ts-section-[1-5]` PNGs — individual transition screen artwork

---

## FOR CHAT 07 — Dev Build

### Tech stack (from master brief)
Next.js 14 App Router, Tailwind CSS, Supabase (EU region), Resend,
Kit (ConvertKit), Cal.com (free plan), React PDF, Vercel, GitHub.

### Route map

| Route | Screen | Notes |
|---|---|---|
| / | S1 Landing | No session. Cookie consent. |
| /begin | S2 What to expect | No session. Breathing overlay introduced. |
| /save | S3 Email + name | Session created on submit to Supabase. |
| /assessment | S5 Question shell | All 115 questions. Auto-save per answer. |
| /assessment (transition) | S4 Section transitions | Direction 2. 2.5s hold. Tap to skip. |
| /assessment (write-in) | 5d PCL-5 | Before section 4 questions. Optional. |
| /results | S6 Touchpoint 1 | Collapsible results. Clarity Call CTA. |
| /book | S7 Booking | Phone capture + Cal.com embed. |
| /confirmed | S8 Confirmation | PDF triggered. Kit nurture if opted in. |
| /resume | R1 Re-entry | Email input for magic link. |
| /expired | R2 Expired link | New link request. |

### Session architecture
- Session created at S3 on email submit (Supabase)
- Auto-save after every answer: section index, question index, all answers, timestamps
- localStorage for instant same-device restore
- Supabase is source of truth (if conflict, Supabase wins)
- Magic link: 30-day expiry, single-use, via Resend
- Architect for Option C upgrade (anonymous token) — retrofittable

### Assessment sections (locked order)

| Section | Name (internal) | Name (user-facing) | Instrument | Items |
|---|---|---|---|---|
| 1 | stress | The Load | PSS-10 | 10 |
| 2 | mood | The Fog | PHQ-8 | 8 |
| 3 | body | The Body Room | MAIA-2 | 27 |
| 4 | carrying | The Weight You Carry | PCL-5 | 20 |
| 5 | emotional | The Weather Inside | PID-5-SF | 50 |

### Interaction spec reference
Full spec in: `chat-04-phase6-interaction-spec-v1.md`
Key timings: answer tap 350ms total, crossfade 200ms, transition 2.5s hold,
breathing 4-4-4 cycle (12s), overlay slide 200ms.

### Design system reference
Full spec in: `chat-04-design-system-v1.md`
Fonts: Cormorant Garamond (Google Fonts) + Inter.
Tailwind: configure custom colours from palette hex values.

### Phone capture (S7)
- Stored to Supabase alongside session user ID
- Country prefix default US (+1), editable
- Not blocking — user can proceed without
- SMS reminder: manual at launch, Twilio upgrade path later
- Cal.com webhook triggers booking confirmation flow

### PDF timing
Generated on booking confirmation (S8) only.
Resend delivers to email. Kit adds to nurture if opted in.

### Completion time tracking
Silent. section_start_time and section_end_time timestamps per section.
Total completion time calculated. Surfaces in therapist briefing only.
Under 15 minutes = completion quality flag (Chat 03).

### Forward-only enforcement
No back button in UI. No browser back navigation during assessment.
On resume: land at exact question, no transition replay.

---

## FOR CHAT 08 — Email Automation

### Platform: Kit (formerly ConvertKit)
AI agent OpenClaw manages campaigns via Kit REST API.

### Trigger points

| Trigger | Action | Timing |
|---|---|---|
| S3 submit + Kit opt-in checked | Add to Kit nurture list | Immediate |
| Session inactive 12h | Abandoned session reminder | 12h after last answer |
| Assessment complete, no booking | Follow-up with Clarity Call link | Chat 08 to define |
| Booking confirmed (S8) | PDF report delivered via Resend | Immediate |
| Booking confirmed (S8) | Booking confirmation email via Cal.com | Immediate |
| Pre-call reminder | SMS to phone number (manual at launch) | Day before call |

### Naming
"Clarity Call" — used consistently in all emails.
"Your map" — used for results references.
"The Bridge Hub" — brand name in all communications.

---

## FOR CHAT 09 — Booking

### Cal.com configuration
- Free plan at launch
- Event type: "Clarity Call with Caroline Jones"
- Duration: 45 minutes
- Format: Video call
- Price: Free (displayed in embed)
- Phone number: collected by Bridge Hub (S7), NOT by Cal.com
- Embed renders on dedicated S7 screen after phone capture fields

### Naming
"Clarity Call" — locked. Used on all screens, emails, and booking flow.
"Free Clarity Call" on badges and CTAs.

---

## FOR CHAT 10 — GDPR

### Consent moments

| Screen | What is captured | Consent type |
|---|---|---|
| S1 | Cookie consent | Banner: Manage / Accept |
| S3 | Health data storage | Explicit block with privacy policy link |
| S3 | AI processing of responses | Included in health data consent block |
| S3 | Kit email opt-in | Checkbox, unchecked by default |
| 5d | PCL-5 write-in text | Chat 10 to confirm treatment |
| S7 | Phone number | Purpose stated on screen: reminder only |

### Data storage
All in Supabase EU region.
No health data stored before S3 consent.
Session model must support user-initiated deletion.
Chat 10 to define automatic expiry of incomplete sessions.

### Phone number
Collected at S7 with explicit purpose: "We'll send a reminder text before your call. No other use."
Chat 10 to confirm whether implicit consent on submit is sufficient or checkbox needed.

---

## Document index

| File | Contents |
|---|---|
| chat-04-ux-roadmap-v7.md | Full roadmap with all phases 1-6 documented |
| chat-04-ux-principles-v2.md | Phase 1: UX principles and constraints |
| chat-04-phase3-progress-logic-v1.md | Phase 3: progress indicator behaviour |
| chat-04-phase4-save-return-v1.md | Phase 4: save and resume specification |
| chat-04-wireframe-descriptions-v1.md | Phase 5: structural pseudocode per screen |
| chat-04-phase6-interaction-spec-v1.md | Phase 6: interaction and state specifications |
| chat-04-design-system-v1.md | Visual identity and token reference |
| wireframe-board-onboarding.png | Reimagined S1, S2, breathing, S3 |
| wireframe-board-assessment.png | Reimagined shell, transitions, write-in |
| wireframe-board-results-booking.png | Reimagined S6, S7, S8, R1, R2 |
| ts-section-[1-5] PNGs | Individual transition screen artwork |
| chat-04-handoff-package-v1.md | This document |

---

*This is the Chat 04 handoff package.*
*All decisions locked. All downstream chats have what they need.*
*If anything conflicts with the master brief, the master brief wins.*
