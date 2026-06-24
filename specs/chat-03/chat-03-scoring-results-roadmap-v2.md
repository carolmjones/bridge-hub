# The Bridge Hub — Chat 03 Roadmap v2
## Scoring + Results Logic

> **v2 — Updated June 2026**
> This version reflects all architectural decisions made during the Chat 03 working session.
> Significant changes from v1: report architecture redesigned, Layer 2 content library added,
> dimensional framework completed, AI briefing role clarified, fight-flight-freeze-fawn
> inference framework added. See change log at the bottom for full detail.
>
> *If something conflicts with the master brief, the master brief wins.*

---

## Phase completion status

| Phase | Description | Status |
|---|---|---|
| 1 | Scoring engine | **Complete** |
| 2 | Band cutoffs and normative data | **Complete** |
| 3.1 | Single-instrument pattern flags | **Complete** |
| 3.2 | Cross-instrument dimensional framework | **Complete** |
| 3.3 | Edge cases and uncharted profiles | Pending |
| 3.4 | Pattern library structure for AI | Pending |
| 3.5 | Layer 2 content library | Pending — new in v2 |
| 4 | Result archetypes and affirming language | Pending |
| 5 | PDF template structure | Pending |
| 6 | AI clinical briefing generation system | Pending |
| 7 | Touchpoint content | Pending |

---

## Dependency order

Phase 1 must be complete before anything else. Phase 2 depends on Phase 1.
Phase 3.5 (Layer 2 content library) is now a prerequisite for Phase 4 and Phase 6.
Phase 6 depends on Phases 3 and 3.5 being complete.
Phase 7 can run alongside Phase 6.

---

## Phase 1 — Scoring engine — COMPLETE

All five instruments specified with full calculation logic, reverse-score rules, rounding policy,
time tracking, band assignments, clinical meaning per band, safety flag logic, and output fields.

Full specification: `chat-03-scoring-engine-pseudocode-v2.md`

**Key decisions locked in Phase 1:**

- PID-5 uses the Short Form (PID-5-SF, Maples et al. 2015). 12 facets selected.
  3 full domain averages: Negative Affectivity, Detachment, Disinhibition.
  Psychoticism domain average not calculated. Antagonism excluded entirely.
  Depressivity, Unusual Beliefs, Perceptual Dysregulation as standalone facets.
  50 PID-5 items total: 48 SF facet items + 2 supplementary safety items (flag only).

- Total assessment: 115 items. Estimated 35-45 minutes.

- PID-5-SF band thresholds: Lower below 84.13th percentile, Elevated 84.13-93.31,
  Clinically Significant 93.32 or higher. Source: Miller et al. (2022).

- Safety flag items: SF item 26 ("The world would be better off if I were dead") counts
  toward Depressivity facet AND triggers flag. Supplementary items 119 and 178 flag only.

- Safety flag does NOT stop the assessment or withhold results. Person completes the
  full assessment and receives full results regardless. Flag is private notification
  to therapist only. Person dedicated 40+ minutes — their results are theirs.

- PCL-5 probable PTSD threshold: total ≥ 33 (conservative VA cutoff).
  DSM-5 algorithm applied alongside total score.

- MAIA-2: both numeric average and visual band shown in user PDF.
  PID-5-SF standalone facets grouped under one broad heading in user PDF,
  each facet shown discretely within.

- Rounding: 2 decimal places for calculation, 1 decimal for user PDF.

- Time tracking: section_start_time and section_end_time timestamps on every section.
  Application layer captures; scoring function calculates difference.

- No AMPD composite scores. Not included anywhere in the tool.

- No combined global score across instruments under any circumstances.

---

## Phase 2 — Band cutoffs and normative data — COMPLETE

All normative data sourced and confirmed. All lookup functions populated.

Full reference: `chat-03-phase2-normative-data-v2.md`

**Key data locked:**

MAIA-2 — Mehling et al. (2018), N=1,090. Means and SDs per subscale confirmed.
  Cutoffs at 25th/75th percentile using normal distribution.

PSS-10 — Cohen & Janicki-Deverts (2012). M=15.83, SD=7.50.

