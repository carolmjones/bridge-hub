type AuroraGlowsProps = {
  /** Section-level (Bridge Map CTA) vs card-level (Final CTA inner card). */
  variant?: "section" | "card";
  showDotGrid?: boolean;
};

const SECTION_AURORA = {
  a: {
    className:
      "pointer-events-none absolute -left-[6%] -top-[12%] h-[560px] w-[560px] animate-bm-aurora-a rounded-full motion-reduce:animate-none",
    background:
      "radial-gradient(circle, rgba(142,154,124,0.55), rgba(142,154,124,0) 68%)",
    filter: "blur(36px)",
  },
  b: {
    className:
      "pointer-events-none absolute -bottom-[18%] -right-[8%] h-[620px] w-[620px] animate-bm-aurora-b rounded-full motion-reduce:animate-none",
    background:
      "radial-gradient(circle, rgba(218,206,191,0.4), rgba(218,206,191,0) 68%)",
    filter: "blur(40px)",
  },
  dotGrid: {
    backgroundImage:
      "radial-gradient(rgba(250,247,239,0.05) 1px, transparent 1px)",
    backgroundSize: "26px 26px",
    maskImage:
      "radial-gradient(circle at 50% 42%, #000 0%, transparent 72%)",
    WebkitMaskImage:
      "radial-gradient(circle at 50% 42%, #000 0%, transparent 72%)",
  },
} as const;

const CARD_AURORA = {
  a: {
    className:
      "pointer-events-none absolute -left-[10%] -top-[16%] h-[440px] w-[440px] animate-bm-aurora-a rounded-full motion-reduce:animate-none",
    background:
      "radial-gradient(circle, rgba(142,154,124,0.5), rgba(142,154,124,0) 68%)",
    filter: "blur(34px)",
  },
  b: {
    className:
      "pointer-events-none absolute -bottom-[22%] -right-[12%] h-[480px] w-[480px] animate-bm-aurora-b rounded-full motion-reduce:animate-none",
    background:
      "radial-gradient(circle, rgba(218,206,191,0.34), rgba(218,206,191,0) 68%)",
    filter: "blur(40px)",
  },
  dotGrid: {
    backgroundImage:
      "radial-gradient(rgba(250,247,239,0.045) 1px, transparent 1px)",
    backgroundSize: "24px 24px",
    maskImage: "radial-gradient(circle at 50% 36%, #000, transparent 72%)",
    WebkitMaskImage:
      "radial-gradient(circle at 50% 36%, #000, transparent 72%)",
  },
} as const;

export function AuroraGlows({
  variant = "section",
  showDotGrid = true,
}: AuroraGlowsProps) {
  const tokens = variant === "card" ? CARD_AURORA : SECTION_AURORA;

  return (
    <>
      <div
        className={tokens.a.className}
        style={{
          background: tokens.a.background,
          filter: tokens.a.filter,
        }}
        aria-hidden
      />
      <div
        className={tokens.b.className}
        style={{
          background: tokens.b.background,
          filter: tokens.b.filter,
        }}
        aria-hidden
      />
      {showDotGrid ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={tokens.dotGrid}
          aria-hidden
        />
      ) : null}
    </>
  );
}
