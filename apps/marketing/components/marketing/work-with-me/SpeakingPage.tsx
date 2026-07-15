"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";
import { easeOut, fadeUp, staggerContainer } from "@/lib/marketing/motion";

const HERO_BODY = [
  "Caroline Jones is a registered nurse, master's in psychology with a certificate in software engineering and psychotherapy trainee, bringing a rare mix of clinical depth, technical skills and lived experience to every talk she gives. As the founder of The Bridge Hub, she has built her career on turning what she has lived through into something practical other people can actually use.",
  "Her story, holding others through their worst days as a nurse, then living through her own, connects with people on a deep level. Organisations looking for a genuinely honest take on stress, burnout, and trauma are drawn to her message because it doesn't oversimplify what healing actually takes.",
  "Caroline's talks don't just inform, they change how a room understands stress in the body. She helps healthcare teams and organisations see trauma, burnout, and nervous system regulation in a new light, breaking down the usual stigma and giving people something to actually do differently.",
] as const;

const STORY_PARAGRAPHS = [
  "Born in São Paulo to a home marked by violence and poverty, no one would have expected Caroline to rise beyond it. At just thirteen, she worked two jobs and travelled three hours a day just to reach a better school, because education was the only way out she could see. Through sheer determination, she became a registered nurse, then a published researcher, and left Brazil for Wales with one suitcase and nothing guaranteed.",
  "In Wales, studying psychology, she found the missing piece nursing had never given her: an understanding of how our experiences and emotions shape our behaviour, and the beliefs we carry about ourselves and the world. Then life in Ireland tested everything she'd learned, with losses and setbacks that would have stopped most people from building anything at all. What got her through wasn't the hardship itself. It was getting real help, and that difference is what turned her hardest years into something she could build on.",
  "So she asked a different question: how do I take everything I've learned and do something with it? A nurse studying software engineering in Galway was not the expected next step, but Caroline finished with honours, and used it to do something no one else could have: design and build a clinical screening tool from the ground up. The structure, the logic, the clinical thinking behind every question, all hers, drawing on validated instruments psychologists already use, to map nervous system patterns the way she wished someone could have mapped hers.",
  "With psychotherapy training now building directly on her psychology background, she's able to offer real, qualified help herself, not just point people toward it. It's the same instinct behind every talk she gives: healing isn't one moment of insight. It's built, deliberately, piece by piece, the same way she built everything else in her life. That's the honest take on healing she brings to a stage.",
] as const;

const FORMATS = [
  {
    duration: "45, 90 minutes",
    title: "Keynote Presentations",
    description:
      "High-impact, story-driven talks for conferences, corporate wellbeing events, and organisational retreats. Clinical depth and lived experience, delivered in a way your audience hasn't heard before.",
  },
  {
    duration: "60, 90 minutes",
    title: "Healthcare Team Presentations",
    description:
      "Evidence-based sessions for physicians, nurses, healthcare teams, and clinical staff on trauma informed practices, burnout, nervous system regulation, and the hidden cost of caregiving work.",
  },
  {
    duration: "Half-day / Full-day",
    title: "Workshops & Interactive Sessions",
    description:
      "Deeper dives with space for reflection and practical application. Suited to teams and cohorts who want lasting change, not just a talk.",
  },
  {
    duration: "Varies",
    title: "Podcasts, Panels & Community Talks",
    description:
      "Available as a guest, panellist, or speaker for community and education events on burnout, trauma, and nervous system health.",
  },
] as const;

const TOPICS = [
  {
    title: "What healing actually requires, and why insight alone isn't enough",
    audiences: "Corporate wellbeing, healthcare teams, community talks",
  },
  {
    title: "The nervous system and burnout: why capable people stay stuck",
    audiences: "Corporate leadership, healthcare organisations",
  },
  {
    title: "Trauma and the body: how past experience shapes reactions years later",
    audiences: "Healthcare teams, education settings",
  },
  {
    title: "The Creative Power of Falling Apart",
    audiences: "Community events, wellbeing retreats",
  },
  {
    title: "Motherhood and the Nervous System: Why Your Calm (or Lack of It) Isn't Just Yours",
    audiences: "Parenting and family events, community and education settings",
  },
  {
    title: "Rebuilding a career, and a life, from the ground up",
    audiences: "Career development, education, corporate",
  },
  {
    title: "Trauma-informed practice: what it actually takes to change how care is delivered",
    audiences: "Healthcare professionals, clinical teams, hospital leadership",
  },
  {
    title: "The psychological cost of caregiving: what healthcare work asks of the nervous system",
    audiences: "Healthcare professionals, hospital leadership, clinical teams",
  },
  {
    title: "When your best people are running on survival fuel: spotting burnout before it costs you your best people",
    audiences: "Corporate HR, leadership retreats, organisational wellbeing",
  },
  {
    title: "Building the tool I wish had existed: what it takes to turn lived experience into something people can actually use",
    audiences: "Corporate innovation talks, women's leadership events, community talks",
  },
] as const;

