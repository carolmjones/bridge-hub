# The Bridge Hub — Phase 3 Copy — v3
## Touchpoint 1 (S6) and Confirmation Email

> This document contains all copy for Phase 3 of the Chat 05 roadmap.
> Phase 3.1 covers all Touchpoint 1 copy slots.
> Phase 3.2 covers the booking confirmation email.
> All AI-generated outputs include full JSON payload and system prompt specs.
> Chat 08 owns the trigger and delivery of the email.
> Chat 05 owns the words.
> If anything conflicts with the master brief, the master brief wins.
> Last updated: June 2026

---

## Phase 3.1 — Touchpoint 1 (S6)

Screen state: assessment complete. PDF not yet generated.
PDF triggers on booking confirmation (S8) only.
Purpose: make her feel seen, surface key insights, convert to booking.

---

### Slot 1 — Affirming headline (STATIC — not AI-generated)

```
You have just put words to something that takes most people years to name.
```

Eyebrow above headline (locked from wireframe):
```
✓ Screening complete
```

---

### Slot 2 — Credibility block (STATIC — not AI-generated)

```
The questions you answered are the same validated tools used by
clinicians and researchers worldwide. Not a general quiz.
Your results are measured, not estimated.
```

Icon: flask (locked from wireframe)
Background: warm tinted (#EAE4DC)

---

### Slot 3 — Full report block (STATIC — not AI-generated)

Appears below the results overview paragraph (Slot 5c) and above the Clarity Call block.

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

Heading: serif, ~18px
Background: warm tinted (#EEEAE4)

---

### Slot 4 — Clarity Call paragraph (STATIC — not AI-generated)

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

Badge above paragraph: "Free Clarity Call" — warm tinted pill
CTA below paragraph: "Book your free Clarity Call" — full width, dark fill

---

### Slot 5a — Synthesis paragraph (AI-GENERATED)

Appears between the affirming headline and the credibility block.
Weaves patterns across all five instruments into one short personalised
paragraph. Plain language. No scores. No band labels.

#### JSON payload

```json
{
  "generation_target": "synthesis_paragraph",
  "client": {
    "first_name": "string"
  },
  "scores": {
    "PSS10": {
      "band": "string",
      "percentile": "number",
      "subscale_pattern": "string"
    },
    "PHQ8": {
      "band": "string",
      "percentile": "number",
      "somatic_high": "boolean",
      "cognitive_high": "boolean"
    },
    "MAIA2": {
      "overall_pattern": "string",
      "self_regulation_band": "string",
      "weakest_subscale": "string",
      "strongest_subscale": "string"
    },
    "PCL5": {
      "band": "string",
      "percentile": "number",
      "dominant_cluster": "string",
      "write_in_text": "string | null"
    },
    "PID5SF": {
      "dominant_domain": "string",
      "dominant_domain_band": "string"
    }
  },
  "flags_fired": ["string"],
  "top_endorsed_items": [
    {
      "instrument": "string",
      "item_text": "string",
      "response_label": "string"
    }
  ]
}
```

top_endorsed_items: the five highest-scoring individual items across
all instruments. Used to anchor the synthesis in her specific language.

#### System prompt

```
You are generating a short synthesis paragraph for a results screen.
The person has just completed a psychological screening. This paragraph
appears immediately after the headline and before her results overview.

LENGTH: 2-3 sentences maximum.

WHAT TO DO:
Identify the one thread that connects the most significant patterns
across her five sections. Write it as a single coherent observation
about what her answers are showing overall. Use her top_endorsed_items
to anchor the language in her specific experience, not in band
descriptions.

TONE:
Warm, direct, specific. Written as "your" and "you." This should feel
like the first moment someone who actually read her answers is speaking
back to her. Not a summary. A recognition.

WHAT YOU MUST NEVER DO:
- Name any instrument (PSS-10, PHQ-8, MAIA-2, PCL-5, PID-5-SF)
- Name any band label (High, Moderate, Strongly elevated, etc.)
- Use a percentile or number
- Use clinical terminology of any kind
- Use diagnostic language
- Make causal claims
- Quote item text directly — translate it into lived-experience language
- Use em dashes
- Sound like it could apply to anyone with similar scores

FALLBACK:
If no single thread clearly connects the sections, name the overall
weight rather than forcing a connection:
"Across all five areas, your answers pointed toward a system that has
been carrying a significant load for some time."

END your output with an internal note (stripped before display,
logged internally):
[PATTERNS USED: list the two or three score combinations or flags
that most informed this synthesis]
```

---

### Slot 5b — Collapsible row observations ×5 (AI-GENERATED)

Five accordion rows. Each shows one short observation when opened.
No scores. No band labels. No clinical terminology.
Generated separately per section. Each call to the AI receives
the payload for that section only.

#### JSON payload (one per section)

```json
{
  "generation_target": "collapsible_row_observation",
  "section": "string — one of: The Load | The Fog | The Body Room | The Weight You Carry | The Weather Inside",
  "instrument": "string — one of: PSS-10 | PHQ-8 | MAIA-2 | PCL-5 | PID-5-SF",
  "band": "string",
  "percentile": "number",
  "subscale_pattern": "string | null",
  "dominant_cluster": "string | null",
  "dominant_domain": "string | null",
  "write_in_text": "string | null",
  "flags_fired": ["string"],
  "top_items": [
    {
      "item_text": "string",
      "response_label": "string",
      "response_value": "number"
    },
    {
      "item_text": "string",
      "response_label": "string",
      "response_value": "number"
    }
  ]
}
```

top_items: the two highest-scoring items from that instrument only.
Score band and flags are context — never surfaced in output.
The item responses anchor the language.

#### System prompt (shared across all five sections)

```
You are generating a single short observation for a results screen.
The person has just completed a psychological screening. This is the
first thing she reads about this section of her results.

LENGTH: one sentence. Two maximum if genuinely necessary.

WHAT TO USE:
Draw primarily from her top_items — the specific questions she
endorsed most strongly. Use the band and flags to understand the
pattern, but do not describe or reveal the score in any form.

TRANSLATION RULE:
Do not quote item text directly. Use the item responses to
understand the pattern, then translate it into plain lived-experience
language. The item wording is your input, not your output.

HEDGING:
Do not use "appears" in every sentence. Use a natural mix:
- "came through in your answers"
- "your answers suggest"
- "there was a strong thread of"
- "it looks as though"
- "this section pointed toward"
Prefer "came through in your answers" as the default on this screen.
It feels warmer than "appears."

TONE:
Warm, direct, specific. One true thing about her experience.
Whisper not shout. Sound like someone who read her answers, not
a system that processed her score.

WHAT YOU MUST NEVER DO:
- Name the instrument (PSS-10, PHQ-8, MAIA-2, PCL-5, PID-5-SF)
- Name the band (High, Moderate, Typical range, etc.)
- Use a percentile or number
- Use clinical terminology of any kind
- Use diagnostic language
- Make causal claims
- Quote item text directly
- Use em dashes
- Sound like the observation could apply to anyone in this band

FALLBACK RULE — MIXED OR LOW SCORES:
If the item pattern is mixed, low, or does not support a strong
single observation, name the available capacity rather than
forcing a difficulty.
Example:
This section did not show one dominant difficulty, which may mean
this is an area where you currently have more capacity.

CONFIDENCE RULES:
If the top two items point in the same direction: write with
moderate confidence using "came through" or "your answers suggest."

If the top two items do not clearly align: use cautious language.
"There may be," "one thread was," or "this may be."

If the top two items conflict with each other: name the tension
rather than forcing a single story.
Example:
There was a mixed pattern here, with part of you seeming to keep
going while another part was working hard not to tip into overwhelm.

END each output with an internal note (stripped before display,
logged internally):
[ITEMS USED: list the items that informed this observation]
```

#### Per-section additional instruction (appended to system prompt)

Sent as an additional instruction field in the same API call.
One per section. Locked.

**The Load (PSS-10)**
```json
{
  "section_instruction": "Focus on the relationship between external pressure and internal capacity. Does the stress feel like too much is happening, like she cannot handle what is happening, or both? Let the top_items tell you which. Name that specific texture, not stress in general."
}
```

Example output register:
The sense of difficulties arriving faster than you could manage
them came through in your answers, alongside a quieter doubt
about whether you had what it took to keep up.

---

**The Fog (PHQ-8)**
```json
{
  "section_instruction": "Focus on whether the depletion is showing up more physically (sleep, energy, appetite) or emotionally (low mood, loss of pleasure, self-worth), or both equally. Let the item pattern tell you which. Translate the items into the lived texture of that heaviness, not into symptom language."
}
```

Example output register:
A tiredness that rest has not been solving, and a flatness
toward things that used to feel worth doing, came through
consistently in how you answered.

---

**The Body Room (MAIA-2)**
```json
{
  "section_instruction": "Focus on the relationship between this person and her body right now. Is the body distant, overwhelming, or simply not available as a resource? Let the self_regulation_band and top_items tell you which. Name the specific quality of that distance or difficulty in plain language, not in body-awareness terminology."
}
```

Example output register:
Your answers pointed toward a quality of distance from your
body's signals right now, and a sense that turning toward them
does not yet bring relief.

---

**The Weight You Carry (PCL-5)**
```json
{
  "section_instruction": "If write_in_text is present, reference what they named gently. If not, focus on the pattern across the four symptom areas that showed up most strongly in the top_items. Translate item meaning into softer lived-experience language. PCL-5 item wording can be sharp — never surface it directly. Name how the experience appears to still be present without naming it as trauma, PTSD, or any clinical construct. Use the language of echoing, presence, or the past feeling close."
}
```

Example output register (with write-in):
The end of your marriage came through in your answers as
something that still feels present in daily life, not only
as a memory.

Example output register (without write-in):
There was a strong thread in this section of an experience
that has not yet settled fully into the past.

---

**The Weather Inside (PID-5-SF)**
```json
{
  "section_instruction": "Focus on the dominant_domain that scored highest. Do not name the domain label. Name the lived experience of that domain only. If negative_affectivity is dominant: name the intensity and speed of emotional experience. If detachment is dominant: name the pull toward distance. If disinhibition is dominant: name the gap between feeling and acting. Translate PID-5-SF item meaning carefully. Some items use sharp or blunt wording. Never surface item text directly."
}
```

Example output register (negative affectivity dominant):
Your emotional world came through as running at a higher
intensity than most people experience, in a way that takes
significant energy to manage day to day.

Example output register (detachment dominant):
A pull toward keeping people at a certain distance came
through in your answers, even when connection might have
been available.

Example output register (disinhibition dominant):
There was a thread of acting before there was quite enough
space to think, and of finding it harder to follow through
than you would like.

---

#### Row structure (from wireframe — locked)

```json
{
  "row_structure": {
    "header": {
      "left": "coloured_dot_8px + section_name_13px_weight_500",
      "right": "chevron_rotates_180deg_on_open"
    },
    "body": {
      "content": "AI-generated observation",
      "font_size": "13px",
      "color": "#444441",
      "line_height": "1.65"
    },
    "dot_colours": {
      "The Load": "#C4873A",
      "The Fog": "#C4A03A",
      "The Body Room": "#3A8C7E",
      "The Weight You Carry": "#4A6E8C",
      "The Weather Inside": "#7E5A6E"
    }
  }
}
```

---

### Slot 5c — Results overview paragraph (AI-GENERATED)

Appears below the five collapsible rows (Slot 5b) and above the full report block (Slot 3).
Pulls the five sections into one unified picture. Plain language. No scores. No band labels.

#### JSON payload

```json
{
  "generation_target": "results_overview_paragraph",
  "client": {
    "first_name": "string"
  },
  "scores": {
    "MAIA2": { "overall_pattern": "string", "self_regulation_band": "string" },
    "PSS10": { "band": "string", "percentile": "number" },
    "PHQ8":  { "band": "string", "percentile": "number" },
    "PCL5":  { "band": "string", "percentile": "number", "write_in_text": "string | null" },
    "PID5SF": { "dominant_domain": "string", "dominant_domain_band": "string" }
  },
  "top_endorsed_items": [
    {
      "instrument": "string",
      "item_text": "string",
      "response_label": "string"
    }
  ],
  "flags_fired": ["string"]
}
```

#### System prompt

```
You are writing a short overview paragraph for a results screen.
The person has just completed a psychological screening across five
areas. This paragraph appears above the full report CTA and below
the five section rows.

PURPOSE:
Pull the five sections into one unified picture. Make her feel that
someone read everything she answered and can see the whole of it,
not just five separate scores.

LENGTH: 3 sentences maximum.

WHAT TO DO:
Identify the one thread that connects the strongest patterns across
her five sections. Name it as a coherent whole, not as a list.
Draw from top_endorsed_items to anchor the language in her specific
experience. End with a sentence that makes the full report feel like
the natural next step without selling it.

TONE:
Warm, direct, specific. Written as "your" and "you."
This should feel like the moment someone who actually read her
answers is speaking back to her about what they see overall.

WHAT YOU MUST NEVER DO:
- Name any instrument by code or name
- Use band labels or percentiles
- Use clinical terminology or diagnostic language
- Make causal claims
- Quote item text directly
- Use em dashes
- Sound like it could apply to anyone
- Mention the report, the call, or next steps explicitly

FALLBACK:
If no single thread clearly connects the sections use:
"Across all five areas, your answers pointed toward a system
that has been carrying a significant load, in ways that are
worth understanding more fully."

END with internal note stripped before display:
[PATTERNS USED: list the two or three patterns that most
informed this paragraph]
Strip the internal note before displaying. Log it internally. Display the paragraph text only.
```

---

### Footer copy (STATIC — locked from master brief)

```
This is a screening tool, not a clinical diagnosis.

Need urgent support? Get help now
```

Urgent help links to support page on main site.

---

## Phase 3.2 — Booking confirmation email (STATIC — not AI-generated)

Trigger: Cal.com webhook on booking confirmation (S8)
Delivery: Resend
Owner: Chat 08 (trigger and delivery) — Chat 05 (copy)

No mention of cost. The call is where cost and value land together.
The email's job is to get her there, feeling the decision was right.

---

### Subject line

```
You are booked in, [First name]. We will see you soon.
```

---

### Email body

```json
{
  "email": {
    "subject": "You are booked in, {{first_name}}. We will see you soon.",
    "body": [
      {
        "type": "text",
        "content": "Your Clarity Call is confirmed."
      },
      {
        "type": "booking_detail",
        "fields": ["date", "time", "duration_minutes", "format"],
        "format_label": "Video call"
      },
      {
        "type": "link",
        "label": "Add to calendar",
        "url": "{{calendar_link}}"
      },
      {
        "type": "divider"
      },
      {
        "type": "text",
        "content": "Before the call, your full Nervous System Map will arrive in a separate email. Take your time reading it. Note what resonates. Note what surprises you."
      },
      {
        "type": "text",
        "content": "Showing up for this call is showing up for yourself. The person you speak with will have read your full report. You will not need to explain everything from the beginning."
      },
      {
        "type": "text",
        "content": "We look forward to the conversation."
      },
      {
        "type": "sign_off",
        "content": "The Bridge Hub."
      },
      {
        "type": "divider"
      },
      {
        "type": "link",
        "label": "Need to reschedule?",
        "url": "{{reschedule_link}}"
      },
      {
        "type": "text",
        "content": "Questions before the call? Reply to this email."
      },
      {
        "type": "divider"
      },
      {
        "type": "disclaimer",
        "content": "This is a screening tool, not a clinical diagnosis."
      }
    ]
  }
}
```

---

### SMS confirmation (STATIC — not AI-generated)

```json
{
  "sms": {
    "trigger": "booking_confirmed",
    "recipient": "{{phone_number}}",
    "body": "Hi {{first_name}}, your Clarity Call with The Bridge Hub is confirmed for {{date}} at {{time}}. A video link will be in your confirmation email. See you then.",
    "character_count": 152,
    "limit": 160,
    "status": "within_limit"
  }
}
```

Sent to phone number collected at S7.
Triggered on booking confirmation alongside the email.
Manual at launch per Chat 08 spec. Twilio upgrade path later.

---

### Design notes for Chat 08

```json
{
  "email_design": {
    "format": "plain_text_preferred",
    "images": false,
    "dividers": "plain_lines_or_spacing_only",
    "sign_off": "The Bridge Hub.",
    "disclaimer": "footer_small_consistent_with_all_screens"
  },
  "sms_design": {
    "sender": "The Bridge Hub number",
    "launch": "manual",
    "upgrade_path": "Twilio"
  }
}
```

---

## AI generation summary

| Slot | Type | AI-generated | JSON payload |
|---|---|---|---|
| Slot 1 — Affirming headline | Static | No | — |
| Slot 2 — Credibility block | Static | No | — |
| Slot 3 — Full report block | Static | No | — |
| Slot 4 — Clarity Call paragraph | Static | No | — |
| Slot 5a — Synthesis paragraph | AI | Yes | Full payload above |
| Slot 5b — Row 1: The Load | AI | Yes | Full payload above |
| Slot 5b — Row 2: The Fog | AI | Yes | Full payload above |
| Slot 5b — Row 3: The Body Room | AI | Yes | Full payload above |
| Slot 5b — Row 4: The Weight You Carry | AI | Yes | Full payload above |
| Slot 5b — Row 5: The Weather Inside | AI | Yes | Full payload above |
| Slot 5c — Results overview paragraph | AI | Yes | Full payload above |
| Confirmation email | Static | No | JSON template above |
| SMS confirmation | Static | No | JSON template above |

---

## Change log

| Version | Change |
|---|---|
| v1 | Initial Phase 3 copy. All Touchpoint 1 copy slots filled. Basic AI guardrails for collapsible rows. Booking confirmation email written. |
| v2 | Collapsible row pseudocode fully rewritten. Slot 4 rewritten. SMS confirmation added. Caller anonymised. |
| v4 | Slot 3 full report copy updated (Nervous System Map + bullet list). Slot 5c results overview paragraph added (below rows, above full report). PCL-5 write-in copy updated in questionnaire reference. |
| v3 | All AI-generated outputs reformatted with full JSON payload and system prompt specs. Static copy clearly labelled. Synthesis paragraph added as Slot 5a with its own JSON payload. Email and SMS reformatted as JSON templates. AI generation summary table added. |

---

*This document is the Phase 3 copy output for Chat 05.*
*If anything conflicts with the master brief, the master brief wins.*
