# The Bridge Hub — Chat 04 Wireframe Descriptions — v1
## Screen-by-Screen Pseudocode Reference

> This document describes every wireframe screen defined in Chat 04.
> It serves as the structural reference for Chat 05 (copy slots),
> Chat 06 (design tokens), and Chat 07 (build).
> All copy is placeholder unless marked otherwise.
> If anything conflicts with the master brief, the master brief wins.
> Last updated: June 2026

---

## S1 — Landing page

```
SCREEN: Landing page
BACKGROUND: warm off-white (#F5F2EE)
PURPOSE: convert visitor to someone who starts the screening

LAYOUT (top to bottom):
  [urgent help link — top right, small, underlined]
    "Need urgent support? Get help now"
    → links to support page on main site

  [circle portrait — centered, ~220px diameter]
    Photo of Caroline in circular crop
    Soft neutral circle background behind photo

  [eyebrow label — centered, small caps]
    "THE BRIDGE HUB"

  [headline — centered, serif, ~26px]
    Placeholder: welcoming, validating headline
    Direction: not problem-framing, not clinical
    COPY SLOT → Chat 05

  [subline — centered, 14px, secondary colour]
    What this is + time estimate (30-40 minutes)
    COPY SLOT → Chat 05

  [spacer — flexible, pushes CTA to bottom]

  [CTA button — full width, dark fill, rounded]
    "Begin the screening"
    Touch target: 48px height minimum

  [disclaimer — centered, 11px, muted]
    "This is a screening tool, not a clinical diagnosis."

  [cookie consent banner — bottom, only on first visit]
    One line of copy + two buttons: "Manage" | "Accept"
    Slides down on accept (200ms)
    Never appears again on same device

NO: navigation, menu, links to other pages, decorative elements
```

---

## S2 — What to expect

```
SCREEN: What to expect (trust contract)
BACKGROUND: lighter than S1 (Chat 06 to define exact tone)
PURPOSE: set expectations, build trust, introduce breathing

LAYOUT (top to bottom):
  [top bar — flex row]
    LEFT: "THE BRIDGE HUB" wordmark, small caps
    RIGHT: breathing button (32px circle, wind icon)
      → tapping opens breathing overlay

  [heading — serif, ~20px]
    "Before you begin"
    COPY SLOT → Chat 05

  [breathing intro prompt — warm tinted block]
    Wind icon + text explaining the breathing button
    "Take a moment before you start. Tap the breath icon
     any time during the screening to pause and regulate."
    COPY SLOT → Chat 05

  [trust items — vertical list, icon circles + text]
    ITEM 1: time estimate — about 30-40 minutes, pauses welcome
    ITEM 2: five sections — stress, mood, body, carrying, emotional
    ITEM 3: confidential — simple, no "stored in EU" detail
    ITEM 4: not a diagnosis — reframed positively: what this gives you

    COPY SLOTS → Chat 05 (all four items)

  [clinical credibility line — warm tinted block]
    "These questions come from validated clinical tools used by
     therapists and researchers worldwide."
    COPY SLOT → Chat 05

  [spacer]

  [CTA button — full width, dark fill]
    "I'm ready to begin"

  [disclaimer — centered, 11px, muted]
    "This is a screening tool, not a clinical diagnosis."

NO: question count per section, frightening time display, clock icon
```

---

## Breathing overlay

