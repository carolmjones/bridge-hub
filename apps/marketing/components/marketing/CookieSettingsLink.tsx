"use client";

import { openCookiePreferences } from "@/lib/marketing/cookie-consent";

export function CookieSettingsLink({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className={className}
    >
      {children}
    </button>
  );
}
