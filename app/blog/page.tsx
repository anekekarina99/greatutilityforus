import Link from "next/link";
import { Badge, Card } from "@radix-ui/themes";
import { getAllBlogPosts } from "@/lib/blog";
import { buildHubMetadata } from "@/lib/seo";

export const metadata = buildHubMetadata({
  title: "Blog",
  description:
    "Tips dan panduan praktis seputar gambar, resize, kompres, dan dokumen digital.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-4 text-muted-foreground">
          Panduan praktis dan tips seputar alat BMI Free.
        </p>
      </header>

      <div className="mt-12 space-y-6">
        {posts.map((post) => (
          <Card key={post.slug} size="3" className="transition-shadow hover:shadow-md">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="soft">
                  {tag}
                </Badge>
              ))}
            </div>
            <h2 className="mt-3 text-xl font-semibold">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-primary focus-ring rounded"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-1 text-muted-foreground">{post.description}</p>
            <time dateTime={post.date} className="mt-4 block text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {" · "}
              {post.author}
            </time>
          </Card>
        ))}
      </div>
    </div>
  );
}
