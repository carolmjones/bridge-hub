# Handoff: The Bridge Hub — Website (Landing + Bridge Map)

> **Location:** `~/bridge-hub/design/handoff/` — production images are in `~/bridge-hub/public/images/`. Marketing docs: [docs/marketing/README.md](../../docs/marketing/README.md).

## Overview
A two-page marketing/onboarding website for **The Bridge Hub**, a trauma-informed
psychological screening practice for women (28–45), run by **Caroline Jones**.

- **Page 1 — Landing** (`/`): the main marketing page introducing the practice, the
  8-week Bridge Programme, testimonials, founder story, FAQ, and CTAs.
- **Page 2 — The Bridge Map** (`/bridge-map`): a value/intro page for the free
  nervous-system screening, featuring an interactive animated hero.

The original build target (from the product spec) is **Next.js 14 App Router + Tailwind
CSS**. If you prefer a different stack, the designs translate cleanly — they are plain,
typography-led layouts with no exotic dependencies.

> Persistent legal line, appears on every screen: **"This is a screening tool, not a
> clinical diagnosis."** Keep it.

---

## About the Design Files
The files in `design_files/` are **design references created in HTML** — prototypes
showing the intended look and behavior. They are **not** production code to copy
verbatim. Your task is to **recreate these designs in a real codebase** (Next.js +
Tailwind recommended) using its established patterns and component conventions.

Two formats are included for each page:
- `*.html` — **self-contained, runnable** bundles (all assets inlined). Open these in a
  browser to see the finished design and interactions exactly as intended. Best for
  visual reference.
- `*.dc.html` — the **authoring source**. These are more readable for pulling exact copy,
  inline styles, and the hero animation logic (especially the JavaScript). Ignore the
  `<x-dc>`, `<helmet>`, and `support.js` wrappers — those are authoring-tool scaffolding,
  not part of the design. The real content is the markup inside and the
  `class Component extends DCLogic` logic block (treat it as plain JS describing behavior).

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions. Recreate
the UI faithfully. The exact hex values, fonts, and measurements are documented below and
present in the source files.

---

## Tech & structure (recommended)

```
app/
  layout.tsx            # fonts, <html>/<body>, global metadata
  page.tsx              # Landing (Page 1)
  bridge-map/page.tsx   # Bridge Map (Page 2)
  globals.css           # token mapping + base resets
components/
  Nav.tsx               # shared sticky nav + mobile menu (used on both pages)
  Footer.tsx            # shared footer (used on both pages)
  ... section components (see "Screens" below)
public/
  images/               # copy everything from this bundle's assets/ here
```

Routes referenced by links/CTAs (build as pages or stubs):
`/` · `/bridge-map` · `/free-class` · `/discovery-call` · `/about` · `/work-with-me` ·
`/privacy` · `/terms` · `/help` · `#cookies`. Only `/` and `/bridge-map` are designed
here; the rest are link targets (stub them).

---

## Design Tokens

Map these into `tailwind.config` `theme.extend.colors` (and CSS vars if you prefer).

### Colors
| Token | Hex | Use |
| --- | --- | --- |
| ink | `#232824` | primary text, dark sections |
| soft-ink | `#4B504A` | body text |
| cream | `#FAF7EF` | light section background, button text |
| warm-paper | `#F6F0E6` | page background (never pure white) |
| sage | `#999A8A` | muted text, eyebrows, dots |
| glow-sage | `#BEC2A9` | accents, progress, highlights |
| stone | `#DACEBF` | final-CTA band background, soft accents |
| mist | `#E6E3D9` | soft fills |
| line-stone | `#CFC4B5` | 1px hairline dividers / borders |
| dark-room | `#1F2925` | dark section base |
| deep-card | `#16201C` | elevated dark spotlight cards, Bridge Map hero scrim |
| btn-green | `#354238` | primary button fill (hover `#2D372F`) |

Dark-section luminous CTA uses a gradient: `linear-gradient(160deg, #E7EAD7, #BEC2A9)`
with text color `#16201C` / `#1F2925`.

### Typography
- **Serif** (headings, questions, quotes, asides): **Cormorant Garamond**, weight 400,
  frequently italic for asides. Load via `next/font/google`.
