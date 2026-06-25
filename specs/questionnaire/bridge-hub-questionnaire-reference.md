# The Bridge Hub — Questionnaire Reference
## Complete item list, response scales, and developer notes for all five instruments

> **Purpose:** This file is the single source of truth for building the assessment UI. Every question, every response option, every scoring note, and every section instruction is here. Cross-reference `chat-03-scoring-engine-pseudocode-v2.md` for the full scoring engine logic.

---

## Assessment overview

| # | Instrument | Report section | Items | Response scale | Time reference |
|---|---|---|---|---|---|
| 1 | MAIA-2 | The Body Room | 27 | 0–5 (6 options) | Generally in daily life |
| 2 | PSS-10 | The Load | 10 | 0–4 (5 options) | Past month |
| 3 | PHQ-8 | The Fog | 8 | 0–3 (4 options) | Past 2 weeks |
| 4 | PCL-5 | The Weight You Carry | 20 | 0–4 (5 options) | Past month |
| 5 | PID-5-SF | The Weather Inside | 39 | 0–3 (4 options) | How you generally describe yourself |

**Total items: 104** (39 PID-5-SF facet items)
**Estimated time: 15 minutes**

---

## Important developer notes

### Reverse scoring
Reverse scoring is handled entirely at the **data layer** — never shown to the user. The user always sees the same response labels regardless of whether an item is reverse-scored.

| Instrument | Reverse-scored items |
|---|---|
| PSS-10 | Items 4, 5, 7, 8 |
| PHQ-8 | None |
| MAIA-2 | Items 5, 6, 7, 8, 9, 10 (all of Not-Distracting); Items 11, 12, 15 (partial Not-Worrying) |
| PCL-5 | None |
| PID-5-SF | None within the selected facets |

### PCL-5 worst event field
PCL-5 requires a free-text field at the top of the section: "Briefly describe your worst or most stressful experience." This field is optional. If left blank, responses are still valid. The text is surfaced to Caroline only — never used in scoring.

### Section-level progress indicator
Show "Question X of Y" within each section only, not globally across the full 104-item assessment.

### Disclaimer
Must appear on the entry screen and results screen: "This is a screening tool, not a clinical diagnosis."

---

## Section 1 — PSS-10 (The Load)

**Full instrument name:** Perceived Stress Scale — 10 item version
**Reference:** Cohen, S., & Williamson, G. (1988).
**What it measures:** Subjective perception of stress load over the past month. Total score only — no subscales.
**Score range:** 0–40. Higher = greater perceived stress.

### Instructions shown to user

> The questions below ask about your feelings and thoughts during the last month. For each one, choose how often you felt or thought that way.

**Prompt prefix for all items:** "In the last month, how often have you..."

### Response scale (same for all 10 items)

| Label | Value |
|---|---|
| Never | 0 |
| Almost never | 1 |
| Sometimes | 2 |
| Fairly often | 3 |
| Very often | 4 |

> **Dev note:** Items 4, 5, 7, 8 are reverse-scored. The user sees the same labels. Invert at the data layer: stored value = 4 − raw response.

### Questions

| # | Question text | Reverse? |
|---|---|---|
| 1 | ...been upset because of something that happened unexpectedly? | No |
| 2 | ...felt that you were unable to control the important things in your life? | No |
| 3 | ...felt nervous and "stressed"? | No |
| 4 | ...felt confident about your ability to handle your personal problems? | **Yes** |
| 5 | ...felt that things were going your way? | **Yes** |
| 6 | ...found that you could not cope with all the things that you had to do? | No |
| 7 | ...been able to control irritations in your life? | **Yes** |
| 8 | ...felt that you were on top of things? | **Yes** |
| 9 | ...been angered because of things that were outside of your control? | No |
| 10 | ...felt difficulties were piling up so high that you could not overcome them? | No |

### Scoring

```
raw_total = sum of all 10 items (after reverse scoring items 4, 5, 7, 8)
Score range: 0–40
```

### Band thresholds

| Band | Score range |
|---|---|
| Low | 0–13 |
| Moderate | 14–26 |
| High | 27–40 |

---

## Section 2 — PHQ-8 (The Fog)

