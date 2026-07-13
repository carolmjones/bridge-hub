import type { Metadata } from "next";
import { JsonLd } from "@/components/marketing/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/marketing/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use",
  description:
    "Terms of use for carolinejones.co — The Bridge Hub marketing site, coaching, and speaking services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/terms" },
        ])}
      />
      <article className="mx-auto max-w-[680px] px-6 py-[clamp(56px,8vw,96px)]">
      <h1 className="mb-6 font-serif text-[clamp(32px,6vw,40px)] font-normal leading-[1.1] text-ink">
        Terms of Use
      </h1>
      <p className="mb-4 font-sans text-body-lg leading-[1.75] text-soft-ink">
        This page is a placeholder while terms of use for the marketing site,
        coaching, and speaking services are finalised.
      </p>
      <p className="font-sans text-body-lg leading-[1.75] text-soft-ink">
        The Bridge Map is a screening tool, not a clinical diagnosis. The Bridge
        Programme is trauma-informed coaching and psychoeducation — not therapy or
        treatment.
      </p>
      <p className="mt-8 font-sans text-[12px] text-sage">
        Legal review pending before launch.
      </p>
    </article>
    </>
  );
}
