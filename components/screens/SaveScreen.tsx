"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { BreathingButton } from "@/components/ui/BreathingButton";
import { BreathingOverlay } from "@/components/ui/BreathingOverlay";
import { Wordmark } from "@/components/ui/Wordmark";

export function SaveScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [optedIn, setOptedIn] = useState(false);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    firstName?: string;
    email?: string;
  }>({});
  const [breathingOpen, setBreathingOpen] = useState(false);

  const canSubmit =
    firstName.trim() && email.trim().includes("@") && consent && !loading;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    if (!firstName.trim()) {
      setFieldErrors({
        firstName: "We need your first name to personalise your report.",
      });
      return;
    }
    if (!email.trim().includes("@")) {
      setFieldErrors({
        email: "This doesn't look like a complete email address.",
      });
      return;
    }
    if (!consent) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/session/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          first_name: firstName.trim(),
          opted_in: optedIn,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not start session");
      }

      router.push("/assessment?new=1");
    } catch {
      setError("Could not start your session. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-dvh flex-col bg-cream px-6 py-6">
      <div className="flex items-center justify-between">
        <Wordmark />
        <BreathingButton onClick={() => setBreathingOpen(true)} />
      </div>

      <h1 className="mt-10 font-serif text-xl text-ink">Save your place</h1>
      <p className="mt-3 font-sans text-body-sm text-soft-ink">
        We&apos;ll save your progress as you go. You can return from any device
        using your email.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <label className="font-sans text-label text-soft-ink" htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your first name"
            className={`mt-2 w-full rounded-card border bg-white px-4 py-3 font-sans text-body ${
              fieldErrors.firstName ? "border-error-border" : "border-line-stone/40"
            }`}
          />
          {fieldErrors.firstName && (
            <p className="mt-1 font-sans text-body-sm text-error-border">
              {fieldErrors.firstName}
            </p>
          )}
        </div>

        <div>
          <label className="font-sans text-label text-soft-ink" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={`mt-2 w-full rounded-card border bg-white px-4 py-3 font-sans text-body ${
              fieldErrors.email ? "border-error-border" : "border-line-stone/40"
            }`}
          />
          {fieldErrors.email && (
            <p className="mt-1 font-sans text-body-sm text-error-border">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-card border border-line-stone/30 bg-white px-4 py-3">
          <input
            type="checkbox"
            checked={optedIn}
            onChange={(e) => setOptedIn(e.target.checked)}
            className="mt-1"
          />
          <span className="font-sans text-body-sm text-soft-ink">
            Send me occasional insights and resources from The Bridge Hub. You
            can unsubscribe any time.
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3 rounded-card bg-warm-tint px-4 py-4">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          <span className="font-sans text-body-sm text-soft-ink">
            By continuing, you consent to your responses being stored securely
            and used to generate your personalised report.{" "}
            <a href="/privacy" className="underline">
              Read our privacy policy
            </a>
            .
          </span>
        </label>

        {error && (
          <p className="font-sans text-body-sm text-error-border">{error}</p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Starting..." : "Save my progress and begin"}
        </button>
      </form>

      <BreathingOverlay
        open={breathingOpen}
        onClose={() => setBreathingOpen(false)}
      />
    </main>
  );
}
