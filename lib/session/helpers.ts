import { createAdminClient } from "@/lib/supabase/admin";
import type { Session } from "@/lib/types/database";

export async function createAssessmentSession(userId: string): Promise<Session> {
  const admin = createAdminClient();
  const now = new Date().toISOString();

  const { data, error } = await admin
    .from("sessions")
    .insert({
      user_id: userId,
      status: "in_progress",
      current_section: 1,
      current_item: 1,
      time_started: now,
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create session");
  }

  return data as Session;
}

export async function getLatestSessionForUser(
  userId: string
): Promise<Session | null> {
  const admin = createAdminClient();

  const { data: inProgress } = await admin
    .from("sessions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "in_progress")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (inProgress) {
    return inProgress as Session;
  }

  const { data: latest } = await admin
    .from("sessions")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (latest as Session | null) ?? null;
}

export function getPostAuthRedirect(session: Session | null): string {
  if (!session) {
    return "/assessment";
  }

  if (session.status === "completed") {
    return "/results";
  }

  return "/assessment";
}
