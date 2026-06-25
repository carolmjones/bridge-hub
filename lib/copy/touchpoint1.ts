/** S6 Touchpoint 1 — static copy slots (chat-05-phase3-copy-v3.md) */

export const TOUCHPOINT1 = {
  eyebrow: "Screening complete",
  headline:
    "You have just put words to something that takes most people years to name.",
  credibility: {
    body: `The questions you answered are the same validated tools used by clinicians and researchers worldwide. Not a general quiz. Your results are measured, not estimated.`,
  },
  fullReport: {
    label: "YOUR FULL REPORT",
    body: `Your full report goes deeper into each of the five areas. It includes a personalised reflection drawn from your specific answers, a research-grounded interpretation of what your results may be showing, and every question you answered in full.

It is scored using published psychometric methods and sent to your email as soon as you book your Clarity Call.`,
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
  synthesisFallback:
    "Across all five areas, your answers pointed toward a system that has been carrying a significant load for some time.",
} as const;

/** Row dot colours — wireframe S6, locked section names in labels */
export const RESULT_ROW_META = [
  {
    sectionIndex: 1,
    name: "The Load",
    instrument: "PSS10" as const,
    dotColor: "#C4873A",
  },
  {
    sectionIndex: 2,
    name: "The Fog",
    instrument: "PHQ8" as const,
    dotColor: "#C4A03A",
  },
  {
    sectionIndex: 3,
    name: "The Body Room",
    instrument: "MAIA2" as const,
    dotColor: "#3A8C7E",
  },
  {
    sectionIndex: 4,
    name: "The Weight You Carry",
    instrument: "PCL5" as const,
    dotColor: "#4A6E8C",
  },
  {
    sectionIndex: 5,
    name: "The Weather Inside",
    instrument: "PID5SF" as const,
    dotColor: "#7E5A6E",
  },
];
