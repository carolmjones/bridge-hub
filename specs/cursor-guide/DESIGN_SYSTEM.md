# The Bridge Hub — Design System
## Complete Visual Reference for Cursor Build

> All design decisions are locked. Do not deviate without explicit approval.
> This file is the single source of truth for all UI implementation.
> Last updated: June 2026

---

## Brand feeling

A quiet field guide for the nervous system. Not medical. Not spa.
Not quiz app. Not therapy worksheet.

Every screen answers one hidden question in the user's body:
"Am I safe enough to keep going?"

---

## Colour palette — Tailwind config

```js
// tailwind.config.js
colors: {
  sage:       '#999A8A',
  mist:       '#E6E3D9',
  stone:      '#DACEBF',
  'faded-blue': '#989FA5',
  mauve:      '#8C6F7B',
  ink:        '#232824',
  'soft-ink': '#4B504A',
  'warm-paper': '#F6F0E6',
  cream:      '#FAF7EF',
  'dark-room': '#1F2925',
  'glow-sage': '#BEC2A9',
  'line-stone': '#CFC4B5',
}
```

| Token | Hex | Primary use |
|---|---|---|
| sage | #999A8A | Primary accent, selected states, chart fills |
| mist | #E6E3D9 | Background panels, cards, empty states |
| stone | #DACEBF | Borders, dividers, warm shadows |
| faded-blue | #989FA5 | Section 4, PCL-5 chart |
| mauve | #8C6F7B | Section 5, PHQ-8 your-result row, PID-5-SF |
| ink | #232824 | Main text, chart dots |
| soft-ink | #4B504A | Body text |
| warm-paper | #F6F0E6 | Main app background |
| cream | #FAF7EF | Card background |
| dark-room | #1F2925 | Breathing overlay background |
| glow-sage | #BEC2A9 | Chart fills, subscale dots |
| line-stone | #CFC4B5 | Borders, hairline rules, section dividers |

Additional chart colours (not in palette, used in charts only):
- #D6D4C8 — population bar fills (PHQ-8 none/minimal)
- #EDE8E2 — warm tinted background blocks
- #E2E6EA — PCL-5 band pill background
- #4B606F — PCL-5 band pill text

---

## Typography

