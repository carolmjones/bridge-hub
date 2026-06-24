const STORAGE_KEY = "bridge-hub-assessment";

export type LocalAssessmentState = {
  sessionId: string;
  currentSection: number;
  currentItem: number;
  answers: Record<string, number>;
  writeInText?: string;
  updatedAt: string;
};

function answerKey(instrument: string, itemNumber: number) {
  return `${instrument}:${itemNumber}`;
}

export function loadLocalAssessment(): LocalAssessmentState | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LocalAssessmentState) : null;
  } catch {
    return null;
  }
}

export function saveLocalAssessment(state: LocalAssessmentState) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...state, updatedAt: new Date().toISOString() })
  );
}

export function clearLocalAssessment() {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
}

export { answerKey };
