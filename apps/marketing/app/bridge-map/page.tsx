import Image from "next/image";

import { MarketingPrimaryCta } from "@/components/marketing/Nav";
import { BridgeMapFounder } from "@/components/marketing/bridge-map/BridgeMapFounder";
import { BridgeMapHero } from "@/components/marketing/bridge-map/BridgeMapHero";
import { Disclaimer } from "@/components/ui/Disclaimer";

const CREDIBILITY = [
  "Built on validated clinical instruments used by psychologists worldwide",
  "Designed by a qualified nurse and psychological support practitioner",
  "Results shown immediately on screen",
  "Psychoeducational only — not a diagnosis or clinical assessment",
] as const;

const THIS_IS_FOR_YOU = [
  "Feel tense or reactive, and then exhausted by your own reaction",
  "Lie awake even when you are genuinely tired",
  "Finally sit down and cannot settle — so you reach for your phone until you go numb",
  "Have tried strategies, programmes, and approaches that made sense on paper but did not quite shift the underlying pattern",
  "Feel somewhere between constantly overloaded and completely flat — and neither makes sense to you",
  "Know something is happening in your body but cannot find the words for it",
  "Want something grounded in clinical tools, not general wellness advice",
] as const;

const DIFFERENT = [
  {
    title: "It uses validated clinical instruments.",
    body: "The Bridge Map draws on five psychological tools used by researchers and clinicians worldwide. Your responses are scored using published methodology. This is not a personality quiz or a wellness checklist.",
  },
  {
    title: "It puts words to what you already know.",
    body: "The questions are structured to prompt you to think about yourself in a specific, organised way. By the time you finish, you will not have learned something entirely new. You will have found language for something you have been carrying for a long time. That is often what shifts things.",
  },
  {
    title: "It does not leave you with a result and nothing else.",
    body: "Your summary is on screen immediately. Your full deep dive report is sent to you by email when you book your Clarity Call. The call is where you understand what it means — a real conversation with Caroline about your patterns, your daily life, and what working with them could look like.",
  },
  {
    title: "It covers five areas at once.",
    body: "Most tools look at one thing — stress, or mood, or trauma. The Bridge Map looks across all five areas simultaneously, which means the picture you get is not just a snapshot of one part of your experience. It is a full view of how your system is functioning right now.",
  },
] as const;

const EXPECT = [
  {
    title: "You finish the screening.",
    body: "15 minutes. Five sections. Plain language throughout. You can pause and return if you need to.",
  },
  {
    title: "Your summary results appear immediately on screen.",
    body: "You will see an overview of your patterns across all five areas — named, framed, readable. No waiting. No email required.",
  },
  {
    title: "You book your free Clarity Call.",
    body: "When you are ready, you book your Clarity Call. Your full deep dive report is sent to you by email at the point of booking.",
  },
  {
    title: "You have the call.",
    body: "This is where the report becomes a real conversation. What your patterns mean for your daily life, your goals, and what working with them could look like. You leave with a clear sense of what kind of support could actually help you.",
  },
] as const;

const FAQS = [
  {
    q: "Is this a diagnosis?",
    a: "No. The Bridge Map is psychoeducational. It is not a clinical assessment, a diagnosis, or a substitute for therapy or individual professional care.",
  },
  {
    q: "Is this the same as therapy?",
    a: "No. This is a structured screening tool. It is not therapy, treatment, or clinical care. If therapy is what you need, Caroline will tell you honestly on the Clarity Call.",
  },
  {
    q: "How long does it take?",
    a: "15 minutes on average. Some women take a little longer, particularly if connecting to body-based experiences feels unfamiliar. That is completely normal.",
  },
  {
    q: "What if I find some of the questions difficult?",
    a: "Some sections touch on stress, difficult experiences, and how your body responds to them. You are never required to answer anything. Every section has an option to skip. If anything feels like too much, you can stop at any point — your progress is saved.",
  },
  {
    q: "Do I have to book the Clarity Call?",
    a: "No. The summary results are yours immediately, with no obligation. The Clarity Call is there when you are ready. There is no pressure and no time limit.",
  },
  {
    q: "Is my information private?",
    a: "Yes. Your responses are stored securely and seen only by you and Caroline. Your data is held in compliance with GDPR. You can request deletion at any time.",
  },
  {
    q: "What if I am not sure I am ready for a call?",
    a: "You do not have to be ready. Take the screening first. See what comes up. The call is a next step, not a requirement.",
  },
] as const;

