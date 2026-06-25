import { NextRequest, NextResponse } from "next/server";
import {
  generateTouchpointContent,
  type GenerateTouchpointResult,
} from "@/lib/ai/touchpoint-ai";
import type { GenerationTarget } from "@/lib/ai/build-touchpoint-payload";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const VALID_TARGETS = new Set<GenerationTarget>([
  "synthesis_paragraph",
  "results_overview_paragraph",
  "row_1",
  "row_2",
  "row_3",
  "row_4",
  "row_5",
  "all",
]);

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      session_id?: string;
      generation_target?: string;
    };

    const sessionId = body.session_id?.trim();
    if (!sessionId) {
      return NextResponse.json(
        { error: "session_id is required." },
        { status: 400 }
      );
    }

    const target = (body.generation_target?.trim() ||
      "all") as GenerationTarget;

    if (!VALID_TARGETS.has(target)) {
      return NextResponse.json(
        { error: "Invalid generation_target." },
        { status: 400 }
      );
    }

    let result: GenerateTouchpointResult;
    try {
      result = await generateTouchpointContent(sessionId, user.id, target);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Generation failed.";
      if (message === "AI generation is not configured.") {
        return NextResponse.json({ error: message }, { status: 503 });
      }
      if (
        message === "Session not found." ||
        message === "Session is not completed." ||
        message === "Scores not available."
      ) {
        return NextResponse.json({ error: message }, { status: 404 });
      }
      throw error;
    }

    return NextResponse.json({
      content: result.synthesis,
      synthesis: result.synthesis,
      overview_paragraph: result.overview_paragraph,
      row_observations: result.row_observations,
      generated: result.generated,
      cached: result.cached,
    });
  } catch (error) {
    console.error("generate-ai-content:", error);
    return NextResponse.json(
      { error: "Could not generate content." },
      { status: 500 }
    );
  }
}