- **Sans** (UI, body, labels): **Inter**, weights 400–600.
- Body line-height ~1.7; headings tight (~1.05–1.15).
- **Eyebrows:** Inter, 10px, weight 500, `letter-spacing: 0.14em`, uppercase, sage color.
  (On dark sections the eyebrow is often a pill: rounded-full, 1px sage-alpha border,
  faint fill, with a small glowing dot.)

Heading sizes are responsive via `clamp()` — see source. Typical: H1 `clamp(40px,6vw,60px)`,
section H2 `clamp(28px,8vw,40px)`.

### Spacing & layout
- Content max-width **680px** for text sections; 24px side gutters.
- Section vertical padding **72–80px** (hero/CTA up to 96–104px).
- 1px `#CFC4B5` top-border divides most sections.
- Single-column, generous whitespace. Mobile-first.

### Radius / borders / shadows
- Cards: 14–18px radius; large spotlight cards 22–30px. Pills fully rounded.
- Borders: 1px `#CFC4B5` (light) or `rgba(190,194,169,0.2)` (on dark).
- Shadows: soft, warm, low-opacity for lift; bigger ambient shadows under spotlight cards
  (e.g. `0 40px 80px -44px rgba(35,40,36,0.45)`). No harsh/inner shadows.

### Motion
- Calm, slow. Ease-out `cubic-bezier(0.22,0.61,0.36,1)`. No bounce/spring.
- Entrance: gentle fade-up (`@keyframes` translateY 18px→0, opacity 0→1), staggered.
  **Note:** in production prefer the elements rendering visible by default and animating
  in (avoid leaving them at `opacity:0` if JS/animation fails).
- Buttons: lift `translateY(-2px)` + deepen shadow on hover.
- Respect `prefers-reduced-motion`.

---

## Screens / Sections

### Shared — Nav
Sticky top, `#FAF7EF`, 1px bottom border `#CFC4B5`, 64px tall, full-width, flex
space-between, 24px padding. Left: logo (`assets/logo.png`, 22px tall). Center
(`md+` only): links Home `/`, About `/about`, The Bridge Map `/bridge-map`, Work with Me
`/work-with-me` — Inter 13px, `#4B504A`, hover `#232824`. Right: primary button "Watch the
free class" → `/free-class` (on Bridge Map page this is "Discover my profile" → `#start`).
Mobile (`≤760px`): hide center links + desktop CTA, show hamburger (`≡`) opening a
full-screen `#FAF7EF` overlay with the same links in serif 28px.

### Shared — Footer
`#232824` background, 48px/24px/36px padding, inner max-width 680px. Top row (flex,
space-between, wraps): left logo wordmark "THE BRIDGE HUB" + "Caroline Jones" subline;
right column of links (Privacy Policy `/privacy`, Terms of Use `/terms`, Cookie Settings
`#cookies`, "Get help now ↗" `/help` in `#BEC2A9`). Hairline divider, then centered fine
print: "This is a screening tool, not a clinical diagnosis. © 2026 The Bridge Hub. All
rights reserved."

---

### PAGE 1 — Landing (`/`)
Section order (top → bottom). **All copy is locked — pull exact strings from
`design_files/Bridge Hub Landing.dc.html`.**

1. **AnnouncementBar** — `#232824` bar, centered. Two-line message (free class) + "Watch
   free →" link in `#BEC2A9`. Toggleable (a `showAnnouncement` flag).
2. **Nav** (shared).
3. **Hero** — split layout: left text column (eyebrow pill "An 8 week framework" *— see
   note*, H1 "Life Beyond Survival Mode", subhead, primary CTA + secondary text link),
   right is a floating rounded image card (`assets/desktop_landing-page-background-*.png`)
   with a soft sage glow halo, a cream left-edge fade overlay, and a floating leaf accent
   (`assets/leaf.png`). Staggered fade-up entrance. Stacks on mobile.
4. **TransformationVision** — centered serif italic quote, 500px max. Leaf accents in
   corners.
5. **DailyReality** — eyebrow + H2, then a checklist of 6 pain-point items (sage dot +
   text, hairline dividers) beside a small portrait image (`160×240`, hidden on mobile).
6. **BridgeMapCTA** ⭐ — *spotlight card* on dark `#1F2925`/`#16201C`: two slow-drifting
   aurora glow blobs (`@keyframes` translate/scale, ~16–19s), a masked dot-grid, a glowing
   pill eyebrow, glass panel containing 3 numbered steps with **pulsing gradient circular
   badges**, and a luminous sage CTA. Disclaimer line beneath.
