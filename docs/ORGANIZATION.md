# Where Bridge Hub files live

Marketing and screening share **one repo** (`~/bridge-hub`). Pipeline is separate.

---

## Projects

| Project | Purpose | Folder | GitHub |
|---------|---------|--------|--------|
| **Bridge Hub** | Marketing site + screening app + API | `~/bridge-hub` | `carolmjones/bridge-hub` |
| **Pipeline** | Instagram content production | `~/pipeline` | `carolmjones/pipeline` |
| **caroline-jones-website** | Retired — redirect only | `~/caroline-jones-website` | — |

---

## Two Cursor windows on bridge-hub

| Window | Work on | Onboard skill |
|--------|---------|---------------|
| **Bridge Hub — Marketing** | Landing, Bridge Map, About, `/free-class` | `bridge-hub-marketing-onboard` |
| **Bridge Hub — Screening** | Questionnaire, scoring, results, PDF, `app/api/` | `bridge-hub-onboard` |

Open **File → Open Folder → `~/bridge-hub`** in each window.

---

## Repo layout

```
bridge-hub/
├── apps/marketing/       ← marketing site (Vercel deploy #2, :3000)
├── app/                  ← screening routes + API (:3001)
├── components/           ← screening UI
├── docs/
│   roadmap_marketing.md
│   roadmap_screening.md
│   marketing/            ← design system, brand
│   screening/
├── specs/                ← screening specs only
└── lib/                  ← scoring, supabase (screening only)
```

See [integration-boundaries.md](integration-boundaries.md).

---

## Funnel

```
Instagram (Pipeline) → Marketing pages (/) → /begin → Screening → Results → Clarity Call
```

---

*Last updated: June 2026*
