import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { DISCLAIMER } from "@/lib/copy/disclaimer";
import { Wordmark } from "@/components/ui/Wordmark";
import { createClient } from "@/lib/supabase/server";

export default async function ConfirmedPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/save");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("first_name")
    .eq("id", user.id)
    .single();

  const { data: booking } = await supabase
    .from("bookings")
    .select("call_at, cal_booking_uid")
    .eq("user_id", user.id)
    .order("booked_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const firstName = profile?.first_name ?? "there";

  return (
    <AppShell>
      <main className="flex min-h-dvh flex-col bg-[#F5F2EE] px-5 pb-10 pt-12">
        <div className="mx-auto flex w-full max-w-phone flex-col items-center text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E4EBE8]"
            aria-hidden
          >
            <span className="text-2xl text-[#0F6E56]">✓</span>
          </div>

          <h1 className="mt-6 font-serif text-[22px] leading-snug text-ink">
            You&apos;re booked in, {firstName}.
          </h1>

          <p className="mt-4 font-sans text-body-sm leading-relaxed text-ink/85">
            Your Clarity Call is confirmed. Your full Nervous System Map will
            arrive by email shortly.
          </p>

          {booking?.call_at && (
            <p className="mt-4 rounded-card bg-white/70 px-4 py-3 font-sans text-body-sm text-ink">
              {new Date(booking.call_at).toLocaleString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          )}

          <div className="mt-8 w-full rounded-card bg-white/70 px-4 py-4 text-left">
            <p className="font-sans text-[11px] uppercase tracking-wide text-soft-ink/70">
              What happens next
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 font-sans text-[13px] leading-relaxed text-ink/85">
              <li>Check your email for your Nervous System Map report.</li>
              <li>Read it at your own pace before the call.</li>
              <li>
                Your therapist will have read everything — you won&apos;t need
                to start from scratch.
              </li>
            </ol>
          </div>

          <Link
            href="/support"
            className="mt-8 font-sans text-label text-soft-ink underline"
          >
            Need urgent support? Get help now
          </Link>

          <p className="disclaimer mt-8">{DISCLAIMER}</p>
          <Wordmark className="mt-6" />
        </div>
      </main>
    </AppShell>
  );
}
