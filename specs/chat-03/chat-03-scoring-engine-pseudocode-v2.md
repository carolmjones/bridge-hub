# The Bridge Hub — Scoring Engine Pseudocode
## Phase 1 Complete Specification — v2

> All five instruments documented with calculation logic, reverse-score rules, rounding policy,
> time tracking, clinical meaning per band, and output fields.
> This document is the source of truth for Chat 07 (Development build).
> Last updated: June 2026
>
> **v2 update note:** Report architecture has changed significantly since this document
> was first written. The scoring engine calculation logic is unchanged — all calculation
> methods, reverse scoring, band assignments, safety flags, and output fields remain
> exactly as specified below. What has changed is how outputs are used in the report
> and what the AI does with them.
>
> **Key changes for Chat 07 to note:**
>
> - **Report structure:** Both the therapist briefing and user PDF are now structured
>   section by section per instrument, in order of completion (PSS-10, PHQ-8, MAIA-2,
>   PCL-5, PID-5-SF), followed by a cross-instrument synthesis section.
>   The AI generates per-instrument narratives first (Task A), then synthesis second
>   (Task B). These are separate generation calls with separate prompts.
>
> - **Three-layer section structure:** Each instrument section contains:
>   Layer 1 — AI-generated personalised narrative for this client (warm, plain language)
>   Layer 2 — Pre-written clinical interpretation block for their score band (from
>   published research literature, stored content, not AI-generated)
>   Layer 3 — Full item responses (every question, every answer)
>   Chat 07 must support retrieval of the correct Layer 2 block by instrument + band.
>
> - **Item responses:** Every item response is visible to both the user and the therapist
>   in their respective reports. The scoring engine must output item-level responses
>   alongside computed scores. This was already specified in the output fields below —
>   confirmed and locked. Item responses are theirs. Always shown.
>
> - **Safety flag:** Does NOT stop the assessment or withhold results. The person
>   completes the full assessment and receives their full results regardless.
>   The flag is a private notification to the therapist only, routed to a separate
>   table. Architecturally unchanged — intent now explicit.
>
> - **Language in reports:** Clinical codes (PCL-5, PHQ-8 etc) appear in the rationale
>   layer, not in the main narrative description. Instrument names are used in full
>   in rationale text ("the PTSD Checklist") not as codes. The narrative layer uses
>   plain human language only.
>
> - **No AMPD composites:** Not calculated, not stored, not displayed anywhere.
>
> - **Tool framing:** Provider-neutral throughout. The Bridge Hub is an assessment tool.
>   A person can take their results to any provider. No references to specific
>   interventions being offered through the tool.
>
> - **Fight-flight-freeze-fawn:** Inferred from existing scores in Q8 of the dimensional
>   framework. No additional instrument required or added.
>
> See `chat-03-scoring-results-roadmap-v2.md` for full architectural detail.

---

## Global rules applying to all instruments

**Rounding policy**
- Calculation: round to 2 decimal places
- Caroline's view: display 2 decimal places
- User PDF: display 1 decimal place

**Time tracking**
- Each scoring function receives section_start_time and section_end_time as inputs
- time_taken_seconds = section_end_time - section_start_time
- Timestamps captured at the application layer by the section state machine (Chat 07)
- Time tracking applies to every instrument without exception

**Reverse scoring**
- Reverse-score flags stored as boolean per item in the database
- Values inverted before summing — never after
- Instrument-specific reverse formulas documented per instrument below

**Data separation**
- User-facing output: results page, PDF, automated emails
- Caroline-facing output: clinical dashboard only
- Safety flag output: separate database table, no access from any user-facing pipeline
- Separation enforced at architectural level (Chat 07), not just application layer

**Disclaimer**
- "This is a screening tool, not a clinical diagnosis" present on every screen
- Never implied or contradicted by any output field or language

---

## Instrument 1 — PSS-10
### Perceived Stress Scale

**Reference:** Cohen, S., & Williamson, G. (1988). Perceived stress in a probability sample of the United States.

**Structure:** 10 items, 0-4 scale, reference period past month.

---

```
FUNCTION score_pss10(responses, section_start_time, section_end_time):

  INPUT:
    responses = { item_1 through item_10, each 0-4 }
    section_start_time: timestamp
    section_end_time:   timestamp

  STEP 1 — Reverse score items 4, 5, 7, 8:
    reverse(n) = 4 - n
    item_4 = reverse(item_4)
    item_5 = reverse(item_5)
    item_7 = reverse(item_7)
    item_8 = reverse(item_8)

  STEP 2 — Calculate total:
    total = sum(item_1 through item_10)      // 0-40

  STEP 3 — Calculate mean total:
    mean_total = round(total / 10, 2)         // 0.00-4.00

  STEP 4 — Assign severity band:
    IF total <= 13:      band = "low"
    ELSE IF total <= 26: band = "moderate"
    ELSE:                band = "high"

  STEP 5 — Calculate factor splits (Caroline-facing only):
    helplessness_score  = sum(item_1, item_2, item_3, item_6, item_9, item_10)
    // Uses post-reversal values. Range: 0 to 24.

    self_efficacy_score = sum(item_4, item_5, item_7, item_8)
    // Uses post-reversal values. Range: 0 to 16.

  STEP 6 — Calculate normative percentile:
    // Sourced in Phase 2 from Cohen & Janicki-Deverts (2012)
    // US general adult population, mean 15.5
    normative_percentile = lookup_pss10_normative_percentile(total)

  STEP 7 — Calculate time taken:
    time_taken_seconds = section_end_time - section_start_time

  OUTPUT (user-facing):
    pss10_total: int
    pss10_band: string                       // "low" | "moderate" | "high"

  OUTPUT (Caroline-facing, additional):
    pss10_mean_total: float                  // 0.00-4.00, 2 decimals
    pss10_helplessness: int                  // 0-24
    pss10_self_efficacy: int                 // 0-16
    pss10_normative_percentile: float
    pss10_time_taken_seconds: int
    pss10_item_responses: object             // raw responses, pre-reversal
```

---

### PSS-10 — Clinical meaning per band

```
BAND: "low" (0-13)
  Research meaning:
    Person feels generally able to cope with life demands.
    Stress is not appraised as overwhelming.
    US general population mean is 15.5 (Cohen & Janicki-Deverts, 2012)
    — a low score is below average for the general adult population.

  Clinical note for Caroline:
    Low PSS-10 combined with elevated scores elsewhere (PCL-5, PHQ-8,
    PID-5) may indicate disconnection from stress awareness rather than
    genuine low stress load. Flag for pattern library.

  Direction for affirming language (Chat 05):
    Acknowledge capacity without minimising. Some women genuinely
    have strong coping resources — name that as a strength.

BAND: "moderate" (14-26)
  Research meaning:
    Some sense of overload and difficulty controlling life circumstances.
    Most adults score in this range.
    At this level, stress appraisal is beginning to affect coping capacity
    but has not yet reached the threshold associated with clinical risk.

  Clinical note for Caroline:
    Most meaningful signal at moderate band is the helplessness vs
    self-efficacy split. High helplessness + low self-efficacy at a
    moderate total score is closer to the high band clinically.
    Flag this combination in pattern library.

  Direction for affirming language (Chat 05):
    Meet her where she is — name the weight she is carrying without
    catastrophising. Validate that this is real and it makes sense.

BAND: "high" (27-40)
  Research meaning:
    Person experiences life as unpredictable, uncontrollable,
    and overwhelming.
    Sustained scores at this level are associated with:
      - Elevated biological aging markers
      - Higher cortisol levels
      - Suppressed immune function
      - Greater susceptibility to infectious disease
      - Slower wound healing
      - Greater infection-induced release of pro-inflammatory cytokines
      - Higher prostate-specific antigen levels
      (Cohen & Janicki-Deverts, 2012)
    Persons scoring high also report poorer health practices:
      - Sleeping fewer hours
      - Skipping breakfast
      - Higher alcohol consumption
      (Cohen & Williamson, 1988)

  Clinical note for Caroline:
    High PSS-10 with low PCL-5 points toward current life-load as
    the primary driver rather than past trauma — different treatment
    focus. High PSS-10 with high PCL-5 suggests trauma is actively
    contributing to stress appraisal — address both.

  Direction for affirming language (Chat 05):
    This score carries real weight. Language must acknowledge that
    without alarming. The body is already paying a price — she
    needs to feel that named, not minimised.

FACTOR SPLIT — clinical meaning (Caroline-facing only):
  High helplessness + low self-efficacy:
    Learned helplessness pattern. Burnout territory.
    Significantly different clinical picture from moderate helplessness
    with intact self-efficacy — treat as functionally higher severity
    regardless of total score.

  Low helplessness + low self-efficacy:
    Possible disconnection from stress experience. May be suppressing
    awareness of overload. Cross-reference with MAIA-2 Not-Distracting
    and PCL-5 Avoidance cluster.
```

---

## Instrument 2 — PHQ-8
### Patient Health Questionnaire-8

**Reference:** Kroenke, K., Strine, T. W., Spitzer, R. L., Williams, J. B. W., Berry, J. T., & Mokdad, A. H. (2009). The PHQ-8 as a measure of current depression in the general population. Journal of Affective Disorders, 114, 163-173.

**Structure:** 8 items, 0-3 scale, reference period past two weeks. PHQ-9 with item 9 (suicidal ideation) removed. Suicidal ideation captured separately via PID-5-SF Depressivity items with private safety flagging.

---

