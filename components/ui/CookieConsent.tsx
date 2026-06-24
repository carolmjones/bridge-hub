"use client";

import { useEffect, useState } from "react";

const COOKIE_KEY = "bridge-hub-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-stone/40 bg-cream px-4 py-4 shadow-lg transition-transform duration-200 md:mx-auto md:max-w-phone">
      <p className="font-sans text-body-sm text-soft-ink">
        We use essential cookies to save your session and keep the screening
        working. See our privacy policy for details.
      </p>
      <div className="mt-3 flex gap-3">
        <a
          href="/privacy"
          className="flex-1 rounded-button border border-line-stone py-2.5 text-center font-sans text-body-sm text-soft-ink"
        >
          Manage
        </a>
        <button
          type="button"
          onClick={accept}
          className="flex-1 rounded-button bg-btn-primary py-2.5 font-sans text-body-sm text-btn-text"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
