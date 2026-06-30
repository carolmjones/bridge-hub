"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { easeOut } from "@/lib/marketing/motion";

const AUTOPLAY_MS = 6500;

const TESTIMONIALS = [
  {
    quote:
      "I had been operating on survival mode for most of my life and had no idea. I understood my patterns intellectually but could not shift them. What changed everything was finally understanding what my nervous system had been doing — and that it was not a flaw. It was protection. For the first time I feel like I am actually moving forward.",
    name: "Sarah, 34",
  },
  {
    quote:
      "I had tried therapy, coaching, every self help book you can think of. Nothing stuck. Caroline helped me understand that I was not broken — my body just needed something different. The Bridge Map was the first time I saw my own patterns laid out clearly. The Clarity Call changed how I understood myself completely.",
    name: "Emma, 41",
  },
  {
    quote:
      "I used to wake up every morning with that low level dread I could not explain. I kept telling myself I just needed to be more disciplined. Eight weeks later I set a goal and actually followed through for the first time in years. Not because I tried harder. Because I finally understood what had been in the way.",
    name: "Niamh, 38",
  },
  {
    quote:
      "What I found most valuable was that this was built around me specifically. Caroline had read my results before we even spoke. She already understood what I was carrying. That made all the difference.",
    name: "Layla, 36",
  },
] as const;

function wrapIndex(index: number, length: number): number {
  return ((index % length) + length) % length;
}

export function TestimonialsCarousel() {
  const reduceMotion = useReducedMotion();
  const pausedRef = useRef(false);
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    setActive(wrapIndex(index, TESTIMONIALS.length));
  };

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      if (!pausedRef.current) {
        setActive((current) => wrapIndex(current + 1, TESTIMONIALS.length));
      }
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const current = TESTIMONIALS[active];

  return (
    <section className="relative overflow-hidden border-t border-line-stone bg-warm-paper py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/testimonials-bg.png"
          alt=""
          fill
          priority={false}
          className="object-cover object-center opacity-[0.26]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-warm-paper/85 via-warm-paper/65 to-warm-paper/92" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(250,247,239,0.55),transparent_58%)]" />
      </div>

      <div className="relative mx-auto max-w-[680px] px-6">
        <h2 className="mb-1.5 font-serif text-[clamp(30px,7vw,38px)] font-normal text-ink">
          Life changing stories
        </h2>
        <p className="mb-9 font-sans text-sm text-soft-ink">
          From real women just like you
        </p>

        <div
          className="relative overflow-hidden rounded-[22px] border border-line-stone bg-cream px-[clamp(30px,5vw,52px)] py-[clamp(30px,5vw,52px)] shadow-[0_40px_80px_-44px_rgba(35,40,36,0.45),inset_0_1px_0_rgba(255,255,255,0.5)]"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onFocusCapture={() => {
            pausedRef.current = true;
          }}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              pausedRef.current = false;
            }
          }}
        >
          <span
            className="pointer-events-none absolute left-[26px] top-2 select-none font-serif text-[130px] leading-none text-glow-sage/[0.32]"
            aria-hidden
          >
            &ldquo;
          </span>
          <div
            className="pointer-events-none absolute -right-10 -top-[60px] h-[240px] w-[240px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(190,194,169,0.22), rgba(190,194,169,0) 70%)",
            }}
            aria-hidden
          />

          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={active}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 14 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reduceMotion ? undefined : { opacity: 0, y: -14 }
                }
                transition={{ duration: 0.6, ease: easeOut }}
              >
                <blockquote className="mb-[22px] font-serif text-[clamp(18px,2.4vw,21px)] italic leading-[1.62] text-ink">
                  {current.quote}
                </blockquote>
                <figcaption className="flex items-center gap-[11px]">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-glow-sage"
                    aria-hidden
                  />
                  <span className="font-sans text-[13px] font-semibold tracking-[0.02em] text-[#6B7060]">
                    {current.name}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2.5">
            {TESTIMONIALS.map((testimonial, index) => {
              const isActive = index === active;
              const initial = testimonial.name.charAt(0);

              return (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-pressed={isActive}
                  aria-label={`Show testimonial from ${testimonial.name}`}
                  className={`flex items-center gap-2 rounded-full py-[7px] pl-[7px] pr-3.5 transition-all duration-[250ms] ${
                    isActive
                      ? "border border-btn-primary bg-btn-primary"
                      : "border border-line-stone bg-cream hover:border-glow-sage"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-serif text-[15px] ${
                      isActive
                        ? "bg-glow-sage text-dark-room"
                        : "bg-mist text-[#6B7060]"
                    }`}
                  >
                    {initial}
                  </span>
                  <span
                    className={`font-sans text-xs font-medium ${
                      isActive ? "text-btn-text" : "text-soft-ink"
                    }`}
                  >
                    {testimonial.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-stone bg-cream text-lg text-soft-ink transition-all duration-200 hover:border-btn-primary hover:bg-btn-primary hover:text-btn-text"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-stone bg-cream text-lg text-soft-ink transition-all duration-200 hover:border-btn-primary hover:bg-btn-primary hover:text-btn-text"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