```
FUNCTION score_phq8(responses, section_start_time, section_end_time):

  INPUT:
    responses = { item_1 through item_8, each 0-3 }
    section_start_time: timestamp
    section_end_time:   timestamp

  STEP 1 — No reverse scoring required.

  STEP 2 — Calculate total:
    total = sum(item_1 through item_8)       // 0-24

  STEP 3 — Calculate mean total:
    mean_total = round(total / 8, 2)          // 0.00-3.00

  STEP 4 — Assign Caroline-facing severity band (5 tiers):
    IF total <= 4:       clinical_band = "none_minimal"
    ELSE IF total <= 9:  clinical_band = "mild"
    ELSE IF total <= 14: clinical_band = "moderate"
    ELSE IF total <= 19: clinical_band = "moderately_severe"
    ELSE:                clinical_band = "severe"

  STEP 5 — Assign user-facing band (3 tiers, collapsed):
    IF total <= 9:       user_band = "low"
    ELSE IF total <= 14: user_band = "moderate"
    ELSE:                user_band = "high"

  STEP 6 — Calculate thematic splits (Caroline-facing only):
    cognitive_affective_score = sum(item_1, item_2, item_6)          // 0-9
    somatic_vegetative_score  = sum(item_3, item_4, item_5, item_8)  // 0-12
    functional_score          = item_7                               // 0-3

  STEP 7 — Calculate normative percentile:
    // Sourced in Phase 2 from Kroenke et al. (2009)
    // CDC Behavioral Risk Factor Surveillance System (N = 198,678)
    normative_percentile = lookup_phq8_normative_percentile(total)

  STEP 8 — Calculate time taken:
    time_taken_seconds = section_end_time - section_start_time

  OUTPUT (user-facing):
    phq8_total: int
    phq8_user_band: string                   // "low" | "moderate" | "high"

  OUTPUT (Caroline-facing, additional):
    phq8_mean_total: float                   // 0.00-3.00, 2 decimals
    phq8_clinical_band: string               // 5-tier validated band
    phq8_cognitive_affective: int            // 0-9
    phq8_somatic_vegetative: int             // 0-12
    phq8_functional: int                     // 0-3
    phq8_normative_percentile: float
    phq8_time_taken_seconds: int
    phq8_item_responses: object
```

---

### PHQ-8 — Clinical meaning per band

```
CLINICAL BAND: "none_minimal" (0-4)  →  USER BAND: "low"
  Research meaning:
    Depression symptoms not clinically significant.
    Below the threshold at which treatment is typically indicated.

  Clinical note for Caroline:
    Low PHQ-8 combined with high PID-5 Depressivity (trait-level
    depression) suggests possible somatic-emotional disconnect or
    recent state improvement that does not reflect underlying pattern.
    Flag for pattern library.

  Direction for affirming language (Chat 05):
    Validate where she is in this moment. Avoid implying she should
    feel worse than she does. Some women come in stable on mood and
    still need support on other patterns.

CLINICAL BAND: "mild" (5-9)  →  USER BAND: "low"
  Research meaning:
    Some symptoms present.
    Watchful waiting may be appropriate in clinical settings.
    Not yet at the threshold for active treatment.

  Clinical note for Caroline:
    Mild PHQ-8 can mask a clinically significant pattern when paired
    with high PID-5 Depressivity (long-standing trait-level depression)
    or high PCL-5 Cluster D (negative cognitions and mood).
    Cross-reference before interpreting as low concern.

  Direction for affirming language (Chat 05):
    Name that something is being carried, gently. Not crisis language.
    Acknowledge that "not bad" is not the same as "well".

CLINICAL BAND: "moderate" (10-14)  →  USER BAND: "moderate"
  Research meaning:
    Clinically meaningful depression.
    Treatment indicated in clinical settings.
    A score of 10 or higher has sensitivity of 88% and specificity of 88%
    for major depression (Kroenke & Spitzer, 2002).

  Clinical note for Caroline:
    At this threshold, the pattern is real and active. The cognitive vs
    somatic split matters here:
      - High cognitive + low somatic: dysthymia or trait-level depressive
        thinking. Often longer-standing, less acute.
      - High somatic + low cognitive: depression presenting in the body.
        Possible somatization, trauma-driven, or medical contribution.
      - Both elevated: classic depressive presentation.

  Direction for affirming language (Chat 05):
    Meet her clearly. She is depressed enough that the experience is
    organising her days. Name it as real, name it as something that
    responds to support.

CLINICAL BAND: "moderately_severe" (15-19)  →  USER BAND: "high"
  Research meaning:
    Active depressive disorder warranting active treatment.
    Functional impairment is consistently present at this level.

  Clinical note for Caroline:
    At this band, the screening tool is signalling that professional
    support is indicated. The Bridge Hub work may still be appropriate
    but she may also need parallel clinical care.
    Cross-reference with PID-5 Depressivity safety flags (item 26,
    supplementary items 119 and 178) — if any triggered, refer out
    before proceeding.

  Direction for affirming language (Chat 05):
    Acknowledge the weight directly. The language needs to convey
    that what she is experiencing is real and serious without
    catastrophising. Gentle redirection toward professional support.

CLINICAL BAND: "severe" (20-24)  →  USER BAND: "high"
  Research meaning:
    Severe depressive disorder.
    Combined treatment (therapy + medication) typically required.
    Highly responsive to intervention when treated.

  Clinical note for Caroline:
    Refer out. The Bridge Hub is not the right setting as the primary
    intervention at this severity. Caroline's role here is signposting
    to clinical care and remaining a possible support after stabilisation.
    Combine with safety flag protocol if any PID-5 Depressivity flags
    triggered.

  Direction for affirming language (Chat 05):
    Hold her with care. The language must not minimise but must also
    not frighten. The result page should make professional support
    feel like the obvious, supported next step.

THEMATIC SPLIT — clinical meaning (Caroline-facing only):
  High cognitive_affective + low somatic_vegetative:
    Inner experience of depression without strong body expression.
    Often correlates with dysthymia or chronic depressive cognition.

  Low cognitive_affective + high somatic_vegetative:
    Depression living in the body. Sleep, fatigue, appetite, psychomotor
    changes carry the load. Often trauma-adjacent or somatic presentation.
    Cross-reference with MAIA-2 Self-Regulation and PCL-5 Cluster E.

  Both elevated:
    Classic full depressive presentation. Treatment indicated.
```

---

## Instrument 3 — PCL-5
### PTSD Checklist for DSM-5

**Reference:** Weathers, F. W., Litz, B. T., Keane, T. M., Palmieri, P. A., Marx, B. P., & Schnurr, P. P. (2013). The PTSD Checklist for DSM-5 (PCL-5). National Center for PTSD.

**Structure:** 20 items, 0-4 scale, reference period past month, anchored to a named or held worst event. No reverse scoring.

---

```
// STATIC METADATA — descriptive endpoint pairs per cluster
CLUSTER_ENDPOINTS = {
  cluster_b_intrusion: {
    low_end:  "Intrusive re-experiencing not prominent",
    high_end: "Active re-experiencing and flooding"
  },
  cluster_c_avoidance: {
    low_end:  "Not organising life around avoidance",
    high_end: "Systematic avoidance of trauma reminders"
  },
  cluster_d_negative: {
    low_end:  "Core beliefs and mood relatively stable",
    high_end: "Trauma has affected beliefs and self-concept"
  },
  cluster_e_arousal: {
    low_end:  "Nervous system relatively regulated",
    high_end: "Persistent hyperarousal and reactivity"
  }
}

FUNCTION score_pcl5(responses, worst_event, section_start_time, section_end_time):

  INPUT:
    responses = { item_1 through item_20, each 0-4 }
    worst_event: string | null
    section_start_time: timestamp
    section_end_time:   timestamp

  STEP 1 — No reverse scoring required.

  STEP 2 — Calculate raw total score:
    total = sum(item_1 through item_20)      // 0-80

  STEP 3 — Calculate raw cluster sub-scores:
    cluster_b_intrusion = sum(item_1, item_2, item_3, item_4, item_5)
    // Range: 0-20

    cluster_c_avoidance = sum(item_6, item_7)
    // Range: 0-8

    cluster_d_negative  = sum(item_8, item_9, item_10, item_11,
                              item_12, item_13, item_14)
    // Range: 0-28

    cluster_e_arousal   = sum(item_15, item_16, item_17, item_18,
                              item_19, item_20)
    // Range: 0-24

  STEP 4 — Calculate mean scores (raw / item count):
    mean_total     = round(total / 20, 2)                  // 0.00-4.00
    mean_cluster_b = round(cluster_b_intrusion / 5, 2)     // 0.00-4.00
    mean_cluster_c = round(cluster_c_avoidance / 2, 2)     // 0.00-4.00
    mean_cluster_d = round(cluster_d_negative / 7, 2)      // 0.00-4.00
    mean_cluster_e = round(cluster_e_arousal / 6, 2)       // 0.00-4.00
    // Mean scores normalise clusters to 0-4 scale for direct comparison

  STEP 5 — Assign Caroline-facing raw severity band (5 tiers):
    IF total <= 10:      raw_clinical_band = "minimal"
    ELSE IF total <= 20: raw_clinical_band = "mild"
    ELSE IF total <= 30: raw_clinical_band = "moderate"
    ELSE IF total <= 40: raw_clinical_band = "moderately_severe"
    ELSE:                raw_clinical_band = "severe"

  STEP 6 — Assign mean-based descriptor (NovoPsych convention):
    // Applied to total mean score and each cluster mean independently
    FUNCTION mean_descriptor(mean_score):
      IF mean_score <= 1.23:       RETURN "normal"
      ELSE IF mean_score <= 1.64:  RETURN "mild"
      ELSE IF mean_score <= 2.455: RETURN "moderate"
      ELSE IF mean_score <= 3.265: RETURN "severe"
      ELSE:                        RETURN "extremely_severe"

    descriptor_total     = mean_descriptor(mean_total)
    descriptor_cluster_b = mean_descriptor(mean_cluster_b)
    descriptor_cluster_c = mean_descriptor(mean_cluster_c)
    descriptor_cluster_d = mean_descriptor(mean_cluster_d)
    descriptor_cluster_e = mean_descriptor(mean_cluster_e)

  STEP 7 — Assign user-facing band (3 tiers, collapsed):
    IF total <= 20:      user_band = "low"
    ELSE IF total <= 30: user_band = "moderate"
    ELSE:                user_band = "high"

  STEP 8 — Apply probable PTSD threshold:
    probable_ptsd_by_total = (total >= 33)
    // VA-recommended conservative cutoff
    // Bovin et al. (2016); Kruger-Gottschalk et al. (2017)

  STEP 9 — DSM-5 algorithm with symptom counts:
    // Symptom present = item score >= 2 (Moderately)
    cluster_b_symptom_count = count(items 1-5 where score >= 2)
    cluster_c_symptom_count = count(items 6-7 where score >= 2)
    cluster_d_symptom_count = count(items 8-14 where score >= 2)
    cluster_e_symptom_count = count(items 15-20 where score >= 2)

    cluster_b_required = 1
    cluster_c_required = 1
    cluster_d_required = 2
    cluster_e_required = 2

    dsm5_algorithm_met = (
      cluster_b_symptom_count >= cluster_b_required AND
      cluster_c_symptom_count >= cluster_c_required AND
      cluster_d_symptom_count >= cluster_d_required AND
      cluster_e_symptom_count >= cluster_e_required
    )

  STEP 10 — Identify dominant cluster:
    // Mean scores are normalised to 0-4 — directly comparable
    dominant_cluster = cluster with highest mean score
    // Returns: "B" | "C" | "D" | "E"

  STEP 11 — Look up percentile placements:
    // Sourced in Phase 2
    normative_percentile = lookup_pcl5_normative_percentile(total)
    // Source: Bovin et al. (2016) general population sample

    clinical_percentile = lookup_pcl5_clinical_percentile(total)
    // Source: PTSD treatment-seeking samples, multiple published sources

  STEP 12 — Calculate time taken:
    time_taken_seconds = section_end_time - section_start_time

  OUTPUT (user-facing):
    pcl5_total: int
    pcl5_user_band: string                   // "low" | "moderate" | "high"
    pcl5_cluster_b_intrusion: int            // 0-20
    pcl5_cluster_c_avoidance: int            // 0-8
    pcl5_cluster_d_negative: int             // 0-28
    pcl5_cluster_e_arousal: int              // 0-24
    // Cluster scores shown as visual breakdown on PDF Page 2

  OUTPUT (Caroline-facing, additional):
    pcl5_mean_total: float                   // 0.00-4.00, 2 decimals
    pcl5_mean_cluster_b: float
    pcl5_mean_cluster_c: float
    pcl5_mean_cluster_d: float
    pcl5_mean_cluster_e: float
    pcl5_raw_clinical_band: string           // 5-tier raw band
    pcl5_descriptor_total: string            // mean-based descriptor
    pcl5_descriptor_cluster_b: string
    pcl5_descriptor_cluster_c: string
    pcl5_descriptor_cluster_d: string
    pcl5_descriptor_cluster_e: string
    pcl5_probable_ptsd_by_total: bool        // total >= 33
    pcl5_dsm5_algorithm_met: bool
    pcl5_cluster_b_symptom_count: int        // e.g. "5 symptoms present"
    pcl5_cluster_c_symptom_count: int
    pcl5_cluster_d_symptom_count: int
    pcl5_cluster_e_symptom_count: int
    pcl5_dominant_cluster: string            // "B" | "C" | "D" | "E"
    pcl5_normative_percentile: float         // vs general population
    pcl5_clinical_percentile: float          // vs PTSD clinical sample
    pcl5_worst_event_text: string | null
    pcl5_time_taken_seconds: int
    pcl5_item_responses: object
```

