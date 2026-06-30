"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";
import {
  buttonHover,
  easeOut,
  fadeUp,
  glassCardIn,
  staggerContainer,
} from "@/lib/marketing/motion";

const HIGHLIGHTS = [
  { value: "8", label: "WEEKS" },
  { value: "5", label: "AREAS" },
  { value: "15", label: "MINUTES" },
] as const;

/** Arch / door-light centre on full-bleed desktop hero (image is centred) */
const DOOR_HOTSPOT = { x: 0.5, y: 0.36 };

function doorProximityGlow(mx: number, my: number): number {
  const dist = Math.hypot(mx - DOOR_HOTSPOT.x, my - DOOR_HOTSPOT.y);
  return Math.min(1, Math.max(0, 1 - dist / 0.65));
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [doorGlow, setDoorGlow] = useState(0);
  const [pointer, setPointer] = useState(DOOR_HOTSPOT);

  useEffect(() => {
    setReady(true);
  }, []);

  const handleHeroPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reduceMotion === true || window.innerWidth < 768) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const strength = doorProximityGlow(x, y);

      setPointer({ x, y });
      setDoorGlow(strength);
    },
    [reduceMotion],
  );

  const handleHeroPointerLeave = useCallback(() => {
    setDoorGlow(0);
    setPointer(DOOR_HOTSPOT);
  }, []);

  const animate = ready && reduceMotion !== true;

  const glowX = DOOR_HOTSPOT.x + (pointer.x - DOOR_HOTSPOT.x) * doorGlow * 0.35;
  const glowY = DOOR_HOTSPOT.y + (pointer.y - DOOR_HOTSPOT.y) * doorGlow * 0.35;
  const doorOpacity = 0.06 + doorGlow * 0.94;
  const coreOpacity = doorGlow * 0.95;
  const scrimOpacity = doorGlow * 0.8;

  return (
    <section
      className="relative isolate overflow-hidden bg-deep-card"
      onPointerMove={handleHeroPointerMove}
      onPointerLeave={handleHeroPointerLeave}
    >
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/hero-archway-mobile.png"
            alt=""
            fill
            className="object-cover object-top"
            priority
            quality={100}
            unoptimized
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/images/hero-archway.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            quality={100}
            unoptimized
            sizes="100vw"
          />

          {/* Desktop — door light on the arch image (before scrims) */}
          <div className="pointer-events-none absolute inset-0 mix-blend-screen">
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${DOOR_HOTSPOT.x * 100}%`,
                top: `${DOOR_HOTSPOT.y * 100}%`,
                width: 380,
                height: 460,
                background:
                  "radial-gradient(ellipse, rgba(255,225,165,1) 0%, rgba(240,195,125,0.55) 32%, rgba(210,165,95,0.15) 55%, transparent 74%)",
                filter: "blur(16px)",
              }}
              animate={{ opacity: doorOpacity }}
              transition={{ duration: 0.65, ease: easeOut }}
              aria-hidden
            />
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${glowX * 100}%`,
                top: `${glowY * 100}%`,
                width: 120 + doorGlow * 100,
                height: 160 + doorGlow * 70,
                background:
                  "radial-gradient(ellipse, rgba(255,245,215,1) 0%, rgba(255,220,160,0.7) 38%, transparent 65%)",
                filter: "blur(8px)",
              }}
              animate={{ opacity: coreOpacity }}
              transition={{ duration: 0.75, ease: easeOut }}
              aria-hidden
            />
          </div>
        </div>

        {/* Overlays — shared across breakpoints for consistent darkness */}
        <div className="absolute inset-0 bg-deep-card/30 max-md:bg-deep-card/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-card/96 from-0% via-deep-card/86 via-[34%] to-deep-card/35 to-[58%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-card/45 via-transparent to-deep-card/62" />

        {/* Desktop — extra punch through scrims at the arch */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-soft-light"
            style={{
              left: `${glowX * 100}%`,
              top: `${glowY * 100}%`,
              width: 340 + doorGlow * 40,
              height: 420 + doorGlow * 30,
              background:
                "radial-gradient(ellipse, rgba(255,235,190,0.85) 0%, rgba(225,185,125,0.35) 48%, transparent 72%)",
              filter: "blur(20px)",
            }}
            animate={{ opacity: scrimOpacity }}
            transition={{ duration: 0.7, ease: easeOut }}
            aria-hidden
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[clamp(640px,92svh,780px)] max-w-[1240px] grid-cols-1 items-center gap-10 px-6 py-[clamp(48px,8vw,96px)] lg:grid-cols-[1fr_380px] lg:gap-16 lg:px-16">
        <motion.div
          className="flex flex-col items-start justify-center"
          variants={animate ? staggerContainer : undefined}
          initial={false}
          animate={animate ? "visible" : false}
        >
          <motion.span
            variants={fadeUp}
            className="mb-7 inline-flex items-center rounded-full border border-glow-sage/30 bg-glow-sage/10 px-4 py-[7px] font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-[#C7CBB0] backdrop-blur-md"
          >
            The Bridge Programme
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mb-6 max-w-[520px] bg-gradient-to-b from-cream via-cream to-cream/75 bg-clip-text font-serif text-[clamp(2.625rem,6vw,3.75rem)] leading-[1.02] text-transparent"
          >
            Life Beyond Survival Mode
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mb-10 max-w-[460px] font-sans text-base leading-[1.72] text-cream/[0.82]"
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
            <motion.div whileHover={animate ? buttonHover : undefined}>
              <Link
                href={MARKETING_ROUTES.freeClass}
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-br from-[#E7EAD7] to-glow-sage px-8 font-sans text-[15px] font-semibold text-dark-room shadow-[0_16px_34px_-12px_rgba(190,194,169,0.55)] transition-shadow hover:shadow-[0_22px_44px_-10px_rgba(190,194,169,0.7)]"
              >
                Watch the free class
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
            <Link
              href={MARKETING_ROUTES.bridgeMap}
              className="font-sans text-[13px] text-cream/60 underline underline-offset-[3px] hover:text-cream"
            >
              Or discover your nervous system profile first →
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative flex flex-col items-stretch gap-4 lg:items-end">
          <motion.div
            className="w-full lg:max-w-[340px]"
            custom={0.3}
            variants={glassCardIn}
            initial={false}
            animate={animate ? "visible" : false}
          >
            <div
              className="rounded-[22px] border border-glow-sage/20 p-6 shadow-[0_28px_60px_-28px_rgba(0,0,0,0.65)] backdrop-blur-xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(250,247,239,0.08), rgba(250,247,239,0.03))",
              }}
            >
              <div className="mb-4 flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D7DBC2] to-[#9EAA84] font-serif text-xl text-deep-card">
                  ◎
                </span>
                <div>
                  <p className="font-serif text-[28px] leading-none text-cream">
                    8 weeks
                  </p>
                  <p className="mt-1 font-sans text-[12px] text-cream/65">
                    Personalised nervous system work
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between font-sans text-[12px] text-cream/65">
                  <span>Built around you</span>
                  <span className="font-medium text-cream">100%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-cream/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-glow-sage to-[#8E9A7C]"
                    initial={{ width: reduceMotion ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: reduceMotion ? 0 : 1.1,
                      ease: easeOut,
                      delay: 0.55,
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-cream/10 pt-4">
                {HIGHLIGHTS.map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="font-serif text-xl leading-none text-cream">
                      {item.value}
                    </p>
                    <p className="mt-1 font-sans text-[9px] font-medium uppercase tracking-[0.1em] text-[#C7CBB0]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-glow-sage/30 bg-glow-sage/10 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.1em] text-[#C7CBB0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-glow-sage shadow-[0_0_8px_rgba(190,194,169,0.8)]" />
                  Personalised
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/15 bg-cream/5 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.1em] text-cream/55">
                  Free screening
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:max-w-[340px]"
            custom={0.5}
            variants={glassCardIn}
            initial={false}
            animate={animate ? "visible" : false}
          >
            <div
              className="rounded-[18px] border border-glow-sage/20 px-5 py-4 shadow-[0_16px_40px_-22px_rgba(0,0,0,0.6)] backdrop-blur-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(250,247,239,0.07), rgba(250,247,239,0.02))",
              }}
            >
              <p className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-[#C7CBB0]">
                The Bridge Programme
              </p>
              <p className="font-serif text-[17px] italic leading-[1.5] text-cream/90">
                A calm path from understanding your nervous system to change you
                can actually hold.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
