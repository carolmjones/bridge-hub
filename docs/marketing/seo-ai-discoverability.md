# SEO + AI discoverability — research, definitions, and next steps

*The Bridge Hub marketing site · `carolinejones.co` · Last updated: 12 July 2026*

This document consolidates the SEO audit, AI discoverability research, implementation status, and Caroline’s launch checklist. Use it for clarification before domain cutover and public launch.

**Related:** [roadmap_marketing.md](../roadmap_marketing.md) Phase 4b · Code: `apps/marketing/lib/marketing/seo.ts`

---

## 1. What we mean by “SEO” and “AI discoverability”

| Term | Plain definition | Why it matters for Caroline |
|------|------------------|----------------------------|
| **SEO (Search Engine Optimisation)** | Technical and content signals that help Google/Bing understand, index, and rank your pages | Women searching “nervous system screening Ireland”, “burnout coach”, etc. can find you organically |
| **Metadata** | Hidden page title, description, and preview image shown in search results and when links are shared | Controls how the site looks in Google and in iMessage/LinkedIn previews |
| **Canonical URL** | The “official” URL for a page (e.g. `https://carolinejones.co/bridge-map`) | Prevents duplicate-content issues if the site is reachable on multiple URLs |
| **Sitemap** | Machine-readable list of pages you want indexed (`/sitemap.xml`) | Tells search engines which pages exist and how important they are |
| **robots.txt** | Rules file at `/robots.txt` telling crawlers what they may fetch | Keeps `/api/` private; explicitly allows AI crawlers on public pages |
| **Open Graph (OG)** | Social preview tags (image, title, description) | Link shares show a branded card, not a blank snippet |
| **JSON-LD / structured data** | Standardised schema (Person, Service, FAQ) embedded in pages | Rich results in Google; helps AI assistants understand who Caroline is and what she offers |
| **AI discoverability** | Making the site easy for LLMs and AI search (ChatGPT, Perplexity, Claude) to find and cite | Caroline appears accurately when people ask AI about nervous system work, burnout, screening |
| **llms.txt** | Emerging convention: a curated index file for AI agents (`/llms.txt`) | Points AI systems to your canonical pages and summaries |
| **llms-full.txt** | Extended corpus of locked marketing copy (`/llms-full.txt`) | Gives AI systems your approved wording, not scraped guesswork |
| **ai.txt** | Policy file stating whether AI may use your content (`/ai.txt`) | Documents your training/citation stance for AI crawlers |

---

## 2. Research summary (July 2026)

### Initial audit — gaps before implementation

| Area | Pre-implementation | Risk |
|------|-------------------|------|
| Sitewide metadata | Generic layout title only on several routes | Weak search snippets; poor social shares |
| Canonical URLs | None | Duplicate indexing if multiple domains/URLs |
| Sitemap / robots | None | Slower or incomplete indexing |
| OG / Twitter cards | None | Ugly link previews |
| JSON-LD | None | Missed rich results; weaker AI entity understanding |
| AI index files | None | AI systems rely on noisy page scrapes |
| Favicon / app icon | Default Next.js | Unprofessional browser tab and bookmarks |

### Research inputs