---

### PCL-5 — Clinical meaning per band

```
CLINICAL BAND: "minimal" (0-10)  →  USER BAND: "low"
  Research meaning:
    Trauma symptoms not at a clinically significant level over
    the past month in relation to the named or held experience.

  Clinical note for Caroline:
    Low PCL-5 combined with high PID-5 scores (especially Depressivity,
    Perceptual Dysregulation, or elevated Negative Affectivity domain)
    may indicate minimisation, avoidance, or that the woman did not
    anchor to the most impactful experience.
    Cross-reference Avoidance cluster — if Cluster C is high relative
    to total, suggests organised suppression. Flag for pattern library.

  Direction for affirming language (Chat 05):
    Validate. Some women carry trauma history but the past month has
    been stable. Name that as a real state, not denial. Avoid wording
    that implies she "should" be experiencing symptoms.

CLINICAL BAND: "mild" (11-20)  →  USER BAND: "low"
  Research meaning:
    Some trauma symptoms present in the past month.
    Below the threshold for probable PTSD.
    Symptoms may still affect daily life in meaningful ways.

  Clinical note for Caroline:
    Mild band can mask a clinically relevant pattern if the DSM-5
    algorithm is met or if a single cluster is disproportionately
    elevated. Check the algorithm flag and dominant cluster pattern
    before interpreting as low concern.

  Direction for affirming language (Chat 05):
    Acknowledge that something is present. Not crisis territory but
    real. "Some of this is showing up" rather than "you're fine".

CLINICAL BAND: "moderate" (21-30)  →  USER BAND: "moderate"
  Research meaning:
    Trauma symptoms are present and active over the past month.
    Below the probable PTSD threshold but functionally meaningful.
    Treatment can be helpful at this level.

  Clinical note for Caroline:
    The cluster pattern matters as much as the total here:
      - High Intrusion + low Avoidance: active processing. Often
        responds well to trauma-focused therapy (EMDR, exposure, CPT).
      - High Avoidance + low Intrusion: organised suppression.
        May need stabilisation before trauma processing.
      - High Cluster D: often co-occurring depression or dissociative
        numbing. Cross-reference PHQ-8 and PID-5 Perceptual Dysregulation.
      - High Cluster E: nervous system dysregulation central.
        Somatic and polyvagal-informed work indicated.

  Direction for affirming language (Chat 05):
    Direct acknowledgment. "What you've been carrying is here, and
    it's affecting you." Avoid clinical language but do not soften
    into vagueness.

CLINICAL BAND: "moderately_severe" (31-40)  →  USER BAND: "high"
  Research meaning:
    Meets or exceeds the VA-recommended probable PTSD threshold.
    Active PTSD presentation is likely.
    Comprehensive trauma treatment indicated.

  Clinical note for Caroline:
    At this band, also check whether the DSM-5 algorithm is met.
    The two indicators (total cutoff and algorithm) can diverge:
      - Total above 33 but algorithm not met: broad activation
        without the specific symptom pattern. Possible complex
        presentation or measurement of overlapping conditions.
      - Algorithm met but total below 33: focused PTSD pattern
        with lower overall symptom intensity. Still clinically
        meaningful.
    Both flagged in the clinical briefing.

  Direction for affirming language (Chat 05):
    Acknowledge the weight. The language must validate without
    diagnosing — she has not been diagnosed by this tool. Frame it
    as patterns showing up clearly enough to deserve real support.

CLINICAL BAND: "severe" (41-80)  →  USER BAND: "high"
  Research meaning:
    Severe PTSD presentation.
    Substantial functional impairment expected.
    Comprehensive, often combined treatment indicated.

  Clinical note for Caroline:
    Refer in or refer out depending on her clinical context. The
    Bridge Hub work can be a supporting layer but not the primary
    intervention at this severity. Cross-reference with PID-5
    Depressivity safety flags and Perceptual Dysregulation
    (dissociation) facet before any next steps.

  Direction for affirming language (Chat 05):
    Hold her with care. Direct, validating, signposting toward
    appropriate clinical support. The result must not catastrophise
    but must not minimise.

DSM-5 ALGORITHM — clinical meaning (Caroline-facing only):
  Algorithm met + total >= 33:
    Strong convergent signal for probable PTSD. Both severity and
    symptom pattern support the conclusion.

  Algorithm met + total < 33:
    Focused PTSD presentation. Symptom pattern is specific to
    trauma but overall intensity is lower. Still clinically meaningful.

  Algorithm not met + total >= 33:
    Elevated total without the required symptom distribution.
    May indicate trauma symptoms diffused across other presentations,
    or measurement capturing co-occurring conditions. Worth probing
    in the call.

CLUSTER PATTERN — clinical meaning (Caroline-facing only):
  Dominant Cluster B (Intrusion):
    Re-experiencing is central. Active trauma material is breaking
    through. Often more responsive to trauma-processing therapies.

  Dominant Cluster C (Avoidance):
    Organised suppression. Life is structured to keep trauma material
    contained. Often needs stabilisation and behavioural activation
    before trauma processing.

  Dominant Cluster D (Negative Cognitions and Mood):
    Trauma has affected core beliefs and self-concept. Often co-occurring
    depression or dissociative numbing. Cross-reference PHQ-8 and PID-5
    Depressivity. Inner narrative work is central.

  Dominant Cluster E (Arousal and Reactivity):
    Nervous system dysregulation is the primary expression. Sleep,
    hypervigilance, startle, irritability dominate. Somatic and
    polyvagal-informed work is the priority. Strongly cross-references
    MAIA-2 Self-Regulation.

  All four clusters elevated:
    Full PTSD presentation. Comprehensive trauma treatment indicated.
    Higher total scores predict greater functional impairment.

ANCHORING NOTE:
  PCL-5 is anchored to a specific event throughout the section.
  The optional worst_event_text field is shown to Caroline as
  context for the cluster pattern. If the field is empty, the
  woman held the event in mind without writing — her responses
  are still valid. The text is never used to validate or invalidate
  scores. It only provides context for Caroline's call preparation.
```

---

## Instrument 4 — MAIA-2
### Multidimensional Assessment of Interoceptive Awareness v2

**Reference:** Mehling, W. E., Acree, M., Stewart, A., Silas, J., & Jones, A. (2018). The Multidimensional Assessment of Interoceptive Awareness, Version 2 (MAIA-2). PLOS ONE, 13(12), e0208034.

**Structure:** 27 items selected from 37 (5 of 8 subscales). Each item 0-5. No overall total score by design. Each subscale interpreted independently.

**Excluded subscales:** Noticing (redundant), Body Listening (too aspirational for target user), Trusting (reserved for therapeutic work, not screening).

---

