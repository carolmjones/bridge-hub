import Image from "next/image";
import Link from "next/link";

import { MARKETING_ROUTES } from "@/lib/marketing/routes";

const STORY_PARAGRAPHS = [
  "I grew up in São Paulo, Brazil, and became a nurse because I wanted to help people.",
  "For years, I worked in paediatrics and intensive care, supporting children and families through some of the hardest days of their lives. I learned to notice what could not be captured in a chart. The mother holding everything together beside the hospital bed, then crying alone in the car park. The family who had made it safely home, but whose bodies were still living as though the danger had never ended.",
  "Later, while living in Wales, I did my master's in psychology, specialising in play therapy, with a thesis grounded in attachment theory. It helped me understand something that nursing had already shown me again and again. Feeling safe is not simply a thought. It is something the body needs to experience.",
  "Then I came to understand this from the other side. Life brought obstacles of my own, and I learned what it was to be the patient in the room rather than the nurse, to need someone else to take over on the days I could not.",
  "For a long time, I believed that understanding what had happened to me would be enough. It helped, but it did not change the way my body reacted. The real shift began when I learned to recognise the patterns underneath those reactions. I began to understand what my body had learned to do, why it kept returning to the same responses, and what it needed in order to feel safe enough to change.",
  "I wanted to give other women a way to see those patterns too. So I did something unusual for a nurse: I went back and earned an honours degree in software engineering, and used it to build the tool I had needed myself. Naming what is happening inside us, and giving it a shape we can actually look at, is one of the most established ways the body begins to quiet and change. The Bridge Map exists to make that possible, to take what has been invisible and overwhelming and turn it into something you can finally understand and work with.",
  "This work is professional, but it is also deeply personal. I do not stand outside it and explain it from a distance. I know what it is to live inside these patterns, and I know what can begin to change when we finally understand them.",
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
            <div className="relative order-2 min-h-[280px] overflow-hidden rounded-[20px] border border-line-stone/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] lg:order-1 lg:min-h-[480px]">
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

            <div className="order-1 flex flex-col justify-center px-2 py-4 sm:px-4 sm:py-6 lg:order-2 lg:px-6 lg:py-8">
              <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-line-stone/80 bg-white/60 px-3.5 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7060]">
                <span
                  className="h-[5px] w-[5px] rounded-full bg-glow-sage"
                  aria-hidden
                />
                My story
              </span>

              <div className="space-y-4 font-sans text-[15px] leading-[1.78] text-soft-ink">
                {STORY_PARAGRAPHS.map((paragraph, index) => (
                  <div key={paragraph}>
                    <p>{paragraph}</p>
                    {index === 5 ? (
                      <p className="mt-4">
                        <Link
                          href={MARKETING_ROUTES.bridgeMap}
                          className="font-medium text-ink underline underline-offset-[3px] transition-colors hover:text-soft-ink"
                        >
                          That&apos;s how The Bridge Map was born →
                        </Link>
                      </p>
                    ) : null}
                  </div>
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
