import { normPercentile, round2 } from "@/lib/scoring/utils";

/** PSS-10 total — Cohen & Janicki-Deverts (2012), M=15.83, SD=7.50 */
export function pss10NormativePercentile(total: number): number {
  return normPercentile(total, 15.83, 7.5);
}

/** PHQ-8 total — BRFSS-derived lookup (Kroenke et al. 2009). */
const PHQ8_PERCENTILE_TABLE: Array<[number, number]> = [
  [0, 35],
  [1, 50],
  [2, 60],
  [3, 67],
  [4, 74],
  [5, 79],
  [6, 82],
  [7, 85],
  [8, 88],
  [9, 91],
  [10, 93],
  [11, 94],
  [12, 95],
  [13, 96],
  [14, 97],
  [15, 97.5],
  [16, 98],
  [17, 98.3],
  [18, 98.6],
  [19, 99],
  [20, 99.5],
  [24, 99.9],
];

export function phq8NormativePercentile(total: number): number {
  const clamped = Math.max(0, Math.min(24, total));
  for (let i = PHQ8_PERCENTILE_TABLE.length - 1; i >= 0; i -= 1) {
    const [score, pct] = PHQ8_PERCENTILE_TABLE[i];
    if (clamped >= score) return pct;
  }
  return 35;
}

/** PCL-5 normative — Renyer (2016), M=16.47, SD=16.29 */
export function pcl5NormativePercentile(total: number): number {
  return normPercentile(total, 16.47, 16.29);
}

/** PCL-5 clinical — Bovin et al. (2016), M=36.97, SD=21.16 */
export function pcl5ClinicalPercentile(total: number): number {
  return normPercentile(total, 36.97, 21.16);
}

export function pcl5MeanDescriptor(meanScore: number): string {
  if (meanScore <= 1.23) return "normal";
  if (meanScore <= 1.64) return "mild";
  if (meanScore <= 2.455) return "moderate";
  if (meanScore <= 3.265) return "severe";
  return "extremely_severe";
}

const MAIA2_NORMS = {
  not_distracting: { mean: 2.06, sd: 0.8 },
  not_worrying: { mean: 2.52, sd: 0.85 },
  attention_regulation: { mean: 2.84, sd: 0.86 },
  emotional_awareness: { mean: 3.44, sd: 0.96 },
  self_regulation: { mean: 2.78, sd: 1.01 },
} as const;

export type Maia2Subscale = keyof typeof MAIA2_NORMS;

export function maia2Percentile(
  subscale: Maia2Subscale,
  average: number
): number {
  const { mean, sd } = MAIA2_NORMS[subscale];
  return normPercentile(average, mean, sd);
}

export function maia2BandFromPercentile(percentile: number): string {
  if (percentile < 25) return "limited";
  if (percentile <= 75) return "developing";
  return "strong";
}

type PidNorm = { mean: number; sd: number; elevated: number; significant: number };

const PID5_NORMS: Record<string, PidNorm> = {
  emotional_lability: { mean: 0.94, sd: 0.74, elevated: 1.68, significant: 2.05 },
  anxiousness: { mean: 1.02, sd: 0.73, elevated: 1.75, significant: 2.12 },
  separation_insecurity: { mean: 0.8, sd: 0.68, elevated: 1.48, significant: 1.82 },
  withdrawal: { mean: 1.01, sd: 0.72, elevated: 1.73, significant: 2.09 },
  anhedonia: { mean: 0.89, sd: 0.64, elevated: 1.53, significant: 1.85 },
  intimacy_avoidance: { mean: 0.61, sd: 0.65, elevated: 1.26, significant: 1.59 },
  impulsivity: { mean: 0.77, sd: 0.57, elevated: 1.34, significant: 1.63 },
  irresponsibility: { mean: 0.39, sd: 0.49, elevated: 0.88, significant: 1.13 },
  distractibility: { mean: 0.86, sd: 0.69, elevated: 1.55, significant: 1.9 },
  depressivity: { mean: 0.53, sd: 0.62, elevated: 1.15, significant: 1.46 },
  unusual_beliefs: { mean: 0.64, sd: 0.63, elevated: 1.27, significant: 1.59 },
  perceptual_dysregulation: { mean: 0.44, sd: 0.48, elevated: 0.92, significant: 1.16 },
  negative_affect_domain: { mean: 0.92, sd: 0.62, elevated: 1.54, significant: 1.85 },
  detachment_domain: { mean: 0.84, sd: 0.56, elevated: 1.4, significant: 1.68 },
  disinhibition_domain: { mean: 0.66, sd: 0.5, elevated: 1.16, significant: 1.41 },
};

export function pid5Percentile(key: string, average: number): number {
  const norm = PID5_NORMS[key];
  if (!norm) throw new Error(`Unknown PID-5 norm key: ${key}`);
  return normPercentile(average, norm.mean, norm.sd);
}

/** Band from percentile (Miller et al. 2022 SD thresholds). */
export function pid5BandFromPercentile(percentile: number): string {
  if (percentile < 84.13) return "lower";
  if (percentile < 93.32) return "elevated";
  return "significant";
}

/** Band from raw average cutpoints (M + 1SD / M + 1.5SD). */
export function pid5BandFromAverage(key: string, average: number): string {
  const norm = PID5_NORMS[key];
  if (!norm) throw new Error(`Unknown PID-5 norm key: ${key}`);
  if (average >= norm.significant) return "significant";
  if (average >= norm.elevated) return "elevated";
  return "lower";
}

export function pid5Norm(key: string): PidNorm {
  const norm = PID5_NORMS[key];
  if (!norm) throw new Error(`Unknown PID-5 norm key: ${key}`);
  return norm;
}

export { round2 };
