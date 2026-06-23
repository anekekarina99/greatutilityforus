import type { MetadataRoute } from "next";
import { buildCanonicalUrl, getSiteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: buildCanonicalUrl("/sitemap.xml"),
    host: getSiteConfig().url,
  };
}
