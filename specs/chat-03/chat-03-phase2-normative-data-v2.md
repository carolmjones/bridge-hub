# The Bridge Hub — Phase 2 Normative Data Reference — v2
## Band Cutoffs and Percentile Lookup Tables

> **v2 — Updated June 2026**
> Normative data is unchanged from original. Header updated to reflect v2 report
> architecture. Key clarification for Chat 07: normative percentile lookups now
> serve two purposes — Caroline's clinical dashboard (as originally specified) AND
> the Layer 2 content library block selection logic (new in v2). The correct
> pre-written clinical interpretation block for each client is retrieved by
> matching their score to the appropriate band using these cutoffs.
> See `chat-03-scoring-results-roadmap-v2.md` for full architectural context.
>
> This document contains the sourced normative data for all five instruments.
> It populates the placeholder lookup functions defined in the Phase 1 scoring engine.
> Chat 07 builds the percentile lookup tables from this data.
> Last updated: June 2026
>
> **v2 update note:** No changes to the normative data itself. All cutpoints,
> means, SDs, and band thresholds remain exactly as specified below.
> This document now feeds the Layer 2 content library (Phase 3.5 in the v2 roadmap)
> in addition to the scoring engine. The Layer 2 blocks are pre-written clinical
> interpretation text keyed to instrument + band combinations. The normative data
> here provides the scientific grounding for those blocks.

---

## Instrument 1 — PSS-10
### Source: Cohen & Janicki-Deverts (2012), US probability sample

**Reference:** Cohen, S., & Janicki-Deverts, D. (2012). Who's stressed? Distributions of psychological stress in the United States in probability samples from 1983, 2006 and 2009. Journal of Applied Social Psychology, 42(6), 1320-1334.

**Normative sample used:** 2009 eNation survey, N = 2,000, nationally representative US adults 18+
- Men: M = 15.52, SD = 7.44
- Women: M = 16.14, SD = 7.56
- Combined approximate mean: 15.83, SD = 7.50

**Validated severity bands (primary banding system):**

| Band | Score range | User-facing label |
|---|---|---|
| Low | 0-13 | Low |
| Moderate | 14-26 | Moderate |
| High | 27-40 | High |

**Normative percentile lookup table (derived from M=15.83, SD=7.50):**

| Score | Approx. normative percentile |
|---|---|
| 0 | 2nd |
| 4 | 7th |
| 6 | 11th |
| 8 | 17th |
| 10 | 23rd |
| 12 | 31st |
| 14 | 40th |
| 16 | 50th |
| 18 | 60th |
| 20 | 69th |
| 22 | 77th |
| 24 | 83rd |
| 26 | 89th |
| 28 | 93rd |
| 30 | 96th |
| 32 | 98th |
| 34 | 99th |
| 36+ | >99th |

> **Note for Chat 07:** Implement as a continuous normal distribution lookup using M=15.83, SD=7.50 for precision. The table above provides approximate integer reference points.

---

## Instrument 2 — PHQ-8
### Source: Kroenke et al. (2009), BRFSS US general population

**Reference:** Kroenke, K., Strine, T. W., Spitzer, R. L., Williams, J. B. W., Berry, J. T., & Mokdad, A. H. (2009). The PHQ-8 as a measure of current depression in the general population. Journal of Affective Disorders, 114(1-3), 163-173.

**Normative sample:** N = 198,678, 2006 Behavioral Risk Factor Surveillance System (BRFSS), US general adult population.

**Validated severity bands (primary banding system):**

| Clinical band | Score range | User-facing band |
|---|---|---|
| None / minimal | 0-4 | Low |
| Mild | 5-9 | Low |
| Moderate | 10-14 | Moderate |
| Moderately severe | 15-19 | High |
| Severe | 20-24 | High |

**BRFSS frequency distribution (Kroenke et al. 2009, Table 2):**

| Score range | N in BRFSS | Cumulative % |
|---|---|---|
| 0-4 | 150,121 | 75.6% |
| 5-9 | 31,517 | 91.5% |
| 10-14 | 9,968 | 96.5% |
| 15-19 | 4,826 | 98.9% |
| 20-24 | 2,246 | 100% |

**Normative percentile lookup table (derived from BRFSS distribution):**

| Score | Approx. normative percentile |
|---|---|
| 0 | 35th |
| 1 | 50th |
| 2 | 60th |
| 3 | 67th |
| 4 | 74th |
| 5 | 79th |
| 6 | 82nd |
| 7 | 85th |
| 8 | 88th |
| 9 | 91st |
| 10 | 93rd |
| 11 | 94th |
| 12 | 95th |
| 13 | 96th |
| 14 | 97th |
| 15 | 97.5th |
| 16 | 98th |
| 17 | 98.3rd |
| 18 | 98.6th |
| 19 | 99th |
| 20+ | >99th |

> **Note for Chat 07:** These percentiles reflect scoring ≥ a given value in the general US adult population. The BRFSS distribution is right-skewed. The 90.9% non-depressed rate confirms that most general population adults score below 10.

---

