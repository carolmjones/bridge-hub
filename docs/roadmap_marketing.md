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
| `KIT_SPEAKING_ENQUIRY_FORM_ID` | Kit form ID for the speaking enquiry list (same `KIT_API_KEY`, separate form) |
| `RESEND_API_KEY` | Resend API key — **marketing project's own key**, separate from screening's magic-link Resend usage |
| `RESEND_FROM_EMAIL` | Optional sender override (defaults to `The Bridge Hub <onboarding@resend.dev>`) |
| `SPEAKING_ENQUIRY_NOTIFY_EMAIL` | Inbox that receives instant speaking enquiry notifications |
| `NEXT_PUBLIC_CAL_DISCOVERY_EMBED_URL` | Cal.com embed for the 15 min Discovery Call (`/discovery-call`) — distinct from screening's Clarity Call embed |

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
| 8b-i | Speaking enquiry | `/work-with-me/speaking/enquire` | Locked in [speaking-enquiry.md](../apps/marketing/content/speaking-enquiry.md) | **Built** — Kit form (name, phone optional, organisation, event type, date, message); notifies Caroline instantly via Resend, adds subscriber to Kit for nurture |
| 8c | Consulting | `/work-with-me/consulting` | Not started | Not started |
| 9–11 | Privacy / Terms / Cookies | `/privacy`, etc. | GDPR chat | Screening has `/privacy`; marketing legal TBD — see [roadmap_screening.md](roadmap_screening.md) Phase 8 |

### Phase 3 — Supporting

| # | Page | Route | Dev |
|---|------|-------|-----|
| 12 | Discovery Call | `/discovery-call` | **Built** — Cal.com iframe only (no phone/session capture, unlike screening `/book`); client funnel entry point from landing "Still not sure?" |
| 13 | 404 | `/404` | On-brand `not-found.tsx` done |

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
- [x] Speaking enquiry (`/work-with-me/speaking/enquire`) — Kit form + Resend notification; see "Booking split" below
- [x] Discovery Call (`/discovery-call`) — Cal.com iframe, client funnel only
- [ ] Clarity Call embed (separate from Discovery Call — 45 min, post–Bridge Map)
- [ ] Work with Me hub (`/work-with-me`) + Consulting (`/work-with-me/consulting`)

#### Booking split — two different tools for two audiences

Cal.com optimises for *scheduling a time*; organiser enquiries are async (event details, then Caroline follows up), so they use different tools:

| Flow | Audience | Tool | Entry point |
|------|----------|------|--------------|
| Discovery Call | Individual clients | Cal.com (15 min embed) | Landing "Still not sure?" → `/discovery-call` |
| Speaking enquiry | Event organisers | Kit form + instant Resend email to Caroline | Speaking page CTAs → `/work-with-me/speaking/enquire` |

Kit's own "new subscriber" notification is batched hourly and has no message content, so `/api/speaking/enquire` sends Caroline a direct Resend email with the full enquiry (organisation, event type, message, etc.) in real time, and separately adds the subscriber to Kit for future nurture. Cal.com webhook handling stays on the **screening** deploy only — see [integration-boundaries.md](integration-boundaries.md).

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
7. Clarity Call page (45 min, post–Bridge Map — separate from Discovery Call)
8. **Healing Revolution popup** — subscribe modal with locked copy (headline + subtext above); Kit list + dismiss UX TBD
9. **PepTalk** — when site is finished, pitch [getapeptalk.com](https://getapeptalk.com/) to list Caroline for keynote bookings (Wellness & Culture / mental health / neurodiversity)

### Caroline setup checklist (speaking enquiry + Discovery Call)

1. Create Kit form **"Speaking enquiry"** + custom fields: `phone_number`, `company`, `event_type`, `event_date`, `message` (slugs must match exactly or Kit silently drops them)
2. Decide the inbox for `SPEAKING_ENQUIRY_NOTIFY_EMAIL`
3. Confirm Resend sending domain/from-address for marketing (or a new API key scoped to the marketing Vercel project)
4. Create a Cal.com **Discovery Call** event (15 min) — separate from the Clarity Call event
5. Add env vars to the **marketing** Vercel project: `KIT_SPEAKING_ENQUIRY_FORM_ID`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (optional), `SPEAKING_ENQUIRY_NOTIFY_EMAIL`, `NEXT_PUBLIC_CAL_DISCOVERY_EMBED_URL`

*Copy in `apps/marketing/content/` is source of truth. No changes without Caroline's approval.*

---

## Related docs

- [marketing/README.md](marketing/README.md) — marketing doc index
- [roadmap_screening.md](roadmap_screening.md) — assessment, scoring, results, booking (separate workstream)
- [current-status.md](current-status.md) — done vs pending across both workstreams
