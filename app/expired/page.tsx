"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Wordmark } from "@/components/ui/Wordmark";

export default function ExpiredPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    await fetch("/api/auth/request-magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    });
    setLoading(false);
  }

  return (
    <AppShell>
      <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAEEDA] text-[#854F0B]">
          !
        </div>
        <h1 className="mt-6 font-serif text-xl text-ink">This link has expired</h1>
        <p className="mt-3 max-w-sm text-center font-sans text-body text-soft-ink">
          No worries — your progress is still saved. Enter your email and
          we&apos;ll send a fresh link straight away.
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
            {loading ? "Sending..." : "Send a new link"}
          </button>
          <p className="text-center font-sans text-body-sm text-soft-ink">
            Your new link will be valid for 30 days.
          </p>
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