```
OVERLAY: Breathing exercise
BACKGROUND: dark (#2C2C2A at 96% opacity), full screen
PURPOSE: nervous system regulation, opt-in break mechanism
TRIGGERED BY: breathing button (top right) from any question screen or S2

LAYOUT (top to bottom):
  [explanation text — top, centered, 13px, 60% opacity]
    "Box breathing helps settle your nervous system.
     Follow the circle at your own pace."
    Max width: 240px

  [spacer]

  [breathing circle — centered]
    Contracted: 80px diameter
    Expanded: 160px diameter
    Border: 1px solid rgba(245,242,238,0.4)
    Fill: rgba(245,242,238,0.15)

  [stage label — below circle, serif, 22px, white]
    Cycles: "Breathe in" → "Hold" → "Breathe out"
    Text crossfades (300ms) at each stage change

  [duration label — below stage, 13px, 50% opacity, uppercase]
    "4 SECONDS"

  [spacer]

  [close button — bottom, full width, transparent bg]
    "I'm ready — continue"
    Border: 0.5px solid rgba(245,242,238,0.35)

ANIMATION CYCLE (repeating, 12 seconds total):
  0-4s: circle expands (ease-in-out), text = "Breathe in"
  4-8s: circle holds at expanded size, text = "Hold"
  8-12s: circle contracts (ease-in-out), text = "Breathe out"
  12s: cycle repeats

OPEN: slides up from bottom (200ms ease-out)
CLOSE: slides down (200ms ease-in), also triggered by swipe down
RETURNS TO: exact question user was on, no state change

NO: auto-play, timer display, cycle counter
```

---

## S3 — Email + name capture

```
SCREEN: Email and name capture
BACKGROUND: same as S2
PURPOSE: create session, capture email for save/resume, GDPR consent

LAYOUT (top to bottom):
  [top bar]
    LEFT: "THE BRIDGE HUB" wordmark
    RIGHT: breathing button (32px circle)

  [heading — serif, ~20px]
    "Save your place"

  [body text — 13px, secondary colour]
    "We'll save your progress as you go. You can return
     from any device using your email."
    COPY SLOT → Chat 05

  [form]
    FIELD: First name
      Label: "First name" (12px, secondary)
      Input: text, placeholder "Your first name"

    FIELD: Email address
      Label: "Email address" (12px, secondary)
      Input: email, placeholder "your@email.com"
      Keyboard: email type (shows @ on mobile)

    CHECKBOX: Kit email opt-in
      Default: unchecked
      Label: "Send me occasional insights and resources
              from The Bridge Hub. You can unsubscribe any time."
      COPY SLOT → Chat 05
      Tap target: full row, not just checkbox

    GDPR CONSENT BLOCK (warm tinted background):
      "By continuing, you consent to your responses being
       stored securely and used to generate your personalised
       report. Read our privacy policy."
      "Read our privacy policy" → underlined link
      COPY SLOT → Chat 05 + Chat 10

  [CTA button — full width, dark fill]
    "Save my progress and begin"
    Disabled state (opacity 0.4) until name + email + consent valid
    Loading state: "Starting..." with subtle pulse

  [disclaimer — centered, 11px, muted]
    "This is a screening tool, not a clinical diagnosis."

ON SUBMIT:
  → Create session in Supabase (user ID tied to email)
  → Store name, email, Kit opt-in preference
  → Fade to Section 1 transition screen

VALIDATION (on submit, not on blur):
  Empty name: "We need your first name to personalise your report."
  Invalid email: "This doesn't look like a complete email address."
  Error style: warm red border (#C4533A), message below field
```

---

## S4 — Section transition screens (x5)

```
SCREEN: Section transition (Direction 2)
BACKGROUND: per-section tone colour (full screen)
PURPOSE: chapter change moment, editorial pacing
INSTANCES: 5 (one per section)

SECTION TONES:
  1. Your stress load          → #EDE8E2 (warm sandy)
  2. How life has been feeling  → #E8E4DE (warm off-white)
  3. How you live in your body  → #E4EBE8 (cool sage)
  4. What you have been carrying → #E2E6EA (steel blue)
  5. Your emotional landscape   → #EAE6E8 (soft mauve)

LAYOUT (centered vertically and horizontally):
  [section label — small, uppercase, 50% opacity]
    "SECTION X OF 5"

  [section name — serif, large (~28px mobile, centered)]
    e.g. "What you have been carrying"
    Animation: drifts up from +8px, opacity 0 → 1, 400ms ease-out
    Starts 100ms after section label

  [tap hint — small, 40% opacity]
    "Tap anywhere to continue"
    Fades in at 500ms after transition begins

  [wordmark — bottom center]
    "THE BRIDGE HUB" — same treatment as shell

TIMING:
  Entry: 300ms fade from previous screen
  Hold: 2500ms auto-advance timer
  Exit: tap anywhere OR timer → 300ms fade to first question
  Total no-tap: ~3800ms
  Total with immediate tap: ~1100ms

KEYBOARD: Enter or Space to skip

NO: breathing button, disclaimer, CTA button, descriptive copy,
    question count, time estimate
```

