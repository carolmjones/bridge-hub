import { readFile } from "node:fs/promises";
import path from "node:path";

import { SCREENING_START } from "@/lib/marketing/routes";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
  marketingSiteUrl,
} from "@/lib/marketing/seo";

const LLMS_PAGE_SUMMARIES: Record<string, string> = {
  "/": "Landing — free class, Bridge Map CTA, 8-week programme overview",
  "/bridge-map":
    "The Bridge Map — free nervous-system screening by Caroline Jones",
  "/free-class":
    "Life Beyond Survival Mode — free video class on survival mode, nervous system patterns, and what needs to change first",
  "/about":
    "Caroline Jones — registered nurse, MSc Psychology, training in psychotherapy and counselling, founder; credentials and personal story",
  "/work-with-me/coaching":
    "The Bridge Programme — eight weeks, one to one, built around your nervous system profile",
  "/work-with-me/speaking":
    "Keynote speaking on stress, burnout, trauma, and nervous system regulation (Ireland)",
  "/work-with-me/speaking/enquire":
    "Enquire about booking Caroline for keynotes, talks, and workshops",
  "/privacy": "Privacy policy for carolinejones.co (marketing site)",
  "/terms": "Terms of use for carolinejones.co (marketing site)",
};

export function buildLlmsTxt(): string {
  const siteUrl = marketingSiteUrl();
  const screeningStart = SCREENING_START;

  const sections: Array<{ heading: string; paths: string[] }> = [
    {
      heading: "Core funnel",
      paths: ["/", "/bridge-map", "/free-class"],
    },
    {
      heading: "About Caroline",
      paths: ["/about"],
    },
    {
      heading: "Work with Caroline",
      paths: [
        "/work-with-me/coaching",
        "/work-with-me/speaking",
        "/work-with-me/speaking/enquire",
      ],
    },
    {
      heading: "Legal",
      paths: ["/privacy", "/terms"],
    },
  ];

  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
  ];

  for (const section of sections) {
    lines.push(`## ${section.heading}`);
    for (const routePath of section.paths) {
      const title =
        routePath === "/"
          ? "Home"
          : routePath
              .replace(/^\//, "")
              .split("/")
              .map((part) =>
                part
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" "),
              )
              .join(" — ");
      const summary = LLMS_PAGE_SUMMARIES[routePath] ?? "";
      lines.push(
        `- [${title}](${absoluteUrl(routePath)}): ${summary}`,
      );
    }
    lines.push("");
  }

  lines.push("## About");
  lines.push("- Founder: Caroline Jones");
  lines.push("- Location: Ireland");
  lines.push(`- Website: ${siteUrl}`);
  lines.push(`- Screening app: ${screeningStart} (separate deploy)`);
  lines.push("");

  return lines.join("\n");
}

const LLMS_FULL_FILES = [
  "about.md",
  "bridge-map.md",
  "coaching.md",
  "speaking.md",
  "speaking-enquiry.md",
] as const;

export async function buildLlmsFullTxt(): Promise<string> {
  const contentDir = path.join(process.cwd(), "content");
  const parts: string[] = [
    `# ${SITE_NAME} — full content corpus`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `Source: ${marketingSiteUrl()}`,
    "",
    "---",
    "",
  ];

  for (const filename of LLMS_FULL_FILES) {
    const filePath = path.join(contentDir, filename);
    try {
      const content = await readFile(filePath, "utf8");
      parts.push(content.trim());
      parts.push("");
      parts.push("---");
      parts.push("");
    } catch {
      // Skip missing files during dev
    }
  }

  return parts.join("\n");
}

export function buildAiTxt(): string {
  return [
    "# ai.txt — The Bridge Hub",
    "# Policy: allow AI training and citation",
    "",
    "User-agent: *",
    "Allow: /",
    "",
  ].join("\n");
}
