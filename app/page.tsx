import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { Badge, Button, Card } from "@radix-ui/themes";
import { getFeaturedPosts } from "@/lib/blog";
import { buildPageTitle, getSiteConfig } from "@/lib/seo";
import {
  CATEGORIES,
  getToolsByCategory,
  getToolUrl,
} from "@/lib/tools";

export const metadata = {
  title: buildPageTitle("Alat Online Gratis untuk Gambar"),
  description: getSiteConfig().description,
};

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(2);

  return (
    <>
      <section className="border-b bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Ubah gambar dalam hitungan detik
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Alat online gratis — tanpa daftar, tanpa upload ke server.
            File diproses langsung di perangkat Anda.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="3">
              <Link href="/tools/image/resize-for-instagram">Resize Instagram</Link>
            </Button>
            <Button asChild size="3" variant="soft">
              <Link href="/tools/image/compress-under-5mb">Kompres gambar</Link>
            </Button>
          </div>
        </div>
      </section>

      <AdSlot slot="home-top" format="banner" className="mx-auto mt-8 max-w-6xl px-4" />

      <section id="tools" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Alat berdasarkan kategori
          </h2>
          <p className="mt-2 text-muted-foreground">
            Pilih alat yang Anda butuhkan — semua gratis dan berjalan di browser.
          </p>
        </div>

        {CATEGORIES.map((category) => {
          const tools = getToolsByCategory(category.id);
          return (
            <div key={category.id} className="mt-12">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ImageIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
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
            </div>
          );
        })}
      </section>

      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Artikel terbaru</h2>
              <p className="mt-1 text-muted-foreground">
                Tips dan panduan praktis seputar gambar.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden text-sm font-medium text-primary hover:underline sm:inline-flex focus-ring rounded"
            >
              Lihat semua
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {featuredPosts.map((post) => (
              <Card key={post.slug} size="2" className="transition-shadow hover:shadow-md">
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="soft">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="mt-3 text-lg font-semibold">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary focus-ring rounded"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{post.description}</p>
                <time
                  dateTime={post.date}
                  className="mt-4 block text-xs text-muted-foreground"
                >
                  {new Date(post.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
