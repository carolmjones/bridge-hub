import type { Instrument } from "@/lib/types/database";

/** Locked section sequence — Body Room first. Used by S6, PDF, and addendum. */
export const REPORT_SECTION_ORDER = [
  {
    sectionIndex: 1,
    name: "The Body Room",
    instrument: "MAIA2" as Instrument,
  },
  {
    sectionIndex: 2,
    name: "The Load",
    instrument: "PSS10" as Instrument,
  },
  {
    sectionIndex: 3,
    name: "The Fog",
    instrument: "PHQ8" as Instrument,
  },
  {
    sectionIndex: 4,
    name: "The Weight You Carry",
    instrument: "PCL5" as Instrument,
  },
  {
    sectionIndex: 5,
    name: "The Weather Inside",
    instrument: "PID5SF" as Instrument,
  },
] as const;
