import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { AssessmentFlow } from "@/components/assessment/AssessmentFlow";
import { hydrateAnswersFromResponses } from "@/lib/assessment/hydrate";
import { createClient } from "@/lib/supabase/server";

export default async function AssessmentPage({
  searchParams,
}: {
  searchParams: { new?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/save");
  }

  const { data: session } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "in_progress")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!session) {
    redirect("/save");
  }

  const { data: responses } = await supabase
    .from("responses")
    .select("instrument, item_number, response_value")
    .eq("session_id", session.id);

  const answers = hydrateAnswersFromResponses(responses ?? []);
  const isNew = searchParams.new === "1";

  return (
    <AppShell className="md:my-0 md:rounded-none md:border-0 md:shadow-none">
      <AssessmentFlow
        sessionId={session.id}
        initialSection={session.current_section}
        initialItem={session.current_item}
        initialAnswers={answers}
        showInitialTransition={isNew}
      />
    </AppShell>
  );
}
