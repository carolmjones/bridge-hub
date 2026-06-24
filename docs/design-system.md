# The Bridge Hub — Design System Summary

> Quick reference for builders. Full SVG formulas, component CSS, and chart implementations:
> [specs/cursor-guide/DESIGN_SYSTEM.md](../specs/cursor-guide/DESIGN_SYSTEM.md)
>
> Last updated: June 2026

---

## Brand feeling

A quiet field guide for the nervous system. Not medical. Not spa. Not quiz app. Not therapy worksheet.

Every screen answers one hidden question: **"Am I safe enough to keep going?"**

---

## Colour palette

Add to `tailwind.config.js`:

```js
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
|-------|-----|-------------|
| sage | #999A8A | Primary accent, selected states, chart fills |
| mist | #E6E3D9 | Background panels, cards, empty states |
| stone | #DACEBF | Borders, dividers, warm shadows |
| faded-blue | #989FA5 | Section 4 (PCL-5), PCL chart |
| mauve | #8C6F7B | Section 5 (PID-5-SF), PHQ "your result" row |
| ink | #232824 | Main text, chart dots |
| soft-ink | #4B504A | Body text |
| warm-paper | #F6F0E6 | Main app background |
| cream | #FAF7EF | Card background |
| dark-room | #1F2925 | Breathing overlay background |
| glow-sage | #BEC2A9 | Chart fills, subscale dots |
| line-stone | #CFC4B5 | Borders, hairline rules |

**Background rule:** Never flat white. Main background is Warm Paper with very light paper texture at 8–15% opacity.

> Master brief tokens (`#FAF8F4`, `#2C1A0E`) are superseded by this palette.

---

## Typography

**Google Fonts:**
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@400;500&display=swap');
```

| Role | Font | Use |
|------|------|-----|
| Headings, report titles, Layer 1 italic | Cormorant Garamond | Section names, cover title, synthesis heading |
| Body, buttons, labels, questions | Inter | All UI text, chart labels, disclaimers |

Key sizes: cover title 58–68px Cormorant; section name 38–40px; body 14–15px Inter at 1.7 line height; labels uppercase 10–11px Inter weight 500.

**PDF fonts:** Embed Cormorant Garamond and Inter as base64 TTF. Do not use Google Fonts CDN in PDF renderer.

---

## Logo

```
THE BRIDGE HUB
Inter 11px, weight 500, letter-spacing 0.28em, uppercase
Colour: #6B6B60 (light) or #BEC2A9 (dark)
Arc beneath: 28–36px wide, border-bottom 1px, border-radius 0 0 50% 50%
Centered in all screen headers
```

Use files in `specs/assets/Logo/` — do not recreate in code.

---

## Buttons

| Variant | Background | Text | Height |
|---------|------------|------|--------|
| Primary | #354238 (hover #2D372F) | #F8F4EA | 52–58px |
| Mauve secondary | #8C6F7B (hover #7C606C) | #FFF8F0 | — |
| Ghost | #FAF7EF, border #CFC4B5 | #3D403A | — |
| Selected answer | #1F2925 | #FAF7EF | 48–54px |
| Disabled | #E6E3D9 | #9B978D | — |

Border radius: 14–18px primary; 10–12px answer cards.

---

## Cards and containers

| Element | Key styles |
|---------|------------|
| Phone shell (desktop) | border-radius 28–34px, cream bg, soft shadow |
| Chart card | cream bg, border #DDD4C7, radius 14px, padding 22–24px |
| Layer 2 block | cream bg, left border 3px #CFC4B5 |
| Warm callout | bg #EDE8E2, radius 10–12px |
| Answer card | cream bg, border #DDD4C7; selected → dark-room bg |

---

## Section worlds (transition screens)

Each section has a distinct atmospheric background for S4 transition screens.

| Section | User-facing name | Theme | Palette |
|---------|------------------|-------|---------|
| 1 | The Load | Stone, pressure, dry path | Stone + Sage |
| 2 | The Fog | Mist over hills, pale sun | Mist + Stone + pale Sage |
| 3 | The Body Room | Quiet room, window light | Sage + Cream |
| 4 | The Weight You Carry | Cool lake, cloudy sky | Faded Blue + Mist |
| 5 | The Weather Inside | Soft sky, shifting clouds | Muted Mauve + Mist |

Assets: `specs/assets/backgrounds and elements/ts_section*.png`

Transition hold: 2.5 seconds. Tap to skip.

---

## Progress indicator

Five diamond markers, one per section. Connecting line with two layers:
- Track: full-width, 1px, always visible
- Fill: extends rightward proportional to questions answered in current section

Fill weight increases with progress: `stroke_width = 1 + (answered/total) × 2.5`

Section name centered above. No labels under diamonds. No per-question counter shown to user.

---

## Breathing overlay

- Background: `#1F2925` with soft grain
- Circle: outer thin line glow-sage; inner radial gradient
- Text: Cream, Cormorant 36–44px
- Pattern: 4-4-4 box breath (12 seconds per cycle)
- Button label: **"Take a breath"** — never "breathing exercise"
- Opt-in only. Never auto-plays. Only break mechanism.

