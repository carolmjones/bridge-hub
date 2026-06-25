import { NextRequest, NextResponse } from "next/server";
import {
  deriveSectionTiming,
  finalizeSessionScores,
  responsesToMap,
  scoreInstrument,
  toClientScoreSummary,
} from "@/lib/scoring/engine";
import {
  markSessionCompleted,
  persistScoreResult,
} from "@/lib/scoring/persist";
import { createClient } from "@/lib/supabase/server";
import type { Instrument, Response } from "@/lib/types/database";

export const dynamic = "force-dynamic";

const INSTRUMENTS: Instrument[] = [
  "PSS10",
  "PHQ8",
  "MAIA2",
  "PCL5",
  "PID5SF",
];

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      session_id?: string;
      instrument?: Instrument;
      section_end_time?: string;
      write_in_text?: string;
      complete_assessment?: boolean;
    };

    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { session_id, instrument, section_end_time, write_in_text } = body;

    if (!session_id || !instrument) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("id, user_id, status")
      .eq("id", session_id)
      .single();

    if (sessionError || !session || session.user_id !== user.id) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const sectionEnd = section_end_time ?? new Date().toISOString();
    const isFinal = instrument === "PID5SF" || body.complete_assessment;

    if (isFinal) {
      const { data: allResponses, error: responsesError } = await supabase
        .from("responses")
        .select("*")
        .eq("session_id", session_id);

      if (responsesError) throw responsesError;

      const grouped = INSTRUMENTS.reduce(
        (acc, inst) => {
          acc[inst] = (allResponses ?? []).filter(
            (row) => row.instrument === inst
          );
          return acc;
        },
        {} as Record<Instrument, Response[]>
      );

      const results = INSTRUMENTS.map((inst) => {
        const rows = grouped[inst];
        const timing = deriveSectionTiming(rows, inst === instrument ? sectionEnd : null);
        return scoreInstrument(
          inst,
          responsesToMap(rows),
          timing,
          inst === "PCL5" ? { writeInText: write_in_text ?? null } : undefined
        );
      });

      const { framework, patterns } = finalizeSessionScores(results);

      for (const result of results) {
        const isPid = result.instrument === "PID5SF";
        await persistScoreResult(session_id, user.id, result, {
          dimensionalFramework: isPid ? framework : null,
          patternMatches: isPid ? patterns : null,
          writeInText:
            result.instrument === "PCL5" ? write_in_text ?? null : undefined,
        });
      }

      await markSessionCompleted(session_id);

      return NextResponse.json({
        success: true,
        completed: true,
        scores: results.map(toClientScoreSummary),
      });
    }

    const { data: instrumentResponses, error: instError } = await supabase
      .from("responses")
      .select("*")
      .eq("session_id", session_id)
      .eq("instrument", instrument);

    if (instError) throw instError;

    const timing = deriveSectionTiming(instrumentResponses ?? [], sectionEnd);
    const result = scoreInstrument(
      instrument,
      responsesToMap(instrumentResponses ?? []),
      timing,
      instrument === "PCL5" ? { writeInText: write_in_text ?? null } : undefined
    );

    await persistScoreResult(session_id, user.id, result, {
      writeInText: instrument === "PCL5" ? write_in_text ?? null : undefined,
    });

    return NextResponse.json({
      success: true,
      completed: false,
      score: toClientScoreSummary(result),
    });
  } catch (error) {
    console.error("complete-section:", error);
    return NextResponse.json(
      { error: "Could not complete section scoring." },
      { status: 500 }
    );
  }
}