```
// STATIC METADATA — descriptive endpoint pairs per subscale
SUBSCALE_ENDPOINTS = {
  not_distracting: {
    low_end:  "Distracts away from discomfort",
    high_end: "Stays present with discomfort"
  },
  not_worrying: {
    low_end:  "Body sensations trigger worry",
    high_end: "Body sensations met with steadiness"
  },
  attention_regulation: {
    low_end:  "Difficulty attending to the body",
    high_end: "Sustained body attention available"
  },
  emotional_awareness: {
    low_end:  "Limited body-emotion connection",
    high_end: "Strong body-emotion connection"
  },
  self_regulation: {
    low_end:  "Body not used for regulation",
    high_end: "Body used to return to baseline"
  }
}

FUNCTION score_maia2(responses, section_start_time, section_end_time):

  INPUT:
    responses = { item_5 through item_31, each 0-5 }
    // Items numbered per original MAIA-2 instrument
    section_start_time: timestamp
    section_end_time:   timestamp

  STEP 1 — Apply reverse scoring:
    reverse(n) = 5 - n

    // Not-Distracting: ALL 6 items reverse-scored
    item_5  = reverse(item_5)
    item_6  = reverse(item_6)
    item_7  = reverse(item_7)
    item_8  = reverse(item_8)
    item_9  = reverse(item_9)
    item_10 = reverse(item_10)

    // Not-Worrying: items 11, 12, 15 reverse-scored
    // Items 13, 14 are positively worded — NOT reverse-scored
    item_11 = reverse(item_11)
    item_12 = reverse(item_12)
    item_15 = reverse(item_15)

    // Attention Regulation, Emotional Awareness, Self-Regulation:
    // NO reverse scoring

  STEP 2 — Calculate subscale averages (post-reversal values):
    // ROUNDING POLICY: 2 decimal places for calculation
    // User PDF displays 1 decimal place

    not_distracting_avg = round(sum(item_5, item_6, item_7, item_8,
                                    item_9, item_10) / 6, 2)         // 0.00-5.00

    not_worrying_avg    = round(sum(item_11, item_12, item_13,
                                    item_14, item_15) / 5, 2)        // 0.00-5.00

    attention_reg_avg   = round(sum(item_16, item_17, item_18, item_19,
                                    item_20, item_21, item_22) / 7, 2) // 0.00-5.00

    emotional_aware_avg = round(sum(item_23, item_24, item_25,
                                    item_26, item_27) / 5, 2)        // 0.00-5.00

    self_regulation_avg = round(sum(item_28, item_29, item_30,
                                    item_31) / 4, 2)                 // 0.00-5.00

  STEP 3 — Look up percentile placement per subscale:
    // Each subscale has its own normative distribution
    // Sourced in Phase 2 from Mehling et al. (2018), N = 1,090
    not_distracting_percentile = lookup_maia2_percentile("not_distracting", not_distracting_avg)
    not_worrying_percentile    = lookup_maia2_percentile("not_worrying", not_worrying_avg)
    attention_reg_percentile   = lookup_maia2_percentile("attention_regulation", attention_reg_avg)
    emotional_aware_percentile = lookup_maia2_percentile("emotional_awareness", emotional_aware_avg)
    self_regulation_percentile = lookup_maia2_percentile("self_regulation", self_regulation_avg)

  STEP 4 — Assign three-tier band per subscale:
    FUNCTION maia2_band(percentile):
      IF percentile < 25:      RETURN "limited"
      ELSE IF percentile <= 75: RETURN "developing"
      ELSE:                     RETURN "strong"

    not_distracting_band = maia2_band(not_distracting_percentile)
    not_worrying_band    = maia2_band(not_worrying_percentile)
    attention_reg_band   = maia2_band(attention_reg_percentile)
    emotional_aware_band = maia2_band(emotional_aware_percentile)
    self_regulation_band = maia2_band(self_regulation_percentile)

  STEP 5 — Calculate time taken:
    time_taken_seconds = section_end_time - section_start_time

  OUTPUT (user-facing):
    // Numeric displayed rounded to 1 decimal place alongside visual band
    // Locked Chat 02 decision: show BOTH numeric average AND visual band
    maia2_not_distracting_avg: float         // 0.00-5.00
    maia2_not_distracting_band: string       // "limited" | "developing" | "strong"
    maia2_not_worrying_avg: float
    maia2_not_worrying_band: string
    maia2_attention_reg_avg: float
    maia2_attention_reg_band: string
    maia2_emotional_aware_avg: float
    maia2_emotional_aware_band: string
    maia2_self_regulation_avg: float
    maia2_self_regulation_band: string

  OUTPUT (Caroline-facing, additional):
    maia2_not_distracting_percentile: float
    maia2_not_worrying_percentile: float
    maia2_attention_reg_percentile: float
    maia2_emotional_aware_percentile: float
    maia2_self_regulation_percentile: float
    maia2_time_taken_seconds: int
    maia2_item_responses: object             // raw responses, pre-reversal

  // NO total score, NO overall band, NO synthetic global measure
  // Each subscale interpreted independently by design

  // Static reference (same for every user):
  //   SUBSCALE_ENDPOINTS table provides endpoint labels for
  //   percentile bar visualisation in PDF and Caroline's dashboard
```

---

### MAIA-2 — Clinical meaning per subscale and band

```
SUBSCALE 1: NOT-DISTRACTING
What it measures:
  The tendency to stay present with sensations of discomfort rather
  than ignoring, suppressing, or dissociating away.

  BAND: "limited" (below 25th percentile)
    Research meaning:
      Active avoidance or dissociation from body sensations. Common
      in trauma survivors. Body experienced as unsafe.
    Clinical note for Caroline:
      Cross-reference with PCL-5 Cluster C (Avoidance) and PID-5
      Perceptual Dysregulation. High overlap suggests organised
      dissociation from somatic experience.
    Direction for Chat 05:
      Name this as protection that made sense. The capacity to
      distract has likely kept her safe. The work is gentle
      reconnection, not pushing through.

  BAND: "developing" (25th-75th percentile)
    Research meaning:
      Mixed capacity. Some ability to stay present, distraction
      remains a frequent response.
    Clinical note for Caroline:
      Most common band for the target audience. Not a flag in isolation.
    Direction for Chat 05:
      Acknowledge the work already underway.

  BAND: "strong" (above 75th percentile)
    Research meaning:
      Capacity to remain present with somatic discomfort. Foundation
      for somatic therapeutic work. Resilience marker.
    Clinical note for Caroline:
      Real strength. Treatment can build on this. Particularly
      resourceful when combined with strong Self-Regulation.
    Direction for Chat 05:
      Name as strength directly.

SUBSCALE 2: NOT-WORRYING
What it measures:
  The tendency to remain emotionally steady when feeling pain or
  discomfort. Whether body sensations trigger catastrophising.

  BAND: "limited" (below 25th percentile)
    Research meaning:
      Body sensations trigger anxiety spirals. Health anxiety patterns.
      Catastrophising about somatic signals.
    Clinical note for Caroline:
      Cross-reference with PID-5 Anxiousness facet and PCL-5 Cluster E.
      When all three are elevated, the nervous system is consistently
      reading body signals as danger.
    Direction for Chat 05:
      Validate that the worry has been protective. The work is
      changing the relationship to the signals, not silencing them.

  BAND: "developing" (25th-75th percentile)
    Research meaning:
      Mixed capacity. Some sensations trigger worry, others tolerated.
    Clinical note for Caroline:
      Typical range. Not a flag in isolation.
    Direction for Chat 05:
      Meet her where she is.

  BAND: "strong" (above 75th percentile)
    Research meaning:
      Equanimity with body sensations. Regulated interpretation of
      somatic signals. Predicts better response to somatic therapies.
    Clinical note for Caroline:
      Significant resource.
    Direction for Chat 05:
      Name as strength. The relationship with the body is steadier
      than most.

SUBSCALE 3: ATTENTION REGULATION
What it measures:
  Ability to sustain and direct conscious attention to bodily sensations.

  BAND: "limited" (below 25th percentile)
    Research meaning:
      Difficulty directing or sustaining attention to the body. Often
      correlates with cognitive-dominant coping styles.
    Clinical note for Caroline:
      When paired with limited Emotional Awareness, suggests significant
      disconnection from somatic experience overall. Cross-reference
      with PID-5 Perceptual Dysregulation.
    Direction for Chat 05:
      The body has been somewhere she has not been looking. Not a
      failure. A starting point.

  BAND: "developing" (25th-75th percentile)
    Research meaning:
      Can attend to the body in some conditions, loses it in others.
    Clinical note for Caroline:
      Typical range.
    Direction for Chat 05:
      Validate the work already underway.

  BAND: "strong" (above 75th percentile)
    Research meaning:
      Strong capacity for embodied attention. Predicts response to
      mindfulness and body-based interventions.
    Clinical note for Caroline:
      Resource. Combined with strong Emotional Awareness, indicates
      integrated mind-body attention.
    Direction for Chat 05:
      Name the capacity. She has been paying attention.

SUBSCALE 4: EMOTIONAL AWARENESS
What it measures:
  The connection between body sensations and emotional states.
  The "felt sense" capacity.

  BAND: "limited" (below 25th percentile)
    Research meaning:
      Alexithymia-adjacent. Difficulty identifying emotions through
      bodily signals. Common in trauma survivors with chronic dissociation.
    Clinical note for Caroline:
      Significant clinical signal. Cross-reference with PCL-5 Cluster D
      and PID-5 Perceptual Dysregulation. Treatment pacing matters.
    Direction for Chat 05:
      The body has been speaking in a language she has not been able
      to hear. Gentle framing.

  BAND: "developing" (25th-75th percentile)
    Research meaning:
      Some emotions register in the body, others do not.
    Clinical note for Caroline:
      Typical range.
    Direction for Chat 05:
      Meet her where she is.

  BAND: "strong" (above 75th percentile)
    Research meaning:
      Integrated mind-body awareness. Uses somatic signals to understand
      emotional experience. Core capacity for trauma processing.
    Clinical note for Caroline:
      Significant resource. Treatment can use this directly.
    Direction for Chat 05:
      Name the strength clearly.

SUBSCALE 5: SELF-REGULATION
What it measures:
  Ability to use body awareness to regulate distress. Capacity to
  return to baseline through somatic means.

  BAND: "limited" (below 25th percentile)
    Research meaning:
      No internal somatic regulation strategy. Body experienced as
      source of distress without offering relief. Significant
      vulnerability marker.
    Clinical note for Caroline:
      The single most important MAIA-2 signal for treatment planning.
      Low Self-Regulation indicates the nervous system lacks internal
      tools to return to baseline. Pacing of any trauma work depends
      on building this capacity first.
    Direction for Chat 05:
      Validate without alarming. The body has not yet become a place
      she can return to. That capacity can be built.

  BAND: "developing" (25th-75th percentile)
    Research meaning:
      Some regulatory capacity through the body. Not consistent.
    Clinical note for Caroline:
      Typical range.
    Direction for Chat 05:
      Acknowledge what is already there.

  BAND: "strong" (above 75th percentile)
    Research meaning:
      Strong self-regulatory capacity through the body. Strongest single
      MAIA-2 indicator of integrated nervous system function. Predicts
      resilience under stress.
    Clinical note for Caroline:
      Most significant resource marker in the instrument. Treatment
      can proceed with confidence.
    Direction for Chat 05:
      Name as a real and significant strength.

CROSS-SUBSCALE PATTERN NOTES (Caroline-facing, expanded in Phase 3):
  All five subscales "limited":
    Significant body disconnection. Somatic-first approach indicated.
    Strongly cross-reference PCL-5 and PID-5 Perceptual Dysregulation.

  Limited Not-Distracting + Limited Not-Worrying, others developing:
    Body sensations trigger avoidance AND anxiety simultaneously.
    Body experienced as unsafe from two directions.

  Strong Attention Regulation + Limited Emotional Awareness:
    Can attend to the body cognitively but no felt sense. Intellectualised
    somatic practice without integration.

  Limited Self-Regulation but other subscales developing or strong:
    Knows the body, not afraid of it, but cannot use it to return to
    baseline. Regulation skills are the missing piece.
```

