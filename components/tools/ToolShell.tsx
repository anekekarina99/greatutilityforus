"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge, Card, Separator } from "@radix-ui/themes";
import { AdSlot } from "@/components/ads/AdSlot";
import { CalculatorTool } from "@/components/tools/CalculatorTool";
import { CsvToPdfTool } from "@/components/tools/CsvToPdfTool";
import { PdfToCsvTool } from "@/components/tools/PdfToCsvTool";
import { ImageTool } from "@/components/tools/ImageTool";
import { NameGeneratorTool } from "@/components/tools/NameGeneratorTool";
import type { ImageToolMode, ToolContent } from "@/lib/tools";
import { CATEGORY_ENGINES, getRelatedTools, getToolUrl } from "@/lib/tools";
import type { BlogPost } from "@/lib/blog";
import { ArrowRight, BookOpen } from "lucide-react";

interface ToolShellProps {
  tool: ToolContent;
  articles?: BlogPost[];
}

export function ToolShell({ tool, articles = [] }: ToolShellProps) {
  const related = getRelatedTools(tool.relatedTools);
  const engine = CATEGORY_ENGINES[tool.category];

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="text-center">
        <Badge variant="soft" className="mb-4 capitalize">
          {tool.category}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {tool.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {tool.subhead}
        </p>
      </header>

      <AdSlot slot={`tool-top-${tool.slug}`} format="banner" className="mt-8" />

      <section className="mt-8" aria-label="Alat">
        {engine === "ImageTool" && (
          <ImageTool tool={tool as ToolContent & { mode: ImageToolMode }} />
        )}
        {engine === "CalculatorTool" && tool.mode === "compound-interest" && (
          <CalculatorTool tool={tool as ToolContent & { mode: "compound-interest" }} />
        )}
        {engine === "ConverterTool" && tool.mode === "csv-to-pdf" && (
          <CsvToPdfTool tool={tool as ToolContent & { mode: "csv-to-pdf" }} />
        )}
        {engine === "ConverterTool" && tool.mode === "pdf-to-csv" && (
          <PdfToCsvTool tool={tool as ToolContent & { mode: "pdf-to-csv" }} />
        )}
        {engine === "NameGeneratorTool" && tool.mode === "pet-name" && (
          <NameGeneratorTool tool={tool as ToolContent & { mode: "pet-name" }} />
        )}
      </section>

      <AdSlot slot={`tool-mid-${tool.slug}`} format="rectangle" className="mt-8" />

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold">Tentang alat ini</h2>
        {tool.intro.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </section>

      <Separator size="4" className="my-10" />

      <section>
        <h2 className="text-xl font-semibold">{tool.tutorial.title}</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-muted-foreground">
          {tool.tutorial.steps.map((step, i) => (
            <li key={i} className="leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
      </section>

      <Separator size="4" className="my-10" />

      <section>
        <h2 className="text-xl font-semibold">Pertanyaan umum</h2>
        <Accordion type="single" collapsible className="mt-4 w-full">
          {tool.faq.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {tool.disclaimer && (
        <p className="mt-8 text-xs text-muted-foreground">{tool.disclaimer}</p>
      )}

      {articles.length > 0 && (
        <>
          <Separator size="4" className="my-10" />
          <section>
            <h2 className="text-xl font-semibold">Panduan & artikel terkait</h2>
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
        </>
      )}

      <Separator size="4" className="my-10" />

      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">Alat terkait</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map((relatedTool) => (
              <Card key={relatedTool.slug} size="2" className="transition-shadow hover:shadow-md">
                <h3 className="text-base font-semibold leading-snug">
                  {relatedTool.headline}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {relatedTool.description}
                </p>
                <Link
                  href={getToolUrl(relatedTool)}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline focus-ring rounded"
                >
                  Buka alat
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
