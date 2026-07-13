"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackCtaClick } from "@/lib/marketing/analytics";
import { useState, type ReactNode } from "react";
import { MARKETING_ROUTES, SCREENING_START } from "@/lib/marketing/routes";

const NAV_LINKS = [
  { href: MARKETING_ROUTES.home, label: "Home" },
  { href: MARKETING_ROUTES.about, label: "About" },
  { href: MARKETING_ROUTES.bridgeMap, label: "The Bridge Map" },
] as const;

const WORK_WITH_ME_LINKS = [
  { href: MARKETING_ROUTES.coaching, label: "The Bridge Programme" },
  { href: MARKETING_ROUTES.keynoteSpeaking, label: "Keynote Speaking" },
] as const;

export function MarketingNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const workWithMeActive = pathname.startsWith(MARKETING_ROUTES.workWithMe);
  const hideNavCta =
    pathname === MARKETING_ROUTES.bridgeMap ||
    pathname === MARKETING_ROUTES.freeClass;

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center border-b border-line-stone bg-cream px-6 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Link href={MARKETING_ROUTES.home} className="flex items-center justify-self-start">
          <Image
            src="/images/logo.png"
            alt="The Bridge Hub"
            width={120}
            height={22}
            className="h-[22px] w-auto"
            priority
          />
        </Link>

        <nav
          className="hidden items-center justify-center gap-8 md:flex"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-sans text-[13px] text-soft-ink transition-colors hover:text-ink ${
                pathname === href
                  ? "font-medium text-ink underline decoration-line-stone underline-offset-[6px]"
                  : ""
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="group relative">
            <Link
              href={MARKETING_ROUTES.coaching}
              className={`font-sans text-[13px] text-soft-ink transition-colors hover:text-ink ${
                workWithMeActive
                  ? "font-medium text-ink underline decoration-line-stone underline-offset-[6px]"
                  : ""
              }`}
            >
              Work with Me
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 mt-4 w-[220px] -translate-x-1/2 rounded-2xl border border-line-stone bg-cream p-2 text-left opacity-0 shadow-[0_24px_60px_-36px_rgba(35,40,36,0.42)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {WORK_WITH_ME_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`block rounded-xl px-3 py-2.5 font-sans text-[13px] leading-snug text-soft-ink transition-colors hover:bg-warm-paper hover:text-ink ${
                    pathname === href ? "bg-warm-paper font-medium text-ink" : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="ml-auto flex items-center justify-end gap-3 md:ml-0 md:w-full md:justify-self-stretch">
          {!hideNavCta && (
            <Link
              href={MARKETING_ROUTES.freeClass}
              className="hidden h-[42px] items-center justify-center rounded-xl bg-btn-primary px-5 font-sans text-[13px] font-medium text-btn-text transition-colors hover:bg-btn-primary-hover md:inline-flex"
            >
              Watch the free class
            </Link>
          )}
          <button
            type="button"
            className="inline-flex p-1.5 text-xl text-ink md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "×" : "≡"}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-cream p-6 md:hidden">
          <div className="flex justify-end">
            <button
              type="button"
              className="p-1.5 text-2xl text-ink"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
          </div>
          <nav className="mt-6 flex flex-col gap-2" aria-label="Mobile">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="border-b border-line-stone py-3 font-serif text-[28px] text-ink"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="border-b border-line-stone py-3">
              <p className="font-serif text-[28px] text-ink">Work with Me</p>
              <div className="mt-3 flex flex-col gap-2">
                {WORK_WITH_ME_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="font-sans text-[15px] text-soft-ink"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            {!hideNavCta && (
              <Link
                href={MARKETING_ROUTES.freeClass}
                className="mt-4 inline-flex h-[48px] items-center justify-center rounded-xl bg-btn-primary font-sans text-[15px] font-medium text-btn-text"
                onClick={() => setMenuOpen(false)}
              >
                Watch the free class
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}

export function MarketingPrimaryCta({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={SCREENING_START}
      onClick={() => trackCtaClick("/begin")}
      className={`inline-flex h-14 items-center justify-center rounded-[14px] bg-btn-primary px-8 font-sans text-body-lg font-medium text-btn-text transition-all hover:-translate-y-0.5 hover:bg-btn-primary-hover ${className}`}
    >
      {children}
    </Link>
  );
}
