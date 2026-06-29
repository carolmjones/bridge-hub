import Image from "next/image";

const REALITY_ITEMS = [
  "You keep showing up for everyone else, even when you feel empty inside.",
  "Your body seems to pull back the moment you try to choose yourself.",
  "You make plans, promise yourself this time will be different, then watch the same pattern return.",
  "You feel ashamed that steps which look simple to others feel impossible to you.",
  "You can handle pressure and crisis — but your own needs feel strangely hard to act on.",
  "You are tired of being told to try harder when something deeper is happening.",
] as const;

export function DailyReality() {
  return (
    <section className="border-t border-line-stone bg-warm-paper py-[72px]">
      <div className="mx-auto max-w-[680px] px-6">
        <p className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-sage">
          Is this you
        </p>
        <h2 className="mb-7 font-serif text-[clamp(28px,6vw,34px)] font-normal text-ink">
          Is this your daily reality?
        </h2>

        <div className="flex items-start gap-8">
          <ul className="m-0 flex-1 list-none p-0">
            {REALITY_ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-b border-line-stone py-4 first:pt-0"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                  aria-hidden
                />
                <span className="font-sans text-sm leading-[1.7] text-soft-ink">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div
            className="relative hidden h-[240px] w-[160px] shrink-0 overflow-hidden rounded-[10px] bg-stone min-[761px]:block"
            role="img"
            aria-label="Caroline Jones"
          >
            <Image
              src="/images/side.png"
              alt=""
              fill
              className="object-cover object-center"
              sizes="160px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