7. **Reassurance** — centered avatar (circle), H2 "You are not alone.", two lines.
8. **ProgrammeIntro** ⭐ — *interactive vertical timeline*: a connector line with glowing
   gradient number nodes (ringed in cream), 5 step **cards that slide right + lift with
   shadow + sage border on hover**, then a serif pull-quote block ("No guesswork…") and an
   arrow CTA.
9. **Testimonials** ⭐ — *interactive carousel*: one featured quote card (large serif
   quote mark, glow halo) that **crossfades** between 4 testimonials; **clickable avatar
   tabs** (initial + name, active fills dark green); **prev/next round buttons** (hover
   fill); **auto-advances ~6.5s, pauses on hover**. See "Interactions."
10. **Founder** — italic eyebrow, H2 "Hey, I am Caroline.", full-width portrait
    (`assets/founder.png`, 340px), 4 paragraphs (last one weight-500 emphasis).
11. **OutcomePillars** — eyebrow + intro, 3 stacked cards (Understand / Personalise /
    Build), each a glyph + serif title + bulleted list. CTA pair.
12. **MissingPiece** — dark `#232824`, centered serif italic statement with one phrase
    rendered non-italic/bold cream.
13. **PhaseBreakdown** — eyebrow + H2, 4 phases (label eyebrow + serif title + 3 bullets),
    hairline dividers, italic guide note.
14. **Outcomes** — eyebrow + H2, 9-item checklist (✓ + text, hairline dividers), CTA.
15. **FAQ** — eyebrow + H2 + subhead, accordion of 6 items. **One open at a time**,
    chevron rotates 180° on open, answer expands.
16. **FinalCTA** ⭐ — elevated *dark spotlight card* (`#16201C` gradient, aurora glows,
    dot-grid) floating on a `#DACEBF` stone band, with leaf accents peeking at the edges.
    Glowing pill, H2, italic sub, glass detail chip, luminous sage CTA + secondary link.
17. **StillNotSure** — centered H2 + body + ghost button "Book a free Discovery Call" →
    `/discovery-call`.
18. **Footer** (shared).

⭐ = richer "premium" treatments — keep the spotlight-card / glass / aurora / timeline /
carousel language consistent if you extend the site.

> **Open copy question:** the hero eyebrow pill text **"An 8 week framework"** was added
> on top of the locked spec (derived from the subhead) and is **not yet confirmed** by the
> client. Flag it; remove if they object.

---

### PAGE 2 — The Bridge Map (`/bridge-map`)
Pull exact copy from `design_files/Bridge Map.dc.html`. Sections: Nav → **Hero
(interactive)** → CredibilityStrip → WhatYouGet (2 cards) → EmotionalAnchor (dark) →
ThisIsForYou → WhyNothingHasShifted → WhatMakesItDifferent (4 cards) → AboutCaroline
(portrait + bio) → WhatHappensNext (timeline) → Footer. These reuse the same tokens and
card patterns as Page 1.

#### Bridge Map Hero — the interactive piece (most important to get right)
Full-bleed dark hero. Layers, bottom → top:
1. **Background image** `assets/hero-nervous-system.png` (a dark nervous-system figure,
   positioned right), `center / cover`, with a left→right charcoal scrim gradient
   `linear-gradient(90deg, rgba(18,26,22,0.78) 0%, …0.45 40%, …0.05 66%, transparent)` so
   the left-side text stays legible.
2. **`<canvas>` synapse layer** — absolutely positioned, full-size,
   `pointer-events:none`, z-index between image and text. This draws ~230 neon "synapse"
   dots that trace the figure's anatomy and **glow near the cursor**.
3. **Text column** (z-index above canvas): glowing pill eyebrow "Free — takes 15 minutes",
   H1 "Which nervous system profile are you?" (cream), supporting paragraph, luminous sage
   CTA "Discover my profile — free" → `#start`, disclaimer line.

**Synapse canvas behavior (recreate this in a small client component / `useEffect` +
`requestAnimationFrame`):**
- Dot positions are **baked, normalized coordinates** `[x, y, colorIdx, radius]` sampled
  from the nervous-system art so density follows the anatomy (dense at brain + spine,
  thinning along branches, sparse in the open left field). The full array (`PTS`, ~230
  entries) and palette are in `Bridge Map.dc.html` inside `_initSynapse()` — **copy the
  array verbatim.** Palette by index: `0` mint `[176,255,193]`, `1` teal `[120,255,214]`,
  `2` lavender `[198,160,255]`, `3` sage `[150,168,140]`.
