"use client";

import Link from "next/link";
import { useState } from "react";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

export function EmailCaptureForm({
  id,
  buttonLabel,
  onSubmit,
}: {
  id: string;
  buttonLabel: string;
  onSubmit: (data: { email: string; firstName: string }) => void | Promise<void>;
}) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fieldClass =
    "h-12 w-full rounded-xl border border-line-stone/90 bg-white px-3.5 font-sans text-[15px] text-ink shadow-[inset_0_1px_2px_rgba(35,40,36,0.04)] placeholder:text-sage/70 outline-none transition-[border-color,box-shadow,background-color] focus:border-glow-sage focus:bg-white focus:ring-2 focus:ring-glow-sage/20";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!consent) {
      setError("Please agree to receive emails before continuing.");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await onSubmit({ email: email.trim(), firstName: firstName.trim() });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form id={id} onSubmit={handleSubmit} className="w-full max-w-[480px]">
      <div
        className="rounded-[18px] border border-line-stone bg-gradient-to-b from-white/90 to-white/65 p-4 shadow-[0_22px_50px_-38px_rgba(35,40,36,0.28)] sm:p-5"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(250,247,239,0.78))",
        }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="text-left">
            <label
              htmlFor={`${id}-first-name`}
              className="mb-1.5 block font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-sage"
            >
              First name
            </label>
            <input
              id={`${id}-first-name`}
              type="text"
              name="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Jane"
              className={fieldClass}
              autoComplete="given-name"
            />
          </div>
          <div className="text-left">
            <label
              htmlFor={`${id}-email`}
              className="mb-1.5 block font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-sage"
            >
              Email
            </label>
            <input
              id={`${id}-email`}
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@email.com"
              className={fieldClass}
              autoComplete="email"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-btn-primary px-6 font-sans text-[15px] font-medium text-btn-text shadow-[0_14px_28px_-16px_rgba(53,66,56,0.65)] transition-all hover:-translate-y-0.5 hover:bg-btn-primary-hover hover:shadow-[0_18px_34px_-14px_rgba(53,66,56,0.75)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {submitting ? "Unlocking…" : buttonLabel}
          <span aria-hidden>→</span>
        </button>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-left">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-line-stone accent-btn-primary"
        />
        <span className="font-sans text-[12px] leading-[1.55] text-soft-ink">
          I agree to receive emails from Caroline Jones. I can unsubscribe at any
          time.{" "}
          <Link
            href={MARKETING_ROUTES.privacy}
            className="underline underline-offset-2 hover:text-ink"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      <p className="mt-2.5 flex items-center gap-2 font-sans text-[12px] text-sage">
        <span aria-hidden>🔒</span>
        Private. No spam. Unsubscribe whenever you want.
      </p>

      {error ? (
        <p className="mt-3 font-sans text-[12px] text-[#8B5A4A]" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
