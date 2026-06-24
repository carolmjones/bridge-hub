"use client";

import { useEffect } from "react";
import type { SectionConfig } from "@/lib/data/sections";
import { Wordmark } from "@/components/ui/Wordmark";

type SectionTransitionProps = {
  section: SectionConfig;
  onComplete: () => void;
};

export function SectionTransition({ section, onComplete }: SectionTransitionProps) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 2500);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <button
      type="button"
      onClick={onComplete}
      className="relative flex min-h-dvh w-full flex-col items-center justify-center px-6 text-ink transition-opacity duration-300"
      style={{ backgroundColor: section.toneBg }}
    >
      <p className="font-sans text-label uppercase text-ink/50">
        {section.transitionLabel}
      </p>
      <h2 className="mt-4 max-w-sm text-center font-serif text-[28px] leading-tight">
        {section.userFacingName}
      </h2>
      <p className="mt-6 max-w-xs text-center font-sans text-body-sm text-soft-ink/80">
        {section.transitionIntro}
      </p>
      <p className="mt-10 font-sans text-label text-ink/40">
        Tap anywhere to continue
      </p>
      <Wordmark className="absolute bottom-8" />
    </button>
  );
}
