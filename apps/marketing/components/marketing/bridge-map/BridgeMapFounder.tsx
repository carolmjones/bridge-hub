import Image from "next/image";

import { MarketingPrimaryCta } from "@/components/marketing/Nav";
import { BridgeMapFounderPortrait } from "@/components/marketing/bridge-map/BridgeMapFounderPortrait";

const BODY_PARAGRAPHS = [
  "I am Caroline Jones, a nurse with a master's degree in psychology and currently training in psychotherapy and counselling. I have spent my career working with women who feel exactly the way you do right now, first through nursing and now through this work.",
  "I have also been on the other side. I know what it is to understand everything intellectually and still not be able to shift it. I know what it feels like when something is clearly happening in your body and you cannot find the words for it.",
  "I built The Bridge Map because I wanted women to have a structured, honest starting point — before a first session, before a first conversation, before they have to explain themselves from scratch to someone who does not yet know what they are carrying.",
] as const;

const EMPHASIS_PARAGRAPH =
  "The questions in The Bridge Map are designed to do what is hardest to do alone. Take what feels vague and overwhelming and give it structure. By the time you finish, what has been difficult to put into words will have a name.";

const CREDENTIALS =
  "Registered nurse (NMBI) · MSc Psychology · IACP Member · Training in psychotherapy and counselling · 16+ years working with families and children · Supporting women in stress, trauma, and nervous system regulation";

export function BridgeMapFounder() {
  return (
    <section className="relative overflow-hidden border-t border-line-stone bg-cream px-6 py-[clamp(72px,9vw,104px)]">
      <div
        className="pointer-events-none absolute -left-[12%] top-[18%] h-[420px] w-[420px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(190,194,169,0.28), rgba(190,194,169,0) 68%)",
          filter: "blur(48px)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[920px] grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-14 lg:gap-16">
        <div className="relative mx-auto w-full max-w-[380px] md:mx-0 md:max-w-none">
          <div
            className="pointer-events-none absolute -bottom-6 -right-6 h-[72%] w-[72%] rounded-[28px] bg-gradient-to-br from-glow-sage/25 to-stone/40"
            aria-hidden
          />

          <div className="relative">
            <BridgeMapFounderPortrait />
          </div>
        </div>

        <div className="text-left">
          <p className="mb-3.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-sage">
            About Caroline
          </p>

          <h2 className="font-serif text-[clamp(28px,5vw,38px)] leading-[1.14] text-ink">
            Built by someone who has been on both sides of this work.
          </h2>

          <div className="mt-6 space-y-4 font-sans text-[15px] leading-[1.75] text-soft-ink">
            {BODY_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="font-medium text-ink">{EMPHASIS_PARAGRAPH}</p>
          </div>

          <p className="mt-6 border-t border-line-stone pt-5 font-sans text-[12px] leading-[1.65] text-sage">
            {CREDENTIALS}
          </p>

          <div className="mt-7">
            <MarketingPrimaryCta>Discover my profile — free</MarketingPrimaryCta>
          </div>
        </div>
      </div>
    </section>
  );
}