---

## Charts — instrument mapping

Build once in `components/charts/`. Reuse in results UI and PDF.

| Chart | Instrument | Component style |
|-------|------------|-----------------|
| Chart 1 | PSS-10 | Arc gauge (semicircle, percentile dot on arc geometry) |
| Chart 2 | PHQ-8 | Population comparison bars (4 rows + "your result" row in mauve) |
| Chart 3 | PCL-5 | Full-width gradient spectrum with dot marker |
| Chart 4 | MAIA-2 | Five subscale rows (track + fill + dot) |
| Chart 5 | PID-5-SF | Three domain columns (Negative Affectivity, Detachment, Disinhibition) |

### MAIA-2 subscale labels (locked)

| Subscale | User-facing label |
|----------|-------------------|
| Not-Distracting | Not avoiding body sensations |
| Not-Worrying | Tolerating strong feelings |
| Attention Regulation | Seeing yourself clearly |
| Emotional Awareness | Emotional awareness |
| Self-Regulation | Self-regulation |

### PID-5-SF domain labels (locked)

| Domain | User-facing label |
|--------|-------------------|
| Negative Affectivity | Negative emotional reactivity |
| Detachment | Withdrawing from relationships |
| Disinhibition | Impulse and self-control |

Full SVG viewBox values, dasharray formulas, and dot position calculations: [DESIGN_SYSTEM.md](../specs/cursor-guide/DESIGN_SYSTEM.md).

Visual reference for assembled report: [specs/chat-05/chat-05-sample-client-report-v5.html](../specs/chat-05/chat-05-sample-client-report-v5.html)

---

## Band pills

Uppercase, 10px Inter weight 500, letter-spacing 0.07em, padding 3px 13px, radius 20px.

| Instrument | Band styling |
|------------|--------------|
| PSS-10 | Low/Moderate/High — mist or stone backgrounds |
| PHQ-8 | mist or stone by severity |
| PCL-5 | All bands: bg #E2E6EA, text #4B606F |
| PID-5-SF | Typical range / Meaningfully elevated / Strongly elevated |

Client-facing labels: see [COPY_REFERENCE.md](../specs/cursor-guide/COPY_REFERENCE.md). Never use "Clinically significant" in client copy.

---

## Layout rules

- Mobile padding: 24px outer, 16–20px inside cards
- Top logo area: 60–80px
- Buttons near bottom, not cramped
- Footer disclaimers: small, soft, centered
- Max content width desktop: 640px centered
- Touch targets: minimum 44px height
- Single column throughout

---

## Interaction timings

| Interaction | Timing |
|-------------|--------|
| Answer tap to advance | 350ms total |
| Screen crossfade | 200ms |
| Section transition hold | 2.5s |
| Breathing overlay slide | 200ms |
| Breathing cycle (4-4-4) | 12s per cycle |
| Accordion open | 250ms ease-out |
| Progress fill grow | proportional to questions answered |

---

## PDF cover page

Background: `background_Serene_lakeside_mist_with_botanical_accents.png` — embed as base64 data URI.

Layout: wordmark → "YOUR / Nervous / System / Map" → metadata table → closing reassurance block.

Verify cover background asset is in `specs/assets/` before PDF build.

---

## Asset paths in repo

| Asset | Path |
|-------|------|
| Logos | `specs/assets/Logo/` |
| Section backgrounds | `specs/assets/backgrounds and elements/` |
| UI design boards | `specs/assets/*.png` |
| Brand style reference | `specs/assets/Brand Assets/` |
| Section worlds detail | `specs/chat-04/chat-04-design-system-v1.md` |

---

Full implementation reference: [specs/cursor-guide/DESIGN_SYSTEM.md](../specs/cursor-guide/DESIGN_SYSTEM.md)

If conflict with `chat-04-design-system-v1.md`, that file wins for section world visual identity. DESIGN_SYSTEM.md wins for Tailwind tokens and chart SVG values.
