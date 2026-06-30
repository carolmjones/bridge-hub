import Link from "next/link";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

const PILLARS = [
  {
    icon: "◎",
    title: "Understand",
    items: [
      "Make sense of why your body responds the way it does",
      "Understand why nothing else has worked until now",
      "See your nervous system profile clearly for the first time",
    ],
  },
  {
    icon: "◈",
    title: "Personalise",
    items: [
      "Work built around your nervous system profile, not everyone else's",
      "Every session focuses on what you need most",
      "No modules to fall behind on. No generic plan.",
    ],
  },
  {
    icon: "◇",
    title: "Build",
    items: [
      "Practical capacity to move toward what you actually want",
      "Tools chosen for your nervous system profile specifically",
      "Change that goes with you into real life",
    ],
  },
] as const;

export function OutcomePillars() {
  return (
    <section className="border-t border-line-stone bg-warm-paper py-[72px]">
      <div className="mx-auto max-w-[680px] px-6">
        <p className="mb-4 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-sage">
          The Bridge Programme
        </p>

        <p className="mb-10 max-w-[460px] font-sans text-body-lg leading-[1.72] text-soft-ink">
          I created The Bridge Programme to give you the same transformation in 8
          weeks.
        </p>

        <div className="mb-10 flex flex-col gap-4">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-[14px] border border-line-stone bg-cream p-7"
            >
              <div
                className="mb-3 text-[22px] text-[#7C8B6F]"
                aria-hidden
              >
                {pillar.icon}
              </div>
              <h3 className="mb-4 font-serif text-2xl font-normal text-ink">
                {pillar.title}
              </h3>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-glow-sage"
                      aria-hidden
                    />
                    <span className="font-sans text-[13px] leading-[1.55] text-soft-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={MARKETING_ROUTES.freeClass}
            className="mb-4 inline-flex h-[54px] items-center justify-center rounded-[14px] bg-btn-primary px-[30px] font-sans text-[15px] font-medium text-btn-text transition-colors hover:bg-btn-primary-hover"
          >
            Watch the free class
          </Link>
          <div>
            <Link
              href={MARKETING_ROUTES.bridgeMap}
              className="font-sans text-[13px] text-sage underline underline-offset-[3px] hover:text-[#6B7060]"
            >
              Or discover your nervous system profile →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
