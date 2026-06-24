import { NextRequest, NextResponse } from "next/server";
import {
  establishAuthSession,
  validateMagicLinkToken,
} from "@/lib/auth/users";
import { getPostAuthRedirect, getLatestSessionForUser } from "@/lib/session/helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createRouteClient } from "@/lib/supabase/route";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const appOrigin = new URL(request.url).origin;

  if (!token) {
    return NextResponse.redirect(new URL("/expired", appOrigin));
  }

  try {
    const validated = await validateMagicLinkToken(token);
    if (!validated) {
      return NextResponse.redirect(new URL("/expired", appOrigin));
    }

    const admin = createAdminClient();
    const { data: user, error: userError } = await admin
      .from("users")
      .select("email")
      .eq("id", validated.userId)
      .single();

    if (userError || !user?.email) {
      return NextResponse.redirect(new URL("/expired", appOrigin));
    }

    const authSession = await establishAuthSession(user.email);
    const assessmentSession = await getLatestSessionForUser(validated.userId);
    const redirectPath = getPostAuthRedirect(assessmentSession);
    const response = NextResponse.redirect(new URL(redirectPath, appOrigin));

    const supabase = createRouteClient(request, response);
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: authSession.access_token,
      refresh_token: authSession.refresh_token,
    });

    if (sessionError) {
      throw sessionError;
    }

    return response;
  } catch (error) {
    console.error("auth verify:", error);
    return NextResponse.redirect(new URL("/expired", appOrigin));
  }
}
