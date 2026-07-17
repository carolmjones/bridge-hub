# Marketing roadmap — website pages

*Last updated: 18 July 2026. Lives in `bridge-hub` repo — see [infra-decision.md](../infra-decision.md).*

**Start at [marketing/README.md](marketing/README.md).** Visual spec: [marketing/design-system.md](marketing/design-system.md). Screening roadmap: [roadmap_screening.md](roadmap_screening.md).

---

## Overview

Warm, typography-led marketing site for women 28–45. Funnel:

```
Instagram / Podcast / Email  →  Marketing pages (this workstream)  →  /begin  →  Screening  →  Results  →  Clarity Call
```

13 marketing pages (landing, Bridge Map, About, booking embeds, etc.) plus `/urgent-support`. Results UI and GDPR legal pages are owned by the [screening workstream](roadmap_screening.md).

**Production:** `https://www.carolinejones.co` (apex → www). **Copy:** signed off (July 2026).

**SEO + AI discoverability:** Phase 4b + Phase 4c Phases 0–2 complete in code. Remaining: Search Console / Bing submit, optional LinkedIn `sameAs`, Phase 3 content wave (awaiting approval), PepTalk outreach.

---

## Environment

Marketing and screening share **one git repo** — **two Vercel projects**. No separate env file per app; use `.env.bridgehub` locally.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_MARKETING_URL` | This deploy's URL — production `https://www.carolinejones.co`; local `http://localhost:3000` |
| `NEXT_PUBLIC_SCREENING_URL` | Screening app URL (`http://localhost:3001` locally) — used for CTAs |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Optional GA4 — consent-gated via cookie banner |
| `MUX_TOKEN_ID` | Mux API access token ID (Settings → Access Tokens) — marketing deploy |
| `MUX_TOKEN_SECRET` | Mux API access token secret — server-side only; not used by player yet |
| `NEXT_PUBLIC_MUX_PLAYBACK_ID` | Public playback ID for `/free-class` Mux player (from video asset after upload) |
| `KIT_API_KEY` | Kit v4 API key — free class signup (`/api/free-class/subscribe`) |
| `KIT_FREE_CLASS_FORM_ID` | Kit form ID for free class list (also used by landing "Still not sure?" newsletter signup) |
| `KIT_STILL_NOT_SURE_TAG_ID` | Kit tag ID for `still-not-sure` — landing "Still not sure?" newsletter (same list as free class) |
| `KIT_HEALING_REVOLUTION_TAG_ID` | Kit tag ID for `healing-revolution` — sitewide popup newsletter (same list, distinct from still-not-sure) |
| `KIT_SPEAKING_ENQUIRY_FORM_ID` | Kit form ID for the speaking enquiry list (same `KIT_API_KEY`, separate form) |
| `RESEND_API_KEY` | Resend API key — **marketing project's own key**, separate from screening's magic-link Resend usage |
| `RESEND_FROM_EMAIL` | Optional sender override (defaults to `The Bridge Hub <onboarding@resend.dev>`) |
| `SPEAKING_ENQUIRY_NOTIFY_EMAIL` | Inbox that receives instant speaking enquiry notifications |
| `NEXT_PUBLIC_CAL_DISCOVERY_EMBED_URL` | Cal.com embed for parked `/discovery-call` page (no sitewide links; retained for possible reuse) |

Supabase and other screening API keys live on the **screening** Vercel project only — see [roadmap_screening.md](roadmap_screening.md) Phase 0.

See [vercel-setup.md](../vercel-setup.md) for step-by-step Vercel configuration.

---

## Locked sitewide decisions

- **Primary CTA:** Watch the free class
- **Secondary CTA:** Discover my profile — free → `SCREENING_START` (screening deploy `/begin`)
- **No "Book your Clarity Call"** on landing or Bridge Map (results screen only)
- **Nav:** Home · About · The Bridge Map · Work with Me (dropdown → Coaching · Speaking · General enquiry — no `/work-with-me` hub page)
- **Disclaimer everywhere:** *This is a screening tool, not a clinical diagnosis.*
- **All copy locked** after Caroline approval

---

## Pages — status

### Phase 1 — Core funnel

