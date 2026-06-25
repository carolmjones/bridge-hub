import type { Instrument, Response } from "@/lib/types/database";
import { scoreMaia2 } from "@/lib/scoring/maia2";
import { scorePcl5 } from "@/lib/scoring/pcl5";
import { scorePhq8 } from "@/lib/scoring/phq8";
import { scorePid5Sf } from "@/lib/scoring/pid5sf";
import { scorePss10 } from "@/lib/scoring/pss10";
import { detectInstrumentFlags } from "@/lib/scoring/flags";
import { buildCrossInstrumentSummary } from "@/lib/scoring/framework";
import type {
  InstrumentResult,
  ScoringTiming,
  SessionScores,
} from "@/lib/scoring/types";
import type { ResponseMap } from "@/lib/scoring/utils";

export function responsesToMap(rows: Response[]): ResponseMap {
  const map: ResponseMap = {};
  for (const row of rows) {
    map[row.item_number] = row.response_value;
  }
  return map;
}

export function deriveSectionTiming(
  rows: Response[],
  sectionEnd: string | null
): ScoringTiming {
  const starts = rows
    .map((r) => r.section_start)
    .filter((v): v is string => Boolean(v));
  const ends = rows
    .map((r) => r.section_end)
    .filter((v): v is string => Boolean(v));

  const sectionStart =
    starts.length > 0
      ? starts.sort()[0]
      : null;
  const sectionEndFromRows =
    ends.length > 0 ? ends.sort().reverse()[0] : null;

  return {
    sectionStart,
    sectionEnd: sectionEnd ?? sectionEndFromRows,
  };
}

export function scoreInstrument(
  instrument: Instrument,
  responses: ResponseMap,
  timing: ScoringTiming,
  options?: { writeInText?: string | null }
): InstrumentResult {
  switch (instrument) {
    case "PSS10":
      return scorePss10(responses, timing);
    case "PHQ8":
      return scorePhq8(responses, timing);
    case "MAIA2":
      return scoreMaia2(responses, timing);
    case "PCL5":
      return scorePcl5(responses, timing, options?.writeInText ?? null);
    case "PID5SF":
      return scorePid5Sf(responses, timing);
    default:
      throw new Error(`Unknown instrument: ${instrument}`);
  }
}

export function resultToSessionScores(
  existing: SessionScores,
  result: InstrumentResult
): SessionScores {
  return { ...existing, [result.instrument]: result };
}

export function sessionScoresFromResults(
  results: InstrumentResult[]
): SessionScores {
  const scores: SessionScores = {};
  for (const result of results) {
    scores[result.instrument] = result as never;
  }
  return scores;
}

export function withInstrumentFlags(result: InstrumentResult): InstrumentResult {
  return {
    ...result,
    flags: detectInstrumentFlags(result),
  } as InstrumentResult & { flags: string[] };
}

export function finalizeSessionScores(allResults: InstrumentResult[]) {
  const scores = sessionScoresFromResults(allResults);
  const { framework, patterns } = buildCrossInstrumentSummary(scores);
  return { scores, framework, patterns };
}

/** User-safe summary returned to client — no safety or flag details. */
export function toClientScoreSummary(result: InstrumentResult) {
  switch (result.instrument) {
    case "PSS10":
      return {
        instrument: result.instrument,
        total: result.total,
        band: result.band,
      };
    case "PHQ8":
      return {
        instrument: result.instrument,
        total: result.total,
        band: result.userBand,
      };
    case "MAIA2":
      return {
        instrument: result.instrument,
        subscales: Object.fromEntries(
          Object.entries(result.subscales).map(([key, sub]) => [
            key,
            { average: sub.average, band: sub.band },
          ])
        ),
      };
    case "PCL5":
      return {
        instrument: result.instrument,
        total: result.total,
        band: result.userBand,
        dominant_cluster: result.dominantCluster,
      };
    case "PID5SF":
      return {
        instrument: result.instrument,
        domains: Object.fromEntries(
          Object.entries(result.domains).map(([key, d]) => [
            key,
            { average: d.average, band: d.band },
          ])
        ),
      };
  }
}
