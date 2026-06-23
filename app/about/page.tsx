import Link from "next/link";
import { buildPageTitle } from "@/lib/seo";
import { getAllTools, getToolUrl } from "@/lib/tools";

export const metadata = {
  title: buildPageTitle("Tentang BMI Free"),
  description: "BMI Free — alat online gratis untuk gambar. Privasi-first, tanpa daftar, diproses di browser.",
};

export default function AboutPage() {
  const tools = getAllTools();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Alat praktis, privasi terjaga
      </h1>
      <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          BMI Free adalah kumpulan alat online gratis untuk kebutuhan sehari-hari —
          mulai dari resize foto Instagram, kompres gambar, hingga konversi format.
        </p>
        <p>
          Berbeda dengan alat online pada umumnya, kami <strong className="text-foreground">tidak mengunggah file Anda ke server</strong>.
          Semua pemrosesan terjadi di browser menggunakan teknologi Canvas modern.
          Artinya: lebih cepat, lebih privat, dan tidak perlu khawatir data bocor.
        </p>
        <p>
          Tidak perlu daftar, tidak ada watermark, tidak ada batas harian.
          Cukup buka halaman alat, unggah file, dan unduh hasilnya.
        </p>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Alat yang tersedia</h2>
      <ul className="mt-4 space-y-2">
        {tools.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={getToolUrl(tool)}
              className="text-primary hover:underline focus-ring rounded"
            >
              {tool.headline}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