---

## S5 — Assessment shell (question screen)

```
SCREEN: Assessment shell
BACKGROUND: #F5F2EE (consistent across all sections)
PURPOSE: the screen where 115 questions are answered

FIXED ELEMENTS (never cycle):
  [shell header]
    [top row — flex]
      LEFT: section name (12px, small caps, secondary colour)
        Updates on section change
      RIGHT: breathing button (32px circle, wind icon)
        → opens breathing overlay on tap

    [progress indicator — below top row]
      Track: full width, 1px, tertiary colour
      Fill: extends from left, 1-3.5px weight, #2C2C2A
      Diamonds: 5 markers, 7px, rotated 45deg
        Upcoming: 0.75px outline, faint
        Active: 1px outline, matches fill
        Complete: solid fill #2C2C2A

  [wordmark — bottom center, fixed]
    "THE BRIDGE HUB" — 10px, spaced caps, 40% opacity

CYCLING ELEMENTS:
  [question number — 11px, muted]
    "Question X of Y" (within current section only, not global)
    e.g. "Question 14 of 27" not "Question 59 of 115"

  [question text — serif, 18px (20px desktop), #2C2C2A]
    Actual instrument question text
    Line height: 1.45

  [answer cards — vertical stack, 10px gap]
    Full-width cards
    Background: white (#fff)
    Border: 0.5px solid rgba(136,135,128,0.3)
    Border radius: 10px
    Padding: 15px 16px
    Font: 14px, #2C2C2A

    RESPONSE SCALES per instrument:
      PSS-10: Never / Almost never / Sometimes / Fairly often / Very often (5 cards)
      PHQ-8: Not at all / Several days / More than half the days / Nearly every day (4 cards)
      MAIA-2: Never / Very rarely / Rarely / Occasionally / Very frequently / Always (6 cards)
      PCL-5: Not at all / A little bit / Moderately / Quite a bit / Extremely (5 cards)
      PID-5-SF: Very false or often false / Sometimes or somewhat false /
                Sometimes or somewhat true / Very true or often true (4 cards)

TAP SEQUENCE (per question):
  1. Tap card → card fills #2C2C2A, text inverts to #F5F2EE
  2. Card scales to 1.02 (100ms ease-out)
  3. Other cards dim to 35% opacity (100ms)
  4. Card settles to 1.0 (100ms ease-in)
  5. Auto-save fires (silent, to Supabase)
  6. Progress fill line extends (300ms ease-out)
  7. Crossfade: current question out (200ms), next question in (200ms)

HOVER (desktop only):
  Card background → current section tone colour
  Not cream. Section tone colours listed in S4.

NO: back button, submit button, footer, disclaimer, urgent help,
    global question counter, timer, exit button
```

---

## 5d — PCL-5 optional write-in

