"use client";

import Link from "next/link";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

export function AnnouncementBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 bg-ink px-6 py-2.5 text-center">
      <p className="font-sans text-[12px] leading-relaxed text-cream/80">
        Tired of setting goals, starting again, and not understanding why you
        keep failing?
        <br className="hidden sm:inline" /> Watch the free class and learn what
        most women{" "}
        <span className="uppercase tracking-wide">get wrong</span> about change
        and success.
      </p>
      <Link
        href={MARKETING_ROUTES.freeClass}
        className="whitespace-nowrap font-sans text-[12px] font-medium text-glow-sage no-underline hover:text-cream"
      >
        Watch free →
      </Link>
    </div>
  );
}
