# The Bridge Hub — Therapist Briefing — Framing Copy v1
## All copy, structure, and AI prompt architecture

> This document is the complete framing copy specification for the
> therapist briefing. It covers both the PDF briefing and the
> on-screen dashboard view.
>
> Chat 03 Layer 2 clinical blocks are used unchanged in the therapist
> briefing. This document covers only the framing copy around them.
>
> The Call Preparation Brief is AI-generated per client using the
> prompt architecture defined in this document.
>
> If anything conflicts with the master brief, the master brief wins.
> Last updated: June 2026

---

## Briefing header

```
THE BRIDGE HUB
Therapist Briefing

Client:          [First name] [Last name]
Completed:       [DD Month YYYY]
Time taken:      [X minutes]
Sections:        5 of 5 complete
```

---

## Briefing opening

This briefing summarises the clinical findings from [First name]'s
screening across all five instruments. It is structured section by
section in completion order, followed by a cross-instrument picture.

All findings are hypotheses drawn from validated instrument scores.
They are starting points for clinical contact, not conclusions about
the person. The person in front of you will always be more than any
instrument can capture.

---

## Safety alert block

Appears before everything else if triggered.
Never appears in client report in any form.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SAFETY ALERT

One or more safety-sensitive items were endorsed during this screening.

[List of triggered items with response values]

This alert is for clinical awareness only. The assessment was completed
in full. Results were delivered to the client without modification.
No information about this flag was shown to the client at any point.

Therapist note: Review item responses in Section [X] before the call.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Call Preparation Brief

Appears immediately after the safety alert (if triggered) or at the
top of the briefing if no safety alert. Always the first substantive
section Caroline reads.

### Output format

```
─────────────────────────────────────────────
CALL PREPARATION BRIEF
Generated for: [First name] — [DD Month YYYY]
─────────────────────────────────────────────

THE CLINICAL PICTURE
[AI output — 3-4 sentences, clinical register]

WHAT TO EXPECT IN THE ROOM
[AI output — 3-4 sentences, her language]

WHERE SHE IS MOST LIKELY TO FEEL SEEN
[AI output — 2-3 observations, her language]

THE CLINICAL MOVE AND NEXT STEPS
[AI output — 3-4 sentences, hybrid register]

─────────────────────────────────────────────
Full instrument detail follows below.
─────────────────────────────────────────────
```

### AI payload

The AI receives a structured JSON object containing:

```json
{
  "client": {
    "first_name": "[First name]",
    "completed": "[DD Month YYYY]",
    "time_taken": "[X minutes]"
  },
  "scores": {
    "PSS10": {
      "total": 0,
      "band": "",
      "percentile": 0,
      "helplessness": 0,
      "self_efficacy": 0
    },
    "PHQ8": {
      "total": 0,
      "band": "",
      "percentile": 0,
      "somatic_items_avg": 0,
      "cognitive_items_avg": 0
    },
    "MAIA2": {
      "not_distracting": { "score": 0, "band": "" },
      "not_worrying": { "score": 0, "band": "" },
      "attention_regulation": { "score": 0, "band": "" },
      "emotional_awareness": { "score": 0, "band": "" },
      "self_regulation": { "score": 0, "band": "" }
    },
    "PCL5": {
      "total": 0,
      "band": "",
      "normative_percentile": 0,
      "clinical_percentile": 0,
      "dsm5_algorithm_met": true,
      "cluster_scores": {
        "intrusion": 0,
        "avoidance": 0,
        "mood": 0,
        "arousal": 0
      }
    },
    "PID5SF": {
      "negative_affectivity": { "score": 0, "band": "" },
      "detachment": { "score": 0, "band": "" },
      "disinhibition": { "score": 0, "band": "" },
      "facets": {
        "emotional_lability": { "score": 0, "band": "" },
        "anxiousness": { "score": 0, "band": "" },
        "separation_insecurity": { "score": 0, "band": "" },
        "withdrawal": { "score": 0, "band": "" },
        "anhedonia": { "score": 0, "band": "" },
        "intimacy_avoidance": { "score": 0, "band": "" },
        "impulsivity": { "score": 0, "band": "" },
        "irresponsibility": { "score": 0, "band": "" },
        "distractibility": { "score": 0, "band": "" },
        "depressivity": { "score": 0, "band": "" },
        "unusual_beliefs": { "score": 0, "band": "" },
        "perceptual_dysregulation": { "score": 0, "band": "" }
      }
    }
  },
  "flags": ["[flag codes that fired]"],
  "dimensional_framework": {
    "Q1_primary_distress_driver": "",
    "Q2_somatic_regulation": "",
    "Q3_dissociation": "",
    "Q4_relational_pattern": "",
    "Q5_body_relationship": "",
    "Q6_primary_resources": "",
    "Q7_contradictions": "",
    "Q8_nervous_system_state": ""
  },
  "pattern_matches": ["[pattern codes that fired]"],
  "safety_flag": false,
  "write_in_text": "[Client PCL-5 write-in text or null]",
  "top_endorsed_items": [
    {
      "instrument": "",
      "item_number": 0,
      "item_text": "",
      "response_label": "",
      "response_value": 0
    }
  ]
}
```

