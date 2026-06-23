import { notFound } from "next/navigation";
import { ToolShell } from "@/components/tools/ToolShell";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildSoftwareApplicationJsonLd,
  buildToolMetadata,
} from "@/lib/seo";
import { getAllToolPaths, getCategoryById, getTool } from "@/lib/tools";
import { getArticlesForTool } from "@/lib/blog";

interface ToolPageProps {
  params: { category: string; slug: string };
}

export async function generateStaticParams() {
  return getAllToolPaths();
}

export async function generateMetadata({ params }: ToolPageProps) {
  const tool = getTool(params.category, params.slug);
  if (!tool) return {};
  return buildToolMetadata(tool);
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getTool(params.category, params.slug);
  if (!tool) notFound();

  const category = getCategoryById(tool.category);
  const articles = getArticlesForTool(tool.slug);

  const softwareJsonLd = buildSoftwareApplicationJsonLd(tool);
  const faqJsonLd = buildFaqJsonLd(tool.faq);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Alat", path: "/tools" },
    { name: category?.name ?? tool.category, path: `/tools/${tool.category}` },
    { name: tool.headline, path: `/tools/${tool.category}/${tool.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ToolShell tool={tool} articles={articles} />
    </>
  );
}
