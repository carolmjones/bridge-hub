import { createAdminClient } from "@/lib/supabase/admin";
import type { Instrument } from "@/lib/types/database";
import type {
  DimensionalFramework,
  InstrumentResult,
  PatternMatch,
  Pid5SfResult,
} from "@/lib/scoring/types";
import { detectInstrumentFlags } from "@/lib/scoring/flags";

function resultToRow(
  sessionId: string,
  userId: string,
  result: InstrumentResult,
  extras?: {
    dimensionalFramework?: DimensionalFramework | null;
    patternMatches?: PatternMatch[] | null;
    writeInText?: string | null;
  }
) {
  const flags = detectInstrumentFlags(result);
  const base = {
    session_id: sessionId,
    user_id: userId,
    instrument: result.instrument,
    flags_fired: flags,
    time_taken_seconds: result.timeTakenSeconds,
    dimensional_framework: extras?.dimensionalFramework ?? null,
    pattern_matches: extras?.patternMatches ?? null,
  };

  switch (result.instrument) {
    case "PSS10":
      return {
        ...base,
        total_score: result.total,
        band: result.band,
        normative_percentile: result.normativePercentile,
        helplessness_score: result.helplessnessScore,
        efficacy_score: result.selfEfficacyScore,
        subscale_scores: { mean_total: result.meanTotal },
      };
    case "PHQ8":
      return {
        ...base,
        total_score: result.total,
        band: result.userBand,
        normative_percentile: result.normativePercentile,
        subscale_scores: {
          mean_total: result.meanTotal,
          clinical_band: result.clinicalBand,
          cognitive_affective: result.cognitiveAffective,
          somatic_vegetative: result.somaticVegetative,
          functional: result.functional,
        },
      };
    case "MAIA2":
      return {
        ...base,
        total_score: null,
        band: null,
        subscale_scores: Object.fromEntries(
          Object.entries(result.subscales).map(([k, v]) => [k, v.average])
        ),
        subscale_bands: Object.fromEntries(
          Object.entries(result.subscales).map(([k, v]) => [k, v.band])
        ),
        subscale_percentiles: Object.fromEntries(
          Object.entries(result.subscales).map(([k, v]) => [k, v.percentile])
        ),
      };
    case "PCL5":
      return {
        ...base,
        total_score: result.total,
        band: result.userBand,
        normative_percentile: result.normativePercentile,
        clinical_percentile: result.clinicalPercentile,
        dsm5_algorithm_met: result.dsm5AlgorithmMet,
        write_in_text: extras?.writeInText ?? result.worstEventText,
        cluster_scores: {
          ...result.clusters,
          means: result.clusterMeans,
          descriptors: result.clusterDescriptors,
          descriptor_total: result.descriptorTotal,
          raw_clinical_band: result.rawClinicalBand,
          probable_ptsd: result.probablePtsdByTotal,
          symptom_counts: result.clusterSymptomCounts,
          dominant_cluster: result.dominantCluster,
        },
        subscale_scores: { mean_total: result.meanTotal },
      };
    case "PID5SF": {
      const pid = result as Pid5SfResult;
      return {
        ...base,
        total_score: null,
        band: null,
        subscale_scores: {
          domains: Object.fromEntries(
            Object.entries(pid.domains).map(([k, v]) => [k, v.average])
          ),
          facets: Object.fromEntries(
            Object.entries(pid.facets).map(([k, v]) => [k, v.average])
          ),
        },
        subscale_bands: {
          domains: Object.fromEntries(
            Object.entries(pid.domains).map(([k, v]) => [k, v.band])
          ),
          facets: Object.fromEntries(
            Object.entries(pid.facets).map(([k, v]) => [k, v.band])
          ),
        },
        subscale_percentiles: {
          domains: Object.fromEntries(
            Object.entries(pid.domains).map(([k, v]) => [k, v.percentile])
          ),
          facets: Object.fromEntries(
            Object.entries(pid.facets).map(([k, v]) => [k, v.percentile])
          ),
        },
      };
    }
    default:
      throw new Error("Unsupported instrument");
  }
}

export async function persistScoreResult(
  sessionId: string,
  userId: string,
  result: InstrumentResult,
  extras?: {
    dimensionalFramework?: DimensionalFramework | null;
    patternMatches?: PatternMatch[] | null;
    writeInText?: string | null;
  }
) {
  const admin = createAdminClient();
  const row = resultToRow(sessionId, userId, result, extras);

  const { error } = await admin.from("scores").upsert(row as Record<string, unknown>, {
    onConflict: "session_id,instrument",
  });

  if (error) throw error;
}

export async function markSessionCompleted(sessionId: string) {
  const admin = createAdminClient();
  const { error } = await admin
    .from("sessions")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("id", sessionId);
  if (error) throw error;
}

export async function loadExistingResults(
  sessionId: string
): Promise<Instrument[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("scores")
    .select("instrument")
    .eq("session_id", sessionId);
  if (error) throw error;
  return (data ?? []).map((row) => row.instrument as Instrument);
}