PHQ-8 — Kroenke et al. (2009), BRFSS N=198,678.
  Validated bands confirmed. Percentile table derived from BRFSS frequency distribution.

PCL-5 normative — Renyer (2016). N=166, M=16.47, SD=16.29.
  Mean-based descriptors: Normal ≤1.23, Mild ≤1.64, Moderate ≤2.455,
  Severe ≤3.265, Extremely Severe >3.265.
PCL-5 clinical — Bovin et al. (2016). N=468, M=36.97, SD=21.16.

PID-5-SF — Miller et al. (2022) via Bryant scoring workbook.
  Full per-facet normative means and SDs extracted. All cutpoints confirmed.
  See normative data reference document for complete table.

---

## Phase 3 — Pattern library — IN PROGRESS

### 3.1 — Single-instrument pattern flags — COMPLETE

20 flags defined across all five instruments:
- PSS-10: PSS-01 through PSS-04 (4 flags)
- PHQ-8: PHQ-01 through PHQ-04 (4 flags)
- PCL-5: PCL-01 through PCL-10 (7 flags)
- MAIA-2: MAIA-01 through MAIA-05 (5 flags)
- PID-5-SF: PID-01 through PID-10 (10 flags including safety flag routing note)

Unusual Beliefs standalone flag deferred to step 3.2.

**Framing decision locked:**
Pattern triggers use band labels as primary trigger language. Specific score thresholds
used only where the band alone does not capture clinical significance.

**Safety flag routing locked:**
PID-10 (any_safety_flag_triggered) documented in pattern library for completeness
but routes to a separate urgent alert to therapist only. Never through AI briefing.
Never user-facing in any form.

**Therapist language locked:**
All pattern documentation uses "Therapist note" throughout.
No references to Caroline specifically. Tool is provider-neutral.
A person can take their assessment to any provider and work with them there.

### 3.2 — Cross-instrument dimensional framework — COMPLETE

**Architecture decision locked:**
Hybrid approach. Dimensional framework is the PRIMARY clinical tool —
runs for every client, every time, answered first. Named patterns are
SUPPLEMENTARY — sit underneath the dimensional framework output as
additional observations. Patterns do not drive the briefing.

**Dimensional framework — 8 questions, all with scoring logic built:**

| Q | Question | Primary instruments |
|---|---|---|
| Q1 | What is the primary distress driver? | All five |
| Q2 | Is somatic regulation available? | MAIA-2, PCL-5 |
| Q3 | Is dissociation a factor? | PID-5-SF, PCL-5, MAIA-2 |
| Q4 | What is the relational pattern? | PID-5-SF |
| Q5 | What does the body relationship look like? | MAIA-2 |
| Q6 | What are the primary resources? | MAIA-2, PSS-10, PID-5-SF, PCL-5 |
| Q7 | What does not fit a clean picture? | All five — contradictions |
| Q8 | What is the dominant nervous system state? | All five — inference |

Q8 (nervous system state) maps fight, flight, freeze, and fawn from instrument
score patterns. No validated open-access instrument exists for direct measurement
of these states. Inference approach confirmed as most clinically appropriate.
Inference caveat appears on every Q8 output.

**Named priority patterns — 9 flags (supplementary only):**

| # | Pattern | Core trigger |
|---|---|---|
| PF-01 | Dissociative presentation | PCL-5 high + Perceptual Dysregulation elevated/significant + MAIA Not-Distracting limited |
| PF-02 | Dissociation without high PTSD | Perceptual Dysregulation significant + PCL-5 low/moderate |
| PF-03 | Disorganised attachment | Separation Insecurity + Intimacy Avoidance both elevated/significant |
| PF-04 | No regulatory capacity | MAIA-2 Self-Regulation limited |
| PF-05 | Full somatic disconnection | All five MAIA-2 bands limited |
| PF-06 | Severe depression | PHQ-8 severe OR moderately severe + Depressivity significant |
| PF-07 | Multi-domain personality distress | Two or more PID-5-SF domains/facets at significant |
| PF-08 | Crisis-adjacent burnout | PSS-10 high + PHQ-8 moderately severe/severe + self-efficacy collapsed |
| PF-09 | Active safety concern | any_safety_flag_triggered — routes separately, never through briefing |

