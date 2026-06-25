"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RESULT_ROW_META, TOUCHPOINT1 } from "@/lib/copy/touchpoint1";
import { DISCLAIMER } from "@/lib/copy/disclaimer";
import type { ResultsPayload } from "@/lib/results/get-results";
import { Wordmark } from "@/components/ui/Wordmark";

type ResultsViewProps = {
  data: ResultsPayload;
};

const AI_GENERATION_TARGETS = [
  "synthesis_paragraph",
  "row_1",
  "row_2",
  "row_3",
  "row_4",
  "row_5",
  "results_overview_paragraph",
] as const;

export function ResultsView({ data }: ResultsViewProps) {
  const [openRow, setOpenRow] = useState<
    (typeof RESULT_ROW_META)[number]["name"] | null
  >(RESULT_ROW_META[0].name);
  const [synthesis, setSynthesis] = useState(
    data.synthesis?.trim() || TOUCHPOINT1.synthesisFallback
  );
  const [overview, setOverview] = useState(
    data.overview_paragraph?.trim() || TOUCHPOINT1.overviewFallback
  );
  const [rowObservations, setRowObservations] = useState(data.row_observations);
  const [aiLoading, setAiLoading] = useState(!data.ai_cached);

  useEffect(() => {
    if (data.ai_cached) return;

    let cancelled = false;

    async function loadAiContent() {
      try {
        for (const generation_target of AI_GENERATION_TARGETS) {
          if (cancelled) return;

          const res = await fetch("/api/results/generate-ai-content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              session_id: data.session_id,
              generation_target,
            }),
          });

          if (!res.ok) {
            continue;
          }

          const body = (await res.json()) as {
            synthesis?: string | null;
            overview_paragraph?: string | null;
            row_observations?: Record<string, string>;
          };

          if (cancelled) return;

          if (body.synthesis?.trim()) {
            setSynthesis(body.synthesis.trim());
          }

          if (body.overview_paragraph?.trim()) {
            setOverview(body.overview_paragraph.trim());
          }

          if (body.row_observations) {
            setRowObservations((prev) => {
              const next = { ...prev };
              for (const row of RESULT_ROW_META) {
                const text = body.row_observations?.[row.name]?.trim();
                if (text) next[row.name] = text;
              }
              return next;
            });
          }
        }
      } finally {
        if (!cancelled) setAiLoading(false);
      }
    }

    loadAiContent();

    return () => {
      cancelled = true;
    };
  }, [data.session_id, data.ai_cached]);

  return (
    <div className="flex min-h-dvh flex-col px-5 pb-10 pt-8">
      <Link
        href="/support"
        className="self-end font-sans text-label text-soft-ink underline"
      >
        Need urgent support? Get help now
      </Link>

      <p className="mt-8 flex items-center gap-2 font-sans text-label font-medium text-[#0F6E56]">
        <span aria-hidden>✓</span>
        {TOUCHPOINT1.eyebrow}
      </p>

      <h1 className="mt-4 font-serif text-[23px] leading-snug text-ink">
        {TOUCHPOINT1.headline}
      </h1>

      <p
        className={`mt-4 font-serif text-body-sm italic leading-relaxed text-ink/80 ${aiLoading ? "animate-pulse" : ""}`}
      >
        {synthesis}
      </p>

      {aiLoading && (
        <p className="mt-2 font-sans text-label text-soft-ink/70">
          Personalising your results…
        </p>
      )}

      <div className="mt-6 rounded-card bg-[#EAE4DC] px-4 py-4">
        <p className="font-sans text-body-sm leading-relaxed text-ink/85">
          {TOUCHPOINT1.credibility.body}
        </p>
      </div>

      <hr className="my-8 border-line-stone/30" />

      <p className="font-sans text-[11px] uppercase tracking-wide text-soft-ink/70">
        {TOUCHPOINT1.resultsOverviewLabel}
      </p>

      <div className="mt-4 flex flex-col gap-2">
        {RESULT_ROW_META.map((row) => {
          const isOpen = openRow === row.name;
          const observation = rowObservations[row.name] ?? "";
          return (
            <div
              key={row.name}
              className="overflow-hidden rounded-card border border-line-stone/25 bg-white/60"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-left"
                onClick={() => setOpenRow(isOpen ? null : row.name)}
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: row.dotColor }}
                    aria-hidden
                  />
                  <span className="font-sans text-[13px] font-medium text-ink">
                    {row.name}
                  </span>
                </span>
                <span
                  className={`text-soft-ink transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  ▾
                </span>
              </button>
              {isOpen && (
                <div className="border-t border-line-stone/20 px-4 pb-4 pt-2">
                  <p
                    className={`font-sans text-[13px] leading-relaxed text-ink/85 ${aiLoading ? "animate-pulse" : ""}`}
                  >
                    {observation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <hr className="my-8 border-line-stone/30" />

      <h2 className="font-serif text-lg leading-snug text-ink">
        {TOUCHPOINT1.compiledOverviewHeading}
      </h2>
      <p
        className={`mt-4 font-serif text-body-sm italic leading-relaxed text-ink/80 ${aiLoading ? "animate-pulse" : ""}`}
      >
        {overview}
      </p>

      <div className="mt-8 rounded-card bg-[#EEEAE4] px-4 py-4">
        <h2 className="font-serif text-lg leading-snug text-ink">
          {TOUCHPOINT1.fullReport.heading}
        </h2>
        <p className="mt-3 font-sans text-[13px] leading-relaxed text-ink/85">
          {TOUCHPOINT1.fullReport.intro}
        </p>
        <p className="mt-3 font-sans text-[13px] leading-relaxed text-ink/85">
          {TOUCHPOINT1.fullReport.delivery}
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {TOUCHPOINT1.fullReport.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-2 font-sans text-[13px] leading-relaxed text-ink/85"
            >
              <span aria-hidden className="shrink-0 text-[#0F6E56]">
                ✓
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-8 border-line-stone/30" />

      <span className="inline-flex w-fit rounded-full bg-[#EAE4DC] px-3 py-1 font-sans text-label text-ink">
        {TOUCHPOINT1.clarityCall.badge}
      </span>

      <p className="mt-4 whitespace-pre-line font-sans text-[13px] leading-relaxed text-ink/85">
        {TOUCHPOINT1.clarityCall.body}
      </p>

      <Link href="/book" className="btn-primary mt-8">
        {TOUCHPOINT1.clarityCall.cta}
      </Link>

      <p className="disclaimer mt-8">{DISCLAIMER}</p>
      <Wordmark className="mt-6 self-center" />
    </div>
  );
}
