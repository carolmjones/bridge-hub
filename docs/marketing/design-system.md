# Design system — The Bridge Hub marketing site

*Last updated: June 2026. Prototypes in `design/handoff/`. Locked — do not deviate without Caroline's approval.*

Visual + motion spec for marketing pages. For page order and build status, see [roadmap_marketing.md](../roadmap_marketing.md). Start at [README.md](README.md).

---

## Brand feeling

A quiet field guide for the nervous system. Warm, calm, typography-led.

**Not:** medical, spa, quiz app, therapy worksheet, generic SaaS dark mode.

Every screen should feel safe enough to keep going — calm motion, generous whitespace, readable type. Trauma-informed: no urgency animations, no alarming palette.

---

## Two visual worlds (do not merge)

| Layer | Typography | Palette | Where |
|-------|------------|---------|-------|
| **Marketing pages** | Cormorant Garamond + Inter | Cream/sage warm-paper tokens (this doc) | Landing, Bridge Map, About, etc. |
| **Screening flow** | Newsreader + Hanken Grotesk | Bound design system | `/assessment` and beyond — `~/bridge-hub` only |

The marketing aesthetic is deliberately separate from the in-app screening UI. Do not import screening tokens into marketing pages.

---

## Recommended stack

```
Next.js 14 App Router
  + Tailwind CSS (locked marketing tokens)
  + Framer Motion (marketing interactions)
  + shadcn/Radix (accessible primitives: accordion, dialog, nav sheet)
  + Canvas (Bridge Map synapse hero only)
```

### Framer Motion vs 21st.dev

The design handoff defines bespoke interactions tuned to this brand. **Framer Motion is the production motion layer** — use it for fade-up staggers, hover lift, carousel crossfade, accordion height.

21st.dev / Magic MCP is **inspiration only** — e.g. borrow a carousel pattern, then re-skin with sage/cream tokens and slower timing. Do not import generic components wholesale; they clash with the trauma-informed aesthetic.

### Motion rules (non-negotiable)

- Slow, ease-out — `cubic-bezier(0.22, 0.61, 0.36, 1)`. **No bounce/spring.**
- Subtle amplitude — glow and lift, not parallax overload
- Honor `prefers-reduced-motion` everywhere
- No urgency animations (no pulsing CTAs, no countdown ticks)
- Content readable if JS fails — render visible by default, animate in (never leave permanent `opacity: 0`)

---

## Design tokens

Map into `tailwind.config` `theme.extend.colors` and CSS variables.

### Colors

| Token | Hex | Use |
| --- | --- | --- |
| ink | `#232824` | Primary text, dark sections |
| soft-ink | `#4B504A` | Body text |
| cream | `#FAF7EF` | Light section background, button text |
| warm-paper | `#F6F0E6` | Page background (never pure white) |
| sage | `#999A8A` | Muted text, eyebrows, dots |
| glow-sage | `#BEC2A9` | Accents, progress, highlights |
| stone | `#DACEBF` | Final-CTA band background, soft accents |
| mist | `#E6E3D9` | Soft fills |
| line-stone | `#CFC4B5` | 1px hairline dividers / borders |
| dark-room | `#1F2925` | Dark section base |
| deep-card | `#16201C` | Elevated dark spotlight cards, hero scrim |
| btn-green | `#354238` | Primary button fill (hover `#2D372F`) |

Dark-section luminous CTA: `linear-gradient(160deg, #E7EAD7, #BEC2A9)` with text `#16201C` / `#1F2925`.

### Typography

- **Serif** (headings, questions, quotes, asides): **Cormorant Garamond**, weight 400, often italic. Load via `next/font/google`.
- **Sans** (UI, body, labels): **Inter**, weights 400–600.
- Body line-height ~1.7; headings tight (~1.05–1.15).
- **Eyebrows:** Inter, 10px, weight 500, `letter-spacing: 0.14em`, uppercase, sage. On dark sections: pill with rounded-full, 1px sage-alpha border, faint fill, small glowing dot.

Heading sizes via `clamp()` — typical H1 `clamp(40px, 6vw, 60px)`, section H2 `clamp(28px, 8vw, 40px)`.

### Spacing and layout

- Content max-width **680px** for text sections; 24px side gutters.
- Section vertical padding **72–80px** (hero/CTA up to 96–104px).
- 1px `#CFC4B5` top-border between most sections.
- Single-column, generous whitespace. **Mobile first.**

### Radius, borders, shadows

