import { callOpenRouter } from "@/lib/ai/openrouter";
import {
  buildRowPayload,
  buildSynthesisPayload,
  rowIndexToSection,
  type GenerationTarget,
  targetsForRequest,
} from "@/lib/ai/build-touchpoint-payload";
import {
  ROW_OBSERVATION_SYSTEM_PROMPT,
  SECTION_INSTRUCTIONS,
  SYNTHESIS_SYSTEM_PROMPT,
} from "@/lib/ai/prompts/touchpoint1";
import { stripInternalNotes } from "@/lib/ai/strip-internal-notes";
import { RESULT_ROW_META } from "@/lib/copy/touchpoint1";
import { getOpenRouterApiKey } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Response } from "@/lib/types/database";

export type TouchpointAiCache = {
  synthesis: string | null;
  row_observations: Record<string, string>;
  generated_at?: string;
};

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

export async function loadTouchpointAiCache(
  sessionId: string
): Promise<TouchpointAiCache | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("sessions")
    .select("touchpoint_ai")
    .eq("id", sessionId)
    .maybeSingle();

  if (error) throw error;
  if (!data?.touchpoint_ai) return null;
  return data.touchpoint_ai as TouchpointAiCache;
}

async function saveTouchpointAiCache(
  sessionId: string,
  cache: TouchpointAiCache
): Promise<void> {
  const admin = createAdminClient();
  const { error } = await admin
    .from("sessions")
    .update({
      touchpoint_ai: {
        ...cache,
        generated_at: cache.generated_at ?? new Date().toISOString(),
      },
    })
    .eq("id", sessionId);

  if (error) throw error;
}

async function generateSynthesis(
  firstName: string,
  scoreRows: ScoreRow[],
  responses: Response[]
): Promise<string> {
  const payload = buildSynthesisPayload(firstName, scoreRows, responses);
  const raw = await callOpenRouter(SYNTHESIS_SYSTEM_PROMPT, payload, 400);
  return stripInternalNotes(raw);
}

async function generateRowObservation(
  sectionName: string,
  scoreRows: ScoreRow[],
  responses: Response[]
): Promise<string> {
  const meta = RESULT_ROW_META.find((r) => r.name === sectionName);
  if (!meta) throw new Error(`Unknown section: ${sectionName}`);

  const payload = buildRowPayload(
    sectionName,
    meta.instrument,
    scoreRows,
    responses
  );
  const sectionInstruction = SECTION_INSTRUCTIONS[sectionName];
  const systemPrompt = `${ROW_OBSERVATION_SYSTEM_PROMPT}\n\nSECTION-SPECIFIC INSTRUCTION:\n${sectionInstruction}`;

  const raw = await callOpenRouter(systemPrompt, payload, 250);
  return stripInternalNotes(raw);
}

function cacheHasTarget(cache: TouchpointAiCache, target: GenerationTarget): boolean {
  if (target === "synthesis_paragraph") {
    return Boolean(cache.synthesis?.trim());
  }
  const section = rowIndexToSection(target);
  if (!section) return false;
  return Boolean(cache.row_observations[section.name]?.trim());
}

export type GenerateTouchpointResult = {
  synthesis: string | null;
  row_observations: Record<string, string>;
  generated: GenerationTarget[];
  cached: boolean;
};

export async function generateTouchpointContent(
  sessionId: string,
  userId: string,
  generationTarget: GenerationTarget = "all"
): Promise<GenerateTouchpointResult> {
  if (!getOpenRouterApiKey()) {
    throw new Error("AI generation is not configured.");
  }

  const admin = createAdminClient();

  const { data: session, error: sessionError } = await admin
    .from("sessions")
    .select("id, user_id, status, touchpoint_ai")
    .eq("id", sessionId)
    .single();

  if (sessionError || !session || session.user_id !== userId) {
    throw new Error("Session not found.");
  }
  if (session.status !== "completed") {
    throw new Error("Session is not completed.");
  }

  const { data: profile } = await admin
    .from("users")
    .select("first_name")
    .eq("id", userId)
    .single();

  const { data: scoreRows, error: scoresError } = await admin
    .from("scores")
    .select(
      "instrument, band, normative_percentile, clinical_percentile, helplessness_score, efficacy_score, subscale_scores, subscale_bands, cluster_scores, flags_fired, write_in_text"
    )
    .eq("session_id", sessionId);

  if (scoresError || !scoreRows?.length) {
    throw new Error("Scores not available.");
  }

  const { data: responses, error: responsesError } = await admin
    .from("responses")
    .select("*")
    .eq("session_id", sessionId);

  if (responsesError) {
    throw new Error("Responses not available.");
  }

  const existing: TouchpointAiCache = (session.touchpoint_ai as TouchpointAiCache) ?? {
    synthesis: null,
    row_observations: {},
  };

  const targets = targetsForRequest(generationTarget);
  const generated: GenerationTarget[] = [];
  let cache: TouchpointAiCache = {
    synthesis: existing.synthesis,
    row_observations: { ...existing.row_observations },
    generated_at: existing.generated_at,
  };

  for (const target of targets) {
    if (cacheHasTarget(cache, target)) continue;

    if (target === "synthesis_paragraph") {
      cache.synthesis = await generateSynthesis(
        profile?.first_name ?? "",
        scoreRows as ScoreRow[],
        (responses ?? []) as Response[]
      );
      generated.push(target);
      continue;
    }

    const section = rowIndexToSection(target);
    if (!section) continue;

    cache.row_observations[section.name] = await generateRowObservation(
      section.name,
      scoreRows as ScoreRow[],
      (responses ?? []) as Response[]
    );
    generated.push(target);
  }

  if (generated.length > 0) {
    await saveTouchpointAiCache(sessionId, cache);
  }

  return {
    synthesis: cache.synthesis,
    row_observations: cache.row_observations,
    generated,
    cached: generated.length === 0,
  };
}
