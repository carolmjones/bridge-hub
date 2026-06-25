import { pss10NormativePercentile } from "@/lib/scoring/normative";
import type { Pss10Result, ScoringTiming } from "@/lib/scoring/types";
import {
  getItem,
  ResponseMap,
  reverseScore,
  round2,
  sectionDurationSeconds,
  sum,
} from "@/lib/scoring/utils";

export function scorePss10(
  responses: ResponseMap,
  timing: ScoringTiming
): Pss10Result {
  const raw: Record<number, number> = {};
  const scored: number[] = [];

  for (let i = 1; i <= 10; i += 1) {
    const value = getItem(responses, i);
    raw[i] = value;
    const reversed = [4, 5, 7, 8].includes(i);
    scored.push(reversed ? reverseScore(value, 4) : value);
  }

  const total = sum(scored);
  const meanTotal = round2(total / 10);

  let band: Pss10Result["band"];
  if (total <= 13) band = "low";
  else if (total <= 26) band = "moderate";
  else band = "high";

  const helplessnessScore = sum([
    scored[0],
    scored[1],
    scored[2],
    scored[5],
    scored[8],
    scored[9],
  ]);
  const selfEfficacyScore = sum([
    scored[3],
    scored[4],
    scored[6],
    scored[7],
  ]);

  return {
    instrument: "PSS10",
    total,
    meanTotal,
    band,
    clinicalBand: band,
    helplessnessScore,
    selfEfficacyScore,
    normativePercentile: pss10NormativePercentile(total),
    timeTakenSeconds: sectionDurationSeconds(
      timing.sectionStart,
      timing.sectionEnd
    ),
    itemResponses: raw,
  };
}
