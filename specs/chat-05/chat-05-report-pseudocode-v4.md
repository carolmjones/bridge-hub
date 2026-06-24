# The Bridge Hub — Client Report Pseudocode — v2
## Your Nervous System Map: Full Structure and Logic

> This document is the complete structural specification for the client PDF report.
> It defines every section, every layer, every conditional, and every copy block.
> Copy and design are both specified here. This is the build reference.
> All decisions locked unless marked TBC.
> If anything conflicts with the master brief, the master brief wins.
> Last updated: June 2026

---

## Report identity

**Title:** Your Nervous System Map
**Subtitle (cover only):** A personalised map of what your body and mind have been carrying.
**Report type label (cover metadata):** Screening Report
**Closing line (cover):** There is no rush. Take your time with this. You are safe to go at your own pace.

---

## Global design tokens

**Fonts:** Cormorant Garamond (headings, italic narrative) + Inter (body, labels, tables)
**Background:** Warm Paper #F6F0E6
**Card background:** Cream #FAF7EF
**Card border:** #DDD4C7
**Body text:** Soft Ink #4B504A
**Heading text:** Ink #232824
**Muted text:** #9B978D
**Accent line:** Line Stone #CFC4B5
**Layer 2 border:** #CFC4B5 (3px left border)
**Section rules:** 1px solid #CFC4B5

**Typography scale:**
- Cover title: Cormorant Garamond 68px, weight 400
- Section name: Cormorant Garamond 38px, weight 400
- Report heading: Cormorant Garamond 34px, weight 400
- Synthesis heading: Cormorant Garamond 30px, weight 400
- Layer 1 narrative: Cormorant Garamond 18px, italic, weight 400
- Body text: Inter 14px, weight 400, line-height 1.7
- Small body: Inter 13px, weight 400, line-height 1.65
- Labels: Inter 10-11px, weight 500, letter-spacing 0.1em, uppercase
- Source notes: Inter 10px, color #BEC2A9

---

## SECTION 0 — Cover page

**Layout:** Full page portrait. Background image embedded as base64 PNG.
Image file: background_Serene_lakeside_mist_with_botanical_accents.png
1054×1492px. Warm paper background, misty lake landscape lower half,
sage botanical illustration bleeding off right edge, negative space upper left.

Cover wrapper: position relative, width 480px (screen) or full A4 (print),
aspect-ratio 1054/1492, overflow hidden.

Background img: position absolute, inset 0, width 100%, height 100%,
object-fit cover, object-position center top.

Content layer: position absolute, inset 0, display flex, flex-direction column,
padding 36px 40px 32px.

**Elements (top to bottom):**

```
[Wordmark — Inter 10px weight 500 letter-spacing 0.28em uppercase #6B6B60, centered]
[Arc — 28px wide, 1px stroke #9B978D, border-radius 0 0 50% 50%, centered]

[Title block — margin-top 32px, flex:1]
  [YOUR — Inter 10px weight 500 letter-spacing 0.22em uppercase #999A8A]
  [Nervous — Cormorant Garamond 58px weight 400 line-height 0.92 #232824]
  [System — same]
  [Map — same, margin-bottom 20px]
  [Rule — 40px wide, 1px #CFC4B5, margin-bottom 14px]
  [Subtitle — Inter 13px #4B504A max-width 220px line-height 1.55]
  "A personalised map of what your body and mind have been carrying."

[Metadata — margin-top auto]
  [Table — width 100%, border-collapse collapse, margin-bottom 16px]
    Row borders: 1px solid rgba(207,196,181,0.8)
    Label col: Inter 9px weight 500 letter-spacing 0.1em uppercase #9B978D, width 38%
    Value col: Inter 13px #232824
    Rows: Prepared for / Date / Report type
  [Closing block — background rgba(237,232,226,0.88), border-radius 8px, padding 12px 14px]
    [botanical icon SVG — 18px, stroke #999A8A, flex-shrink 0]
    [text — Inter 11px #4B504A line-height 1.6]
    "There is no rush. Take your time with this.
     You are safe to go at your own pace."
```

**Implementation note:**
Background image must be embedded as base64 data URI in the HTML.
Do not use an external file path — it will not render in PDF generation.
Encode: base64 -w 0 [image file] then embed as src="data:image/png;base64,[data]".

---

## SECTION 1 — Opening

**Heading:** This is your map.

**Body copy:**

You just spent time answering questions about experiences that many people
struggle to put into words.

This is not a diagnosis. It is not a judgement. It is not a measure of
your worth.

Think of it as a map. A way of seeing patterns that may have been shaping
how you feel, how you think, how you move through your days, and how safe
life feels inside your body.

Some parts may feel familiar. Some parts may surprise you.

Take your time. There is no need to read it all at once.

**Rule divider**

**Subheading (Inter 13px, weight 500, Ink):** How this map is structured

**Body:**

This map moves through five areas of your experience:

[section list — each item: section name bold + description]
- The Load — how much your system has been carrying recently
- The Fog — how life has been feeling from the inside
- The Body Room — your relationship with your body's signals
- The Weight You Carry — what past experiences may still be echoing
- The Weather Inside — your emotional patterns and protection responses

Within each section you will find:

- A personalised reflection drawn from your specific answers
- What your nervous system may be trying to do
- A research-grounded interpretation, drawn from the published science
  behind each tool

The five tools used in this screening are the PSS-10, PHQ-8, MAIA-2,
PCL-5, and PID-5-SF, validated instruments used in clinical research
and practice worldwide. Your results are measured against published
population data.

Your full responses are included in the addendum at the end of this map.

