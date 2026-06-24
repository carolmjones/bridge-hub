import { NextRequest, NextResponse } from "next/server";
import {
  createMagicLinkToken,
  getAuthUserByEmail,
} from "@/lib/auth/users";
import { sendMagicLinkEmail } from "@/lib/email/resend";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      email?: string;
      first_name?: string;
    };

    const email = body.email?.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }

    const authUser = await getAuthUserByEmail(email);

    // Always return success to avoid email enumeration (R1/R2)
    if (!authUser) {
      return NextResponse.json({ success: true });
    }

    const admin = createAdminClient();
    const { data: profile } = await admin
      .from("users")
      .select("first_name")
      .eq("id", authUser.id)
      .maybeSingle();

    const firstName =
      profile?.first_name ||
      (authUser.user_metadata?.first_name as string | undefined) ||
      body.first_name?.trim() ||
      "";

    const token = await createMagicLinkToken(authUser.id);
    await sendMagicLinkEmail(email, firstName, token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("request-magic-link:", error);
    return NextResponse.json(
      { error: "Could not send resume link. Please try again." },
      { status: 500 }
    );
  }
}
