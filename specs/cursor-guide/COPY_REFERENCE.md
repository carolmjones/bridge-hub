# The Bridge Hub — Copy Reference
## Map of Every Copy Slot

> This document tells you where every piece of copy lives,
> which file is authoritative, and whether it is static or AI-generated.
> For the actual copy, go to the file listed. Do not rewrite copy here.
> Last updated: June 2026

---

## Copy rules — apply everywhere

- Second person throughout in all client-facing copy: "you", "your"
- No em dashes anywhere
- No clinical labels in client-facing copy
- No diagnostic language
- "This is a screening tool, not a clinical diagnosis." on every screen
- Nervous system framing: adaptation not deficit
- Hedging on all interpretive claims: "may", "appears", "suggests",
  "came through in your answers"
- Biological claims kept (Caroline's confirmed decision)

---

## Screen copy (S1 — S8, R1 — R2)

All screen copy is locked in wireframe boards from Chat 04.
The copy below is the final locked version for each slot.

| Screen | Slot | Type | Copy |
|---|---|---|---|
| S1 Landing | Headline | Static | Chat 05 wireframe board |
| S1 Landing | Subline | Static | Chat 05 wireframe board |
| S1 Landing | CTA | Static | "Begin your map" |
| S1 Landing | Disclaimer | Static | "This is a screening tool, not a clinical diagnosis." |
| S2 What to expect | Heading | Static | "Before you begin" |
| S2 What to expect | Breathing prompt | Static | Chat 05 wireframe board |
| S2 What to expect | Trust block | Static | Chat 05 wireframe board |
| S2 What to expect | CTA | Static | "I am ready to begin" |
| S3 Email capture | Heading | Static | Chat 05 wireframe board |
| S3 Email capture | Subline | Static | Chat 05 wireframe board |
| S3 Email capture | Consent copy | Static | Chat 05 wireframe board |
| S3 Email capture | CTA | Static | "Save my progress and begin" |
| S4 Section transitions | Per-section copy ×5 | Static | Chat 05 wireframe board |
| S5 Assessment | Section names ×5 | Static | See section names below |
| S5 Assessment | Breathing button label | Static | "Take a breath" |
| S6 Touchpoint 1 | Eyebrow | Static | "✓ Screening complete" |
| S6 Touchpoint 1 | Headline | Static | See Slot 1 below |
| S6 Touchpoint 1 | Synthesis paragraph | AI-generated | See Slot 5a below |
| S6 Touchpoint 1 | Credibility block | Static | See Slot 2 below |
| S6 Touchpoint 1 | Row observations ×5 | AI-generated | See Slot 5b below |
| S6 Touchpoint 1 | Results overview paragraph | AI-generated | See Slot 5c below — appears after rows, before full report |
| S6 Touchpoint 1 | Full report block | Static | See Slot 3 below |
| S6 Touchpoint 1 | Clarity Call paragraph | Static | See Slot 4 below |
| S6 Touchpoint 1 | CTA | Static | "Book your free Clarity Call" |
| S6 Touchpoint 1 | Disclaimer | Static | "This is a screening tool, not a clinical diagnosis." |
| S7 Booking | Heading | Static | "Choose a time that works for you" |
| S7 Booking | Phone hint | Static | "We'll send a reminder text before your call. No other use." |
| S8 Confirmation | All copy | Static | Chat 05 wireframe board |
| R1 Re-entry | All copy | Static | Chat 05 wireframe board |
| R2 Expired link | All copy | Static | Chat 05 wireframe board |

---

## Section names — locked

These names appear on transition screens, progress indicator, and
collapsible row headers. Exact casing below.

| # | Internal code | User-facing name |
|---|---|---|
| 1 | body | The Body Room |
| 2 | stress | The Load |
| 3 | mood | The Fog |
| 4 | carrying | The Weight You Carry |
| 5 | emotional | The Weather Inside |

---

## Touchpoint 1 copy slots — all in chat-05-phase3-copy-v3.md

### Slot 1 — Affirming headline (STATIC)
```
You have just put words to something that takes most people years to name.
```

### Slot 2 — Credibility block (STATIC)
```
The questions you answered are the same validated tools used by
clinicians and researchers worldwide. Not a general quiz.
Your results are measured, not estimated.
```

### Slot 3 — Full report block (STATIC)
```
Your full Nervous System Map is waiting.

It goes deeper into each of the five areas, with personalised
reflections drawn from your specific answers and research-grounded
interpretations of what your results are showing.

It is sent to you as soon as you book your Clarity Call.

✓ Built from your responses, not a template
✓ Scored against published population norms
✓ Designed by a qualified nurse and therapist
✓ A screening tool, not a diagnosis
✓ Your results belong to you
```

### Slot 4 — Clarity Call paragraph (STATIC)
```
FREE CLARITY CALL

You have spent time looking clearly at something most people spend
years avoiding. That deserves more than a report.

The Clarity Call is where your results become a real conversation.
Someone who has read everything you just completed will walk through
what stands out, what connects across the five areas, and what it
would actually look like to begin shifting what you are carrying.

You will leave knowing what the path forward looks like for you
specifically. Not a general answer. Yours.

Up to 45 minutes. Free. No obligation.
```

### Slot 5a — Synthesis paragraph (AI-GENERATED)
Full JSON payload and system prompt:
chat-05-phase3-copy-v3.md → Slot 5a

### Slot 5b — Collapsible row observations ×5 (AI-GENERATED)
Full JSON payload and system prompt per section:
chat-05-phase3-copy-v3.md → Slot 5b

### Slot 5c — Results overview paragraph (AI-GENERATED)
Full JSON payload and system prompt:
chat-05-phase3-copy-v3.md → Slot 5c
Appears below accordion rows, above full report block.

---

## Client report copy — all in chat-05-report-pseudocode-v4.md

The pseudocode is the authoritative source for report structure.
Copy within the report comes from the sources below.

| Report element | Type | Source |
|---|---|---|
| Cover copy | Static | chat-05-report-pseudocode-v4.md |
| Opening "This is your map" | Static | chat-05-report-pseudocode-v4.md |
| Section orienting sentences ×5 | Static | chat-05-report-pseudocode-v4.md |
| Layer 1 narrative per instrument | AI-generated | chat-05-report-pseudocode-v4.md (prompt spec) |
| NS layer — What we noticed | Static per band | chat-05-report-pseudocode-v4.md |
| NS layer — What your nervous system may be trying to do | Static per band | chat-05-report-pseudocode-v4.md |
| Layer 2 research blocks (client) | Static per band | chat-05-layer2-user-facing-v1.md |
| Cross-instrument synthesis | AI-generated | chat-05-report-pseudocode-v4.md (prompt spec) |
| Clarity Call closing | Static | chat-05-report-pseudocode-v4.md |
| Addendum structure | Static | chat-05-report-pseudocode-v4.md |
| Footer disclaimer | Static | "This is a screening tool, not a clinical diagnosis." |

---

## Layer 2 blocks — two versions, two uses

CRITICAL: there are two versions of the Layer 2 blocks.
Never mix them.

| Version | File | Use |
|---|---|---|
| User-facing (plain language, second person) | chat-05-layer2-user-facing-v1.md | Client report ONLY |
| Clinical (clinical register, third person) | chat-03-layer2-content-library-v2.md | Therapist briefing ONLY |

---

## Layer 2 block keys — how to retrieve the correct block

Retrieval is by instrument + band. PID-5-SF also requires domain or
facet. MAIA-2 requires subscale.

### PSS-10
| Key | Band |
|---|---|
| PSS-LOW | Score 0-13 |
| PSS-MODERATE | Score 14-26 |
| PSS-HIGH | Score 27-40 |
| PSS-HELPLESSNESS-HIGH | Helplessness subscale elevated |
| PSS-EFFICACY-LOW | Self-efficacy subscale low |

### PHQ-8
| Key | Band |
|---|---|
| PHQ-NONE | Score 0-4 |
| PHQ-MILD | Score 5-9 |
| PHQ-MODERATE | Score 10-14 |
| PHQ-MODERATELY-SEVERE | Score 15-19 |
| PHQ-SEVERE | Score 20-24 |
| PHQ-SOMATIC-HIGH | Physical items elevated |
| PHQ-COGNITIVE-HIGH | Inner experience items elevated |

### MAIA-2 (per subscale)
| Key pattern | Subscale + band |
|---|---|
| [SUBSCALE]-LIMITED | Below 25th percentile |
| [SUBSCALE]-DEVELOPING | 25th to 75th percentile |
| [SUBSCALE]-STRONG | Above 75th percentile |

Subscale codes: NOT-DISTRACTING, NOT-WORRYING,
ATTENTION-REGULATION, EMOTIONAL-AWARENESS, SELF-REGULATION

### PCL-5
| Key | Band |
|---|---|
| PCL-MINIMAL | Score 0-10 |
| PCL-MILD | Score 11-20 |
| PCL-MODERATE | Score 21-30 |
| PCL-MODERATELY-SEVERE | Score 31-40 |
| PCL-SEVERE | Score 41+ |
| PCL-INTRUSION-HIGH | Re-experiencing cluster elevated |
| PCL-AVOIDANCE-HIGH | Avoidance cluster elevated |
| PCL-MOOD-HIGH | Mood cluster elevated |
| PCL-AROUSAL-HIGH | Arousal cluster elevated |
| PCL-ALGORITHM-MET | DSM-5 pattern met (all four clusters) |

Client-facing title for PCL-ALGORITHM-MET:
"A DSM-5-aligned symptom pattern is present"
(internal code never shown to client)

### PID-5-SF (domain level)
| Key | Band |
|---|---|
| NA-LOWER | Below 84th percentile |
| NA-ELEVATED | 84th to 93rd percentile |
| NA-SIGNIFICANT | Above 93rd percentile |
| DET-LOWER | Below 84th percentile |
| DET-ELEVATED | 84th to 93rd percentile |
| DET-SIGNIFICANT | Above 93rd percentile |
| DIS-LOWER | Below 84th percentile |
| DIS-ELEVATED | 84th to 93rd percentile |
| DIS-SIGNIFICANT | Above 93rd percentile |

### PID-5-SF (facet level — elevated or strongly elevated only)
Facet codes: EMOTIONAL-LABILITY, ANXIOUSNESS, SEPARATION-INSECURITY,
WITHDRAWAL, ANHEDONIA, INTIMACY-AVOIDANCE, IMPULSIVITY,
FOLLOW-THROUGH-UNDER-STRESS, DISTRACTIBILITY, DEPRESSIVITY

Band suffixes: -ELEVATED | -SIGNIFICANT

### PID-5-SF routing rules (CRITICAL)

CLIENT REPORT — show:
- All three domain blocks at any band
- Facet blocks: show only at ELEVATED or SIGNIFICANT
- DEPRESSIVITY-ELEVATED: show client version
- DEPRESSIVITY-SIGNIFICANT: show softened client signpost only
- UNUSUAL-BELIEFS: NEVER show to client
- PERCEPTUAL-DYSREGULATION: NEVER show to client

THERAPIST BRIEFING — show:
- All blocks including clinical versions
- UNUSUAL-BELIEFS at any band: full clinical language
- PERCEPTUAL-DYSREGULATION at any band: full clinical language
- DEPRESSIVITY-SIGNIFICANT: full clinical picture including severity

---

## Therapist briefing copy — all in chat-05-therapist-briefing-v1.md

| Briefing element | Type | Source |
|---|---|---|
| Briefing header | Static | chat-05-therapist-briefing-v1.md |
| Briefing opening | Static | chat-05-therapist-briefing-v1.md |
| Safety alert block | Static (conditional) | chat-05-therapist-briefing-v1.md |
| Call Preparation Brief | AI-generated | chat-05-therapist-briefing-v1.md (prompt spec) |
| Per-instrument section headers | Static | chat-05-therapist-briefing-v1.md |
| Layer 2 clinical blocks | Static per band | chat-03-layer2-content-library-v2.md |
| PCL-5 additional elements | Static | chat-05-therapist-briefing-v1.md |
| PID-5-SF additional elements | Static | chat-05-therapist-briefing-v1.md |
| Cross-instrument picture | Generated | chat-03-scoring-results-roadmap-v2.md |
| Dimensional framework output | Generated | chat-03-scoring-results-roadmap-v2.md |
| Named pattern observations | Generated | chat-03-scoring-results-roadmap-v2.md |
| Briefing disclaimer | Static | chat-05-therapist-briefing-v1.md |
| Safety flag language ×3 | Static | chat-05-therapist-briefing-v1.md |

---

## Email and SMS copy — all in chat-05-phase3-copy-v3.md

| Output | Type | Source |
|---|---|---|
| Confirmation email subject | Static | chat-05-phase3-copy-v3.md |
| Confirmation email body | Static | chat-05-phase3-copy-v3.md |
| SMS confirmation | Static | chat-05-phase3-copy-v3.md |

Confirmation email subject:
"You are booked in, [First name]. We will see you soon."

SMS body (152 chars, within 160 limit):
"Hi [First name], your Clarity Call with The Bridge Hub is confirmed
for [Date] at [Time]. A video link will be in your confirmation
email. See you then."

---

## AI-generated copy — summary

| Output | Prompt location | Max length |
|---|---|---|
| S6 synthesis paragraph | chat-05-phase3-copy-v3.md | 2-3 sentences |
| S6 row observation — The Load | chat-05-phase3-copy-v3.md | 1-2 sentences |
| S6 row observation — The Fog | chat-05-phase3-copy-v3.md | 1-2 sentences |
| S6 row observation — The Body Room | chat-05-phase3-copy-v3.md | 1-2 sentences |
| S6 row observation — The Weight You Carry | chat-05-phase3-copy-v3.md | 1-2 sentences |
| S6 row observation — The Weather Inside | chat-05-phase3-copy-v3.md | 1-2 sentences |
| S6 results overview paragraph | chat-05-phase3-copy-v3.md | 3 sentences max |
| Report Layer 1 — per instrument ×5 | chat-05-report-pseudocode-v4.md | 3-4 sentences |
| Report cross-instrument synthesis | chat-05-report-pseudocode-v4.md | 4-5 sentences |
| Therapist Call Preparation Brief | chat-05-therapist-briefing-v1.md | 4 sections, 3-4 sentences each |

All AI outputs must have internal notes stripped before display.
Strip pattern: /\[.*?\]/gs

---

## Band labels — client-facing (locked)

These labels appear in chart pills, legends, and report copy.
Never use clinical band names in client-facing copy.

| Instrument | Clinical band | Client-facing label |
|---|---|---|
| PSS-10 | Low | Low stress load |
| PSS-10 | Moderate | Moderate stress load |
| PSS-10 | High | High stress load |
| PHQ-8 | None/minimal | — (not shown as label) |
| PHQ-8 | Mild | Mild |
| PHQ-8 | Moderate | Moderate |
| PHQ-8 | Moderately severe | Moderately severe |
| PHQ-8 | Severe | Severe |
| PCL-5 | Minimal | Minimal |
| PCL-5 | Mild | Mild |
| PCL-5 | Moderate | Moderate |
| PCL-5 | Moderately severe | Moderate to Severe |
| PCL-5 | Severe | Severe |
| MAIA-2 | Below 25th | — (no label shown) |
| MAIA-2 | 25th-75th | — (no label shown) |
| MAIA-2 | Above 75th | — (no label shown) |
| PID-5-SF | Below 84th | Typical range |
| PID-5-SF | 84th-93rd | Meaningfully elevated |
| PID-5-SF | Above 93rd | Strongly elevated |

"Clinically significant" NEVER appears in client-facing copy.
Use "Strongly elevated" instead.

---

## Forbidden phrases — never use in client-facing copy

- Clinically significant (use: Strongly elevated)
- Major depressive disorder (use: clinically significant depressive symptoms)
- PTSD (use: trauma-related symptoms, or what you have been carrying)
- Disorder (avoid entirely)
- Diagnosis (avoid entirely)
- Journey
- Em dashes ( — )
- "Here's the thing"
- "The thing is"
- "Genuinely"
- Any AI-sounding filler phrases

---

*The authoritative copy is always in the source file listed.*
*This document is a map, not a copy source.*
*If anything conflicts with the master brief, the master brief wins.*