**Full instrument name:** Patient Health Questionnaire — 8 item version
**Reference:** Kroenke, K., Strine, T. W., Spitzer, R. L., Williams, J. B. W., Berry, J. T., & Mokdad, A. H. (2009).
**What it measures:** Frequency of depressive symptoms over the past 2 weeks. Total score only — no subscales.
**Score range:** 0–24. Higher = greater depressive symptom burden.
**Note:** PHQ-8 is PHQ-9 with item 9 removed (the suicidal ideation item).

### Instructions shown to user

> Over the last 2 weeks, how often have you been bothered by any of the following problems?

### Response scale (same for all 8 items)

| Label | Value |
|---|---|
| Not at all | 0 |
| Several days | 1 |
| More than half the days | 2 |
| Nearly every day | 3 |

> **Dev note:** No reverse scoring on PHQ-8.

### Questions

| # | Question text |
|---|---|
| 1 | Little interest or pleasure in doing things |
| 2 | Feeling down, depressed, irritable, or hopeless |
| 3 | Trouble falling or staying asleep, or sleeping too much |
| 4 | Feeling tired or having little energy |
| 5 | Poor appetite or overeating |
| 6 | Feeling bad about yourself — or that you are a failure or have let yourself or your family down |
| 7 | Trouble concentrating on things, such as reading or watching television |
| 8 | Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual |

### Scoring

```
raw_total = sum of all 8 items
Score range: 0–24
```

### Band thresholds

| Band | Score range |
|---|---|
| Minimal | 0–4 |
| Mild | 5–9 |
| Moderate | 10–14 |
| Moderately severe | 15–19 |
| Severe | 20–24 |

---

## Section 3 — MAIA-2 (The Body Room)

**Full instrument name:** Multidimensional Assessment of Interoceptive Awareness, Version 2
**Reference:** Mehling, W. E., Acree, M., Stewart, A., Silas, J., & Jones, A. (2018). PLOS ONE 13(12): e0208034.
**What it measures:** Body awareness across 5 dimensions. No overall total — each subscale is interpreted independently.
**Items used:** 27 of 37 total items (5 of 8 subscales).

**Excluded subscales (not shown to user):** Noticing (items 1–4), Body Listening (items 32–34), Trusting (items 35–37).

### Instructions shown to user

> Below is a list of statements. Please indicate how often each statement applies to you generally in daily life.

### Response scale (same for all 27 items)

| Label | Value |
|---|---|
| Never | 0 |
| Very rarely | 1 |
| Rarely | 2 | 
| Occasionally | 3 |
| Very frequently | 4 |
| Always | 5 |

> **Dev note:** Items 5–10 are ALL reverse-scored (entire Not-Distracting subscale). Items 11, 12, 15 are reverse-scored (partial Not-Worrying subscale). Items 13, 14 in Not-Worrying are NOT reverse-scored. All others score as displayed. Reverse formula: stored value = 5 − raw response.

### Questions by subscale

#### Subscale 1 — Not-Distracting (6 items, all reverse-scored)
*Measures: tendency NOT to ignore or distract from sensations of discomfort*

| MAIA-2 item # | Question text | Reverse? |
|---|---|---|
| 5 | I ignore physical tension or discomfort until they become more severe. | **Yes** |
| 6 | I distract myself from sensations of discomfort. | **Yes** |
| 7 | When I feel pain or discomfort, I try to power through it. | **Yes** |
| 8 | I try to ignore pain. | **Yes** |
| 9 | I push feelings of discomfort away by focusing on something. | **Yes** |
| 10 | When I feel unpleasant body sensations, I occupy myself with something else so I don't have to feel them. | **Yes** |

#### Subscale 2 — Not-Worrying (5 items, items 11/12/15 reverse-scored)
*Measures: tendency NOT to emotionally spiral when feeling pain or discomfort*

| MAIA-2 item # | Question text | Reverse? |
|---|---|---|
| 11 | When I feel physical pain, I become upset. | **Yes** |
| 12 | I start to worry that something is wrong if I feel any discomfort. | **Yes** |
| 13 | I can notice an unpleasant body sensation without worrying about it. | No |
| 14 | I can stay calm and not worry when I have feelings of discomfort or pain. | No |
| 15 | When I am in discomfort or pain I can't get it out of my mind. | **Yes** |

