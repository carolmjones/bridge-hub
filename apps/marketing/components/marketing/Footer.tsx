import Link from "next/link";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

export function MarketingFooter() {
  return (
    <footer className="bg-ink px-6 pb-9 pt-12">
      <div className="mx-auto max-w-[680px]">
        <div className="mb-7 flex flex-wrap items-start justify-between gap-6 border-b border-cream/10 pb-7">
          <div>
            <p className="font-sans text-label font-medium uppercase tracking-[0.28em] text-cream">
              The Bridge Hub
            </p>
            <p className="mt-1 font-sans text-label tracking-wide text-cream/35">
              Caroline Jones
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <Link
              href={MARKETING_ROUTES.privacy}
              className="font-sans text-[12px] text-cream/40 hover:text-cream/70"
            >
              Privacy Policy
            </Link>
            <Link
              href={MARKETING_ROUTES.terms}
              className="font-sans text-[12px] text-cream/40 hover:text-cream/70"
            >
              Terms of Use
            </Link>
            <a
              href="#cookies"
              className="font-sans text-[12px] text-cream/40 hover:text-cream/70"
            >
              Cookie Settings
            </a>
            <Link
              href={MARKETING_ROUTES.support}
              className="font-sans text-[12px] text-glow-sage hover:text-cream"
            >
              Get help now ↗
            </Link>
          </div>
        </div>
        <p className="text-center font-sans text-[11px] leading-relaxed text-cream/25">
          This is a screening tool, not a clinical diagnosis. © 2026 The Bridge
          Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