**Closing warm block (#EDE8E2, border-radius 10px):**

If anything here feels difficult, pause.
You do not need to read this all at once.

---

## SECTION 2 — Instrument sections (×5)

Each instrument section follows the same structure.
Sections appear in completion order: PSS-10, PHQ-8, MAIA-2, PCL-5, PID-5-SF.

### 2.0 — Section header

```
[section rule — 1px #CFC4B5]
[eyebrow — "Section X of 5", Inter 10px, #9B978D]
[section name — Cormorant Garamond 38px, Ink]
[instrument label — Inter 11px, #BEC2A9, letter-spacing 0.06em]
[orienting sentence — Inter 13px, #4B504A]
```

**Orienting sentences (locked per section):**

- The Load: This part of the map looks at how much your system has been
  carrying recently. Not what happened. Simply how much pressure your
  body and mind have been trying to hold.

- The Fog: This part of the map looks at how life has been feeling from
  the inside over the past two weeks, including mood, energy, sleep,
  and how you have been experiencing yourself.

- The Body Room: This part of the map looks at your relationship with
  your body's signals, how you notice them, whether you can stay with
  them, and whether your body feels like a source of information or
  something to move away from.

- The Weight You Carry: This part of the map looks at whether difficult
  or distressing experiences from the past are still taking up space
  inside your system today.

- The Weather Inside: This part of the map looks at your emotional
  patterns, how you tend to respond under pressure, and the ways your
  system has learned to protect itself.

---

### 2.1 — Write-in block (PCL-5 only)

**Condition:** Appears only in The Weight You Carry section,
and only if the user completed the 5d write-in field.

```
[warm tinted block — background #EDE8E2, border-radius 12px]
  [label — "What you named before this section", Inter 10px uppercase #9B978D]
  [user text — Cormorant Garamond 19px italic, Ink, in quotation marks]
```

If write-in left blank: block does not appear.

---

### 2.2 — Chart

Chart style varies per instrument. All charts sit inside a cream card
(background #FAF7EF, border 1px #DDD4C7, border-radius 14px, padding 22px 24px).

**PSS-10 — Arc gauge (Style 1) — LOCKED IMPLEMENTATION**

SVG viewBox: 0 0 160 100. Arc center: cx=80, cy=88. Radius: 62. Stroke-width: 16.
Background arc: M 18 88 A 62 62 0 0 1 142 88, stroke #E6E3D9, linecap round.
Fill arc: same path, stroke #999A8A, linecap round.
Fill dasharray = 194.78 (π × 62). Fill dashoffset = 194.78 × (1 - percentile/100).
Example 88th percentile: dashoffset = 23.37.

Dot position — calculated from arc geometry:
angle_rad = (1 - percentile/100) × π
dot_cx = 80 + 62 × cos(angle_rad)
dot_cy = 88 - 62 × sin(angle_rad)
Example 88th percentile: dot_cx=138, dot_cy=65.
Dot: r=8, fill #232824, stroke #FAF7EF stroke-width 2.5.

Percentile number: x=80, y=74, Cormorant Garamond 28px, fill #232824.
PERCENTILE label: x=80, y=87, Inter 9px, fill #9B978D, letter-spacing 1.5.
Layout: arc SVG left, right col flex (contextual sentence + band pill + source note).
Contextual sentence: "Higher than [X]% of adults in the general population".

Band pill labels:
- 0-13: Low stress load (background #E6E3D9)
- 14-26: Moderate stress load (background #DACEBF)
- 27-40: High stress load (background #DACEBF)

**PHQ-8 — Population comparison bars (Style 2) — LOCKED IMPLEMENTATION**

Layout: left col (percentile number + context + band pill) + right col (bars).
Left col min-width 84px. Right col flex:1.

Left col:
- Percentile number: Cormorant Garamond 44px, sup 17px color #9B978D
- Contextual sentence: Inter 13px, #4B504A
- Band pill

Right col — four rows, gap 6px:
Row 1: label "None / minimal" | track fill 76% #D6D4C8 | pct "76%"
Row 2: label "Mild"           | track fill 18% #BEC2A9 | pct "18%"
Row 3: label "Moderate"       | track fill  5% #999A8A | pct "5%"
Row 4 (Your result): label "Your result" color #8C6F7B weight 500
        | track fill [percentile]% #8C6F7B, track bg #F0E8EC
        | pct "[X]th" color #8C6F7B weight 500 — SHOW ACTUAL PERCENTILE NUMBER
        | row background rgba(140,111,123,0.07), border-radius 4px

Track height: 12px, border-radius 3px, bg #E6E3D9.
Label width: 98px, text-align right, Inter 11px #4B504A.
Pct col width: 26-30px, Inter 11px.
Source note below bars.

Band pill labels and backgrounds:
- 0-4: None / minimal (#E6E3D9, #4B504A)
- 5-9: Mild (#E6E3D9, #4B504A)
- 10-14: Moderate (#DACEBF, #4B504A)
- 15-19: Moderately severe (#DACEBF, #4B504A)
- 20-24: Severe (#DACEBF, #4B504A)

**MAIA-2 — Subscale rows (Style 4)**
```
[five rows, one per subscale]
  [subscale name — Inter 12px, #4B504A, 200px fixed width]
  [track — background #E6E3D9, height 9px, border-radius 5px]
  [fill — background #BEC2A9, width = percentile%]
  [dot — background #999A8A, 17px diameter, sits on track at percentile position]
  [percentile — Inter 11px weight 500, Ink, right-aligned]
[source note — (Mehling et al., 2018)]
```

Subscale labels (locked):
- Not-Distracting: Not avoiding body sensations
- Not-Worrying: Tolerating strong feelings
- Attention Regulation: Seeing yourself clearly
- Emotional Awareness: Emotional awareness
- Self-Regulation: Self-regulation

**PCL-5 — Gradient spectrum (Style 3) — LOCKED IMPLEMENTATION**

Layout: STACKED (not side by side).
Top block: percentile number (Cormorant Garamond 48px) + contextual sentence + band pill.
Bottom block: full-width SVG spectrum track + axis + zone labels + source note.

Top block:
- Number: Cormorant Garamond 48px, sup 18px color #9B978D
- Contextual sentence: "Your responses show more impact from difficult
  experiences than [X]% of adults", Inter 13px #4B504A
- Band pill

SVG spectrum — full container width:
viewBox: 0 0 400 32. Width: 100%%. overflow: visible.
Track: rect x=0 y=10 width=400 height=10 rx=5
  fill: linearGradient left to right: #D6D4C8, #BEC2A9, #999A8A, #989FA5
Dot: cx = percentile/100 × 400, cy=15, r=9
  fill #232824, stroke #FAF7EF stroke-width 2.5
Example 84th percentile: cx = 0.84 × 400 = 336, cy=15.

Axis labels below SVG: 0th / 25th / 50th / 75th / 100th, Inter 10px #9B978D.
Zone labels: Minimal (left) / Moderate to Severe (right), Inter 10px #9B978D.
Source note: (Renyer, 2016; Bovin et al., 2016).

Band pill labels:
- 0-10: Minimal (#E2E6EA, #4B606F)
- 11-20: Mild (#E2E6EA, #4B606F)
- 21-30: Moderate (#E2E6EA, #4B606F)
- 31-40: Moderately severe (#E2E6EA, #4B606F)
- 41-80: Severe (#E2E6EA, #4B606F)

**PID-5-SF — Domain columns (Style 5)**
```
[left — three vertical columns]
  [percentile number above each column — Inter 11px weight 500]
  [column bar — height proportional to percentile, border-radius 3px 3px 0 0]
    Negative emotional reactivity: #8C6F7B
    Withdrawing from relationships: #D6D4C8
    Impulse and self-control: #989FA5
  [domain label below each column — Inter 10px, #9B978D]
[right — legend]
  [three items, each:]
    [colour dot 9px] [domain name Inter 12px] [band descriptor below]
  Band descriptors (client-facing — locked):
    Below 84th: Typical range (#9B978D)
    84th-93rd: Meaningfully elevated (#989FA5 or domain colour)
    Above 93rd: Strongly elevated (#8C6F7B or domain colour)
[source note — (Miller et al., 2022)]
```

Domain labels (locked):
- Negative Affectivity: Negative emotional reactivity
- Detachment: Withdrawing from relationships
- Disinhibition: Impulse and self-control

PID-5-SF client/therapist routing rules (locked):

CLIENT REPORT shows:
- All three domain blocks (Negative emotional reactivity, Withdrawing from relationships,
  Impulse and self-control) at all band levels
- Facet blocks: Emotional lability, Anxiousness, Separation insecurity, Withdrawal,
  Anhedonia, Intimacy avoidance, Impulsivity, Follow-through under stress, Distractibility
  — at meaningfully elevated or strongly elevated only
- Depressivity — meaningfully elevated version only
- Depressivity strongly elevated — softened client signpost only (see Layer 2 blocks)
- "What this tool cannot tell us" block — NOT shown to client

THERAPIST BRIEFING shows (in addition to all of the above):
- Unusual beliefs and experiences — both bands (never shown to client)
- Perceptual dysregulation — both bands (never shown to client)
- Depressivity strongly elevated — full clinical picture including severity context
- All facets at all band levels regardless of domain
- Full clinical band language: "Clinically significant" used throughout

---

### 2.3 — Layer 1: Personalised reflection

```
[Cormorant Garamond 18px italic, #4B504A, line-height 1.65]
[AI-generated per user — 2-3 sentences]
[margin-bottom 20px]
```

**AI prompt guardrails per instrument:**

PSS-10: Write 2-3 sentences in warm plain language reflecting this
person's specific PSS-10 response pattern. Reference what their
answers showed about the texture of their stress, whether it leaned
toward feeling overwhelmed by circumstances, doubting their own
capacity, or both. Do not use the words: helplessness, self-efficacy,
PSS, score, band, or any clinical label. Do not summarise what follows.
Speak directly as "you."

PHQ-8: Write 2-3 sentences in warm plain language reflecting this
person's specific PHQ-8 response pattern. Note whether their answers
leaned more toward physical symptoms (sleep, energy, appetite) or
inner experience (low mood, loss of pleasure, self-worth), or both.
Do not use the words: depression, depressive, PHQ, score, band,
somatic, cognitive, or any clinical label. Speak directly as "you."

MAIA-2: Write 2-3 sentences in warm plain language reflecting this
person's MAIA-2 pattern across five subscale scores. Identify the
one or two areas where their relationship with body signals is most
limited or most developed. Do not name subscales, scores, bands.
Do not use: interoception, interoceptive, MAIA, alexithymia,
dysregulation. Speak directly as "you."

PCL-5: Write 2-3 sentences in warm plain language reflecting this
person's PCL-5 response pattern. Note which areas their answers were
most concentrated in without naming clinical categories. Do not use:
PTSD, trauma, PCL, score, band, cluster, or any clinical label.
Do not assume a specific event. Speak directly as "you."

PID-5-SF: Write 2-3 sentences in warm plain language reflecting this
person's PID-5-SF response pattern across three domains. Identify
the one or two areas where their emotional patterns are most prominent.
Do not name: facets, domains, scores, bands, PID, maladaptive, or
any diagnostic language. Speak directly as "you."

---

### 2.4 — Layer NS: Two-part recognition block

This layer appears in every section regardless of score.
Pre-written per instrument per band.
Two parts per block. Total length: 6-7 sentences maximum.
No clinical labels. No scores. No band names.
Frames patterns as adaptation, not deficit.
Names the inside experience before explaining it.

**Format:**
```
[subheading — "What we noticed"]
[Inter 11px, weight 500, letter-spacing 0.1em, uppercase, #BEC2A9]
[body — Inter 13px, #4B504A, line-height 1.65]
[2-3 sentences — names the inside experience specifically]

[subheading — "What your nervous system may be trying to do"]
[Inter 11px, weight 500, letter-spacing 0.1em, uppercase, #BEC2A9]
[body — Inter 13px, #4B504A, line-height 1.65]
[3-4 sentences — names how it looks, how it feels inside, the reframe]
```

**Rule for "What we noticed":**
Name what it actually feels like to be her in this pattern right now.
Not what is happening clinically. Not what her score means.
What the inside experience is. The thing she recognises.

**Rule for "What your nervous system may be trying to do":**
Name the outside appearance briefly if useful.
Then name the inside feeling: the thing she says to herself.
Then the reframe: this is not weakness, this is the system adapting.
One true thing. Then stop.

---

**Pre-written NS blocks per instrument per band:**

---

PSS-10 — Low (0-13):

What we noticed:
Life feels broadly manageable right now. There is enough space between
demands to recover, to think, to respond without tipping into overwhelm.
This is not nothing. It is a genuine resource that not everyone has.

What your nervous system may be trying to do:
The system has enough capacity available to engage rather than just survive.
This is worth noting, especially if other parts of this map tell a heavier story.
A nervous system with available capacity is a nervous system that can begin
to work with what it finds.

---

PSS-10 — Moderate (14-26):

What we noticed:
There is a quality of running to stay still. Managing one thing while
already aware of the next. The load is real, and the effort to carry it
is constant, even when it is not visible from the outside.

What your nervous system may be trying to do:
When pressure builds steadily, the system begins allocating more toward
managing demands and less toward recovery. From the inside this often
feels like: "I am keeping up, but only just." This is not a character flaw.
It is a system working hard under sustained load.

---

PSS-10 — High (27-40):

What we noticed:
Problems do not arrive one at a time. They arrive in clusters, and by the
time one is managed, another has appeared. There is a growing uncertainty
about your own capacity, not because you are incapable, but because
carrying too much for too long changes how capable you feel.

What your nervous system may be trying to do:
When demands remain high for long enough, the system reorganises around
one goal: get through today. From the inside this often feels like survival
rather than participation. Many people interpret this as failure.
It is not. It is a system that has been working extremely hard,
often without enough rest between demands.

---

PHQ-8 — None/Minimal (0-4):

What we noticed:
There is not a significant weight here right now. Life has some colour,
some movement, some capacity for pleasure and engagement. This matters,
particularly when other parts of this map are heavier.

What your nervous system may be trying to do:
The system does not appear to be in conservation mode in this area.
There is room for recovery and connection. This is a resource,
and it is worth recognising it as one.

---

PHQ-8 — Mild (5-9):

What we noticed:
Something has gone quieter. Activities that used to feel engaging require
a little more effort to begin. There is a flatness that is hard to explain
to someone who has not felt it. Not sadness exactly. More like
the colour has turned down slightly.

What your nervous system may be trying to do:
The system is beginning to signal that it needs more than it is currently
receiving. From the inside this sometimes sounds like: "I know I should
want to do this. I just can't make myself." This is not laziness.
It is an early signal that something needs attention.

---

PHQ-8 — Moderate (10-14):

What we noticed:
Getting through the day takes more effort than it used to. Simple things
feel heavier. The gap between knowing you should do something and actually
being able to do it has grown. This is not about motivation.
It is about capacity.

What your nervous system may be trying to do:
When emotional and physical resources run low, the system begins to conserve.
Less energy goes toward pleasure, connection, and meaning. More goes toward
basic functioning. From the inside this often feels like: "I know I should
care more than I do." This is not failure. It is triage.

---

PHQ-8 — Moderately severe (15-19):

What we noticed:
Most things require significant effort right now. Rest does not fully
restore. Activities that once felt natural now feel like decisions.
The tiredness is not just physical. It is everywhere.

What your nervous system may be trying to do:
The system has been running on depleted reserves long enough that it is
now conserving almost everything. From the inside this can feel like:
"I am going through the motions but I am not really there."
The system is not broken. It is exhausted. Exhausted systems can recover.
They need the right conditions to do so.

---

PHQ-8 — Severe (20-24):

What we noticed:
Very little feels reachable right now. The distance between where you are
and where you want to be feels vast. Even small things carry weight.
This is one of the heaviest loads a nervous system can carry.

What your nervous system may be trying to do:
When the load exceeds what the system can sustain, it moves into
deep conservation. Almost everything goes toward getting through.
From the inside this can feel like disappearing from your own life.
This is the body protecting itself. It is also the clearest signal
that significant support is needed now, not later.

---

MAIA-2 — Overall limited (majority below 25th percentile):

What we noticed:
There is a quality of distance from your own body. Not numbness exactly.
More like the body's signals arrive muffled, or arrive and are quickly
redirected. Discomfort is managed by moving attention away from it.
This is very common. And it usually developed for a reason.

What your nervous system may be trying to do:
When the body has been associated with pain, threat, or overwhelm,
the system learns to spend as little time there as possible.
Staying in the head, keeping sensation at arm's length: these are
protection strategies, not personal failings. The capacity to reconnect
is still there. It has simply gone quiet.

---

MAIA-2 — Overall developing (majority 25th-75th percentile):

What we noticed:
Sometimes the body feels like a useful source of information.
Other times it feels distant or unreliable. There is some capacity
to be present physically, but it is not yet consistent or automatic.

What your nervous system may be trying to do:
The system has a partial connection to body signals but does not yet
fully trust them. This is workable territory. The foundation is present,
even if it is not yet robust. Trust in the body builds through
repeated safe experience, not through effort alone.

---

MAIA-2 — Overall strong (majority above 75th percentile):

What we noticed:
Your body is generally available to you as a source of information.
You can notice what it is signalling, stay with it, and use it
to understand what you are feeling. This is a significant resource.

What your nervous system may be trying to do:
The system has learned to treat body signals as useful rather than
threatening. This means you have access to a regulatory tool that
many people do not. It forms the foundation for most effective
therapeutic and healing work.

---

MAIA-2 — Self-regulation Limited (always named separately when below 25th):

What we noticed:
When things become overwhelming, turning toward the body or breath
does not produce calm. It may even increase distress. The body is not
currently a place of rest.

What your nervous system may be trying to do:
The regulatory route through body awareness is not yet open.
This is not permanent. But it means that approaches which ask the body
to settle before it feels safe enough to do so will not work yet.
Building safety in the body is usually where the work begins.

---

PCL-5 — Minimal (0-10):

What we noticed:
The experience you held in mind during this section does not appear
to be taking up significant space right now. There may still be
moments of difficulty, but they are not dominating.

What your nervous system may be trying to do:
The system appears to have had enough time or support to begin filing
this experience away as something that is over. That is a meaningful
shift. It does not erase what happened. It means the system is no
longer spending significant resources monitoring for it.

---

PCL-5 — Mild (11-20):

What we noticed:
The experience you named is not dominating daily life, but it is
not fully quiet either. There are still moments when something
catches you. A reminder. A feeling. A sudden shift in mood
that arrives without obvious cause.

What your nervous system may be trying to do:
The system is still occasionally checking: is this safe? Is it over?
The checking is not constant, but it is there. This is the nervous
system doing its job. It has not yet received enough evidence
that the experience is fully resolved.

---

PCL-5 — Moderate (21-30):

What we noticed:
The experience you named is still close. Not necessarily as a
constant thought, but as a presence. Certain situations, emotions,
or moments activate something that feels connected to it.
The body remembers differently than the mind.

What your nervous system may be trying to do:
The system learned something from what happened and is still
applying that learning. Still watching. Still bracing in certain
situations. From the inside this can feel like: "I know I am
overreacting. I cannot seem to stop." This is not irrational.
It is a system protecting you from something it learned was dangerous.

---

PCL-5 — Moderately severe (31-40):

What we noticed:
The experience you named is still significantly shaping daily life.
Not just as memory, but as a presence that influences how safe things
feel, how you respond to certain situations, how close you let
people get. It is not always conscious. But it is consistent.

What your nervous system may be trying to do:
The system has not been able to file this away as something that is
over. It remains on alert. From the inside this often feels like
exhaustion without rest, vigilance without relief. The system is
not broken. It has simply not yet had the conditions it needs
to conclude that the danger has passed.

---

PCL-5 — Severe (41+):

What we noticed:
The experience you named is one of the loudest things in your system
right now. It is influencing mood, sleep, how safe you feel, and how
present you are able to be in your own life. This is a significant load.

What your nervous system may be trying to do:
The system is in a state of sustained protection. It is working
constantly to keep you safe from something it has not yet been able
to conclude is over. From the inside this often feels like being
unable to fully arrive anywhere. The system needs significant support
to begin finding its way back to safety.

---

PID-5-SF — Negative emotional reactivity — Typical range:

What we noticed:
Emotions arise and move through without dominating. There is room
to feel difficult things without being overwhelmed by them.
This capacity is a genuine resource, particularly when other parts
of this map are heavier.

What your nervous system may be trying to do:
The emotional alarm system is calibrated within a typical range.
It responds, but it does not tend to flood. This means there is
capacity for reflection between feeling and responding.

---

PID-5-SF — Negative emotional reactivity — Elevated:

What we noticed:
Feelings arrive quickly and feel more intense than you would like.
The gap between something happening and your emotional response
is shorter than for most people. This is tiring. And it often
feels like a reaction you would rather not be having.

What your nervous system may be trying to do:
The system has a lower threshold for emotional activation than most.
From the inside this can feel like: "I know this is not a big deal.
Why am I reacting like this?" The system is not being dramatic.
It has learned to feel things quickly and strongly, often as a
form of protection. Sensitivity and reactivity are not weaknesses.
They are learned responses.

---

PID-5-SF — Negative emotional reactivity — Clinically significant:

What we noticed:
Emotions arrive fast, feel intense, and are hard to settle.
The emotional world is loud in a way that most people around you
probably do not experience. This takes a significant amount of energy
to manage every day, and most of that effort is invisible to others.

What your nervous system may be trying to do:
The system has become highly sensitive and highly reactive.
From the inside this often feels like emotions have volume without
a dial to turn them down. This is not a personality flaw.
It is often a nervous system that needed to feel things quickly
and intensely to survive something. That sensitivity became the
default setting. It can change.

---

PID-5-SF — Withdrawing from relationships — Typical range:

What we noticed:
Connection with others does not appear to be a primary source of
difficulty right now. There is capacity for closeness without
the system organising significantly against it.

What your nervous system may be trying to do:
The system does not appear to have strong protective patterning
around intimacy or connection. This is a resource, particularly
when other areas of this map are more active.

---

PID-5-SF — Withdrawing from relationships — Elevated:

What we noticed:
There is a preference for a degree of distance. Not isolation,
but a careful management of how close people get. This may feel
like a deliberate choice. Often it is also something deeper.

What your nervous system may be trying to do:
The system has some protective patterning around closeness.
Keeping distance, staying somewhat withdrawn: these tend to develop
when connection has felt unpredictable or unsafe at some point.
From the inside this can feel like: "I want connection but I
also do not fully trust it." That is not contradiction.
It is protection.

---

PID-5-SF — Withdrawing from relationships — Clinically significant:

What we noticed:
Closeness feels genuinely difficult. There is a pull toward distance,
toward keeping people at arm's length, toward managing how much
anyone can really see. This is exhausting to maintain alongside
a desire for connection that is often still present underneath.

What your nervous system may be trying to do:
The system has organised significant protective patterns around
intimacy. What can look like preference for solitude often has
roots in experiences that taught the system that closeness is
not safe. From the inside this can feel like loneliness and relief
living in the same space. That is the cost of this kind of protection.

---

PID-5-SF — Impulse and self-control — Typical range:

What we noticed:
There is generally a reasonable gap between impulse and action.
The system can pause, consider, and choose most of the time.

What your nervous system may be trying to do:
The system has a functional capacity to regulate the speed between
activation and response. This provides room for reflection
and decision-making under pressure.

---

PID-5-SF — Impulse and self-control — Elevated:

What we noticed:
Actions sometimes arrive before the thought that considered them.
It is hard to slow down in the moment. Looking back, the question
is often: why did I do that? The answer is usually: it happened
before you had a chance to decide.

What your nervous system may be trying to do:
The gap between impulse and action has narrowed. The system moves
quickly from activation to response. This often develops in
environments where slowing down did not feel safe or possible.
From the inside it can feel like being slightly behind your own
behaviour. It can change with the right support.

---

PID-5-SF — Impulse and self-control — Clinically significant:

What we noticed:
The gap between feeling something and acting on it is very small.
Concentration is hard to sustain. Following through on intentions
is a consistent struggle. This is not about willpower.
The system is simply moving very fast.

What your nervous system may be trying to do:
The system has learned that fast responses are necessary.
Speed became safety. From the inside this can feel like
being in a permanent state of reactivity, where the deliberate
and the impulsive are almost indistinguishable.
This is one of the most directly addressable patterns
with the right kind of support.

---

### 2.5 — Transition into Layer 2

```
[Inter 11px, weight 500, letter-spacing 0.1em, uppercase, #BEC2A9]
"Here is what the research says about this pattern."
```

---

### 2.6 — Layer 2: Research-grounded interpretation

Pre-written blocks per instrument per band. Drawn from Chat 03
Layer 2 content library. Shortened for user-facing register.
No em dashes anywhere. No deficit language as the lead.

**Format:**
```
[cream card — background #FAF7EF, border-left 3px solid #CFC4B5,
 border-radius 0 10px 10px 0, padding 16px 18px 16px 22px]
  [label — instrument + band descriptor, Inter 10px uppercase #BEC2A9]
  [body — Inter 13px, #4B504A, line-height 1.65]
  [2-3 paragraphs maximum]
```

**Label format per section:**
- PSS-10: "Research-grounded interpretation"
- PHQ-8: "Research-grounded interpretation"
- MAIA-2: One block per subscale in limited or developing band.
  Label = subscale user-facing name.
  Strong band subscales: block does not appear (resource, not concern).
- PCL-5: "Research-grounded interpretation"
- PID-5-SF: One block per elevated or clinically significant domain.
  Typical range domains: block does not appear.
  Label = domain user-facing name.

**Language rules for all Layer 2 blocks:**
- Never lead with deficit framing
- Never use em dashes
- Clinical weight appears after the human framing, not before
- "Clinically significant" is replaced with:
  "[Domain/instrument] stands out as one of the strongest patterns
  in your results" as the in-text framing before the clinical context
- Band descriptor appears in the label only, not repeated in body text

**User-facing Layer 2 blocks:**

PSS-10 — Low:
In this range, stress is not experienced as overwhelming. Life feels
broadly manageable, and there is a general sense of being able to
cope with what is being asked. This does not mean life is without
difficulty. It means the demands feel proportionate to the capacity
to meet them.

The average PSS-10 score in the general adult population is around
15 to 16 (Cohen & Janicki-Deverts, 2012). A score in the low range
sits below that average. This is a meaningful resource, a sense of
manageability that not everyone has access to.

PSS-10 — Moderate:
In this range, stress is a real and present feature of life. There
are moments of feeling overloaded, of struggling to keep up, of
sensing that circumstances are not fully within control. This is
the most common experience. The majority of adults score in this
range. Being here is not a sign that something is wrong. It is a
sign that life is making real demands.

Most adults in the general population score between 14 and 26 on
the PSS-10. This range has been associated with some difficulty
managing competing demands, but also with retained capacity to cope
(Cohen & Janicki-Deverts, 2012).

PSS-10 — High:
In this range, stress has become something closer to a constant
presence. Life feels unpredictable and at times overwhelming. The
sense that difficulties are piling up faster than they can be managed
is familiar. This is not a character flaw. It is a physiological and
psychological response to sustained pressure that has exceeded the
system's current capacity to absorb it.

High perceived stress has been associated with elevated cortisol
levels, suppressed immune function, and slower wound healing (Cohen
& Janicki-Deverts, 2012). The body and the mind do not separate
stress from its physical toll. What you are carrying is real,
significant, and worth taking seriously.

[Additional PSS subscale blocks if flags triggered — from Chat 03]

PHQ-8 — None/Minimal:
Depression symptoms in this range are not clinically significant.
There may be difficult days and moments of low mood, that is part
of being human, but they are not forming a pattern that meets the
threshold for clinical concern. The majority of people in the general
population score in this range (Kroenke et al., 2009).

PHQ-8 — Mild:
Some symptoms are present. They may not feel overwhelming, but they
are there: a flatness, a difficulty finding pleasure in things that
used to feel meaningful, some tiredness that does not fully lift.
This range is worth paying attention to, not because it signals
crisis, but because it signals that something in the emotional
system is under strain.

Approximately 18% of adults score in this range in general population
studies (Kroenke et al., 2009). Mild symptoms represent a point at
which support can prevent progression to a more significant episode.

PHQ-8 — Moderate:
Symptoms are consistent enough to interfere with the ability to do
what needs to be done: to concentrate, to sustain interest, to
maintain energy and sleep. This is not a light load.

A score of 10 or above on the PHQ has a sensitivity of 81% and a
positive predictive value of 92% for major depression (Kroenke et al.,
2001). Scoring here means there is a very high likelihood that
professional support is indicated. This is a meaningful clinical
signal, not a screening false positive.

PHQ-8 — Moderately severe:
Symptoms are not occasional or mild. They are consistent, pervasive,
and affecting the ability to function across most areas. Getting
through the day requires significant effort.

Scores in this range are consistent with major depressive disorder
at a severity that substantially affects daily functioning (Kroenke
et al., 2009). Research consistently shows that depression at this
level responds well to treatment. It is not a fixed state. It is
a point in a trajectory that can change with the right support.

PHQ-8 — Severe:
Symptoms are present at their most intense across nearly all
dimensions: mood, energy, sleep, concentration, sense of self-worth.

Scores in this range are consistent with severe major depressive
disorder (Kroenke et al., 2009). Research indicates that this level
typically requires combined treatment. This is not a sign that things
cannot get better. It is a sign of how much the system is currently
carrying, and how much support it needs right now.

MAIA-2 — Not avoiding body sensations — Limited:
When the body signals discomfort, the default response is to redirect
attention elsewhere, to push through, to occupy the mind with
something else. This is a common pattern, especially when body
experience has historically been associated with pain or overwhelm.
It is not a character trait. It is a learned protective response
that can, with care, be changed (Mehling et al., 2018).

MAIA-2 — Not avoiding body sensations — Developing:
There is some capacity to stay present with body discomfort, though
it is not yet consistent. The capacity to stay with body sensations
develops with practice and with accumulated safety. Being in this
range suggests the foundation is present even if it is not yet
robust (Mehling et al., 2018).

MAIA-2 — Tolerating strong feelings — Limited:
Physical sensations tend to trigger anxiety and worry. When something
is noticed in the body, the mind moves quickly toward concern or
emotional distress. The body becomes a source of threat signals
rather than neutral information. Research shows that this pattern
is closely linked to anxiety and difficulty identifying emotional
states (Desdentado et al., 2022; Mehling et al., 2018).

MAIA-2 — Tolerating strong feelings — Developing:
Body sensations do not consistently trigger anxiety, though they
sometimes do, particularly when discomfort is more intense or stress
is already high. There is some capacity to notice a sensation without
immediately worrying about what it means (Mehling et al., 2018).

MAIA-2 — Seeing yourself clearly — Limited:
Deliberately directing attention to the body is difficult. Attempts
to focus on internal body experience tend to be brief or easily
disrupted. Low scores here are associated with difficulty using
body-based coping strategies and with a tendency to think rather
than sense (Mehling et al., 2018).

MAIA-2 — Seeing yourself clearly — Developing:
Some capacity to direct and sustain attention to the body exists,
though it varies. In quieter moments, attention can be brought to
body experience. In busier or more distressing moments, this becomes
harder to maintain (Mehling et al., 2018).

MAIA-2 — Emotional awareness — Limited:
The connection between body sensations and emotional states is not
well established. Emotions may be understood as concepts, named and
recognised, without being fully experienced as body events. This
is sometimes described as knowing what you feel without feeling it.

Low scores here are associated with difficulty identifying emotions
through bodily signals, which is particularly common in presentations
involving chronic stress or dissociation (Mehling et al., 2018;
Desdentado et al., 2022).

MAIA-2 — Emotional awareness — Developing:
There is some awareness of how emotions manifest in the body, though
this is not yet consistent. At times, emotions can be felt as body
events: a tightening, a heaviness, a lightness. At other times, the
connection is less clear (Mehling et al., 2018).

MAIA-2 — Self-regulation — Limited:
The body is not currently available as a tool for managing distress.
When things become overwhelming, turning attention to the body or
breath does not produce a sense of calm. This does not mean
regulation is impossible. It means this particular route is currently
unavailable.

Low self-regulation is the single most clinically significant finding
in the MAIA-2 for treatment sequencing. Body-based regulatory capacity
is a prerequisite for safely approaching difficult material (Mehling
et al., 2018; Van der Kolk, 2014).

MAIA-2 — Self-regulation — Developing:
Some capacity to use body awareness for self-regulation exists. At
times, attending to the breath or bringing awareness to the body
produces a settling effect. At other times, this is harder to access.
The foundation is there (Mehling et al., 2018).

PCL-5 — Minimal:
Symptoms in this range are minimal or absent. The experience held
in mind is not producing significant ongoing distress across the
four symptom areas. This does not mean the experience was not
significant. It means its current impact on daily functioning is low
(Renyer, 2016).

PCL-5 — Mild:
Some symptoms are present but at a mild level. Certain reminders
may still produce distress. There may be moments of heightened
alertness or some tendency to avoid certain people, places, or
thoughts. These symptoms are real and worth acknowledging, but they
are not at a level that typically indicates a full PTSD presentation
(Renyer, 2016).

PCL-5 — Moderate:
Symptoms are present at a meaningful level. Re-experiencing,
avoidance, mood changes, or heightened alertness are affecting daily
life with some consistency. This level of symptom burden warrants
attention (Renyer, 2016).

The most prominent symptoms in your answers involve changes in how
you feel and think: persistent low mood, a changed sense of yourself,
difficulty experiencing positive feelings, and a sense of distance
from others. These are not fixed conclusions. They are among the most
directly addressable aspects of this pattern with the right support
(Ehlers & Clark, 2000).

PCL-5 — Moderately severe:
Symptoms are significant. The experience held in mind is producing
ongoing distress across multiple dimensions. Re-experiencing,
avoidance, emotional changes, and physical alertness may all be
present with some frequency and intensity.

Scores at or above 33 are used clinically to indicate probable PTSD,
the point at which symptoms are considered clinically significant by
the VA and in published research (Bovin et al., 2016). This level
of symptom burden stands out as one of the strongest patterns in
your results, and trauma-focused support is indicated.

PCL-5 — Severe:
The impact of the experience held in mind is pervasive, affecting
mood, relationships, the ability to feel safe, sleep, concentration,
and the capacity to engage with life. This is a significant load
that requires professional support.

Scores in this range place this pattern in the upper range of clinical
PTSD populations (Bovin et al., 2016). Research shows that PTSD at
this severity level responds well to evidence-based trauma-focused
treatments. High scores are not a ceiling. They are a starting point.

PID-5-SF — Negative emotional reactivity — Elevated:
Negative emotions are a more prominent feature of daily experience
than for most people. There is a tendency to feel things intensely,
to worry, or to find emotional regulation effortful. This stands out
as a meaningful pattern in your results.

Scores above the 84th percentile represent a notably higher level
of emotional reactivity than most people experience (Miller et al.,
2022). Research links this to increased sensitivity to stress and
a lower threshold for emotional activation.

PID-5-SF — Negative emotional reactivity — Clinically significant:
Intense, frequent, and diverse negative emotions are a central
feature of daily life. Emotional experiences feel more powerful and
harder to manage than for most people. This pattern stands out as
one of the strongest signals in your results.

Scores above the 93rd percentile represent clinically significant
elevation in negative affectivity (Miller et al., 2022). This level
is associated with significant difficulty regulating emotional
responses and heightened sensitivity to relational signals.

PID-5-SF — Withdrawing from relationships — Elevated:
There is some protective patterning around closeness. A tendency to
maintain distance, to limit emotional exposure in relationships.
This stands out as a meaningful pattern in your results.

Research links this to withdrawal from social-emotional experiences
and a diminished sense of pleasure from connection (Miller et al.,
2022).

PID-5-SF — Withdrawing from relationships — Clinically significant:
Significant protective patterns are organised around keeping people
at a distance. What can look like preference for solitude often has
deeper roots in experiences that taught the system that closeness
is not safe. This pattern stands out as one of the strongest signals
in your results (Miller et al., 2022).

PID-5-SF — Impulse and self-control — Elevated:
There is a tendency to act on urges without always pausing to
consider outcomes, and a difficulty maintaining sustained focus.
This stands out as a meaningful pattern in your results.

Research links this to difficulty with impulse control and
distractibility (Miller et al., 2022). When emotional intensity
is also elevated, this pattern is often compounded.

PID-5-SF — Impulse and self-control — Clinically significant:
The gap between impulse and action is significantly compressed.
Acting quickly, difficulty following through, and distractibility
are consistent features. This pattern stands out as one of the
strongest signals in your results (Miller et al., 2022).

---

### 2.7 — Transition into addendum

```
[no transition copy within instrument sections]
[responses moved to addendum — no Layer 3 inline]
```

---

## SECTION 3 — Cross-instrument synthesis

**Heading:** What the map seems to show

**Format:**
```
[section rule]
[Cormorant Garamond 30px, Ink]
[AI-generated body — see synthesis specification below]
[pre-written closing block — see below]
```

### Synthesis specification

**This is the one section where the AI does substantive generative work.**

**AI receives (structured JSON payload):**
- All five instrument scores, bands, and percentiles
- All triggered pattern flags from Chat 03 (20 single-instrument flags)
- Dimensional framework output (8 dimensions including FFFR inference)
- MAIA-2 subscale scores and bands
- PID-5-SF domain scores and bands
- PCL-5 write-in text if completed
- Completion time flag if triggered
- A ranked list of the three highest-weight pattern combinations
  present in this profile (calculated by scoring engine)

**AI prompt:**

You are generating the synthesis section of a nervous system map
for a woman who has just completed a psychological screening.

Your task is to identify and describe the two or three most
significant patterns that appear across her results, and explain
how they connect to each other. You are not summarising each section.
You are finding the thread that runs through them.

Write in warm, direct, plain language. Use nervous system framing
throughout: adaptation, protection, survival, load, capacity.
Never use clinical labels, diagnosis language, band names, or
scores. Never say "your PHQ-8 score" or "your results indicate."
Speak directly as "you."

The synthesis should feel like someone who has read everything
she has just read and can now say: here is what connects it.

Structure your response in three parts:

PART 1 (2-3 sentences): Name the dominant pattern. What is the
central thing that appears across her results. Be specific to her
profile. Do not write something that could apply to any person.

PART 2 (3-4 sentences): Name what the nervous system appears to
be doing with that pattern. Use adaptation language. Explain the
logic of the pattern, not its pathology.

PART 3 (2-3 sentences): Name what is not yet visible from a
questionnaire alone. Be specific to what is missing from HER
profile, not generic gaps.

End your output with a bracketed internal note:
[FLAGS USED: list the three pattern flags or score combinations
that most informed this synthesis]

This note will be stripped before rendering and logged to
the therapist briefing.

**AI output guardrails:**
- Maximum 250 words total across three parts
- No em dashes
- No deficit language as the lead
- No clinical labels surfaced directly
- No invented content not grounded in the payload
- If the profile is unusually low across all instruments,
  the synthesis names the relative absence of distress as
  meaningful, not absence of content

**Pre-written closing block (appears after AI synthesis, always):**

```
[warm tinted background #EDE8E2, border-radius 10px, padding 20px 24px]

A questionnaire can show patterns.

It cannot show which experiences mattered most, or which ones are
still the loudest, or what your nervous system most needs in order
to begin to settle.

That is not a limitation of this map. It is simply the difference
between a map and a conversation.

Your Clarity Call is where the map becomes a starting point
rather than an ending point.
```

---

## SECTION 4 — Addendum: Your responses

**Heading:** Your responses
**Subline:** Every question you answered, listed in full across all five sections.

**Format:**
```
[section rule]
[Cormorant Garamond 28px] Your responses
[Inter 13px, #9B978D] Every question you answered...

[for each section:]
  [Cormorant Garamond 20px] [Section name] — [instrument]
  [table]
    [column 1: question text — 66% width, Inter 12px, #4B504A]
    [column 2: response — 34% width, Inter 12px weight 500, Ink]
    [row separator: 1px #F2EDE4]
    [header separator: 1px #CFC4B5]
    [column headers: Inter 10px uppercase #9B978D]
```

Sections appear in order: PSS-10, PHQ-8, MAIA-2, PCL-5, PID-5-SF.
PCL-5 addendum table shows all 20 items.
PID-5-SF addendum table shows all 50 items.
MAIA-2 addendum table shows all 27 items.
PSS-10 addendum table shows all 10 items.
PHQ-8 addendum table shows all 8 items.

---

## SECTION 5 — Footer

**Copy:**

This map was generated by The Bridge Hub screening tool on [DD Month YYYY].

The Bridge Hub uses five validated psychological instruments, the
PSS-10, PHQ-8, MAIA-2, PCL-5, and PID-5-SF, scored against published
population norms. Results are for informational purposes only and do
not constitute a clinical diagnosis.

Your responses are stored securely in accordance with our privacy policy.

The Bridge Hub.

**Format:**
```
[border-top 1px #CFC4B5, padding-top 28px]
[Inter 11px, #9B978D, line-height 1.7]
[footer wordmark: Inter 10px weight 500, letter-spacing 0.22em,
 uppercase, #CFC4B5, margin-top 18px]
```

---

## Conditional logic summary

| Condition | Behaviour |
|---|---|
| PCL-5 write-in completed | Write-in block appears at top of Weight You Carry section |
| PCL-5 write-in blank | Write-in block does not appear |
| MAIA-2 subscale in Strong band | No Layer 2 block for that subscale |
| MAIA-2 subscale in Limited or Developing | Layer 2 block appears |
| PID-5-SF domain in Typical range | No Layer 2 block for that domain |
| PID-5-SF domain Elevated or Significant | Layer 2 block appears |
| Completion time under 15 minutes | Completion quality flag — therapist briefing only, never appears anywhere in user report |
| Safety flag triggered | Therapist briefing only, never user-facing, never stops report |
| All instruments low | Synthesis names relative absence of distress as meaningful |

---

## Chart rendering notes

All chart implementations are fully specified within each instrument's
chart spec above. The PSS-10 arc dot position, PHQ-8 your-result row,
and PCL-5 spectrum layout are locked with exact values.
No additional rendering guidance needed.

---

## Change log

| Version | Change |
|---|---|
| v1 | Initial pseudocode. Full structure, all layers, all conditional logic, all copy blocks, all chart specs, synthesis architecture, NS layer pre-written per band. |
| v2 | NS layer replaced with two-part structure. All Chat 07 references removed. |
| v3 | All four chart implementations locked with exact values. Cover updated to use embedded base64 background image asset. |
| v4 | PID-5-SF routing rules locked. Unusual beliefs and perceptual dysregulation moved to therapist briefing only, never client-facing. Depressivity strongly elevated: softened client signpost only, full clinical picture in therapist briefing. "What this tool cannot tell us" block removed. Band descriptors updated: Meaningfully elevated / Strongly elevated replacing Elevated / Clinically significant in all client-facing labels. |

---

*This document is the complete client report specification.*
*Copy and design are both defined here. This is the build reference.*
*If anything conflicts with the master brief, the master brief wins.*
