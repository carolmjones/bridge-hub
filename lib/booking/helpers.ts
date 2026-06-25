import { createAdminClient } from "@/lib/supabase/admin";

export async function getActiveSessionForUser(userId: string) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("sessions")
    .select("id, status")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function upsertBookingPhone(
  sessionId: string,
  userId: string,
  phoneNumber: string | null,
  phonePrefix: string | null
) {
  const admin = createAdminClient();

  const { data: existing } = await admin
    .from("bookings")
    .select("id")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (existing) {
    const { error } = await admin
      .from("bookings")
      .update({
        phone_number: phoneNumber,
        phone_prefix: phonePrefix,
      })
      .eq("id", existing.id);
    if (error) throw error;
    return existing.id;
  }

  const { data, error } = await admin
    .from("bookings")
    .insert({
      session_id: sessionId,
      user_id: userId,
      phone_number: phoneNumber,
      phone_prefix: phonePrefix,
      status: "confirmed",
    })
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
}
