"use client";

import Image from "next/image";
import { useRef } from "react";
import { EmailCaptureForm } from "./EmailCaptureForm";
import { IMG, LANDING_TAKEAWAYS } from "./constants";
import { TakeawaysSection } from "./TakeawaysSection";

export function FreeClassLanding({
  onUnlock,
}: {
  onUnlock: (data: {
    email: string;
    firstName: string;
  }) => void | Promise<void>;
}) {
  const heroFormRef = useRef<HTMLDivElement>(null);

  const scrollToHeroForm = () => {
    heroFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <section className="relative overflow-hidden border-t border-line-stone bg-cream">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(56vw,760px)] lg:block"
          aria-hidden
        >
          <Image
            src="/images/caroline-web3-about.jpg"
            alt=""
            fill
            unoptimized
            className="object-cover object-[43%_center]"
            sizes="56vw"
            priority
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 14%, black 32%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 14%, black 32%, black 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream from-0% via-cream/85 via-[22%] to-transparent to-[48%]" />
        </div>

        <div className="relative mx-auto max-w-[1120px] px-6 py-[clamp(56px,8vw,88px)] lg:min-h-[clamp(560px,72vh,700px)] lg:py-[clamp(64px,8vw,96px)]">
          <div ref={heroFormRef} className="max-w-[520px] lg:pt-4">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line-stone bg-white/55 px-4 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7060]">
              Free video class
            </span>

            <h1 className="mb-4 max-w-[520px] font-serif text-[clamp(42px,6vw,60px)] font-normal leading-[1.02] text-ink">
              Life Beyond Survival Mode
            </h1>
            <p className="mb-6 max-w-[520px] font-sans text-body-lg leading-[1.72] text-soft-ink">
              Why capable women keep getting pulled back into survival mode, what
              the nervous system may be protecting, and what needs to change first.
            </p>

            <div className="mb-6 space-y-1.5 font-sans text-body-lg leading-[1.65] text-soft-ink">
              <p>
                You have tried the apps, saved the posts and maybe even bought the
                books.
              </p>
              <p>
                Some of it helped for a moment, but none of it lasted. And somewhere
                along the way, you started wondering if the problem was you.
              </p>
              <p>It was not.</p>
            </div>

            <p className="mb-4 font-sans text-body-lg leading-[1.72] text-soft-ink">
              Enter your name and email below to watch the class.
            </p>

            <EmailCaptureForm
              id="free-class-hero-form"
              buttonLabel="Watch now"
              onSubmit={onUnlock}
            />
            <p className="mt-4 font-sans text-[12px] text-sage">
              Taught by Caroline Jones, a registered nurse with an MSc in Psychology
              and ongoing training in psychotherapy and counselling.
            </p>
          </div>

          <div className="relative mx-auto mt-10 max-w-[420px] lg:hidden">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/caroline-web3-about.jpg"
                alt="Caroline Jones"
                fill
                unoptimized
                className="object-cover object-[35%_center]"
                sizes="90vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/25 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <TakeawaysSection
        takeaways={LANDING_TAKEAWAYS}
        title="What you'll walk away with"
        subtitle="Inside this class:"
      />

      <section className="relative overflow-hidden border-t border-line-stone bg-dark-room px-6 py-[clamp(72px,9vw,96px)] text-center">
        <Image
          src={`${IMG}/dark-section-leaf.png`}
          alt=""
          width={220}
          height={353}
          className="pointer-events-none absolute -bottom-6 -left-4 h-auto w-[min(200px,34vw)] opacity-35 sm:-left-2 sm:w-[220px] sm:opacity-40"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[560px]">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-glow-sage/30 bg-glow-sage/10 px-4 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#C7CBB0]">
            A different starting point
          </span>
          <div className="mb-6 space-y-1.5 font-sans text-body-lg leading-[1.65] text-cream/70">
            <p>
              You&apos;ve done the wait and see thing before. You know how that
              story ends.
            </p>
            <p>
              Another year of trying harder. Another list of things you meant to
              start. Another moment of wondering why everyone else seems to
              manage this and you don&apos;t.
            </p>
          </div>
          <h2 className="mb-4 font-serif text-[clamp(32px,7vw,44px)] font-normal leading-[1.1] text-cream">
            You don&apos;t need another pep talk.
          </h2>
          <p className="font-sans text-body-lg leading-[1.75] text-cream/75">
            You need to understand what your body has been doing, and why.
          </p>
        </div>
      </section>

      <section className="border-t border-line-stone bg-cream px-6 py-[clamp(72px,9vw,96px)]">
        <div className="mx-auto grid max-w-[960px] grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)] md:gap-14">
          <div className="relative mx-auto aspect-square w-full max-w-[340px] overflow-hidden rounded-[12px] shadow-[0_28px_60px_-40px_rgba(35,40,36,0.35)]">
            <Image
              src="/images/caroline-web1-about.jpg"
              alt="Caroline Jones"
              fill
              unoptimized
              className="object-cover object-center"
              sizes="(max-width: 768px) 80vw, 340px"
            />
          </div>

          <div className="text-left">
            <p className="mb-3.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-sage">
              About
            </p>
            <h2 className="mb-5 font-serif text-[clamp(28px,5vw,38px)] font-normal leading-[1.14] text-ink">
              Meet Caroline
            </h2>
            <div className="space-y-4 font-sans text-body-lg leading-[1.75] text-soft-ink">
              <p>
                I&apos;ve spent years caring for women and families through
                medical crisis. Not just present for it. Holding physical care
                and emotional care at once, because both were needed and neither
                could wait.
              </p>
              <p>
                I saw what the charts didn&apos;t show. Exhaustion that
                wasn&apos;t just physical. Systems stuck in alert, long after the
                danger passed.
              </p>
              <p>
                That took me past nursing and into the nervous system itself.
                Into psychotherapy and somatic therapy. Into the bridge between
                body and brain.
              </p>
              <p>
                This is the work now. If it speaks to you, I am glad you are
                here.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line-stone bg-warm-paper px-6 py-[clamp(64px,8vw,88px)]">
        <div className="relative mx-auto max-w-[640px] text-center">
          <Image
            src={`${IMG}/cta-leaf.png`}
            alt=""
            width={72}
            height={160}
            className="pointer-events-none absolute -left-2 top-1/2 hidden h-[min(160px,28vw)] w-auto -translate-y-1/2 opacity-80 sm:-left-6 sm:block md:-left-10"
            aria-hidden
          />

          <h2 className="font-serif text-[clamp(32px,7vw,44px)] font-normal leading-[1.1] text-ink">
            Ready to watch?
          </h2>
          <p className="mx-auto mt-3 max-w-[420px] font-sans text-body-lg leading-[1.72] text-soft-ink">
            Enter your email above and the class opens instantly on this page.
          </p>
          <button
            type="button"
            onClick={scrollToHeroForm}
            className="mt-7 inline-flex h-14 items-center justify-center gap-2 rounded-[14px] bg-btn-primary px-8 font-sans text-body-lg font-medium text-btn-text transition-all hover:-translate-y-0.5 hover:bg-btn-primary-hover"
          >
            Unlock the class
            <span aria-hidden>→</span>
          </button>
        </div>
      </section>
    </>
  );
}
