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
      <div className="mx-auto max-w-[820px] px-6">
        <p className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-sage">
          Is this you
        </p>
        <h2 className="mb-7 font-serif text-[clamp(28px,6vw,34px)] font-normal text-ink">
          Is this your daily reality?
        </h2>

        <div className="flex items-stretch gap-6 min-[761px]:gap-8">
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
            className="relative hidden w-[200px] shrink-0 self-stretch min-[761px]:block lg:w-[240px] xl:w-[280px]"
            role="img"
            aria-label="Caroline Jones"
          >
            <div className="absolute inset-0 overflow-hidden rounded-l-[14px]">
              <Image
                src="/images/caroline-web-photo2-portrait.jpg"
                alt=""
                fill
                unoptimized
                className="-scale-x-100 object-cover object-[center_12%]"
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 480px, 400px"
              />

              {/* Left-edge fade into section — 10% width only */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-warm-paper to-transparent"
                aria-hidden
              />

              {/* Right-side depth shading */}
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-black/22 via-black/8 to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
