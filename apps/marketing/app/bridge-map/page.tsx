import { MarketingPrimaryCta } from "@/components/marketing/Nav";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function BridgeMapPage() {
  return (
    <>
      <section className="bg-deep-card px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[680px]">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-glow-sage/35 bg-cream/10 px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-glow-sage">
            Free — takes 15 minutes
          </p>
          <h1 className="font-serif text-[clamp(2.25rem,6vw,3.75rem)] leading-tight text-cream">
            Which nervous system profile are you?
          </h1>
          <p className="mt-6 max-w-[480px] font-sans text-body-lg text-cream/80">
            The Bridge Map gives you a structured picture of what is actually
            happening — across five areas of your life — so you stop guessing
            and start understanding.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4">
            <MarketingPrimaryCta>Discover my profile — free</MarketingPrimaryCta>
            <p className="font-sans text-[12px] text-cream/55">
              Built on five validated clinical instruments. Results on screen
              immediately. No account required.
            </p>
            <Disclaimer className="!text-cream/45" />
          </div>
        </div>
      </section>

      <section className="border-t border-line-stone px-6 py-16">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="font-sans text-body text-soft-ink">
            Full Bridge Map page — sections from{" "}
            <code className="text-ink">apps/marketing/content/bridge-map.md</code> will be
            ported here. Synapse hero and premium sections are Phase 1 next
            steps.
          </p>
        </div>
      </section>
    </>
  );
}
