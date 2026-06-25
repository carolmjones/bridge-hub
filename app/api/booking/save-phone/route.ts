import { NextRequest, NextResponse } from "next/server";
import { upsertBookingPhone } from "@/lib/booking/helpers";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

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
      phone_number?: string;
      phone_prefix?: string;
    };

    const sessionId = body.session_id?.trim();
    if (!sessionId) {
      return NextResponse.json(
        { error: "session_id is required." },
        { status: 400 }
      );
    }

    const { data: session } = await supabase
      .from("sessions")
      .select("id, user_id, status")
      .eq("id", sessionId)
      .single();

    if (!session || session.user_id !== user.id) {
      return NextResponse.json({ error: "Session not found." }, { status: 404 });
    }

    if (session.status !== "completed") {
      return NextResponse.json(
        { error: "Complete the screening before booking." },
        { status: 400 }
      );
    }

    const phoneNumber = body.phone_number?.trim() || null;
    const phonePrefix = body.phone_prefix?.trim() || null;

    await upsertBookingPhone(sessionId, user.id, phoneNumber, phonePrefix);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("save-phone:", error);
    return NextResponse.json(
      { error: "Could not save phone number." },
      { status: 500 }
    );
  }
}
