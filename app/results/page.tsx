import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ResultsView } from "@/components/results/ResultsView";
import { getResultsForSession } from "@/lib/results/get-results";
import { createClient } from "@/lib/supabase/server";

export default async function ResultsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/save");
  }

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

  const results = await getResultsForSession(session.id, user.id);

  if (!results) {
    return (
      <AppShell>
        <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-12 text-center">
          <h1 className="font-serif text-xl text-ink">Your results</h1>
          <p className="mt-4 font-sans text-body-sm text-soft-ink">
            We are still preparing your results. If you just finished, try
            refreshing in a moment.
          </p>
          <Link href="/assessment" className="mt-6 font-sans text-body-sm underline">
            Return to assessment
          </Link>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <ResultsView data={results} />
    </AppShell>
  );
}
