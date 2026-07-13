import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/marketing/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/marketing/seo";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How The Bridge Hub and Caroline Jones handle your personal data on carolinejones.co.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <article className="mx-auto max-w-[680px] px-6 py-[clamp(56px,8vw,96px)]">
      <h1 className="mb-6 font-serif text-[clamp(32px,6vw,40px)] font-normal leading-[1.1] text-ink">
        Privacy Policy
      </h1>
      <p className="mb-4 font-sans text-body-lg leading-[1.75] text-soft-ink">
        This page is a placeholder while the full privacy policy for the
        marketing site is finalised. The screening app maintains its own privacy
        policy for assessment data.
      </p>
      <p className="font-sans text-body-lg leading-[1.75] text-soft-ink">
        For screening and assessment privacy details, see the{" "}
        <Link
          href={MARKETING_ROUTES.screeningPrivacy}
          className="underline underline-offset-2 hover:text-ink"
        >
          screening privacy policy
        </Link>
        . For questions, contact Caroline via the speaking enquiry form or your
        usual Bridge Hub channel.
      </p>
      <p className="mt-8 font-sans text-[12px] text-sage">
        Legal review pending before launch.
      </p>
    </article>
    </>
  );
}