```
SCREEN: PCL-5 optional write-in
BACKGROUND: steel blue section tone (#E2E6EA)
PURPOSE: optional naming of a difficult experience before PCL-5 questions
APPEARS: after Section 4 transition screen, before first PCL-5 question

LAYOUT (top to bottom):
  [shell header — same as S5]
    Section name: "What you have been carrying"
    Breathing button: top right
    Progress: diamonds 1-3 complete, diamond 4 active

  [label — serif, 17px]
    "Before you begin this section"

  [intro text — 13px, secondary]
    "The questions in this section ask about the impact of difficult
     experiences. Before you begin, take a moment to bring one experience
     to mind that feels most present for you right now."

  [field label — 12px]
    "The experience I have in mind"

  [text area]
    Placeholder: "A few words is enough. Or leave it blank, it is your choice."
    Minimum 3 rows tall
    No character limit
    Auto-grows vertically if needed
    Background: rgba(255,255,255,0.6)
    Border: 0.5px solid rgba(26,37,48,0.2)

  [buttons — flex row, equal weight]
    LEFT: "Skip" — transparent bg, section-tone border
    RIGHT: "Begin section 4" — section-tone fill (#1A2530)
    Both: 14px, rounded 10px, 14px padding

    Hover (desktop): opposite treatment (skip fills, begin lightens)
    Tap: scale(0.98) 100ms

  [wordmark — bottom center]

ON SKIP: store null for write-in, advance to question 1
ON BEGIN: store text content (empty string if blank), advance to question 1
FLAG → Chat 10: write-in field storage and GDPR treatment
```

---

## S6 — Touchpoint 1 (Clarity Call screen)

```
SCREEN: Touchpoint 1 — post-completion results + Clarity Call CTA
BACKGROUND: #F5F2EE
PURPOSE: help user feel seen, surface key insights, convert to booking
SCROLLABLE: yes — content extends well below fold

LAYOUT (top to bottom):

  BLOCK 1 — Opening
    [eyebrow — teal (#0F6E56), with check icon]
      "Screening complete"

    [headline — serif, 23px, #2C2C2A]
      Affirming. Acknowledges what they have done.
      COPY SLOT → Chat 05

    [synthesis paragraph — serif, 14px, italic, #444441]
      AI-generated per user. Weaves patterns across instruments.
      Generated by Chat 03 logic, written by AI, reviewed by Caroline.
      Plain language. No scores. No band labels.
      COPY SLOT → Chat 03 AI generation logic

    [credibility block — warm tinted background (#EAE4DC), rounded]
      Flask icon + text
      "The questions you answered are the same validated tools
       used by clinicians and researchers worldwide — not a
       general quiz. Your results are measured, not estimated."
      COPY SLOT → Chat 05

    [divider — 0.5px]

  BLOCK 2 — Results overview (collapsible)
    [label — 11px, uppercase, muted]
      "YOUR RESULTS OVERVIEW"

    [five collapsible rows — accordion, one open at a time]
      DEFAULT STATE: first row open, rest collapsed

      Each row:
        HEADER (tappable):
          LEFT: coloured dot (8px circle) + section name (13px, 500 weight)
          RIGHT: chevron (rotates 180deg on open, 200ms)

        BODY (collapsible):
          Plain-language observation (13px, #444441, line-height 1.65)
          No scores, no band labels, no clinical terminology
          COPY SLOT → Chat 03 AI generation logic

      DOT COLOURS (matching section transition tones):
        1. Stress load: #C4873A (amber)
        2. Life lately: #C4A03A (amber-light)
        3. Body: #3A8C7E (teal)
        4. Carrying: #4A6E8C (blue)
        5. Emotional: #7E5A6E (mauve)

      ANIMATION:
        Open: chevron rotates, height expands (250ms ease-out),
              content opacity 0→1 (200ms, 50ms delay)
        Close: opacity 1→0 (150ms), then height collapses (200ms)

    [divider — 0.5px]

  BLOCK 2b — Results overview paragraph
    [synthesis-style paragraph — serif, 14px, italic, #444441]
      AI-generated. Pulls five sections into one unified picture.
      Appears below accordion rows, above full report block.
      COPY SLOT → Chat 05 Slot 5c

    [divider — 0.5px]

  BLOCK 3 — Full report note
    [warm tinted background block (#EEEAE4)]
      [heading — serif, ~18px]
        "Your full Nervous System Map is waiting."
      [text — 13px, #444441]
        Intro + delivery copy + five checkmark bullets.
        COPY SLOT → Chat 05 Slot 3

    [divider — 0.5px]

  BLOCK 4 — Clarity Call CTA
    [badge — warm tinted pill]
      "Free Clarity Call"

    [paragraph — 13px, #444441]
      What the call is, who they will speak with (Caroline),
      what happens in it, outcome = clarity not more questions.
      COPY SLOT → Chat 05

    [CTA button — full width, dark fill]
      "Book your free Clarity Call"

  BLOCK 5 — Footer
    [disclaimer — 11px, centered]
      "This is a screening tool, not a clinical diagnosis."

    [urgent help — 11px, centered, underlined]
      "Need urgent support? Get help now"
      → links to support page

    [wordmark — centered]
      "THE BRIDGE HUB"

STATE: assessment complete, PDF not yet generated
PDF triggers on booking confirmation (S8), not here
```

