"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";
import { easeOut, fadeUp, staggerContainer } from "@/lib/marketing/motion";

const HERO_BODY = [
  "Caroline Jones is a registered nurse with an MSc in Psychology, currently training in psychotherapy and counselling. She also holds a first class honours qualification in software engineering, bringing an unusual combination of clinical insight, psychological understanding and technical fluency to her work.",
  "As the founder of The Bridge Hub, Caroline turns complex ideas about stress, trauma, burnout and the nervous system into practical tools people can understand and use.",
  "Her perspective has been shaped by both professional and personal experience. After spending years supporting patients and families through some of the hardest moments of their lives, Caroline found herself facing profound challenges of her own. This allows her to speak about stress and healing with honesty, depth and humanity, without simplifying what recovery truly requires.",
  "Caroline's talks do more than share information. They change how people understand stress in the body. She helps healthcare teams and organisations recognise the patterns beneath burnout and trauma, challenge the stigma surrounding them and identify practical changes that can create safer, healthier ways of working.",
] as const;

const STORY_PARAGRAPHS = [
  "Born in São Paulo to a home marked by violence and poverty, no one would have expected Caroline to rise beyond it. At just thirteen, she worked two jobs and travelled three hours a day just to reach a better school, because education was the only way out she could see. Through sheer determination, she became a registered nurse, then a published researcher, and left Brazil for Wales with one suitcase and nothing guaranteed.",
  "In Wales, studying psychology, she found the missing piece nursing had never given her: an understanding of how our experiences and emotions shape our behaviour, and the beliefs we carry about ourselves and the world. Then life in Ireland tested everything she'd learned, with losses and setbacks that would have stopped most people from building anything at all. What got her through wasn't the hardship itself. It was getting real help, and that difference is what turned her hardest years into something she could build on.",
  "So she asked a different question: how do I take everything I've learned and do something with it? A nurse studying software engineering in Galway was not the expected next step, but Caroline finished with honours, and used it to do something no one else could have: design and build a clinical screening tool from the ground up. The structure, the logic, the clinical thinking behind every question, all hers, drawing on validated instruments psychologists already use, to map nervous system patterns the way she wished someone could have mapped hers.",
  "With psychotherapy training now building directly on her psychology background, she's able to offer real, qualified help herself, not just point people toward it. It's the same instinct behind every talk she gives: healing isn't one moment of insight. It's built, deliberately, piece by piece, the same way she built everything else in her life. That's the honest take on healing she brings to a stage.",
] as const;

const KEYNOTE_BODY = [
  "Caroline Jones has spent years inside the systems meant to help people heal, and seen firsthand how often they fail.",
  "This keynote was built around one question: if healing actually worked the way we're told it does, why do so many capable people stay stuck?",
  "Caroline redefines healing as something that has to be built, not waited for. Drawing on nursing, a psychology master's, an honours degree in software engineering, and training in psychotherapy and counselling, she challenges the idea that understanding your story is enough, and reveals what most burnout and wellbeing programmes leave out entirely. She shows audiences what's missing when people know exactly what's wrong and still can't change it, and introduces her own approach to closing that gap. This keynote dares your team to stop managing symptoms and start understanding the pattern underneath them.",
] as const;

const KEYNOTE_OUTCOMES = [
  "Leave with a real understanding of the nervous system and trauma patterns, and how experiences from years ago still shape how we react today",
  "Recognise the specific pattern behind burnout, disconnection, and feeling stuck, so it stops feeling random or personal",
  "Learn practical ways to reconnect with themselves that they can start using right away",
] as const;

const TOPICS = [
  "What healing actually requires, and why insight alone isn't enough",
  "The nervous system and burnout: why capable people stay stuck",
  "Trauma and the body: how past experience shapes reactions years later",
  "The Creative Power of Falling Apart",
  "Motherhood and the Nervous System: Why Your Calm (or Lack of It) Isn't Just Yours",
  "Rebuilding a career, and a life, from the ground up",
] as const;

const TESTIMONIALS = [
  "An open-hearted, inspirational talk that I will carry with me the rest of my life. Thank you so much!!",
  "I found it personally very interesting and easy to follow. Made me take time to put my life and responsive patterns in perspective and made me aware of things I can do to help on a daily basis at work and life",
  "Forget everything you know about long-winded speeches. Prepare to connect, feel, engage, learn, and grow. Caroline tells her story in a way that connects to your own. Her experiences are like a mirror to help you see yourself inside.",
  "I've sat through a lot of wellbeing talks that felt like a box being ticked. This wasn't that. I found an immense value in seeing this one.",
] as const;