**PTSD-depression comorbidity:** Confirmed as extremely common (50%+ of PTSD presentations).
Treated as standard dimensional framework output rather than a named priority pattern.

**Briefing disclaimer (locked):**
"These findings are hypotheses drawn from validated instrument scores —
starting points for clinical contact, not conclusions about the person.
The person in front of you will always be more than any instrument can capture."

**Uncharted profile notice:**
When no named pattern fires or significant contradictions exist between patterns:
"No defined pattern match. Notable elevations: [list]. Notable low scores: [list].
Score contradictions: [specific contradictions noted]."
No editorial instruction on how to feel about it. Clinical information only.

### 3.3 — Edge cases and uncharted profiles — PENDING

Next step after roadmap update.

### 3.4 — Pattern library structure for AI — PENDING

### 3.5 — Layer 2 content library — PENDING (new in v2, high priority)

**What Layer 2 is:**
Pre-written clinical interpretation blocks drawn from published research literature.
One block per score band per instrument and subscale. Not AI-generated. Stored content.
Describes what scoring in that range means clinically and physiologically,
grounded in the validation literature for each instrument.

**Why this was added:**
The AI should not be the source of clinical interpretation. The published research
is the source. The AI personalises (Layer 1). The research describes (Layer 2).
This makes the tool more accurate, more defensible, and significantly more valuable
to both client and therapist.

**Approximate block count:**
- PSS-10: ~5 blocks
- PHQ-8: ~7 blocks
- PCL-5: ~11 blocks
- MAIA-2: ~20 blocks
- PID-5-SF: ~45 blocks
- Total: approximately 88 pre-written blocks

**Layer 2 is visible to both user and therapist.**
Language register may differ slightly between user PDF and therapist briefing
for some blocks, but content is the same source.

**This phase must be complete before Phase 4 and Phase 6 can be finalised.**

---

## Phase 4 — Result archetypes and affirming language — PENDING

**Updated scope in v2:**
Phase 4 now works within the per-instrument section structure confirmed in v2.
Each instrument section in the user PDF contains:
- Layer 1: personalised plain language description of this person's findings (AI-generated)
- Layer 2: pre-written clinical interpretation block for their score band (from Phase 3.5)
- Layer 3: their item responses (full table, every question and answer)

Phase 4 defines the Layer 1 archetype logic — what the personalised narrative
looks like for each band on each instrument. Full copy goes to Chat 05.

- [ ] **4.1** Define user-facing result archetypes per instrument — one per band level per section.
  Warm, non-diagnostic language. Placeholder text refined in Chat 05.

- [ ] **4.2** Define Touchpoint 1 logic — 1-2 key insights surfaced immediately after completion.
  Selection rule: not every instrument gets surfaced. Pick the most meaningful signal.

- [ ] **4.3** Define personalised letter logic for PDF Page 1 — template structure,
  decision rules for which paragraph blocks appear based on score patterns.

---

## Phase 5 — PDF template structure — PENDING

**Updated scope in v2:**
PDF now has consistent section-by-section structure matching the report architecture.

```
USER PDF STRUCTURE

Cover / acknowledgment

Section 1 — Your stress load (PSS-10)
  Layer 1: personalised findings in plain language
  Layer 2: clinical interpretation block for their band
  Layer 3: their item responses

Section 2 — How life has been feeling lately (PHQ-8)
  [same three-layer structure]

Section 3 — How you live in your body (MAIA-2)
  [same three-layer structure]

Section 4 — What you have been carrying (PCL-5)
  [same three-layer structure]

Section 5 — Your emotional landscape (PID-5-SF)
  [same three-layer structure]

Bringing it together
  Warm synthesis drawing threads across sections
  In Caroline's voice (Chat 05 scope)

Disclaimer
```

