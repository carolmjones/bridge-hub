# The Bridge Hub — Chat 04 Roadmap — v7
## UX + User Journey

> This is Chat 04 of The Bridge Hub project. This chat owns the screen-by-screen
> flow, progress logic, save-and-return, and mobile-first wireframes.
>
> Working rule: nothing moves to the next phase until Caroline approves.
> This document is the single source of truth for Chat 04. It supersedes
> all previous roadmap versions.
> If anything conflicts with the master brief, the master brief wins.
> Last updated: June 2026

---

## Phase completion status

| Phase | Description | Status |
|---|---|---|
| 1 | UX principles and constraints | Complete |
| 2 | User journey map | Complete |
| 3 | Progress logic | Complete |
| 4 | Save and return flow | Complete |
| 5a | Wireframes — landing + onboarding (Screens 1–3) | Complete |
| 5b | Wireframes — assessment shell + question screen | Complete |
| 5c | Wireframes — section transition screens | Complete |
| 5d | Wireframes — PCL-5 optional write-in UX | Complete |
| 5e | Wireframes — Touchpoint 1 screen (post-completion) | Complete |
| 5f | Wireframes — booking screen | Complete |
| 5g | Wireframes — booking confirmation screen | Complete |
| 5h | Wireframes — re-entry + expired link screens | Complete |
| 6 | Interaction and state specifications | Pending |
| 7 | Handoff package | Pending |

---

## PHASE 1 — UX Principles and Constraints — COMPLETE

Output: `chat-04-ux-principles-v2.md`

### Foundation
Mobile first. 390px. Touch targets 44px min. Single column.
Desktop is an adaptation of mobile, never the other way around.

### Entry sequence — locked
Landing → What to expect → Email + name capture → Question 1
Option A2: email after onboarding, at moment of highest intent.

### Breathing pop-up — locked
Full-screen overlay. 4-4-4 box breath. Text fades in sync with animation.
Introduced on S2. Persistent button top right throughout assessment.
Opt-in only. Never auto-plays. Only break mechanism — no pause button.

### Navigation — locked
Forward only. Instant auto-advance on tap. No back button. No undo.

### Answer cards — locked
Full-width. Tap selects and instantly advances. No submit button.

### Progress indicator — locked
Five diamond markers. Connecting line fills and thickens as questions answered.
Section name above, centered. No labels under diamonds.

### Time tracking — locked
Silent. Therapist briefing only. Never shown to user.

### Email platform — locked
Kit (formerly ConvertKit). AI agent OpenClaw manages via REST API.

### Save and resume — locked
Silent auto-save after every answer.
Same-device: auto-restore on URL return, silent, straight to question.
Any device: magic link via email, 30-day expiry, single-use.
Option C (anonymous token) noted as future upgrade.

### Disclaimer placement — locked
On S1, S2, S3, S6, S8. NOT in the assessment shell.

### Urgent help link placement — locked
On S1, S2, S6. NOT in the assessment shell.

### The Bridge Hub wordmark — locked
Bottom of every screen. Small, spaced caps, ~40% opacity.

### What this tool never does — locked
No timers. No urgency cues. No email gate before value. No punishing
error states. No back button. No per-question counter. No visible time
tracking. No auto-playing animations. No pause button. Safety flag
never shown to user. No hover-dependent interactions.

---

## PHASE 2 — User Journey Map — COMPLETE

### Screen inventory

| ID | Screen | Key state |
|---|---|---|
| S1 | Landing page | No session. Cookie consent on first visit. |
| S2 | What to expect | No session. Breathing overlay introduced. Urgent help link. |
| S3 | Email + name capture | Session created on submit. GDPR consent. Kit opt-in unchecked. |
| S4 | Section transition screens (x5) | Direction 2. Full screen. 2.5s. Tap to skip. |
| S5 | Question screen — assessment shell | Auto-save per answer. Time tracked silently. |
| S6 | Touchpoint 1 — Clarity Call screen | Assessment complete. PDF not yet generated. |
| S7 | Booking screen | Phone capture + Cal.com embed. Dedicated screen. |
| S8 | Booking confirmation | PDF triggered. Resend delivers. Kit nurture if opted in. |
| R1 | Re-entry screen | Email input. "Send my resume link." |
| R2 | Expired link screen | Expiry notice. Email input. New link sent. |

