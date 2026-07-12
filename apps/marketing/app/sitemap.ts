import type { MetadataRoute } from "next";

import { INDEXABLE_ROUTES, marketingSiteUrl } from "@/lib/marketing/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = marketingSiteUrl();

  return INDEXABLE_ROUTES.map(({ path }) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/bridge-map" ? 0.9 : 0.8,
  }));
}
