"use client";

import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import {
  getStoredConsent,
  hasAnalyticsConsent,
} from "@/lib/marketing/cookie-consent";

export function VercelAnalyticsWithConsent() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function syncConsent() {
      setEnabled(hasAnalyticsConsent(getStoredConsent()));
    }

    syncConsent();
    window.addEventListener("bridge-hub:cookie-consent-updated", syncConsent);
    return () => {
      window.removeEventListener("bridge-hub:cookie-consent-updated", syncConsent);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Analytics />;
}
