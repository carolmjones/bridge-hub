import Link from "next/link";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

const OUTCOMES = [
  "Set goals and actually move toward them — without hitting the same wall",
  "Feel progress where before you only felt stuck",
  "Wake up without that low-level dread that has become your normal",
  "Stop replaying conversations, decisions, and mistakes on a loop",
  "Feel your body as something working with you, not against you",
  "Feel present with the people you love, not just physically there",
  "Stop spending energy pretending you are fine when you are not",
  "Show up for the people you love without losing yourself in the process",
  "Know what you need — and feel safe enough to choose it",
] as const;

export function Outcomes() {
  return (
    <section className="border-t border-line-stone bg-cream py-[72px]">
      <div className="mx-auto max-w-[680px] px-6">
        <p className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-sage">
          By the end
        </p>
        <h2 className="mb-9 font-serif text-[clamp(28px,6vw,34px)] font-normal text-ink">
          By the end of these 8 weeks, you will:
        </h2>

        <ul className="m-0 list-none p-0">
          {OUTCOMES.map((outcome) => (
            <li
              key={outcome}
              className="flex items-start gap-4 border-b border-line-stone py-4"
            >
              <span
                className="mt-0.5 shrink-0 font-sans text-base text-sage"
                aria-hidden
              >
                ✓
              </span>
              <span className="font-sans text-sm leading-[1.65] text-soft-ink">
                {outcome}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-11">
          <Link
            href={MARKETING_ROUTES.freeClass}
            className="inline-flex h-[54px] items-center justify-center rounded-[14px] bg-btn-primary px-[30px] font-sans text-[15px] font-medium text-btn-text transition-colors hover:bg-btn-primary-hover"
          >
            Watch the free class
          </Link>
        </div>
      </div>
    </section>
  );
}
