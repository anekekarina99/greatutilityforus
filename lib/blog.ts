import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  tool?: string;
  content: string;
}

function parseBlogFile(filename: string): BlogPost {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    updated: (data.updated as string) ?? undefined,
    author: (data.author as string) ?? "BMI Free Team",
    tags: (data.tags as string[]) ?? [],
    tool: (data.tool as string) ?? undefined,
    content,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parseBlogFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  return parseBlogFile(`${slug}.mdx`);
}

export function getFeaturedPosts(limit = 2): BlogPost[] {
  return getAllBlogPosts().slice(0, limit);
}

export function getArticlesForTool(toolSlug: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.tool === toolSlug);
}
