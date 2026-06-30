import Link from "next/link";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

export function StillNotSure() {
  return (
    <section className="border-t border-line-stone bg-cream py-[72px] text-center">
      <div className="mx-auto max-w-[380px] px-6">
        <h2 className="mb-4 font-serif text-[30px] font-normal text-ink">
          Still not sure?
        </h2>
        <p className="mb-7 font-sans text-sm leading-[1.72] text-soft-ink">
          I get it. I have been on the same side as you, wondering if anything
          will actually be different this time. Want to speak to Caroline before
          you start? Book a free 15 minute Discovery Call — no commitment, no
          pressure.
        </p>
        <Link
          href={MARKETING_ROUTES.discoveryCall}
          className="inline-flex h-[54px] items-center justify-center rounded-[14px] border border-line-stone bg-cream px-7 font-sans text-[15px] font-medium text-[#3D403A] transition-colors hover:bg-[#F0EADD]"
        >
          Book a free Discovery Call
        </Link>
      </div>
    </section>
  );
}
