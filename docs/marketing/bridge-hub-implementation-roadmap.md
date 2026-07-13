# The Bridge Hub — Implementation Roadmap

*Derived from the SEO/AI-search/conversion audit (July 2026). Work through step-by-step via [roadmap Phase 4c](../roadmap_marketing.md#phase-4c--seo--conversion-audit).*

Full step-by-step task list derived from the SEO/AI-search/conversion audit. Every task names the exact file(s), what to change, and why. Tasks are grouped into phases; within each phase they're sequenced so that upstream decisions land before downstream work begins.

**How to use this:** Work top to bottom within each phase. A task marked ⚠️ needs Caroline's input before code ships. Tasks marked 🔧 are pure code/copy — no decision needed.

---

## Phase 0 — Decisions before any code (do first)

These are the inputs everything else depends on. Resolve them in one sitting.

### 0.1 ⚠️ Confirm the canonical credential descriptor

Pick the exact wording that will appear everywhere — metadata, JSON-LD, page copy, llms.txt. The audit proposes:

> "Caroline Jones — registered nurse (NMBI), MSc Psychology, psychotherapist in training (PCI College), and founder of The Bridge Hub."

Short form: "registered nurse, MSc Psychology, psychotherapist-in-training"

**Decision needed:** Is "psychotherapist in training" the phrasing you're comfortable with publicly, or do you prefer "currently training in psychotherapy and counselling"? The About credentials section already says the latter. Whichever you choose becomes the single source of truth for every file in Phase 1.

### 0.2 ⚠️ Confirm the software engineering credential

The speaking page says both "certificate in software engineering" and "honours degree in software engineering" in separate paragraphs. Which is accurate?

### 0.3 ⚠️ Confirm the "five years" claim

`BridgeMapFounder.tsx` says: "I have spent five years working with women who feel exactly the way you do right now." Is that five years of direct client work with this audience, or does it blend nursing and client work? If the latter, the audit proposes softer wording: "I have spent my career — first in nursing, now in this work — with women who feel exactly the way you do."

### 0.4 ⚠️ Confirm testimonial provenance

Four landing-page testimonials ("Sarah, 34", "Emma, 41", "Niamh, 38", "Layla, 36") and four unattributed speaking-page testimonials. For each set:

- Are these real clients/attendees, collected with consent?
- Can any be attributed further (role, organisation type, event type)?
- Do you want a governance line ("All testimonials are from real clients/attendees, shared with permission")?

### 0.5 ⚠️ Provide social URLs

LinkedIn profile URL and Instagram profile URL at minimum. These go into `CAROLINE_SAME_AS` and will appear in Person JSON-LD sitewide + on the About page visibly.

Optional but valuable: a public URL for the UNIFESP-published research (e.g. SciELO journal page, ResearchGate, or university repository link).

### 0.6 ⚠️ AI training access — conscious decision

Current `robots.ts` allows all AI crawlers including training bots (GPTBot, ClaudeBot, Google-Extended). This means your copy can be used to train future models. Options:

- **Keep full-allow** (current) — maximum discoverability, maximum content reuse.
- **Allow search only** — add `disallow` rules for GPTBot, ClaudeBot, Google-Extended while keeping wildcard allow for search bots. Your pages still appear in ChatGPT search, Claude search, etc.

No wrong answer — just needs to be conscious.

---

## Phase 1 — P0 fixes before launch

Work through in this order. Each section is one logical commit.

---

### 1.1 🔧 Credential consistency pass (10 files)

**Depends on:** 0.1, 0.2 resolved.

This is the single highest-impact change. Every replacement below uses the canonical descriptor from 0.1. I'll write them using the proposed wording; substitute your confirmed version.

**File 1: `apps/marketing/lib/marketing/seo.ts`**

Task A — Fix `SITE_DESCRIPTION` (line ~6):
```
Old: "…Founded by Caroline Jones, registered nurse and therapist, Ireland."
New: "…Founded by Caroline Jones, registered nurse and MSc Psychology, Ireland."
```

Task B — Fix sitewide Person `jobTitle` (line ~146):
```
Old: "Registered Nurse, Therapist, and Founder"
New: "Registered Nurse and Founder of The Bridge Hub"
```

Task C — Fix sitewide Person `description` (line ~150–151):
```
Old: "Dual registered nurse, psychological support practitioner, and founder of The Bridge Hub. Specialises in nervous system regulation, burnout, and trauma-informed psychoeducation."
New: "Dual registered nurse (NMBI, Children's and Adults), MSc Psychology (University of South Wales), psychotherapist in training at PCI College Ireland, and founder of The Bridge Hub. Specialises in nervous system regulation, burnout, and trauma-informed psychoeducation."
```

Task D — Fix `aboutPersonJsonLd()` `jobTitle` (line ~221):
```
Old: "Registered Nurse, Therapist, and Founder of The Bridge Hub"
New: "Registered Nurse and Founder of The Bridge Hub"
```

Task E — Fix `aboutPersonJsonLd()` `description` (line ~224–225):
```
Old: "Caroline Jones — nurse, therapist, and founder of The Bridge Hub. Dual registered nurse with NMBI, master's in psychology specialising in play therapy, currently in psychotherapy training at PCI College Ireland, member of IACP."
New: "Caroline Jones — registered nurse (NMBI), MSc Psychology, psychotherapist in training (PCI College Ireland), IACP member, and founder of The Bridge Hub. Master's in psychology specialising in play therapy, with peer-reviewed research published through UNIFESP."
```

**File 2: `apps/marketing/app/bridge-map/page.tsx`**

Task F — Fix CREDIBILITY array item (line ~20):
```
Old: "Designed by a qualified nurse and psychological support practitioner"
New: "Designed by a dual-registered nurse with a master's in psychology"
```

**File 3: `apps/marketing/app/about/page.tsx`**

Task G — Fix meta description:
```
Old: "Caroline Jones — nurse, therapist, and founder of The Bridge Hub. A personal story about patterns, safety, and building capacity from the inside out."
New: "Caroline Jones — registered nurse, MSc Psychology, psychotherapist in training, and founder of The Bridge Hub. Her story, her credentials, and why she works with women in survival mode."
```

**File 4: `apps/marketing/components/marketing/about/AboutHero.tsx`**

Task H — Fix the hero paragraph containing "I know this as a therapist.":
```
Option A (recommended): Remove the fourth clause entirely — keep the tricolon:
  "I know this as a nurse. I know it as a patient. I know it as a mother."

Option B: Replace:
  "I know this as a therapist." → "I know this as a clinician."
```

**File 5: `apps/marketing/components/marketing/landing/Founder.tsx`**

Task I — Fix the "first as a nurse, then as a therapist" line:
```
Old: "I have walked this path — first as a nurse, then as a therapist."
New: "I have walked this path — first as a nurse, now through years of my own healing work and training in psychotherapy."
```

**File 6: `apps/marketing/components/marketing/bridge-map/BridgeMapFounder.tsx`**

Task J — Fix line 7 opening sentence:
```
Old: "I am Caroline Jones — a nurse and therapist with a master's degree in psychology. I have spent five years working with women who feel exactly the way you do right now."
New: "I am Caroline Jones — a nurse with a master's degree in psychology, now training as a psychotherapist. I have spent [confirmed timeframe] working with women who feel exactly the way you do right now."
```

Also fix the credential strip below it (around line 16, visible as text items):
```
If it says: "Registered nurse · Therapist · MSc Psychology · …"
Change to:  "Registered nurse (NMBI) · MSc Psychology · Psychotherapist in training · …"
```

**File 7: `apps/marketing/lib/marketing/llms.ts`**

Task K — Fix the `/about` summary (line ~19):
```
Old: "Caroline Jones — registered nurse, therapist, founder; credentials and personal story"
New: "Caroline Jones — registered nurse, MSc Psychology, psychotherapy trainee, founder; credentials and personal story"
```

**File 8: `apps/marketing/components/marketing/work-with-me/SpeakingPage.tsx`**

Task L — Fix the garbled opening bio sentence:
```
Old: "Caroline Jones is a registered nurse, master's in psychology with a certificate in software engineering and psychotherapy trainee, bringing a rare mix of clinical depth, technical skills and lived experience to every talk she gives."
New: "Caroline Jones is a registered nurse with a master's in psychology, a psychotherapist in training, and — unusually for this field — an honours graduate in software engineering. She brings clinical depth, technical fluency, and lived experience to every talk she gives."
(Use "certificate" instead of "honours graduate" if that's the confirmed credential from 0.2.)
```

Task M — Fix the internal contradiction (same file, later paragraph):
```
Find whichever paragraph says "certificate in software engineering" or "honours degree in software engineering" and make it match the confirmed credential from 0.2.
```

Task N — Remove "genuinely":
```
Old: "Organisations looking for a genuinely honest take on stress…"
New: "Organisations looking for an honest, unsanitised take on stress, burnout, and trauma…"
```

**Validation after this commit:** Search the entire `apps/marketing` directory for the strings "therapist", "psychological support practitioner", and "genuinely". The only surviving "therapist" hit should be inside a sentence that says "psychotherapist" (the training reference). Zero hits for "psychological support practitioner". Zero hits for "genuinely".

```bash
grep -rn "therapist" apps/marketing --include="*.tsx" --include="*.ts" | grep -v "psychotherap"
grep -rn "psychological support practitioner" apps/marketing --include="*.tsx" --include="*.ts"
grep -rn "genuinely" apps/marketing --include="*.tsx" --include="*.ts"
```

---

### 1.2 🔧 Fix coaching serviceJsonLd areaServed

**File:** `apps/marketing/lib/marketing/seo.ts`

Update `serviceJsonLd()` (starts around line ~230) to accept an `areaServed` parameter instead of hardcoding Ireland:

```ts
export function serviceJsonLd({
  name,
  description,
  path,
  areaServed,
}: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": personId() },
    ...(areaServed
      ? {
          areaServed: areaServed === "Worldwide"
            ? { "@type": "Text", name: "Worldwide" }
            : { "@type": "Country", name: areaServed },
        }
      : {}),
  };
}
```

Then update the two callsites:

**File:** `apps/marketing/app/work-with-me/coaching/page.tsx`
```ts
serviceJsonLd({
  name: "The Bridge Programme",
  description: "Eight weeks of one-to-one coaching…",
  path: "/work-with-me/coaching",
  areaServed: "Worldwide",
})
```

**File:** `apps/marketing/app/work-with-me/speaking/page.tsx`
```ts
serviceJsonLd({
  name: "Keynote Speaking",
  description: "Keynotes, talks, and workshops…",
  path: "/work-with-me/speaking",
  areaServed: "Ireland",
})
```

---

### 1.3 🔧 Fill CAROLINE_SAME_AS

**Depends on:** 0.5 (social URLs provided).

**File:** `apps/marketing/lib/marketing/seo.ts` (line ~12)

```ts
export const CAROLINE_SAME_AS: string[] = [
  "https://www.linkedin.com/in/CONFIRMED-SLUG",
  "https://www.instagram.com/CONFIRMED-HANDLE",
  // Add UNIFESP/research URL if available
];
```

---

### 1.4 🔧 De-duplicate Home vs Free Class H1 and titles

**File:** `apps/marketing/app/free-class/page.tsx`
```
Old title: "Life Beyond Survival Mode — Free Class"
New title: "Free Class: Life Beyond Survival Mode — with Caroline Jones"
```

**File:** `apps/marketing/components/marketing/free-class/FreeClassLanding.tsx` (line 72–74)
```
Old H1: "Life Beyond Survival Mode"
New H1: "The Free Class"
Keep the sub-line below as: "Life Beyond Survival Mode" (styled as a tagline, not H1)
```

**File:** `apps/marketing/app/page.tsx` — update the home meta to include Caroline's name:
```
Old title: "Life Beyond Survival Mode"
New title: "Life Beyond Survival Mode | Caroline Jones"
(The template appends "| The Bridge Hub", giving: "Life Beyond Survival Mode | Caroline Jones | The Bridge Hub")
```

Updated home meta description:
```
Old: "Learn the 8-week framework that helps capable women understand why they keep getting stuck…"
New: "The Bridge Hub, founded by nurse and MSc Psychology graduate Caroline Jones, helps women in survival mode understand their nervous system — starting with a free screening and free class."
```

---

### 1.5 🔧 New titles and meta descriptions for remaining priority pages

**File:** `apps/marketing/app/about/page.tsx`
```
title: "About Caroline Jones — Nurse, MSc Psychology & Founder"
description: (already handled in 1.1 Task G)
```

**File:** `apps/marketing/app/work-with-me/coaching/page.tsx`
```
Old title: "The Bridge Programme"
New title: "The Bridge Programme — 8-Week 1:1 Nervous System Coaching"

Old description: "Eight weeks, one to one, built entirely around your nervous system profile."
New description: "Eight weeks of one-to-one, trauma-informed coaching built around your nervous system profile from The Bridge Map. With Caroline Jones — registered nurse, MSc Psychology. Available worldwide."
```

**File:** `apps/marketing/app/work-with-me/speaking/page.tsx`
```
Old title: "Keynote Speaking"
New title: "Keynote Speaker — Burnout, Stress & the Nervous System"

Old description: "Book Caroline Jones for keynotes on stress, burnout, trauma, and nervous system regulation — healthcare keynote specialist in Ireland."
New description: "Book Caroline Jones — registered nurse, MSc Psychology — for keynotes on burnout, stress, trauma, and nervous system regulation. Talks for healthcare teams and organisations across Ireland."
```

**File:** `apps/marketing/app/work-with-me/speaking/enquire/page.tsx`
```
Old title: "Enquire About Booking"
New title: "Book Caroline Jones — Speaking Enquiry"

Old description: "Tell Caroline Jones about your event to enquire about keynotes, talks, and workshops."
New description: "Enquire about booking Caroline Jones for a keynote, talk, or workshop in Ireland. Share your event details and receive a personal reply within 24 hours."
```

**File:** `apps/marketing/app/bridge-map/page.tsx`
```
Old title: "The Bridge Map — Free Nervous System Screening"
New title: "The Bridge Map — Free Nervous System Screening by Caroline Jones"

Old description: "A free 15-minute nervous system screening using five validated clinical instruments. Discover your profile and what your body has been protecting."
New description: "A free 15-minute nervous system screening built on five validated clinical instruments, designed by nurse and MSc Psychology graduate Caroline Jones. See your profile immediately — psychoeducational, not a diagnosis."
```

---

### 1.6 🔧 Speaking page H1 change

**File:** `apps/marketing/components/marketing/work-with-me/SpeakingPage.tsx`

Find the H1 element (currently: "An Inspiring, Honest Take on Healing."):
```
New H1: "Keynote Speaker on Burnout, Stress & the Nervous System"
Keep the old line as a styled sub-headline below the H1.
```

---

### 1.7 🔧 About page H1 change + credentials-in-prose paragraph

**File:** `apps/marketing/components/marketing/about/AboutHero.tsx`

Change the H1:
```
Old: "We're rethinking what it means to heal."
New: "Caroline Jones"
Add a styled sub-head below: "Rethinking what it means to heal."
```

**File:** `apps/marketing/components/marketing/about/AboutCredentials.tsx`

After the icon-grid credentials strip, add a prose paragraph:

> "Caroline is a dual-registered nurse with NMBI (children's and adults) and holds a master's in psychology from the University of South Wales, specialising in play therapy, with a thesis grounded in attachment theory. She has published peer-reviewed research through UNIFESP (Universidade Federal de São Paulo), is a member of IACP, and is currently training in psychotherapy and counselling at PCI College Ireland."

This paragraph is what AI systems will extract when asked "what are Caroline Jones's qualifications?"

---

### 1.8 🔧 Homepage direct-answer paragraph

**File:** `apps/marketing/components/marketing/landing/ProgrammeIntro.tsx` (or create a new component)

Add a visible paragraph near the top of this section (after the hero, before or at the start of ProgrammeIntro):

> "The Bridge Hub is the practice of Caroline Jones — a registered nurse with a master's in psychology, currently training in psychotherapy. It offers The Bridge Map, a free nervous-system screening built on five validated clinical instruments, and The Bridge Programme, an eight-week one-to-one programme for women who feel stuck in survival mode."

This paragraph is the page's "direct answer" for AI retrieval. It should be visible, not hidden in metadata.

---

### 1.9 🔧 Bridge Map page — add JSON-LD

**File:** `apps/marketing/app/bridge-map/page.tsx`

Import `JsonLd` and `faqPageJsonLd` (already available). Add to the page's return:

```tsx
import { JsonLd } from "@/components/marketing/JsonLd";
import { faqPageJsonLd } from "@/lib/marketing/seo";

// Inside the component return, before BridgeMapHero:
<JsonLd data={faqPageJsonLd(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
```

The FAQS array is already defined in the same file — just map it to the shape `faqPageJsonLd` expects.

---

### 1.10 🔧 Bridge Map — add instrument domain sentence

**File:** `apps/marketing/app/bridge-map/page.tsx`

In the DIFFERENT array, first item ("It uses validated clinical instruments."), append to the `body`:

```
Old body ends: "This is not a personality quiz or a wellness checklist."
New body: "This is not a personality quiz or a wellness checklist. Together, the five instruments cover perceived stress, emotional wellbeing, trauma-related responses, disconnection, and nervous system overload — scored using each instrument's published methodology."
```

⚠️ **Verify the five domain names match the actual instruments before shipping.** I have not asserted which instruments they are — adjust the domain names to be accurate.

---

### 1.11 🔧 Outcomes reframe on coaching page

**File:** `apps/marketing/components/marketing/work-with-me/CoachingPage.tsx`

Add a lead-in line above the CHANGES array rendering:

> "Every nervous system is different, and I won't promise a timeline. But this is the kind of change women in this work describe:"

This shifts the framing from guaranteed results to directional aspiration — important for a health-adjacent service.

---

### 1.12 🔧 Coaching page disclaimer

**File:** `apps/marketing/components/marketing/work-with-me/CoachingPage.tsx`

Near the final CTA section, add a disclaimer (can reuse the `Disclaimer` component already built for Bridge Map):

> "The Bridge Programme is trauma-informed coaching and psychoeducation. It is not therapy, treatment, or a substitute for individual clinical care. If therapy is what you need, I'll tell you that honestly."

---

### 1.13 ⚠️ Testimonial attribution

**Depends on:** 0.4 resolved.

**File:** `apps/marketing/components/marketing/landing/TestimonialsCarousel.tsx`

- Update testimonial objects with whatever additional attribution is confirmed (role, event type, etc.).
- Add a governance line below the carousel:
  > "All testimonials are from real clients, shared with permission. Some details are withheld at the client's request."

**File:** `apps/marketing/components/marketing/work-with-me/SpeakingPage.tsx`

- Add attribution to each speaking testimonial: at minimum "— Attendee, [event type], [year]".
- Add the same governance line.

---

### 1.14 🔧 Free Class page — teacher attribution and substance

**File:** `apps/marketing/components/marketing/free-class/FreeClassLanding.tsx`

Below the H1 and sub-line, update the intro paragraph:

```
Old: "A free class on why everything you have tried keeps failing, and what has to change first."
New: "A free class from Caroline Jones — registered nurse, MSc Psychology — on why the strategies capable women try keep failing, what the nervous system is protecting, and what has to change first."
```

Add a format note below the email form or above the takeaways:
> "Watch instantly — no scheduling. Runs about [X] minutes."
⚠️ Insert real runtime.

Add a teacher byline near the form:
> "Taught by Caroline Jones, founder of The Bridge Hub" — link "Caroline Jones" to `/about`.

---

### 1.15 🔧 Speaking page — authority-first section reorder

**File:** `apps/marketing/components/marketing/work-with-me/SpeakingPage.tsx`

Current order: bio/story → keynote description → topics → testimonials.
Recommended reorder:

1. H1 + credentials intro (the rewritten opening from Task L)
2. Flagship keynote section (what the talk covers, takeaways)
3. Topics list
4. Testimonials
5. Full narrative story
6. Logistics strip (new — see 2.6)
7. CTA → enquiry

The story content stays intact — it just moves from position 1 to position 5. Authority and "what you get" lead; the personal journey supports.

---

### 1.16 🔧 Create /privacy and /terms stub pages

**Create:** `apps/marketing/app/privacy/page.tsx` and `apps/marketing/app/terms/page.tsx`

Minimum viable content:
- Privacy page: can consolidate with/redirect to the screening app privacy policy if they're the same legal document, but the `/privacy` route on `carolinejones.co` must return 200.
- Terms page: standard terms of use covering the marketing site, coaching, and speaking services.

⚠️ These need legal review — but having placeholder pages that return 200 is better at launch than footer links that 404.

**File:** `apps/marketing/lib/marketing/routes.ts`
```
Old: privacy: screeningUrl("/privacy"),
New: privacy: "/privacy",
```

Remove the `#cookies` link from the footer or connect it to a real cookies section within the privacy page.

Add both routes to `INDEXABLE_ROUTES` in `seo.ts` (they should be indexable).

---

### Phase 1 validation checklist

Run after all Phase 1 commits:

```bash
# No "therapist" without "psycho" prefix
grep -rn "therapist" apps/marketing --include="*.tsx" --include="*.ts" | grep -v "psychotherap"
# Should return 0 results

# No "psychological support practitioner"
grep -rn "psychological support practitioner" apps/marketing --include="*.tsx" --include="*.ts"
# Should return 0 results

# No "genuinely"
grep -rn "genuinely" apps/marketing --include="*.tsx" --include="*.ts"
# Should return 0 results

# CAROLINE_SAME_AS is populated
grep -A3 "CAROLINE_SAME_AS" apps/marketing/lib/marketing/seo.ts
# Should show real URLs, not commented-out placeholders

# Build passes
npm run build

# Spot-check metadata from built output (after dev server is running)
curl -s http://localhost:3000/ | grep "<title>"
curl -s http://localhost:3000/about | grep "<title>"
curl -s http://localhost:3000/work-with-me/coaching | grep "<title>"
curl -s http://localhost:3000/work-with-me/speaking | grep "<title>"
curl -s http://localhost:3000/free-class | grep "<title>"
curl -s http://localhost:3000/bridge-map | grep "<title>"

# Check JSON-LD on bridge-map
curl -s http://localhost:3000/bridge-map | grep "FAQPage"
# Should find FAQPage schema

# Check areaServed is correct
curl -s http://localhost:3000/work-with-me/coaching | grep -i "areaServed" -A2
curl -s http://localhost:3000/work-with-me/speaking | grep -i "areaServed" -A2

# Privacy and terms return 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/privacy
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/terms
```

---

## Phase 2 — P1 high-impact improvements (weeks 1–4 post-launch)

---

### 2.1 🔧 BreadcrumbList JSON-LD on all routes

**File:** `apps/marketing/lib/marketing/seo.ts`

Add a new helper:

```ts
export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
```

Add to each page's `<JsonLd>`. Examples:

- `/about` → `[{ name: "Home", path: "/" }, { name: "About Caroline Jones", path: "/about" }]`
- `/work-with-me/coaching` → `[{ name: "Home", path: "/" }, { name: "Work With Me", path: "/work-with-me" }, { name: "The Bridge Programme", path: "/work-with-me/coaching" }]`
- `/work-with-me/speaking/enquire` → `[{ name: "Home", path: "/" }, { name: "Speaking", path: "/work-with-me/speaking" }, { name: "Enquire", path: "/work-with-me/speaking/enquire" }]`

---

### 2.2 🔧 WebSite alternateName

**File:** `apps/marketing/lib/marketing/seo.ts` — in `siteJsonLd()`, WebSite node:

```ts
{
  "@type": "WebSite",
  "@id": webId,
  name: SITE_NAME,
  alternateName: "Caroline Jones",
  // …rest
}
```

This tells search engines and AI that "The Bridge Hub" and "Caroline Jones" refer to the same site entity — critical since the domain is `carolinejones.co` but the brand name is "The Bridge Hub."

---

### 2.3 🔧 Footer navigation links

**File:** `apps/marketing/components/marketing/Footer.tsx`

Add a column of internal links above or beside the legal links:

```
The Bridge Map → /bridge-map
Free Class → /free-class
About Caroline → /about
Coaching → /work-with-me/coaching
Speaking → /work-with-me/speaking
```

Every page now has sitewide contextual internal links beyond the header nav.

---

### 2.4 🔧 Body-copy cross-links (page by page)

These are inline text links within existing copy. Each one creates a two-way topical connection.

**`/bridge-map` page:**
- In the BridgeMapFounder section, after the bio: add `"Read my full story →"` linking to `/about`.
- In the EXPECT section, step 4 ("This is where the report becomes a real conversation"), add: `"If the Clarity Call shows one-to-one work is the right fit, here's what The Bridge Programme looks like →"` linking to `/work-with-me/coaching`.

**`/about` page:**
- In AboutMyStory, at the mention of building the screening tool: `"That's how The Bridge Map was born →"` linking to `/bridge-map`.
- In AboutCloseCta or credentials section: `"I also speak at events across Ireland →"` linking to `/work-with-me/speaking`.

**`/work-with-me/coaching` page:**
- In the Nervous System Map deliverable description: `"Your results from The Bridge Map →"` linking to `/bridge-map`.
- Anywhere Caroline is mentioned: consider linking to `/about`.

**`/work-with-me/speaking` page:**
- Near the end of the story section: `"Read the full story →"` linking to `/about`.
- In the keynote description where The Bridge Map is referenced: link to `/bridge-map`.

**`/free-class` page:**
- Below the form: `"Prefer to start with the screening? Take The Bridge Map →"` linking to `/bridge-map`.
- Teacher byline "Caroline Jones" links to `/about` (done in 1.14).

**`/work-with-me/speaking/enquire` page:**
- Above or below the form: `"Not ready to enquire? Read about my talks and topics first →"` linking to `/work-with-me/speaking`.

---

### 2.5 🔧 Coaching page FAQ section

**File:** `apps/marketing/components/marketing/work-with-me/CoachingPage.tsx`

Add a 5-question FAQ section above the final CTA:

1. "Is this therapy?" → "No. The Bridge Programme is trauma-informed coaching and psychoeducation. If therapy is what you need, I'll tell you honestly on the Clarity Call."
2. "Do I need to take The Bridge Map first?" → "Yes — your Bridge Map results are the foundation. The programme is built around your specific nervous system profile, not a generic template."
3. "What if I'm outside Ireland?" → "Coaching is available worldwide — sessions happen online. Speaking and consultancy are Ireland only."
4. "How many places are available?" → "I work with a small number of women at a time so every programme gets my full attention. If there's a wait, I'll let you know and you won't be pressured."
5. "What's the investment?" → "We discuss this on the Clarity Call, alongside whether the programme is the right fit. There's no obligation."

Also add `FAQPage` JSON-LD for these (import and use `faqPageJsonLd` as on the homepage).

---

### 2.6 🔧 Speaking page logistics strip

**File:** `apps/marketing/components/marketing/work-with-me/SpeakingPage.tsx`

Add a section (between testimonials and CTA, or wherever it reads naturally):

**Formats:** Keynote (30–60 min) · Workshop (half-day) · Panel or Q&A
**Audiences:** Healthcare teams · Corporate wellbeing · Education · Conferences
**Location:** Ireland (in-person); remote by arrangement
**Lead time:** 4–6 weeks preferred
**Enquiries:** [Link to /work-with-me/speaking/enquire]

⚠️ Confirm the specifics (durations, lead time) are accurate before publishing.

---

### 2.7 🔧 Sitemap real lastModified dates

**File:** `apps/marketing/app/sitemap.ts`

Replace `lastModified: new Date()` with a per-route date map:

```ts
const LAST_MODIFIED: Record<string, string> = {
  "/": "2026-07-15",           // update when page content changes
  "/bridge-map": "2026-07-15",
  "/free-class": "2026-07-15",
  "/about": "2026-07-15",
  "/work-with-me/coaching": "2026-07-15",
  "/work-with-me/speaking": "2026-07-15",
  "/work-with-me/speaking/enquire": "2026-07-15",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = marketingSiteUrl();
  return INDEXABLE_ROUTES.map(({ path }) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified: new Date(LAST_MODIFIED[path] ?? "2026-07-15"),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/bridge-map" ? 0.9 : 0.8,
  }));
}
```

Update dates when content actually changes — not on every deploy.

---

### 2.8 🔧 Explicit AI search bot rules in robots.ts

**Depends on:** 0.6 resolved.

**File:** `apps/marketing/app/robots.ts`

Add explicit rules for search-surface bots (these are already covered by the wildcard, but making them explicit is self-documenting and future-proof):

```ts
{ userAgent: "OAI-SearchBot", allow: "/" },
{ userAgent: "ChatGPT-User", allow: "/" },
{ userAgent: "Claude-SearchBot", allow: "/" },
{ userAgent: "Claude-User", allow: "/" },
```

If the decision from 0.6 is to restrict training access, also add:
```ts
{ userAgent: "GPTBot", disallow: "/" },
{ userAgent: "ClaudeBot", disallow: "/" },
{ userAgent: "Google-Extended", disallow: "/" },
```

---

### 2.9 🔧 GA4 event instrumentation

Per the research report, instrument these events. This is code work, not copy.

**File:** Create `apps/marketing/lib/marketing/analytics.ts` (or integrate into existing tracking):

| Event | Trigger | GA4 event name |
|---|---|---|
| Free class email submit | `EmailCaptureForm` onSubmit success | `generate_lead` with `{ method: "free_class" }` |
| Speaking enquiry submit | `SpeakingEnquiryForm` onSubmit success | `generate_lead` with `{ method: "speaking_enquiry" }` |
| "Still not sure" form submit | `StillNotSure` form submit | `generate_lead` with `{ method: "still_not_sure" }` |
| Primary CTA clicks | Links to `/begin`, `/free-class`, `/bridge-map`, coaching, speaking enquiry | `select_content` with `{ content_type: "cta", item_id: "[destination]" }` |

Wire each into the relevant component's click/submit handler.

---

## Phase 3 — P1 content wave (weeks 2–6 post-launch)

Build these pages in order. Each follows the page anatomy from the research report.

---

### 3.1 Create /bridge-map/how-it-works

**Create:** `apps/marketing/app/bridge-map/how-it-works/page.tsx`

**Title:** "How The Bridge Map Works — Methodology & Instruments"
**Meta:** "The Bridge Map uses five validated clinical instruments to screen nervous system patterns. Learn what it measures, how it's scored, and what 'psychoeducational' means."
**H1:** "How The Bridge Map Works"

**Content outline:**
- Direct-answer paragraph: what The Bridge Map is in one paragraph.
- Section: "The five areas it measures" — name each domain, one sentence on what it captures.
- Section: "Why validated instruments, not a quiz" — what validated means in plain language.
- Section: "How scoring works" — lay-level explanation without exposing the scoring algorithm.
- Section: "What 'psychoeducational' means — and what it doesn't" — the disclaimer content expanded.
- Section: "Who designed it and why" — 2–3 sentences linking to `/about`.
- CTA: "Take The Bridge Map →" linking to screening.

⚠️ The instrument domains and scoring description need Caroline's review for accuracy.

Add to `INDEXABLE_ROUTES`, sitemap, and `llms.ts`.

---

### 3.2 Create /insights/survival-mode

**Create:** `apps/marketing/app/insights/survival-mode/page.tsx` (and create the `/insights` directory)

**Title:** "Survival Mode — What It Is and Why You Can't Think Your Way Out"
**Meta:** "What survival mode actually is, why capable women get stuck in it, and why understanding alone doesn't change the pattern. By Caroline Jones, registered nurse and MSc Psychology."
**H1:** "What Survival Mode Actually Is"

**Content outline (800–1200 words):**
- Direct-answer paragraph: survival mode defined in plain language.
- Section: "What it looks like day to day" — draw from the DailyReality language already on the homepage.
- Section: "Why it doesn't respond to logic" — the nervous-system-not-mindset argument (Caroline's core thesis).
- Section: "How it gets misread" — burnout, laziness, anxiety — reframing without diagnosing.
- Section: "What can shift it" — general direction (body-first, not thought-first), not prescriptive claims.
- CTA: "Take The Bridge Map to see your pattern →"

**Internal links out:** `/bridge-map`, `/free-class`, `/work-with-me/coaching`.
**Internal links in:** homepage, free class, coaching page should all link here where "survival mode" is mentioned.

---

### 3.3 Create /insights/nervous-system-regulation

**Create:** `apps/marketing/app/insights/nervous-system-regulation/page.tsx`

**Title:** "Nervous System Regulation — A Plain-Language Guide"
**Meta:** "What nervous system regulation actually means, why 'just breathe' advice fails, and how regulation connects to feeling stuck, reactive, or shut down."
**H1:** "Nervous System Regulation: What It Actually Means"

**Content outline (800–1200 words):**
- Direct-answer paragraph: regulation defined simply.
- Section: "What dysregulation feels like" — link to survival mode page.
- Section: "Why common advice doesn't work" — the gap between cognitive and somatic.
- Section: "What regulation is not" — it's not calm all the time; it's capacity.
- Section: "Key terms explained" — window of tolerance, activation, shutdown (brief definitions).
- CTA: "The Bridge Map measures this across five areas →"

This page becomes the glossary anchor — every time the site says "nervous system regulation," link here.

---

### 3.4 Create /work-with-me/speaking/burnout-keynote

**Create:** `apps/marketing/app/work-with-me/speaking/burnout-keynote/page.tsx`

**Title:** "Burnout & the Nervous System — Keynote by Caroline Jones"
**Meta:** "Book Caroline Jones's keynote on burnout, the nervous system, and why capable people stay stuck. For healthcare teams, conferences, and corporate events across Ireland."
**H1:** "The Nervous System and Burnout: Why Capable People Stay Stuck"

**Content outline:**
- What this talk covers (expand from existing topic description on the speaking page).
- What audiences take away (3–4 concrete outcomes).
- Who it's for (audience types: healthcare, HR, leadership, conferences).
- Formats and duration (keynote, workshop, panel).
- A testimonial if one maps to this topic.
- CTA: "Enquire about booking →" linking to `/work-with-me/speaking/enquire`.

**Internal links:** speaking hub, about, Bridge Map methodology page.

---

### 3.5 Create /work-with-me/speaking/motherhood-nervous-system

**Create:** `apps/marketing/app/work-with-me/speaking/motherhood-nervous-system/page.tsx`

Same structure as 3.4 but for the "Motherhood and the Nervous System" topic.

**Title:** "Motherhood & the Nervous System — Keynote by Caroline Jones"
**Meta:** "A keynote on motherhood, the nervous system, and why your calm (or lack of it) isn't just yours. For healthcare, parenting, and wellbeing events in Ireland."
**H1:** "Motherhood and the Nervous System"

---

### 3.6 Create /clarity-call

**Create:** `apps/marketing/app/clarity-call/page.tsx`

**Title:** "The Clarity Call — What to Expect"
**Meta:** "The Clarity Call is a real conversation with Caroline Jones about your Bridge Map results, your patterns, and whether one-to-one work is the right fit. Free, no obligation."
**H1:** "The Clarity Call"

**Content outline:**
- What it is: a clinical conversation, not a sales call.
- What happens: Caroline reviews your Bridge Map results before the call; you discuss patterns, daily life, and what working together could look like.
- What you'll leave with: a clear sense of what kind of support could help — which might be the programme, or might be something else entirely.
- Booking: link to Cal.com or `/begin` flow.
- FAQ: "Do I have to book one?" (no), "How long is it?" (specify), "Will I be pressured?" (no, and if therapy is what you need, I'll say so).

---

### 3.7 🔧 Update INDEXABLE_ROUTES, sitemap, and llms.ts

After creating the new pages, add each to:

**File:** `apps/marketing/lib/marketing/seo.ts` — `INDEXABLE_ROUTES` array:
```ts
{ path: "/bridge-map/how-it-works", title: "How The Bridge Map Works" },
{ path: "/insights/survival-mode", title: "Survival Mode" },
{ path: "/insights/nervous-system-regulation", title: "Nervous System Regulation" },
{ path: "/work-with-me/speaking/burnout-keynote", title: "Burnout Keynote" },
{ path: "/work-with-me/speaking/motherhood-nervous-system", title: "Motherhood & the Nervous System Keynote" },
{ path: "/clarity-call", title: "The Clarity Call" },
{ path: "/privacy", title: "Privacy Policy" },
{ path: "/terms", title: "Terms of Use" },
```

**File:** `apps/marketing/lib/marketing/llms.ts` — add summaries for each new page in `LLMS_PAGE_SUMMARIES`.

The sitemap auto-generates from `INDEXABLE_ROUTES`, so no separate sitemap change needed.

---

## Phase 4 — P2 second wave (weeks 6–12)

Lower urgency, high cumulative value.

### 4.1 Content wave 2

Create in any order based on capacity:

- `/insights/why-women-stay-stuck` — symptom-recognition essay.
- `/insights/burnout-in-women` — burnout vs. depression vs. survival mode, when to seek clinical care.
- `/about/how-this-site-is-written` — editorial transparency, testimonial policy, AI-use disclosure.
- `/insights/why-i-built-the-bridge-map` — founder-method essay, digital-PR asset.
- `/insights/glossary` — short sourced definitions of key terms.

### 4.2 Per-page OG images

Create custom OG images for at least: home, Bridge Map, coaching, speaking, free class. Each should include Caroline's name, the page title, and The Bridge Hub mark. Use the existing `/og-default.png` as the template.

### 4.3 VideoObject JSON-LD on /free-class

Once the video is live and the runtime is known, add `VideoObject` schema:
```ts
{
  "@type": "VideoObject",
  name: "Life Beyond Survival Mode — Free Class",
  description: "…",
  uploadDate: "2026-XX-XX",
  duration: "PTXXM",
  thumbnailUrl: absoluteUrl("/images/free-class-thumb.jpg"),
}
```

### 4.4 Speaker one-pager (downloadable PDF)

Create a one-page PDF speaker sheet: photo, credentials, keynote title/description, topics, testimonial, enquiry link. Host at `/downloads/caroline-jones-speaker-sheet.pdf`. Track downloads as a `speaking_packet_request` custom event.

### 4.5 /.well-known/security.txt

```
Contact: mailto:hello@carolinejones.co
Preferred-Languages: en
Canonical: https://carolinejones.co/.well-known/security.txt
```

### 4.6 Weekly AI prompt observatory

Set up a recurring practice (spreadsheet or Notion):

Run these 10 prompts weekly across ChatGPT (search on), Gemini (web), Claude (web), Perplexity:

1. "Who is Caroline Jones and what is The Bridge Hub?"
2. "What is The Bridge Map?"
3. "nervous system screening tool for women"
4. "burnout speaker Ireland"
5. "trauma-informed coach for women"
6. "what is survival mode and why do I feel stuck"
7. "Caroline Jones keynote speaking"
8. "nervous system regulation explained simply"
9. "how to move from survival mode"
10. "is The Bridge Programme right for me"

Track: which platform cited carolinejones.co, which page, whether the summary was accurate, and what gaps appeared. This is the feedback loop that tells you whether the content wave is working.

---

## Domain cutover checklist (from the research report, still applies)

These are not new — the SEO research doc covers them thoroughly — but they sequence alongside Phase 1:

1. Set `NEXT_PUBLIC_MARKETING_URL=https://carolinejones.co` on both Vercel projects.
2. Redeploy.
3. Verify every page's canonical tag points to `https://carolinejones.co/…`.
4. `curl https://carolinejones.co/robots.txt` — confirm correct.
5. `curl https://carolinejones.co/sitemap.xml` — confirm all URLs are production domain.
6. Submit sitemap in Google Search Console.
7. Submit sitemap in Bing Webmaster Tools.
8. Run URL Inspection on all 7 priority pages.
9. Run PageSpeed Insights on home, Bridge Map, speaking, coaching, free class.
10. Social-preview check (paste each URL into Twitter card validator, LinkedIn post inspector, Facebook debugger).

---

## Quick reference — all files touched

| Phase | Files |
|---|---|
| 1.1 | `seo.ts`, `bridge-map/page.tsx`, `about/page.tsx`, `AboutHero.tsx`, `Founder.tsx`, `BridgeMapFounder.tsx`, `llms.ts`, `SpeakingPage.tsx` |
| 1.2 | `seo.ts`, `coaching/page.tsx`, `speaking/page.tsx` |
| 1.3 | `seo.ts` |
| 1.4 | `free-class/page.tsx`, `FreeClassLanding.tsx`, `page.tsx` (home) |
| 1.5 | `about/page.tsx`, `coaching/page.tsx`, `speaking/page.tsx`, `enquire/page.tsx`, `bridge-map/page.tsx` |
| 1.6 | `SpeakingPage.tsx` |
| 1.7 | `AboutHero.tsx`, `AboutCredentials.tsx` |
| 1.8 | `ProgrammeIntro.tsx` or new component |
| 1.9 | `bridge-map/page.tsx` |
| 1.10 | `bridge-map/page.tsx` |
| 1.11 | `CoachingPage.tsx` |
| 1.12 | `CoachingPage.tsx` |
| 1.13 | `TestimonialsCarousel.tsx`, `SpeakingPage.tsx` |
| 1.14 | `FreeClassLanding.tsx` |
| 1.15 | `SpeakingPage.tsx` |
| 1.16 | New: `privacy/page.tsx`, `terms/page.tsx`; update `routes.ts`, `seo.ts` |
| 2.1–2.9 | `seo.ts`, `Footer.tsx`, `robots.ts`, `sitemap.ts`, various page components, new `analytics.ts` |
| 3.1–3.7 | New page files + `seo.ts` INDEXABLE_ROUTES + `llms.ts` |
