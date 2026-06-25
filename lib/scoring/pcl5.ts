import {
  pcl5ClinicalPercentile,
  pcl5MeanDescriptor,
  pcl5NormativePercentile,
} from "@/lib/scoring/normative";
import type { Pcl5Result, ScoringTiming } from "@/lib/scoring/types";
import {
  getItem,
  ResponseMap,
  round2,
  sectionDurationSeconds,
  sum,
} from "@/lib/scoring/utils";

function clusterSymptomCount(responses: ResponseMap, items: number[]): number {
  return items.filter((item) => getItem(responses, item) >= 2).length;
}

export function scorePcl5(
  responses: ResponseMap,
  timing: ScoringTiming,
  worstEventText: string | null = null
): Pcl5Result {
  const raw: Record<number, number> = {};
  const items: number[] = [];

  for (let i = 1; i <= 20; i += 1) {
    const value = getItem(responses, i);
    raw[i] = value;
    items.push(value);
  }

  const total = sum(items);
  const meanTotal = round2(total / 20);

  const clusters = {
    b_intrusion: sum(items.slice(0, 5)),
    c_avoidance: sum(items.slice(5, 7)),
    d_negative: sum(items.slice(7, 14)),
    e_arousal: sum(items.slice(14, 20)),
  };

  const clusterMeans = {
    b_intrusion: round2(clusters.b_intrusion / 5),
    c_avoidance: round2(clusters.c_avoidance / 2),
    d_negative: round2(clusters.d_negative / 7),
    e_arousal: round2(clusters.e_arousal / 6),
  };

  let rawClinicalBand: Pcl5Result["rawClinicalBand"];
  if (total <= 10) rawClinicalBand = "minimal";
  else if (total <= 20) rawClinicalBand = "mild";
  else if (total <= 30) rawClinicalBand = "moderate";
  else if (total <= 40) rawClinicalBand = "moderately_severe";
  else rawClinicalBand = "severe";

  let userBand: Pcl5Result["userBand"];
  if (total <= 20) userBand = "low";
  else if (total <= 30) userBand = "moderate";
  else userBand = "high";

  const clusterSymptomCounts = {
    b: clusterSymptomCount(responses, [1, 2, 3, 4, 5]),
    c: clusterSymptomCount(responses, [6, 7]),
    d: clusterSymptomCount(responses, [8, 9, 10, 11, 12, 13, 14]),
    e: clusterSymptomCount(responses, [15, 16, 17, 18, 19, 20]),
  };

  const dsm5AlgorithmMet =
    clusterSymptomCounts.b >= 1 &&
    clusterSymptomCounts.c >= 1 &&
    clusterSymptomCounts.d >= 2 &&
    clusterSymptomCounts.e >= 2;

  const clusterEntries: Array<["B" | "C" | "D" | "E", number]> = [
    ["B", clusterMeans.b_intrusion],
    ["C", clusterMeans.c_avoidance],
    ["D", clusterMeans.d_negative],
    ["E", clusterMeans.e_arousal],
  ];
  clusterEntries.sort((a, b) => b[1] - a[1]);
  const dominantCluster = clusterEntries[0][0];

  return {
    instrument: "PCL5",
    total,
    meanTotal,
    userBand,
    rawClinicalBand,
    clusters,
    clusterMeans,
    clusterDescriptors: {
      b_intrusion: pcl5MeanDescriptor(clusterMeans.b_intrusion),
      c_avoidance: pcl5MeanDescriptor(clusterMeans.c_avoidance),
      d_negative: pcl5MeanDescriptor(clusterMeans.d_negative),
      e_arousal: pcl5MeanDescriptor(clusterMeans.e_arousal),
    },
    descriptorTotal: pcl5MeanDescriptor(meanTotal),
    probablePtsdByTotal: total >= 33,
    dsm5AlgorithmMet,
    clusterSymptomCounts,
    dominantCluster,
    normativePercentile: pcl5NormativePercentile(total),
    clinicalPercentile: pcl5ClinicalPercentile(total),
    worstEventText,
    timeTakenSeconds: sectionDurationSeconds(
      timing.sectionStart,
      timing.sectionEnd
    ),
    itemResponses: raw,
  };
}