const TESTIMONIALS = [
  "An open-hearted, inspirational talk that I will carry with me the rest of my life. Thank you so much!!",
  "I found it personally very interesting and easy to follow. Made me take time to put my life and responsive patterns in perspective and made me aware of things I can do to help on a daily basis at work and life",
  "Forget everything you know about long-winded speeches. Prepare to connect, feel, engage, learn, and grow. Caroline tells her story in a way that connects to your own. Her experiences are like a mirror to help you see yourself inside.",
  "I've sat through a lot of wellbeing talks that felt like a box being ticked. This wasn't that. I found an immense value in seeing this one.",
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
          {HERO_BODY.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
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
          <Eyebrow dark>How I Work With Your Organisation</Eyebrow>
          <h2 className="max-w-[640px] font-serif text-[clamp(30px,5vw,40px)] font-normal leading-[1.12] text-cream">
            Formats &amp; Audiences
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FORMATS.map(({ duration, title, description }) => (
              <div
                key={title}
                className="overflow-hidden rounded-[22px] border border-cream/10 bg-deep-card/70 p-6 shadow-[0_32px_80px_-48px_rgba(0,0,0,0.75)] backdrop-blur-sm"
              >
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-glow-sage">
                  {duration}
                </p>
                <h3 className="mt-3 font-serif text-[clamp(22px,3vw,26px)] font-normal leading-[1.18] text-cream">
                  {title}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-[1.68] text-[#D4D8C4]">
                  {description}
                </p>
              </div>
            ))}
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
            <Eyebrow>Signature Topics</Eyebrow>
            <h2 className="max-w-[640px] font-serif text-[clamp(30px,5vw,40px)] font-normal leading-[1.12] text-ink">
              What I Speak About
            </h2>
            <p className="mb-10 mt-5 max-w-[640px] font-serif text-[clamp(18px,2.5vw,22px)] font-normal italic leading-[1.45] text-soft-ink">
              Every talk is shaped around your audience and what matters to them.
              These are the themes I come back to most, the ones that leave a room
              quiet, then stay with people long after they&apos;ve gone home.
            </p>
          </motion.div>

          <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
            {TOPICS.map(({ title, audiences }, index) => (
              <motion.li
                key={`topic-${index}`}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: easeOut, delay: index * 0.06 }}
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
                  <div>
                    <p className="font-sans text-[15px] leading-[1.62] text-soft-ink">
                      {title}
                    </p>
                    <p className="mt-2 font-sans text-[13px] leading-[1.55] text-sage">
                      {audiences}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
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
                {index === 2 ? (
                  <>
                    So she asked a different question: how do I take everything
                    I&apos;ve learned and do something with it? A nurse studying
                    software engineering in Galway was not the expected next step,
                    but Caroline finished with honours, and used it to do something
                    no one else could have: design and build a{" "}
                    <Link
                      href={MARKETING_ROUTES.bridgeMap}
                      className="font-medium text-ink underline underline-offset-[3px] transition-colors hover:text-soft-ink"
                    >
                      clinical screening tool
                    </Link>{" "}
                    from the ground up. The structure, the logic, the clinical
                    thinking behind every question, all hers, drawing on validated
                    instruments psychologists already use, to map nervous system
                    patterns the way she wished someone could have mapped hers.
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>
          <p className="mt-6 font-sans text-[15px]">
            <Link
              href={MARKETING_ROUTES.about}
              className="font-medium text-ink underline underline-offset-[3px] transition-colors hover:text-soft-ink"
            >
              Read the full story →
            </Link>
          </p>
        </div>
      </section>

      <section className="px-6 pb-[clamp(72px,9vw,104px)]">
        <div className="relative mx-auto max-w-[900px] overflow-hidden rounded-[28px] border border-line-stone px-6 py-[clamp(48px,7vw,72px)] text-center shadow-[0_32px_70px_-40px_rgba(35,40,36,0.3)]">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(250,247,239,0.94),rgba(246,240,230,0.78)_48%,rgba(218,206,191,0.55))]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-[720px]">
            <div className="flex justify-center">
              <Eyebrow>For Organisers</Eyebrow>
            </div>
            <p className="font-sans text-body-lg leading-[1.78] text-soft-ink">
              Caroline Jones is a registered nurse, psychology master&apos;s, and
              psychotherapy trainee, delivering keynotes, talks, and workshops across
              corporate, healthcare, and education sectors in Ireland. She works with
              organisations to build a genuine understanding of stress, burnout,
              trauma informed practices, and nervous system regulation, from a single keynote to a full workshop day.
              Every session is shaped around the audience it&apos;s for.
            </p>
            <p className="mt-5 font-sans text-[13px] italic leading-[1.6] text-sage">
              Speaking fees vary by event type, audience size, and format.
            </p>
            <div className="mt-8 flex justify-center">
              <EnquireButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