#### Subscale 3 — Attention Regulation (7 items, none reverse-scored)
*Measures: ability to sustain and control attention to body sensations*

| MAIA-2 item # | Question text | Reverse? |
|---|---|---|
| 16 | I can pay attention to my breath without being distracted by things happening around me. | No |
| 17 | I can maintain awareness of my inner bodily sensations even when there is a lot going on around me. | No |
| 18 | When I am in conversation with someone, I can pay attention to my posture. | No |
| 19 | I can return awareness to my body if I am distracted. | No |
| 20 | I can refocus my attention from thinking to sensing my body. | No |
| 21 | I can maintain awareness of my whole body even when a part of me is in pain or discomfort. | No |
| 22 | I am able to consciously focus on my body as a whole. | No |

#### Subscale 4 — Emotional Awareness (5 items, none reverse-scored)
*Measures: awareness of the connection between body sensations and emotional states*

| MAIA-2 item # | Question text | Reverse? |
|---|---|---|
| 23 | I notice how my body changes when I am angry. | No |
| 24 | When something is wrong in my life I can feel it in my body. | No |
| 25 | I notice that my body feels different after a peaceful experience. | No |
| 26 | I notice that my breathing becomes free and easy when I feel comfortable. | No |
| 27 | I notice how my body changes when I feel happy / joyful. | No |

#### Subscale 5 — Self-Regulation (4 items, none reverse-scored)
*Measures: ability to use body awareness to regulate distress and return to baseline*

| MAIA-2 item # | Question text | Reverse? |
|---|---|---|
| 28 | When I feel overwhelmed I can find a calm place inside. | No |
| 29 | When I bring awareness to my body I feel a sense of calm. | No |
| 30 | I can use my breath to reduce tension. | No |
| 31 | When I am caught up in thoughts, I can calm my mind by focusing on my body/breathing. | No |

### Scoring

```
// After applying reverse scoring:
not_distracting_avg    = sum(items 5–10) / 6      // range 0.00–5.00
not_worrying_avg       = sum(items 11–15) / 5     // range 0.00–5.00
attention_reg_avg      = sum(items 16–22) / 7     // range 0.00–5.00
emotional_aware_avg    = sum(items 23–27) / 5     // range 0.00–5.00
self_regulation_avg    = sum(items 28–31) / 4     // range 0.00–5.00

// Round to 2 decimal places for calculation; display 1 decimal place in report
// No overall total score — each subscale interpreted independently
```

### Band thresholds (derived from Mehling et al. 2018, N=1,090)

| Subscale | Limited (< 25th pct) | Developing (25th–75th pct) | Strong (> 75th pct) |
|---|---|---|---|
| Not-Distracting | < 1.52 | 1.52–2.60 | > 2.60 |
| Not-Worrying | < 1.95 | 1.95–3.09 | > 3.09 |
| Attention Regulation | < 2.26 | 2.26–3.42 | > 3.42 |
| Emotional Awareness | < 2.79 | 2.79–4.09 | > 4.09 |
| Self-Regulation | < 2.10 | 2.10–3.46 | > 3.46 |

---

## Section 4 — PCL-5 (The Weight You Carry)

**Full instrument name:** PTSD Checklist for DSM-5
**Reference:** Weathers, F. W., Litz, B. T., Keane, T. M., Palmieri, P. A., Marx, B. P., & Schnurr, P. P. (2013). National Center for PTSD.
**What it measures:** Severity of PTSD symptoms in relation to a nominated stressful event. Produces a total score and four DSM-5 cluster scores.
**Score range:** 0–80. Higher = greater PTSD symptom severity.

### Free-text field (shown before questions)

**Heading:** Before you begin this section

**Body:** The questions in this section ask about the impact of difficult experiences. Before you begin, take a moment to bring one experience to mind that feels most present for you right now.

**Field label:** The experience I have in mind

**Placeholder:** A few words is enough. Or leave it blank, it is your choice.

Input: textarea, minimum 3 rows. Optional — user may skip.

