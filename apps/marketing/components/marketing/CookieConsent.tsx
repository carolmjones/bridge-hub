"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";
import {
  acceptAllPreferences,
  DEFAULT_PREFERENCES,
  getStoredConsent,
  OPEN_COOKIE_PREFERENCES_EVENT,
  rejectAllPreferences,
  saveConsent,
  type CookiePreferences,
} from "@/lib/marketing/cookie-consent";

type CategoryKey = "necessary" | "functional" | "analytics" | "performance";

const CATEGORIES: {
  key: CategoryKey;
  title: string;
  description: string;
  alwaysActive?: boolean;
}[] = [
  {
    key: "necessary",
    title: "Necessary",
    description:
      "Necessary cookies are required to enable the basic features of this site, such as remembering your cookie preferences. These cookies do not store any personally identifiable data.",
    alwaysActive: true,
  },
  {
    key: "functional",
    title: "Functional",
    description:
      "Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.",
  },
  {
    key: "analytics",
    title: "Analytics",
    description:
      "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.",
  },
  {
    key: "performance",
    title: "Performance",
    description:
      "Performance cookies are used to understand and analyse the key performance indexes of the website which helps in delivering a better user experience for the visitors.",
  },
];

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${
        checked ? "bg-glow-sage" : "bg-line-stone/70"
      }`}
    >
      <span
        aria-hidden
        className={`block h-5 w-5 shrink-0 rounded-full bg-cream shadow-sm transition-transform duration-200 ease-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function ConsentButton({
  children,
  onClick,
  variant = "secondary",
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}) {
  const base =
    "rounded-lg px-4 py-2.5 font-sans text-[13px] font-medium transition-colors";
  const styles = {
    primary:
      "border border-ink/20 bg-glow-sage text-ink hover:bg-stone",
    secondary: "bg-stone text-ink hover:bg-mist",
    outline:
      "border border-line-stone bg-cream text-soft-ink hover:bg-warm-paper",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function CookieConsent() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<CategoryKey, boolean>>({
    necessary: true,
    functional: true,
    analytics: true,
    performance: true,
  });
  const [draft, setDraft] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setBannerVisible(true);
    }
  }, []);

  useEffect(() => {
    function openModal() {
      const stored = getStoredConsent() ?? DEFAULT_PREFERENCES;
      setDraft(stored);
      setModalOpen(true);
      setBannerVisible(false);
    }

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openModal);
    return () => {
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openModal);
    };
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen]);

  function applyConsent(preferences: CookiePreferences) {
    saveConsent(preferences);
    setDraft(preferences);
    setBannerVisible(false);
    setModalOpen(false);
  }

  function openCustomise() {
    setDraft(getStoredConsent() ?? DEFAULT_PREFERENCES);
    setModalOpen(true);
  }

  function toggleCategory(key: CategoryKey) {
    setExpanded((current) => ({ ...current, [key]: !current[key] }));
  }

  function updateDraft(key: Exclude<CategoryKey, "necessary">, value: boolean) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  return (
    <>
      {bannerVisible && !modalOpen ? (
        <div
          className="fixed inset-x-0 bottom-0 z-[55] border-t border-line-stone bg-cream px-4 py-5 shadow-[0_-8px_32px_-12px_rgba(35,40,36,0.12)] md:px-8"
          role="region"
          aria-label="Cookie consent"
        >
          <div className="mx-auto flex max-w-[1200px] flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="max-w-2xl">
              <p className="font-serif text-[22px] leading-snug text-ink md:text-[24px]">
                We value your privacy
              </p>
              <p className="mt-2 font-sans text-[13px] leading-relaxed text-soft-ink md:text-body">
                We use cookies to support essential functionality and to
                understand how the Site is used. By clicking &quot;Accept
                All&quot;, you consent to our use of cookies.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:shrink-0 md:justify-end">
              <ConsentButton onClick={openCustomise} variant="secondary">
                Customise
              </ConsentButton>
              <ConsentButton
                onClick={() => applyConsent(rejectAllPreferences())}
                variant="secondary"
              >
                Reject All
              </ConsentButton>
              <ConsentButton
                onClick={() => applyConsent(acceptAllPreferences())}
                variant="primary"
              >
                Accept All
              </ConsentButton>
            </div>
          </div>
        </div>
      ) : null}

      {modalOpen ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/40 p-4 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            className="flex max-h-[min(90vh,720px)] w-full max-w-[640px] flex-col overflow-hidden rounded-2xl border border-line-stone bg-cream shadow-[0_24px_60px_-24px_rgba(35,40,36,0.35)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-line-stone px-5 py-4">
              <h2
                id="cookie-preferences-title"
                className="font-serif text-[22px] leading-snug text-ink"
              >
                Customise Consent Preferences
              </h2>
              <button
                type="button"
                aria-label="Close cookie preferences"
                onClick={() => setModalOpen(false)}
                className="rounded-lg px-2 py-1 font-sans text-xl leading-none text-soft-ink hover:text-ink"
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-4">
              <p className="font-sans text-[13px] leading-relaxed text-soft-ink">
                We use cookies to help you navigate efficiently and perform
                certain functions. You will find detailed information about all
                cookies under each consent category below.
              </p>
              <p className="mt-3 font-sans text-[13px] leading-relaxed text-soft-ink">
                The cookies that are categorised as &quot;Necessary&quot; are
                stored on your browser as they are essential for enabling the
                basic functionalities of the site.{" "}
                <Link
                  href={`${MARKETING_ROUTES.privacy}#cookies`}
                  className="underline underline-offset-2 hover:text-ink"
                  onClick={() => setModalOpen(false)}
                >
                  Show more
                </Link>
              </p>

              <div className="mt-5 divide-y divide-line-stone border-y border-line-stone">
                {CATEGORIES.map(({ key, title, description, alwaysActive }) => (
                  <div key={key} className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => toggleCategory(key)}
                        className="flex min-w-0 flex-1 items-start gap-2 text-left"
                      >
                        <span
                          className={`mt-0.5 inline-block font-sans text-[13px] text-soft-ink transition-transform ${
                            expanded[key] ? "rotate-90" : ""
                          }`}
                          aria-hidden
                        >
                          ›
                        </span>
                        <span className="font-serif text-[18px] text-ink">
                          {title}
                        </span>
                      </button>
                      {alwaysActive ? (
                        <span className="shrink-0 font-sans text-[13px] font-medium text-glow-sage">
                          Always Active
                        </span>
                      ) : (
                        <Toggle
                          checked={draft[key as Exclude<CategoryKey, "necessary">]}
                          onChange={(value) =>
                            updateDraft(
                              key as Exclude<CategoryKey, "necessary">,
                              value,
                            )
                          }
                          label={`${title} cookies`}
                        />
                      )}
                    </div>
                    {expanded[key] ? (
                      <p className="mt-3 pl-5 font-sans text-[13px] leading-relaxed text-soft-ink">
                        {description}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-line-stone px-5 py-4">
              <div className="flex flex-wrap gap-2">
                <ConsentButton
                  onClick={() => applyConsent(rejectAllPreferences())}
                  variant="outline"
                  className="flex-1 min-w-[120px]"
                >
                  Reject All
                </ConsentButton>
                <ConsentButton
                  onClick={() => applyConsent(draft)}
                  variant="outline"
                  className="flex-1 min-w-[140px]"
                >
                  Save My Preferences
                </ConsentButton>
                <ConsentButton
                  onClick={() => applyConsent(acceptAllPreferences())}
                  variant="primary"
                  className="flex-1 min-w-[120px]"
                >
                  Accept All
                </ConsentButton>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
