declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      target: string | Date,
      params?: Record<string, string>,
    ) => void;
  }
}

const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export function trackGenerateLead(method: string): void {
  if (typeof window === "undefined" || !GA4_ID || !window.gtag) return;
  window.gtag("event", "generate_lead", { method });
}

export function trackCtaClick(destination: string): void {
  if (typeof window === "undefined" || !GA4_ID || !window.gtag) return;
  window.gtag("event", "select_content", {
    content_type: "cta",
    item_id: destination,
  });
}
