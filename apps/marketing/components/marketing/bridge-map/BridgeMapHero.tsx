"use client";

import Image from "next/image";
import { useRef } from "react";
import { MarketingPrimaryCta } from "@/components/marketing/Nav";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { BridgeMapSynapseCanvas } from "./BridgeMapSynapseCanvas";

export function BridgeMapHero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative isolate overflow-hidden bg-deep-card"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/bridge-map-hero-nervous-mobile.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            quality={100}
            unoptimized
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/images/bridge-map-hero-nervous.png"
            alt=""
            fill
            className="object-cover object-right"
            priority
            quality={100}
            unoptimized
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-deep-card/95 via-deep-card/82 to-deep-card/20 max-md:via-deep-card/88 max-md:to-deep-card/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-card/20 via-deep-card/45 to-deep-card/88 max-md:from-transparent max-md:via-deep-card/50 max-md:to-deep-card/92" />
      </div>

      <BridgeMapSynapseCanvas containerRef={heroRef} imageAlign="right" />

      <div className="relative z-10 mx-auto grid min-h-[clamp(560px,78svh,720px)] max-w-[1240px] grid-cols-1 items-center gap-12 px-6 py-[clamp(56px,8vw,96px)] lg:grid-cols-[1fr_520px] lg:gap-16 lg:px-16">
        <div className="max-w-[640px]">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-cream/70 backdrop-blur-md">
            <span
              className="h-[5px] w-[5px] rounded-full bg-glow-sage"
              aria-hidden
            />
            Free — takes 15 minutes
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,6.6vw,4.1rem)] leading-[1.03] text-cream">
            Which nervous system profile are you?
          </h1>
          <p className="mt-6 max-w-[560px] font-sans text-body-lg leading-[1.72] text-cream/80">
            Most women spend years trying to understand why they feel the way
            they do. The Bridge Map gives you a structured picture of what is
            happening across five areas of your life, helping you stop guessing
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

        <div className="hidden lg:block" aria-hidden />
      </div>
    </section>
  );
}
