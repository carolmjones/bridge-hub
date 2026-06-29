"use client";

import Link from "next/link";
import { useState } from "react";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3.5 bg-ink px-6 py-2.5 text-center">
      <p className="font-sans text-[12px] leading-relaxed text-cream/80">
        Tired of setting goals, starting again, and not understanding why you
        keep failing?
        <br className="hidden sm:inline" /> Watch the free class and learn what
        most women get wrong about change and success.
      </p>
      <Link
        href={MARKETING_ROUTES.freeClass}
        className="whitespace-nowrap font-sans text-[12px] font-medium text-glow-sage no-underline hover:text-cream"
      >
        Watch free →
      </Link>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="ml-1 font-sans text-[14px] leading-none text-cream/40 hover:text-cream/70"
        aria-label="Dismiss announcement"
      >
        ×
      </button>
    </div>
  );
}
