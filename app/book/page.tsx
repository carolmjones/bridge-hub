import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { BookScreen } from "@/components/booking/BookScreen";
import { getCalEmbedUrl } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export default async function BookPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/save");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("first_name, email")
    .eq("id", user.id)
    .single();

  const { data: session } = await supabase
    .from("sessions")
    .select("id, status")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!session) {
    redirect("/save");
  }

  if (session.status !== "completed") {
    redirect("/assessment");
  }

  return (
    <AppShell>
      <BookScreen
        sessionId={session.id}
        firstName={profile?.first_name ?? ""}
        email={profile?.email ?? user.email ?? ""}
        calEmbedUrl={getCalEmbedUrl()}
      />
    </AppShell>
  );
}