Store as `write_in_text`. Show to Caroline only. Never surfaced to user in report.

### Instructions shown to user

> Below is a list of problems that people sometimes have in response to a very stressful experience. Keeping your worst experience in mind, please indicate how much you have been bothered by each problem **in the past month**.

### Response scale (same for all 20 items)

| Label | Value |
|---|---|
| Not at all | 0 |
| A little bit | 1 |
| Moderately | 2 |
| Quite a bit | 3 |
| Extremely | 4 |

> **Dev note:** No reverse scoring on PCL-5.

### Questions by DSM-5 cluster

#### Cluster B — Intrusion (items 1–5)

| PCL-5 item # | Question text |
|---|---|
| 1 | Repeated, disturbing, and unwanted memories of the stressful experience? |
| 2 | Repeated, disturbing dreams of the stressful experience? |
| 3 | Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)? |
| 4 | Feeling very upset when something reminded you of the stressful experience? |
| 5 | Having strong physical reactions when something reminded you of the stressful experience (for example, heart pounding, trouble breathing, sweating)? |

#### Cluster C — Avoidance (items 6–7)

| PCL-5 item # | Question text |
|---|---|
| 6 | Avoiding memories, thoughts, or feelings related to the stressful experience? |
| 7 | Avoiding external reminders of the stressful experience (for example, people, places, conversations, activities, objects, or situations)? |

#### Cluster D — Negative Cognitions and Mood (items 8–14)

| PCL-5 item # | Question text |
|---|---|
| 8 | Trouble remembering important parts of the stressful experience? |
| 9 | Having strong negative beliefs about yourself, other people, or the world (for example, having thoughts such as: I am bad, there is something seriously wrong with me, no one can be trusted, the world is completely dangerous)? |
| 10 | Blaming yourself or someone else for the stressful experience or what happened after it? |
| 11 | Having strong negative feelings such as fear, horror, anger, guilt, or shame? |
| 12 | Loss of interest in activities that you used to enjoy? |
| 13 | Feeling distant or cut off from other people? |
| 14 | Trouble experiencing positive feelings (for example, being unable to feel happiness or have loving feelings for people close to you)? |

#### Cluster E — Arousal and Reactivity (items 15–20)

| PCL-5 item # | Question text |
|---|---|
| 15 | Irritable behavior, angry outbursts, or acting aggressively? |
| 16 | Taking too many risks or doing things that could cause you harm? |
| 17 | Being "superalert" or watchful or on guard? |
| 18 | Feeling jumpy or easily startled? |
| 19 | Having difficulty concentrating? |
| 20 | Trouble falling or staying asleep? |

### Scoring

```
total = sum(items 1–20)                    // range 0–80
cluster_b = sum(items 1–5)                 // range 0–20
cluster_c = sum(items 6–7)                 // range 0–8
cluster_d = sum(items 8–14)               // range 0–28
cluster_e = sum(items 15–20)              // range 0–24

// DSM-5 algorithm (for Caroline briefing only):
probable_ptsd_algorithm = (
  cluster_b >= 1 item scored >= 2 AND
  cluster_c >= 1 item scored >= 2 AND
  cluster_d >= 2 items scored >= 2 AND
  cluster_e >= 2 items scored >= 2
)
```

### Band thresholds

| Band | Total score |
|---|---|
| Subclinical | 0–20 |
| Mild | 21–32 |
| Probable PTSD | >= 33 |

> Probable PTSD threshold: total ≥ 33 (conservative VA cutoff). DSM-5 symptom algorithm applied alongside total score — both surfaced to Caroline, neither surfaced to user as a diagnostic label.

---

## Section 5 — PID-5-SF (The Weather Inside)

**Full instrument name:** Personality Inventory for DSM-5 — Short Form
**Reference:** Maples, J. L., Carter, N. T., Few, L. R., Crego, C., Gore, W. L., Samuel, D. B., Williamson, R. L., Lynam, D. R., Widiger, T. A., Markon, K. E., Krueger, R. F., & Miller, J. D. (2015). Psychological Assessment, 27(4), 1195–1210.
**Normative source:** Miller et al. (2022) US representative adult sample.
**What it measures:** Maladaptive personality trait patterns across 12 selected facets within 3 domains. No overall total score.
**Items shown to user: 39** (10 facets × 4 items each, except Depressivity with 3 items)

