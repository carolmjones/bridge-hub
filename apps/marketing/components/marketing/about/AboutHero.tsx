import Image from "next/image";

const HERO_PARAGRAPHS = [
  "You are not a diagnosis. Not a label. Not a disorder.",
  "You are carrying a pattern you learned before you had any say in it. A default your body chose when it did not know another way.",
  "That is why this starts with understanding your pattern. Finding the root. Mapping your default, rather than simply managing your symptoms.",
  "I know this as a nurse. I know it as a patient. I know it as a mother. And I know it through the one-to-one work I now do with women who feel stuck in survival mode.",
] as const;

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-cream pb-[clamp(88px,14vw,160px)]">
      <Image
        src="/images/about-leaf-gold.png"
        alt=""
        width={220}
        height={220}
        unoptimized
        className="pointer-events-none absolute -left-10 top-[clamp(72px,12vw,120px)] z-[1] h-auto w-[clamp(140px,18vw,220px)] opacity-45"
        aria-hidden
      />

      <div className="relative z-[2] mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-10 px-6 pt-[clamp(48px,7vw,72px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-14">
        <div className="relative text-left">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line-stone bg-white/55 px-3.5 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7060]">
            <span
              className="h-[5px] w-[5px] rounded-full bg-glow-sage"
              aria-hidden
            />
            About
          </span>

          <h1 className="max-w-[520px] font-serif text-[clamp(36px,7vw,52px)] font-normal leading-[1.08] text-ink">
            Caroline Jones
          </h1>
          <p className="mt-3 max-w-[520px] font-serif text-[clamp(22px,4vw,28px)] font-normal italic leading-[1.2] text-soft-ink">
            Rethinking what it means to heal.
          </p>

          <div className="mb-7 mt-5 h-px w-14 bg-line-stone" aria-hidden />

          <div className="max-w-[520px] space-y-4 font-sans text-body-lg leading-[1.75] text-soft-ink">
            {HERO_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-7 font-serif text-[22px] text-ink">Caroline Jones</p>
        </div>

        <div className="relative mx-auto w-full max-w-[480px] lg:mx-0 lg:max-w-none">
          <div
            className="pointer-events-none absolute -bottom-5 -right-5 h-[88%] w-[88%] rounded-[22px] bg-gradient-to-br from-glow-sage/20 to-stone/40"
            aria-hidden
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] shadow-[0_28px_60px_-36px_rgba(35,40,36,0.4)]">
            <Image
              src="/images/caroline-web3-about.jpg"
              alt="Caroline Jones"
              fill
              unoptimized
              className="object-cover object-center"
              sizes="(max-width: 1024px) 90vw, 480px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
