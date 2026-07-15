"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FREE_CLASS_RESET_EVENT, FREE_CLASS_UNLOCK_EVENT, FREE_CLASS_UNLOCK_KEY } from "@/components/marketing/free-class/constants";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

function isFreeClassUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(FREE_CLASS_UNLOCK_KEY) === "1";
}

export function AnnouncementBar() {
  const pathname = usePathname();
  const [freeClassUnlocked, setFreeClassUnlocked] = useState(false);

  useEffect(() => {
    setFreeClassUnlocked(isFreeClassUnlocked());

    const onUnlock = () => setFreeClassUnlocked(true);
    const onReset = () => setFreeClassUnlocked(false);
    window.addEventListener(FREE_CLASS_UNLOCK_EVENT, onUnlock);
    window.addEventListener(FREE_CLASS_RESET_EVENT, onReset);
    return () => {
      window.removeEventListener(FREE_CLASS_UNLOCK_EVENT, onUnlock);
      window.removeEventListener(FREE_CLASS_RESET_EVENT, onReset);
    };
  }, []);

  if (pathname === MARKETING_ROUTES.urgentSupport) return null;
  if (pathname === MARKETING_ROUTES.keynoteSpeaking) return null;
  if (pathname === MARKETING_ROUTES.freeClass && freeClassUnlocked) return null;

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