```
THERAPIST BRIEFING STRUCTURE

SAFETY ALERT (if triggered — appears before everything else)

Section 1 — Stress load (PSS-10)
  Clinical findings in direct language
  Scores, bands, helplessness/efficacy split
  Instrument-level flags that fired (from step 3.1)
  Item responses

Section 2 — Depression picture (PHQ-8)
  [same structure]

Section 3 — Body awareness (MAIA-2)
  [same structure]

Section 4 — Trauma symptoms (PCL-5)
  [same structure — includes named experience if provided,
  both total score and DSM-5 algorithm result,
  normative and clinical percentiles]

Section 5 — Personality and relational patterns (PID-5-SF)
  [same structure — domain averages, then facets]

Cross-instrument picture
  Dimensional framework Q1-Q8 answered
  Named pattern observations (if any patterns fire)
  Uncharted profile notice (if applicable)

Disclaimer
```

- [ ] **5.1** Specify PDF Page 1 — the letter. Structure, dynamic blocks, score-to-paragraph logic.
- [ ] **5.2** Specify Page 2 — visual aids. Chart type per instrument, band colour treatment.
  MAIA-2: numeric average AND visual per subscale (locked Chat 02).
  PID-5: broad grouping heading with each facet as discrete child element (locked Chat 02).
- [ ] **5.3** Specify visual component list for Chat 06.

---

## Phase 6 — AI clinical briefing generation system — PENDING

**Updated scope in v2:**
The AI now has two distinct generation tasks, not one:

**Task A — Per-instrument section narratives (Part 1 of briefing)**
For each of the five instruments, the AI generates the Layer 1 narrative:
a personalised plain language description of this person's findings in that instrument.
Input: scores and band placements for that instrument.
Output: 2-4 sentences in warm direct language.
The AI does not generate Layer 2 (pre-written) or Layer 3 (item responses).

**Task B — Cross-instrument synthesis (Part 2 of briefing)**
The AI generates the synthesis section drawing from all five instruments.
Input: all scores and bands, dimensional framework answers, pattern library matches.
Output: the eight dimensional framework questions answered, named patterns noted,
contradictions surfaced.

These are separate generation calls with separate prompts and separate constraints.
The AI does not mash everything together. It builds from the specific to the synthesised.

- [ ] **6.1** Design system prompt architecture for Task A (per-instrument narratives).
- [ ] **6.2** Design system prompt architecture for Task B (cross-instrument synthesis).
- [ ] **6.3** Write the briefing prompts grounded in the pattern library from Phase 3.
  Voice layer placeholder for now. Structure and logic is what Chat 03 delivers.
- [ ] **6.4** Define Section F logic (safety flag status in synthesis).
- [ ] **6.5** Specify OpenRouter API integration — model-agnostic, ports cleanly to testing.

---

## Phase 7 — Touchpoint content — PENDING

- [ ] **7.1** Touchpoint 1 — key insights screen. Selection logic, placeholder copy.
- [ ] **7.2** Touchpoint 2 — results delivery email. Subject lines, email body, PDF trigger.
- [ ] **7.3** Touchpoint 3 — post-call debrief template. Structure for therapist to complete.

---

## Global decisions locked in v2

**Report architecture:**
Both user PDF and therapist briefing are structured section by section per instrument,
in order of completion, followed by cross-instrument synthesis.
Same order for both: PSS-10, PHQ-8, MAIA-2, PCL-5, PID-5-SF.

**Three-layer report structure per instrument section:**
- Layer 1: personalised findings in plain language (AI-generated, per client)
- Layer 2: pre-written clinical interpretation for their score band (from research literature)
- Layer 3: full item responses (every question, every answer)
Item responses visible to both user and therapist. They are theirs.

**Language register:**
Main description: plain, warm, human language. No clinical codes in the narrative.
Clinical terms and psychometric specifics appear as the rationale behind conclusions,
not as the description of the person.
Instrument names used in full in rationale ("the PTSD Checklist") not as codes ("PCL-5").

**Tool framing:**
The Bridge Hub is a screening and assessment tool, not a standalone intervention.
A person can take their assessment to any provider. All briefing language is provider-neutral.
No references to specific therapeutic approaches being offered through the tool.