### Branching logic
- No email given: nothing stored, no follow-up
- Email given, abandoned mid-assessment: single reminder at 12h (Chat 08)
- Completed, not booked: single follow-up email with Clarity Call link (Chat 08)
- Same device return: silent auto-restore, straight to question
- Different device: re-entry screen (R1) → magic link → straight to question
- Expired link: R2 screen → new link sent immediately

### PDF timing — locked
Generates on booking confirmation (S8) only.

### Clarity Call — locked
"Clarity Call" used consistently across all screens, emails, booking flow.
Free. Chat 08 and Chat 09 to use this name.

---

## PHASE 3 — Progress Logic — COMPLETE

Output: `chat-04-phase3-progress-logic-v1.md`

### Indicator
Five delicate diamond markers. Connecting line fills and thickens per section.
Section name above, centered. No labels under diamonds.

### Diamond states
- Upcoming: fine outline, 0.75px, faint
- Active: outline, 1px
- Complete: solid fill

### Fill line
Starts ~1px. Grows to ~3.5px as section progresses.
Extends toward next diamond proportionally. Resets on new section.

### Section transitions — Direction 2 — locked
300ms fade → full-screen tone (2.5s, tap to skip) → 300ms fade to first question.
Section name large centred, drifts up (400ms ease-out). No copy, no CTA.

