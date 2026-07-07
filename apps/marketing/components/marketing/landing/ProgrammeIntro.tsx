"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";
import { buttonHover, easeOut } from "@/lib/marketing/motion";

const STEPS = [
  "Understanding why your body has been responding the way it has",
  "Identifying your nervous system profile through The Bridge Map",
  "Building capacity through tools matched to your profile specifically",
  "Moving toward the goals that have felt just out of reach",
  "Integrating change into your real life, your relationships, and your daily patterns",
] as const;

const cardHover = {
  x: 4,
  boxShadow: "0 16px 30px -18px rgba(35,40,36,0.4)",
  borderColor: "#BEC2A9",
  transition: { duration: 0.22, ease: easeOut },
};

export function ProgrammeIntro() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-line-stone bg-cream py-20">
      <div className="mx-auto max-w-[680px] px-6">
        <span className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-line-stone bg-white/55 px-3.5 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7060]">
          <span
            className="h-[5px] w-[5px] rounded-full bg-glow-sage"
            aria-hidden
          />
          Introducing
        </span>

        <h2 className="mb-5 font-serif text-[clamp(32px,8vw,40px)] font-normal leading-[1.1] text-ink">
          The Bridge Programme
        </h2>

        <p className="mb-9 max-w-[520px] font-sans text-body-lg text-soft-ink">
          An 8 week framework for women who are ready to understand why stress,
          past experiences, and old patterns have been limiting what they can
          achieve and build the capacity to move past them.
        </p>

        <p className="mb-[26px] font-sans text-sm font-medium text-ink">
          I will guide you through every step.
        </p>

        <div className="relative">
          <div
            className="pointer-events-none absolute bottom-[22px] left-[21px] top-[22px] w-0.5"
            style={{
              background:
                "linear-gradient(#BEC2A9, #DACEBF 60%, rgba(218,206,191,0))",
            }}
            aria-hidden
          />

          {STEPS.map((step, index) => (
            <div
              key={step}
              className={`relative flex items-start gap-5 ${
                index < STEPS.length - 1 ? "mb-3.5" : ""
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E7EAD7] to-[#9EAA84] font-serif text-[21px] text-deep-card shadow-[0_8px_20px_-8px_rgba(142,154,124,0.8),0_0_0_4px_#FAF7EF]">
                {index + 1}
              </span>
              <motion.div
                className="flex-1 rounded-[14px] border border-[#E9E2D4] bg-white px-5 py-4"
                whileHover={reduceMotion ? undefined : cardHover}
              >
                <p className="m-0 font-sans text-sm leading-[1.6] text-soft-ink">
                  {step}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        <div
          className="relative mt-9 overflow-hidden rounded-2xl border border-line-stone px-7 py-[30px]"
          style={{
            background: "linear-gradient(150deg, #F6F0E6, #EFE7D8)",
          }}
        >
          <span
            className="pointer-events-none absolute -top-[18px] right-3.5 font-serif text-[90px] leading-none text-glow-sage/35"
            aria-hidden
          >
            &ldquo;
          </span>
          <p className="mb-0.5 font-serif text-[22px] leading-[1.3] text-[#8E9A7C]">
            No guesswork.
          </p>
          <p className="mb-2.5 font-serif text-[22px] leading-[1.3] text-[#8E9A7C]">
            No generic plan.
          </p>
          <p className="max-w-[420px] font-serif text-[22px] italic leading-[1.35] text-ink">
            Just focused, personalised work built entirely around you.
          </p>
        </div>

        <motion.div
          className="mt-9"
          whileHover={reduceMotion ? undefined : buttonHover}
        >
          <Link
            href={MARKETING_ROUTES.freeClass}
            className="inline-flex h-[54px] items-center justify-center gap-2.5 rounded-[14px] bg-btn-primary px-[30px] font-sans text-[15px] font-medium text-btn-text shadow-[0_16px_30px_-14px_rgba(53,66,56,0.7)] transition-shadow hover:shadow-[0_18px_34px_-14px_rgba(53,66,56,0.7)]"
          >
            Watch the free class
            <span aria-hidden className="text-[17px] leading-none">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
