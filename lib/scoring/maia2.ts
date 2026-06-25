import {
  maia2BandFromPercentile,
  maia2Percentile,
  type Maia2Subscale,
} from "@/lib/scoring/normative";
import type { Maia2Result, ScoringTiming } from "@/lib/scoring/types";
import {
  getItem,
  mean,
  ResponseMap,
  reverseScore,
  sectionDurationSeconds,
} from "@/lib/scoring/utils";

function scoreSubscale(
  key: Maia2Subscale,
  itemNumbers: number[],
  responses: ResponseMap,
  reverseItems: number[]
): { average: number; band: string; percentile: number } {
  const values = itemNumbers.map((item) => {
    const raw = getItem(responses, item);
    return reverseItems.includes(item) ? reverseScore(raw, 5) : raw;
  });
  const average = mean(values);
  const percentile = maia2Percentile(key, average);
  return {
    average,
    band: maia2BandFromPercentile(percentile),
    percentile,
  };
}

export function scoreMaia2(
  responses: ResponseMap,
  timing: ScoringTiming
): Maia2Result {
  const raw: Record<number, number> = {};
  for (let i = 5; i <= 31; i += 1) {
    raw[i] = getItem(responses, i);
  }

  const subscales = {
    not_distracting: scoreSubscale(
      "not_distracting",
      [5, 6, 7, 8, 9, 10],
      responses,
      [5, 6, 7, 8, 9, 10]
    ),
    not_worrying: scoreSubscale(
      "not_worrying",
      [11, 12, 13, 14, 15],
      responses,
      [11, 12, 15]
    ),
    attention_regulation: scoreSubscale(
      "attention_regulation",
      [16, 17, 18, 19, 20, 21, 22],
      responses,
      []
    ),
    emotional_awareness: scoreSubscale(
      "emotional_awareness",
      [23, 24, 25, 26, 27],
      responses,
      []
    ),
    self_regulation: scoreSubscale(
      "self_regulation",
      [28, 29, 30, 31],
      responses,
      []
    ),
  };

  return {
    instrument: "MAIA2",
    subscales,
    timeTakenSeconds: sectionDurationSeconds(
      timing.sectionStart,
      timing.sectionEnd
    ),
    itemResponses: raw,
  };
}