---

## S7 — Booking screen

```
SCREEN: Booking
BACKGROUND: warm linen (#EDE8E0)
PURPOSE: collect phone number and complete Cal.com booking

LAYOUT (top to bottom):
  [header]
    [eyebrow — 11px, uppercase, muted]
      "FREE CLARITY CALL"
    [heading — serif, 20px]
      "Choose a time that works for you"

  [your details block — white card, rounded]
    [label — 11px, uppercase, muted]
      "YOUR DETAILS"
    ROW 1: user icon + first name (pre-filled) + "Saved" (right-aligned, muted)
    ROW 2: mail icon + email (pre-filled) + "Saved" (right-aligned, muted)
    Both locked — not editable on this screen

  [mobile number block — white card, rounded]
    [label row — flex]
      LEFT: "MOBILE NUMBER" (11px, uppercase)
      RIGHT: "For your reminder text" (11px, muted, normal case)
    [input row]
      LEFT: country flag + prefix (default: US +1, editable dropdown)
      RIGHT: number input (tel type, triggers number pad)
      Placeholder: "e.g. (555) 123-4567"
    [hint — 11px, muted, below input]
      "We'll send a reminder text before your call. No other use."

    Phone stored to Supabase alongside session user ID
    Phone is not a blocking field — user can proceed without it
    Country prefix editable — users are global

  [Cal.com embed — white card, rounded]
    HEADER:
      "Clarity Call · Caroline Jones"
      Meta: 45 min · Video · Free (with icons)
    CALENDAR:
      Monthly grid, available dates highlighted
      Weekends muted (configurable in Cal.com)
      Selected date fills dark
    TIME SLOTS (appear after date selection):
      Grid of available times
      Selected slot fills dark
    → Cal.com handles the rest of the booking flow internally

  [wordmark — bottom center]

ON BOOKING CONFIRMATION:
  → Cal.com webhook fires
  → Phone number stored to Supabase
  → 1000ms pause, then crossfade to S8 (300ms)

NOTES:
  Chat 09 configures Cal.com (free plan at launch)
  Chat 07 handles phone capture and storage
  Chat 08 handles SMS reminder trigger (manual at launch)
  Chat 10 reviews phone number GDPR treatment
```

---

## S8 — Booking confirmation

