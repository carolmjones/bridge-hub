import Image from "next/image";
import Link from "next/link";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";
import { FreeClassMuxPlayer } from "./FreeClassMuxPlayer";
import { TakeawaysSection } from "./TakeawaysSection";
import { IMG, INFO_BAR_ITEMS, WATCH_TAKEAWAYS } from "./constants";

export function FreeClassWatch() {
  return (
    <>
      <section className="relative overflow-hidden border-t border-line-stone bg-cream px-6 py-[clamp(56px,8vw,88px)]">
        <div className="relative mx-auto max-w-[880px] text-center">
          <Image
            src={`${IMG}/unlocked-flourish.png`}
            alt=""
            width={160}
            height={31}
            className="mx-auto mb-5 h-auto w-[min(160px,42vw)] object-contain opacity-80"
            aria-hidden
          />

          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line-stone bg-white/55 px-4 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7060]">
            <span aria-hidden>🔒</span>
            Free class unlocked
          </span>

          <h1 className="mb-4 font-serif text-[clamp(42px,6vw,60px)] font-normal leading-[1.02] text-ink">
            Life Beyond Survival Mode
          </h1>
          <p className="mx-auto max-w-[560px] font-sans text-body-lg leading-[1.72] text-soft-ink">
            A free class on why everything you&apos;ve tried keeps failing, and
            what has to change first. You&apos;re in. Press play when you&apos;re
            ready.
          </p>

          <div className="mt-10">
            <FreeClassMuxPlayer />
          </div>
        </div>
      </section>

      <section className="border-t border-line-stone bg-warm-paper px-6 py-8 sm:py-10">
        <div className="mx-auto grid max-w-[960px] grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
          {INFO_BAR_ITEMS.map((item) => (
            <div key={item.title} className="text-center">
              <Image
                src={item.icon}
                alt=""
                width={40}
                height={40}
                className="mx-auto mb-3 h-10 w-10 object-contain"
                aria-hidden
              />
              <p className="font-sans text-[13px] font-medium leading-[1.45] text-ink">
                {item.title}
              </p>
              <p className="mt-1 font-sans text-[11px] leading-[1.5] text-sage">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      <TakeawaysSection
        takeaways={WATCH_TAKEAWAYS}
        title="Inside this class"
        subtitle="Here's what we'll explore together."
      />

      <section className="relative flex min-h-[clamp(300px,42vw,400px)] items-center overflow-hidden border-t border-line-stone py-[clamp(48px,8vw,72px)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src={`${IMG}/bridge-map-cta-bg.jpg`}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-cream/35" />
        </div>

        <div className="relative mx-auto w-full max-w-[440px] px-6 text-center">
            <h2 className="font-serif text-[clamp(28px,5vw,36px)] font-normal leading-[1.12] text-ink">
              Ready to understand your own patterns?
            </h2>
            <p className="mt-3 font-sans text-body-lg leading-[1.72] text-soft-ink">
              The Bridge Map is a free, guided screening across five areas of
              your life. 15 to 20 minutes. Results on screen immediately.
            </p>
            <Link
              href={MARKETING_ROUTES.bridgeMap}
              className="mt-6 inline-flex h-14 items-center justify-center gap-2 rounded-[14px] bg-btn-primary px-8 font-sans text-body-lg font-medium text-btn-text transition-all hover:-translate-y-0.5 hover:bg-btn-primary-hover"
            >
              Take The Bridge Map — free
              <span aria-hidden>→</span>
            </Link>
        </div>
      </section>

      <section className="border-t border-line-stone bg-warm-paper px-6 py-10">
        <div className="mx-auto flex max-w-[640px] items-start gap-4 rounded-[14px] border border-line-stone bg-cream px-5 py-5">
          <Image
            src={`${IMG}/icon-sprout.png`}
            alt=""
            width={36}
            height={36}
            className="mt-0.5 h-9 w-9 shrink-0 object-contain"
            aria-hidden
          />
          <div className="text-left">
            <p className="font-sans text-[14px] font-medium text-ink">
              Take your time
            </p>
            <p className="mt-1 font-sans text-[13px] leading-[1.65] text-soft-ink">
              You can come back to this class anytime from your email link. Your
              progress is saved on this device.
            </p>
          </div>
        </div>

        {process.env.NODE_ENV === "development" ? (
          <p className="mx-auto mt-6 max-w-[640px] text-center">
            <Link
              href="/free-class?reset=1"
              className="font-sans text-[11px] text-sage underline underline-offset-2 hover:text-ink"
            >
              Reset unlock (dev) — back to signup
            </Link>
          </p>
        ) : null}
      </section>
    </>
  );
}
