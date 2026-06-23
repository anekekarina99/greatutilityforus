import { buildPageTitle } from "@/lib/seo";

export const metadata = {
  title: buildPageTitle("Kontak"),
  description: "Hubungi tim BMI Free untuk pertanyaan, saran, atau laporan bug.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Hubungi kami</h1>
      <p className="mt-4 text-muted-foreground">
        Punya saran alat baru, laporan bug, atau pertanyaan privasi? Kami ingin mendengar Anda.
      </p>

      <div className="mt-8 rounded-xl border bg-card p-6 shadow-card">
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Email</dt>
            <dd className="mt-1">
              <a
                href="mailto:hello@bmifree.com"
                className="text-primary hover:underline focus-ring rounded"
              >
                hello@bmifree.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Waktu respons</dt>
            <dd className="mt-1 text-foreground">
              Biasanya 1–3 hari kerja
            </dd>
          </div>
        </dl>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        BMI Free tidak menerima file via email. Semua alat berjalan di browser —
        tidak perlu mengirim gambar ke kami.
      </p>
    </div>
  );
}
