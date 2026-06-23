import type { MetadataRoute } from "next";
import { buildCanonicalUrl } from "@/lib/seo";
import { CATEGORIES, getAllTools, getToolUrl } from "@/lib/tools";
import { getAllBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: buildCanonicalUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: buildCanonicalUrl("/tools"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: buildCanonicalUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: buildCanonicalUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: buildCanonicalUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: buildCanonicalUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: buildCanonicalUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: buildCanonicalUrl(`/tools/${category.id}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const toolPages: MetadataRoute.Sitemap = getAllTools().map((tool) => ({
    url: buildCanonicalUrl(getToolUrl(tool)),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: buildCanonicalUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...toolPages, ...blogPages];
}
