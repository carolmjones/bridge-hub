import Image from "next/image";

const STORY_PARAGRAPHS = [
  "I grew up in São Paulo, Brazil. I became a nurse because I wanted to be useful in the hardest rooms, and for years that's where I worked. Paediatrics. Intensive care. Families in the worst week of their lives.",
  "I saw what the charts didn't show. Mothers holding it together in the corridor and falling apart in the car park. Bodies stuck in alert long after the danger had passed.",
  "In Wales I did my master's in psychology, specialising in play therapy, with a thesis grounded in attachment theory. That's where something clicked. Safety isn't a thought we convince ourselves into. It's something the body decides first.",
  "Then life tested the theory on me. In Ireland I lost three pregnancies. I know what it is to be the patient in the room, not the nurse. And I know what it is to run into A&E with your own child in your arms.",
  "Understanding my story wasn't what healed me. Working with my pattern was. Finding the root, learning my default, giving my body what it needed before asking it to change. That's what took me past nursing and into this work, and it's why I'm still training, still learning, right now, in psychotherapy.",
] as const;

export function AboutMyStory() {
  return (
    <section className="relative z-10 -mt-[clamp(72px,11vw,128px)] bg-gradient-to-b from-cream from-[18%] via-[#F2EBDF] to-warm-paper to-[72%] px-6 pb-[clamp(56px,8vw,88px)]">
      <div className="relative mx-auto max-w-[980px]">
        <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-gradient-to-b from-white/92 via-[#FDFBF6]/88 to-[#FAF7EF]/82 p-[clamp(14px,2.5vw,22px)] shadow-[0_40px_90px_-48px_rgba(35,40,36,0.38),0_0_0_1px_rgba(207,196,181,0.35),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-md">
          <div
            className="pointer-events-none absolute -left-20 -top-16 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(190,194,169,0.28),transparent_68%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-20 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(218,206,191,0.22),transparent_70%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,transparent_0%,rgba(255,255,255,0.45)_38%,transparent_68%)] opacity-60"
            aria-hidden
          />

          <Image
            src="/images/about-leaf-gold.png"
            alt=""
            width={150}
            height={150}
            unoptimized
            className="pointer-events-none absolute -right-2 bottom-6 z-[1] h-auto w-[clamp(96px,12vw,150px)] -scale-x-100 rotate-[8deg] opacity-35"
            aria-hidden
          />

          <div className="relative grid grid-cols-1 items-stretch gap-[clamp(14px,2.5vw,22px)] lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)]">
            <div className="relative min-h-[280px] overflow-hidden rounded-[20px] border border-line-stone/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] lg:min-h-[480px]">
              <Image
                src="/images/about-my-story.jpg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 400px"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F6F0E6]/10 via-transparent to-cream/15" />
            </div>

            <div className="flex flex-col justify-center px-2 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8">
              <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-line-stone/80 bg-white/60 px-3.5 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7060]">
                <span
                  className="h-[5px] w-[5px] rounded-full bg-glow-sage"
                  aria-hidden
                />
                My story
              </span>

              <div className="space-y-4 font-sans text-[15px] leading-[1.78] text-soft-ink">
                {STORY_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <p className="mt-7 font-serif text-[20px] italic text-ink">
                — Caroline
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
