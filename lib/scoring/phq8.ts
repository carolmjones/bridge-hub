import { phq8NormativePercentile } from "@/lib/scoring/normative";
import type { Phq8Result, ScoringTiming } from "@/lib/scoring/types";
import {
  getItem,
  ResponseMap,
  round2,
  sectionDurationSeconds,
  sum,
} from "@/lib/scoring/utils";

export function scorePhq8(
  responses: ResponseMap,
  timing: ScoringTiming
): Phq8Result {
  const raw: Record<number, number> = {};
  const items: number[] = [];

  for (let i = 1; i <= 8; i += 1) {
    const value = getItem(responses, i);
    raw[i] = value;
    items.push(value);
  }

  const total = sum(items);
  const meanTotal = round2(total / 8);

  let clinicalBand: Phq8Result["clinicalBand"];
  if (total <= 4) clinicalBand = "none_minimal";
  else if (total <= 9) clinicalBand = "mild";
  else if (total <= 14) clinicalBand = "moderate";
  else if (total <= 19) clinicalBand = "moderately_severe";
  else clinicalBand = "severe";

  let userBand: Phq8Result["userBand"];
  if (total <= 9) userBand = "low";
  else if (total <= 14) userBand = "moderate";
  else userBand = "high";

  return {
    instrument: "PHQ8",
    total,
    meanTotal,
    userBand,
    clinicalBand,
    cognitiveAffective: items[0] + items[1] + items[5],
    somaticVegetative: items[2] + items[3] + items[4] + items[7],
    functional: items[6],
    normativePercentile: phq8NormativePercentile(total),
    timeTakenSeconds: sectionDurationSeconds(
      timing.sectionStart,
      timing.sectionEnd
    ),
    itemResponses: raw,
  };
}
