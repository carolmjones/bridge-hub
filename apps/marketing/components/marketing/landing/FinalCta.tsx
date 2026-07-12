"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SpotlightCard } from "@/components/marketing/shared/Spotlight";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";
import { buttonHover } from "@/lib/marketing/motion";

export function FinalCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-stone py-[clamp(72px,9vw,104px)] text-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/final-cta-bg.jpg"
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-[center_42%]"
        />
        <div className="absolute inset-0 bg-stone/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone/65 via-stone/30 to-stone/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(250,247,239,0.22),transparent_60%)]" />
      </div>

      <SpotlightCard>
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-glow-sage/30 bg-glow-sage/10 px-4 py-[7px] font-sans text-[11px] font-medium uppercase tracking-[0.13em] text-[#C7CBB0]">
          <span
            className="h-1.5 w-1.5 rounded-full bg-glow-sage shadow-[0_0_10px_rgba(190,194,169,0.9)]"
            aria-hidden
          />
          The Bridge Programme
        </span>

        <h2 className="mx-auto mb-2.5 max-w-[520px] font-serif text-[clamp(34px,9vw,46px)] font-normal leading-[1.12] text-cream">
          Ready to understand what has been holding you back?
        </h2>
        <p className="mb-7 font-serif text-[21px] italic text-[#C7CBB0]">
          (And finally start moving past it?)
        </p>

        <div className="mb-[38px] inline-flex items-center gap-2.5 rounded-full border border-cream/10 bg-cream/[0.06] px-[18px] py-2">
          <span className="font-sans text-[13px] text-cream/[0.85]">
            8 weeks. Personalised. 1:1 with Caroline.
          </span>
        </div>

        <div className="flex flex-col items-center gap-[18px]">
          <motion.div whileHover={reduceMotion ? undefined : buttonHover}>
            <Link
              href={MARKETING_ROUTES.freeClass}
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-br from-[#E7EAD7] to-glow-sage px-[34px] font-sans text-[15px] font-semibold text-dark-room shadow-[0_18px_40px_-14px_rgba(190,194,169,0.7)] transition-shadow hover:shadow-[0_26px_52px_-12px_rgba(190,194,169,0.9)]"
            >
              Watch the free class
              <span aria-hidden className="text-[17px] leading-none">
                →
              </span>
            </Link>
          </motion.div>
          <Link
            href={MARKETING_ROUTES.bridgeMap}
            className="font-sans text-[13px] text-cream/60 underline underline-offset-[3px] hover:text-cream"
          >
            Or discover your nervous system profile first →
          </Link>
        </div>
      </SpotlightCard>
    </section>
  );
}
