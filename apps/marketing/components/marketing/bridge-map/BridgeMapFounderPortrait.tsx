"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Add your portrait at `public/images/bridge-map-founder.jpg` (4:5, ~800×1000px). */
const PORTRAIT_SRC = "/images/bridge-map-founder.jpg";

export function BridgeMapFounderPortrait() {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkPortrait() {
      try {
        const res = await fetch(PORTRAIT_SRC, { method: "HEAD" });
        if (!cancelled) setShowImage(res.ok);
      } catch {
        if (!cancelled) setShowImage(false);
      }
    }

    checkPortrait();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-3 rounded-[30px] bg-gradient-to-br from-white/70 via-white/20 to-glow-sage/15"
        aria-hidden
      />

      <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border-[8px] border-white/60 bg-[#DECFBC] shadow-[0_40px_80px_-44px_rgba(35,40,36,0.5)]">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#E8DDD0] via-[#DECFBC] to-[#C9B8A4]"
          aria-hidden
        />

        {showImage ? (
          <Image
            src={PORTRAIT_SRC}
            alt="Caroline Jones, founder of The Bridge Map"
            fill
            className="object-cover object-center scale-[1.1]"
            sizes="(max-width: 768px) 90vw, 380px"
            quality={95}
            unoptimized
            onError={() => setShowImage(false)}
          />
        ) : null}
      </div>
    </div>
  );
}
