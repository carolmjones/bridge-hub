import { NextRequest, NextResponse } from "next/server";
import { getResultsForSession } from "@/lib/results/get-results";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { session_id: string } }
) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const results = await getResultsForSession(params.session_id, user.id);

    if (!results) {
      return NextResponse.json(
        { error: "Results not available." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      scores: results.scores,
      framework: results.framework,
      patterns: results.patterns,
      top_items: results.top_items,
      write_in: results.write_in,
      row_observations: results.row_observations,
      first_name: results.first_name,
    });
  } catch (error) {
    console.error("results GET:", error);
    return NextResponse.json(
      { error: "Could not load results." },
      { status: 500 }
    );
  }
}
