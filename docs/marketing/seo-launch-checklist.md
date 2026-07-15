# SEO launch checklist — Caroline actions

*Run when `carolinejones.co` DNS is ready. Dev SEO (Phase 4b + Phase 4c Phase 1–2) is in code.*

---

## 1. Domain cutover

1. Vercel → **bridge-hub-marketing** → Settings → **Domains** → Add `carolinejones.co` and `www.carolinejones.co`
2. At your registrar, add DNS records Vercel shows (typical: apex A `76.76.21.21`, www CNAME `cname.vercel-dns.com`)
3. Wait for **Valid Configuration**
4. On **both** Vercel projects (marketing + screening), set:
   ```
   NEXT_PUBLIC_MARKETING_URL=https://carolinejones.co
   ```
5. **Redeploy marketing** (canonicals, sitemap, OG tags read this env var)
6. Optional: redirect `www.carolinejones.co` → `carolinejones.co` in Vercel

See also [vercel-setup.md](../vercel-setup.md).

---

## 2. Search Console + Bing

1. **Google Search Console** — verify `carolinejones.co`; submit `https://carolinejones.co/sitemap.xml`
2. **Bing Webmaster Tools** — verify domain; submit same sitemap
3. Run URL Inspection on priority pages: `/`, `/bridge-map`, `/free-class`, `/about`, `/work-with-me/coaching`, `/work-with-me/speaking`

---

## 3. Pre-launch curl audit

Run against preview URL before domain cutover, then again on production:

```bash
# Preview (before domain)
HOST="https://bridge-hub-marketing.vercel.app"

# Production (after domain)
# HOST="https://carolinejones.co"

for path in /robots.txt /sitemap.xml /llms.txt /llms-full.txt /ai.txt /og-default.png /favicon.ico /privacy /terms /about /work-with-me/speaking; do
  curl -s -o /dev/null -w "%{http_code}  $path\n" "$HOST$path"
done
```

Expect `200` for every path.

Or: `SMOKE_MARKETING_URL=$HOST node scripts/smoke-marketing.mjs`

---

## 4. Manual checks

- Share `https://carolinejones.co/` in iMessage or LinkedIn — branded OG preview appears
- [Google Rich Results Test](https://search.google.com/test/rich-results) — no JSON-LD errors on homepage, about, coaching, bridge-map
- View page source — `sameAs` includes Instagram (`https://www.instagram.com/itscarolinejones`); add LinkedIn to `CAROLINE_SAME_AS` in `seo.ts` when URL is confirmed
- Optional: set `NEXT_PUBLIC_GA4_MEASUREMENT_ID` on marketing Vercel project for analytics events

---

## 5. Still pending (optional)

| Item | Notes |
|------|-------|
| LinkedIn URL | Add to `CAROLINE_SAME_AS` when confirmed |
| Phase 3 content pages | See [phase3-content-proposals.md](phase3-content-proposals.md) — approve copy before build |
