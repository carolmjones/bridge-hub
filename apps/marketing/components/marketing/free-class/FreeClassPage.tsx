"use client";

import { useEffect, useState } from "react";
import {
  FREE_CLASS_RESET_EVENT,
  FREE_CLASS_UNLOCK_EVENT,
  FREE_CLASS_UNLOCK_KEY,
} from "./constants";
import { FreeClassLanding } from "./FreeClassLanding";
import { FreeClassWatch } from "./FreeClassWatch";

function readUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(FREE_CLASS_UNLOCK_KEY) === "1";
}

export function FreeClassPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shouldReset =
      process.env.NODE_ENV === "development" && params.get("reset") === "1";

    if (shouldReset) {
      localStorage.removeItem(FREE_CLASS_UNLOCK_KEY);
      params.delete("reset");
      const query = params.toString();
      window.history.replaceState(
        {},
        "",
        query ? `/free-class?${query}` : "/free-class",
      );
      window.dispatchEvent(new Event(FREE_CLASS_RESET_EVENT));
      setUnlocked(false);
      setReady(true);
      return;
    }

    setUnlocked(readUnlocked());
    setReady(true);
  }, []);

  const handleUnlock = async (data: { email: string; firstName: string }) => {
    const response = await fetch("/api/free-class/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload = (await response.json().catch(() => ({}))) as {
      error?: string;
    };

    if (!response.ok) {
      throw new Error(
        payload.error || "Something went wrong. Please try again.",
      );
    }

    localStorage.setItem(FREE_CLASS_UNLOCK_KEY, "1");
    setUnlocked(true);
    window.dispatchEvent(new Event(FREE_CLASS_UNLOCK_EVENT));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!ready) {
    return null;
  }

  if (unlocked) {
    return <FreeClassWatch />;
  }

  return <FreeClassLanding onUnlock={handleUnlock} />;
}