```
SCREEN: Booking confirmation
BACKGROUND: #F5F2EE
PURPOSE: confirm booking, set expectations, close the journey

LAYOUT (top to bottom):
  [confirmation icon — centred, teal circle background]
    Calendar-check icon, 24px, teal (#0F6E56)
    Circle: 56px, background #E4EBE8

  [headline — serif, 22px, centred]
    "You're booked in. We'll see you soon."
    COPY SLOT → Chat 05

  [subline — 14px, secondary, centred]
    "A confirmation has been sent to your email.
     Here's what happens next."
    COPY SLOT → Chat 05

  [booking summary card — white, rounded, bordered]
    ROW 1: calendar icon + date and time
      e.g. "Tuesday 15 July 2026" / "10:00 am — 10:45 am"
    ROW 2: video icon + "Video call"
      "Link will be in your confirmation email"
    ROW 3: user icon + "Clarity Call with Caroline Jones"
      "Qualified therapist · The Bridge Hub"

  [what happens next — section with numbered steps]
    [label — 11px, uppercase, muted]
      "WHAT HAPPENS NEXT"

    STEP 1: circle with "1"
      Title: "Your full report is on its way"
      Desc: all five sections, complete responses,
            clinical interpretation — sent to email now
      COPY SLOT → Chat 05

    STEP 2: circle with "2"
      Title: "Read your report before the call"
      Desc: take your time, note anything surprising
      COPY SLOT → Chat 05

    STEP 3: circle with "3"
      Title: "Your Clarity Call"
      Desc: Caroline walks through what came up, what patterns
            mean, what support might help. Leave with clarity.
      COPY SLOT → Chat 05

  [disclaimer — 11px, centred]
    "This is a screening tool, not a clinical diagnosis."

  [wordmark — centred]

STATE CHANGES ON THIS SCREEN:
  → PDF generation triggered
  → Resend delivers PDF to email
  → Kit adds to nurture list if opted in (from S3)
  → Chat 08 owns all email triggers

NO: CTA needed, back button, further actions
```

---

## R1 — Re-entry screen

```
SCREEN: Re-entry (no active session on this device)
BACKGROUND: #F5F2EE
PURPOSE: let returning user request a magic link to resume

LAYOUT (centred vertically):
  [icon — warm neutral circle, mail-forward icon]
    48px circle, #EAE4DC background
    Icon: 22px, #5F5E5A

  [heading — serif, 20px, centred]
    "Welcome back"

  [body — 14px, secondary, centred]
    "Your progress is saved. Enter your email and we'll
     send you a link to pick up where you left off."
    COPY SLOT → Chat 05

  [email field]
    Label: "Email address" (12px)
    Input: email type, placeholder "your@email.com"

  [CTA button — full width, dark fill]
    "Send my resume link"
    Loading state: text changes, subtle pulse
    Error state: "Try again" if request fails

  [helper text — 12px, muted, centred]
    "Check your inbox. The link will arrive in a few seconds."

  [spacer]

  [escape hatch — 11px, muted, centred]
    "Or start a new screening" (underlined)

  [wordmark — bottom centre]

ON SUBMIT: magic link sent via Resend to entered email
LINK: valid 30 days, single-use, invalidates any previous link
```

---

## R2 — Expired link screen

```
SCREEN: Expired link
BACKGROUND: #F5F2EE
PURPOSE: handle expired magic link gracefully

LAYOUT (centred vertically):
  [icon — amber circle, clock-exclamation icon]
    48px circle, #FAEEDA background
    Icon: 22px, #854F0B

  [heading — serif, 20px, centred]
    "This link has expired"

  [body — 14px, secondary, centred]
    "No worries — your progress is still saved. Enter your
     email and we'll send a fresh link straight away."
    COPY SLOT → Chat 05

  [email field]
    Label: "Email address" (12px)
    Input: email type, placeholder "your@email.com"

  [CTA button — full width, dark fill]
    "Send a new link"

  [helper text — 12px, muted, centred]
    "Your new link will be valid for 30 days."

  [spacer]

  [escape hatch — 11px, muted, centred]
    "Or start a new screening" (underlined)

  [wordmark — bottom centre]

TONE: warm, matter-of-fact, not an error. "No worries."
```

---

*This document is the wireframe description reference for Chat 04.*
*All copy marked as COPY SLOT is placeholder — Chat 05 owns final language.*
*If anything conflicts with the master brief, the master brief wins.*