---

## Instrument 5 — PID-5-SF
### Personality Inventory for DSM-5, Short Form

**Reference:** Maples, J. L., Carter, N. T., Few, L. R., Crego, C., Gore, W. L., Samuel, D. B., Williamson, R. L., Lynam, D. R., Widiger, T. A., Markon, K. E., Krueger, R. F., & Miller, J. D. (2015). Testing whether the DSM-5 personality disorder trait model can be measured within a reduced set of items. Psychological Assessment, 27, 1195-1210.

**Normative source:** Miller et al. (2022) US representative adult sample. Supporting: Krueger et al. (2012).

**Structure:** 48 SF items covering 12 selected facets + 2 supplementary safety items from full PID-5. Each item 0-3. No reverse scoring on selected facets. Reference period: how the person generally describes themselves.

**Facet selection:** 12 facets across three full domains (Negative Affectivity, Detachment, Disinhibition) plus 3 standalone facets (Depressivity, Unusual Beliefs and Experiences, Perceptual Dysregulation). Antagonism excluded entirely. Eccentricity excluded (Psychoticism domain remains partial — no Psychoticism domain average calculated).

**Safety items:** SF item 26 ("The world would be better off if I were dead") counts toward Depressivity facet AND triggers safety flag. Supplementary items 119 and 178 from full PID-5 are administered as additional items, safety flag use only, not counted in any score.

---

```
// STATIC METADATA — descriptive endpoint pairs per facet
FACET_ENDPOINTS = {
  emotional_lability: {
    low_end:  "Steady emotional baseline",
    high_end: "Volatile emotional experience"
  },
  anxiousness: {
    low_end:  "Generally not anxious",
    high_end: "Persistent anxious pattern"
  },
  separation_insecurity: {
    low_end:  "Comfortable with being alone",
    high_end: "Fear of abandonment dominates"
  },
  withdrawal: {
    low_end:  "Engaged in connection",
    high_end: "Withdraws from social contact"
  },
  anhedonia: {
    low_end:  "Engaged with life pleasures",
    high_end: "Diminished pleasure capacity"
  },
  intimacy_avoidance: {
    low_end:  "Comfortable with closeness",
    high_end: "Avoidant of close relationships"
  },
  impulsivity: {
    low_end:  "Reflective before action",
    high_end: "Acts on impulse without forethought"
  },
  irresponsibility: {
    low_end:  "Reliable follow-through",
    high_end: "Difficulty maintaining obligations"
  },
  distractibility: {
    low_end:  "Able to sustain focus",
    high_end: "Attention easily pulled from tasks"
  },
  depressivity: {
    low_end:  "Trait mood not depressed",
    high_end: "Persistent hopelessness and worthlessness"
  },
  unusual_beliefs: {
    low_end:  "Reality-grounded perception",
    high_end: "Unusual or magical thinking present"
  },
  perceptual_dysregulation: {
    low_end:  "Stable perceptual experience",
    high_end: "Dissociative and unusual perceptual experiences"
  }
}

FUNCTION score_pid5sf(responses, supplementary_safety, section_start_time, section_end_time):

  INPUT:
    // 48 SF items, each 0-3
    responses = {
      // Negative Affectivity domain:
      item_41, item_53, item_71, item_81,    // Emotional Lability
      item_24, item_36, item_48, item_78,    // Anxiousness
      item_17, item_45, item_58, item_79,    // Separation Insecurity

      // Detachment domain:
      item_27, item_52, item_57, item_84,    // Withdrawal
      item_9,  item_11, item_43, item_65,    // Anhedonia
      item_29, item_40, item_56, item_93,    // Intimacy Avoidance

      // Disinhibition domain (full — all 3 primary facets):
      item_2,  item_5,  item_6,  item_8,    // Impulsivity
      item_47, item_64, item_68, item_76,    // Irresponsibility
      item_39, item_49, item_55, item_91,    // Distractibility

      // Standalone facets (3):
      item_26, item_60, item_70, item_74,    // Depressivity (incl. safety item)
      item_34, item_54, item_59, item_96,    // Unusual Beliefs and Experiences
      item_15, item_63, item_88, item_98     // Perceptual Dysregulation
    }

    // Supplementary safety items — NOT counted in any score
    supplementary_safety = {
      supp_item_119: int,   // "I talk about suicide a lot"
      supp_item_178: int    // "I know I'll commit suicide sooner or later"
    }

    section_start_time: timestamp
    section_end_time:   timestamp

  STEP 1 — No reverse scoring.
    // PID-5-SF selected facets contain no reverse-keyed items

  STEP 2 — Calculate facet averages:
    // ROUNDING POLICY: 2 decimal places for calculation
    // User PDF displays 1 decimal place

    // Negative Affectivity domain:
    emotional_lability_avg    = round((item_41 + item_53 + item_71 + item_81) / 4, 2)
    anxiousness_avg           = round((item_24 + item_36 + item_48 + item_78) / 4, 2)
    separation_insecurity_avg = round((item_17 + item_45 + item_58 + item_79) / 4, 2)

    // Detachment domain:
    withdrawal_avg            = round((item_27 + item_52 + item_57 + item_84) / 4, 2)
    anhedonia_avg             = round((item_9  + item_11 + item_43 + item_65) / 4, 2)
    intimacy_avoidance_avg    = round((item_29 + item_40 + item_56 + item_93) / 4, 2)

    // Disinhibition domain:
    impulsivity_avg           = round((item_2  + item_5  + item_6  + item_8)  / 4, 2)
    irresponsibility_avg      = round((item_47 + item_64 + item_68 + item_76) / 4, 2)
    distractibility_avg       = round((item_39 + item_49 + item_55 + item_91) / 4, 2)

    // Standalone facets:
    depressivity_avg          = round((item_26 + item_60 + item_70 + item_74) / 4, 2)
    unusual_beliefs_avg       = round((item_34 + item_54 + item_59 + item_96) / 4, 2)
    perceptual_dysreg_avg     = round((item_15 + item_63 + item_88 + item_98) / 4, 2)

    // All facet averages: 0.00-3.00

  STEP 3 — Calculate domain averages (mean of 3 primary facets):
    negative_affect_domain_avg = round(
      (emotional_lability_avg + anxiousness_avg + separation_insecurity_avg) / 3, 2
    )

    detachment_domain_avg = round(
      (withdrawal_avg + anhedonia_avg + intimacy_avoidance_avg) / 3, 2
    )

    disinhibition_domain_avg = round(
      (impulsivity_avg + irresponsibility_avg + distractibility_avg) / 3, 2
    )

    // Psychoticism domain NOT calculated (Eccentricity excluded)
    // Antagonism domain NOT calculated (entire domain excluded)
    // Depressivity, Unusual Beliefs, Perceptual Dysregulation remain standalone

  STEP 4 — Look up percentile placements:
    // Primary source: Miller et al. (2022) US representative adult sample
    // All 12 facets + 3 domains looked up individually

    emotional_lability_percentile    = lookup_pid5sf_percentile("emotional_lability", emotional_lability_avg)
    anxiousness_percentile           = lookup_pid5sf_percentile("anxiousness", anxiousness_avg)
    separation_insecurity_percentile = lookup_pid5sf_percentile("separation_insecurity", separation_insecurity_avg)
    withdrawal_percentile            = lookup_pid5sf_percentile("withdrawal", withdrawal_avg)
    anhedonia_percentile             = lookup_pid5sf_percentile("anhedonia", anhedonia_avg)
    intimacy_avoidance_percentile    = lookup_pid5sf_percentile("intimacy_avoidance", intimacy_avoidance_avg)
    impulsivity_percentile           = lookup_pid5sf_percentile("impulsivity", impulsivity_avg)
    irresponsibility_percentile      = lookup_pid5sf_percentile("irresponsibility", irresponsibility_avg)
    distractibility_percentile       = lookup_pid5sf_percentile("distractibility", distractibility_avg)
    depressivity_percentile          = lookup_pid5sf_percentile("depressivity", depressivity_avg)
    unusual_beliefs_percentile       = lookup_pid5sf_percentile("unusual_beliefs", unusual_beliefs_avg)
    perceptual_dysreg_percentile     = lookup_pid5sf_percentile("perceptual_dysregulation", perceptual_dysreg_avg)

    negative_affect_domain_percentile  = lookup_pid5sf_percentile("negative_affect_domain", negative_affect_domain_avg)
    detachment_domain_percentile       = lookup_pid5sf_percentile("detachment_domain", detachment_domain_avg)
    disinhibition_domain_percentile    = lookup_pid5sf_percentile("disinhibition_domain", disinhibition_domain_avg)

  STEP 5 — Assign three-tier band per facet and domain:
    // SD-based thresholds from Miller et al. (2022)
    // Validated against 15,000+ mental health treatment-seeking clients
    FUNCTION pid5_band(percentile):
      IF percentile < 84.13:       RETURN "lower"      // below 1 SD above mean
      ELSE IF percentile < 93.32:  RETURN "elevated"   // 1.0-1.5 SD above mean
      ELSE:                        RETURN "significant" // 1.5+ SD above mean

    // Applied to all 12 facets and 3 domains

  STEP 6 — Safety flag logic (STRICT ARCHITECTURAL SEPARATION):
    // Three trigger items, any score >= 1 triggers a flag

    flag_dep_item_26 = (item_26 >= 1)
    // SF item 26 = "The world would be better off if I were dead"
    // Counts toward Depressivity facet AND triggers safety flag

    flag_supp_item_119 = (supplementary_safety.supp_item_119 >= 1)
    // "I talk about suicide a lot"
    // Safety flag ONLY — not counted in any facet score

    flag_supp_item_178 = (supplementary_safety.supp_item_178 >= 1)
    // "I know I'll commit suicide sooner or later"
    // Safety flag ONLY — not counted in any facet score

    any_safety_flag_triggered = (
      flag_dep_item_26 OR
      flag_supp_item_119 OR
      flag_supp_item_178
    )

  STEP 7 — Calculate time taken:
    time_taken_seconds = section_end_time - section_start_time

  OUTPUT (user-facing):
    // Three domain results
    pid5_negative_affect_avg: float
    pid5_negative_affect_band: string       // "lower" | "elevated" | "significant"
    pid5_detachment_avg: float
    pid5_detachment_band: string
    pid5_disinhibition_avg: float
    pid5_disinhibition_band: string

    // Negative Affectivity facets:
    pid5_emotional_lability_avg: float
    pid5_emotional_lability_band: string
    pid5_anxiousness_avg: float
    pid5_anxiousness_band: string
    pid5_separation_insecurity_avg: float
    pid5_separation_insecurity_band: string

    // Detachment facets:
    pid5_withdrawal_avg: float
    pid5_withdrawal_band: string
    pid5_anhedonia_avg: float
    pid5_anhedonia_band: string
    pid5_intimacy_avoidance_avg: float
    pid5_intimacy_avoidance_band: string

    // Disinhibition facets:
    pid5_impulsivity_avg: float
    pid5_impulsivity_band: string
    pid5_irresponsibility_avg: float
    pid5_irresponsibility_band: string
    pid5_distractibility_avg: float
    pid5_distractibility_band: string

    // Three standalone facets (grouped under one broad heading in user PDF
    // per locked Chat 02 decision — each shown discretely within grouping):
    pid5_depressivity_avg: float
    pid5_depressivity_band: string
    pid5_unusual_beliefs_avg: float
    pid5_unusual_beliefs_band: string
    pid5_perceptual_dysreg_avg: float
    pid5_perceptual_dysreg_band: string

  OUTPUT (Caroline-facing, additional):
    pid5_negative_affect_domain_percentile: float
    pid5_detachment_domain_percentile: float
    pid5_disinhibition_domain_percentile: float
    pid5_emotional_lability_percentile: float
    pid5_anxiousness_percentile: float
    pid5_separation_insecurity_percentile: float
    pid5_withdrawal_percentile: float
    pid5_anhedonia_percentile: float
    pid5_intimacy_avoidance_percentile: float
    pid5_impulsivity_percentile: float
    pid5_irresponsibility_percentile: float
    pid5_distractibility_percentile: float
    pid5_depressivity_percentile: float
    pid5_unusual_beliefs_percentile: float
    pid5_perceptual_dysreg_percentile: float
    pid5_time_taken_seconds: int
    pid5_item_responses: object             // all 48 SF facet item responses
    // supplementary item raw responses stored in safety flag table only

  OUTPUT (Safety flag table — STRICTLY SEPARATED from all user-facing pipelines):
    // Separate database table
    // No access from PDF generation pipeline
    // No access from user-facing email pipeline
    // No access from user-facing results page
    // Never referenced, implied, or surfaced in any user-facing layer
    flag_dep_item_26: bool
    flag_supp_item_119: bool
    flag_supp_item_178: bool
    any_safety_flag_triggered: bool
    flag_timestamp: timestamp
    user_email: string
    supp_item_119_raw: int                  // raw response stored here only
    supp_item_178_raw: int                  // raw response stored here only
```