**Safety flag:**
Never stops the assessment. Never withholds results.
Full assessment always completed. Full results always delivered.
Flag is a private notification to therapist only.

**AMPD composites:**
Not included anywhere. Not calculated, not displayed, not referenced.

**Fight-flight-freeze-fawn:**
No validated open-access instrument exists for direct measurement.
Inferred from existing instrument score patterns in Q8 of the dimensional framework.
Always framed as inference. Caveat appears on every Q8 output.

**NovoPsych comparison findings:**
Dual-axis PCL-5 display (normative and clinical) — flag for Chat 06.
PSS-10 self-efficacy labelling — flag for Chat 05.
PHQ-8 vs PHQ-9 — PHQ-8 decision confirmed, no change.
AMPD composites — excluded (decision above).
User item responses — visible to user (decision above).

---

## Handoffs to other chats

| Chat | What Chat 03 delivers |
|---|---|
| Chat 04 (UX) | Score calculation timing, Touchpoint 1 screen content, PDF flow |
| Chat 05 (Copy) | Per-instrument band-level language slots, Layer 1 archetype copy, briefing voice notes, PSS-10 self-efficacy label decision |
| Chat 06 (Design) | PDF visual component specifications, band visual treatment, dual-axis PCL-5 display spec |
| Chat 07 (Dev) | Database schema (item-level + computed scores + flags + Layer 2 block retrieval), API contracts for briefing generation |
| Chat 08 (Email) | Touchpoint 2 email content, PDF attachment trigger, Touchpoint 3 timing |
| Chat 10 (GDPR) | Consent language for AI-assisted synthesis, flag table access patterns |

---

## Change log — v1 to v2

| Change | Detail |
|---|---|
| Report architecture redesigned | Section-by-section per instrument, not mashed synthesis |
| Three-layer structure added | Layer 1 (AI personalised), Layer 2 (pre-written research), Layer 3 (item responses) |
| Item responses | Visible to both user and therapist in all reports |
| Layer 2 content library | New phase 3.5 added — ~88 pre-written clinical interpretation blocks |
| AI role clarified | Two distinct generation tasks, not one. Personalisation only, not interpretation |
| Safety flag intent clarified | Never stops assessment. Never withholds results |
| Tool framing locked | Provider-neutral throughout. Not a standalone intervention |
| AMPD excluded | Not calculated, displayed, or referenced anywhere |
| Fight-flight-freeze-fawn | Added as Q8 in dimensional framework. Inference only, no new instrument |
| Dimensional framework | 8 questions complete with full scoring logic |
| Named patterns | 9 priority flags confirmed. Supplementary to framework, not primary |
| Briefing disclaimer | Locked wording confirmed |
| Uncharted profile notice | Confirmed — information only, no editorial instruction |
| NovoPsych comparison | Surfaced three flags for Chat 05, Chat 06, and confirmed PHQ-8 decision |
| Language register | Plain human language in narrative, clinical terms as rationale only |
| Therapist language | "Therapist note" throughout, not "Caroline's action" |


---

## Phase 3 closeout — all steps complete

| Step | Status | Notes |
|---|---|---|
| 3.1 | Complete | 20 single-instrument flags across 5 instruments |
| 3.2 | Complete | 8-question dimensional framework + 9 priority patterns |
| 3.3 | Complete | 1 completion quality flag at <15 minutes. All other edge cases removed as redundant with Q7 and uncharted profile notice |
| 3.4 | Complete | Full AI input payload structure, output format, constraints, Layer 2 retrieval logic, safety flag handling |
| 3.5 | Complete | ~88 pre-written Layer 2 content blocks across all instruments and bands. Source: published validation literature |

**Phase 3 output documents:**
- `chat-03-scoring-results-roadmap-v2.md` — this document
- `chat-03-scoring-engine-pseudocode-v2.md` — Phase 1 spec
- `chat-03-phase2-normative-data-v2.md` — Phase 2 normative data
- `chat-03-layer2-content-library-v2.md` — Phase 3.5 Layer 2 blocks

**Next phase: Phase 4 — Result archetypes and affirming language**
