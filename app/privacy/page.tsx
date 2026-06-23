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
        Terakhir diperbarui: Juni 2026
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
        Situs ini tidak menggunakan cookies pelacakan. Preferensi tema disimpan
        melalui localStorage browser.
      </p>

      <h2>Iklan</h2>
      <p>
        Ruang iklan (AdSlot) adalah placeholder. Jika iklan pihak ketiga diaktifkan
        di masa depan, kebijakan ini akan diperbarui sesuai kebijakan penyedia iklan.
      </p>

      <h2>Kontak</h2>
      <p>
        Pertanyaan privasi? Hubungi kami melalui halaman{" "}
        <a href="/contact">Kontak</a>.
      </p>
    </div>
  );
}
