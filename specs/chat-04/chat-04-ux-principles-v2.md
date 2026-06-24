# The Bridge Hub — Chat 04 UX Principles — v2
## Phase 1 Output

> This document captures all locked UX principles for The Bridge Hub screening tool.
> It is the foundation every subsequent Chat 04 phase builds on.
> v2: Added breathing pop-up spec, confirmed instant auto-advance, Kit replaces Mailchimp.
> If anything conflicts with the master brief, the master brief wins.
> Last updated: June 2026

---

## Foundation principle

### Mobile first

Every screen is designed for mobile first. Touch targets minimum 44px. Single column
layout throughout. No hover-dependent interactions. Desktop is an adaptation of mobile,
not the other way around. If a decision works on mobile, it works everywhere. If it
only works on desktop, it does not ship.

---

## Entry and trust

### Entry sequence — locked

Landing → What to expect (breathing option here) → Email + name capture → Question 1.

The person understands the tool before they commit their email. Email is a practical
save step, not a toll. This is Option A2: email captured after onboarding content,
just before question 1, at the moment of highest intent.

### Front-loaded trust contract — locked

The what-to-expect screen carries all trust work: estimated time, what the tool is,
what it is not, how data is handled, and how to access urgent help. Nothing is
discovered mid-flow. The user enters the assessment with a complete picture.

### Breathing pop-up — locked

Full-screen overlay. Triggered from the what-to-expect screen (primary introduction)
and by a persistent soft button accessible throughout the assessment.

Behaviour:
- Overlay covers the full screen
- Brief explanation shown first: what box breathing is and what to expect
- Animation follows the 4-4-4 pattern exactly:
    Breathe in — 4 seconds
    Hold — 4 seconds
    Breathe out — 4 seconds
- Text fades in and out in sync with each stage of the animation
- The visual (expanding/contracting circle) matches each stage precisely
- "I'm ready" button closes the overlay and returns to where the user was
- Opt-in only — never auto-plays
- Persistent soft button in the assessment shell reopens the same overlay at any point

---

## Navigation and flow

### Forward only — locked

No back button within or between sections. Answers cannot be edited once submitted.
This is both a clinical validity requirement (response integrity for validated
instruments) and a UX simplification that reduces decision fatigue across a
115-item assessment.

### Instant auto-advance — locked

Tapping an answer card advances immediately to the next question.
No confirmation window. No undo. No delay.
115 questions — the experience should move with purpose.

### Chaptered editorial structure — locked

Each of the five sections feels like entering a new chapter, not advancing a form.
A brief scene-setting intro screen precedes each block. The user moves through
something; they are not filling something in.

### Full-width tap-to-select answer cards — locked

Each response option is a full-width card. Tapping selects and instantly auto-advances.
No submit button per question. Large thumb targets, no cognitive friction.

---

## Progress and pacing

### Diamond-style section progress indicator — locked

Five diamond markers across the top of the assessment shell, one per section.
Active section is highlighted. Completed sections are filled. Upcoming sections
are muted. Current section name shown at all times. No per-question counter.

### No time pressure shown to user — locked

No visible timer, no countdown, no urgency cues. Completion time tracked silently
via timestamps. Surfaces in therapist briefing only. User never sees or knows
time is being tracked.

---

## Save and resume

### Dual resume paths — locked

1. Same device, same browser: session auto-restores on return to the URL.
2. Any other device: magic link sent to email resumes from exact position.

Both paths land at the precise question left off.

### Silent auto-save — locked

Progress saves automatically after every answer. No manual save step.
Never shown to the user. Happens invisibly in the background.

### Option C upgrade path — future

Anonymous session token as primary save mechanism, email as optional upgrade.
Chat 07 to architect session model as retrofittable. Option A2 ships at launch.

---

## Email marketing platform

### Kit (formerly ConvertKit) — locked

Replaces Mailchimp throughout the project. Kit is used for nurture email sequences
and list management. An AI agent (OpenClaw) will manage campaigns via Kit's REST API.

Rationale: cleaner API, free plan to 10,000 subscribers, no charge for unsubscribed
contacts, simpler data model, better suited to Cursor-based development and AI agent
management than Mailchimp.

Chat 08 to update email automation spec accordingly.

---

## Always and never

### Disclaimer on every screen — locked

"This is a screening tool, not a clinical diagnosis."
Persistent. Never hidden. Placement defined per screen in Phase 5.

### Urgent help — locked

Persistent discreet link on every screen linking to the support page on the main site.
Not a banner, not alarming. Quietly present at all times.

### What this tool never does — locked

- No countdown timers
- No urgency cues or pressure mechanics
- No email gate before the user has experienced value
- No punishing error states — all error handling is supportive in tone
- No back button within or between sections
- No per-question progress counter
- No visible time tracking of any kind
- No auto-playing animations without user opt-in
- Safety flag never shown to user, never stops the assessment
- No hover-dependent interactions

---

## Change log

| Version | Change |
|---|---|
| v1 | Initial principles document — all Phase 1 decisions |
| v2 | Kit replaces Mailchimp. Breathing pop-up fully specified (full screen, 4-4-4, text fade). Instant auto-advance confirmed. Urgent help link locked as persistent on every screen. |

---

*This document is the Phase 1 output for Chat 04.*
*All subsequent Chat 04 phases reference and build on these principles.*
*If anything conflicts with the master brief, the master brief wins.*