### Google Fonts import
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@400;500&display=swap');
```

### Font roles (locked)
- **Cormorant Garamond** — headings, section names, report titles,
  Layer 1 italic narrative, cover title, synthesis heading
- **Inter** — body copy, buttons, labels, questions, disclaimers,
  chart labels, all UI text

### Type scale

| Use | Font | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|
| Cover title | Cormorant | 58-68px | 400 | 0.92 | -0.01em |
| Section name | Cormorant | 38-40px | 400 | 0.98 | 0 |
| Report heading | Cormorant | 34px | 400 | 1.1 | 0 |
| Synthesis heading | Cormorant | 30px | 400 | 1.15 | 0 |
| Layer 1 italic | Cormorant | 18-19px | 400 italic | 1.65 | 0 |
| Body | Inter | 14-15px | 400 | 1.7-1.72 | 0 |
| Small body | Inter | 13px | 400 | 1.65 | 0 |
| Labels uppercase | Inter | 10-11px | 500 | 1.4 | 0.1-0.14em |
| Source notes | Inter | 10px | 400 | 1.5 | 0 |
| Logo wordmark | Inter | 11px | 500 | — | 0.22-0.28em |

---

## Logo

Text: THE BRIDGE HUB
Font: Inter, 11px, weight 500, letter-spacing 0.28em, uppercase
Colour: #6B6B60 (on light) or #BEC2A9 (on dark)
Arc beneath: width 28-36px, height 6-7px, border-bottom 1px,
border-radius 0 0 50% 50%, same colour as wordmark
Centered in all screen headers

---

## Buttons

### Primary (dark fill)
```css
background: #354238;
hover: #2D372F;
text: #F8F4EA;
border-radius: 14-18px;
height: 52-58px;
font: Inter 15-16px weight 500;
```

### Mauve (secondary)
```css
background: #8C6F7B;
hover: #7C606C;
text: #FFF8F0;
```

### Soft neutral (ghost)
```css
background: #FAF7EF;
border: 1px solid #CFC4B5;
text: #3D403A;
border-radius: 12-14px;
```

### Selected answer card
```css
background: #1F2925;
text: #FAF7EF;
/* checkmark icon right side in cream */
```

### Disabled
```css
background: #E6E3D9;
text: #9B978D;
border: 1px solid #D8CFC1;
```

---

## Cards and containers

### Phone card frame (outer app shell on desktop)
```css
border-radius: 28-34px;
border: 1px solid #D8CFC1;
background: #FAF7EF;
box-shadow: 0px 12px 40px rgba(70, 60, 45, 0.10);
```

### Chart card (instrument result card)
```css
background: #FAF7EF;
border: 1px solid #DDD4C7;
border-radius: 14px;
padding: 22px 24px;
```

### Layer 2 interpretation block
```css
background: #FAF7EF;
border-left: 3px solid #CFC4B5;
border-radius: 0 10px 10px 0;
padding: 16px 18px 16px 22px;
```

### Warm tinted block (callouts, write-in, before-you-read)
```css
background: #EDE8E2;
border-radius: 10-12px;
padding: 14-20px 18-24px;
```

### Answer cards (assessment)
```css
background: #FAF7EF;
border: 1px solid #DDD4C7;
border-radius: 10-12px;
height: 48-54px;
padding: 12-16px;
/* Selected state: */
background: #1F2925;
color: #FAF7EF;
```

---

## Forms

```css
input background: #FAF7EF;
border: 1px solid #CFC4B5;
border-radius: 10-12px;
height: 48-54px;
placeholder color: #9D968C;
focus border: #999A8A;
focus glow: rgba(153, 154, 138, 0.18);
label: uppercase, Inter 10-12px weight 500, letter-spacing 0.12em;
```

---

## Section worlds (transition screen backgrounds)

Each section has a distinct atmospheric background for transition screens.

| Section | Theme | Palette |
|---|---|---|
| 1 — The Load | Stone, pressure, dry path, low hills | Stone + Sage |
| 2 — The Fog | Mist over hills, pale sun, soft lake | Mist + Stone + pale Sage |
| 3 — The Body Room | Quiet room, window light, stillness | Sage + Cream + warm light |
| 4 — The Weight You Carry | Cool lake, cloudy sky, water reflection | Faded Blue + Mist + Stone |
| 5 — The Weather Inside | Soft sky, shifting clouds, warm light | Muted Mauve + soft peach + Mist |

Transition screen image assets: ts-section-[1-5].png
These are pre-generated and stored as assets. Do not recreate.

---

## Progress indicator (assessment shell)

Five diamond markers across the top. One per section. Single connecting line.

```
State:    upcoming        active          complete
Style:    outline 0.75px  outline 1px     solid fill
Fill:     —               matches line    same as line colour
```

Connecting line — two layers:
- Track: full-width, 1px, tertiary colour, always visible
- Fill: sits on top, extends rightward as user progresses

Fill position:
```
x = active_diamond_x + (next_diamond_x - active_diamond_x)
    × (questions_answered / total_questions_in_section)
```

Fill weight:
```
stroke_width = 1 + (questions_answered / total_questions_in_section) × 2.5
```

Section name shown above indicator, centered. No labels under diamonds.
No per-question counter shown to user.

---

## Breathing overlay

```css
background: #1F2925 with soft grain + subtle vignette;
```

Breathing circle:
- Outer: thin line #BEC2A9 low opacity
- Inner: radial gradient #CAD0B6 to #6F796C
- Glow: soft sage behind circle

Text: Cream, Cormorant Garamond 36-44px
Instruction: Inter 15px 85% opacity

Pattern: 4-4-4 box breath (Breathe in / Hold / Breathe out)
Text fades in sync with each stage.

Button label in UI: "Take a breath" — never "breathing exercise"
Close button: circle outline top right, 32-40px

---

## Five chart implementations — exact values locked

### Chart 1 — PSS-10 Arc Gauge

```jsx
// SVG viewBox: 0 0 160 100
// Arc center: cx=80, cy=88. Radius: 62. Stroke-width: 16.

// Background arc
<path
  d="M 18 88 A 62 62 0 0 1 142 88"
  fill="none"
  stroke="#E6E3D9"
  stroke-width="16"
  stroke-linecap="round"
/>

// Fill arc — dasharray and dashoffset calculated from percentile
// dasharray = π × 62 = 194.78 (full semicircle)
// dashoffset = 194.78 × (1 - percentile/100)
// Example 88th percentile: dashoffset = 194.78 × 0.12 = 23.37
<path
  d="M 18 88 A 62 62 0 0 1 142 88"
  fill="none"
  stroke="#999A8A"
  stroke-width="16"
  stroke-linecap="round"
  stroke-dasharray={194.78}
  stroke-dashoffset={194.78 * (1 - percentile / 100)}
