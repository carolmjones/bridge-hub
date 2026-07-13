"use client";

import Link from "next/link";
import { useState } from "react";
import { trackGenerateLead } from "@/lib/marketing/analytics";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

const EVENT_TYPES = ["Keynote", "Workshop", "Other"] as const;

const fieldClass =
  "h-12 w-full rounded-xl border border-line-stone/90 bg-white px-3.5 font-sans text-[15px] text-ink shadow-[inset_0_1px_2px_rgba(35,40,36,0.04)] placeholder:text-sage/70 outline-none transition-[border-color,box-shadow,background-color] focus:border-glow-sage focus:bg-white focus:ring-2 focus:ring-glow-sage/20";

const labelClass =
  "mb-1.5 block font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-sage";

export function SpeakingEnquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [eventType, setEventType] = useState<string>("Keynote");
  const [eventDate, setEventDate] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!organisation.trim()) {
      setError("Please enter your organisation.");
      return;
    }
    if (!message.trim()) {
      setError("Please tell us a little about your event.");
      return;
    }
    if (!consent) {
      setError("Please agree to be contacted before continuing.");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/speaking/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          organisation: organisation.trim(),
          eventType,
          eventDate: eventDate.trim() || undefined,
          message: message.trim(),
        }),
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
      trackGenerateLead("speaking_enquiry");
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

  if (submitted) {
    return (
      <div className="rounded-[22px] border border-line-stone bg-white/90 p-8 text-center shadow-[0_20px_48px_-36px_rgba(35,40,36,0.22)]">
        <h3 className="font-serif text-[24px] font-normal text-ink">
          Thank you — your enquiry is on its way.
        </h3>
        <p className="mt-3 font-sans text-body-lg leading-[1.7] text-soft-ink">
          Caroline will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[640px]">
      <div className="rounded-[22px] border border-line-stone bg-white/90 p-6 shadow-[0_20px_48px_-36px_rgba(35,40,36,0.22)] sm:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="text-left">
            <label htmlFor="speaking-name" className={labelClass}>
              Name
            </label>
            <input
              id="speaking-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Jane Doe"
              className={fieldClass}
              autoComplete="name"
            />
          </div>
          <div className="text-left">
            <label htmlFor="speaking-email" className={labelClass}>
              Email
            </label>
            <input
              id="speaking-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@organisation.com"
              className={fieldClass}
              autoComplete="email"
            />
          </div>
          <div className="text-left">
            <label htmlFor="speaking-phone" className={labelClass}>
              Phone <span className="text-soft-ink/50">(optional)</span>
            </label>
            <input
              id="speaking-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+353…"
              className={fieldClass}
              autoComplete="tel"
            />
          </div>
          <div className="text-left">
            <label htmlFor="speaking-organisation" className={labelClass}>
              Organisation
            </label>
            <input
              id="speaking-organisation"
              type="text"
              value={organisation}
              onChange={(event) => setOrganisation(event.target.value)}
              placeholder="Your organisation"
              className={fieldClass}
              autoComplete="organization"
            />
          </div>
          <div className="text-left">
            <label htmlFor="speaking-event-type" className={labelClass}>
              Event type
            </label>
            <select
              id="speaking-event-type"
              value={eventType}
              onChange={(event) => setEventType(event.target.value)}
              className={fieldClass}
            >
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="text-left">
            <label htmlFor="speaking-event-date" className={labelClass}>
              Approx. date <span className="text-soft-ink/50">(optional)</span>
            </label>
            <input
              id="speaking-event-date"
              type="text"
              value={eventDate}
              onChange={(event) => setEventDate(event.target.value)}
              placeholder="e.g. October 2026"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="mt-4 text-left">
          <label htmlFor="speaking-message" className={labelClass}>
            Tell me about your event
          </label>
          <textarea
            id="speaking-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Audience, theme, length, anything that helps me understand the fit."
            rows={5}
            className="w-full rounded-xl border border-line-stone/90 bg-white px-3.5 py-3 font-sans text-[15px] leading-[1.6] text-ink shadow-[inset_0_1px_2px_rgba(35,40,36,0.04)] placeholder:text-sage/70 outline-none transition-[border-color,box-shadow,background-color] focus:border-glow-sage focus:bg-white focus:ring-2 focus:ring-glow-sage/20"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-btn-primary px-6 font-sans text-[15px] font-medium text-btn-text shadow-[0_14px_28px_-16px_rgba(53,66,56,0.65)] transition-all hover:-translate-y-0.5 hover:bg-btn-primary-hover hover:shadow-[0_18px_34px_-14px_rgba(53,66,56,0.75)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {submitting ? "Sending…" : "Send enquiry"}
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
          I agree to be contacted by Caroline Jones about my enquiry.{" "}
          <Link
            href={MARKETING_ROUTES.privacy}
            className="underline underline-offset-2 hover:text-ink"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {error ? (
        <p className="mt-3 font-sans text-[12px] text-[#8B5A4A]" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
