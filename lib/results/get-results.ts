import { RESULT_ROW_META } from "@/lib/copy/touchpoint1";
import { buildTopItems, topItemsForInstrument } from "@/lib/results/top-items";
import type { Instrument } from "@/lib/types/database";
import { createClient } from "@/lib/supabase/server";

export type UserScoreSummary = {
  instrument: Instrument;
  band: string | null;
  total_score: number | null;
  subscale_scores: Record<string, unknown> | null;
  subscale_bands: Record<string, unknown> | null;
};

export type ResultsPayload = {
  session_id: string;
  first_name: string;
  scores: UserScoreSummary[];
  framework: Record<string, string> | null;
  patterns: Array<{ id: string; name: string; description: string }>;
  top_items: ReturnType<typeof buildTopItems>;
  write_in: string | null;
  row_observations: Record<string, string>;
  synthesis: string | null;
};

function bandForInstrument(
  instrument: Instrument,
  row: {
    band: string | null;
    subscale_bands: Record<string, unknown> | null;
  }
): string {
  if (row.band) return row.band;
  if (instrument === "MAIA2" && row.subscale_bands) {
    const bands = Object.values(row.subscale_bands) as string[];
    if (bands.filter((b) => b === "limited").length >= 3) return "limited";
    if (bands.filter((b) => b === "strong").length >= 2) return "strong";
    return "developing";
  }
  if (instrument === "PID5SF" && row.subscale_bands) {
    const domains = (row.subscale_bands as { domains?: Record<string, string> })
      .domains;
    if (domains) {
      const vals = Object.values(domains);
      if (vals.some((b) => b === "significant")) return "significant";
      if (vals.some((b) => b === "elevated")) return "elevated";
    }
  }
  return "unknown";
}

function fallbackRowObservation(
  sectionName: string,
  band: string,
  hasItems: boolean
): string {
  if (!hasItems) {
    return "This section did not show one dominant difficulty, which may mean this is an area where you currently have more capacity.";
  }
  if (band === "low" || band === "lower" || band === "strong") {
    return `Your answers in ${sectionName} did not point toward one dominant difficulty — there may be more capacity here than in other areas.`;
  }
  if (band === "high" || band === "significant") {
    return `A consistent thread of strain came through in your answers for ${sectionName}.`;
  }
  return `Something meaningful came through in how you answered the ${sectionName} questions — worth exploring in your Clarity Call.`;
}

export async function getResultsForSession(
  sessionId: string,
  userId: string
): Promise<ResultsPayload | null> {
  const supabase = createClient();

  const { data: session } = await supabase
    .from("sessions")
    .select("id, user_id, status")
    .eq("id", sessionId)
    .single();

  if (!session || session.user_id !== userId) return null;
  if (session.status !== "completed") return null;

  const { data: profile } = await supabase
    .from("users")
    .select("first_name")
    .eq("id", userId)
    .single();

  const { data: scoreRows } = await supabase
    .from("scores")
    .select(
      "instrument, total_score, band, subscale_scores, subscale_bands, dimensional_framework, pattern_matches, write_in_text"
    )
    .eq("session_id", sessionId);

  if (!scoreRows?.length) return null;

  const { data: responses } = await supabase
    .from("responses")
    .select("*")
    .eq("session_id", sessionId);

  const pidRow = scoreRows.find((s) => s.instrument === "PID5SF");
  const pclRow = scoreRows.find((s) => s.instrument === "PCL5");

  const scores: UserScoreSummary[] = scoreRows.map((row) => ({
    instrument: row.instrument as Instrument,
    band: row.band,
    total_score: row.total_score,
    subscale_scores: row.subscale_scores as Record<string, unknown> | null,
    subscale_bands: row.subscale_bands as Record<string, unknown> | null,
  }));

  const row_observations: Record<string, string> = {};
  for (const meta of RESULT_ROW_META) {
    const scoreRow = scoreRows.find((s) => s.instrument === meta.instrument);
    const band = scoreRow
      ? bandForInstrument(meta.instrument, {
          band: scoreRow.band,
          subscale_bands: scoreRow.subscale_bands as Record<string, unknown> | null,
        })
      : "unknown";
    const items = topItemsForInstrument(responses ?? [], meta.instrument);
    row_observations[meta.name] = fallbackRowObservation(
      meta.name,
      band,
      items.length > 0
    );
  }

  return {
    session_id: sessionId,
    first_name: profile?.first_name ?? "",
    scores,
    framework: (pidRow?.dimensional_framework as Record<string, string>) ?? null,
    patterns:
      (pidRow?.pattern_matches as Array<{
        id: string;
        name: string;
        description: string;
      }>) ?? [],
    top_items: buildTopItems(responses ?? []),
    write_in: (pclRow?.write_in_text as string | null) ?? null,
    row_observations,
    synthesis: null,
  };
}
