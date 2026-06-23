import { buildPageTitle } from "@/lib/seo";

export const metadata = {
  title: buildPageTitle("Syarat & Ketentuan"),
  description: "Syarat penggunaan BMI Free — alat online gratis untuk gambar.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 prose prose-neutral dark:prose-invert">
      <h1>Syarat & Ketentuan</h1>
      <p className="lead text-muted-foreground">
        Terakhir diperbarui: Juni 2026
      </p>

      <h2>Penerimaan syarat</h2>
      <p>
        Dengan menggunakan BMI Free, Anda setuju dengan syarat ini. Jika tidak setuju,
        mohon hentikan penggunaan situs.
      </p>

      <h2>Penggunaan alat</h2>
      <ul>
        <li>Alat disediakan &quot;apa adanya&quot; tanpa jaminan hasil tertentu.</li>
        <li>Anda bertanggung jawab atas file yang Anda proses dan gunakan.</li>
        <li>Dilarang menggunakan alat untuk konten ilegal atau melanggar hak cipta.</li>
      </ul>

      <h2>Disclaimer</h2>
      <p>
        BMI Free bukan penggihan layanan profesional (desain, legal, finansial).
        Hasil alat — termasuk ukuran foto paspor — bersifat bantu. Verifikasi
        selalu dengan sumber resmi terkait.
      </p>

      <h2>Batas tanggung jawab</h2>
      <p>
        Kami tidak bertanggung jawab atas kerugian langsung atau tidak langsung
        akibat penggunaan alat, termasuk penolakan dokumen karena spesifikasi foto.
      </p>

      <h2>Perubahan</h2>
      <p>
        Syarat dapat diubah sewaktu-waktu. Perubahan material akan diumumkan di
        halaman ini.
      </p>
    </div>
  );
}