- Map each normalized point through the **same center/cover transform** the background
  image uses (source art is `IMG_W=3353 × IMG_H=1437`): `scl = max(W/IMG_W, H/IMG_H)`,
  centered — so dots stay locked to the figure at any container size. Recompute on resize
  (ResizeObserver).
- Connect each node to its ~2 nearest neighbors (only if close) for **faint dormant
  lines** that do **not** glow.
- Each frame: for each node compute activation `a` from cursor distance — within radius
  `R≈190px`, `target = (1 - dist/R)²`, else 0 — and ease `a` toward target slowly
  (`a += (target - a) * 0.06`). Dots rest very faint (`alpha ≈ 0.06` + a slow breathing
  shimmer `sin(t*sp+ph)`); near the cursor they bloom to neon (`alpha → ~0.95`, larger
  radius, canvas `shadowBlur` glow in the node color). Glow fades smoothly as the cursor
  leaves (driven by the same easing) and on `mouseleave` of the hero.
- Honor `prefers-reduced-motion`: snap activation (no easing), no breathing shimmer.
- The effect must stay **subtle and slow** — it's ambient, not flashy. Lines stay
  dormant; only dots light up.

---

## Interactions & Behavior (summary)
- **Mobile nav:** hamburger toggles a full-screen overlay; links close it on click.
- **FAQ accordion:** single-open; track an `openIndex` (−1 = none); chevron rotates 180°;
  answer height/opacity transitions ~250ms ease-out.
- **Testimonials carousel:** `activeIndex` state; crossfade slides (active is
  relative/opacity 1, others absolute/opacity 0, ~0.6s transition); avatar tabs set index;
  prev/next wrap with modulo; `setInterval` auto-advance ~6500ms, **paused while hovering**
  the card (`onMouseEnter`/`Leave`).
- **Announcement bar:** `showAnnouncement` boolean (can be a config/CMS flag).
- **Hero entrances:** staggered fade-up. In production, render visible and animate in.
- **Bridge Map hero:** synapse canvas animation above.

## State Management
Local component state only — no global store needed.
- FAQ: `openIndex: number`.
- Testimonials: `activeIndex: number` + autoplay interval ref + `paused` flag.
- Nav: `menuOpen: boolean`.
- Announcement: `showAnnouncement: boolean` (or config).
- Bridge Map hero: refs for canvas + animation frame; mouse position; node array.
No data fetching in the designed pages (testimonials/copy are static; swap to CMS later if
desired — note: testimonial names are placeholders pending real client quotes).

## Assets
All in this bundle's `assets/` → copy to `public/images/` (or your asset pipeline):
- `logo.png` — Bridge Hub wordmark (nav). Trimmed, transparent.
- `hero-nervous-system.png` — Bridge Map hero background (dark figure). **Also the source
  the synapse dot coordinates were sampled from.**
- `desktop_landing-page-background-*.png` (in project root, not assets/) — landing hero
  photo. *(If missing from the bundle, request from the design owner; the landing hero
  expects a warm portrait/landscape image.)*
- `leaf.png` — watercolor leaf accent (botanical corners).
- `founder.png`, `hero.png`, `side.png` — warm-horizon artwork (founder banner / accents).
- Portrait placeholders (founder, reassurance avatar, About Caroline) currently use
  textures/photos — **swap in real Caroline photography when available.**

Fonts: Cormorant Garamond + Inter from Google Fonts (use `next/font`). No icon font is
required; the few glyphs used (◎ ◈ ◇ ✓ ⌄ →) are unicode — replace with Lucide icons if you
standardize on an icon set.

## Files in this bundle
- `design_files/Bridge Hub Landing.html` — runnable landing prototype (open in browser).
- `design_files/Bridge Map.html` — runnable Bridge Map prototype (open in browser).
- `design_files/Bridge Hub Landing.dc.html` — landing source (exact copy + styles).
- `design_files/Bridge Map.dc.html` — Bridge Map source incl. the synapse `PTS` array +
  `_initSynapse()` logic.
- `assets/` — image assets.

If you want me to also include rendered screenshots of each page/section in this package,
say so and I'll add them.
