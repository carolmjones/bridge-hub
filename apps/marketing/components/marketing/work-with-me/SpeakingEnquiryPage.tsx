import Link from "next/link";
import { SpeakingEnquiryForm } from "./SpeakingEnquiryForm";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

export function SpeakingEnquiryPage() {
  return (
    <section className="border-t border-line-stone bg-warm-paper px-6 py-[clamp(72px,9vw,104px)]">
      <div className="mx-auto max-w-[900px]">
        <div className="mx-auto mb-10 max-w-[560px] text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line-stone bg-white/60 px-3.5 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7060]">
            <span className="h-[5px] w-[5px] rounded-full bg-glow-sage" aria-hidden />
            Enquire About Booking
          </span>
          <h1 className="font-serif text-[clamp(32px,5.5vw,44px)] font-normal leading-[1.12] text-ink">
            Let&apos;s talk about your event.
          </h1>
          <p className="mt-4 font-sans text-body-lg leading-[1.72] text-soft-ink">
            Tell me a little about what you&apos;re planning, and I&apos;ll come back to
            you within 24 hours to talk it through.
          </p>
          <p className="mt-4 font-sans text-[14px] leading-[1.65] text-soft-ink">
            Not ready to enquire?{" "}
            <Link
              href={MARKETING_ROUTES.keynoteSpeaking}
              className="font-medium text-ink underline underline-offset-[3px] hover:text-soft-ink"
            >
              Read about my talks and topics first →
            </Link>
          </p>
        </div>

        <div className="flex justify-center">
          <SpeakingEnquiryForm />
        </div>
      </div>
    </section>
  );
}
