import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@radix-ui/themes";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  buildBreadcrumbJsonLd,
  buildHubMetadata,
  buildItemListJsonLd,
} from "@/lib/seo";
import {
  CATEGORIES,
  getAllTools,
  getToolsByCategory,
  getToolUrl,
} from "@/lib/tools";

export const metadata = buildHubMetadata({
  title: "Semua Alat Online Gratis",
  description:
    "Daftar lengkap alat BMI Free — gambar, kalkulator, dan utility harian. Gratis, tanpa daftar, diproses langsung di browser.",
  path: "/tools",
  keywords: ["alat online gratis", "utility tools", "kalkulator online", "tools gambar"],
});

export default function ToolsHubPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Alat", path: "/tools" },
  ]);
  const itemListJsonLd = buildItemListJsonLd(
    getAllTools().map((tool) => ({
      name: tool.headline,
      path: getToolUrl(tool),
    }))
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
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Semua alat
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Pilih alat yang Anda butuhkan — semua gratis dan berjalan langsung di
            browser, tanpa upload ke server.
          </p>
        </header>

        <AdSlot slot="tools-hub-top" format="banner" className="mt-8" />

        {CATEGORIES.map((category) => {
          const tools = getToolsByCategory(category.id);
          return (
            <section key={category.id} className="mt-12">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <Link
                  href={`/tools/${category.id}`}
                  className="hidden text-sm font-medium text-primary hover:underline focus-ring rounded sm:inline-flex"
                >
                  Lihat kategori
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                  <Card
                    key={tool.slug}
                    size="2"
                    className="group transition-shadow hover:shadow-md"
                  >
                    <h3 className="text-base font-semibold leading-snug">
                      {tool.headline}
                    </h3>
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
            </section>
          );
        })}
      </div>
    </>
  );
}