---

### PID-5-SF — Band threshold reference

```
// SD-based thresholds derived from Miller et al. (2022)
// Validated against 15,000+ mental health treatment-seeking clients (NovoPsych)

BAND: "lower" (below 84.13th percentile)
  Statistical meaning: below 1 SD above the general population mean
  Clinical interpretation: typical range for that trait
  User-facing language: defined by Chat 05

BAND: "elevated" (84.13 to 93.31st percentile)
  Statistical meaning: 1.0 to 1.5 SD above the general population mean
  Clinical interpretation: notable elevation — trait is meaningfully present
  User-facing language: defined by Chat 05

BAND: "significant" (93.32nd percentile and above)
  Statistical meaning: 1.5 or more SD above the general population mean
  Clinical interpretation: clinically significant — most pronounced deviation
  User-facing language: defined by Chat 05
```

---

## Assessment total — item count summary

| Instrument | Items | Notes |
|---|---|---|
| PSS-10 | 10 | No reverse scoring complexity for users |
| PHQ-8 | 8 | No reverse scoring |
| MAIA-2 | 27 | 9 reverse-scored items at data layer |
| PCL-5 | 20 | No reverse scoring |
| PID-5-SF | 48 + 2 | 48 facet items + 2 supplementary safety items |
| **Total** | **115** | Down from original 159 |

---

## Reverse-scored items quick reference

| Instrument | Reverse-scored items |
|---|---|
| PSS-10 | Items 4, 5, 7, 8 |
| PHQ-8 | None |
| PCL-5 | None |
| MAIA-2 | Items 5, 6, 7, 8, 9, 10 (Not-Distracting, all). Items 11, 12, 15 (Not-Worrying, partial) |
| PID-5-SF | None within selected facets |

---

## Percentile lookup functions — Phase 2 sourcing reference

| Lookup function | Phase 2 source |
|---|---|
| lookup_pss10_normative_percentile | Cohen & Janicki-Deverts (2012), US general adult population |
| lookup_phq8_normative_percentile | Kroenke et al. (2009), CDC BRFSS (N = 198,678) |
| lookup_pcl5_normative_percentile | Bovin et al. (2016), general population sample |
| lookup_pcl5_clinical_percentile | PTSD treatment-seeking samples, multiple published sources |
| lookup_maia2_percentile (x5) | Mehling et al. (2018), N = 1,090, one table per subscale |
| lookup_pid5sf_percentile (x15) | Miller et al. (2022) primary; Krueger et al. (2012) supporting |

All lookup functions are placeholders in Phase 1. Populated with actual percentile tables in Phase 2.

---

### PID-5-SF — Clinical meaning per domain and facet

