import { ImageResponse } from "next/og";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import { getSiteConfig } from "@/lib/seo";

export const alt = "BMI Free artikel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

interface Props {
  params: { slug: string };
}

export default function OpengraphImage({ params }: Props) {
  const post = getBlogPost(params.slug);
  const { name } = getSiteConfig();
  const title = post?.title ?? "Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "#a5b4fc" }}>
          {name} · Blog
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
      </div>
    ),
    { ...size }
  );
}