The top_endorsed_items field contains the ten highest-scoring
individual item responses across all five instruments. This is
the primary source for synthesising her language in sections 2, 3, 4.

### AI system prompt

```
You are preparing a therapist for a Clarity Call with a client who
has just completed a psychological screening. The therapist is
Caroline. The client is [first_name].

This briefing has four sections. Write each one carefully. Your goal
is to give Caroline everything she needs to walk into this call ready
to meet this specific person, in this specific moment, with the
specific words that will make her feel understood.

SECTION 1 — THE CLINICAL PICTURE
Write 3-4 sentences in clinical but human language. Synthesise the
two or three most significant cross-instrument patterns into a
coherent narrative. Name the primary distress driver. Name what is
compounding it. Name what is likely maintaining it. Use Caroline's
clinical language, not the client's. This is the professional picture.

Do not list scores. Do not name instruments by code. Do not use
diagnostic labels. Use plain clinical language that a senior colleague
would use in a handover.

SECTION 2 — WHAT TO EXPECT IN THE ROOM
Write 3-4 sentences. Draw from the top_endorsed_items and the
dimensional framework output. Synthesise the emotional texture of
her responses into language that captures how she would describe her
own experience if she had the words.

Do not use clinical language here. Use her language. How does she
experience the thing she is carrying? How is she likely to walk in?
What will she lead with and what will she hold back? What is the
tone and pace Caroline should match?

Do not use instrument names, band labels, score references, or
clinical terminology of any kind in this section.

SECTION 3 — WHERE SHE IS MOST LIKELY TO FEEL SEEN
Write 2-3 observations. Each one names something she is probably
living with that she has never had articulated back to her. Draw
directly from her highest-endorsed items and her write-in text if
provided. Synthesise these into the emotional reality they point to,
in language that sounds like how she might describe it herself.

These are not interpretations. They are recognitions. The goal is
that Caroline can say these things back to the client and the client
thinks: "Yes. Exactly that. How did you know?"

Do not use clinical language. Do not name instruments. Do not
reference scores. Write in the client's emotional register.

SECTION 4 — THE CLINICAL MOVE AND NEXT STEPS
Write 3-4 sentences. Name the most important clinical direction for
this person based on the dimensional framework output and pattern
flags. Frame it in terms of what becomes possible, not what is wrong.

Then name what she is probably asking herself about whether to work
with Caroline. Draw from her self-efficacy score, her relational
patterns, and her write-in text if provided. Name what she needs to
hear from Caroline to say yes, not as a sales script, but as the
honest clinical truth about what working together would look like
for her specifically.

Use her language for the second part. Use clinical language for the
first part.

CRITICAL RULES:
- Maximum 4 sentences per section
- No em dashes
- No instrument codes or score references in sections 2, 3, or 4
- No diagnostic labels anywhere
- No generic statements that could apply to any client
- Every sentence must be grounded in her specific payload data
- If write_in_text is provided, reference it specifically in section 4
- End your output with a bracketed internal note:
  [PRIMARY PATTERNS USED: list the three score combinations or flags
  that most informed this brief]
  This note is stripped before display and logged internally.
```

### Accuracy safeguards

The bracketed internal note at the end of the AI output logs which
three patterns drove the brief. This is stored in a hidden database
field, never displayed on screen. If the brief ever feels clinically
off, the log identifies exactly what the AI was working from.

The AI is explicitly prohibited from making statements that could
apply to any client. Every sentence must be traceable to something
specific in the payload. Sentences that cannot be traced should not
be written.

---

## Per-instrument section structure

Each of the five instrument sections follows the same format.

### Section header

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION [X] — [THERAPIST LABEL]
[Instrument full name] ([Short code])
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total score:           [X] ([Band label])
Normative percentile:  [X]th
[PSS-10 only:]
  Helplessness subscale:   [X]
  Self-efficacy subscale:  [X]
[PCL-5 only:]
  Clinical percentile:     [X]th
  DSM-5 algorithm:         [Met / Not met]
  Intrusion: [X] | Avoidance: [X] | Mood: [X] | Arousal: [X]
[MAIA-2 only: No total score. Subscale scores below.]
[PID-5-SF only: Domain averages below. Facet detail follows.]

Flags fired:  [Flag code — plain language label]
              [Or: None]
```

### Therapist section labels (locked)

| Instrument | Therapist briefing label |
|---|---|
| PSS-10 | Stress load |
| PHQ-8 | Depression picture |
| MAIA-2 | Body awareness |
| PCL-5 | Trauma symptoms |
| PID-5-SF | Personality and relational patterns |

### Transition into Layer 2

```
Therapist note: [Flag label — one line per flag, plain language.
Or omitted if no flags fired.]
```

### Transition into item responses

```
Item responses below.
```

---

## PCL-5 additional elements

The PCL-5 section includes two elements not present in other sections.
These appear between the scores block and the Layer 2 clinical
interpretation.

```
Named experience (if provided):
"[Client's write-in text]"

