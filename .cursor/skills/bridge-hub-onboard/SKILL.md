---
name: bridge-hub-onboard
description: >-
  Onboard to The Bridge Hub project — read stable docs, specs, and git state
  before making changes. Use when starting a new session, when the user asks
  what the project is, what's in progress, or when a new agent needs context
  on the screening app build.
---

# Bridge Hub Onboard

Get up to speed on The Bridge Hub before doing any work. Run this at the start of every new session unless you already have full context from the current conversation.

## What this project is (30-second version)

Trauma-informed online psychological screening tool for women aged 28–45. Five validated instruments, 104 questions, ~15 minutes. Produces a **Nervous System Map** report and converts completions into booked **Clarity Calls**. Next.js 14 monolith on Vercel, Supabase (EU), React PDF, OpenRouter (default: `google/gemini-2.5-pro`).

**This is not** the Caroline Pipeline repo (`~/pipeline`).

## Onboarding checklist

```
- [ ] Read docs/screening/README.md (index — then roadmap)
- [ ] Read docs/current-status.md          ← what's done vs pending
- [ ] Read specs/cursor-guide/START_HERE.md ← locked decisions
- [ ] Read specs/cursor-guide/FILE_OVERVIEW.md ← which spec to use
- [ ] Read task-specific doc (see routing below)
- [ ] Run git status + git log -10
```

## Read order

### 1. Stable context (always)

| File | Why |
|------|-----|
| [docs/README.md](../../docs/README.md) | Project overview, stack, routes, doc index |
| [docs/current-status.md](../../docs/current-status.md) | Planning completion, stale-doc warnings |
| [specs/cursor-guide/START_HERE.md](../../specs/cursor-guide/START_HERE.md) | Locked decisions — do not second-guess |
| [specs/cursor-guide/FILE_OVERVIEW.md](../../specs/cursor-guide/FILE_OVERVIEW.md) | Which spec file to use per task |

### 2. Task-specific (read one or more)

| If working on… | Read |
|----------------|------|
| UI / components | [specs/cursor-guide/DESIGN_SYSTEM.md](../../specs/cursor-guide/DESIGN_SYSTEM.md) + [specs/chat-04/chat-04-wireframe-descriptions-v1.md](../../specs/chat-04/chat-04-wireframe-descriptions-v1.md) |
| API / database / auth | [docs/architecture.md](../../docs/architecture.md) + [specs/cursor-guide/ARCHITECTURE.md](../../specs/cursor-guide/ARCHITECTURE.md) |
| Scoring engine | [specs/chat-03/chat-03-scoring-engine-pseudocode-v2.md](../../specs/chat-03/chat-03-scoring-engine-pseudocode-v2.md) + [specs/chat-03/chat-03-phase2-normative-data-v2.md](../../specs/chat-03/chat-03-phase2-normative-data-v2.md) |
| Copy / client report | [specs/cursor-guide/COPY_REFERENCE.md](../../specs/cursor-guide/COPY_REFERENCE.md) + relevant file from `specs/chat-05/` |
| Therapist briefing | [specs/chat-05/chat-05-therapist-briefing-v1.md](../../specs/chat-05/chat-05-therapist-briefing-v1.md) + [specs/chat-03/chat-03-layer2-content-library-v2.md](../../specs/chat-03/chat-03-layer2-content-library-v2.md) |
| What to build next | [docs/roadmap_screening.md](../../docs/roadmap_screening.md) |
| Pipeline vs Bridge Hub confusion | [docs/ORGANIZATION.md](../../docs/ORGANIZATION.md) |

### 3. Live verification (always)

Run in parallel:

```bash
git status
git log --oneline -10
```

If git shows changes not reflected in `docs/current-status.md`, mention the gap to Caroline.

## Doc roles (don't conflate)

| Doc | Purpose |
|-----|---------|
| `docs/current-status.md` | What planning is done vs pending |
| `docs/roadmap_screening.md` | Screening build phases 0–8 (assessment → launch) |
| `docs/roadmap_marketing.md` | Marketing pages — separate workstream |
| `docs/README.md`, `docs/architecture.md` | Synthesized reference — points to full specs |
| `specs/cursor-guide/` | Authoritative locked decisions for build |
| `specs/chat-03/` through `specs/chat-05/` | Workstream specs — use highest version only |

## Critical rules (always enforce)

1. Mobile first. Desktop is an adaptation of mobile.
2. Disclaimer on every screen: "This is a screening tool, not a clinical diagnosis."
3. No clinical labels in client-facing copy.
4. **Safety flags** — separate table, service role only, never in client pipelines.
5. **PDF only on booking confirmation** (S8). Never before.
6. Forward-only assessment. No back button.
7. Auto-save after every answer.
8. Supabase EU region only.
9. Two Layer 2 versions: `chat-05-layer2-user-facing-v1.md` (client) vs `chat-03-layer2-content-library-v2.md` (therapist). Never mix.

## After onboarding

Summarise for Caroline in 3–5 bullets:
1. What the project does (one line)
2. What's done in planning vs what build phase we're in
3. Any blockers or open items from current-status.md
4. Which spec files are relevant to today's task
5. Anything git showed that the docs missed

Then proceed with the user's task.

## Key paths

```
~/bridge-hub/
├── docs/                    ← start here
├── specs/cursor-guide/      ← locked build decisions
├── specs/chat-03/           ← scoring
├── specs/chat-04/           ← UX / wireframes
├── specs/chat-05/           ← copy / report
├── specs/assets/            ← logos, backgrounds
├── app/                     ← (future) Next.js pages
├── lib/                     ← (future) scoring, content, API
└── components/              ← (future) UI and PDF
```

Secrets: **`.env.local`** (never commit). Repository: **carolmjones/bridge-hub** (private).
