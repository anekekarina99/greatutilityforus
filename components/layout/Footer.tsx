import Link from "next/link";
import { getSiteConfig } from "@/lib/seo";

const footerLinks = {
  alat: [
    { href: "/tools", label: "Semua Alat" },
    { href: "/tools/image/resize-for-instagram", label: "Resize Instagram" },
    { href: "/tools/image/compress-under-5mb", label: "Kompres Gambar" },
    { href: "/tools/image/jpg-to-png", label: "JPG ke PNG" },
  ],
  perusahaan: [
    { href: "/about", label: "Tentang" },
    { href: "/contact", label: "Kontak" },
    { href: "/blog", label: "Blog" },
  ],
  legal: [
    { href: "/privacy", label: "Privasi" },
    { href: "/terms", label: "Syarat" },
  ],
};

export function Footer() {
  const { name } = getSiteConfig();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-1">
            <p className="font-semibold">{name}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Alat online gratis. File diproses di perangkat Anda — tidak diunggah ke server.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium">Alat Populer</p>
            <ul className="mt-3 space-y-2">
              {footerLinks.alat.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground focus-ring rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium">Perusahaan</p>
            <ul className="mt-3 space-y-2">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground focus-ring rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium">Legal</p>
            <ul className="mt-3 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground focus-ring rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          © {year} {name}. Semua alat berjalan di browser — privasi Anda terjaga.
        </p>
      </div>
    </footer>
  );
}