- **Next.js App Router** metadata API (`metadata`, `metadataBase`, `app/sitemap.ts`, `app/robots.ts`)
- **Schema.org** types suited to a personal brand + professional service: `Person`, `ProfessionalService`, `WebSite`, `Service`, `FAQPage`
- **llms.txt convention** — curated agent-readable site index (see [llmstxt.org](https://llmstxt.org) and industry practice summaries)
- **AI crawler user-agents** — `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended` — handled via `robots.txt` allow rules
- **GEO (Generative Engine Optimisation)** — structured copy, FAQ schema, and explicit agent index files improve citation accuracy

### Policy decision (confirmed)

**Full allow** — maximise discoverability. AI crawlers are allowed to index public marketing pages for both **citation** (answering user questions with your content) and **training** where applicable. `/ai.txt` and `robots.txt` reflect this.

Pages intentionally excluded from indexing:
- `/urgent-support` — crisis resources; `noindex`
- `/discovery-call` — parked; `noindex`
- `/api/*` — disallowed in `robots.txt`

---

## 3. What is built (dev complete)

| Layer | Status | Location |
|-------|--------|----------|
| SEO module (metadata, JSON-LD helpers, indexable routes) | Done | `apps/marketing/lib/marketing/seo.ts` |
| Sitewide metadata + JSON-LD graph | Done | `apps/marketing/app/layout.tsx` |
| Per-page metadata (all marketing routes) | Done | Each `app/**/page.tsx` |
| Sitemap (7 indexable routes) | Done | `apps/marketing/app/sitemap.ts` |
| robots.txt (AI crawlers allowed) | Done | `apps/marketing/app/robots.ts` |
| `/llms.txt` curated index | Done | `apps/marketing/app/llms.txt/route.ts` |
| `/llms-full.txt` content corpus | Done | `apps/marketing/app/llms-full.txt/route.ts` |
| `/ai.txt` policy file | Done | `apps/marketing/app/ai.txt/route.ts` |
| Default OG image (1200×630) + favicon | Done | `public/og-default.png`, `app/icon.png` |
| FAQ JSON-LD on landing | Done | `apps/marketing/lib/marketing/faq.ts` + landing page |
| Service JSON-LD on coaching/speaking | Done | respective page components |
| Person JSON-LD on About | Done | About page |

### Indexable routes (in sitemap + llms.txt)

1. `/` — Landing  
2. `/bridge-map` — Free screening  
3. `/free-class` — Free class  
4. `/about` — Caroline Jones  
5. `/work-with-me/coaching` — Bridge Programme  
6. `/work-with-me/speaking` — Keynote speaking  
7. `/work-with-me/speaking/enquire` — Speaking enquiry  

### JSON-LD entities (sitewide graph)

- **WebSite** — site name, URL, publisher  
- **ProfessionalService** — The Bridge Hub, Ireland, founder link  
- **Person** — Caroline Jones, credentials, `knowsAbout`, `alumniOf`  
- **FAQPage** — landing FAQs  
- **Service** — coaching and speaking offers  

---

## 4. What is NOT done — Caroline actions at launch

These require your accounts, domain, or confirmed URLs. **Do not submit sitemap to Search Console until `carolinejones.co` DNS is live.**

### Step 1 — Domain (blocking)

1. Vercel → **bridge-hub-marketing** → Domains → add `carolinejones.co` and `www.carolinejones.co`
2. Registrar DNS (typical):
   - Apex `@` → A `76.76.21.21`
   - `www` → CNAME `cname.vercel-dns.com`
3. Wait for Vercel **Valid Configuration**
4. Set on **both** Vercel projects (marketing + screening):
   ```
   NEXT_PUBLIC_MARKETING_URL=https://carolinejones.co
   ```
5. **Redeploy marketing** (canonicals, sitemap, OG tags read this env var)
6. Optional: redirect `www` → apex in Vercel

### Step 2 — Search engines

1. **Google Search Console** — verify `carolinejones.co`; submit `https://carolinejones.co/sitemap.xml`
2. **Bing Webmaster Tools** — verify domain; submit same sitemap

### Step 3 — Social / schema links

Edit `CAROLINE_SAME_AS` in `apps/marketing/lib/marketing/seo.ts` with confirmed profile URLs:

```ts
export const CAROLINE_SAME_AS: string[] = [
  "https://www.linkedin.com/in/...",   // confirm
  "https://www.instagram.com/...",     // confirm
  // PepTalk profile when live
];
```

Redeploy after updating. This strengthens Person schema and AI entity linking.

### Step 4 — Pre-launch verification

**Automated curl audit** (run after domain is live):

```bash
HOST="https://carolinejones.co"
for path in /robots.txt /sitemap.xml /llms.txt /llms-full.txt /ai.txt /og-default.png /favicon.ico; do
  curl -s -o /dev/null -w "%{http_code}  $path\n" "$HOST$path"
done
```

Expect `200` for every path.

**Manual checks:**

- Share `https://carolinejones.co/` in iMessage or LinkedIn — branded OG preview appears  
- [Google Rich Results Test](https://search.google.com/test/rich-results) — paste homepage URL; no JSON-LD errors  
- Search Console — sitemap accepted; no coverage errors after a few days  

### Step 5 — Optional (later)

| Item | Priority | Notes |
|------|----------|-------|
| IndexNow | P3 | Instant Bing/Yandex ping on deploy |
| `/.well-known/security.txt` | P3 | Production hygiene contact |
| Cookie consent banner | Optional | Only if analytics/tracking added |
| Per-page OG images | Optional | Custom share images per route (currently one default) |

---

## 5. Next steps — recommended order

| # | Action | Owner | Depends on |
|---|--------|-------|------------|
| 1 | **Phase 4c — 0.5** — Confirm LinkedIn + Instagram URLs → `CAROLINE_SAME_AS` (task 1.3) | Caroline | — |
| 2 | Caroline reviews updated credential wording in [bridge-map.md](../../apps/marketing/content/bridge-map.md) and [about.md](../../apps/marketing/content/about.md) | Caroline | — |
| 3 | **Caroline env setup** — speaking enquiry + newsletter Kit tags | Caroline | — |
| 4 | **Domain** — connect `carolinejones.co` (Phase 4b); after 1.3 or when ready | Caroline / Vercel | Registrar |
| 5 | **SEO launch checklist** — Search Console, Bing, curl audit, Rich Results Test | Caroline | Domain live |
| 6 | **Phase 4c Phase 2** — breadcrumbs, footer links, analytics | Dev | Phase 1 + domain |
| 7 | **PepTalk** — pitch when site finished and copy signed off | Caroline | Domain |

**Dev work remaining for SEO infrastructure (Phase 4b):** none.

**Audit implementation (Phase 4c):** Phase 0 locked (0.5 social URLs pending). Phase 1 P0 **complete except 1.3** (`CAROLINE_SAME_AS`). See [roadmap Phase 4c](../roadmap_marketing.md#phase-4c--seo--conversion-audit) and [implementation roadmap](bridge-hub-implementation-roadmap.md).

Completed in Phase 1: credential consistency, metadata/H1s, FAQ JSON-LD on bridge-map, privacy/terms stubs, coaching/speaking JSON-LD `areaServed`, speaking section reorder. Remaining: `sameAs` URLs, Phase 2–4 content wave (`/insights/*`, `/clarity-call`, analytics).

---

## 6. How canonical URLs work

Everything reads `NEXT_PUBLIC_MARKETING_URL`:

| Environment | Value | Effect |
|-------------|-------|--------|
| Local dev | `http://localhost:3000` | Canonicals point at localhost (fine for dev) |
| Production | `https://carolinejones.co` | Sitemap, OG, JSON-LD `@id` URLs all use live domain |

**Important:** Set production env **before** submitting sitemap to Search Console. Submitting a `*.vercel.app` sitemap then switching domain causes rework.

---

## 7. AI files — what each URL does

| URL | Audience | Contents |
|-----|----------|----------|
| `/llms.txt` | AI agents, developers | Short index: page titles, URLs, one-line summaries, funnel structure |
| `/llms-full.txt` | AI systems needing full copy | Concatenated locked markdown from `apps/marketing/content/` |
| `/ai.txt` | AI crawlers | Explicit allow policy for training + citation |
| `/robots.txt` | All crawlers | Allow public pages; disallow `/api/`; list sitemap; allow AI bots |

---

## 8. Glossary quick reference

- **Indexing** — Google has stored your page and may show it in results  
- **noindex** — “Do not show this page in search results” (`/urgent-support`, `/discovery-call`)  
- **Rich results** — Enhanced Google listings (FAQ dropdowns, etc.) from JSON-LD  
- **sameAs** — Schema.org links from Caroline’s Person entity to her social profiles  
- **metadataBase** — Next.js root URL for resolving relative OG image paths  
- **SCREENING_START** — CTA link to screening app (`app.carolinejones.co/begin` when connected) — separate deploy, not in marketing sitemap  

---

## 9. File map (for developers)

```
apps/marketing/
  lib/marketing/
    seo.ts              ← metadata helpers, JSON-LD, INDEXABLE_ROUTES
    llms.ts             ← llms.txt / llms-full.txt / ai.txt builders
    faq.ts              ← shared FAQ copy + FAQPage schema
  app/
    layout.tsx          ← root metadata + sitewide JSON-LD
    sitemap.ts
    robots.ts
    llms.txt/route.ts
    llms-full.txt/route.ts
    ai.txt/route.ts
  public/og-default.png
  app/icon.png
  app/apple-icon.png
```

---

## 10. Changelog

| Date | Change |
|------|--------|
| Jul 2026 | Initial SEO audit; identified missing sitemap, OG, JSON-LD, AI files |
| Jul 2026 | Policy: full allow for AI crawlers |
| Jul 2026 | Dev implementation complete (commit `54c6c19`) |
| Jul 2026 | Domain target updated to `carolinejones.co`; Caroline launch checklist remains open |

---

*Copy in `apps/marketing/content/` remains source of truth. SEO layer does not change locked copy without Caroline approval.*
