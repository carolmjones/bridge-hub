import Link from "next/link";
import { CookieSettingsLink } from "@/components/marketing/CookieSettingsLink";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

const legalLinkClass =
  "inline underline underline-offset-2 hover:text-cream/50";

const footerLinkClass = "hover:text-cream/70";

const FOOTER_LINK_COLUMNS = [
  [
    { href: MARKETING_ROUTES.bridgeMap, label: "The Bridge Map" },
    { href: MARKETING_ROUTES.freeClass, label: "Free Class" },
    { href: MARKETING_ROUTES.about, label: "About Caroline" },
  ],
  [
    { href: MARKETING_ROUTES.coaching, label: "Coaching" },
    { href: MARKETING_ROUTES.keynoteSpeaking, label: "Speaking" },
    {
      href: MARKETING_ROUTES.support,
      label: "In Crisis?",
      className: "text-glow-sage hover:text-cream",
    },
  ],
] as const;

export function MarketingFooter() {
  return (
    <footer className="bg-ink px-6 pb-9 pt-12">
      <div className="mx-auto max-w-[680px]">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-cream/10 pb-7">
          <div>
            <p className="font-sans text-label font-medium uppercase tracking-[0.28em] text-cream">
              The Bridge Hub
            </p>
            <p className="mt-1 font-sans text-label tracking-wide text-cream/35">
              Caroline Jones
            </p>
          </div>
          <nav
            aria-label="Site links"
            className="flex gap-8 sm:gap-10 font-sans text-[12px] text-cream/40"
          >
            {FOOTER_LINK_COLUMNS.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-2">
                {column.map(({ href, label, className }) => (
                  <Link
                    key={href}
                    href={href}
                    className={className ?? footerLinkClass}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </div>
      <div className="mx-auto mt-7 max-w-[680px] text-center font-sans text-[11px] leading-relaxed text-cream/25">
        <p>
          © 2026 carolinejones.co. All rights reserved.{" "}
          <Link href={MARKETING_ROUTES.privacy} className={legalLinkClass}>
            Privacy Policy
          </Link>
          {" · "}
          <Link href={MARKETING_ROUTES.terms} className={legalLinkClass}>
            Terms of Use
          </Link>
          {" · "}
          <CookieSettingsLink className={legalLinkClass}>
            Cookie Settings
          </CookieSettingsLink>
        </p>
        <p className="mt-2">
          This is a screening tool, not a clinical diagnosis.
        </p>
      </div>
    </footer>
  );
}