| # | Page | Route | Copy | Dev |
|---|------|-------|------|-----|
| 1 | Landing | `/` | **Signed off** | **Live** on [www.carolinejones.co](https://www.carolinejones.co) — hero door-glow + section backgrounds |
| 2 | Bridge Map | `/bridge-map` | **Signed off** | **Live** — hero + synapse canvas + founder, “This is for you”, dark “What happens next”, final CTA |
| 3 | Free class | `/free-class` | **Signed off** | **Live** — landing + unlocked watch, Mux player, Kit signup; dev reset via `?reset=1` |
| 4 | Results | `/results` | Built | [Screening workstream](roadmap_screening.md) |
| 5 | Clarity Call | `/clarity-call` | Not started | Not started |
| 6 | Booking confirmed | `/booking-confirmed` | Not started | Not started |

### Phase 2 — Site pages

| # | Page | Route | Copy | Dev |
|---|------|-------|------|-----|
| 7 | About | `/about` | Locked in [about.md](../apps/marketing/content/about.md) | **Built** — hero, My Story card, **My Why** section, credentials strip + cream prose card (DOI link), close CTA |
| 8a | The Bridge Programme | `/work-with-me/coaching` | Locked in [coaching.md](../apps/marketing/content/coaching.md) | **Built** — hero, bridge-backed programme structure (liquid-glass panel + mobile stepper), split qualifier card, manifesto, flower-backed First Step CTA |
| 8b | Keynote Speaking | `/work-with-me/speaking` | Locked in [speaking.md](../apps/marketing/content/speaking.md) | **Built** — cinematic hero, story, **Formats & Audiences**, **Signature Topics** (10 cards), testimonials, **For Organisers** close card; announcement bar hidden on this route |
| 8b-i | Speaking enquiry | `/work-with-me/speaking/enquire` | Locked in [speaking-enquiry.md](../apps/marketing/content/speaking-enquiry.md) | **Built** — Kit form (name, phone optional, organisation, event type, date, message); notifies Caroline instantly via Resend, adds subscriber to Kit for nurture |
| 9–11 | Privacy / Terms / Cookies | `/privacy`, `/terms` | Caroline-approved privacy (10/05/2026) + terms (10/06/2026) | **Built** — full policies; cookie banner + preferences modal; GA4 + Vercel Analytics gated on analytics consent; screening `/privacy` for assessment data |

### Phase 3 — Supporting

| # | Page | Route | Dev |
|---|------|-------|-----|
| 12 | Discovery Call | `/discovery-call` | **Parked** — Cal.com iframe built; `noindex`; no sitewide links (page retained for possible reuse) |
| 13 | Urgent support | `/urgent-support` | **Built** — crisis resources (Ireland, UK, international); `noindex` for SEO |
| 14 | 404 | `/404` | On-brand `not-found.tsx` done |

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

### Phase 2 — Design port + shared components

- [x] Framer Motion utilities (`apps/marketing/lib/marketing/motion.ts`)
- [x] Reusable spotlight components — `AuroraGlows`, `SpotlightSection`, `SpotlightCard` (landing Bridge Map CTA + Final CTA); carousel and synapse hero left as-is; heroes untouched
- [x] FAQ data extracted to `lib/marketing/faq.ts` (shared by landing accordion + FAQPage JSON-LD)
- [x] Landing hero + announcement bar + transformation vision (desktop door-glow on archway)
- [x] Landing Daily Reality section
- [x] Landing Bridge Map CTA spotlight + Reassurance sections
- [x] Landing Programme intro (timeline + quote callout) — warm paper quote card
- [x] Landing Testimonials carousel — scenic background behind cards
- [x] Landing Founder section
- [x] Landing Outcome pillars section
- [x] Landing Missing piece + Phase breakdown sections
- [x] Landing Outcomes, FAQ, Final CTA, and Still not sure sections (Still not sure = Kit newsletter signup with `still-not-sure` tag; Final CTA hi-res scenic background)
- [x] Marketing header (announcement + nav), on-brand 404, dev watcher fixes (EMFILE) — mobile menu button pinned right
- [x] Landing page sections from handoff (18 sections)
- [x] Bridge Map from [apps/marketing/content/bridge-map.md](../apps/marketing/content/bridge-map.md) (design port complete; copy signed off)

- [x] About page from [apps/marketing/content/about.md](../apps/marketing/content/about.md) — hero, floating My Story card, My Why section, credentials icons + cream prose card, bridge close CTA

### Phase 3 — Core funnel pages

- [x] Free class (`/free-class`)
- [x] About (`/about`)
- [x] The Bridge Programme (`/work-with-me/coaching`)
- [x] Keynote Speaking (`/work-with-me/speaking`)
- [x] Speaking enquiry (`/work-with-me/speaking/enquire`) — Kit form + Resend notification; see "Booking split" below
- [x] Discovery Call (`/discovery-call`) — parked; Cal.com iframe retained, unlinked from live site
- [x] Still not sure newsletter (`/api/still-not-sure/subscribe`) — same Kit list as free class, tagged `still-not-sure`
- [ ] Clarity Call embed (separate from Discovery Call — 45 min, post–Bridge Map)
- [x] ~~Work with Me hub (`/work-with-me`)~~ — **Removed from scope**; nav dropdown links directly to coaching and speaking sub-pages

#### Entry points — newsletter vs speaking enquiry

| Flow | Audience | Tool | Entry point |
|------|----------|------|--------------|
| Still not sure newsletter | Individual clients (not ready to start) | Kit form + `still-not-sure` tag (same list as free class) | Landing "Still not sure?" section |
| Speaking enquiry | Event organisers | Kit form + instant Resend email to Caroline | Speaking page CTAs → `/work-with-me/speaking/enquire` |

**Parked:** `/discovery-call` (Cal.com 15 min embed) — built but unlinked; `noindex`. Retained in codebase for possible reuse.

Kit's own "new subscriber" notification is batched hourly and has no message content, so `/api/speaking/enquire` sends Caroline a direct Resend email with the full enquiry (organisation, event type, message, etc.) in real time, and separately adds the subscriber to Kit for future nurture. Cal.com webhook handling stays on the **screening** deploy only — see [integration-boundaries.md](integration-boundaries.md).

**Kit tagging:** Free class, Still not sure, and Healing Revolution popup all use the same Kit list (`KIT_FREE_CLASS_FORM_ID`) with different tags (`still-not-sure`, `healing-revolution`) so Caroline can see which entry point each subscriber came from.

### Phase 4 — Polish + launch

- [x] Marketing production deploy (`bridge-hub-marketing`) — Mux + Kit env on Vercel
- [x] Custom domain — **live** at `https://www.carolinejones.co` (apex → www); `NEXT_PUBLIC_MARKETING_URL` set on marketing + screening
- [x] Copy sign-off — all marketing page copy approved (July 2026)
- [x] Analytics — cookie consent; GA4 (`Ga4WithConsent`) + Vercel Analytics (`VercelAnalyticsWithConsent`); enable Web Analytics in Vercel dashboard; optional `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- [x] Favicon — bridge logo in `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`
- [x] **SEO + AI discoverability** (dev) — see Phase 4b; Caroline Search Console / Bing still open
- [x] **SEO & conversion audit (Phase 4c)** — Phases 0–2 complete; Phase 3 content proposals await approval — see below
- [x] Cookie consent on marketing layout — bottom banner + customise modal; footer legal line; site links in two columns
- [x] **Healing Revolution subscribe popup** — sitewide Kit modal; tag `healing-revolution`
- [ ] **PepTalk speaker listing** — pitch [PepTalk](https://getapeptalk.com/) (Wellness & Culture / Mental Health / Neurodiversity); link Work with Me → Keynote Speaking

#### Phase 4b — SEO + AI discoverability

**Dev status:** Complete (July 2026). Domain cutover done. Caroline: Search Console, Bing, optional LinkedIn `sameAs`.

**Policy:** Full allow — maximise discoverability; allow AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) for both citation and training.

**Canonical:** `NEXT_PUBLIC_MARKETING_URL=https://www.carolinejones.co` on both Vercel projects.

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| `metadataBase` + sitewide OG/Twitter defaults | P0 | Done | `apps/marketing/lib/marketing/seo.ts` + `app/layout.tsx` |
| Per-page `metadata` for all routes | P0 | Done | `/`, `/bridge-map`; `noindex` on `/urgent-support` |
| `app/sitemap.ts` + `app/robots.ts` | P0 | Done | Marketing routes only; `/api/` disallowed |
| Default OG image (`/og-default.png`, 1200×630) + favicon | P0 | Done | `public/og-default.png`; `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` |
| JSON-LD `@graph` (sitewide) | P1 | Done | `WebSite` + `ProfessionalService` + `Person` in layout |
| Per-page JSON-LD | P1 | Done | `FAQPage` on landing; `Service` on coaching/speaking; `Person` on About |
| `/llms.txt` | P1 | Done | Curated agent index of canonical marketing pages |
| `/llms-full.txt` | P2 | Done | Concatenated locked markdown from `apps/marketing/content/` |
| `/ai.txt` | P1 | Done | Full-allow training + citation policy |
| Domain + `NEXT_PUBLIC_MARKETING_URL` | P0 | Done | `www.carolinejones.co` primary |
| Search Console + Bing Webmaster | P1 | Caroline | Verify www; submit `https://www.carolinejones.co/sitemap.xml` |
| IndexNow (optional) | P3 | — | Bing/Yandex instant ping on deploy |
| `/.well-known/security.txt` | P3 | — | `security@` contact — production hygiene |

**Production audit:**

```bash
HOST="https://www.carolinejones.co"
for path in /robots.txt /sitemap.xml /llms.txt /llms-full.txt /ai.txt /og-default.png /favicon.ico; do
  curl -s -o /dev/null -w "%{http_code}  $path\n" "$HOST$path"
done
# or: SMOKE_MARKETING_URL=$HOST npm run smoke:marketing
```

Manual checks:
- Share a URL in iMessage/LinkedIn — OG preview renders
- [Google Rich Results Test](https://search.google.com/test/rich-results) — no JSON-LD errors
- Google Search Console — sitemap accepted, no coverage errors

#### Domain connection — `carolinejones.co`

**Status:** Done. Primary production URL is **`https://www.carolinejones.co`**; apex redirects to www.

**Screening** (when ready): add `app.carolinejones.co` to the screening Vercel project; set `NEXT_PUBLIC_SCREENING_URL` and `NEXT_PUBLIC_APP_URL` to `https://app.carolinejones.co` on both projects. Until then, screening can stay on its existing `*.vercel.app` URL.

#### Phase 4c — SEO & conversion audit

**Source:** Full task list with exact files and copy — [marketing/bridge-hub-implementation-roadmap.md](marketing/bridge-hub-implementation-roadmap.md).

**Context:** Phase 4b built technical SEO (sitemap, robots, llms, JSON-LD module). Phase 4c implements the **July 2026 audit** — credential consistency, page titles/H1s, conversion copy, content wave, and analytics. The audit found inconsistencies still in code (e.g. "therapist" vs training-status wording in 10+ files).

**How to work:** Top to bottom within each phase. ⚠️ = Caroline decision before code ships. 🔧 = implement after the gate is cleared. **One Phase 1 section per session** — review diff, validate, check the box.

**Current step:** → **Post-launch** — Search Console / Bing ([seo-launch-checklist.md](marketing/seo-launch-checklist.md) §2–4), Phase 3 content approval ([phase3-content-proposals.md](marketing/phase3-content-proposals.md)), PepTalk.

| Phase | Focus | Gate | Status |
|-------|-------|------|--------|
| 0 | Caroline decisions (credentials, testimonials, social URLs, AI policy) | Caroline | **Complete** (LinkedIn `sameAs` deferred) |
| 1 | P0 pre-launch (1.1–1.16: credentials, metadata, H1s, JSON-LD, privacy/terms) | After Phase 0 | **Complete** — 1.3 partial (Instagram in `sameAs`; LinkedIn when confirmed) |
| 2 | P1 post-launch (breadcrumbs, footer links, cross-links, FAQs, analytics) | After Phase 1 | **Complete** (commit `659f3e2`); Vercel Analytics added July 2026 |
| 3 | P1 content wave (`/insights/*`, `/bridge-map/how-it-works`, `/clarity-call`) | Caroline copy approval | **Proposals ready** — [phase3-content-proposals.md](marketing/phase3-content-proposals.md); no pages built yet |
| 4 | P2 second wave (more insights, per-page OG, observatory) | Ongoing | Not started |

**Domain:** Live. Search Console / Bing sitemap submit still open.

**Clarity Call:** Tracked in Phase 4c task **3.6** — not duplicated in Next actions once Phase 4c is underway.

##### Phase 0 — Caroline decisions (locked)

| # | Decision | Locked answer |
|---|----------|---------------|
| 0.1 | Credential descriptor sitewide | **"Currently training in psychotherapy and counselling"** (matches About) |
| 0.2 | Software engineering credential | **Honours degree** in software engineering |
| 0.3 | "Five years" claim in Bridge Map founder | **Career-span wording** — *"I have spent my career — first in nursing, now in this work — with women who feel exactly the way you do."* |
| 0.4 | Testimonial provenance | **Real clients with consent**; no extra governance line |
| 0.5 | Social URLs → `CAROLINE_SAME_AS` | **Partial** — Instagram live; LinkedIn deferred until confirmed |
| 0.6 | AI training policy | **Full allow** — keep current `robots.ts` |

##### Phase 1 — P0 pre-launch (after Phase 0)

- [x] 1.1 Credential consistency pass (components + content markdown + JSON-LD)
- [x] 1.2 Coaching `serviceJsonLd` `areaServed` (Worldwide vs Ireland)
- [x] 1.3 Fill `CAROLINE_SAME_AS` — Instagram done; LinkedIn deferred
- [x] 1.4 De-duplicate Home vs Free Class H1/titles
- [x] 1.5 New titles and meta descriptions (priority pages)
- [x] 1.6 Speaking page H1
- [x] 1.7 About H1 + credentials-in-prose paragraph
- [x] 1.8 Homepage direct-answer paragraph
- [x] 1.9 Bridge Map FAQ JSON-LD
- [x] 1.10 Bridge Map instrument domain sentence
- [x] 1.11 Coaching outcomes reframe
- [x] 1.12 Coaching disclaimer
- [x] 1.13 Testimonial attribution — skipped per 0.4 (no governance line)
- [x] 1.14 Free Class teacher attribution
- [x] 1.15 Speaking page section reorder
- [x] 1.16 `/privacy` and `/terms` — full Caroline-approved policies (privacy 10/05/2026; terms 10/06/2026)

Phase 1 validation commands — see [implementation roadmap](marketing/bridge-hub-implementation-roadmap.md#phase-1-validation-checklist).

**Caroline copy review (July 2026):** About hero + My Story + **My Why**, Bridge Map founder/hero/emotional anchor, Speaking opening + **Formats & Audiences / Signature Topics / For Organisers**, Free class hero, landing direct-answer paragraph — implemented in components + `content/*.md`. Coaching page UI polish: bridge background on programme structure, `liquid-glass-light` utility, split qualifier, First Step card (hero flower + cream overlay).

---

## Sitewide components

| Component | Copy | Dev |
|-----------|------|-----|
| Cookie consent | Caroline-approved category copy in modal; banner adapted to privacy policy | **Built** — first-visit banner (Customise · Reject All · Accept All); preferences modal; `localStorage`; GA4 + Vercel Analytics load only when Analytics accepted; footer **Cookie Settings** reopens modal |
| Footer | © line + inline legal links; disclaimer on second line; site links in two columns | **Built** — Bridge Map · Free Class · About \| Coaching · Speaking · In Crisis? |
| Healing Revolution popup | **Headline:** Join The Healing Revolution · **Subtext:** Subscribe to receive insights and resources to inspire a collective healing movement. | **Built** — shows once per session on the visitor's first landing page (after 20% scroll or 8s); skips `/free-class` and speaking enquiry; Kit tag `healing-revolution` |

Implementation: trauma-informed (easy dismiss via ×, backdrop, Escape); no urgency animation; reuses `EmailCaptureForm`; `sessionStorage` prevents repeat in same session (including after navigating to other pages). Dev preview: `?healing-popup` on any URL.

---

## Distribution (post-launch)

| Channel | Purpose | When |
|---------|---------|------|
| [PepTalk](https://getapeptalk.com/) | List Caroline as a vetted keynote speaker — mental health, neurodiversity, workplace wellbeing, burnout | Ready — domain live; speaking copy signed off |

Notes: PepTalk matches event planners to speakers (15k+ roster, 24h response). Pitch now; link `https://www.carolinejones.co/work-with-me/speaking` or enquiry form. No dev work — outreach/listing only.

---

## Next actions

**Post-launch:** [launch-runbook.md](marketing/launch-runbook.md) · [seo-launch-checklist.md](marketing/seo-launch-checklist.md).

1. **Redeploy marketing** after this commit (favicon + Vercel Analytics) — from repo root: `npm run deploy:marketing` or Vercel Redeploy **bridge-hub-marketing**. Smoke: `SMOKE_MARKETING_URL=https://www.carolinejones.co npm run smoke:marketing`
2. **SEO verify** — Search Console + Bing: verify www, submit sitemap, Rich Results Test, OG share check — checklist §2–4
3. **Phase 3 content** — review outlines in [phase3-content-proposals.md](marketing/phase3-content-proposals.md); approve / edit / defer before any `/insights/*` or `/clarity-call` pages are built
4. **Kit / Resend smoke** — confirm free class, Still not sure, speaking enquiry, Healing Revolution land in Kit; speaking enquiry emails arrive
5. **LinkedIn `sameAs`** — optional: confirm URL → add to `seo.ts` (Instagram already live)
6. **PepTalk** — pitch [getapeptalk.com](https://getapeptalk.com/)
7. **Vercel Web Analytics** — enable on **bridge-hub-marketing** project dashboard (package already wired)

*Clarity Call page — tracked in Phase 4c task 3.6, not listed separately here.*

**Dev tip:** If marketing pages 500 with `Cannot find module './NNN.js'`, run `npm run dev:marketing:clean` and hard-refresh the browser.

### Caroline setup checklist (speaking enquiry + newsletter)

1. Create Kit form **"Speaking enquiry"** + custom fields: `phone_number`, `company`, `event_type`, `event_date`, `message` (slugs must match exactly or Kit silently drops them)
2. Create Kit tag **`still-not-sure`** — note the tag ID for `KIT_STILL_NOT_SURE_TAG_ID` (landing newsletter signup; same list as free class)
3. Create Kit tag **`healing-revolution`** — note the tag ID for `KIT_HEALING_REVOLUTION_TAG_ID` (sitewide popup; same list as free class)
4. Decide the inbox for `SPEAKING_ENQUIRY_NOTIFY_EMAIL`
5. Confirm Resend sending domain/from-address for marketing (or a new API key scoped to the marketing Vercel project)
6. Add env vars to the **marketing** Vercel project: `KIT_SPEAKING_ENQUIRY_FORM_ID`, `KIT_STILL_NOT_SURE_TAG_ID`, `KIT_HEALING_REVOLUTION_TAG_ID`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (optional), `SPEAKING_ENQUIRY_NOTIFY_EMAIL`

**Optional (parked page):** `NEXT_PUBLIC_CAL_DISCOVERY_EMBED_URL` only needed if `/discovery-call` is re-linked later.

### Caroline setup checklist (SEO + AI discoverability)

1. Google Search Console — verify `www.carolinejones.co` (or domain property); submit `https://www.carolinejones.co/sitemap.xml`
2. Bing Webmaster Tools — verify domain; submit same sitemap
3. Confirm social/profile URLs for Person schema `sameAs` in `apps/marketing/lib/marketing/seo.ts` (LinkedIn when ready; Instagram live; PepTalk when listed)
4. ~~Set `NEXT_PUBLIC_MARKETING_URL`~~ — **Done** (`https://www.carolinejones.co` on both projects)
5. Run production curl / smoke audit (Phase 4b above) and Google Rich Results Test

*Copy in `apps/marketing/content/` is source of truth. No changes without Caroline's approval.*

---

## Related docs

- [marketing/README.md](marketing/README.md) — marketing doc index
- [marketing/seo-ai-discoverability.md](marketing/seo-ai-discoverability.md) — SEO + AI research, definitions, Caroline launch checklist
- [marketing/bridge-hub-implementation-roadmap.md](marketing/bridge-hub-implementation-roadmap.md) — audit task list (Phase 4c): credentials, copy, conversion, content wave
- [roadmap_screening.md](roadmap_screening.md) — assessment, scoring, results, booking (separate workstream)
- [current-status.md](current-status.md) — done vs pending across both workstreams
