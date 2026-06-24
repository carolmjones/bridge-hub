import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Instrument } from "@/lib/types/database";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      session_id?: string;
      instrument?: Instrument;
      item_number?: number;
      response_value?: number;
      reverse_scored?: boolean;
      current_section?: number;
      current_item?: number;
      section_start?: string;
      section_end?: string;
    };

    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      session_id,
      instrument,
      item_number,
      response_value,
      reverse_scored,
      current_section,
      current_item,
      section_start,
      section_end,
    } = body;

    if (
      !session_id ||
      !instrument ||
      !item_number ||
      response_value === undefined
    ) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("id, user_id")
      .eq("id", session_id)
      .single();

    if (sessionError || !session || session.user_id !== user.id) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const { error: upsertError } = await supabase.from("responses").upsert(
      {
        session_id,
        user_id: user.id,
        instrument,
        item_number,
        response_value,
        reverse_scored: Boolean(reverse_scored),
        section_start: section_start ?? null,
        section_end: section_end ?? null,
      },
      { onConflict: "session_id,instrument,item_number" }
    );

    if (upsertError) {
      throw upsertError;
    }

    if (current_section !== undefined && current_item !== undefined) {
      const { error: updateError } = await supabase
        .from("sessions")
        .update({
          current_section,
          current_item,
        })
        .eq("id", session_id);

      if (updateError) {
        throw updateError;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("save-response:", error);
    return NextResponse.json({ error: "Could not save response" }, { status: 500 });
  }
}
