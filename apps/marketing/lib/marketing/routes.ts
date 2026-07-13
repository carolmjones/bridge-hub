/** Screening app base URL (separate Vercel deploy). */
function screeningBase(): string {
  const url = process.env.NEXT_PUBLIC_SCREENING_URL?.replace(/\/$/, "");
  if (url) return url;
  return "http://localhost:3001";
}

export function screeningUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${screeningBase()}${normalized}`;
}

/** Marketing CTAs → screening funnel entry (consent + email at /begin). */
export const SCREENING_START = screeningUrl("/begin");

export const MARKETING_ROUTES = {
  home: "/",
  bridgeMap: "/bridge-map",
  freeClass: "/free-class",
  urgentSupport: "/urgent-support",
  about: "/about",
  workWithMe: "/work-with-me",
  coaching: "/work-with-me/coaching",
  keynoteSpeaking: "/work-with-me/speaking",
  speakingEnquiry: "/work-with-me/speaking/enquire",
  clarityCall: "/clarity-call",
  privacy: "/privacy",
  screeningPrivacy: screeningUrl("/privacy"),
  terms: "/terms",
  support: "/urgent-support",
} as const;