- Cards: 14–18px radius; spotlight cards 22–30px. Pills fully rounded.
- Borders: 1px `#CFC4B5` (light) or `rgba(190,194,169, 0.2)` (on dark).
- Shadows: soft, warm, low-opacity; ambient under spotlight cards (e.g. `0 40px 80px -44px rgba(35,40,36,0.45)`). No harsh inner shadows.

### Motion

- Entrance: gentle fade-up (translateY 18px→0, opacity 0→1), staggered via Framer `staggerChildren`.
- Buttons: lift `translateY(-2px)` + deepen shadow on hover.
- Aurora blobs: slow loop ~16–19s (CSS `@keyframes` or Framer `motion.div`).
- Respect `prefers-reduced-motion`.

---

## Interactive patterns

Premium treatments used across the site. Implement with Framer Motion unless noted.

| Pattern | Where used | Implementation |
|---------|------------|----------------|
| Spotlight card + aurora glows | BridgeMapCTA, FinalCTA | Dark `#1F2925`/`#16201C` base; two slow-drifting aurora blobs; masked dot-grid |
| Glass panel + pulsing badges | BridgeMapCTA | Semi-transparent bg; 3 numbered steps with gradient circular badges |
| Vertical timeline + hover-lift cards | ProgrammeIntro, WhatHappensNext | Connector line + gradient nodes; Framer `whileHover` for slide-right + lift + sage border |
| Testimonials carousel | Landing | Framer `AnimatePresence` crossfade; avatar tabs; prev/next; autoplay ~6.5s, pause on hover |
| FAQ accordion | Landing, Bridge Map | shadcn/Radix Accordion or Framer height; one open at a time; chevron rotates 180° |
| Staggered fade-up entrances | Hero, sections | Framer stagger — elements visible by default |
| Synapse canvas hero | Bridge Map | Canvas + `requestAnimationFrame` — **not Framer** (see below) |
| Button hover lift | All CTAs | Framer or CSS `translateY(-2px)` + shadow deepen |
| Credibility strip | Bridge Map | Horizontal flex desktop; 2×2 grid mobile |

⭐ = premium sections — keep spotlight / glass / aurora / timeline / carousel language consistent when extending the site.

---

## Shared components

### Nav

Sticky top, `#FAF7EF`, 1px bottom border `#CFC4B5`, 64px tall, 24px padding.

- **Left:** logo (`logo.png`, 22px tall)
- **Center** (`md+`): Home `/` · About `/about` · The Bridge Map `/bridge-map` · Work with Me `/work-with-me` — Inter 13px, `#4B504A`, hover `#232824`
- **Right (Landing only):** "Watch the free class" → `/free-class`
- **Right (Bridge Map):** **No CTA button** — per approved copy
- **Mobile** (`≤760px`): hamburger → full-screen `#FAF7EF` overlay, serif 28px links

### Footer

`#232824` background. Wordmark "THE BRIDGE HUB" + "Caroline Jones". Links: Privacy `/privacy`, Terms `/terms`, Cookie Settings `#cookies`, Get help now ↗ `/help`. Fine print: *This is a screening tool, not a clinical diagnosis.* © 2026 The Bridge Hub.

---

## Page 1 — Landing (`/`)

Section order (top → bottom). **Copy locked** — pull exact strings from design prototype.

1. AnnouncementBar — toggleable free-class bar
2. Nav (shared)
3. Hero — split layout, staggered fade-up
4. TransformationVision — centered serif italic quote
5. DailyReality — checklist + portrait
6. **BridgeMapCTA** ⭐ — spotlight card
7. Reassurance — avatar + H2
8. **ProgrammeIntro** ⭐ — interactive timeline
9. **Testimonials** ⭐ — carousel
10. Founder — portrait + bio
11. OutcomePillars — 3 stacked cards
12. MissingPiece — dark centered statement
13. PhaseBreakdown — 4 phases
14. Outcomes — 9-item checklist
15. FAQ — accordion (6 items)
16. **FinalCTA** ⭐ — dark spotlight on stone band
17. StillNotSure — Discovery Call ghost CTA
18. Footer (shared)

> **Open question:** Hero eyebrow "An 8 week framework" — not yet confirmed by Caroline. Remove if she objects.

---

## Page 2 — Bridge Map (`/bridge-map`)

Copy: [content/bridge-map.md](../../content/bridge-map.md). Sections:

Nav → **Hero (interactive)** → CredibilityStrip → WhatYouGet (2 cards) → EmotionalAnchor (`#1F2925`) → ThisIsForYou → WhyNothingHasShifted → WhatMakesItDifferent (4 cards) → AboutCaroline → WhatHappensNext (timeline) → FAQ → FinalCTA → Footer

