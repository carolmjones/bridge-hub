import type { Metadata } from "next";

export const SITE_NAME = "The Bridge Hub";

export const SITE_DESCRIPTION =
  "Trauma-informed nervous system screening and the 8-week Bridge Programme for women ready to move beyond survival mode. Founded by Caroline Jones, registered nurse and MSc Psychology graduate, Ireland.";

/** Caroline's social/profile URLs for Person schema sameAs — update when confirmed. */
export const CAROLINE_SAME_AS: string[] = [
  "https://www.instagram.com/itscarolinejones",
  // LinkedIn — add when confirmed
];

export function marketingSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_MARKETING_URL?.replace(/\/$/, "");
  return url ?? "http://localhost:3000";
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${marketingSiteUrl()}${normalized}`;
}

export function organizationId(): string {
  return `${marketingSiteUrl()}/#organization`;
}

export function personId(): string {
  return `${marketingSiteUrl()}/#person`;
}

export function websiteId(): string {
  return `${marketingSiteUrl()}/#website`;
}

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: BuildPageMetadataOptions): Metadata {
  const canonical = path ? absoluteUrl(path) : undefined;

  return {
    title,
    description,
    ...(canonical
      ? { alternates: { canonical } }
      : {}),
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_IE",
      images: [
        {
          url: "/og-default.png",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-default.png"],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(marketingSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IE",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

/** Sitewide JSON-LD @graph: WebSite + ProfessionalService + Person */
export function siteJsonLd(): Record<string, unknown> {
  const siteUrl = marketingSiteUrl();
  const orgId = organizationId();
  const personUrl = personId();
  const webId = websiteId();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": webId,
        name: SITE_NAME,
        alternateName: "Caroline Jones",
        url: siteUrl,
        description: SITE_DESCRIPTION,
        publisher: { "@id": orgId },
      },
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: SITE_NAME,
        url: siteUrl,
        description: SITE_DESCRIPTION,
        areaServed: {
          "@type": "Country",
          name: "Ireland",
        },
        founder: { "@id": personUrl },
        image: absoluteUrl("/og-default.png"),
      },
      {
        "@type": "Person",
        "@id": personUrl,
        name: "Caroline Jones",
        jobTitle: "Registered Nurse and Founder of The Bridge Hub",
        url: absoluteUrl("/about"),
        image: absoluteUrl("/images/caroline-web4-founder.jpg"),
        description:
          "Dual registered nurse (NMBI, Children's and Adults), MSc Psychology (University of South Wales), currently training in psychotherapy and counselling at PCI College Ireland, and founder of The Bridge Hub. Specialises in nervous system regulation, burnout, and trauma-informed psychoeducation.",
        worksFor: { "@id": orgId },
        knowsAbout: [
          "Nervous system regulation",
          "Burnout recovery",
          "Trauma-informed care",
          "Psychoeducation",
          "Attachment theory",
        ],
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "University of South Wales",
          },
          {
            "@type": "CollegeOrUniversity",
            name: "PCI College Ireland",
          },
        ],
        ...(CAROLINE_SAME_AS.length > 0 ? { sameAs: CAROLINE_SAME_AS } : {}),
      },
    ],
  };
}

export function faqPageJsonLd(
  faqs: ReadonlyArray<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  areaServed,
}: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": personId() },
    ...(areaServed
      ? {
          areaServed:
            areaServed === "Worldwide"
              ? { "@type": "Text", name: "Worldwide" }
              : { "@type": "Country", name: areaServed },
        }
      : {}),
  };
}

export function aboutPersonJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(),
    name: "Caroline Jones",
    jobTitle: "Registered Nurse and Founder of The Bridge Hub",
    url: absoluteUrl("/about"),
    image: absoluteUrl("/images/caroline-web4-founder.jpg"),
    description:
      "Caroline Jones — registered nurse (NMBI), MSc Psychology, currently training in psychotherapy and counselling at PCI College Ireland, IACP member, and founder of The Bridge Hub. Master's in psychology specialising in play therapy, with peer-reviewed research published through UNIFESP.",
    worksFor: { "@id": organizationId() },
    knowsAbout: [
      "Nervous system regulation",
      "Play therapy",
      "Attachment theory",
      "Burnout",
      "Trauma-informed psychoeducation",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of South Wales",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "PCI College Ireland",
      },
    ],
    ...(CAROLINE_SAME_AS.length > 0 ? { sameAs: CAROLINE_SAME_AS } : {}),
  };
}

export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Per-route sitemap lastModified — update when page content changes. */
export const SITEMAP_LAST_MODIFIED: Record<string, string> = {
  "/": "2026-07-13",
  "/bridge-map": "2026-07-13",
  "/free-class": "2026-07-13",
  "/about": "2026-07-13",
  "/work-with-me/coaching": "2026-07-13",
  "/work-with-me/speaking": "2026-07-13",
  "/work-with-me/speaking/enquire": "2026-07-13",
  "/privacy": "2026-07-13",
  "/terms": "2026-07-13",
};

/** Routes included in sitemap and llms.txt index */
export const INDEXABLE_ROUTES = [
  { path: "/", title: "Home" },
  { path: "/bridge-map", title: "The Bridge Map" },
  { path: "/free-class", title: "Free Class" },
  { path: "/about", title: "About Caroline Jones" },
  { path: "/work-with-me/coaching", title: "The Bridge Programme" },
  { path: "/work-with-me/speaking", title: "Keynote Speaking" },
  { path: "/work-with-me/speaking/enquire", title: "Speaking Enquiry" },
  { path: "/privacy", title: "Privacy Policy" },
  { path: "/terms", title: "Terms of Use" },
] as const;
