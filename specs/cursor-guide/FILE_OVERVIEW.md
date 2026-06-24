# The Bridge Hub — File Overview
## What Every File Is and Why It Exists

> Read this alongside START_HERE.md before touching any other file.
> This explains the full set of documents you have been given.
> Every file listed here is relevant to the build.
> Last updated: June 2026

---

## How the project was built

The Bridge Hub was designed across multiple specialist planning sessions
before a single line of code was written. Each session owned one
workstream and produced locked documents. Those documents are what
you are holding now.

The numbering system: chat-03 means it came from the scoring workstream,
chat-04 from the UX workstream, chat-05 from the copy workstream.
Always use the highest version number of any document (v2 over v1, v7 over v5).

---

## The four Cursor handoff files — read these first

| File | What it is |
|---|---|
| START_HERE.md | Full project orientation. Stack, routes, session architecture, locked decisions, file map, build order. Read this before everything else. |
| DESIGN_SYSTEM.md | Every visual decision. Colours, typography, buttons, cards, all five chart implementations with exact SVG values and formulas. Build all UI from this file. |
| ARCHITECTURE.md | Full technical blueprint. Supabase schema, RLS policies, every API route, scoring engine file structure, PDF generation, email triggers, OpenRouter call format. |
| COPY_REFERENCE.md | Map of every copy slot across every screen and output. Which file is authoritative. Static vs AI-generated. All band labels and forbidden phrases. |

---

## Brand and design assets

### Logo folder
Contains the final Bridge Hub logo files. Use these directly.
Do not recreate the logo in code.

### backgrounds and elements folder
Section world background images and UI element assets.
These are the pre-generated atmospheric backgrounds for the five
section transition screens. Use them as static assets.

### Brand Assets folder
Brand style guide reference. Colour palette, typography samples,
visual identity guidelines. Cross-reference with DESIGN_SYSTEM.md
for exact implementation values.

### Images for designs folder
Reference images used during the design process.
Useful as visual context when building UI components.

### reimagining_the_assessment_journey.png
The original UX vision board. Shows the overall emotional arc
of the user journey from landing to booking. Good orientation
reference before building the assessment flow.

### a_high_resolution_ui_design_presentation_board_cl_3(1).png
High-resolution UI design board showing the visual design direction
for multiple screens. Use as visual reference when building screens.

### a_clean_product_design_presentation_board_ui_wir_1.png
Clean wireframe presentation board. Shows screen layout and
structural decisions at a glance. Use alongside the wireframe
descriptions document.

### Brand_Style_the_bridge_hub.PNG
(In project files) Brand style reference showing palette, fonts,
and tone. Cross-reference with DESIGN_SYSTEM.md.

---

## UX and user journey files (chat-04)

### chat-04-wireframe-descriptions-v1.md ← USE THIS
The complete screen-by-screen structural pseudocode for every screen
in the app. S1 through S8, R1 and R2. Covers layout blocks, copy
slots, interaction states, and what triggers what. This is the
structural blueprint for every screen. Read before building any screen.

### chat-04-handoff-package-v1.md ← USE THIS
The Chat 04 handoff document consolidating all UX decisions.
Good secondary reference after reading the wireframe descriptions.

### chat-04-design-system-v1.md ← USE THIS
The Chat 04 design system spec. Covers section worlds, atmospheric
backgrounds, breathing overlay, and the visual language of each
section transition. Cross-reference with DESIGN_SYSTEM.md.

### chat-04-ux-roadmap-v7.md ← USE THIS (v7 is latest)
The complete UX roadmap showing all seven phases of the UX work.
Contains the full user journey map, save/return architecture,
progress indicator spec, and interaction specifications.
Use v7 — it supersedes all earlier versions.

### chat-04-phase4-save-return-v1.md
Dedicated specification for the save and return architecture.
Magic link flow, session expiry, re-entry screens. Read before
building authentication and session management.

### chat-04-ux-principles-v2.md
The core UX principles that informed all design decisions.
Useful context for understanding why things are built a certain way.
Not a build reference — background reading.

### chat-04-ux-roadmap-v5-full.md / chat-04-ux-roadmap-v3.md
Earlier versions. Superseded by v7. Do not use.

### chat-04-wireframes-v1.pdf
Visual wireframe PDF. Good for quick visual orientation.
The wireframe-descriptions-v1.md document is the authoritative
text version for build implementation.

---

## Scoring and results files (chat-03)

### chat-03-scoring-engine-pseudocode-v2.md ← USE THIS (critical)
The complete scoring engine specification for all five instruments.
Contains every calculation, reverse score rule, band assignment,
subscale logic, safety flag trigger, and output field.
This is the source of truth for all scoring logic.
Build /lib/scoring/ entirely from this document.
Use v2 — it supersedes v1.

