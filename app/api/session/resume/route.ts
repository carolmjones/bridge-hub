import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "in_progress")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (sessionError) {
      throw sessionError;
    }

    if (!session) {
      return NextResponse.json(
        { error: "No active session found." },
        { status: 404 }
      );
    }

    const { data: responses, error: responsesError } = await supabase
      .from("responses")
      .select("*")
      .eq("session_id", session.id)
      .order("instrument")
      .order("item_number");

    if (responsesError) {
      throw responsesError;
    }

    return NextResponse.json({
      session,
      responses: responses ?? [],
      current_section: session.current_section,
      current_item: session.current_item,
    });
  } catch (error) {
    console.error("session resume:", error);
    return NextResponse.json(
      { error: "Could not load session." },
      { status: 500 }
    );
  }
}
