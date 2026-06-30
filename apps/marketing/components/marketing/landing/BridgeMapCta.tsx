import Link from "next/link";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

const STEPS = [
  {
    n: 1,
    delay: "0s",
    body: (
      <>
        Complete the screening.{" "}
        <strong className="font-medium text-cream">
          Five areas. 15 minutes. Plain language throughout.
        </strong>
      </>
    ),
  },
  {
    n: 2,
    delay: "1.5s",
    body: (
      <>
        See your summary results immediately on screen.{" "}
        <strong className="font-medium text-cream">
          A clear picture of your patterns.
        </strong>
      </>
    ),
  },
  {
    n: 3,
    delay: "3s",
    body: (
      <>
        Get your full deep dive results{" "}
        <strong className="font-medium text-cream">
          after booking a Clarity Call with Caroline.
        </strong>
      </>
    ),
  },
] as const;

export function BridgeMapCta() {
  return (
    <section className="relative overflow-hidden bg-deep-card py-[104px]">
      <div
        className="pointer-events-none absolute -left-[6%] -top-[12%] h-[560px] w-[560px] animate-bm-aurora-a rounded-full motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(circle, rgba(142,154,124,0.55), rgba(142,154,124,0) 68%)",
          filter: "blur(36px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-[18%] -right-[8%] h-[620px] w-[620px] animate-bm-aurora-b rounded-full motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(circle, rgba(218,206,191,0.4), rgba(218,206,191,0) 68%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(250,247,239,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(circle at 50% 42%, #000 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 42%, #000 0%, transparent 72%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[640px] px-6 text-center">
        <span className="mb-[22px] inline-flex items-center gap-2 rounded-full border border-glow-sage/30 bg-glow-sage/10 px-4 py-[7px] font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#C7CBB0]">
          <span
            className="h-1.5 w-1.5 rounded-full bg-glow-sage shadow-[0_0_10px_rgba(190,194,169,0.9)]"
            aria-hidden
          />
          Free — takes 15 minutes
        </span>

        <h2 className="mb-[18px] font-serif text-[clamp(34px,8vw,46px)] font-normal leading-[1.08] text-cream">
          Which nervous system profile are you?
        </h2>

        <p className="mx-auto mb-11 max-w-[500px] font-sans text-body-lg text-cream/[0.72]">
          The Bridge Map is a guided psychological screening that reveals your
          nervous system profile across five areas of your life.
        </p>

        <div
          className="relative rounded-[22px] border border-glow-sage/20 px-[clamp(18px,4vw,34px)] py-3.5 text-left shadow-[0_40px_80px_-28px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(250,247,239,0.08)] backdrop-blur-[6px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(250,247,239,0.06), rgba(250,247,239,0.02))",
          }}
        >
          {STEPS.map((step, index) => (
            <div
              key={step.n}
              className={`flex items-start gap-5 py-[22px] ${
                index < STEPS.length - 1
                  ? "border-b border-cream/[0.09]"
                  : ""
              }`}
            >
              <span
                className="flex h-[42px] w-[42px] shrink-0 animate-bm-badge-glow items-center justify-center rounded-full bg-gradient-to-br from-[#D7DBC2] to-[#9EAA84] font-serif text-xl text-deep-card motion-reduce:animate-none"
                style={{ animationDelay: step.delay }}
              >
                {step.n}
              </span>
              <p className="m-0 pt-2 font-sans text-sm leading-[1.65] text-cream/[0.82]">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={MARKETING_ROUTES.bridgeMap}
            className="inline-flex h-[54px] items-center justify-center rounded-[14px] bg-gradient-to-br from-[#E7EAD7] to-glow-sage px-8 font-sans text-[15px] font-semibold text-dark-room shadow-[0_16px_34px_-12px_rgba(190,194,169,0.6)] transition-shadow hover:shadow-[0_20px_44px_-10px_rgba(190,194,169,0.85)]"
          >
            I want to know my profile
          </Link>
          <p className="mt-4 font-sans text-[11px] text-cream/[0.32]">
            This is a screening tool, not a clinical diagnosis.
          </p>
        </div>
      </div>
    </section>
  );
}
