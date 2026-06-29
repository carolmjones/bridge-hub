"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";
import { buttonHover, fadeUp, staggerContainer } from "@/lib/marketing/motion";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        className="pointer-events-none absolute -left-[120px] -top-[160px] h-[520px] w-[520px] rounded-full blur-[20px]"
        style={{
          background:
            "radial-gradient(circle, rgba(190,194,169,0.32), rgba(190,194,169,0) 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(35,40,36,0.045) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "linear-gradient(90deg, #000 0%, #000 38%, transparent 60%)",
          WebkitMaskImage:
            "linear-gradient(90deg, #000 0%, #000 38%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[600px] max-w-[1240px] flex-wrap items-stretch">
        <motion.div
          className="flex flex-1 flex-col items-start justify-center px-6 py-[clamp(60px,7vw,96px)] md:px-16"
          style={{ flexBasis: "440px" }}
          variants={reduceMotion ? undefined : staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
        >
          <motion.span
            variants={fadeUp}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-line-stone bg-white/50 px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-[#6B7060]"
          >
            <span
              className="block h-[9px] w-[18px] rounded-b-[60%] border-b-[1.5px] border-[#8E9A7C]"
              aria-hidden
            />
            An 8 week framework
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mb-6 max-w-[480px] font-serif text-[clamp(2.625rem,6vw,3.75rem)] leading-[1.02] text-ink"
          >
            Life Beyond Survival Mode
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mb-10 max-w-[440px] font-sans text-base leading-[1.72] text-soft-ink"
          >
            Learn the 8 week framework that helps capable women understand why
            they keep getting stuck, what their body has been protecting, and
            how to begin creating change in a way their nervous system can
            actually hold.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col items-start gap-4"
          >
            <motion.div whileHover={reduceMotion ? undefined : buttonHover}>
              <Link
                href={MARKETING_ROUTES.freeClass}
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-[14px] bg-btn-primary px-8 font-sans text-[15px] font-medium text-btn-text shadow-[0_16px_30px_-14px_rgba(53,66,56,0.7)] transition-shadow hover:shadow-[0_22px_40px_-14px_rgba(53,66,56,0.8)]"
              >
                Watch the free class
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
            <Link
              href={MARKETING_ROUTES.bridgeMap}
              className="font-sans text-[13px] text-sage underline underline-offset-[3px] hover:text-[#6B7060]"
            >
              Or discover your nervous system profile first →
            </Link>
          </motion.div>
        </motion.div>

        <div
          className="relative flex flex-1 items-stretch p-5 pl-0 md:p-10 md:pl-0"
          style={{ flexBasis: "460px" }}
        >
          <div
            className="pointer-events-none absolute right-[6%] top-[8%] h-[340px] w-[340px] rounded-full blur-[28px]"
            style={{
              background:
                "radial-gradient(circle, rgba(142,154,124,0.4), rgba(142,154,124,0) 70%)",
            }}
            aria-hidden
          />
          <div
            className="relative min-h-[420px] flex-1 overflow-hidden rounded-[26px] shadow-[0_50px_90px_-40px_rgba(35,40,36,0.55)] ring-1 ring-inset ring-white/35"
            role="img"
            aria-label="A calm warm horizon at first light"
          >
            <Image
              src="/images/desktop_landing-page-background-mqx21jt6.png"
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(250,247,239,0.55) 0%, rgba(250,247,239,0) 26%), linear-gradient(0deg, rgba(31,41,37,0.22), rgba(31,41,37,0) 42%)",
              }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
