# Marketing launch runbook

*Caroline actions to go live on `carolinejones.co`. Dev SEO, legal pages, and funnel pages are built in code.*

---

## 0. Confirm Vercel deploy is current

After every push to `main`, check **bridge-hub-marketing** (not the screening project).

**Quick verify** (expect all `200`):

```bash
HOST="https://www.carolinejones.co"
for path in /about /privacy /terms /work-with-me/speaking /work-with-me/coaching; do
  curl -s -o /dev/null -w "%{http_code}  $path\n" "$HOST$path"
done
```

On `/about`, page source should include **Why I Do This Work**.

If routes 404 or copy is old: Vercel → **bridge-hub-marketing** → Deployments → Redeploy latest `main` (skip build cache). Or from **repo root** (not `apps/marketing`):

```bash
npm run deploy:marketing
```

**Note:** Vercel project Root Directory is `apps/marketing`. Run CLI deploys from repo root only — deploying from inside `apps/marketing` doubles the path and fails.

---

## 1. Kit + Resend env (marketing Vercel project)

### Kit setup

1. Create form **Speaking enquiry** with custom fields (slugs must match exactly):
   - `phone_number`, `company`, `event_type`, `event_date`, `message`
2. Create tag **`still-not-sure`** (landing newsletter; same list as free class)
3. Create tag **`healing-revolution`** (sitewide popup; same list as free class)

### Env vars (Production + Preview)

```
KIT_API_KEY=
KIT_FREE_CLASS_FORM_ID=
KIT_STILL_NOT_SURE_TAG_ID=
KIT_HEALING_REVOLUTION_TAG_ID=
KIT_SPEAKING_ENQUIRY_FORM_ID=
RESEND_API_KEY=
RESEND_FROM_EMAIL=The Bridge Hub <hello@carolinejones.co>
SPEAKING_ENQUIRY_NOTIFY_EMAIL=
```

Optional: `NEXT_PUBLIC_GA4_MEASUREMENT_ID` for analytics (consent-gated).

### Smoke test

1. Submit test email on `/free-class` unlock form
2. Submit test on landing **Still not sure?**
3. Submit test speaking enquiry on `/work-with-me/speaking/enquire`
4. Confirm Kit subscribers + instant Resend email for speaking enquiry

---

## 2. Copy sign-off

| Page | Route | Status | Source |
|------|-------|--------|--------|
| Landing | `/` | Nearly done — final read | Components + `content/` |
| Bridge Map | `/bridge-map` | **Draft — priority review** | [bridge-map.md](../../apps/marketing/content/bridge-map.md) |
| Free class | `/free-class` | Draft — review hero + unlock | [free-class.md](../../apps/marketing/content/free-class.md) |
| Coaching | `/work-with-me/coaching` | Locked | [coaching.md](../../apps/marketing/content/coaching.md) |
| About | `/about` | Locked | [about.md](../../apps/marketing/content/about.md) |
| Speaking | `/work-with-me/speaking` | Locked | [speaking.md](../../apps/marketing/content/speaking.md) |

Reply per page: **approved**, **edit** (with notes), or **defer**.

---

## 3. Domain cutover

Follow [seo-launch-checklist.md](seo-launch-checklist.md) §1.

1. Vercel → **bridge-hub-marketing** → Domains → `carolinejones.co` + `www.carolinejones.co`
2. Registrar DNS per Vercel instructions
3. Both Vercel projects: `NEXT_PUBLIC_MARKETING_URL=https://www.carolinejones.co`
4. Redeploy marketing

Screening subdomain `app.carolinejones.co` can wait.

---

## 4. SEO verification (after domain live)

[seo-launch-checklist.md](seo-launch-checklist.md) §2–4: Search Console, Bing, curl audit, Rich Results Test, OG preview share test.

---

## 5. Phase 3 content wave (post-launch)

Review [phase3-content-proposals.md](phase3-content-proposals.md). Reply per page: **approved**, **edit**, or **defer**. No pages built until approved.

---

## 6. PepTalk outreach (post-launch)

When domain is live and speaking copy signed off:

1. Go to [getapeptalk.com](https://getapeptalk.com/) → list as speaker
2. Topics: Wellness & Culture, Mental Health, Neurodiversity, workplace burnout
3. Link: `https://www.carolinejones.co/work-with-me/speaking` or enquiry form
4. Optional: add PepTalk URL to `CAROLINE_SAME_AS` in `seo.ts` when live

**Pitch angle (short):** Registered nurse, MSc Psychology, psychotherapy trainee. Keynotes on burnout, nervous system regulation, and trauma-informed practice for healthcare, corporate, and education audiences in Ireland. Founder of The Bridge Hub — built a psychoeducational screening tool from lived experience + software engineering.

---

## Dev commands

```bash
npm run dev:marketing          # local :3000
npm run dev:marketing:clean    # if stale .next cache
npm run build:marketing        # verify build before push
SMOKE_MARKETING_URL=https://www.carolinejones.co node scripts/smoke-marketing.mjs
```