**Excluded from this tool:** Antagonism domain (entire domain). Eccentricity facet (so no Psychoticism domain average). Two facets (Unusual Beliefs and Experiences; Perceptual Dysregulation) are scored and routed to therapist briefing only — not shown in client report.

### Instructions shown to user

> This is a list of things different people might say about themselves. There are no right or wrong answers. Please read each statement carefully and select the response that best describes you generally.

### Response scale (same for all 50 items)

| Label | Value |
|---|---|
| Very false or often false | 0 |
| Sometimes false or somewhat false | 1 |
| Sometimes true or somewhat true | 2 |
| Very true or often true | 3 |

> **Dev note:** No reverse scoring within the selected facets. All 48 facet items score as displayed.

### Questions by domain and facet

All item numbers below refer to PID-5-SF item numbers (as numbered in the Maples et al. 2015 short form, 1–100).

---

#### Domain: Negative Affectivity
*Tendency to experience intense, frequent, and diverse negative emotions*

##### Facet 1 — Emotional Lability (4 items)
*Unstable emotional experience and frequent mood changes*

| SF item # | Question text |
|---|---|
| 41 | I get emotional easily, often for very little reason. |
| 53 | I never know where my emotions will go from moment to moment. |
| 71 | I get emotional over every little thing. |
| 81 | My emotions are unpredictable. |

##### Facet 2 — Anxiousness (4 items)
*Intense feelings of nervousness, tenseness, panic, and fear*

| SF item # | Question text |
|---|---|
| 24 | I worry a lot about terrible things that might happen. |
| 36 | I'm always worrying about something. |
| 48 | I am a very anxious person. |
| 78 | I'm always fearful or on edge about bad things that might happen. |

##### Facet 3 — Separation Insecurity (4 items)
*Fears of rejection or separation, and a need to maintain relationships*

| SF item # | Question text |
|---|---|
| 17 | I worry a lot about being alone. |
| 45 | I fear being alone in life more than anything else. |
| 58 | I'll do just about anything to keep someone from abandoning me. |
| 79 | I never want to be alone. |

---

#### Domain: Detachment
*Avoidance of social and emotional experience*

##### Facet 4 — Withdrawal (4 items)
*Preference for being alone; reticence in social situations*

| SF item # | Question text |
|---|---|
| 27 | I keep my distance from people. |
| 52 | I don't like spending time with others. |
| 57 | I'm not interested in making friends. |
| 84 | I avoid social events. |

##### Facet 5 — Anhedonia (4 items)
*Lack of enjoyment from, or engagement in, life activities*

| SF item # | Question text |
|---|---|
| 9 | Nothing seems to interest me very much. |
| 11 | I almost never enjoy life. |
| 43 | I almost never feel happy about my day-to-day activities. |
| 65 | Nothing seems to make me feel good. |

##### Facet 6 — Intimacy Avoidance (4 items)
*Avoidance of close or romantic relationships*

| SF item # | Question text |
|---|---|
| 29 | I prefer to keep romance out of my life. |
| 40 | I'm just not very interested in having sexual relationships. |
| 56 | I steer clear of romantic relationships. |
| 93 | I prefer being alone to having a close romantic partner. |

---

#### Domain: Disinhibition
*Orientation toward immediate gratification; poor impulse control*

##### Facet 7 — Impulsivity (4 items)
*Acting on the spur of the moment without planning*

| SF item # | Question text |
|---|---|
| 2 | I feel like I act totally on impulse. |
| 5 | I usually do things on impulse without thinking about what might happen as a result. |
| 6 | Even though I know better, I can't stop making rash decisions. |
| 8 | I always do things on the spur of the moment. |

##### Facet 8 — Follow-through under stress (4 items)
*Note: This facet is labelled "Irresponsibility" in the PID-5-SF source instrument. Renamed throughout The Bridge Hub to "Follow-through under stress."*
*Neglect of duties and obligations*

