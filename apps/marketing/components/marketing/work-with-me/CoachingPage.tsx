"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MARKETING_ROUTES, SCREENING_START } from "@/lib/marketing/routes";
import { FloatingPetals } from "@/components/marketing/FloatingPetals";
import { ProgrammeStructure } from "@/components/marketing/programme/ProgrammeStructure";
import { easeOut, fadeUp, staggerContainer } from "@/lib/marketing/motion";

const WHO_THIS_IS_FOR_LEAD =
  "You wake at 3am wired, heart going, for no reason you can name.";

const WHO_THIS_IS_FOR = [
  "One thing goes sideways in your day and your whole system floods. You're snapping at people you love, then lying awake replaying it.",
  "You've done the reading. Maybe the therapy. Maybe more courses than you'd admit to. You understand your patterns better than anyone in your life, and you're still stuck inside them.",
  "That's not a discipline problem. It never was. You've been trying to think your way out of something that doesn't live in your thoughts. It lives in your body, in a nervous system that learned to stay on alert and never got the message it's safe to stand down.",
  "This is for the woman who's ready to stop managing the symptom and start working with the root. Who wants something built for her specifically, not another template that assumes she already feels safe enough to follow it.",
] as const;

const INCLUDED = [
  {
    title: "Your full Nervous System Map.",
    body: "The complete deep-dive report from your Bridge Map results, yours to keep. The same document that usually only comes with a Clarity Call, included here in full.",
  },
  {
    title: "Eight weekly 1:1 sessions with me.",
    body: "Not group calls. Not a shared container. One to one, every week, focused entirely on you.",
  },
  {
    title: "A profile-matched toolkit.",
    body: "Regulation tools chosen for your specific nervous system profile, not a generic worksheet pack. You learn the ones your body actually responds to.",
  },
  {
    title: "Voxer and email support between sessions.",
    body: "You're not left alone for six days between calls. You'll have me to reach as things come up in real life, in the hours where the real work happens.",
  },
  {
    title: "A personalised integration plan.",
    body: "By the end, a clear map of what works for you, so the change goes with you into your real life instead of ending when the programme does.",
  },
] as const;

const CHANGES = [
  "Set goals and actually move toward them, without hitting the same wall",
  "Wake up without the low-level dread that had become normal",
  "Stop replaying conversations and decisions on a loop",
  "Feel your body as something working with you, not against you",
  "Be present with the people you love, not just physically there",
  "Know what you need, and feel safe enough to choose it",
] as const;

function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <span
      className={`mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] ${
        dark
          ? "border border-glow-sage/30 bg-glow-sage/10 text-[#D4D8C4]"
          : "border border-line-stone bg-white/60 text-[#6B7060]"
      }`}
    >
      <span
        className={`h-[5px] w-[5px] rounded-full ${
          dark ? "bg-glow-sage shadow-[0_0_10px_rgba(190,194,169,0.75)]" : "bg-glow-sage"
        }`}
        aria-hidden
      />
      {children}
    </span>
  );
}