```
// NEGATIVE AFFECTIVITY DOMAIN
// Tendency to experience intense, frequent, diverse negative emotions.
// Primary facets: Emotional Lability, Anxiousness, Separation Insecurity.

DOMAIN: NEGATIVE AFFECTIVITY
  BAND: "lower"
    Research meaning:
      Emotional experience broadly typical. Negative emotions present
      but not significantly disrupting functioning.
    Clinical note for Caroline:
      Lower domain + high individual facets elsewhere may indicate
      emotional suppression. Cross-reference MAIA-2 Not-Distracting.
    Direction for Chat 05:
      Acknowledge stability where it exists.

  BAND: "elevated"
    Research meaning:
      Anxiety, emotional instability, or relational fears meaningfully
      present and affecting daily functioning.
    Clinical note for Caroline:
      Identify which primary facet is driving the elevation —
      treatment implication differs significantly by facet.
    Direction for Chat 05:
      She is carrying more than most. Frame as patterns that make
      sense given what she has been through.

  BAND: "significant"
    Research meaning:
      Clinically significant negative affectivity. Intense, frequent,
      diverse negative emotions central to daily experience.
      Consistent difficulty regulating emotional responses.
    Clinical note for Caroline:
      Most clinically meaningful domain elevation for target audience.
      High Negative Affectivity + high Detachment = common complex
      trauma signature. Cross-reference all three primary facets.
    Direction for Chat 05:
      Direct, warm acknowledgment. This pattern has a name and
      it responds to support.

FACET 1: EMOTIONAL LABILITY (SF items: 41, 53, 71, 81)
What it measures:
  Unstable emotional experiences and frequent mood changes.
  Emotions easily aroused, intense, and disproportionate.

  BAND: "lower"
    Clinical note for Caroline:
      Lower Emotional Lability + high PCL-5 Cluster E may indicate
      suppressed emotional expression rather than genuine stability.
    Direction for Chat 05:
      Acknowledge steadiness where it exists.

  BAND: "elevated"
    Research meaning:
      Emotional volatility meaningfully present. Mood shifts frequent
      enough to affect relationships and functioning.
    Clinical note for Caroline:
      Common in trauma sequelae. Cross-reference PCL-5 Cluster E
      and MAIA-2 Self-Regulation.
    Direction for Chat 05:
      Emotions that move fast and feel big are exhausting.
      Frame as a pattern that makes sense.

  BAND: "significant"
    Research meaning:
      Borderline-type emotional instability. Rapid, intense,
      disproportionate reactions. Difficulty achieving steady-state.
    Clinical note for Caroline:
      Careful pacing. Cross-reference Separation Insecurity — both
      significant = disorganised attachment likely. If MAIA-2
      Self-Regulation also limited, stabilisation comes before
      any trauma processing.
    Direction for Chat 05:
      The emotional experience is intense and likely frightening.
      Validate without amplifying.

FACET 2: ANXIOUSNESS (SF items: 24, 36, 48, 78)
What it measures:
  Trait-level anxiety. Persistent nervousness, fear, and worry.
  Catastrophic thinking about the future.

  BAND: "lower"
    Clinical note for Caroline:
      Lower Anxiousness + high PSS-10 may indicate dissociation
      from stress rather than genuine calm.
    Direction for Chat 05:
      Acknowledge without over-reading.

  BAND: "elevated"
    Research meaning:
      Chronic worry and nervous tension meaningfully present.
      Frequent anticipation of negative outcomes.
    Clinical note for Caroline:
      Cross-reference PSS-10 and MAIA-2 Not-Worrying. Elevated
      across all three = anxiety organising significant portions
      of daily life.
    Direction for Chat 05:
      Name the exhaustion of constant anticipation.

  BAND: "significant"
    Research meaning:
      Pervasive trait anxiety. Sustained threat anticipation.
      Worry, fear, and catastrophic thinking central to daily life.
    Clinical note for Caroline:
      High Anxiousness + high PCL-5 Cluster E = most common
      hypervigilance-based anxiety pattern in trauma presentations.
      High Anxiousness + limited MAIA-2 Not-Worrying = body
      sensations feeding the anxiety loop directly.
    Direction for Chat 05:
      The body has been on guard. Acknowledge the physical cost.

FACET 3: SEPARATION INSECURITY (SF items: 17, 45, 58, 79)
What it measures:
  Fear of rejection, abandonment, and being alone. Difficulty
  tolerating aloneness. Anxiety about losing relationships.

  BAND: "lower"
    Clinical note for Caroline:
      Lower Separation Insecurity + high Intimacy Avoidance may
      indicate avoidant attachment rather than secure independence.
    Direction for Chat 05:
      Acknowledge comfort with independence where it exists.

  BAND: "elevated"
    Research meaning:
      Fears of abandonment and rejection meaningfully present.
    Clinical note for Caroline:
      Cross-reference Intimacy Avoidance. Both elevated =
      disorganised attachment indicator. Common in complex trauma.
    Direction for Chat 05:
      Relationships have felt precarious. The fear of losing
      people makes sense when connection has been unreliable.

  BAND: "significant"
    Research meaning:
      Attachment wounding central. Fear of abandonment organises
      relational behaviour. Possible clinginess or dependence.
    Clinical note for Caroline:
      Attachment-informed work indicated. Cross-reference PCL-5
      Cluster D — if both elevated, trauma has directly affected
      relational beliefs about safety.
    Direction for Chat 05:
      The fear of being left has shaped how she moves through
      relationships. That is not a flaw. It is a response.

---

// DETACHMENT DOMAIN
// Withdrawal from social-emotional experiences.
// Primary facets: Withdrawal, Anhedonia, Intimacy Avoidance.

DOMAIN: DETACHMENT
  BAND: "lower"
    Clinical note for Caroline:
      Lower Detachment does not rule out trauma. Cross-reference
      PCL-5 Cluster D and PHQ-8.
    Direction for Chat 05:
      Acknowledge connection capacity where it exists.

  BAND: "elevated"
    Research meaning:
      Meaningful withdrawal from social and emotional life.
    Clinical note for Caroline:
      Identify which primary facet is driving — each carries
      different treatment implications.
    Direction for Chat 05:
      Something has pulled her back from life. Name that without
      pathologising.

  BAND: "significant"
    Research meaning:
      Significant retreat from social and emotional experience.
      Emotional distance, reduced pleasure, and intimacy avoidance
      likely all present.
    Clinical note for Caroline:
      High Negative Affectivity + high Detachment = most common
      complex trauma domain pattern. Simultaneously overwhelmed
      and pulling away. Relational safety is a treatment priority.
    Direction for Chat 05:
      Life has felt safer at a distance. That makes sense.
      And it is also costing her.

FACET 4: WITHDRAWAL (SF items: 27, 52, 57, 84)
What it measures:
  Preference for being alone. Social disinterest. Avoidance
  of social interactions.

  BAND: "lower"
    Direction for Chat 05:
      Acknowledge without over-reading.

  BAND: "elevated"
    Research meaning:
      Social withdrawal meaningfully present. Preference for
      solitude or avoidance affecting daily life.
    Clinical note for Caroline:
      Two distinct patterns: schizoid presentation (genuine preference
      for solitude) OR trauma-driven isolation (withdrawal as
      protection). Cross-reference PCL-5 Cluster C and Separation
      Insecurity — trauma-driven withdrawal typically coexists with
      Separation Insecurity.
    Direction for Chat 05:
      Being alone has felt safer or easier. A pattern worth
      understanding, not a character flaw.

  BAND: "significant"
    Research meaning:
      Significant social disengagement. Isolation dominant feature
      of daily life.
    Clinical note for Caroline:
      If Anhedonia and Intimacy Avoidance also elevated, full
      Detachment picture present. Cross-reference PHQ-8 — significant
      Withdrawal + moderate-severe PHQ-8 suggests depression driving
      or worsening the isolation.
    Direction for Chat 05:
      The world has felt like a place to move away from. Name the
      exhaustion without pushing her back toward it.

FACET 5: ANHEDONIA (SF items: 9, 11, 43, 65)
What it measures:
  Lack of enjoyment from life experiences. Diminished capacity
  for pleasure. Reduced energy and engagement.

  BAND: "lower"
    Clinical note for Caroline:
      Lower trait Anhedonia does not rule out episodic depression.
      PHQ-8 captures recent state. Both needed for full picture.
    Direction for Chat 05:
      Acknowledge engagement with life where it exists.

  BAND: "elevated"
    Research meaning:
      Meaningfully reduced pleasure. Trait-level — longer-standing
      than the PHQ-8 two-week window.
    Clinical note for Caroline:
      Cross-reference PHQ-8. Elevated Anhedonia here is how she
      generally is. Episode sits on top of this pattern.
    Direction for Chat 05:
      Life has felt flatter than it should. A real pattern,
      not laziness.

  BAND: "significant"
    Research meaning:
      Severe and persistent loss of pleasure. Often associated with
      burnout, complex trauma, or long-standing depressive pattern.
    Clinical note for Caroline:
      Significant trait Anhedonia + elevated PHQ-8 = state and
      trait depression both present. Both layers need treatment.
      Cross-reference PID-5 Depressivity.
    Direction for Chat 05:
      Something has taken the colour out of things. This is not
      who she is — it is what has happened to her.

FACET 6: INTIMACY AVOIDANCE (SF items: 29, 40, 56, 93)
What it measures:
  Avoidance of close, intimate, or romantic relationships.
  Maintaining emotional distance. Discomfort with closeness.

  BAND: "lower"
    Clinical note for Caroline:
      Lower Intimacy Avoidance + high Separation Insecurity =
      anxious attachment pattern.
    Direction for Chat 05:
      Acknowledge comfort with closeness where it exists.

  BAND: "elevated"
    Research meaning:
      Meaningful discomfort with intimate relationships.
    Clinical note for Caroline:
      Cross-reference Separation Insecurity. Both elevated =
      disorganised attachment. One of the most clinically meaningful
      facet combinations for complex trauma.
    Direction for Chat 05:
      Getting close has felt risky. Closeness and danger have
      been connected in some way.

  BAND: "significant"
    Research meaning:
      Strong and persistent avoidance of intimacy. Closeness
      experienced as threatening. Protection mechanism.
    Clinical note for Caroline:
      Often correlates with dismissive attachment and trauma history.
      Cross-reference PCL-5 Cluster C — if both elevated, avoidance
      extends from trauma reminders into relationships. Relational
      safety is a core treatment priority.
    Direction for Chat 05:
      Keeping people at a distance has made sense. Name the
      protection without reinforcing the isolation.

---

// DISINHIBITION DOMAIN
// Orientation toward immediate gratification.
// Primary facets: Impulsivity, Irresponsibility, Distractibility.

DOMAIN: DISINHIBITION
  BAND: "lower"
    Clinical note for Caroline:
      Lower Disinhibition does not rule out trauma. Many trauma
      survivors present with over-controlled patterns.
    Direction for Chat 05:
      Acknowledge behavioural regulation where it exists.

  BAND: "elevated"
    Research meaning:
      Behavioural regulation meaningfully disrupted.
    Clinical note for Caroline:
      In trauma populations often reflects nervous system dysregulation
      expressing through action. Cross-reference Emotional Lability
      and PCL-5 Cluster E.
    Direction for Chat 05:
      The nervous system has been driving some of the decisions.

  BAND: "significant"
    Research meaning:
      Significant and consistent difficulty with behavioural regulation.
    Clinical note for Caroline:
      Explore whether ADHD-adjacent patterns, trauma-driven
      dysregulation, or both are driving. Treatment approach differs.
      Cross-reference PCL-5 Cluster E and MAIA-2 Self-Regulation.
    Direction for Chat 05:
      Name the gap between wanting to and being able to.

FACET 7: IMPULSIVITY (SF items: 2, 5, 6, 8)
What it measures:
  Acting on urges in the moment without planning. Difficulty
  following through on intentions.

  BAND: "lower"
    Clinical note for Caroline:
      Lower Impulsivity + high Emotional Lability may indicate
      suppression of impulsive urges rather than absence.
    Direction for Chat 05:
      Acknowledge reflection capacity where it exists.

  BAND: "elevated"
    Research meaning:
      Acting on impulse meaningfully present. Decisions often made
      without adequate reflection.
    Clinical note for Caroline:
      Cross-reference Emotional Lability — high Impulsivity + high
      Emotional Lability = emotion driving behaviour directly.
    Direction for Chat 05:
      The body has been moving faster than the mind sometimes.

  BAND: "significant"
    Research meaning:
      Consistent difficulty controlling impulses. Significant risk
      of harmful consequences.
    Clinical note for Caroline:
      Cross-reference PID-5 Depressivity and safety flags —
      impulsive behaviour + suicidal ideation is a higher-risk
      presentation. Also cross-reference PHQ-8 functional item.
    Direction for Chat 05:
      The gap between intention and action has been costly.
      Acknowledge without shaming.

FACET 8: IRRESPONSIBILITY (SF items: 47, 64, 68, 76)
What it measures:
  Disregard for or difficulty fulfilling obligations and commitments.
  Carelessness with responsibilities.

  BAND: "lower"
    Clinical note for Caroline:
      Very low Irresponsibility + high Anxiousness may indicate
      rigid over-functioning rather than genuine reliability.
    Direction for Chat 05:
      Acknowledge reliability where it exists.

  BAND: "elevated"
    Research meaning:
      Meaningful difficulty maintaining obligations.
    Clinical note for Caroline:
      Three distinct drivers: ADHD-adjacent executive function,
      trauma-related cognitive dysregulation, or depressive avoidance.
      Cross-reference PHQ-8 functional item, PID-5 Distractibility,
      and PCL-5 item 19 to map the driver.
    Direction for Chat 05:
      Things have been falling through the cracks. Name the gap
      without shame.

  BAND: "significant"
    Research meaning:
      Consistent and significant difficulty fulfilling obligations.
      Significant impact on work, relationships, and daily life.
    Clinical note for Caroline:
      Explore whether avoidance, executive function, or dysregulation
      is driving — treatment approach differs substantially.
    Direction for Chat 05:
      This pattern often carries significant shame. Acknowledge
      impact without compounding it.

FACET 9: DISTRACTIBILITY (SF items: 39, 49, 55, 91)
What it measures:
  Difficulty maintaining focus on tasks. Attention easily pulled
  by extraneous stimuli.

  BAND: "lower"
    Clinical note for Caroline:
      Lower Distractibility does not rule out cognitive trauma impact.
      PCL-5 item 19 captures state-level concentration disruption.
    Direction for Chat 05:
      Acknowledge focus capacity where it exists.

  BAND: "elevated"
    Research meaning:
      Meaningful difficulty sustaining attention. Tasks frequently
      interrupted or incomplete.
    Clinical note for Caroline:
      In trauma populations, often reflects hyperarousal pulling
      attention toward threat scanning. Cross-reference PCL-5
      Cluster E and MAIA-2 Attention Regulation.
    Direction for Chat 05:
      Focus has been harder than it looks. The mind has been
      somewhere else a lot of the time.

  BAND: "significant"
    Research meaning:
      Persistent significant attentional difficulties consistently
      disrupting work, tasks, and planning.
    Clinical note for Caroline:
      Explore ADHD-adjacent patterns alongside trauma contribution —
      both can be present simultaneously. Cross-reference PCL-5
      item 19 to distinguish state from trait.
    Direction for Chat 05:
      The mind has been difficult to settle. Acknowledge the
      frustration without pathologising.

---

// STANDALONE FACETS
// Not averaged into any domain score.
// Reported under one broad grouping heading in user PDF (Chat 05 names heading).
// Each facet shown discretely within that grouping.

FACET 10: DEPRESSIVITY (SF items: 26, 60, 70, 74)
Note: SF item 26 ("The world would be better off if I were dead")
counts toward this facet AND triggers a safety flag at any score >= 1.
What it measures:
  Persistent feelings of misery, worthlessness, and hopelessness.
  Difficulty recovering from low moods. Pervasive shame and guilt.
  Thoughts of suicide.

  BAND: "lower"
    Research meaning:
      Trait-level mood not significantly depressed. Self-regard
      and outlook within typical range.
    Clinical note for Caroline:
      Does not rule out episodic depression — PHQ-8 captures recent
      state. Check safety flag status regardless of band.
    Direction for Chat 05:
      Acknowledge stability of self-regard where it exists.

  BAND: "elevated"
    Research meaning:
      Persistent low mood, worthlessness, and pessimism meaningfully
      present at trait level. Recovery from low states takes longer.
    Clinical note for Caroline:
      Elevated Depressivity + moderate-severe PHQ-8 = both trait
      and state depression present. Treatment needs to address both.
      Check safety flag status regardless of band.
    Direction for Chat 05:
      The low has been hard to shake. There has been a weight
      here for some time.

  BAND: "significant"
    Research meaning:
      Severe and persistent depressive cognition at trait level.
      Hopelessness, worthlessness, and misery central to self-experience.
      Thoughts of suicide may be present.
    Clinical note for Caroline:
      Most clinically significant standalone facet. Refer out protocol
      applies regardless of safety flag status. Do not proceed with
      Bridge Hub work as primary intervention at this severity without
      clinical support in place.
    Direction for Chat 05:
      Hold with great care. Professional support must feel like
      the clear, supported next step.

FACET 11: UNUSUAL BELIEFS AND EXPERIENCES (SF items: 34, 54, 59, 96)
What it measures:
  Unconventional thoughts, beliefs, and experiences. Magical thinking.
  Unusual perceptual or cognitive experiences.

  BAND: "lower"
    Research meaning:
      Reality-grounded perception within typical range.
    Direction for Chat 05:
      No specific note needed at this band.

  BAND: "elevated"
    Research meaning:
      Some unconventional beliefs or unusual experiences meaningfully
      present.
    Clinical note for Caroline:
      Three very different pictures possible:
        - Culturally normative spiritual or intuitive framework
        - Trauma-related altered states or magical thinking
        - Emerging thought disorganisation
      Cross-reference Perceptual Dysregulation. Both elevated =
      more concerning perceptual picture. If only this facet elevated,
      explore content and cultural context in the call first.
    Direction for Chat 05:
      Avoid implying pathology. Some experiences that feel unusual
      are meaningful, not disordered.

  BAND: "significant"
    Research meaning:
      Strongly unconventional beliefs or experiences consistent
      and prominent. Reality testing may be affected.
    Clinical note for Caroline:
      Cross-reference Perceptual Dysregulation urgently. Both
      significant = more serious perceptual disruption. Cross-reference
      PCL-5 Cluster D. Grounding before any trauma processing essential.
    Direction for Chat 05:
      Keep grounded and affirming. Do not confirm specific unusual
      beliefs in the language.

FACET 12: PERCEPTUAL DYSREGULATION (SF items: 15, 63, 88, 98)
Note: Primary dissociation coverage in The Bridge Hub assessment
following exclusion of DES-II.
What it measures:
  Strange, unusual, or distorted perceptual experiences. Dissociative
  experiences. Derealization and depersonalization. Feeling controlled
  by external thoughts.

  BAND: "lower"
    Research meaning:
      Perceptual experience stable and grounded. Dissociation
      not a significant clinical concern.
    Direction for Chat 05:
      No specific note needed at this band.

  BAND: "elevated"
    Research meaning:
      Dissociative and perceptual experiences meaningfully present.
      Reality sometimes feels unreal; some detachment from self.
    Clinical note for Caroline:
      Cross-reference PCL-5 Cluster C and MAIA-2 Not-Distracting.
      Elevated across all three = coherent dissociative avoidance
      pattern. Treatment pacing matters significantly.
    Direction for Chat 05:
      Sometimes things feel unreal, or she feels disconnected from
      herself. Name that without alarming. It is more common than
      she may know.

  BAND: "significant"
    Research meaning:
      Significant dissociative and perceptual disruption consistent
      and clinically relevant. Complex trauma history strongly indicated.
    Clinical note for Caroline:
      Single most important pacing indicator in The Bridge Hub.
      Stabilisation and grounding before any trauma content.
      Do not move into trauma material in the call without first
      establishing safety and regulation capacity.
      Cross-reference MAIA-2 Self-Regulation — if limited,
      stabilisation need is urgent.
      Cross-reference PID-5 Depressivity and safety flags —
      dissociative depression requires the most careful approach.
    Direction for Chat 05:
      The connection to herself has been disrupted. The body and
      mind did what they needed to do to survive. Name it as
      protection, not damage.
```

