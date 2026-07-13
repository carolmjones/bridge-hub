"use client";

import { useState } from "react";
import { trackGenerateLead } from "@/lib/marketing/analytics";
import { EmailCaptureForm } from "@/components/marketing/free-class/EmailCaptureForm";

export function StillNotSure() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (data: { email: string; firstName: string }) => {
    const response = await fetch("/api/still-not-sure/subscribe", {
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
    trackGenerateLead("still_not_sure");
  };

  return (
    <section className="border-t border-line-stone bg-cream py-[72px] text-center">
      <div className="mx-auto max-w-[480px] px-6">
        <h2 className="mb-4 font-serif text-[30px] font-normal text-ink">
          Still not sure?
        </h2>
        <p className="mb-7 font-sans text-sm leading-[1.72] text-soft-ink">
          I get it. I&apos;ve been on the same side as you, wondering if
          anything would actually be different this time. Join the newsletter
          for simple, practical ways to work with your nervous system, real
          stories, and honest updates on what&apos;s actually helping women get
          unstuck.
        </p>

        {submitted ? (
          <p className="font-sans text-sm leading-[1.72] text-ink">
            You&apos;re in. Check your inbox — Caroline&apos;s glad you&apos;re
            here.
          </p>
        ) : (
          <div className="mx-auto w-full max-w-[480px] text-left">
            <EmailCaptureForm
              id="still-not-sure-form"
              buttonLabel="Join the newsletter"
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
    </section>
  );
}
