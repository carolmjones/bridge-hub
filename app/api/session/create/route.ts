import { NextRequest, NextResponse } from "next/server";
import {
  establishAuthSession,
  getOrCreateAuthUser,
} from "@/lib/auth/users";
import { createAssessmentSession } from "@/lib/session/helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      email?: string;
      first_name?: string;
      opted_in?: boolean;
    };

    const supabase = createClient();
    const {
      data: { user: existingAuthUser },
    } = await supabase.auth.getUser();

    if (existingAuthUser) {
      const session = await createAssessmentSession(existingAuthUser.id);
      return NextResponse.json({
        session_id: session.id,
        user_id: existingAuthUser.id,
      });
    }

    const email = body.email?.trim().toLowerCase();
    const firstName = body.first_name?.trim();

    if (!email || !firstName) {
      return NextResponse.json(
        { error: "Email and first name are required." },
        { status: 400 }
      );
    }

    const optedIn = Boolean(body.opted_in);
    const authUser = await getOrCreateAuthUser(email, firstName, optedIn);

    const admin = createAdminClient();
    await admin.from("users").upsert(
      {
        id: authUser.id,
        email,
        first_name: firstName,
        opted_in: optedIn,
      },
      { onConflict: "id" }
    );

    const assessmentSession = await createAssessmentSession(authUser.id);
    const authSession = await establishAuthSession(email);

    const { error: sessionError } = await supabase.auth.setSession({
      access_token: authSession.access_token,
      refresh_token: authSession.refresh_token,
    });

    if (sessionError) {
      throw sessionError;
    }

    return NextResponse.json({
      session_id: assessmentSession.id,
      user_id: authUser.id,
    });
  } catch (error) {
    console.error("session create:", error);
    return NextResponse.json(
      { error: "Could not start your session. Please try again." },
      { status: 500 }
    );
  }
}
