import { NextRequest, NextResponse } from "next/server";
import { getCalWebhookSecret } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type CalWebhookBody = {
  triggerEvent?: string;
  payload?: {
    bookingId?: number;
    uid?: string;
    startTime?: string;
    endTime?: string;
    attendees?: Array<{ email?: string; name?: string }>;
    metadata?: Record<string, string>;
  };
};

function verifyWebhookSecret(request: NextRequest): boolean {
  const secret = getCalWebhookSecret();
  if (!secret) return false;

  const header =
    request.headers.get("x-cal-webhook-secret") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  return header === secret;
}

export async function POST(request: NextRequest) {
  if (!verifyWebhookSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as CalWebhookBody;
    const event = body.triggerEvent;

    if (event !== "BOOKING_CREATED") {
      return NextResponse.json({ success: true, skipped: true });
    }

    const payload = body.payload;
    if (!payload?.uid) {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    const attendeeEmail = payload.attendees?.[0]?.email?.toLowerCase();
    const sessionIdFromMeta = payload.metadata?.session_id;

    const admin = createAdminClient();

    let sessionId = sessionIdFromMeta;
    let userId: string | undefined;

    if (!sessionId && attendeeEmail) {
      const { data: profile } = await admin
        .from("users")
        .select("id")
        .eq("email", attendeeEmail)
        .maybeSingle();

      if (profile) {
        userId = profile.id;
        const { data: session } = await admin
          .from("sessions")
          .select("id")
          .eq("user_id", profile.id)
          .eq("status", "completed")
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        sessionId = session?.id;
      }
    }

    if (!sessionId) {
      console.error("cal-webhook: could not resolve session", payload.uid);
      return NextResponse.json({ error: "Session not found." }, { status: 404 });
    }

    if (!userId) {
      const { data: session } = await admin
        .from("sessions")
        .select("user_id")
        .eq("id", sessionId)
        .single();
      userId = session?.user_id;
    }

    if (!userId) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const { data: existing } = await admin
      .from("bookings")
      .select("id")
      .eq("session_id", sessionId)
      .maybeSingle();

    const bookingRow = {
      session_id: sessionId,
      user_id: userId,
      cal_booking_id: String(payload.bookingId ?? ""),
      cal_booking_uid: payload.uid,
      booked_at: new Date().toISOString(),
      call_at: payload.startTime ?? null,
      status: "confirmed" as const,
    };

    let bookingId: string;

    if (existing) {
      const { error } = await admin
        .from("bookings")
        .update(bookingRow)
        .eq("id", existing.id);
      if (error) throw error;
      bookingId = existing.id;
    } else {
      const { data, error } = await admin
        .from("bookings")
        .insert(bookingRow)
        .select("id")
        .single();
      if (error) throw error;
      bookingId = data.id;
    }

    // PDF generation + confirmation email — Phase 5b (next)
    console.log("cal-webhook: booking confirmed", {
      bookingId,
      sessionId,
      uid: payload.uid,
    });

    return NextResponse.json({ success: true, booking_id: bookingId });
  } catch (error) {
    console.error("cal-webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
