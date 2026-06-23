export type ImageToolMode = "resize" | "compress" | "convert" | "dimensions";
export type CalculatorToolMode = "compound-interest";
export type ConverterToolMode = "csv-to-pdf" | "pdf-to-csv";
export type GeneratorToolMode = "pet-name";
export type ToolMode = ImageToolMode | CalculatorToolMode | ConverterToolMode | GeneratorToolMode;

export interface ToolPreset {
  width?: number;
  height?: number;
  maxSizeMB?: number;
  format?: "jpeg" | "png" | "webp";
  quality?: number;
  principal?: number;
  rate?: number;
  years?: number;
  contribution?: number;
  contributionFrequency?: "monthly" | "yearly";
  compoundingFrequency?: "daily" | "weekly" | "monthly" | "quarterly" | "semiannually" | "annually";
  currency?: "USD" | "CAD" | "IDR" | "INR" | "EUR" | "GBP";
  delimiter?: "auto" | "comma" | "semicolon" | "tab";
  orientation?: "portrait" | "landscape";
  pageSize?: "a4" | "letter" | "legal";
  hasHeader?: boolean;
  sample?: string;
  animal?: "cat" | "dog";
  count?: number;
  label?: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolTutorial {
  title: string;
  steps: string[];
}

export interface ToolContent {
  slug: string;
  category: string;
  title: string;
  description: string;
  headline: string;
  subhead: string;
  cta: string;
  mode: ToolMode;
  presets: ToolPreset;
  intro: string[];
  tutorial: ToolTutorial;
  faq: ToolFaq[];
  relatedTools: string[];
  disclaimer?: string;
  keywords?: string[];
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const CATEGORIES: ToolCategory[] = [
  {
    id: "image",
    name: "Gambar",
    description: "Ubah ukuran, kompres, dan konversi foto langsung di browser.",
    icon: "Image",
  },
  {
    id: "finance",
    name: "Keuangan",
    description: "Hitung bunga, pertumbuhan investasi, dan skenario tabungan langsung di browser.",
    icon: "Calculator",
  },
  {
    id: "convert",
    name: "Konversi",
    description: "Ubah dan konversi file dokumen langsung di browser, tanpa upload ke server.",
    icon: "FileText",
  },
  {
    id: "generator",
    name: "Generator",
    description: "Buat nama, ide, dan teks acak secara instan langsung di browser.",
    icon: "Sparkles",
  },
];

export const CATEGORY_ENGINES: Record<string, string> = {
  image: "ImageTool",
  finance: "CalculatorTool",
  convert: "ConverterTool",
  generator: "NameGeneratorTool",
};

import resizeForInstagram from "@/content/tools/image/resize-for-instagram.json";
import passportPhotoSize from "@/content/tools/image/passport-photo-size.json";
import compressUnder5mb from "@/content/tools/image/compress-under-5mb.json";
import jpgToPng from "@/content/tools/image/jpg-to-png.json";
import imageDimensionsCalculator from "@/content/tools/image/image-dimensions-calculator.json";
import compoundInterestCalculator from "@/content/tools/finance/compound-interest-calculator.json";
import csvToPdf from "@/content/tools/convert/csv-to-pdf.json";
import pdfToCsv from "@/content/tools/convert/pdf-to-csv.json";
import catNameGenerator from "@/content/tools/generator/cat-name-generator.json";
import dogNameGenerator from "@/content/tools/generator/dog-name-generator.json";

const ALL_TOOLS: ToolContent[] = [
  resizeForInstagram,
  passportPhotoSize,
  compressUnder5mb,
  jpgToPng,
  imageDimensionsCalculator,
  compoundInterestCalculator,
  csvToPdf,
  pdfToCsv,
  catNameGenerator,
  dogNameGenerator,
] as ToolContent[];

export function getAllTools(): ToolContent[] {
  return ALL_TOOLS;
}

export function getToolsByCategory(category: string): ToolContent[] {
  return ALL_TOOLS.filter((t) => t.category === category);
}

export function getTool(category: string, slug: string): ToolContent | undefined {
  return ALL_TOOLS.find((t) => t.category === category && t.slug === slug);
}

export function getToolBySlug(slug: string): ToolContent | undefined {
  return ALL_TOOLS.find((t) => t.slug === slug);
}

export function getRelatedTools(slugs: string[]): ToolContent[] {
  return slugs
    .map((slug) => ALL_TOOLS.find((t) => t.slug === slug))
    .filter((t): t is ToolContent => t !== undefined);
}

export function getAllToolPaths(): { category: string; slug: string }[] {
  return ALL_TOOLS.map((t) => ({ category: t.category, slug: t.slug }));
}

export function getToolUrl(tool: Pick<ToolContent, "category" | "slug">): string {
  return `/tools/${tool.category}/${tool.slug}`;
}

export function getCategoryById(id: string): ToolCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
