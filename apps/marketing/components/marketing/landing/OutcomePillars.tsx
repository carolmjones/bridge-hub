"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";
import { buttonHover, easeOut, fadeUp, staggerContainer } from "@/lib/marketing/motion";

const PILLARS = [
  {
    step: "01",
    title: "Understand",
    items: [
      "Make sense of why your body responds the way it does",
      "Understand why nothing else has worked until now",
      "See your nervous system profile clearly for the first time",
    ],
  },
  {
    step: "02",
    title: "Personalise",
    items: [
      "Work built around your nervous system profile, not everyone else's",
      "Every session focuses on what you need most",
      "No modules to fall behind on. No generic plan.",
    ],
  },
  {
    step: "03",
    title: "Build",
    items: [
      "Practical capacity to move toward what you actually want",
      "Tools chosen for your nervous system profile specifically",
      "Change that goes with you into real life",
    ],
  },
] as const;

const cardHover = {
  y: -4,
  borderColor: "rgba(190, 194, 169, 0.65)",
  boxShadow: "0 28px 56px -32px rgba(35, 40, 36, 0.28)",
  transition: { duration: 0.24, ease: easeOut },
};

export function OutcomePillars() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-line-stone bg-warm-paper py-[clamp(72px,9vw,96px)]">
      <div
        className="pointer-events-none absolute -left-24 top-16 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(190,194,169,0.22),transparent_68%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(218,206,191,0.18),transparent_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[960px] px-6">
        <motion.div
          className="mx-auto mb-12 max-w-[640px] text-center md:mb-14"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line-stone bg-white/60 px-3.5 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7060]">
            <span
              className="h-[5px] w-[5px] rounded-full bg-glow-sage"
              aria-hidden
            />
            The Bridge Programme
          </span>

          <h2 className="font-serif text-[clamp(28px,5vw,36px)] font-normal leading-[1.18] text-ink">
            I created The Bridge Programme to give you the same transformation in{" "}
            <span className="italic text-[#6B7060]">8 weeks.</span>
          </h2>

          <p className="mt-4 font-sans text-[13px] tracking-[0.06em] text-sage">
            Understand · Personalise · Build
          </p>
        </motion.div>

        <motion.div
          className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-4"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {PILLARS.map((pillar) => (
            <motion.article
              key={pillar.title}
              variants={fadeUp}
              whileHover={reduceMotion ? undefined : cardHover}
              className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-line-stone/80 bg-gradient-to-b from-white/95 via-cream/90 to-[#F6F0E6]/85 p-6 shadow-[0_20px_48px_-36px_rgba(35,40,36,0.22)]"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(190,194,169,0.28),transparent_68%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />

              <div className="relative mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E7EAD7] to-[#9EAA84] font-serif text-[15px] text-deep-card shadow-[0_8px_20px_-8px_rgba(142,154,124,0.75),0_0_0_3px_rgba(250,247,239,0.9)]">
                  {pillar.step}
                </span>
                <h3 className="font-serif text-[clamp(22px,3vw,26px)] font-normal leading-tight text-ink">
                  {pillar.title}
                </h3>
              </div>

              <ul className="relative m-0 flex flex-1 list-none flex-col gap-3 p-0">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-glow-sage/40 bg-glow-sage/15"
                      aria-hidden
                    >
                      <span className="h-1 w-1 rounded-full bg-glow-sage" />
                    </span>
                    <span className="font-sans text-[13px] leading-[1.6] text-soft-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <motion.div whileHover={reduceMotion ? undefined : buttonHover}>
            <Link
              href={MARKETING_ROUTES.freeClass}
              className="mb-4 inline-flex h-[54px] items-center justify-center rounded-[14px] bg-btn-primary px-[30px] font-sans text-[15px] font-medium text-btn-text shadow-[0_16px_30px_-14px_rgba(53,66,56,0.65)] transition-shadow hover:shadow-[0_18px_34px_-14px_rgba(53,66,56,0.7)]"
            >
              Watch the free class
            </Link>
          </motion.div>
          <div>
            <Link
              href={MARKETING_ROUTES.bridgeMap}
              className="font-sans text-[13px] text-sage underline underline-offset-[3px] hover:text-[#6B7060]"
            >
              Or discover your nervous system profile →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
