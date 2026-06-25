import { RESULT_ROW_META } from "@/lib/copy/touchpoint1";
import { buildTopItems, topItemsForInstrument } from "@/lib/results/top-items";
import type { Instrument } from "@/lib/types/database";

type ScoreRow = {
  instrument: string;
  band: string | null;
  normative_percentile: number | null;
  clinical_percentile: number | null;
  helplessness_score: number | null;
  efficacy_score: number | null;
  subscale_scores: Record<string, unknown> | null;
  subscale_bands: Record<string, unknown> | null;
  cluster_scores: Record<string, unknown> | null;
  flags_fired: string[] | null;
  write_in_text: string | null;
};

function rowFor(scoreRows: ScoreRow[], instrument: Instrument) {
  return scoreRows.find((s) => s.instrument === instrument);
}

function flagsFor(scoreRows: ScoreRow[], instrument?: Instrument): string[] {
  const rows = instrument
    ? scoreRows.filter((s) => s.instrument === instrument)
    : scoreRows;
  return rows.flatMap((s) => (Array.isArray(s.flags_fired) ? s.flags_fired : []));
}

function maia2Summary(row: ScoreRow | undefined) {
  const bands = row?.subscale_bands as Record<string, string> | undefined;
  const scores = row?.subscale_scores as Record<string, number> | undefined;
  if (!bands || !scores) {
    return {
      overall_pattern: "unknown",
      self_regulation_band: "unknown",
      weakest_subscale: "unknown",
      strongest_subscale: "unknown",
    };
  }

  const entries = Object.entries(scores);
  const sorted = [...entries].sort((a, b) => a[1] - b[1]);
  const limited = Object.values(bands).filter((b) => b === "limited").length;
  const strong = Object.values(bands).filter((b) => b === "strong").length;
  let overall_pattern = "developing";
  if (limited >= 3) overall_pattern = "limited";
  else if (strong >= 2) overall_pattern = "strong";

  return {
    overall_pattern,
    self_regulation_band: bands.self_regulation ?? "unknown",
    weakest_subscale: sorted[0]?.[0] ?? "unknown",
    strongest_subscale: sorted[sorted.length - 1]?.[0] ?? "unknown",
  };
}

function pid5Dominant(row: ScoreRow | undefined) {
  const domains = (
    row?.subscale_bands as { domains?: Record<string, string> } | null
  )?.domains;
  const domainScores = (
    row?.subscale_scores as { domains?: Record<string, number> } | null
  )?.domains;
  if (!domains || !domainScores) {
    return { dominant_domain: "unknown", dominant_domain_band: "unknown" };
  }
  const top = Object.entries(domainScores).sort((a, b) => b[1] - a[1])[0];
  const domainKey = top?.[0] ?? "unknown";
  return {
    dominant_domain: domainKey,
    dominant_domain_band: domains[domainKey] ?? "unknown",
  };
}

export function buildSynthesisPayload(
  firstName: string,
  scoreRows: ScoreRow[],
  responses: Parameters<typeof buildTopItems>[0]
) {
  const pss = rowFor(scoreRows, "PSS10");
  const phq = rowFor(scoreRows, "PHQ8");
  const maia = rowFor(scoreRows, "MAIA2");
  const pcl = rowFor(scoreRows, "PCL5");
  const pid = rowFor(scoreRows, "PID5SF");

  const phqSub = phq?.subscale_scores as
    | {
        cognitive_affective?: number;
        somatic_vegetative?: number;
      }
    | undefined;

  const cognitive = phqSub?.cognitive_affective ?? 0;
  const somatic = phqSub?.somatic_vegetative ?? 0;

  const topFive = buildTopItems(responses, 5).map((item) => ({
    instrument: item.instrument,
    item_text: item.item_text,
    response_label: item.response_label,
  }));

  return {
    generation_target: "synthesis_paragraph",
    client: { first_name: firstName },
    scores: {
      PSS10: {
        band: pss?.band ?? "unknown",
        percentile: pss?.normative_percentile ?? null,
        subscale_pattern:
          (pss?.helplessness_score ?? 0) > (pss?.efficacy_score ?? 0)
            ? "helplessness_dominant"
            : "efficacy_stronger",
      },
      PHQ8: {
        band: phq?.band ?? "unknown",
        percentile: phq?.normative_percentile ?? null,
        somatic_high: somatic >= cognitive,
        cognitive_high: cognitive > somatic,
      },
      MAIA2: maia2Summary(maia),
      PCL5: {
        band: pcl?.band ?? "unknown",
        percentile: pcl?.normative_percentile ?? null,
        dominant_cluster:
          (pcl?.cluster_scores as { dominant_cluster?: string } | null)
            ?.dominant_cluster ?? null,
        write_in_text: pcl?.write_in_text ?? null,
      },
      PID5SF: pid5Dominant(pid),
    },
    flags_fired: flagsFor(scoreRows),
    top_endorsed_items: topFive,
  };
}

export function buildRowPayload(
  sectionName: string,
  instrument: Instrument,
  scoreRows: ScoreRow[],
  responses: Parameters<typeof buildTopItems>[0]
) {
  const row = rowFor(scoreRows, instrument);
  const topItems = topItemsForInstrument(responses, instrument, 2).map(
    (item) => ({
      item_text: item.item_text,
      response_label: item.response_label,
      response_value: item.response_value,
    })
  );

  const maia = instrument === "MAIA2" ? maia2Summary(row) : null;
  const pid = instrument === "PID5SF" ? pid5Dominant(row) : null;
  const pclCluster =
    instrument === "PCL5"
      ? (row?.cluster_scores as { dominant_cluster?: string } | null)
          ?.dominant_cluster ?? null
      : null;

  return {
    generation_target: "collapsible_row_observation",
    section: sectionName,
    instrument:
      instrument === "PSS10"
        ? "PSS-10"
        : instrument === "PHQ8"
          ? "PHQ-8"
          : instrument === "MAIA2"
            ? "MAIA-2"
            : instrument === "PCL5"
              ? "PCL-5"
              : "PID-5-SF",
    band: row?.band ?? maia?.overall_pattern ?? "unknown",
    percentile: row?.normative_percentile ?? row?.clinical_percentile ?? null,
    subscale_pattern:
      instrument === "PSS10"
        ? (row?.helplessness_score ?? 0) > (row?.efficacy_score ?? 0)
          ? "helplessness_dominant"
          : "efficacy_stronger"
        : instrument === "MAIA2"
          ? maia?.overall_pattern ?? null
          : null,
    dominant_cluster: pclCluster,
    dominant_domain: pid?.dominant_domain ?? null,
    write_in_text: row?.write_in_text ?? null,
    flags_fired: flagsFor(scoreRows, instrument),
    top_items: topItems,
  };
}

export function rowIndexToSection(rowTarget: string): (typeof RESULT_ROW_META)[number] | null {
  const match = rowTarget.match(/^row_([1-5])$/);
  if (!match) return null;
  const index = Number(match[1]) - 1;
  return RESULT_ROW_META[index] ?? null;
}

export type GenerationTarget =
  | "synthesis_paragraph"
  | "row_1"
  | "row_2"
  | "row_3"
  | "row_4"
  | "row_5"
  | "all";

export function targetsForRequest(target: GenerationTarget): GenerationTarget[] {
  if (target === "all") {
    return [
      "synthesis_paragraph",
      "row_1",
      "row_2",
      "row_3",
      "row_4",
      "row_5",
    ];
  }
  return [target];
}
