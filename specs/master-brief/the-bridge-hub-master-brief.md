# The Bridge Hub — Trauma Screening App
## Master Project Brief

> **Every chat in this project references this document. Do not deviate from it.**  
> Last updated: June 2026

---

## Project overview

A trauma-informed online screening tool that helps women recognise patterns in trauma symptoms, stress load, dissociation, body awareness, and emotional regulation. This is not a diagnostic tool. It is a gateway — built to help women feel seen, understood, and ready to take the next step of booking a review call with Caroline Jones of The Bridge Hub.

---

## The builder

- **Who:** Caroline Jones, solo builder
- **Technical level:** Intermediate — has built things before, holds a Software Engineering diploma
- **Approach:** Building herself with Claude assistance per workstream
- **Launch target:** 4 weeks from project start

---

## Primary goals (equal weight)

1. Get women to book a review call with Caroline
2. Build the email list
3. Establish authority and trust

---

## Target user

| Attribute | Detail |
|---|---|
| Who | Women aged 28–45, global audience |
| Language | English (multilingual support planned for later) |
| How they feel | Overwhelmed, carrying patterns they cannot name, not in crisis but not okay |
| What they need | To feel seen before being sold to — validation, not diagnosis |
| Entry point | Instagram → landing page → screening → results → booking |

---

## Tech stack — locked

| Layer | Tool |
|---|---|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Database + auth | Supabase — magic link auth, no passwords, EU region data storage |
| Transactional email | Resend |
| Nurture email | Mailchimp |
| Booking | Cal.com embedded directly on results page |
| PDF generation | React PDF (@react-pdf/renderer) |
| Hosting | Vercel (auto-deploy from GitHub) |
| Repository | GitHub (private) |

---

## Design system

| Token | Value |
|---|---|
| Aesthetic | Minimalist, calm, spacious — never clinical |
| Primary background | Off-white `#FAF8F4` |
| Primary text / dark surface | Dark brown `#2C1A0E` |
| Accent | Warm brown `#C4A882` — secondary text and subtle detail |
| Typography | Single serif or humanist sans. Generous line height. No tight text. |
| Imagery | No stock photos. Texture, negative space, or abstract botanical illustration only. |
| Tone | Warm, direct — no clinical language, no toxic positivity |
| Layout | Mobile first always. Desktop is secondary. |

---

## Voice and copy rules

### Always use
- Patterns
- Stress load
- Nervous system regulation
- Body awareness
- Somatic
- Self-trust

### Never use
- Journey
- Nervous system broken (in any form)
- Diagnosis / disorder
- Em dashes ( — )
- Filler phrases ("here's the thing", "the thing is", "genuinely")
- AI-sounding language

### Tone reference
Caroline's voice is warm and direct. Short punchy sentences. Personal stories woven in naturally. Informative but never stiff. Never toxic positivity. Always meets the reader where she is.

---

## Legal and compliance

| Requirement | Detail |
|---|---|
| Standard | GDPR compliant — global audience |
| Data storage | EU region (Supabase) |
| Cookie consent | Banner required on first visit |
| Health data | No health data stored without explicit consent |
| Data tied to | Email address only |
| Right to delete | User can request full data deletion |
| Disclaimer | Must appear on every screen: *"This is a screening tool, not a clinical diagnosis."* |
| Privacy policy | Required before launch |
| Terms of use | Required before launch |

---

## User journey — five stages

### Stage 1 — Landing page
Warm headline that names the feeling before the solution. Single CTA. No account required at this point.

### Stage 2 — Onboarding
Safety notice (what to expect, no right or wrong answers, can pause or stop). Email + first name capture for progress saving and results delivery.

### Stage 3 — Guided screening
Five themed sections: trauma symptoms · stress load · dissociation · body awareness · emotional regulation. Likert scale questions. Clear section-based progress bar (not a percentage countdown). No timer. Pause option visible at all times. Auto-saves per section.

### Stage 4 — Results page
Visual breakdown per section with affirming, non-diagnostic language. Personalised message based on result patterns. PDF generated and emailed automatically. Invitation to book a review call.

### Stage 5 — Booking
Cal.com calendar embedded directly on results page. No redirect. Confirmation email sent automatically with results PDF and Zoom link attached.

---

## Project chat map — one chat per workstream

| Chat | Workstream | Scope |
|---|---|---|
| 01 | Product naming | Name, tagline, domain check, naming rules document |
| 02 | Assessment architecture | Validated tools, question selection, scoring logic, section structure, trauma-informed language rules |
| 03 | Scoring + results logic | Score calculation, result archetypes, affirming language map, PDF template structure |
| 04 | UX + user journey | Screen-by-screen flow, progress logic, save-and-return, mobile-first wireframes |
| 05 | Copy + voice | All written content: landing page, onboarding, question phrasing, results text, emails, booking page |
| 06 | Design system | Colour tokens, typography scale, component library, Tailwind config |
| 07 | Development build | Next.js setup, Supabase schema, quiz state machine, routing, API routes, environment config |
| 08 | Email + automation | Resend transactional setup, Mailchimp integration, welcome sequence, results email + PDF attachment |
| 09 | Booking + conversion | Cal.com embed, intake questions, Zoom auto-link, confirmation flow, CTA placement |
| 10 | GDPR + compliance | Cookie consent, privacy policy, data retention, right to delete, health data handling, terms of use |
| 11 | Testing + launch | QA checklist, mobile testing, accessibility audit, soft launch plan, first-week monitoring |

---

## Global rules — every chat must follow

1. Always paste this brief at the top of the chat before starting work
2. Each chat owns its workstream only — do not stray into another chat's scope
3. Output decisions, not just options — every chat ends with something locked in
4. Mobile first in every UI and copy decision
5. When in doubt about voice, refer to the voice rules section above
6. The disclaimer *"This is a screening tool, not a clinical diagnosis"* must be present in every screen-level output
7. No health data decisions are made without flagging to Chat 10 (GDPR) first

---

## Open decisions (to be resolved in designated chats)

- [ ] Product name — **Chat 01**
- [ ] Domain registered — **after Chat 01**
- [ ] Assessment tool selection — **Chat 02**
- [ ] Scoring methodology — **Chat 03**
- [ ] Font selection — **Chat 06**
- [ ] Privacy policy drafted — **Chat 10**

---

*This document is the single source of truth for the project. If something conflicts with this brief, the brief wins.*
