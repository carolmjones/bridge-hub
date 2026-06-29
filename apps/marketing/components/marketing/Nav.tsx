"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { MARKETING_ROUTES, SCREENING_START } from "@/lib/marketing/routes";

const NAV_LINKS = [
  { href: MARKETING_ROUTES.home, label: "Home" },
  { href: MARKETING_ROUTES.about, label: "About" },
  { href: MARKETING_ROUTES.bridgeMap, label: "The Bridge Map" },
  { href: MARKETING_ROUTES.workWithMe, label: "Work with Me" },
] as const;

export function MarketingNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const hideNavCta = pathname === MARKETING_ROUTES.bridgeMap;

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-line-stone bg-cream px-6">
        <Link href={MARKETING_ROUTES.home} className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="The Bridge Hub"
            width={120}
            height={22}
            className="h-[22px] w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-sans text-[13px] text-soft-ink transition-colors hover:text-ink ${
                pathname === href ? "font-medium text-ink" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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
      className={`inline-flex h-14 items-center justify-center rounded-[14px] bg-btn-primary px-8 font-sans text-body-lg font-medium text-btn-text transition-all hover:-translate-y-0.5 hover:bg-btn-primary-hover ${className}`}
    >
      {children}
    </Link>
  );
}