### chat-03-phase2-normative-data-v2.md ← USE THIS
All normative data: band cutoffs, population means and SDs,
percentile lookup tables for all five instruments.
Implement percentile calculations as continuous normal distribution
functions using the means and SDs provided here.
Use v2 — it supersedes v1.

### chat-03-scoring-results-roadmap-v2.md ← USE THIS
The full results architecture document. Covers the dimensional
framework (Q1-Q8 cross-instrument inference questions), the named
pattern library, the AI payload structure, and how scores feed
into the therapist briefing. Essential reading before building
the results page and therapist dashboard.
Use v2 — it supersedes v1.

### chat-03-layer2-content-library-v2.md ← USE FOR THERAPIST BRIEFING ONLY
The original clinical Layer 2 interpretation blocks for all five
instruments. Written in clinical register for therapist use.
NEVER use this for the client report.
Use chat-05-layer2-user-facing-v1.md for the client report instead.

### chat-03-scoring-engine-pseudocode.md / chat-03-scoring-results-roadmap.md / chat-03-phase2-normative-data.md
Earlier v1 versions. Superseded. Do not use.

---

## Copy files (chat-05)

### chat-05-layer2-user-facing-v1.md ← USE FOR CLIENT REPORT
All 88 user-facing Layer 2 interpretation blocks. Plain language,
second person, nervous system framing. These are pre-written static
text blocks keyed to instrument + band. Store as constants in
/lib/content/layer2-client.ts and retrieve by instrument + band key.
NEVER use the chat-03 clinical blocks for the client report.

### chat-05-report-pseudocode-v4.md ← USE THIS (critical)
The complete client report structure. Every section, every layer,
all conditional logic, chart specifications with exact values,
NS layer blocks per band per instrument, synthesis architecture,
AI prompt guardrails for Layer 1. This is the blueprint for the
PDF report. Read before building any report component.

### chat-05-therapist-briefing-v1.md ← USE THIS
Complete framing copy and AI prompt architecture for the therapist
briefing. Includes the Call Preparation Brief (four-section AI-generated
output), per-instrument section headers, safety flag language, and
dashboard field labels. Read before building the therapist dashboard.

### chat-05-phase3-copy-v3.md ← USE THIS (critical for results screen)
All Touchpoint 1 (S6) copy slots with full JSON payloads and system
prompts for AI-generated content. Contains:
- Static copy for Slots 1-4
- Full JSON payload and system prompt for the synthesis paragraph (Slot 5a)
- Full JSON payload, system prompt, and per-section instructions
  for the five collapsible row observations (Slot 5b)
- Confirmation email and SMS copy as JSON templates
Read before building the results screen and email triggers.

### chat-05-roadmap-v2.md
The Chat 05 roadmap showing all completed copy workstreams and
their status. Good orientation document. Not a build reference.

### chat-05-sample-client-report-v5.html ← VISUAL REFERENCE
A fully rendered sample of the client report with fictional client
data (Sarah). Open in a browser to see exactly how the report should
look. Use as the visual reference for building PDF components.
All five charts are implemented and working in this file.

---

## Section image assets (project files)

### ts_section_1_the_load.png
### ts_section_2__The_Fog.png
### ts_section_3_The_body_room.png
### ts_section4_the_weight_you_carry.png
### ts_section_5_the_weather_inside.png
Pre-generated atmospheric background images for the five section
transition screens. Use directly as static assets. Do not recreate.

### background_Serene_lakeside_mist_with_botanical_accents.png
The cover page background for the PDF report. Must be embedded as
base64 data URI in the PDF renderer. See DESIGN_SYSTEM.md for
the encoding instruction.

---

## What to ignore

These files were superseded and should not be used for building:
- chat-03-scoring-results-roadmap.md (use v2)
- chat-03-scoring-engine-pseudocode.md (use v2)
- chat-03-phase2-normative-data.md (use v2)
- chat-04-ux-roadmap-v3.md (use v7)
- chat-04-ux-roadmap-v5-full.md (use v7)
- quiz research.md (background research, not a build spec)

---

## The two most critical rules from this file set

**Rule 1 — Two Layer 2 versions, two different uses:**
chat-05-layer2-user-facing-v1.md → client report ONLY
chat-03-layer2-content-library-v2.md → therapist briefing ONLY
Never mix them. Never use the clinical version for the client.

**Rule 2 — Safety flags are architecturally isolated:**
The safety_flags Supabase table has no connection to any
client-facing pipeline. Access via server-side admin only.
Enforced at schema level with RLS. See ARCHITECTURE.md.

---

*If anything conflicts between files, the master brief wins.*
*If anything conflicts between v1 and v2 of the same document, v2 wins.*
*START_HERE.md is the orientation document — read it first.*
