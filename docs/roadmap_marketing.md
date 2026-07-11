# Marketing roadmap — website pages

*Last updated: July 2026. Lives in `bridge-hub` repo — see [infra-decision.md](../infra-decision.md).*

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
| `MUX_TOKEN_ID` | Mux API access token ID (Settings → Access Tokens) — marketing deploy |
| `MUX_TOKEN_SECRET` | Mux API access token secret — server-side only; not used by player yet |
| `NEXT_PUBLIC_MUX_PLAYBACK_ID` | Public playback ID for `/free-class` Mux player (from video asset after upload) |
| `KIT_API_KEY` | Kit v4 API key — free class signup (`/api/free-class/subscribe`) |
| `KIT_FREE_CLASS_FORM_ID` | Kit form ID for free class list |

Supabase and other screening API keys live on the **screening** Vercel project only — see [roadmap_screening.md](roadmap_screening.md) Phase 0.

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
| 2 | Bridge Map | `/bridge-map` | Draft for review | Design port complete — hero + synapse canvas + founder, “This is for you”, dark “What happens next”, final CTA background |
| 3 | Free class | `/free-class` | Draft from mockup | **Live** on [bridge-hub-marketing.vercel.app](https://bridge-hub-marketing.vercel.app) — landing + unlocked watch, Mux player, Kit signup; dev reset via `?reset=1` |
| 4 | Results | `/results` | Built | [Screening workstream](roadmap_screening.md) |
| 5 | Clarity Call | `/clarity-call` | Not started | Not started |
| 6 | Booking confirmed | `/booking-confirmed` | Not started | Not started |

### Phase 2 — Site pages

| # | Page | Route | Copy | Dev |
|---|------|-------|------|-----|
| 7 | About | `/about` | Locked in [about.md](../apps/marketing/content/about.md) | **Built** — hero, My Story card, credentials strip, close CTA; nav active underline |
| 8 | Work with Me | `/work-with-me` | Not started | Not started — hub TBD; sub-pages below |
| 8a | The Bridge Programme | `/work-with-me/coaching` | Locked in [coaching.md](../apps/marketing/content/coaching.md) | **Built** — hero, programme structure stepper, manifesto, CTAs |
| 8b | Keynote Speaking | `/work-with-me/speaking` | Locked in [speaking.md](../apps/marketing/content/speaking.md) | **Built** — cinematic hero, story, keynote, topics, testimonials, enquire CTAs |
| 8c | Consulting | `/work-with-me/consulting` | Not started | Not started |
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
- [x] Marketing Vercel project (`bridge-hub-marketing`) — live at `bridge-hub-marketing.vercel.app`

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
- [x] Landing Programme intro (timeline + quote callout) — warm paper quote card
- [x] Landing Testimonials carousel — scenic background behind cards
- [x] Landing Founder section
- [x] Landing Outcome pillars section
- [x] Landing Missing piece + Phase breakdown sections
- [x] Landing Outcomes, FAQ, Final CTA, and Still not sure sections (Final CTA hi-res scenic background)
- [x] Marketing header (announcement + nav), on-brand 404, dev watcher fixes (EMFILE) — mobile menu button pinned right
- [x] Landing page sections from handoff (18 sections)
- [x] Bridge Map from [apps/marketing/content/bridge-map.md](../apps/marketing/content/bridge-map.md) (design port complete; copy still pending sign-off)

- [x] About page from [apps/marketing/content/about.md](../apps/marketing/content/about.md) — hero, floating My Story card, credentials icons, bridge close CTA

### Phase 3 — Core funnel pages

- [x] Free class (`/free-class`)
- [x] About (`/about`)
- [x] The Bridge Programme (`/work-with-me/coaching`)
- [x] Keynote Speaking (`/work-with-me/speaking`)
- [ ] Clarity Call + Discovery Call embeds (speaking enquire CTAs point at `/discovery-call` — page not built yet)
- [ ] Work with Me hub (`/work-with-me`) + Consulting (`/work-with-me/consulting`)

### Phase 4 — Polish + launch

- [x] Marketing production deploy (`bridge-hub-marketing`) — Mux + Kit env on Vercel
- [ ] Custom domain (`thebridgehub.com`) → marketing Vercel project
- [ ] Copy sign-off, a11y, analytics
- [ ] Cookie consent on marketing layout (optional)
- [ ] **Healing Revolution subscribe popup** — sitewide email capture modal (Kit); copy below
- [ ] **PepTalk speaker listing** — once site is finished, pitch [PepTalk](https://getapeptalk.com/) to list Caroline as a keynote speaker (Wellness & Culture / Mental Health / Neurodiversity topics); optional channel to market Work with Me → Keynote Speaking

---

## Sitewide components (planned)

| Component | Copy | Dev |
|-----------|------|-----|
| Healing Revolution popup | **Headline:** Join The Healing Revolution · **Subtext:** Subscribe to receive insights and resources to inspire a collective healing movement. | Not started |

Implementation notes: trauma-informed (easy dismiss, no urgency animation); respect cookie/consent if required; reuse Kit pattern from `/free-class` where possible; show once per session or after scroll threshold — TBD with Caroline.

---

## Distribution (post-launch)

| Channel | Purpose | When |
|---------|---------|------|
| [PepTalk](https://getapeptalk.com/) | List Caroline as a vetted keynote speaker — mental health, neurodiversity, workplace wellbeing, burnout | After marketing site is finished (domain live, Work with Me + keynote copy signed off) |

Notes: PepTalk matches event planners to speakers (15k+ roster, 24h response). Pitch when `/work-with-me/speaking` is live and copy signed off; link back to site or discovery call. No dev work — outreach/listing only.

---

## Next actions

1. **Domain:** Link `thebridgehub.com` → `bridge-hub-marketing` Vercel project; `app.thebridgehub.com` → screening
2. Caroline reviews [apps/marketing/content/bridge-map.md](../apps/marketing/content/bridge-map.md) (sign-off + any final tweaks)
3. Caroline sign-off on [apps/marketing/content/about.md](../apps/marketing/content/about.md) if any final copy tweaks
4. Stabilise marketing dev cache issue (`npm run dev:marketing:clean` when chunks go missing)
5. Build shared marketing components (spotlight card refactor, FAQ extract)
6. Work with Me hub + Consulting page
7. Discovery Call page (speaking enquire CTAs depend on it)
8. **Healing Revolution popup** — subscribe modal with locked copy (headline + subtext above); Kit list + dismiss UX TBD
9. **PepTalk** — when site is finished, pitch [getapeptalk.com](https://getapeptalk.com/) to list Caroline for keynote bookings (Wellness & Culture / mental health / neurodiversity)

*Copy in `apps/marketing/content/` is source of truth. No changes without Caroline's approval.*

---

## Related docs

- [marketing/README.md](marketing/README.md) — marketing doc index
- [roadmap_screening.md](roadmap_screening.md) — assessment, scoring, results, booking (separate workstream)
- [current-status.md](current-status.md) — done vs pending across both workstreams
