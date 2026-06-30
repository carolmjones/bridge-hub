# Marketing roadmap — website pages

*Last updated: June 2026. Lives in `bridge-hub` repo — see [infra-decision.md](../infra-decision.md).*

**Start at [marketing/README.md](marketing/README.md).** Visual spec: [marketing/design-system.md](marketing/design-system.md). Screening roadmap: [roadmap_screening.md](roadmap_screening.md).

---

## Overview

Warm, typography-led marketing site for women 28–45. Funnel:

```
Instagram / Podcast / Email  →  Marketing pages (this workstream)  →  /begin  →  Screening  →  Results  →  Clarity Call
```

13 marketing pages (landing, Bridge Map, About, booking embeds, etc.). Results UI and GDPR legal pages are owned by the [screening workstream](roadmap_screening.md).

---

## Environment

Marketing and screening share **one git repo** — **two Vercel projects**. No separate env file per app; use `.env.bridgehub` locally.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_MARKETING_URL` | This deploy's URL (`http://localhost:3000` locally) |
| `NEXT_PUBLIC_SCREENING_URL` | Screening app URL (`http://localhost:3001` locally) — used for CTAs |

Optional later: `NEXT_PUBLIC_CAL_EMBED_URL`, `KIT_API_KEY` for `/free-class`. Supabase and API keys live on the **screening** Vercel project only — see [roadmap_screening.md](roadmap_screening.md) Phase 0.

See [vercel-setup.md](../vercel-setup.md) for step-by-step Vercel configuration.

---

## Locked sitewide decisions

- **Primary CTA:** Watch the free class
- **Secondary CTA:** Discover my profile — free → `SCREENING_START` (screening deploy `/begin`)
- **No "Book your Clarity Call"** on landing or Bridge Map (results screen only)
- **Nav:** Home · About · The Bridge Map · Work with Me
- **Disclaimer everywhere:** *This is a screening tool, not a clinical diagnosis.*
- **All copy locked** after Caroline approval

---

## 13 pages — status

### Phase 1 — Core funnel

| # | Page | Route | Copy | Dev |
|---|------|-------|------|-----|
| 1 | Landing | `/` | Nearly done | Design port complete — polish + copy sign-off (hero door-glow + section backgrounds in place) |
| 2 | Bridge Map | `/bridge-map` | Draft for review | Scaffold done — design port next |
| 3 | Free class | `/free-class` | Not started | Not started |
| 4 | Results | `/results` | Built | [Screening workstream](roadmap_screening.md) |
| 5 | Clarity Call | `/clarity-call` | Not started | Not started |
| 6 | Booking confirmed | `/booking-confirmed` | Not started | Not started |

### Phase 2 — Site pages

| # | Page | Route | Copy | Dev |
|---|------|-------|------|-----|
| 7 | About | `/about` | Not started | Not started |
| 8 | Work with Me | `/work-with-me` | Not started | Not started |
| 9–11 | Privacy / Terms / Cookies | `/privacy`, etc. | GDPR chat | Screening has `/privacy`; marketing legal TBD — see [roadmap_screening.md](roadmap_screening.md) Phase 8 |

### Phase 3 — Supporting

| # | Page | Route |
|---|------|-------|
| 12 | Discovery Call | `/discovery-call` |
| 13 | 404 | `/404` | — | On-brand `not-found.tsx` done |

---

## Build phases (marketing)

### Phase 0 — Done

- [x] Merged into `bridge-hub` (no separate repo/Vercel)
- [x] Docs, integration boundaries, Cursor rules (marketing + screening path-scoped)
- [x] Assets in `public/images/`; HTML prototypes in `design/handoff/`
- [x] `framer-motion` + `lucide-react` installed
- [x] `deep-card` token in `tailwind.config.ts`
- [x] Shared env: `.env.bridgehub` + `.env.example` (same as screening)

### Phase 1 — Scaffold — Done

- [x] `apps/marketing/` — separate Next.js app (`npm run dev:marketing` → `:3000`)
- [x] `apps/marketing/lib/marketing/routes.ts` — `SCREENING_START` → screening deploy `/begin`
- [x] Placeholder landing (`/`) and Bridge Map (`/bridge-map`) in `apps/marketing`
- [x] Screening at repo root — `npm run dev:screening` → `:3001`
- [x] `npm run build` passes; `npm run smoke:test` 19/19

### Phase 2 — Design port + shared components (current)

- [x] Framer Motion utilities (`apps/marketing/lib/marketing/motion.ts`)
- [ ] Reusable section components (spotlight card, FAQ, carousel, synapse hero)
- [x] Landing hero + announcement bar + transformation vision (desktop door-glow on archway)
- [x] Landing Daily Reality section
- [x] Landing Bridge Map CTA spotlight + Reassurance sections
- [x] Landing Programme intro (timeline + quote callout) — glassy quote card
- [x] Landing Testimonials carousel — scenic background behind cards
- [x] Landing Founder section
- [x] Landing Outcome pillars section
- [x] Landing Missing piece + Phase breakdown sections
- [x] Landing Outcomes, FAQ, Final CTA, and Still not sure sections (Final CTA has photo background)
- [x] Marketing header (announcement + nav), on-brand 404, dev watcher fixes (EMFILE) — mobile menu button pinned right
- [x] Landing page sections from handoff (18 sections)
- [ ] Bridge Map from [apps/marketing/content/bridge-map.md](../apps/marketing/content/bridge-map.md)

### Phase 3 — Core funnel pages

- [ ] Free class (`/free-class`)
- [ ] Clarity Call + Discovery Call embeds
- [ ] About, Work with Me

### Phase 4 — Polish + launch

- [ ] Copy sign-off, a11y, analytics, domain DNS
- [ ] Cookie consent on marketing layout (optional)

---

## Next actions

1. Caroline reviews [apps/marketing/content/bridge-map.md](../apps/marketing/content/bridge-map.md)
2. Port Bridge Map page from prototype + locked copy
3. Build shared marketing components (spotlight card refactor, FAQ extract)

*Copy in `apps/marketing/content/` is source of truth. No changes without Caroline's approval.*

---

## Related docs

- [marketing/README.md](marketing/README.md) — marketing doc index
- [roadmap_screening.md](roadmap_screening.md) — assessment, scoring, results, booking (separate workstream)
- [current-status.md](current-status.md) — done vs pending across both workstreams