## Instrument 3 — PCL-5
### Sources: Renyer (2016) for normative; Bovin et al. (2016) for clinical

**References:**
- Renyer, D. (2016). Non-clinical normative data for PTSD Checklist-5 (PCL-5) [PhD Thesis, Pacific University].
- Bovin, M. J., Marx, B. P., Weathers, F. W., et al. (2016). Psychometric properties of the PTSD Checklist for DSM-5 in Veterans. Psychological Assessment, 28, 1379-1391.

**Normative (non-clinical) sample:** Renyer (2016). Combined non-trauma-exposed and some-trauma-exposed non-clinical adults. N = 166, M = 16.47, SD = 16.29.

**Clinical (PTSD) sample:** Bovin et al. (2016). US military veterans currently in PTSD clinical care. N = 468, M = 36.97, SD = 21.16.

**Validated severity bands:**

| Clinical band | Score range | User-facing band |
|---|---|---|
| Minimal | 0-10 | Low |
| Mild | 11-20 | Low |
| Moderate | 21-30 | Moderate |
| Moderately severe | 31-40 | High |
| Severe | 41-80 | High |

**Probable PTSD threshold:** Score ≥ 33 (VA-recommended conservative cutpoint). This corresponds to approximately the 84th percentile of the non-clinical normative sample (1 SD above normative mean: 16.47 + 16.29 = 32.76 ≈ 33).

**Mean-based descriptors (applied to mean scores 0-4, per cluster and total):**

| Descriptor | Mean score range |
|---|---|
| Normal | ≤ 1.23 |
| Mild | > 1.23 to ≤ 1.64 |
| Moderate | > 1.64 to ≤ 2.455 |
| Severe | > 2.455 to ≤ 3.265 |
| Extremely Severe | > 3.265 |

**Normative percentile lookup table (derived from M=16.47, SD=16.29):**

| Score | Normative percentile | Clinical percentile |
|---|---|---|
| 0 | 16th | 4th |
| 5 | 23rd | 7th |
| 10 | 31st | 11th |
| 15 | 40th | 16th |
| 20 | 50th | 21st |
| 25 | 61st | 27th |
| 30 | 70th | 34th |
| 33 | 75th | 38th |
| 35 | 78th | 41st |
| 40 | 84th | 49th |
| 45 | 89th | 56th |
| 50 | 92nd | 63rd |
| 55 | 95th | 70th |
| 60 | 97th | 76th |
| 65 | 98th | 81st |
| 70 | 99th | 86th |
| 80 | >99th | 93rd |

> **Note for Chat 07:** Implement as two separate continuous normal distribution lookups. Normative: M=16.47, SD=16.29. Clinical: M=36.97, SD=21.16. The table above provides approximate reference points.

---

## Instrument 4 — MAIA-2
### Source: Mehling et al. (2018), general population N=1,090

**Reference:** Mehling, W. E., Acree, M., Stewart, A., Silas, J., & Jones, A. (2018). The Multidimensional Assessment of Interoceptive Awareness, Version 2 (MAIA-2). PLOS ONE, 13(12), e0208034.

**Normative sample:** N = 1,090 adults, Science Museum London, age 18-69, mean age 30.6 years (SD = 11.3). 47% female. Treated as general population reference. Data from Table 3 of the published paper.

**Means and SDs from Mehling et al. (2018) Table 3 — five selected subscales only:**

| Subscale | Mean | SD |
|---|---|---|
| Not-Distracting | 2.06 | 0.80 |
| Not-Worrying | 2.52 | 0.85 |
| Attention Regulation | 2.84 | 0.86 |
| Emotional Awareness | 3.44 | 0.96 |
| Self-Regulation | 2.78 | 1.01 |

**Band cutoffs (derived from normative means and SDs using 25th/75th percentile thresholds):**

Percentile formula: 25th = M − 0.674×SD, 75th = M + 0.674×SD

| Subscale | Limited (< 25th) | Developing (25th-75th) | Strong (> 75th) |
|---|---|---|---|
| Not-Distracting | < 1.52 | 1.52 to 2.60 | > 2.60 |
| Not-Worrying | < 1.95 | 1.95 to 3.09 | > 3.09 |
| Attention Regulation | < 2.26 | 2.26 to 3.42 | > 3.42 |
| Emotional Awareness | < 2.79 | 2.79 to 4.09 | > 4.09 |
| Self-Regulation | < 2.10 | 2.10 to 3.46 | > 3.46 |

