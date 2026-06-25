import { PID5SF_SCALE } from "@/lib/data/scales";
import {
  pid5BandFromAverage,
  pid5Percentile,
} from "@/lib/scoring/normative";
import type { Pid5SfResult, Pid5SafetyFlag, ScoringTiming } from "@/lib/scoring/types";
import {
  getItem,
  mean,
  ResponseMap,
  sectionDurationSeconds,
} from "@/lib/scoring/utils";

const FACET_ITEMS: Record<string, number[]> = {
  emotional_lability: [41, 53, 71, 81],
  anxiousness: [24, 36, 48, 78],
  separation_insecurity: [17, 45, 58, 79],
  withdrawal: [27, 52, 57, 84],
  anhedonia: [9, 11, 43, 65],
  intimacy_avoidance: [29, 40, 56, 93],
  impulsivity: [2, 5, 6, 8],
  irresponsibility: [47, 64, 68, 76],
  distractibility: [39, 49, 55, 91],
  depressivity: [26, 60, 70, 74],
  unusual_beliefs: [34, 54, 59, 96],
  perceptual_dysregulation: [15, 63, 88, 98],
};

const DOMAIN_FACETS: Record<string, string[]> = {
  negative_affect_domain: [
    "emotional_lability",
    "anxiousness",
    "separation_insecurity",
  ],
  detachment_domain: ["withdrawal", "anhedonia", "intimacy_avoidance"],
  disinhibition_domain: ["impulsivity", "irresponsibility", "distractibility"],
};

const SCORED_ITEMS = Object.values(FACET_ITEMS).flat();

const SAFETY_ITEMS: Array<{
  item: number;
  code: string;
  text: string;
}> = [
  {
    item: 26,
    code: "PID5_ITEM_26",
    text: "The world would be better off if I were dead",
  },
  {
    item: 119,
    code: "PID5_SUPP_119",
    text: "I talk about suicide a lot.",
  },
  {
    item: 178,
    code: "PID5_SUPP_178",
    text: "I know I'll commit suicide sooner or later.",
  },
];

function scaleLabel(value: number): string {
  return PID5SF_SCALE.find((option) => option.value === value)?.label ?? String(value);
}

function scoreFacet(key: string, responses: ResponseMap) {
  const items = FACET_ITEMS[key];
  const values = items.map((item) => getItem(responses, item));
  const average = mean(values);
  const percentile = pid5Percentile(key, average);
  return {
    average,
    band: pid5BandFromAverage(key, average),
    percentile,
  };
}

export function scorePid5Sf(
  responses: ResponseMap,
  timing: ScoringTiming
): Pid5SfResult {
  const raw: Record<number, number> = {};
  for (const item of [...SCORED_ITEMS, 119, 178]) {
    raw[item] = getItem(responses, item);
  }

  const facets: Pid5SfResult["facets"] = {};
  for (const key of Object.keys(FACET_ITEMS)) {
    facets[key] = scoreFacet(key, responses);
  }

  const domains: Pid5SfResult["domains"] = {};
  for (const [domainKey, facetKeys] of Object.entries(DOMAIN_FACETS)) {
    const avg = mean(facetKeys.map((facet) => facets[facet].average));
    domains[domainKey] = {
      average: avg,
      band: pid5BandFromAverage(domainKey, avg),
      percentile: pid5Percentile(domainKey, avg),
    };
  }

  const safetyFlags: Pid5SafetyFlag[] = [];
  for (const safety of SAFETY_ITEMS) {
    const value = getItem(responses, safety.item);
    if (value >= 1) {
      safetyFlags.push({
        itemCode: safety.code,
        itemText: safety.text,
        responseValue: value,
        responseLabel: scaleLabel(value),
      });
    }
  }

  return {
    instrument: "PID5SF",
    domains,
    facets,
    safetyFlags,
    timeTakenSeconds: sectionDurationSeconds(
      timing.sectionStart,
      timing.sectionEnd
    ),
    itemResponses: raw,
  };
}