/>

// Dot marker — MUST be calculated from arc geometry, not hardcoded
// angle_rad = (1 - percentile/100) × Math.PI
// dot_cx = 80 + 62 × Math.cos(angle_rad)
// dot_cy = 88 - 62 × Math.sin(angle_rad)
// Example 88th percentile: dot_cx=138, dot_cy=65
<circle
  cx={80 + 62 * Math.cos((1 - percentile/100) * Math.PI)}
  cy={88 - 62 * Math.sin((1 - percentile/100) * Math.PI)}
  r="8"
  fill="#232824"
  stroke="#FAF7EF"
  stroke-width="2.5"
/>

// Percentile number
<text x="80" y="74" text-anchor="middle"
  font-family="Cormorant Garamond, Georgia, serif"
  font-size="28" fill="#232824">
  {percentile}
</text>

// Label
<text x="80" y="87" text-anchor="middle"
  font-family="Inter, sans-serif"
  font-size="9" fill="#9B978D" letter-spacing="1.5">
  PERCENTILE
</text>
```

Layout: arc SVG left (160×100), right col flex:
- Contextual sentence: "Higher than [X]% of adults in the general population"
- Band pill
- Source note

---

### Chart 2 — PHQ-8 Population Comparison Bars

Layout: left col (percentile + context + pill), right col (bars)

```
Left col:
  Percentile number: Cormorant Garamond 44px
  Contextual sentence: "Higher than [X]% of adults"
  Band pill

Right col — four rows:
  None / minimal  | track 76% fill #D6D4C8 | "76%"
  Mild            | track 18% fill #BEC2A9 | "18%"
  Moderate        | track  5% fill #999A8A | "5%"
  Your result     | track [percentile]% fill #8C6F7B | "[X]th"
                  | row background: rgba(140,111,123,0.07)
                  | label color: #8C6F7B weight 500
                  | pct color: #8C6F7B weight 500

Track: height 12px, border-radius 3px, background #E6E3D9
Your result track background: #F0E8EC
```

---

### Chart 3 — PCL-5 Gradient Spectrum

Layout: STACKED — number + context + pill above, full-width SVG below

```jsx
// Top block
<div>
  <span style="font-family: Cormorant Garamond; font-size: 48px">
    {percentile}<sup style="font-size:18px; color:#9B978D">th</sup>
  </span>
  <p>Your responses show more impact from difficult experiences
     than {percentile}% of adults</p>
  <span className="band-pill">...</span>
</div>

// SVG spectrum — full container width
// viewBox: 0 0 400 32
// Track: rect x=0 y=10 width=400 height=10 rx=5
// Gradient: #D6D4C8 → #BEC2A9 → #999A8A → #989FA5
// Dot: cx = percentile/100 × 400, cy=15, r=9
// Example 84th percentile: cx=336, cy=15

<svg width="100%" viewBox="0 0 400 32">
  <defs>
    <linearGradient id="specGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#D6D4C8"/>
      <stop offset="33%"  stop-color="#BEC2A9"/>
      <stop offset="66%"  stop-color="#999A8A"/>
      <stop offset="100%" stop-color="#989FA5"/>
    </linearGradient>
  </defs>
  <rect x="0" y="10" width="400" height="10" rx="5"
    fill="url(#specGrad)"/>
  <circle
    cx={percentile / 100 * 400}
    cy="15" r="9"
    fill="#232824" stroke="#FAF7EF" stroke-width="2.5"/>
</svg>

// Axis labels below SVG
// 0th | 25th | 50th | 75th | 100th
// Zone labels: Minimal (left) | Moderate to Severe (right)
```

---

### Chart 4 — MAIA-2 Subscale Rows

Five rows. One per subscale. Single colour throughout.

```
Subscale labels (user-facing — locked):
  Not-Distracting:      "Not avoiding body sensations"
  Not-Worrying:         "Tolerating strong feelings"
  Attention Regulation: "Seeing yourself clearly"
  Emotional Awareness:  "Emotional awareness"
  Self-Regulation:      "Self-regulation"

