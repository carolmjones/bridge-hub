import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function LandingPage() {
  return (
    <AppShell>
      <main className="relative flex min-h-dvh flex-col px-6 pb-28 pt-8">
        <Link
          href="/support"
          className="self-end font-sans text-label text-soft-ink underline"
        >
          Need urgent support? Get help now
        </Link>

        <div className="mx-auto mt-10 h-[220px] w-[220px] rounded-full bg-stone/40" />

        <p className="wordmark mt-10 text-center">The Bridge Hub</p>

        <h1 className="mt-6 text-center font-serif text-[26px] leading-tight text-ink">
          Something in you has been asking to be understood.
        </h1>

        <p className="mt-4 text-center font-sans text-body text-soft-ink">
          A gentle screening that maps how your nervous system has been
          responding. About 30–40 minutes. You can pause any time.
        </p>

        <div className="flex-1" />

        <Link href="/begin" className="btn-primary">
          Begin your map
        </Link>

        <Disclaimer className="mt-6" />
        <CookieConsent />
      </main>
    </AppShell>
  );
}
