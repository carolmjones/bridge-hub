# Where Bridge Hub files live

How this project relates to **pipeline** and where to work on each.

---

## Two separate projects, two Cursor windows

| Project | Purpose | Folder | GitHub |
|---------|---------|--------|--------|
| **Bridge Hub** | Trauma-informed online screening tool | `~/bridge-hub` | `carolmjones/bridge-hub` (private) |
| **Pipeline** | Instagram content production (agents, reels, carousels) | `~/pipeline` | `carolmjones/pipeline` |

Open **separate Cursor windows** for each — do not mix in one workspace.

| Task | Open in Cursor |
|------|----------------|
| Bridge Hub app, Supabase, scoring, PDF | **File → Open Folder → `~/bridge-hub`** |
| Reels, Pulse, Vera, Ada, LobsterBoard | **File → Open Folder → `~/pipeline`** |

---

## Bridge Hub repo layout

```
bridge-hub/
├── .cursor/
│   ├── rules/bridge-hub.mdc           ← always-on AI context
│   └── skills/bridge-hub-onboard/       ← run at session start
├── docs/                                ← synthesized docs (start here)
├── specs/
│   ├── cursor-guide/                    ← START_HERE, ARCHITECTURE, etc.
│   ├── chat-03/                         ← scoring (v2 only)
│   ├── chat-04/                         ← UX and wireframes
│   ├── chat-05/                         ← copy and sample report
│   ├── master-brief/
│   └── assets/                          ← logos, backgrounds
├── app/                                 ← (future) Next.js
├── lib/                                 ← (future) scoring, content
└── components/                          ← (future) UI and PDF
```

**Single source of truth:** this repo. Commit and push from here.

---

## Archive copies (do not edit for build work)

| Location | Notes |
|----------|-------|
| `~/Documents/Online Assessment/` | Original planning folder. Duplicates of specs now in `specs/`. |
| `~/Desktop/Application Design/` | Early PDFs and docx. Unique files may be copied to `specs/reference/` later. |

Edits for the build belong in `~/bridge-hub`, then git commit + push.

---

## AI onboarding in Cursor

When you open `~/bridge-hub` in Cursor:

- **Rule:** `.cursor/rules/bridge-hub.mdc` applies automatically.
- **Skill:** Ask the agent to run **bridge-hub-onboard** at the start of a new session, or say: "Onboard to Bridge Hub."

See also [AGENTS.md](../AGENTS.md) at repo root.

---

*Last updated: June 2026*