const KEYNOTE_TITLE =
  "I Rebuilt My Career From Nursing to Software Engineering to Therapy to Answer One Question: What Does Healing Actually Take?";

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

function EnquireButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href={MARKETING_ROUTES.speakingEnquiry}
      className={`inline-flex h-14 min-w-[220px] items-center justify-center rounded-[14px] bg-btn-primary px-8 font-sans text-body-lg font-medium text-btn-text transition-all hover:-translate-y-0.5 hover:bg-btn-primary-hover ${className}`}
    >
      Enquire about booking
    </Link>
  );
}

export function SpeakingPage() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="relative min-h-[clamp(520px,72vh,680px)] w-full overflow-hidden bg-deep-card">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/images/caroline-speaking-hero.jpg"
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-[62%_center] md:object-[58%_22%]"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#16201C]/96 via-[#1F2925]/78 to-[#1F2925]/32 md:from-[#16201C]/92 md:via-[#1F2925]/62 md:to-[#1F2925]/12"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#16201C]/88 via-[#16201C]/25 to-[#16201C]/42"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/20" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_42%,rgba(190,194,169,0.14),transparent_52%)]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[clamp(520px,72vh,680px)] max-w-[1080px] flex-col justify-end px-6 pb-[clamp(48px,8vw,72px)] pt-[clamp(72px,10vw,104px)] md:justify-center md:pb-[clamp(56px,7vw,80px)]">
          <div className="max-w-[640px]">
            <span className="liquid-glass mb-5 inline-flex rounded-full px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-white/85">
              Keynote Speaking
            </span>

            <h1 className="mb-2 max-w-[580px] font-serif text-[clamp(38px,6.5vw,60px)] font-normal leading-[1.04] tracking-[-0.02em] text-[#FAF7EF]">
              Keynote Speaker on Burnout, Stress &amp; the Nervous System
            </h1>
            <p className="max-w-[580px] font-serif text-[clamp(22px,3.5vw,32px)] font-normal italic leading-[1.2] text-[#C8D4B8]">
              An inspiring, honest take on healing.
            </p>

            <div className="liquid-glass mt-5 max-w-[580px] rounded-[18px] px-5 py-4 md:px-6 md:py-5">
              <p className="font-serif text-[clamp(18px,2.8vw,26px)] font-normal leading-[1.32] text-[#E8EADF]">
                Book Caroline for Real Change in How Your Organisation Talks About
                Stress, Burnout and Trauma.
              </p>
            </div>

            <span className="mt-6 inline-flex rounded-full border border-glow-sage/35 bg-glow-sage/15 px-4 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-[#D4D8C4]">
              Healthcare Keynote Specialist in Ireland
            </span>

            <div className="mt-8">
              <EnquireButton className="shadow-[0_16px_30px_-14px_rgba(0,0,0,0.55)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line-stone bg-cream px-6 py-[clamp(56px,7vw,80px)]">
        <div className="mx-auto max-w-[820px] space-y-5 font-sans text-body-lg leading-[1.78] text-soft-ink">
          {HERO_BODY.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 40)}
              className={index === HERO_BODY.length - 1 ? "font-medium text-ink" : undefined}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line-stone bg-deep-card px-6 py-[clamp(82px,10vw,112px)]">
        <div
          className="pointer-events-none absolute -left-[8%] -top-[16%] h-[560px] w-[560px] animate-bm-aurora-a rounded-full bg-[radial-gradient(circle,rgba(142,154,124,0.54),transparent_68%)] blur-[36px] motion-reduce:animate-none"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-[22%] -right-[12%] h-[620px] w-[620px] animate-bm-aurora-b rounded-full bg-[radial-gradient(circle,rgba(218,206,191,0.34),transparent_68%)] blur-[42px] motion-reduce:animate-none"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-deep-card/35" aria-hidden />

        <div className="relative mx-auto max-w-[860px]">
          <div className="overflow-hidden rounded-[30px] border border-cream/10 bg-deep-card/70 px-7 py-9 shadow-[0_50px_120px_-60px_rgba(0,0,0,0.75)] backdrop-blur-sm md:px-10 md:py-11">
            <Eyebrow dark>Keynote</Eyebrow>
            <h2 className="font-serif text-[clamp(26px,4.5vw,36px)] font-normal leading-[1.14] text-cream">
              {KEYNOTE_TITLE}
            </h2>
            <div className="mt-6 space-y-5 font-sans text-body-lg leading-[1.82] text-[#D4D8C4]">
              {KEYNOTE_BODY.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 rounded-[20px] border border-cream/10 bg-cream/5 p-6">
              <p className="mb-4 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-[#D4D8C4]">
                Attendees will
              </p>
              <ul className="m-0 flex list-none flex-col gap-4 p-0">
                {KEYNOTE_OUTCOMES.map((outcome) => (
                  <li key={outcome.slice(0, 40)} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-glow-sage/40 bg-glow-sage/15"
                      aria-hidden
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-glow-sage" />
                    </span>
                    <span className="font-sans text-[15px] leading-[1.68] text-[#E8EADF]">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line-stone bg-cream px-6 py-[clamp(72px,9vw,96px)]">
        <div className="mx-auto max-w-[900px]">
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <Eyebrow>Themes We Can Explore</Eyebrow>
            <h2 className="mb-10 max-w-[640px] font-serif text-[clamp(30px,5vw,40px)] font-normal leading-[1.12] text-ink">
              Topics Caroline can shape around your audience and event.
            </h2>
          </motion.div>

          <motion.ul
            className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2"
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {TOPICS.map((topic, index) => (
              <motion.li
                key={topic}
                variants={fadeUp}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -3,
                        transition: { duration: 0.22, ease: easeOut },
                      }
                }
                className="rounded-[18px] border border-line-stone/80 bg-white/90 px-5 py-5 shadow-[0_16px_40px_-34px_rgba(35,40,36,0.2)]"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E7EAD7] to-[#9EAA84] font-serif text-[14px] text-deep-card">
                    {index + 1}
                  </span>
                  <p className="font-sans text-[15px] leading-[1.62] text-soft-ink">{topic}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line-stone px-6 py-[clamp(72px,9vw,96px)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/testimonials-bg.png"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-center opacity-[0.28]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-paper/90 via-warm-paper/75 to-warm-paper/92" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1040px]">
          <motion.div
            className="mb-10 text-center"
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="font-serif text-[clamp(30px,5vw,40px)] font-normal leading-[1.12] text-ink">
              What audiences say after Caroline&apos;s talks.
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {TESTIMONIALS.map((quote) => (
              <motion.blockquote
                key={quote.slice(0, 48)}
                variants={fadeUp}
                className="rounded-[22px] border border-line-stone/80 bg-white/90 p-7 shadow-[0_20px_48px_-36px_rgba(35,40,36,0.22)]"
              >
                <p className="font-serif text-[clamp(20px,3vw,24px)] font-normal italic leading-[1.45] text-ink">
                  &ldquo;{quote}&rdquo;
                </p>
              </motion.blockquote>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-t border-line-stone bg-warm-paper px-6 py-[clamp(72px,9vw,96px)]">
        <div className="mx-auto max-w-[820px]">
          <Eyebrow>More About Caroline Jones</Eyebrow>
          <div className="space-y-5 font-sans text-body-lg leading-[1.78] text-soft-ink">
            {STORY_PARAGRAPHS.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 40)}
                className={index === STORY_PARAGRAPHS.length - 1 ? "font-medium text-ink" : undefined}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line-stone bg-cream px-6 py-[clamp(72px,9vw,96px)]">
        <div className="mx-auto max-w-[760px] text-center">
          <Eyebrow>For Organisers</Eyebrow>
          <p className="font-sans text-body-lg leading-[1.78] text-soft-ink">
            Caroline Jones is a registered nurse, psychology master&apos;s, and
            psychotherapy trainee, delivering keynotes, talks, and workshops across
            corporate, healthcare, and education sectors in Ireland. She works with
            organisations to build a genuine understanding of stress, burnout, and
            nervous system regulation, from a single keynote to a full workshop day.
            Every session is shaped around the audience it&apos;s for.
          </p>
          <div className="mt-8">
            <EnquireButton />
          </div>
        </div>
      </section>

      <section className="px-6 pb-[clamp(72px,9vw,104px)]">
        <div className="relative mx-auto max-w-[900px] overflow-hidden rounded-[28px] border border-line-stone px-6 py-[clamp(48px,7vw,72px)] text-center shadow-[0_32px_70px_-40px_rgba(35,40,36,0.3)]">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(250,247,239,0.94),rgba(246,240,230,0.78)_48%,rgba(218,206,191,0.55))]"
            aria-hidden
          />
          <div className="relative">
            <h2 className="mx-auto max-w-[560px] font-serif text-[clamp(28px,5vw,38px)] font-normal leading-[1.14] text-ink">
              Not sure this is the right fit for your event? Get in touch and
              we&apos;ll talk it through.
            </h2>
            <div className="mt-8 flex justify-center">
              <EnquireButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
