import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { MdxContent } from "@/components/blog/MdxContent";
import { Badge, Button, Separator } from "@radix-ui/themes";
import { AdSlot } from "@/components/ads/AdSlot";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import { getToolBySlug, getToolUrl } from "@/lib/tools";
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return buildArticleMetadata({
    title: post.title,
    description: post.description,
    slug: post.slug,
    date: post.date,
    updated: post.updated,
    tags: post.tags,
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const tool = post.tool ? getToolBySlug(post.tool) : undefined;

  const articleJsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.description,
    slug: post.slug,
    date: post.date,
    updated: post.updated,
    author: post.author,
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <header>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="soft">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.author}</span>
          </div>
        </header>

        <AdSlot slot={`blog-top-${post.slug}`} format="banner" className="mt-8" />

        <div className="mt-10">
          <MdxContent source={post.content} />
        </div>

        {tool && (
          <div className="mt-10 flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{tool.headline}</p>
              <p className="mt-1 text-sm text-muted-foreground">{tool.subhead}</p>
            </div>
            <Button asChild size="3" className="shrink-0">
              <Link href={getToolUrl(tool)}>
                {tool.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        )}

        <Separator size="4" className="my-10" />

        <p className="text-sm text-muted-foreground">
          <Link href="/blog" className="text-primary hover:underline focus-ring rounded">
            ← Kembali ke Blog
          </Link>
        </p>
      </article>
    </>
  );
}
