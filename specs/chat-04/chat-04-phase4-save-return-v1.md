# The Bridge Hub — Chat 04 Phase 4: Save and Return Flow — v1

> This document specifies how session saving, pausing, and resuming works
> across all devices and scenarios.
> All decisions locked and approved by Caroline Jones.
> If anything conflicts with the master brief, the master brief wins.
> Last updated: June 2026

---

## Core principle

There is no pause button. The assessment never stops unless the user
closes the tab or their browser session ends. The breathing overlay
is the only break mechanism — it opens on top of the assessment and
closes back into it. The user is always in the assessment until they
leave it entirely.

Progress saves silently after every answer. The user never has to think
about saving.

---

## What is saved

After every answer, the following is written to Supabase:

- User ID (tied to email captured at S3)
- Current section index (0–4)
- Current question index within section (0–n)
- All answers submitted so far (instrument, item, response value)
- Section start timestamps (for completion time tracking)
- Session last-active timestamp

Nothing is shown to the user. No save confirmation, no spinner, no
indicator of any kind. It happens invisibly.

---

## The breathing button

The breathing button is the only persistent interactive element in the
assessment shell beyond answering questions.

Behaviour:
- Always visible in the shell during the assessment
- Tapping it opens the breathing overlay (full screen, 4-4-4 pattern)
- The overlay can be closed at any time via "I'm ready" or a close tap
- On close, the user returns to exactly the question they were on
- No progress is lost by opening or closing the overlay
- The button does not trigger any save action — saving is per-answer only

The breathing button is not a pause button. It is a regulation tool
that happens to provide a natural break if the user needs one.

Placement in the shell: to be defined in Phase 5b wireframes.

---

## Same-device auto-restore

If a user closes the tab or browser and returns to the same URL
on the same device and browser:

- Session restores silently
- User lands directly on the question they were on
- No resume screen, no welcome back message, no CTA
- Progress indicator renders immediately in correct state
- The experience continues as if nothing interrupted it

Technical implementation note for Chat 07:
Session state is held in both Supabase (source of truth) and browser
localStorage (for instant restore without a network round trip).
On page load, check localStorage first for speed, then validate against
Supabase. If they conflict, Supabase wins.

---

## Magic link resume (any device)

If a user needs to resume on a different device, or their browser
session has been cleared:

1. User visits the tool URL — no active session found
2. They see a simple re-entry screen:
   - Brief message: progress is saved, enter email to continue
   - Email input field
   - Single CTA: "Send my resume link"
3. Resend sends a magic link to that email
4. User clicks the link — lands directly on the question they were on
5. Progress indicator renders immediately in correct state
6. No transition screen, no welcome screen — straight to the question

The re-entry screen is minimal. It should feel like a practical
utility step, not an obstacle. Copy owned by Chat 05.

---

## Magic link mechanics

- Expiry: 30 days from issue
- Each new link request invalidates any previously issued link
- Link is single-use: clicking it creates a new authenticated session
  and the link cannot be used again
- Links are issued via Resend (transactional email)
- Link format: the-bridge-hub.com/resume?token=[unique_token]

### Expired link flow

If a user clicks a link older than 30 days:

1. They land on an expiry screen
2. Clear message: this link has expired
3. Single input: their email address
4. Single CTA: "Send a new link"
5. New magic link sent immediately
6. No account password required at any point

The expiry screen is not an error state — it is a practical moment.
Tone is warm and matter-of-fact. Copy owned by Chat 05.

---

## Abandoned session handling

### Started but never finished (email captured, assessment incomplete)

- Single reminder email sent at 12 hours after last activity
- Email contains magic link to resume
- If no return after reminder: session sits in Supabase, no further contact
- Chat 08 owns the reminder email trigger and content

### Completed but never booked

- Single follow-up email sent after a defined window (Chat 08 to define timing)
- Email contains booking link
- Results are held in Supabase until booking is confirmed
- PDF is not generated until booking confirmation

---

## Duplicate session handling

If a user somehow has two active sessions (same email, two devices):

- Supabase session tied to email is the source of truth
- The more recently active session takes precedence
- If both are active simultaneously, the last answer written wins
- No error shown to the user — silent resolution

This edge case is unlikely given the linear forward-only flow but
Chat 07 should handle it gracefully at the database level.

---

## Session data and GDPR

All session data is stored in Supabase EU region.
Health data is stored only after explicit GDPR consent at S3.
If a user never completes S3 (email capture + consent), no health
data is stored — only cookie consent state.

Retention policy and deletion handling: Chat 10 owns this entirely.
Chat 04 flags only that the session model must support:
- User-initiated deletion of their data
- Automatic expiry of incomplete sessions after a defined period
  (Chat 10 to define the period)

---

## Shell elements summary (for Phase 5b reference)

The fixed assessment shell contains exactly:
- Section name (top, centered)
- Progress indicator (five diamonds + fill line)
- Breathing button (placement TBD in Phase 5b)
- Disclaimer (persistent footer)
- The cycling question and answer cards

There is no pause button, no exit button, no navigation of any kind
beyond answering questions and using the breathing overlay.

---

## Phase 4 status: complete

All save and return decisions locked and approved.
Phase 5a wireframes begin next.

---

*This document is the Phase 4 output for Chat 04.*
*If anything conflicts with the master brief, the master brief wins.*
