import Image from "next/image";
import Link from "next/link";
import { MARKETING_ROUTES, SCREENING_START } from "@/lib/marketing/routes";

export function AboutCloseCta() {
  return (
    <section className="px-6 py-[clamp(40px,6vw,64px)]">
      <div className="relative mx-auto max-w-[920px] overflow-hidden rounded-[24px] border border-line-stone/80 px-5 py-[clamp(28px,4vw,40px)] text-center shadow-[0_24px_56px_-36px_rgba(35,40,36,0.22)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/about-close-cta.jpg"
            alt=""
            fill
            quality={90}
            sizes="(max-width: 920px) 100vw, 920px"
            className="object-cover object-center"
          />
        </div>

        <div className="relative">
          <h2 className="mx-auto max-w-[520px] font-serif text-[clamp(26px,5vw,34px)] font-normal leading-[1.16] text-ink">
            That&apos;s my story. Yours is the one that matters now.
          </h2>
          <p className="mx-auto mt-3 max-w-[440px] font-sans text-[14px] leading-[1.65] text-soft-ink">
            The free class is where most women start. The Bridge Map is where it
            gets specific to you.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-3">
            <Link
              href={MARKETING_ROUTES.freeClass}
              className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-[14px] bg-btn-primary px-7 font-sans text-[14px] font-medium text-btn-text transition-all hover:-translate-y-0.5 hover:bg-btn-primary-hover"
            >
              Watch the free class
            </Link>
            <Link
              href={SCREENING_START}
              className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-[14px] border border-line-stone bg-cream/90 px-7 font-sans text-[14px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              Discover my profile — free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
