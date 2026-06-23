import type { ToolContent } from "./tools";

const SITE_NAME = "BMI Free";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bmifree.com";
const SITE_DESCRIPTION =
  "Alat online gratis untuk kesehatan, gambar, kalkulator, dan utility harian — tanpa daftar, langsung di browser Anda.";

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function getSiteConfig() {
  return {
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

export function buildPageTitle(title: string): string {
  return `${title} | ${SITE_NAME}`;
}

export function buildCanonicalUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function buildToolMetadata(tool: ToolContent) {
  return {
    title: buildPageTitle(tool.title),
    description: tool.description,
    alternates: {
      canonical: buildCanonicalUrl(`/tools/${tool.category}/${tool.slug}`),
    },
    openGraph: {
      title: tool.headline,
      description: tool.description,
      url: buildCanonicalUrl(`/tools/${tool.category}/${tool.slug}`),
      siteName: SITE_NAME,
      type: "website",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: tool.headline,
      description: tool.description,
    },
    keywords: tool.keywords ?? [],
  };
}

export function buildSoftwareApplicationJsonLd(tool: ToolContent) {
  const { name, url } = getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.headline,
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
    },
    url: buildCanonicalUrl(`/tools/${tool.category}/${tool.slug}`),
    provider: {
      "@type": "Organization",
      name,
      url,
    },
    featureList: tool.tutorial.steps,
  };
}

export function buildFaqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildArticleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  author?: string;
}) {
  const { name, url } = getSiteConfig();
  const canonical = buildCanonicalUrl(`/blog/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    image: [`${canonical}/opengraph-image`],
    author: {
      "@type": "Organization",
      name: article.author ?? name,
    },
    publisher: {
      "@type": "Organization",
      name,
      url,
      logo: {
        "@type": "ImageObject",
        url: buildCanonicalUrl("/icon"),
      },
    },
    mainEntityOfPage: canonical,
  };
}

export function buildArticleMetadata(article: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  tags?: string[];
}) {
  const canonical = buildCanonicalUrl(`/blog/${article.slug}`);
  return {
    title: buildPageTitle(article.title),
    description: article.description,
    keywords: article.tags ?? [],
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonical,
      siteName: SITE_NAME,
      type: "article" as const,
      locale: "id_ID",
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: article.title,
      description: article.description,
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  };
}

export function buildItemListJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: buildCanonicalUrl(item.path),
    })),
  };
}

export function buildHubMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}) {
  const canonical = buildCanonicalUrl(opts.path);
  return {
    title: buildPageTitle(opts.title),
    description: opts.description,
    keywords: opts.keywords ?? [],
    alternates: { canonical },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website" as const,
      locale: "id_ID",
    },
  };
}

export function buildWebsiteJsonLd() {
  const { name, url, description } = getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    inLanguage: "id-ID",
  };
}
