import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/marketing/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How Montero Labs, DBA Caroline Jones, collects and protects your personal data on carolinejones.co — GDPR compliant, Ireland.",
  path: "/privacy",
});

const sectionClass = "mt-10 scroll-mt-24";
const headingClass =
  "mb-4 font-serif text-[clamp(22px,4vw,28px)] font-normal leading-[1.15] text-ink";
const bodyClass = "font-sans text-body-lg leading-[1.75] text-soft-ink";
const listClass = "mt-4 list-disc space-y-2 pl-5 font-sans text-body-lg leading-[1.75] text-soft-ink";

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
        <h1 className="mb-3 font-serif text-[clamp(32px,6vw,40px)] font-normal leading-[1.1] text-ink">
          Privacy Policy
        </h1>
        <p className="font-sans text-[13px] text-sage">Last updated: 10/05/2026</p>

        <section className={sectionClass}>
          <h2 className={headingClass}>1. About this policy</h2>
          <p className={bodyClass}>
            This Privacy Policy explains how Montero Labs, DBA Caroline Jones
            (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), collects, uses, and protects your personal data
            when you use this website, complete The Bridge Map, or enquire about
            The Bridge Programme or speaking services.
          </p>
          <p className={`${bodyClass} mt-4`}>
            We are based in Ireland and comply with the EU General Data
            Protection Regulation (GDPR) and Irish data protection law.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>2. What data we collect</h2>
          <p className={bodyClass}>
            When you browse the Site, we collect standard analytics data, such
            as pages visited and general usage patterns, to understand how the
            Site is used and to improve it.
          </p>
          <p className={`${bodyClass} mt-4`}>
            When you take The Bridge Map, we collect your responses to the
            screening questions, along with your email address if you choose to
            receive your results. Because these responses relate to stress,
            emotional wellbeing, and related experiences, this is treated as
            special category data under GDPR, and we ask for your explicit
            consent before you begin.
          </p>
          <p className={`${bodyClass} mt-4`}>
            When you enquire about coaching, consultancy, or speaking, we
            collect the contact and event details you choose to share with us.
          </p>
          <p className={`${bodyClass} mt-4`}>
            When you sign up for the free class or our mailing list, we collect
            your name and email address.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>3. Why we collect it</h2>
          <p className={bodyClass}>We use your data to:</p>
          <ul className={listClass}>
            <li>Provide your Bridge Map results and any follow-up you request</li>
            <li>Respond to enquiries about coaching, consultancy, or speaking</li>
            <li>Send the free class or newsletter content you&apos;ve signed up for</li>
            <li>Understand and improve how the Site is used</li>
          </ul>
          <p className={`${bodyClass} mt-4`}>
            Where we process special category data (your Bridge Map responses), we
            rely on your explicit, separate consent, which you can withdraw at
            any time.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>4. How your Bridge Map results are generated</h2>
          <p className={bodyClass}>
            Your responses are scored against the published methodology of
            validated clinical instruments to produce your results. Your results
            are for your own understanding and are not stored or treated as a
            clinical or medical record.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>5. Who we share your data with</h2>
          <p className={bodyClass}>
            We use a small number of trusted third-party tools to run the Site
            and deliver our Services, including hosting, scheduling, and email
            providers. We don&apos;t sell your personal data, and we only share
            it with these providers as needed to operate the Services, under
            arrangements that require them to protect your data appropriately.
          </p>
          <p className={`${bodyClass} mt-4`}>
            Some providers may process data outside the EU/EEA. Where
            that&apos;s the case, appropriate safeguards are used to protect
            your data in line with GDPR requirements.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>6. How long we keep your data</h2>
          <p className={bodyClass}>
            We keep personal data only for as long as needed for the purpose it
            was collected, or as required by law. You can ask us to delete your
            data at any time, as set out in Section 7.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>7. Your rights</h2>
          <p className={bodyClass}>Under GDPR, you have the right to:</p>
          <ul className={listClass}>
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate data</li>
            <li>Delete your data, including Bridge Map responses and results</li>
            <li>Restrict or object to certain processing</li>
            <li>
              Withdraw consent at any time, without affecting processing already
              carried out
            </li>
            <li>Data portability, where applicable</li>
            <li>
              Complain to the Irish Data Protection Commission (DPC) if you
              believe your data has been mishandled:{" "}
              <a
                href="https://www.dataprotection.ie"
                className="underline underline-offset-2 hover:text-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                dataprotection.ie
              </a>
            </li>
          </ul>
          <p className={`${bodyClass} mt-4`}>
            To exercise any of these rights, please use the contact details
            provided elsewhere on this Site.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>8. Security</h2>
          <p className={bodyClass}>
            We take reasonable technical and organisational measures to protect
            your data, with particular care given to the sensitivity of Bridge
            Map responses.
          </p>
        </section>

        <section id="cookies" className={sectionClass}>
          <h2 className={headingClass}>9. Cookies</h2>
          <p className={bodyClass}>
            The Site uses cookies to support essential functionality and to
            understand how the Site is used. You can manage cookie preferences
            through your browser settings.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>10. Children&apos;s privacy</h2>
          <p className={bodyClass}>
            The Site and Services are not intended for anyone under 18. We do
            not knowingly collect data from minors.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>11. Changes to this policy</h2>
          <p className={bodyClass}>
            We may update this Privacy Policy from time to time. The date at the
            top reflects the most recent version.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>12. Contact</h2>
          <p className={bodyClass}>
            Questions about this policy, or requests relating to your data, can
            be sent via our{" "}
            <Link
              href={MARKETING_ROUTES.speakingEnquiry}
              className="underline underline-offset-2 hover:text-ink"
            >
              enquiry form
            </Link>
            .
          </p>
        </section>
      </article>
    </>
  );
}
