"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Wordmark } from "@/components/ui/Wordmark";

export default function ResumePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/request-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      setSent(true);
    } catch {
      setError("Try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-tint">
          <span className="text-soft-ink">@</span>
        </div>
        <h1 className="mt-6 font-serif text-xl text-ink">Welcome back</h1>
        <p className="mt-3 max-w-sm text-center font-sans text-body text-soft-ink">
          Your progress is saved. Enter your email and we&apos;ll send you a
          link to pick up where you left off.
        </p>

        <form onSubmit={onSubmit} className="mt-8 w-full max-w-sm space-y-4">
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
              className="mt-2 w-full rounded-card border border-line-stone/40 bg-white px-4 py-3 font-sans text-body"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Sending..." : sent ? "Link sent" : "Send my resume link"}
          </button>
          {error && (
            <p className="text-center font-sans text-body-sm text-error-border">
              {error}
            </p>
          )}
          {sent && (
            <p className="text-center font-sans text-body-sm text-soft-ink">
              Check your inbox. The link will arrive in a few seconds.
            </p>
          )}
        </form>

        <Link
          href="/"
          className="mt-10 font-sans text-label text-soft-ink underline"
        >
          Or start a new screening
        </Link>
        <Wordmark className="mt-auto pt-12" />
      </main>
    </AppShell>
  );
}