export default function BridgeMapPage() {
  return (
    <>
      <BridgeMapHero />

      {/* CREDIBILITY STRIP */}
      <section className="border-t border-line-stone bg-cream px-6 py-10">
        <div className="mx-auto max-w-[960px]">
          <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
            {CREDIBILITY.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-transparent px-2 py-2"
              >
                <span
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-glow-sage/15 text-[12px] text-[#6B7060]"
                  aria-hidden
                >
                  ✓
                </span>
                <p className="font-sans text-[12px] leading-[1.55] text-soft-ink">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU WILL RECEIVE */}
      <section className="border-t border-line-stone bg-warm-paper px-6 py-[clamp(72px,9vw,104px)]">
        <div className="mx-auto max-w-[980px]">
          <div className="mx-auto max-w-[680px] text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-line-stone bg-white/55 px-4 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7060]">
              <span
                className="h-[5px] w-[5px] rounded-full bg-glow-sage"
                aria-hidden
              />
              What you get
            </span>
            <h2 className="font-serif text-[clamp(32px,7vw,44px)] leading-[1.1] text-ink">
              What happens when you complete The Bridge Map
            </h2>
            <p className="mt-5 font-sans text-body-lg text-soft-ink">
              You do not get a score and a generic paragraph. You get a picture
              of yourself — specific, structured, and in plain language.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div
              className="relative overflow-hidden rounded-[22px] border border-line-stone bg-cream p-7 shadow-[0_26px_60px_-40px_rgba(35,40,36,0.35)]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(250,247,239,0.85), rgba(250,247,239,0.65))",
              }}
            >
              <p className="mb-3 font-serif text-[22px] leading-[1.18] text-ink">
                Your summary results, immediately on screen
              </p>
              <p className="font-sans text-sm leading-[1.7] text-soft-ink">
                As soon as you finish, you see an overview of what your
                responses show across five areas: your stress load, your mood,
                your body awareness, what you have been carrying, and how you
                tend to respond when life gets hard. Not a number. A map of
                patterns, named and readable.
              </p>
            </div>

            <div
              className="relative overflow-hidden rounded-[22px] border border-line-stone bg-cream p-7 shadow-[0_26px_60px_-40px_rgba(35,40,36,0.35)]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(250,247,239,0.85), rgba(250,247,239,0.65))",
              }}
            >
              <p className="mb-3 font-serif text-[22px] leading-[1.18] text-ink">
                Your full deep dive report, sent to you by email
              </p>
              <p className="font-sans text-sm leading-[1.7] text-soft-ink">
                When you book your Clarity Call, your full report lands in your
                inbox. A screening gives you a picture. The Clarity Call gives it
                meaning. This is where your patterns become a real conversation
                about your daily life, your goals, and what working with them
                could look like.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <MarketingPrimaryCta>Discover my profile — free</MarketingPrimaryCta>
          </div>
        </div>
      </section>

      {/* EMOTIONAL ANCHOR */}
      <section className="relative overflow-hidden border-t border-line-stone bg-[#1F2925] px-6 py-[clamp(88px,10vw,120px)] text-center text-cream">
        <div
          className="pointer-events-none absolute -left-[18%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(142,154,124,0.22), rgba(142,154,124,0) 68%)",
            filter: "blur(40px)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-[18%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(218,206,191,0.16), rgba(218,206,191,0) 68%)",
            filter: "blur(40px)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-[760px]">
          <p className="mb-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-cream/55">
            You have been here before
          </p>
          <h2 className="mx-auto max-w-[640px] font-serif text-[clamp(34px,7vw,52px)] leading-[1.1] text-cream">
            It starts at 8am. Your jaw already tight.
          </h2>
          <div
            className="mx-auto mt-8 h-px w-12 bg-cream/25"
            aria-hidden
          />
          <div className="mx-auto mt-8 max-w-[620px] space-y-6 font-sans text-[clamp(15px,2vw,17px)] leading-[1.75] text-cream/75">
            <p>By midnight you are lying awake trying to work out why.</p>
            <p>
              The more you chase the why, the less anything changes. All that
              analysis may have been pulling you away from what works.
            </p>
            <p>
              Discovering your nervous system profile is where you stop chasing
              the why and start learning to catch the stress in your body
              earlier. So that when your jaw is tight at 8am, you have something
              to reach for. Not just another midnight of trying to figure it
              out.
            </p>
          </div>
        </div>
      </section>

      {/* THIS IS FOR YOU IF */}
      <section className="relative overflow-hidden border-t border-line-stone bg-cream px-6 py-[clamp(72px,9vw,104px)]">
        <div
          className="pointer-events-none absolute -left-[14%] top-[18%] h-[520px] w-[520px] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(190,194,169,0.26), rgba(190,194,169,0) 68%)",
            filter: "blur(46px)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-[16%] bottom-[6%] h-[560px] w-[560px] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(218,206,191,0.18), rgba(218,206,191,0) 68%)",
            filter: "blur(52px)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(rgba(35,40,36,0.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "linear-gradient(180deg, #000 0%, transparent 76%)",
            WebkitMaskImage: "linear-gradient(180deg, #000 0%, transparent 76%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-[1040px]">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,420px)_minmax(0,1fr)] md:gap-10">
            <div className="text-left">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-line-stone bg-white/55 px-4 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7060]">
                <span
                  className="h-[5px] w-[5px] rounded-full bg-glow-sage"
                  aria-hidden
                />
                This is for you
              </span>
              <h2 className="font-serif text-[clamp(32px,7vw,44px)] leading-[1.1] text-ink">
                The Bridge Map may be useful if you...
              </h2>
            </div>

            <p className="max-w-[720px] font-sans text-body-lg leading-[1.7] text-soft-ink md:pt-[42px]">
              If any of this sounds familiar, understanding your own nervous
              system pattern is likely to be a more useful starting point than
              trying harder with approaches that were never matched to how your
              body actually works.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {THIS_IS_FOR_YOU.map((item) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-[22px] border border-line-stone bg-white/55 px-6 py-5 shadow-[0_18px_44px_-40px_rgba(35,40,36,0.35)] transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_26px_56px_-40px_rgba(35,40,36,0.45)]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(250,247,239,0.82), rgba(250,247,239,0.62))",
                }}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(190,194,169,0.35), rgba(190,194,169,0) 70%)",
                    filter: "blur(18px)",
                  }}
                  aria-hidden
                />

                <div className="relative flex items-start gap-4">
                  <span
                    className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-glow-sage/35 bg-gradient-to-br from-[#E7EAD7] to-glow-sage text-[14px] text-deep-card shadow-[0_10px_22px_-14px_rgba(142,154,124,0.9)]"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <p className="font-sans text-[15px] leading-[1.7] text-soft-ink">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <MarketingPrimaryCta>Discover my profile — free</MarketingPrimaryCta>
          </div>
        </div>
      </section>

      {/* WHY WHAT YOU TRIED MAY NOT HAVE HELPED */}
      <section className="border-t border-line-stone bg-warm-paper px-6 py-[clamp(72px,9vw,104px)]">
        <div className="mx-auto max-w-[960px]">
          <div className="mx-auto max-w-[680px] text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-line-stone bg-white/55 px-4 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7060]">
              <span
                className="h-[5px] w-[5px] rounded-full bg-glow-sage"
                aria-hidden
              />
              Why nothing has shifted
            </span>
            <h2 className="font-serif text-[clamp(32px,7vw,44px)] leading-[1.1] text-ink">
              The strategies were not wrong. They were just built for someone
              else.
            </h2>
          </div>

          <div className="mx-auto mt-7 max-w-[820px] space-y-5 font-sans text-body-lg text-soft-ink">
            <p>
              Generic advice does not account for how your specific body
              responds to stress.
            </p>
            <p>
              Some women run in a persistent state of activation — tense,
              scanning, unable to switch off even when the day is done. Others
              move into shutdown — flat, numb, going through the motions. Many
              cycle between both. If you do not know your own pattern, you end
              up trying things designed for a different nervous system entirely.
            </p>
            <p>That is not a failure of effort. It is a mismatch of information.</p>
            <p>
              The Bridge Map closes that gap. It gives you a structured, clinical
              picture of your own patterns — so that the work you do from here is
              matched to how you actually function, not how you think you should.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT MAKES THE BRIDGE MAP DIFFERENT */}
      <section className="border-t border-line-stone bg-cream px-6 py-[clamp(72px,9vw,104px)]">
        <div className="mx-auto max-w-[980px]">
          <div className="mx-auto max-w-[680px] text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-line-stone bg-white/55 px-4 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7060]">
              <span
                className="h-[5px] w-[5px] rounded-full bg-glow-sage"
                aria-hidden
              />
              Not a quiz
            </span>
            <h2 className="font-serif text-[clamp(32px,7vw,44px)] leading-[1.1] text-ink">
              What makes The Bridge Map different from everything else you have
              tried.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {DIFFERENT.map((item) => (
              <div
                key={item.title}
                className="rounded-[22px] border border-line-stone bg-warm-paper px-7 py-7 shadow-[0_22px_50px_-40px_rgba(35,40,36,0.35)]"
              >
                <p className="mb-3 font-serif text-[20px] leading-[1.22] text-ink">
                  {item.title}
                </p>
                <p className="font-sans text-sm leading-[1.7] text-soft-ink">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BridgeMapFounder />

      {/* WHAT TO EXPECT */}
      <section className="relative overflow-hidden border-t border-line-stone bg-[#1F2925] px-6 py-[clamp(72px,9vw,104px)] text-cream">
        <div
          className="pointer-events-none absolute -left-[14%] top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(142,154,124,0.16), rgba(142,154,124,0) 68%)",
            filter: "blur(40px)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-[14%] top-1/3 h-[420px] w-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(218,206,191,0.1), rgba(218,206,191,0) 68%)",
            filter: "blur(40px)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-[960px]">
          <div className="mx-auto max-w-[680px] text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-glow-sage/30 bg-glow-sage/10 px-4 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#C7CBB0]">
              <span
                className="h-[5px] w-[5px] rounded-full bg-glow-sage"
                aria-hidden
              />
              What happens next
            </span>
            <h2 className="font-serif text-[clamp(32px,7vw,44px)] leading-[1.1] text-cream">
              Here is exactly what happens when you complete The Bridge Map.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4">
            {EXPECT.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col items-center gap-3 rounded-[22px] border border-white/10 bg-white/[0.04] px-7 py-6 text-center backdrop-blur-[2px] md:flex-row md:items-center md:gap-6 md:text-left"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E7EAD7] to-[#9EAA84] font-serif text-[21px] text-deep-card shadow-[0_8px_20px_-8px_rgba(142,154,124,0.8),0_0_0_4px_#1F2925]">
                  {index + 1}
                </span>
                <div>
                  <p className="mb-1 font-serif text-[20px] leading-[1.25] text-cream">
                    {step.title}
                  </p>
                  <p className="font-sans text-sm leading-[1.7] text-cream/70">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line-stone bg-warm-paper px-6 py-[clamp(72px,9vw,104px)]">
        <div className="mx-auto max-w-[960px]">
          <div className="mx-auto max-w-[680px] text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-line-stone bg-white/55 px-4 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7060]">
              <span
                className="h-[5px] w-[5px] rounded-full bg-glow-sage"
                aria-hidden
              />
              Common questions
            </span>
            <h2 className="font-serif text-[clamp(32px,7vw,44px)] leading-[1.1] text-ink">
              What most women want to know before they start.
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-[760px] space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-[18px] border border-line-stone bg-cream px-6 py-5 shadow-[0_18px_40px_-34px_rgba(35,40,36,0.35)]"
              >
                <summary className="cursor-pointer list-none font-sans text-sm font-semibold text-ink">
                  <span className="flex items-start justify-between gap-6">
                    <span>{item.q}</span>
                    <span
                      className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-stone bg-white text-soft-ink transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <div className="mt-4 font-sans text-sm leading-[1.7] text-soft-ink">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-line-stone px-6 py-[clamp(72px,9vw,104px)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/bridge-map-final-cta-bg.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-deep-card/78" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-card/92 via-[#1F2925]/72 to-deep-card/94" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 42%, rgba(22,32,28,0.55), rgba(22,32,28,0.88) 72%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[880px] text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-glow-sage/35 bg-deep-card/55 px-4 py-[7px] font-sans text-[11px] font-medium uppercase tracking-[0.13em] text-[#D4D8C4] backdrop-blur-sm">
            <span
              className="h-1.5 w-1.5 rounded-full bg-glow-sage shadow-[0_0_10px_rgba(190,194,169,0.9)]"
              aria-hidden
            />
            Your nervous system already has a pattern
          </span>
          <h2 className="mx-auto mb-5 max-w-[720px] font-serif text-[clamp(36px,9vw,52px)] font-normal leading-[1.08] text-cream drop-shadow-[0_2px_18px_rgba(22,32,28,0.45)]">
            Find out what it is.
          </h2>
          <div className="mx-auto max-w-[760px] space-y-5 font-sans text-body-lg text-cream/90 drop-shadow-[0_1px_12px_rgba(22,32,28,0.4)]">
            <p>
              The Bridge Map takes 15 minutes. Your summary results are on
              screen immediately. Your full deep dive report is sent by email
              when you book your Clarity Call — and the call is where it all
              becomes a real conversation.
            </p>
            <p>You already know something is happening. This gives it a name.</p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <MarketingPrimaryCta>Discover my profile — free</MarketingPrimaryCta>
            <p className="font-sans text-[12px] text-cream/70">
              Free. 15 minutes. Results immediately on screen.
            </p>
            <Disclaimer className="!text-cream/60" />
          </div>
        </div>
      </section>
    </>
  );
}