Per row:
  Name: Inter 12px #4B504A, width 200px fixed
  Track: flex:1, height 9px, border-radius 5px, background #E6E3D9
  Fill: background #BEC2A9, width = percentile%
  Dot: width 17px, height 17px, border-radius 50%,
       background #999A8A, border 2px solid #FAF7EF,
       position absolute, top -4px,
       left = percentile%, transform translateX(-50%)
  Percentile: Inter 11px weight 500, Ink, 34px width, right-aligned
```

---

### Chart 5 — PID-5-SF Domain Columns

Three vertical columns. One per domain.

```
Domain labels (user-facing — locked):
  Negative Affectivity: "Negative emotional reactivity"
  Detachment:           "Withdrawing from relationships"
  Disinhibition:        "Impulse and self-control"

Domain colours:
  Negative emotional reactivity: #8C6F7B
  Withdrawing from relationships: #D6D4C8
  Impulse and self-control:       #989FA5

Column group: height 120px, align-items flex-end
Per column:
  Percentile number above: Inter 11px weight 500 #4B504A
  Bar: width 100%, height = percentile%, border-radius 3px 3px 0 0
  Label below: Inter 10px #9B978D, text-align center

Legend (right of columns):
  Per domain:
    Colour dot 9px border-radius 2px
    Domain name Inter 12px #4B504A
    Band descriptor below (Inter 11px):
      Below 84th:  "Typical range"    color #9B978D
      84th-93rd:   "Elevated"         color #989FA5 or domain colour
      Above 93rd:  "Strongly elevated" color #8C6F7B or domain colour
```

---

## Band pill styles

```
PSS-10:
  Low:      background #E6E3D9, text #4B504A
  Moderate: background #DACEBF, text #4B504A
  High:     background #DACEBF, text #4B504A

PHQ-8:
  None/minimal: background #E6E3D9, text #4B504A
  Mild:         background #E6E3D9, text #4B504A
  Moderate:     background #DACEBF, text #4B504A
  Mod-severe:   background #DACEBF, text #4B504A
  Severe:       background #DACEBF, text #4B504A

PCL-5:
  All bands: background #E2E6EA, text #4B606F

All pills:
  font-size: 10px
  font-weight: 500
  letter-spacing: 0.07em
  text-transform: uppercase
  padding: 3px 13px
  border-radius: 20px
  display: inline-block
```

---

## Layout rules

```
Mobile padding: 24px outer, 16-20px inside cards
Top logo area: 60-80px
Buttons: near bottom, not cramped
Footer disclaimers: small, soft, centered
Max content width desktop: 640px centered
Touch targets: minimum 44px height
Single column throughout — desktop is adaptation of mobile
```

---

## Background and texture

Never flat white. Main background: Warm Paper #F6F0E6.
Add very light paper texture at 8-15% opacity — almost invisible,
just stops the screen feeling digital.

---

## Section dividers

```css
border: none;
border-top: 1px solid #CFC4B5;
margin: 40-48px 0;
```

---

## Interaction timings (from Chat 04 interaction spec)

| Interaction | Timing |
|---|---|
| Answer tap to advance | 350ms total |
| Screen crossfade | 200ms |
| Section transition hold | 2.5 seconds |
| Breathing overlay slide | 200ms |
| Breathing cycle (4-4-4) | 12 seconds per cycle |
| Chevron rotate (accordion) | 200ms |
| Accordion open height | 250ms ease-out |
| Accordion content fade in | 200ms, 50ms delay |
| Accordion close opacity | 150ms then height 200ms |
| Progress fill grow | proportional to questions answered |

---

## Cover page (report PDF)

Background image: background_Serene_lakeside_mist_with_botanical_accents.png
Must be embedded as base64 data URI in the PDF/HTML.
Do not use external file path — it will not render in PDF generation.

```
Encode: base64 -w 0 [image_file] then embed as:
src="data:image/png;base64,[data]"
```

Cover layout (top to bottom):
- Wordmark centered: THE BRIDGE HUB, arc beneath
- Title area: YOUR / Nervous / System / Map (Cormorant 58px)
- Horizontal rule 40px
- Subtitle: "A personalised map of what your body and mind have been carrying."
- [landscape fills middle — from background image]
- Metadata table: Prepared for / Date / Report type
- Closing block: "There is no rush. Take your time with this.
  You are safe to go at your own pace."

---

*If anything conflicts with chat-04-design-system-v1.md, that file wins.*
*This file is the Cursor implementation reference only.*