### Bridge Map hero — synapse canvas

Full-bleed dark hero. Layers (bottom → top):

1. **Background** `hero-nervous-system.png`, `center/cover`, left→right charcoal scrim gradient
2. **Canvas** synapse layer — ~230 neon dots tracing anatomy, glow near cursor
3. **Text column** — pill eyebrow, H1, paragraph, luminous sage CTA → `SCREENING_START` (`/begin`), trust line + disclaimer

**Synapse behavior** (client component, `useEffect` + `requestAnimationFrame`):

- Copy `PTS` array (~230 normalized `[x, y, colorIdx, radius]`) verbatim from `Bridge Map.dc.html` `_initSynapse()`
- Palette: `0` mint, `1` teal, `2` lavender, `3` sage
- Map points through same center/cover transform as background (`IMG_W=3353`, `IMG_H=1437`); ResizeObserver on resize
- Faint dormant lines between ~2 nearest neighbors — lines do not glow
- Cursor activation within `R≈190px`: `target = (1 - dist/R)²`, ease `a += (target - a) * 0.06`
- Dots rest faint + slow breathing shimmer; bloom to neon near cursor
- `prefers-reduced-motion`: snap activation, no shimmer
- **Subtle and slow** — ambient, not flashy

---

## State management

Local component state only — no global store.

| Component | State |
|-----------|-------|
| FAQ | `openIndex: number` (−1 = none) |
| Testimonials | `activeIndex`, autoplay interval, `paused` on hover |
| Nav | `menuOpen: boolean` |
| Announcement | `showAnnouncement: boolean` |
| Synapse hero | canvas ref, animation frame, mouse position |

No data fetching on designed pages — static copy; CMS later if needed.

---

## App structure (recommended)

```
app/
  layout.tsx              # fonts, metadata
  page.tsx                # Landing
  bridge-map/page.tsx     # Bridge Map
  globals.css             # token mapping
components/
  Nav.tsx, Footer.tsx
  marketing/              # Eyebrow, SectionHeading, SpotlightCard, etc.
  bridge-map/SynapseHero.tsx
public/
  images/                 # assets from design handoff
```

Stub routes for links not yet designed: `/free-class`, `/discovery-call`, `/about`, `/work-with-me`, `/privacy`, `/terms`, `/help`.

---

## Assets

Production images live in `public/images/`:

| File | Use |
|------|-----|
| `logo.png` | Nav wordmark |
| `hero-nervous-system.png` | Bridge Map hero + synapse coordinate source |
| `leaf.png` | Botanical corner accents |
| `founder.png`, `hero.png`, `side.png` | Founder / accent artwork |
| `desktop_landing-page-background-*.png` | Landing hero photo |
| `hero-glow.png` | Optional glow accent |

**Swap placeholder portraits for real Caroline photography when available.**

Fonts: Cormorant Garamond + Inter via `next/font`. Unicode glyphs (◎ ◈ ✓) or Lucide icons.

---

## Design prototypes (visual QA only)

Not production code — recreate in Next.js.

| File | Purpose |
|------|---------|
| `design/handoff/design_files/Bridge Hub Landing.html` | Runnable landing |
| `design/handoff/design_files/Bridge Map.html` | Runnable Bridge Map |
| `design/handoff/design_files/*.dc.html` | Source for exact copy, styles, synapse `PTS` array |

Ignore `<x-dc>`, `<helmet>`, `support.js` wrappers in `.dc.html` files.

---

## Build checklist (modern + warm)

- [x] Locked color palette
- [x] Typography pairing
- [x] Section rhythm and premium interaction vocabulary
- [x] Bridge Map synapse hero spec
- [x] Copy assets → `public/images/`
- [x] Shared Nav + Footer (scaffold)
- [ ] Framer Motion + motion utilities
- [ ] Reusable primitives (Eyebrow, SectionHeading, SpotlightCard, CredibilityStrip)
- [ ] Real Caroline photography
- [ ] Bridge Map copy sync per [content/bridge-map.md](../../content/bridge-map.md)

---

## Related docs

- [README.md](README.md) — marketing doc index
- [roadmap_marketing.md](../roadmap_marketing.md) — pages, copy status, build phases
- [../integration-boundaries.md](../integration-boundaries.md) — what may touch what
- [../../specs/cursor-guide/DESIGN_SYSTEM.md](../../specs/cursor-guide/DESIGN_SYSTEM.md) — screening app only