| SF item # | Question text |
|---|---|
| 47 | I'm often pretty careless with my own and others' things. |
| 64 | I make promises that I don't really intend to keep. |
| 68 | I often forget to pay my bills. |
| 76 | I've skipped town to avoid responsibilities. |

##### Facet 9 — Distractibility (4 items)
*Difficulty concentrating and maintaining focus*

| SF item # | Question text |
|---|---|
| 39 | I have trouble keeping my mind focused on what needs to be done. |
| 49 | I am easily distracted. |
| 55 | I can't focus on things for very long. |
| 91 | I get pulled off-task by even minor distractions. |

---

#### Standalone Facets (scored, routed to therapist briefing only — NOT in client report)

##### Facet 10 — Depressivity (3 items)
*Feelings of being down, miserable, and having no hope for the future*

| SF item # | Question text |
|---|---|
| 60 | Life looks pretty bleak to me. |
| 70 | Everything seems pointless to me. |
| 74 | I have no worth as a person. |

### Scoring

```
// All facet averages calculated as: sum of 4 items / 4
// Range per facet: 0.00–3.00
// Round to 2 decimal places for calculation; display 1 decimal place in report

// Negative Affectivity domain:
emotional_lability_avg    = (item_41 + item_53 + item_71 + item_81) / 4
anxiousness_avg           = (item_24 + item_36 + item_48 + item_78) / 4
separation_insecurity_avg = (item_17 + item_45 + item_58 + item_79) / 4
negative_affect_domain    = (emotional_lability_avg + anxiousness_avg + separation_insecurity_avg) / 3

// Detachment domain:
withdrawal_avg            = (item_27 + item_52 + item_57 + item_84) / 4
anhedonia_avg             = (item_9 + item_11 + item_43 + item_65) / 4
intimacy_avoidance_avg    = (item_29 + item_40 + item_56 + item_93) / 4
detachment_domain         = (withdrawal_avg + anhedonia_avg + intimacy_avoidance_avg) / 3

// Disinhibition domain:
impulsivity_avg           = (item_2 + item_5 + item_6 + item_8) / 4
irresponsibility_avg      = (item_47 + item_64 + item_68 + item_76) / 4
distractibility_avg       = (item_39 + item_49 + item_55 + item_91) / 4
disinhibition_domain      = (impulsivity_avg + irresponsibility_avg + distractibility_avg) / 3

// Standalone facet:
depressivity_avg          = (item_60 + item_70 + item_74) / 3
```

### Band thresholds (SD-based, from Miller et al. 2022)

Applies to all 10 facets and 3 domain averages.

| Band | Percentile | Statistical meaning |
|---|---|---|
| Lower | Below 84.13th | Below 1 SD above general population mean |
| Elevated | 84.13th–93.31st | 1.0–1.5 SD above mean |
| Significant | 93.32nd and above | 1.5+ SD above mean |

> Implement as T-score lookup using normative data from Miller et al. (2022) / Bryant workbook. See `chat-03-phase2-normative-data-v2.md` for full T-score tables.

---

## Summary: complete item sequence as presented to user

| Section | Items shown | Total |
|---|---|---|
| MAIA-2 — The Body Room | MAIA items 5–31 (27 selected items, displayed in original numbering order) | 27 |
| PSS-10 — The Load | PSS items 1–10 | 10 |
| PHQ-8 — The Fog | PHQ items 1–8 | 8 |
| PCL-5 — The Weight You Carry | PCL items 1–20 (preceded by worst event text field) | 20 |
| PID-5-SF — The Weather Inside | SF items: 41, 53, 71, 81, 24, 36, 48, 78, 17, 45, 58, 79, 27, 52, 57, 84, 9, 11, 43, 65, 29, 40, 56, 93, 2, 5, 6, 8, 47, 64, 68, 76, 39, 49, 55, 91, 60, 70, 74 | 39 |
| **Total** | | **104** |

> **Dev note on PID-5-SF presentation order:** Items above are listed by facet for clarity. For UX, consider presenting facets in the order listed (Emotional Lability, Anxiousness, Separation Insecurity, Withdrawal, Anhedonia, Intimacy Avoidance, Impulsivity, Follow-through under stress, Distractibility, Depressivity). Confirm with Chat 04 UX spec.