export function CoachingPage() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="coaching-hero-font relative min-h-[clamp(560px,78vh,760px)] w-full overflow-hidden bg-deep-card">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0 md:hidden">
            <Image
              src="/images/coaching-hero-mobile.png"
              alt=""
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </div>
          <div className="absolute inset-0 hidden md:block">
            <Image
              src="/images/coaching-hero-desktop.png"
              alt=""
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-black/10" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/25 via-[#1F2925]/30 to-[#16201C]/72"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.12),transparent_48%)]"
          aria-hidden
        />
        <FloatingPetals />

        <div className="relative z-10 flex h-full flex-col px-5 sm:px-6 md:px-12 lg:px-16">
          <div className="flex-1 flex items-start justify-center pt-16 sm:pt-20 md:pt-24">
            <div className="max-w-3xl text-center">
              <span className="liquid-glass mb-5 inline-flex rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/85">
                ONE TO ONE · WORLDWIDE
              </span>
              <h1 className="text-3xl leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                The Bridge{" "}
                <span className="text-white/60">Programme</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-8 sm:text-base md:text-lg">
                Eight weeks, one to one, built entirely around your nervous system
                profile.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#FAF7EF] sm:text-base">
                Not a course. Not a plan to fall behind on. The most personal work I
                offer, for the woman who is done trying harder and ready to
                understand what her body has actually been doing.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
                <Link
                  href={SCREENING_START}
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-white/90 sm:px-6 sm:py-3"
                >
                  Discover my profile — free
                </Link>
                <Link
                  href={MARKETING_ROUTES.freeClass}
                  className="liquid-glass rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:px-6 sm:py-3"
                >
                  Watch the free class
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line-stone bg-cream px-6 py-[clamp(72px,9vw,96px)]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(35,40,36,0.06)_1px,transparent_1px)] [background-size:26px_26px] opacity-[0.25]"
          aria-hidden
        />
        <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div>
            <Eyebrow>IS THIS YOU</Eyebrow>
            <h2 className="font-serif text-[clamp(32px,6vw,46px)] font-normal leading-[1.08] text-ink">
              {WHO_THIS_IS_FOR_LEAD}
            </h2>
          </div>
          <div className="space-y-5">
            {WHO_THIS_IS_FOR.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`font-sans text-body-lg leading-[1.78] ${
                  index === WHO_THIS_IS_FOR.length - 1 ? "font-medium text-ink" : "text-soft-ink"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line-stone px-6 py-[clamp(72px,9vw,96px)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/background_section3_coaching-page.png"
            alt=""
            fill
            quality={90}
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>

        <div className="relative mx-auto max-w-[820px]">
          <Eyebrow>WHY THIS WORKS</Eyebrow>
          <div className="space-y-5 font-sans text-body-lg leading-[1.78] text-soft-ink">
            <p className="font-serif text-[clamp(28px,5vw,40px)] font-normal leading-[1.12] text-ink">
              Most support starts with a plan and hopes your body cooperates. We
              start with your body.
            </p>
            <p>
              Before week one, you complete The Bridge Map, so we&apos;re never
              guessing at what&apos;s going on. Every session after that is built
              around what your specific profile needs. Not what worked for someone
              else. What works for you. We build safety before we build pressure,
              because that&apos;s the only order in which change actually holds.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-deep-card px-6 py-[clamp(82px,10vw,112px)]">
        <div
          className="pointer-events-none absolute -left-[8%] -top-[16%] h-[560px] w-[560px] animate-bm-aurora-a rounded-full bg-[radial-gradient(circle,rgba(142,154,124,0.54),transparent_68%)] blur-[36px] motion-reduce:animate-none"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-[22%] -right-[12%] h-[620px] w-[620px] animate-bm-aurora-b rounded-full bg-[radial-gradient(circle,rgba(218,206,191,0.34),transparent_68%)] blur-[42px] motion-reduce:animate-none"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-deep-card/35" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(250,247,239,0.045)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(circle_at_50%_42%,#000,transparent_72%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-[760px]">
          <div className="relative overflow-hidden rounded-[30px] border border-cream/10 bg-deep-card/70 px-7 py-9 shadow-[0_50px_120px_-60px_rgba(0,0,0,0.75)] backdrop-blur-sm md:px-10 md:py-11">
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.08)_34%,transparent_62%)] opacity-60"
              aria-hidden
            />
            <div className="relative">
              <Eyebrow dark>THE PART NOBODY SAYS</Eyebrow>
              <div className="space-y-6">
                <p className="font-serif text-[clamp(34px,7vw,54px)] font-normal leading-[1.04] text-cream">
                  Most approaches keep you needing them.
                </p>
                <div className="space-y-5 font-sans text-body-lg leading-[1.85] text-[#D4D8C4]">
                  <p>
                    The expert stays at the center. You keep coming back, because the
                    plan lives with them, not in you. And quietly, you learn that you
                    can&apos;t do this without someone holding the map.
                  </p>
                  <p className="font-serif text-[30px] italic leading-tight text-cream">
                    I don&apos;t work that way.
                  </p>
                  <p>
                    My job isn&apos;t to become the person you depend on forever. It&apos;s to
                    teach your body what it never learned. How to catch the stress
                    earlier. How to come back down on its own. How to feel safe
                    without me in the room.
                  </p>
                  <p className="font-medium text-cream">
                    Eight weeks, and then you carry it yourself. That was always the
                    point. Not another expert to lean on. Your own system, finally
                    working for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line-stone bg-cream px-6 py-[clamp(72px,9vw,96px)]">
        <div className="mx-auto max-w-[1040px]">
          <div className="mb-10 max-w-[620px]">
            <Eyebrow>WHAT YOU GET</Eyebrow>
            <h2 className="font-serif text-[clamp(32px,6vw,44px)] font-normal leading-[1.1] text-ink">
              Everything in the programme, laid out plainly:
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            {INCLUDED.map(({ title, body }) => (
              <article
                key={title}
                className="rounded-[20px] border border-line-stone/70 bg-white/85 p-5 shadow-[0_18px_44px_-36px_rgba(35,40,36,0.22)]"
              >
                <h3 className="font-serif text-[23px] font-normal leading-tight text-ink">
                  {title}
                </h3>
                <p className="mt-3 font-sans text-[13px] leading-[1.65] text-soft-ink">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProgrammeStructure />

      <section className="relative overflow-hidden border-t border-line-stone bg-deep-card px-6 py-[clamp(82px,10vw,112px)]">
        <div
          className="pointer-events-none absolute -left-[10%] top-[8%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(142,154,124,0.42),transparent_68%)] blur-[40px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-[18%] -right-[8%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(218,206,191,0.28),transparent_68%)] blur-[44px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(250,247,239,0.04)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(circle_at_50%_40%,#000,transparent_75%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-[1040px]">
          <motion.div
            className="mx-auto mb-12 max-w-[720px] text-center md:mb-14"
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <Eyebrow dark>WHAT BECOMES POSSIBLE</Eyebrow>
            <h2 className="font-serif text-[clamp(32px,6vw,44px)] font-normal leading-[1.1] text-cream">
              This isn&apos;t about becoming a different person. It&apos;s about your own
              system finally working with you. By the end, you can:
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {CHANGES.map((change, index) => (
              <motion.article
                key={change}
                variants={fadeUp}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -4,
                        borderColor: "rgba(190, 194, 169, 0.45)",
                        transition: { duration: 0.24, ease: easeOut },
                      }
                }
                className="group relative overflow-hidden rounded-[22px] border border-cream/10 bg-deep-card/60 p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.65)] backdrop-blur-sm"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(190,194,169,0.22),transparent_68%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.06)_0%,transparent_42%)]"
                  aria-hidden
                />

                <div className="relative">
                  <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-glow-sage/35 bg-glow-sage/10 font-sans text-[11px] font-medium tracking-[0.08em] text-[#D4D8C4]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-sans text-[15px] leading-[1.72] text-[#D4D8C4]">
                    {change}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line-stone px-6 py-[clamp(72px,9vw,96px)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/background_section3_coaching-page.png"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-[980px] grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-[24px] border border-line-stone bg-white p-7">
            <Eyebrow>IS THIS RIGHT FOR YOU</Eyebrow>
            <div className="space-y-5 font-sans text-body-lg leading-[1.78] text-soft-ink">
              <p>This work goes deep, so it isn&apos;t for everyone right now, and that&apos;s okay.</p>
              <p>
                It&apos;s for you if you&apos;re carrying more than you let on, you&apos;re
                curious about what your body has been doing, and you&apos;re ready to
                stop looking for the next quick fix and do the real thing.
              </p>
              <p>
                It&apos;s not the right time if you&apos;re in acute crisis and need urgent
                support first, or you want someone to hand you a plan you can
                follow without looking at what&apos;s underneath. That&apos;s not this. And
                if you&apos;re in crisis,{" "}
                <Link
                  href={MARKETING_ROUTES.urgentSupport}
                  className="font-medium text-ink underline underline-offset-[3px]"
                >
                  there&apos;s help here
                </Link>{" "}
                that matters more than any programme.
              </p>
            </div>
          </div>
          <div className="rounded-[24px] border border-line-stone bg-warm-paper p-7">
            <Eyebrow>LIMITED PLACES</Eyebrow>
            <p className="font-serif text-[clamp(28px,5vw,38px)] font-normal leading-[1.12] text-ink">
              I work with a small number of women at a time.
            </p>
            <p className="mt-5 font-sans text-body-lg leading-[1.78] text-soft-ink">
              One to one, done properly, means places are limited. When they&apos;re
              full, they&apos;re full, and the next round is a waitlist. If you know
              this is the work you need, start now.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-[clamp(72px,9vw,104px)]">
        <div className="relative mx-auto max-w-[900px] overflow-hidden rounded-[28px] border border-line-stone px-6 py-[clamp(48px,7vw,72px)] text-center shadow-[0_32px_70px_-40px_rgba(35,40,36,0.3)]">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(250,247,239,0.94),rgba(246,240,230,0.78)_48%,rgba(218,206,191,0.55))]"
            aria-hidden
          />
          <div className="relative">
            <Eyebrow>THE FIRST STEP</Eyebrow>
            <h2 className="mx-auto max-w-[620px] font-serif text-[clamp(30px,6vw,42px)] font-normal leading-[1.12] text-ink">
              The programme opens after your Bridge Map and a Clarity Call, so by
              the time we begin, I already understand your profile and you already
              know this is the right fit. No cold start. No guessing.
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={SCREENING_START}
                className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-[14px] bg-btn-primary px-8 font-sans text-body-lg font-medium text-btn-text transition-all hover:-translate-y-0.5 hover:bg-btn-primary-hover"
              >
                Discover my profile — free
              </Link>
            </div>
            <p className="mt-4 font-sans text-[13px] text-sage">
              Not ready yet?{" "}
              <Link
                href={MARKETING_ROUTES.freeClass}
                className="underline underline-offset-[3px] hover:text-[#6B7060]"
              >
                Watch the free class
              </Link>{" "}
              first.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
