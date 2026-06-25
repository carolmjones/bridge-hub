import type { Instrument } from "@/lib/types/database";

export type SectionConfig = {
  index: number;
  internalCode: string;
  userFacingName: string;
  transitionLabel: string;
  transitionIntro: string;
  assessmentInstruction: string;
  instrument: Instrument;
  toneBg: string;
  toneHover: string;
  itemCount: number;
};

export const SECTIONS: SectionConfig[] = [
  {
    index: 1,
    internalCode: "body",
    userFacingName: "The Body Room",
    transitionLabel: "SECTION 1 OF 5",
    transitionIntro:
      "This section explores what your body has been noticing, holding, and signalling.",
    assessmentInstruction:
      "Below is a list of statements. Please indicate how often each statement applies to you generally in daily life.",
    instrument: "MAIA2",
    toneBg: "#E4EBE8",
    toneHover: "#DCE5E1",
    itemCount: 27,
  },
  {
    index: 2,
    internalCode: "stress",
    userFacingName: "The Load",
    transitionLabel: "SECTION 2 OF 5",
    transitionIntro:
      "This section looks at the pressure your body may have learned to hold.",
    assessmentInstruction:
      "The questions below ask about your feelings and thoughts during the last month. For each one, choose how often you felt or thought that way.",
    instrument: "PSS10",
    toneBg: "#EDE8E2",
    toneHover: "#E5DFD6",
    itemCount: 10,
  },
  {
    index: 3,
    internalCode: "mood",
    userFacingName: "The Fog",
    transitionLabel: "SECTION 3 OF 5",
    transitionIntro: "We'll explore how life has been feeling lately.",
    assessmentInstruction:
      "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
    instrument: "PHQ8",
    toneBg: "#E8E4DE",
    toneHover: "#E0DCD4",
    itemCount: 8,
  },
  {
    index: 4,
    internalCode: "carrying",
    userFacingName: "The Weight You Carry",
    transitionLabel: "SECTION 4 OF 5",
    transitionIntro:
      "We'll look at what you've been carrying and how it shows up.",
    assessmentInstruction:
      "Below is a list of problems that people sometimes have in response to a very stressful experience. Keeping your worst experience in mind, please indicate how much you have been bothered by each problem in the past month.",
    instrument: "PCL5",
    toneBg: "#E2E6EA",
    toneHover: "#DADEE4",
    itemCount: 20,
  },
  {
    index: 5,
    internalCode: "emotional",
    userFacingName: "The Weather Inside",
    transitionLabel: "SECTION 5 OF 5",
    transitionIntro:
      "This section explores your emotional patterns, protection, and what changes the weather inside.",
    assessmentInstruction:
      "This is a list of things different people might say about themselves. There are no right or wrong answers. Please read each statement carefully and select the response that best describes you generally.",
    instrument: "PID5SF",
    toneBg: "#EAE6E8",
    toneHover: "#E2DEE0",
    itemCount: 39,
  },
];

export function getSection(index: number): SectionConfig {
  const section = SECTIONS.find((s) => s.index === index);
  if (!section) {
    throw new Error(`Unknown section index: ${index}`);
  }
  return section;
}
