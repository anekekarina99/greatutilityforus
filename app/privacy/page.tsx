import { buildPageTitle } from "@/lib/seo";

export const metadata = {
  title: buildPageTitle("Kebijakan Privasi"),
  description: "Kebijakan privasi BMI Free — bagaimana kami menangani data Anda.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 prose prose-neutral dark:prose-invert">
      <h1>Kebijakan Privasi</h1>
      <p className="lead text-muted-foreground">
        Terakhir diperbarui: Juli 2026
      </p>

      <h2>Ringkasan</h2>
      <p>
        BMI Free dirancang dengan privasi sebagai prioritas. Alat kami memproses file
        <strong> sepenuhnya di browser Anda</strong> — kami tidak menerima, menyimpan,
        atau mengakses file yang Anda unggah.
      </p>

      <h2>Data yang kami kumpulkan</h2>
      <ul>
        <li>
          <strong>File gambar:</strong> Tidak dikumpulkan. Pemrosesan terjadi lokal
          di perangkat Anda menggunakan Canvas API.
        </li>
        <li>
          <strong>localStorage:</strong> Kami dapat menyimpan preferensi tema dan
          riwayat alat (opsional) di browser Anda. Data ini tidak dikirim ke server.
        </li>
        <li>
          <strong>Analytics:</strong> Jika diaktifkan di masa depan, akan menggunakan
          data anonim agregat tanpa informasi pribadi.
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Kami menggunakan localStorage untuk preferensi tema (bukan cookie). Jika
        iklan pihak ketiga diaktifkan, penyedia iklan (misalnya Adsterra atau
        Google AdSense) dapat menempatkan cookie untuk menampilkan dan mengukur
        iklan. Anda dapat mengelola cookie melalui pengaturan browser Anda.
      </p>

      <h2>Iklan</h2>
      <p>
        Situs ini dapat menampilkan iklan dari jaringan pihak ketiga untuk
        mendukung layanan gratis. Penyedia yang mungkin digunakan:
      </p>
      <ul>
        <li>
          <strong>Adsterra</strong> —{" "}
          <a
            href="https://adsterra.com/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kebijakan privasi Adsterra
          </a>
        </li>
        <li>
          <strong>Google AdSense</strong> (jika diaktifkan) —{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kebijakan privasi Google
          </a>
        </li>
      </ul>
      <p>
        Iklan tidak mengakses file yang Anda proses di alat kami. Data gambar
        tetap diproses sepenuhnya di browser Anda.
      </p>

      <h2>Kontak</h2>
      <p>
        Pertanyaan privasi? Hubungi kami melalui halaman{" "}
        <a href="/contact">Kontak</a>.
      </p>
    </div>
  );
}
