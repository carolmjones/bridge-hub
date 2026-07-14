export type CookiePreferences = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  performance: boolean;
};

export const CONSENT_STORAGE_KEY = "bridge-hub-marketing-cookie-consent";
export const OPEN_COOKIE_PREFERENCES_EVENT = "bridge-hub:open-cookie-preferences";

export const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  performance: false,
};

export const ALL_PREFERENCES: CookiePreferences = {
  necessary: true,
  functional: true,
  analytics: true,
  performance: true,
};

export function acceptAllPreferences(): CookiePreferences {
  return { ...ALL_PREFERENCES };
}

export function rejectAllPreferences(): CookiePreferences {
  return { ...DEFAULT_PREFERENCES };
}

export function getStoredConsent(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookiePreferences;
    if (parsed.necessary !== true) return null;
    return {
      necessary: true,
      functional: Boolean(parsed.functional),
      analytics: Boolean(parsed.analytics),
      performance: Boolean(parsed.performance),
    };
  } catch {
    return null;
  }
}

export function saveConsent(preferences: CookiePreferences): void {
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  window.dispatchEvent(
    new CustomEvent("bridge-hub:cookie-consent-updated", { detail: preferences }),
  );
}

export function openCookiePreferences(): void {
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_PREFERENCES_EVENT));
}

export function hasAnalyticsConsent(preferences: CookiePreferences | null): boolean {
  return Boolean(preferences?.analytics);
}
