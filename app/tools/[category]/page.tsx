import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen } from "lucide-react";
import { Card } from "@radix-ui/themes";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  buildBreadcrumbJsonLd,
  buildHubMetadata,
  buildItemListJsonLd,
} from "@/lib/seo";
import {
  CATEGORIES,
  getCategoryById,
  getToolsByCategory,
  getToolUrl,
} from "@/lib/tools";
import { getArticlesForTool } from "@/lib/blog";

interface CategoryPageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.id }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategoryById(params.category);
  if (!category) return {};
  return buildHubMetadata({
    title: `Alat ${category.name} Online Gratis`,
    description: category.description,
    path: `/tools/${category.id}`,
    keywords: [`alat ${category.name.toLowerCase()}`, "online gratis"],
  });
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryById(params.category);
  if (!category) notFound();

  const tools = getToolsByCategory(category.id);
  const articles = tools.flatMap((tool) => getArticlesForTool(tool.slug));

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Alat", path: "/tools" },
    { name: category.name, path: `/tools/${category.id}` },
  ]);
  const itemListJsonLd = buildItemListJsonLd(
    tools.map((tool) => ({ name: tool.headline, path: getToolUrl(tool) }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/tools" className="hover:text-foreground focus-ring rounded">
            Alat
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{category.name}</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Alat {category.name}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {category.description}
          </p>
        </header>

        <AdSlot slot={`category-top-${category.id}`} format="banner" className="mt-8" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Card
              key={tool.slug}
              size="2"
              className="group transition-shadow hover:shadow-md"
            >
              <h2 className="text-base font-semibold leading-snug">
                {tool.headline}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {tool.description}
              </p>
              <Link
                href={getToolUrl(tool)}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:underline focus-ring rounded"
              >
                Buka alat
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>

        {articles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-semibold">Panduan terkait</h2>
            <div className="mt-4 space-y-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/40 focus-ring"
                >
                  <BookOpen
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block font-medium">{article.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground line-clamp-2">
                      {article.description}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
