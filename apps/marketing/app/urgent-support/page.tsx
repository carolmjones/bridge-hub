import Link from "next/link";

const RESOURCES = [
  {
    region: "Ireland",
    items: [
      { label: "Emergency services", value: "999 or 112" },
      { label: "Samaritans Ireland", value: "116 123 (free, 24 hours)", href: "tel:116123" },
      {
        label: "Pieta House (suicide and self harm)",
        value: "116 123 or text HELLO to 51444",
        href: "tel:116123",
      },
      { label: "Crisis Text Line Ireland", value: "Text HELLO to 50808" },
      {
        label: "HSE Mental Health",
        value: "hse.ie/mentalhealth",
        href: "https://www.hse.ie/eng/services/list/4/mental-health-services/",
      },
    ],
  },
  {
    region: "The United Kingdom",
    items: [
      { label: "Emergency services", value: "999" },
      { label: "Samaritans UK", value: "116 123 (free, 24 hours)", href: "tel:116123" },
      { label: "Crisis Text Line UK", value: "Text SHOUT to 85258" },
      {
        label: "NHS Mental Health Helplines",
        value: "nhs.uk/conditions/suicide",
        href: "https://www.nhs.uk/conditions/suicide/",
      },
    ],
  },
  {
    region: "The United States",
    items: [
      { label: "Emergency services", value: "911" },
      { label: "988 Suicide and Crisis Lifeline", value: "Call or text 988", href: "tel:988" },
      { label: "Crisis Text Line", value: "Text HOME to 741741" },
      {
        label: "National Domestic Violence Hotline",
        value: "1-800-799-7233",
        href: "tel:18007997233",
      },
    ],
  },
  {
    region: "Canada",
    items: [
      { label: "Emergency services", value: "911" },
      {
        label: "Talk Suicide Canada",
        value: "1-833-456-4566 (24 hours)",
        href: "tel:18334564566",
      },
      { label: "Crisis Text Line Canada", value: "Text HOME to 686868" },
      {
        label: "Crisis Services Canada",
        value: "crisisservicescanada.ca",
        href: "https://www.crisisservicescanada.ca/en/",
      },
    ],
  },
  {
    region: "Australia",
    items: [
      { label: "Emergency services", value: "000" },
      { label: "Lifeline", value: "13 11 14 (24 hours)", href: "tel:131114" },
      { label: "Beyond Blue", value: "1300 22 4636", href: "tel:1300224636" },
      { label: "Crisis Text Line", value: "Text HOME to 0477 13 11 14" },
    ],
  },
  {
    region: "International",
    items: [
      {
        label: "Crisis Text Line International",
        value: "crisistextline.org/international",
        href: "https://www.crisistextline.org/international/",
      },
      {
        label: "International Association for Suicide Prevention",
        value: "iasp.info/resources/Crisis_Centres",
        href: "https://www.iasp.info/resources/Crisis_Centres/",
      },
      {
        label: "Befrienders Worldwide",
        value: "befrienders.org",
        href: "https://www.befrienders.org/",
      },
    ],
  },
] as const;

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-[3px] hover:text-ink"
    >
      {children}
    </a>
  );
}

export default function UrgentSupportPage() {
  return (
    <section className="border-t border-line-stone bg-cream px-6 py-[clamp(72px,9vw,104px)]">
      <div className="mx-auto max-w-[880px]">
        <h1 className="font-serif text-[clamp(34px,7vw,48px)] leading-[1.08] text-ink">
          Need support right now?
        </h1>

        <div className="mt-7 max-w-[760px] space-y-5 font-sans text-body-lg leading-[1.75] text-soft-ink">
          <p>
            This platform is not a crisis service. If you are in immediate
            danger, feeling suicidal, or experiencing a mental health emergency,
            please reach out to your local emergency services or one of the
            organisations below. They are there for exactly this moment.
          </p>
          <p>You do not have to explain yourself. You just have to reach out.</p>
        </div>

        <div className="mt-12 space-y-6">
          {RESOURCES.map((region) => (
            <div
              key={region.region}
              className="rounded-[22px] border border-line-stone bg-warm-paper px-6 py-6 shadow-[0_18px_44px_-40px_rgba(35,40,36,0.25)]"
            >
              <h2 className="font-serif text-[22px] leading-[1.2] text-ink">
                {region.region}
              </h2>

              <ul className="mt-4 space-y-3">
                {region.items.map((item) => (
                  <li
                    key={`${region.region}-${item.label}`}
                    className="flex flex-col gap-1.5 border-b border-line-stone/70 pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                  >
                    <p className="font-sans text-[13px] font-medium text-ink">
                      {item.label}
                    </p>
                    <p className="font-sans text-[13px] leading-[1.6] text-soft-ink sm:text-right">
                      {"href" in item && item.href ? (
                        item.href.startsWith("tel:") ? (
                          <Link
                            href={item.href}
                            className="underline underline-offset-[3px] hover:text-ink"
                          >
                            {item.value}
                          </Link>
                        ) : (
                          <ExternalLink href={item.href}>{item.value}</ExternalLink>
                        )
                      ) : (
                        item.value
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-[760px] font-sans text-[12px] leading-[1.7] text-sage">
          Resources verified as of June 2026 — check annually for accuracy.
        </p>
      </div>
    </section>
  );
}

