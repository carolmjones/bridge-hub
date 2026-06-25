import { answerKey, loadLocalAssessment } from "@/lib/assessment/storage";

export function hydrateAnswersFromResponses(
  responses: Array<{
    instrument: string;
    item_number: number;
    response_value: number;
  }>
): Record<string, number> {
  const answers: Record<string, number> = {};
  for (const response of responses) {
    answers[answerKey(response.instrument, response.item_number)] =
      response.response_value;
  }
  return answers;
}

export function resolveAssessmentStart(
  sessionId: string,
  serverSection: number,
  serverItem: number,
  serverAnswers: Record<string, number>,
  isNew: boolean
) {
  const local = loadLocalAssessment();
  if (local && local.sessionId === sessionId && !isNew) {
    return {
      section: local.currentSection,
      item: local.currentItem,
      answers: { ...serverAnswers, ...local.answers },
      showTransition: false,
    };
  }
  return {
    section: serverSection,
    item: serverItem,
    answers: serverAnswers,
    showTransition: isNew,
  };
}
