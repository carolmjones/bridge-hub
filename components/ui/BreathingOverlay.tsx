"use client";

import { useEffect, useState } from "react";

type BreathingOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const STAGES = [
  { label: "Breathe in", duration: 4000 },
  { label: "Hold", duration: 4000 },
  { label: "Breathe out", duration: 4000 },
];

export function BreathingOverlay({ open, onClose }: BreathingOverlayProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!open) {
      setStageIndex(0);
      setExpanded(false);
      return;
    }

    let cancelled = false;
    let index = 0;

    const runStage = () => {
      if (cancelled) return;
      setStageIndex(index);
      setExpanded(index === 0 || index === 1);

      const duration = STAGES[index].duration;
      index = (index + 1) % STAGES.length;

      window.setTimeout(runStage, duration);
    };

    runStage();
    return () => {
      cancelled = true;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-dark-room/95 px-6 py-10 text-cream"
      role="dialog"
      aria-modal="true"
      aria-label="Breathing exercise"
    >
      <p className="mx-auto max-w-[240px] text-center font-sans text-body-sm text-cream/60">
        Box breathing helps settle your nervous system. Follow the circle at
        your own pace.
      </p>

      <div className="flex flex-1 flex-col items-center justify-center">
        <div
          className="rounded-full border border-cream/40 bg-cream/15 transition-all duration-[4000ms] ease-in-out"
          style={{
            width: expanded ? 160 : 80,
            height: expanded ? 160 : 80,
          }}
        />
        <p className="mt-8 font-serif text-[22px] text-cream">
          {STAGES[stageIndex].label}
        </p>
        <p className="mt-2 font-sans text-label uppercase text-cream/50">
          4 seconds
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-full rounded-button border border-cream/35 py-4 font-sans text-body text-cream transition-colors hover:bg-cream/10"
      >
        I&apos;m ready — continue
      </button>
    </div>
  );
}