---

## Assessment total — item count summary

| Instrument | Items | Notes |
|---|---|---|
| PSS-10 | 10 | Reverse scoring on 4 items at data layer |
| PHQ-8 | 8 | No reverse scoring |
| MAIA-2 | 27 | Reverse scoring on 9 items at data layer |
| PCL-5 | 20 | No reverse scoring |
| PID-5-SF | 48 + 2 | 48 facet items + 2 supplementary safety items |
| **Total** | **115** | Down from original 159 |

---

## Reverse-scored items quick reference

| Instrument | Reverse-scored items |
|---|---|
| PSS-10 | Items 4, 5, 7, 8 |
| PHQ-8 | None |
| PCL-5 | None |
| MAIA-2 | Items 5, 6, 7, 8, 9, 10 (Not-Distracting, all). Items 11, 12, 15 (Not-Worrying, partial) |
| PID-5-SF | None within selected facets |

---

## Percentile lookup functions — Phase 2 sourcing reference

| Lookup function | Phase 2 source |
|---|---|
| lookup_pss10_normative_percentile | Cohen & Janicki-Deverts (2012), US general adult population |
| lookup_phq8_normative_percentile | Kroenke et al. (2009), CDC BRFSS (N = 198,678) |
| lookup_pcl5_normative_percentile | Bovin et al. (2016), general population sample |
| lookup_pcl5_clinical_percentile | PTSD treatment-seeking samples, multiple published sources |
| lookup_maia2_percentile (x5) | Mehling et al. (2018), N = 1,090, one table per subscale |
| lookup_pid5sf_percentile (x15) | Miller et al. (2022) primary; Krueger et al. (2012) supporting |

All lookup functions are placeholders in Phase 1. Populated with actual percentile tables in Phase 2.

---

## Phase 1 completion status

| Step | Description | Status |
|---|---|---|
| 1.1 | Calculation logic — PSS-10 | Complete |
| 1.1 | Calculation logic — PHQ-8 | Complete |
| 1.1 | Calculation logic — PCL-5 | Complete |
| 1.1 | Calculation logic — MAIA-2 | Complete |
| 1.1 | Calculation logic — PID-5-SF | Complete |
| 1.2 | Reverse-score item list per instrument | Complete |
| 1.3 | DSM-5 algorithm check for PCL-5 | Complete |
| 1.4 | PID-5-SF domain averages + standalone facet confirmation | Complete |
| 1.5 | Safety flag logic — three items, strict separation | Complete |

**Phase 1 is complete. All five instruments specified. Proceed to Phase 2.**

---

*This document is the Phase 1 scoring engine specification for Chat 03.*
*Chat 07 builds from this document directly.*
*If anything conflicts with the master brief, the master brief wins.*