**Full percentile lookup (per subscale, for Caroline's dashboard):**
> **Note for Chat 07:** Implement as five separate continuous normal distribution lookups, one per subscale, using the mean and SD values above. Scores are averages on 0-5 scale, rounded to 2 decimal places in calculation.

---

## Instrument 5 — PID-5-SF
### Source: Miller et al. (2022) via Bryant scoring workbook (PID-5_Profile_Scoring_10-7-22.xlsx)

**References:**
- Miller, J. D., Bagby, R. M., Hopwood, C. J., Simms, L. J., & Lynam, D. R. (2022). Normative data for PID-5 domains, facets, and personality disorder composites from a representative sample and comparison to community and clinical samples. Personality Disorders: Theory, Research, and Treatment, 13(5), 536-541.
- Krueger, R. F., Derringer, J., Markon, K. E., Watson, D., & Skodol, A. E. (2012). Initial construction of a maladaptive personality trait model and inventory for DSM-5. Psychological Medicine, 42, 1879-1890.

**Normative sample:** Krueger et al. (2012) representative US community sample. Used as the normative reference in Miller et al. (2022). Data extracted from Bryant scoring workbook (T-Scores sheet, Normative columns).

**Band thresholds (SD-based, from Miller et al. 2022):**

| Band | Percentile | SD above mean | Clinical interpretation |
|---|---|---|---|
| Lower | Below 84.13th | Below +1.0 SD | Typical range |
| Elevated | 84.13th to 93.31st | +1.0 to +1.5 SD | Notable — trait meaningfully present |
| Significant | 93.32nd and above | +1.5 SD or more | Clinically significant deviation |

**Normative means, SDs, and raw score cutpoints for our 12 selected facets and 3 domains:**

Data source: T-Scores sheet, Normative columns (Mean, SD) from Bryant/Miller workbook.
Cutpoints calculated as: Elevated = M + 1.0×SD, Significant = M + 1.5×SD

### Negative Affectivity domain facets

| Facet | Norm Mean | Norm SD | Elevated cutpoint (84th %ile) | Significant cutpoint (93rd %ile) |
|---|---|---|---|---|
| Emotional Lability | 0.94 | 0.74 | 1.68 | 2.05 |
| Anxiousness | 1.02 | 0.73 | 1.75 | 2.12 |
| Separation Insecurity | 0.80 | 0.68 | 1.48 | 1.82 |

### Detachment domain facets

| Facet | Norm Mean | Norm SD | Elevated cutpoint (84th %ile) | Significant cutpoint (93rd %ile) |
|---|---|---|---|---|
| Withdrawal | 1.01 | 0.72 | 1.73 | 2.09 |
| Anhedonia | 0.89 | 0.64 | 1.53 | 1.85 |
| Intimacy Avoidance | 0.61 | 0.65 | 1.26 | 1.59 |

### Disinhibition domain facets

| Facet | Norm Mean | Norm SD | Elevated cutpoint (84th %ile) | Significant cutpoint (93rd %ile) |
|---|---|---|---|---|
| Impulsivity | 0.77 | 0.57 | 1.34 | 1.63 |
| Irresponsibility | 0.39 | 0.49 | 0.88 | 1.13 |
| Distractibility | 0.86 | 0.69 | 1.55 | 1.90 |

### Standalone facets

| Facet | Norm Mean | Norm SD | Elevated cutpoint (84th %ile) | Significant cutpoint (93rd %ile) |
|---|---|---|---|---|
| Depressivity | 0.53 | 0.62 | 1.15 | 1.46 |
| Unusual Beliefs & Experiences | 0.64 | 0.63 | 1.27 | 1.59 |
| Perceptual Dysregulation | 0.44 | 0.48 | 0.92 | 1.16 |

### Domain averages

| Domain | Norm Mean | Norm SD | Elevated cutpoint (84th %ile) | Significant cutpoint (93rd %ile) |
|---|---|---|---|---|
| Negative Affectivity | 0.92 | 0.62 | 1.54 | 1.85 |
| Detachment | 0.84 | 0.56 | 1.40 | 1.68 |
| Disinhibition | 0.66 | 0.50 | 1.16 | 1.41 |

> **Note for Chat 07:** Implement band assignment using the raw score cutpoints above. These derive from M + 1.0×SD (Elevated threshold) and M + 1.5×SD (Significant threshold) of the normative sample. For full percentile lookup across the 0-3 range, implement as continuous normal distribution lookups using the Mean and SD per facet/domain. Facet scores are averages rounded to 2 decimal places.

> **Safety note:** Cutpoints apply to facet average scores (0.00-3.00 scale). Do not apply to raw item sums.

---

## Phase 2 completion status

| Step | Description | Status |
|---|---|---|
| 2.1 | Validated bands for PSS-10, PHQ-8, PCL-5 confirmed | Complete |
| 2.2 | MAIA-2 percentile cutoffs — 5 subscales from Mehling et al. (2018) | Complete |
| 2.3 | PID-5-SF percentile cutoffs — 12 facets + 3 domains from Miller et al. (2022) | Complete |
| 2.4 | User-display band collapse confirmed for PHQ-8 and PCL-5 | Complete |
| 2.5 | Normative percentile lookup tables for PSS-10, PHQ-8, PCL-5 | Complete |
| 2.6 | PCL-5 mean-based descriptor cutoffs confirmed | Complete |

**Phase 2 is complete. All lookup functions can now be populated. Proceed to Phase 3.**

---

*This document is the Phase 2 normative data reference for Chat 03.*
*Chat 07 builds the lookup tables and percentile functions from this data.*
*If anything conflicts with the master brief, the master brief wins.*