DSM-5 algorithm result: [Met / Not met]
[If met:]
All four symptom areas endorsed at moderate or above.
Intrusion: [X] | Avoidance: [X] | Mood: [X] | Arousal: [X]
```

---

## PID-5-SF additional elements

The PID-5-SF section shows all facets including those not shown
to the client. The following appear in the therapist briefing only:

```
Unusual beliefs and experiences:  [score] — [band]
Perceptual dysregulation:         [score] — [band]
```

These were not shown to the client. If either reaches strongly
elevated level, a therapist note appears:

```
Therapist note: [Facet name] at strongly elevated level.
Not shown to client. Warrants careful clinical exploration
before and during the call. Consider whether specialist
referral is appropriate.
```

---

## Cross-instrument picture

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CROSS-INSTRUMENT PICTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The following summarises findings across all five instruments.
Generated from the dimensional framework and pattern library.
```

### Dimensional framework output

```
Q1 — Primary distress driver
[Answer]

Q2 — Somatic regulation available
[Answer]

Q3 — Dissociation a factor
[Answer]

Q4 — Relational pattern
[Answer]

Q5 — Body relationship
[Answer]

Q6 — Primary resources
[Answer]

Q7 — Contradictions or uncharted elements
[Answer]

Q8 — Dominant nervous system state (inference only)
[Answer]

Inference caveat: This is inferred from instrument score patterns.
No validated open-access instrument exists for direct measurement
of nervous system states. Treat as hypothesis, not finding.
```

### Named pattern observations

Appears only if one or more priority patterns fire.

```
PATTERN OBSERVATIONS

[Pattern name]: [One-line plain language description]
Triggered by: [Instruments and scores that triggered this pattern]

[Repeat for each pattern that fired]
```

If no patterns fire:

```
No defined pattern match.
Notable elevations: [List]
Notable low scores: [List]
Score contradictions: [List if any]
```

---

## Briefing disclaimer

```
These findings are hypotheses drawn from validated instrument scores.
They are starting points for clinical contact, not conclusions about
the person. The person in front of you will always be more than any
instrument can capture.

This briefing is for qualified clinical use only.
It is not to be shared with the client in this form.

The Bridge Hub. [DD Month YYYY.]
```

---

## Dashboard field labels

On-screen version of the briefing. Same content, labels for UI.

| Field | Dashboard label |
|---|---|
| Total score | Total score |
| Normative percentile | Population percentile |
| Clinical percentile (PCL-5) | Clinical percentile |
| Band | Band |
| Flags fired | Pattern flags |
| Helplessness subscale | Helplessness |
| Self-efficacy subscale | Self-efficacy |
| Named experience | Named experience |
| DSM-5 algorithm | Symptom pattern |
| Completion time | Time to complete |
| Safety flag | Safety alert |
| Dimensional framework | Clinical picture |
| Named patterns | Pattern observations |
| Call preparation brief | Call preparation |

All dashboard annotations use "Therapist note" framing.
No reference to Caroline by name anywhere in the briefing.

---

## Safety flag language — full specification

Three items can trigger a safety flag. Each has its own
therapist note. All are private to the briefing only.

### PID-5-SF item 26
"The world would be better off if I were dead"
Also counts toward Depressivity facet score.

```
Therapist note — Safety item endorsed
Item 26 (PID-5-SF): "The world would be better off if I were dead"
Response: [Value and label]

This item was endorsed at [level]. It contributes to the
Depressivity facet score above. It was not flagged to the client
in any form. Assess carefully at the start of the call before
proceeding with the results review.
```

### Supplementary item 119

```
Therapist note — Safety item endorsed
Supplementary item 119: [Item text]
Response: [Value and label]

This item does not contribute to any facet score. It was included
for safety monitoring only. It was not shown to the client in any
form. Assess carefully at the start of the call.
```

### Supplementary item 178

```
Therapist note — Safety item endorsed
Supplementary item 178: [Item text]
Response: [Value and label]

This item does not contribute to any facet score. It was included
for safety monitoring only. It was not shown to the client in any
form. Assess carefully at the start of the call.
```

---

## Change log

| Version | Change |
|---|---|
| v1 | Initial therapist briefing framing copy. Full structure, Call Preparation Brief with four-section AI prompt architecture, per-instrument headers, PCL-5 and PID-5-SF additional elements, cross-instrument picture, dashboard labels, safety flag language. |

---

*This document is the therapist briefing framing copy for The Bridge Hub.*
*Chat 03 Layer 2 clinical blocks are used unchanged in the briefing.*
*If anything conflicts with the master brief, the master brief wins.*
