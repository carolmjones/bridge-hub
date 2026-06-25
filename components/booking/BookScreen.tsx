"use client";

import { useCallback, useState } from "react";
import { DISCLAIMER } from "@/lib/copy/disclaimer";
import { Wordmark } from "@/components/ui/Wordmark";

const PHONE_PREFIXES = [
  { code: "+1", label: "US +1" },
  { code: "+44", label: "UK +44" },
  { code: "+353", label: "IE +353" },
  { code: "+61", label: "AU +61" },
  { code: "+49", label: "DE +49" },
];

type BookScreenProps = {
  sessionId: string;
  firstName: string;
  email: string;
  calEmbedUrl: string | null;
};

export function BookScreen({
  sessionId,
  firstName,
  email,
  calEmbedUrl,
}: BookScreenProps) {
  const [prefix, setPrefix] = useState("+1");
  const [phone, setPhone] = useState("");
  const [phoneSaved, setPhoneSaved] = useState(false);

  const savePhone = useCallback(
    async (number: string, phonePrefix: string) => {
      if (!number.trim()) return;

      const res = await fetch("/api/booking/save-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          phone_number: number.trim(),
          phone_prefix: phonePrefix,
        }),
      });

      if (res.ok) setPhoneSaved(true);
    },
    [sessionId]
  );

  function onPhoneBlur() {
    if (phone.trim()) {
      savePhone(phone, prefix);
    }
  }

  const embedSrc = calEmbedUrl
    ? `${calEmbedUrl}${calEmbedUrl.includes("?") ? "&" : "?"}embed=true&metadata[session_id]=${sessionId}`
    : null;

  return (
    <div className="flex min-h-dvh flex-col bg-[#EDE8E0] px-5 pb-10 pt-8">
      <p className="font-sans text-[11px] uppercase tracking-wide text-soft-ink/70">
        Free Clarity Call
      </p>
      <h1 className="mt-3 font-serif text-[20px] leading-snug text-ink">
        Choose a time that works for you
      </h1>

      <div className="mt-6 rounded-card bg-white/80 px-4 py-4">
        <p className="font-sans text-[11px] uppercase tracking-wide text-soft-ink/70">
          Your details
        </p>
        <div className="mt-3 flex items-center justify-between border-b border-line-stone/20 py-2">
          <span className="font-sans text-body-sm text-ink">{firstName}</span>
          <span className="font-sans text-label text-soft-ink/60">Saved</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="font-sans text-body-sm text-ink">{email}</span>
          <span className="font-sans text-label text-soft-ink/60">Saved</span>
        </div>
      </div>

      <div className="mt-4 rounded-card bg-white/80 px-4 py-4">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-sans text-[11px] uppercase tracking-wide text-soft-ink/70">
            Mobile number
          </p>
          <p className="font-sans text-[11px] text-soft-ink/60">
            For your reminder text
          </p>
        </div>
        <div className="mt-3 flex gap-2">
          <select
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="rounded-lg border border-line-stone/30 bg-warm-paper px-2 py-2 font-sans text-body-sm text-ink"
            aria-label="Country code"
          >
            {PHONE_PREFIXES.map((p) => (
              <option key={p.code} value={p.code}>
                {p.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            inputMode="tel"
            placeholder="e.g. (555) 123-4567"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneSaved(false);
            }}
            onBlur={onPhoneBlur}
            className="min-w-0 flex-1 rounded-lg border border-line-stone/30 bg-warm-paper px-3 py-2 font-sans text-body-sm text-ink placeholder:text-soft-ink/50"
          />
        </div>
        {phoneSaved && (
          <p className="mt-2 font-sans text-label text-[#0F6E56]">Saved</p>
        )}
        <p className="mt-2 font-sans text-[11px] text-soft-ink/60">
          We&apos;ll send a reminder text before your call. No other use.
        </p>
      </div>

      <div className="mt-4 overflow-hidden rounded-card bg-white/80">
        <div className="border-b border-line-stone/20 px-4 py-3">
          <p className="font-sans text-body-sm font-medium text-ink">
            Clarity Call · Caroline Jones
          </p>
          <p className="mt-1 font-sans text-label text-soft-ink/70">
            45 min · Video · Free
          </p>
        </div>
        {embedSrc ? (
          <iframe
            title="Book your Clarity Call"
            src={embedSrc}
            className="h-[580px] w-full border-0"
            loading="lazy"
          />
        ) : (
          <div className="px-4 py-8 text-center">
            <p className="font-sans text-body-sm text-soft-ink">
              Calendar embed is not configured yet.
            </p>
            <p className="mt-2 font-sans text-label text-soft-ink/60">
              Set NEXT_PUBLIC_CAL_EMBED_URL in your environment.
            </p>
          </div>
        )}
      </div>

      <p className="disclaimer mt-8">{DISCLAIMER}</p>
      <Wordmark className="mt-6 self-center" />
    </div>
  );
}
