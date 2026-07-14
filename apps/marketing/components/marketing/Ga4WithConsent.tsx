"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  getStoredConsent,
  hasAnalyticsConsent,
} from "@/lib/marketing/cookie-consent";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export function Ga4WithConsent() {
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

  if (!GA4_ID || !enabled) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`}
      </Script>
    </>
  );
}
