import type { ReactNode } from "react";
import { AuroraGlows } from "./AuroraGlows";

type SpotlightSectionProps = {
  children: ReactNode;
  className?: string;
  paddingClassName?: string;
};

/** Full-width dark section with aurora backdrop — used by Bridge Map CTA. */
export function SpotlightSection({
  children,
  className = "",
  paddingClassName = "py-[104px]",
}: SpotlightSectionProps) {
  return (
    <section
      className={`relative overflow-hidden bg-deep-card ${paddingClassName} ${className}`.trim()}
    >
      <AuroraGlows variant="section" />
      <div className="relative">{children}</div>
    </section>
  );
}

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  maxWidthClassName?: string;
};

/** Elevated dark card with internal aurora — used by Final CTA. */
export function SpotlightCard({
  children,
  className = "",
  maxWidthClassName = "max-w-[660px]",
}: SpotlightCardProps) {
  return (
    <div
      className={`relative mx-auto overflow-hidden rounded-[30px] border border-glow-sage/20 px-[clamp(26px,5vw,60px)] py-[clamp(48px,7vw,76px)] shadow-[0_60px_120px_-46px_rgba(20,28,24,0.75),inset_0_1px_0_rgba(250,247,239,0.07)] ${maxWidthClassName} ${className}`.trim()}
      style={{
        background: "linear-gradient(162deg, #22302A, #141C18)",
      }}
    >
      <AuroraGlows variant="card" />
      <div className="relative">{children}</div>
    </div>
  );
}
