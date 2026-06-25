/** S6 Touchpoint 1 — static copy slots (chat-05-phase3-copy-v3.md) */
import { REPORT_SECTION_ORDER } from "@/lib/report/section-order";

export const TOUCHPOINT1 = {
  eyebrow: "Screening complete",
  headline:
    "You have just put words to something that takes most people years to name.",
  credibility: {
    body: `The questions you answered are the same validated tools used by clinicians and researchers worldwide. Not a general quiz. Your results are measured, not estimated.`,
  },
  fullReport: {
    heading: "Your full Nervous System Map is waiting.",
    intro:
      "It goes deeper into each of the five areas, with personalised reflections drawn from your specific answers and research-grounded interpretations of what your results are showing.",
    delivery: "It is sent to you as soon as you book your Clarity Call.",
    bullets: [
      "Built from your responses, not a template",
      "Scored against published population norms",
      "Designed by a qualified nurse and therapist",
      "A screening tool, not a diagnosis",
      "Your results belong to you",
    ],
  },
  clarityCall: {
    badge: "Free Clarity Call",
    body: `You have spent time looking clearly at something most people spend years avoiding. That deserves more than a report.

The Clarity Call is where your results become a real conversation. Someone who has read everything you just completed will walk through what stands out, what connects across the five areas, and what it would actually look like to begin shifting what you are carrying.

You will leave knowing what the path forward looks like for you specifically. Not a general answer. Yours.

Up to 45 minutes. Free. No obligation.`,
    cta: "Book your free Clarity Call",
  },
  resultsOverviewLabel: "YOUR RESULTS OVERVIEW",
  compiledOverviewHeading: "What your answers are showing",
  synthesisFallback:
    "Across all five areas, your answers pointed toward a system that has been carrying a significant load for some time.",
  overviewFallback:
    "Across all five areas, your answers pointed toward a system that has been carrying a significant load, in ways that are worth understanding more fully.",
} as const;

/** Row dot colours — wireframe S6, locked section names in labels */
export const RESULT_ROW_META = REPORT_SECTION_ORDER.map((row) => ({
  sectionIndex: row.sectionIndex,
  name: row.name,
  instrument: row.instrument,
  dotColor:
    row.instrument === "MAIA2"
      ? "#3A8C7E"
      : row.instrument === "PSS10"
        ? "#C4873A"
        : row.instrument === "PHQ8"
          ? "#C4A03A"
          : row.instrument === "PCL5"
            ? "#4A6E8C"
            : "#7E5A6E",
}));
