import Link from "next/link";
import { MarketingPrimaryCta } from "@/components/marketing/Nav";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

export default function MarketingHomePage() {
  return (
    <>
      <section className="border-b border-line-stone bg-cream px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="mb-4 font-sans text-label font-medium uppercase tracking-[0.14em] text-sage">
            The Bridge Hub
          </p>
          <h1 className="font-serif text-[clamp(2rem,6vw,3.25rem)] leading-tight text-ink">
            Life Beyond Survival Mode
          </h1>
          <p className="mx-auto mt-6 max-w-[540px] font-sans text-body-lg text-soft-ink">
            Marketing landing page — scaffold in place. Full design port from
            prototype is next.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <MarketingPrimaryCta>Discover my profile — free</MarketingPrimaryCta>
            <Link
              href={MARKETING_ROUTES.freeClass}
              className="font-sans text-body text-sage underline-offset-2 hover:underline"
            >
              Watch the free class
            </Link>
          </div>
          <Disclaimer className="mt-8" />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="font-serif text-2xl text-ink">
            Which nervous system profile are you?
          </h2>
          <p className="mt-4 font-sans text-body text-soft-ink">
            Start with The Bridge Map — a structured screening across five areas
            of your life.
          </p>
          <Link
            href={MARKETING_ROUTES.bridgeMap}
            className="mt-8 inline-flex font-sans text-body font-medium text-ink underline-offset-2 hover:underline"
          >
            Learn about The Bridge Map →
          </Link>
        </div>
      </section>
    </>
  );
}
