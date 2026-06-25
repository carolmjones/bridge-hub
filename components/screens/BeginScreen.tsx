"use client";

import Link from "next/link";
import { useState } from "react";
import { BreathingButton } from "@/components/ui/BreathingButton";
import { BreathingOverlay } from "@/components/ui/BreathingOverlay";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Wordmark } from "@/components/ui/Wordmark";

export function BeginScreen() {
  const [breathingOpen, setBreathingOpen] = useState(false);

  const trustItems = [
    "About 15 minutes. Pauses are welcome.",
    "Five sections: body, load, fog, carrying, emotional weather.",
    "Confidential. Your answers are saved as you go.",
    "This gives you language for patterns — not a label.",
  ];

  return (
    <main className="flex min-h-dvh flex-col bg-cream px-6 py-6">
      <div className="flex items-center justify-between">
        <Wordmark />
        <BreathingButton onClick={() => setBreathingOpen(true)} />
      </div>

      <h1 className="mt-10 font-serif text-xl text-ink">Before you begin</h1>

      <div className="mt-6 rounded-card bg-warm-tint px-4 py-4 font-sans text-body-sm text-soft-ink">
        Take a moment before you start. Tap the breath icon any time during
        the screening to pause and regulate.
      </div>

      <ul className="mt-8 space-y-5">
        {trustItems.map((item) => (
          <li key={item} className="flex gap-3 font-sans text-body-sm text-soft-ink">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sage" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-card bg-warm-tint px-4 py-4 font-sans text-body-sm text-soft-ink">
        These questions come from validated clinical tools used by therapists
        and researchers worldwide.
      </div>

      <div className="flex-1" />

      <Link href="/save" className="btn-primary">
        I&apos;m ready to begin
      </Link>

      <Disclaimer className="mt-6" />

      <BreathingOverlay
        open={breathingOpen}
        onClose={() => setBreathingOpen(false)}
      />
    </main>
  );
}