### Section background tones — locked
1. Your stress load — warm sandy (#EDE8E2)
2. How life has been feeling — warm off-white (#E8E4DE)
3. How you live in your body — cool sage (#E4EBE8)
4. What you have been carrying — steel blue (#E2E6EA)
5. Your emotional landscape — soft mauve (#EAE6E8)

---

## PHASE 4 — Save and Return Flow — COMPLETE

Output: `chat-04-phase4-save-return-v1.md`

No pause button. Breathing overlay is the only break mechanism.
Silent auto-save per answer. Same-device auto-restore. Magic link 30-day expiry.
12h reminder for abandoned sessions. Single follow-up for completed not booked.

Fixed shell: section name / progress indicator / breathing button (top right) /
wordmark (bottom center). No pause button, no exit, no disclaimer.

---

## PHASE 5 — Wireframes — COMPLETE

All wireframes mobile-first at 320px (scales to 390px). Desktop adaptation
follows in Phase 6 or Chat 06.

---

### 5a — Landing + onboarding — COMPLETE

**S1 — Landing page**
- Warm off-white background (#F5F2EE)
- Urgent help link top right
- Circle portrait photo placeholder (Caroline) centered
- "The Bridge Hub" eyebrow label
- Serif headline — welcoming, validating (Chat 05)
- Subline — what this is, 30-40 mins (Chat 05)
- Single CTA button
- Disclaimer in footer
- Cookie consent banner on first visit

**S2 — What to expect**
- Lighter background (Chat 06 to refine)
- Logo wordmark top left, breathing button top right
- Trust items with soft icon circles
- Clinical credibility line: validated tools, not a general quiz
- Breathing intro prompt
- Single CTA
- Disclaimer in footer

**Breathing overlay**
- Full dark screen (96% opacity)
- Brief explanation at top
- Expanding/contracting circle
- Text fades: Breathe in / Hold / Breathe out — 4s each
- "I'm ready — continue" button

**S3 — Email + name capture**
- Logo top left, breathing button top right
- "Save your place" heading
- First name + email fields
- Kit opt-in checkbox (unchecked)
- GDPR consent block with privacy policy link
- CTA: "Save my progress and begin"
- Disclaimer in footer

---

### 5b — Assessment shell — COMPLETE

**Fixed shell elements**
- Section name — top left, small caps
- Breathing button — top right, 32px circle, consistent throughout
- Progress indicator — five diamonds, fill line
- The Bridge Hub wordmark — bottom center, 10px, 40% opacity

**Cycling elements**
- Question number (X of Y within section only)
- Question text — 18px serif
- Full-width answer cards — white, soft border
- Selected: card fills dark, others dim to 35%
- Instant auto-advance

No footer. No disclaimer. No back button. No exit.

**Button hover:** section tone colour, not cream. Confirmed for all sections.

---

### 5c — Section transition screens — COMPLETE

Direction 2. Full screen. Five instances.
Section number ("Section X of 5") + section name large in serif.
"Tap anywhere to continue" at 40% opacity.
Wordmark anchors bottom. No breathing button on transition.
Auto-advances after 2.5s if not tapped.
Five distinct tones as specified in Phase 3.

---

### 5d — PCL-5 optional write-in — COMPLETE

After Section 4 transition, before first PCL-5 question.
Steel blue tone carries through.
Shell header active.
"Before you begin this section" label.
Intro text acknowledging difficult content.
Optional text field with explicit "optional" label.
Two equal-weight buttons: "Skip" / "Begin section 4".
Button hover uses section tone.

---

### 5e — Touchpoint 1 — COMPLETE

Scrollable. Most important conversion screen.

**Structure (top to bottom):**
1. Opening — "Screening complete" eyebrow, affirming serif headline,
   italic synthesis paragraph (AI-generated per user), credibility block
2. Results overview — five collapsible rows, collapsed by default,
   first section open to invite interaction. Each row: coloured dot
   (matching section tone) + section name + chevron. Expanded shows
   plain-language observation. No scores, no band labels.
3. Full report block — warm tinted background. What it contains,
   how it goes deeper, sent after booking.
4. Clarity Call CTA — "Free Clarity Call" badge, warm paragraph framing
   the call as a conversation about their results, CTA button.
5. Footer — disclaimer, urgent help link, wordmark.

Clinical credibility appears in two places:
- Credibility block after synthesis: "validated tools used by clinicians
  and researchers worldwide — not a general quiz"
- Report note: "scored using published psychometric methods"

---

### 5f — Booking screen — COMPLETE

Dedicated screen. Warm linen background (#EDE8E0).

**Structure:**
- Eyebrow: "Free Clarity Call"
- Heading: "Choose a time that works for you"
- Your details block (white card): name + email pre-filled, locked, "Saved" label
- Mobile number block (white card): country prefix default US (+1),
  number input, hint: "We'll send a reminder text before your call. No other use."
  Phone number stored to Supabase. Manual SMS reminder at launch,
  Twilio/Cal.com upgrade path later.
- Cal.com embed: Clarity Call · Caroline Jones, 45 min, Video, Free
- Wordmark bottom center

**Notes for Chat 07:**
- Phone stored to Supabase alongside session user ID
- Country prefix default US, editable — users are global
- Cal.com embed loads after details and phone fields
- On booking confirmation webhook, trigger reminder (manual for now)

**Notes for Chat 09:**
- Cal.com free plan at launch
- Phone number collected by Bridge Hub, not Cal.com
- SMS reminder managed outside Cal.com initially

**Notes for Chat 10:**
- Phone number GDPR treatment: purpose stated on screen ("reminder only")
- Confirm whether implicit consent on submit is sufficient or checkbox needed

---

### 5g — Booking confirmation — COMPLETE

Journey complete. No CTA needed.

**Structure:**
- Teal check icon in circle
- Serif headline: "You're booked in. We'll see you soon."
- Subline: confirmation sent to email
- Booking summary card (white): date/time, video call format, "Clarity Call with Caroline Jones"
- "What happens next" section — three numbered steps:
  1. Full report on its way (sent now)
  2. Read your report before the call
  3. Your Clarity Call — what happens, "you'll leave with clarity"
- Disclaimer
- Wordmark

**State changes on this screen:**
- PDF generation triggered
- Resend delivers PDF to email
- Kit adds to nurture list if opted in
- Chat 08 owns all email triggers

---

### 5h — Re-entry + expired link screens — COMPLETE

**R1 — Re-entry screen**
- Warm neutral icon (mail forward)
- "Welcome back" serif heading
- "Your progress is saved" — enter email for resume link
- Email input + "Send my resume link" CTA
- Helper text: "Check your inbox"
- "Or start a new screening" escape hatch at bottom
- Wordmark

**R2 — Expired link screen**
- Amber icon (clock) — not an error, an expiry
- "This link has expired" serif heading
- "No worries — your progress is still saved"
- Email input + "Send a new link" CTA
- Helper text: "Your new link will be valid for 30 days"
- "Or start a new screening" escape hatch at bottom
- Wordmark

Both screens are warm, matter-of-fact, not punishing.
Copy owned by Chat 05.

---

## PHASE 6 — Interaction and State Specifications — Pending

Covers:
- Tap-to-select and instant auto-advance mechanics
- Collapsible results rows on Touchpoint 1
- Breathing overlay open/close and 4-4-4 animation timing
- Section transition timing, auto-advance, skip behaviour
- Loading and processing states
- Error states — supportive tone throughout
- Screen-to-screen transition animations
- Scroll behaviour on Touchpoint 1
- Keyboard behaviour (mobile and desktop)
- Button hover/active states — section tone rule
- Phone field country prefix interaction

Output: Interaction spec for Chat 07.

---

## PHASE 7 — Handoff Package — Pending

| Receiving chat | Deliverable |
|---|---|
| Chat 05 (Copy) | Journey map with copy slots. All copy notes from 5a–5h. |
| Chat 06 (Design) | Annotated wireframes. Design tokens. Section tones. S2 background refinement. |
| Chat 07 (Dev) | Routing map, state machine, interaction spec, session architecture. Phone capture logic. |
| Chat 08 (Email) | Trigger points. Clarity Call naming. Kit confirmed. Abandoned/follow-up logic. SMS reminder. |
| Chat 09 (Booking) | Clarity Call naming. Cal.com free plan. Phone collected by Bridge Hub. |
| Chat 10 (GDPR) | Consent moments: S1 cookie, S3 health data + AI + Kit, 5d write-in, S7 phone number. |

---

## Constraints from prior chats

- Section order locked: PSS-10, PHQ-8, MAIA-2, PCL-5, PID-5-SF
- Fixed UI shell: only questions cycle
- No back button. Forward only. Instant auto-advance.
- No timer shown to user
- Auto-save after every answer
- Safety flag never shown to user, never stops assessment (Chat 03)
- Touchpoint 1: plain language only, no scores, no band labels (Chat 03)
- PDF delivered after booking confirmation only (Chat 03)
- 115 items total across 5 instruments
- Target audience: US default, global English-speaking women 28–45

---

## Change log

| Version | Change |
|---|---|
| v1 | Initial roadmap |
| v2 | Phase 1 complete |
| v3 | Phase 2 complete. Kit confirmed. |
| v4 | Phase 3 complete. Progress indicator and transitions locked. |
| v5 | Phase 4 complete. Full consolidation. |
| v6 | Phases 5a–5e complete. Disclaimer/urgent help corrected. Clarity Call named. Collapsible results. |
| v7 | All Phase 5 complete (5a–5h). Phone capture on booking screen (Bridge Hub, not Cal.com). US default prefix. Cal.com free plan at launch. Re-entry and expired link screens locked. Full wireframe set done. |

---

*This document is the Chat 04 single source of truth.*
*All previous roadmap versions are superseded by this document.*
*If anything conflicts with the master brief, the master brief wins.*
