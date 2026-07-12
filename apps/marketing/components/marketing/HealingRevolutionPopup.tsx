"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { EmailCaptureForm } from "@/components/marketing/free-class/EmailCaptureForm";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

const SESSION_KEY = "marketing:healing-revolution:session";
const SCROLL_THRESHOLD = 0.2;
const DELAY_MS = 8_000;
const DEV_DELAY_MS = 2_000;

/** Pages that already have dedicated signup flows — skip the popup. */
const SKIP_PATHS: readonly string[] = [
  MARKETING_ROUTES.freeClass,
  MARKETING_ROUTES.speakingEnquiry,
];

function markSession(reason: string) {
  try {
    sessionStorage.setItem(SESSION_KEY, reason);
  } catch {
    // Private browsing — popup may reappear on navigation; acceptable edge case
  }
}

function hasSeenPopupThisSession(): boolean {
  try {
    return Boolean(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return false;
  }
}

export function HealingRevolutionPopup() {
  const pathname = usePathname();
  const landingPath = useRef(pathname);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dismiss = useCallback((reason: "dismissed" | "subscribed") => {
    markSession(reason);
    setOpen(false);
  }, []);

  // Arm triggers once, on the visitor's first landing page only (layout mounts once).
  useEffect(() => {
    const firstPath = landingPath.current;

    const params = new URLSearchParams(window.location.search);
    if (params.has("healing-popup")) {
      setOpen(true);
      return;
    }

    if (hasSeenPopupThisSession()) return;

    if (SKIP_PATHS.includes(firstPath)) {
      markSession("skipped");
      return;
    }

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      markSession("shown");
      setOpen(true);
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isDev = process.env.NODE_ENV === "development";
    const delayMs = isDev ? DEV_DELAY_MS : reduceMotion ? 20_000 : DELAY_MS;

    const onScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        show();
        return;
      }
      if (window.scrollY / maxScroll >= SCROLL_THRESHOLD) {
        show();
      }
    };

    const timer = window.setTimeout(show, delayMs);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss("dismissed");
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, dismiss]);

  const handleSubmit = async (data: { email: string; firstName: string }) => {
    const response = await fetch("/api/healing-revolution/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload = (await response.json().catch(() => ({}))) as {
      error?: string;
    };

    if (!response.ok) {
      throw new Error(
        payload.error || "Something went wrong. Please try again.",
      );
    }

    setSubmitted(true);
    markSession("subscribed");
    window.setTimeout(() => setOpen(false), 2200);
  };

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-label="Close newsletter signup"
        onClick={() => dismiss("dismissed")}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="healing-revolution-title"
        className="relative z-10 w-full max-w-[440px] rounded-[22px] border border-line-stone bg-cream px-6 py-7 shadow-[0_32px_80px_-24px_rgba(35,40,36,0.45)] sm:px-8 sm:py-8"
      >
        <button
          type="button"
          onClick={() => dismiss("dismissed")}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full font-sans text-xl leading-none text-soft-ink transition-colors hover:bg-warm-paper hover:text-ink"
          aria-label="Close"
        >
          ×
        </button>

        {submitted ? (
          <p className="pr-8 font-sans text-sm leading-[1.72] text-ink">
            You&apos;re in. Welcome to The Healing Revolution.
          </p>
        ) : (
          <>
            <h2
              id="healing-revolution-title"
              className="mb-3 pr-8 font-serif text-[clamp(26px,5vw,32px)] font-normal leading-[1.12] text-ink"
            >
              Join The Healing Revolution
            </h2>
            <p className="mb-6 font-sans text-sm leading-[1.72] text-soft-ink">
              Subscribe to receive insights and resources to inspire a collective
              healing movement.
            </p>
            <EmailCaptureForm
              id="healing-revolution-form"
              buttonLabel="Subscribe"
              onSubmit={handleSubmit}
            />
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
