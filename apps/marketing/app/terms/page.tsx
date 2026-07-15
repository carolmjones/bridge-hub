import type { Metadata } from "next";
import { JsonLd } from "@/components/marketing/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/marketing/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use",
  description:
    "Terms of use for carolinejones.co — Montero Labs, DBA Caroline Jones. The Bridge Map, The Bridge Programme, and speaking services.",
  path: "/terms",
});

const sectionClass = "mt-10 scroll-mt-24";
const headingClass =
  "mb-4 font-serif text-[clamp(22px,4vw,28px)] font-normal leading-[1.15] text-ink";
const bodyClass = "font-sans text-body-lg leading-[1.75] text-soft-ink";
const listClass =
  "mt-4 list-disc space-y-2 pl-5 font-sans text-body-lg leading-[1.75] text-soft-ink";

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
        <h1 className="mb-3 font-serif text-[clamp(32px,6vw,40px)] font-normal leading-[1.1] text-ink">
          Terms of Use
        </h1>
        <p className="font-sans text-[13px] text-sage">Last updated: 10/06/26</p>

        <section className={sectionClass}>
          <h2 className={headingClass}>1. About these terms</h2>
          <p className={bodyClass}>
            These Terms of Use govern your use of this website (the
            &quot;Site&quot;), operated by Montero Labs, DBA Caroline Jones
            (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;). They apply to your use of the Site, The Bridge Map
            screening tool, and any general information you access here about The
            Bridge Programme and speaking or consultancy services.
          </p>
          <p className={`${bodyClass} mt-4`}>
            By using the Site, you agree to these Terms. If you don&apos;t agree,
            please don&apos;t use the Site.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>2. Eligibility</h2>
          <p className={bodyClass}>
            You must be 18 or older to use The Bridge Map or any Service offered
            through this Site. Our Services are not designed for, or offered to,
            minors.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>3. The Bridge Map</h2>
          <p className={bodyClass}>
            The Bridge Map is a free psychoeducational screening tool. It is not
            a diagnosis, a clinical assessment, or a substitute for therapy or
            professional care. Your results are provided for your own
            understanding only and are not a medical record.
          </p>
          <p className={`${bodyClass} mt-4`}>
            If anything that comes up during or after The Bridge Map raises
            concerns about your safety or wellbeing, please contact a qualified
            professional or, in an emergency, your local emergency services.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>
            4. Coaching, consultancy, and speaking services
          </h2>
          <p className={bodyClass}>
            Where this Site describes The Bridge Programme, consultancy, or
            keynote speaking, that description is general information only.
            Specific booking terms, pricing, payment, and cancellation policies
            for any service are set out separately in the client agreement or
            engagement terms provided at the time of booking, and take precedence
            over anything on this Site.
          </p>
          <p className={`${bodyClass} mt-4`}>
            The Bridge Programme is coaching and psychoeducation. It is not
            therapy, treatment, counselling, or a substitute for clinical mental
            health care.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>5. Acceptable use</h2>
          <p className={bodyClass}>You agree not to:</p>
          <ul className={listClass}>
            <li>Use the Site for any unlawful purpose</li>
            <li>
              Attempt to scrape, reproduce, or redistribute the Site&apos;s
              content without permission
            </li>
            <li>Interfere with the Site&apos;s normal operation or security</li>
            <li>
              Impersonate another person when using the Site or any Service
            </li>
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>6. Intellectual property</h2>
          <p className={bodyClass}>
            The Bridge Map, The Bridge Programme framework, and all original
            content on this Site belong to the Company and may not be copied,
            reproduced, or distributed without permission.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>7. No professional or medical advice</h2>
          <p className={bodyClass}>
            Nothing on this Site constitutes medical, psychological, or legal
            advice, including the free class, blog or insights content, or The
            Bridge Map. This Site does not provide emergency support. If you are
            in crisis, please contact emergency services or a crisis line in
            your area.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>8. Third-party links and tools</h2>
          <p className={bodyClass}>
            The Site may link to or use third-party tools (for example, for
            booking or communication). We aren&apos;t responsible for the content
            or practices of third-party sites you&apos;re directed to.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>9. Liability</h2>
          <p className={bodyClass}>
            The Site and its content are provided as general information, and we
            make reasonable efforts to keep it accurate and up to date, but we
            don&apos;t guarantee it&apos;s error-free. To the extent permitted by
            law, we aren&apos;t liable for any loss arising from your use of the
            Site, except where that liability cannot be excluded by law (for
            example, in cases of death or personal injury caused by negligence).
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>10. Changes</h2>
          <p className={bodyClass}>
            We may update these Terms from time to time. The date at the top
            shows the most recent version. Continued use of the Site after a
            change means you accept the update.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>11. Governing law</h2>
          <p className={bodyClass}>
            These Terms are governed by the laws of Ireland.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>12. Contact</h2>
          <p className={bodyClass}>
            Questions about these Terms can be sent via the contact details
            provided elsewhere on this Site.
          </p>
        </section>
      </article>
    </>
  );
}
