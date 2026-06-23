# BMI Free

Alat online gratis untuk gambar — resize, kompres, konversi, dan cek dimensi. Semua diproses di browser, tanpa upload ke server.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS 3** + shadcn/ui
- **next-mdx-remote** untuk blog MDX (tanpa backend)
- **JSON content** untuk halaman tool (SEO long-tail)
- **next-themes** dark mode (class strategy)
- **Canvas API** untuk pemrosesan gambar client-side

## Mulai cepat

```bash
# Install dependencies
npm install

# Development
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

```bash
# Production build
npm run build

# Jalankan production server lokal
npm start
```

## Deploy ke Vercel

1. Push repo ke GitHub/GitLab/Bitbucket
2. Import project di [vercel.com](https://vercel.com)
3. Framework preset: **Next.js** (auto-detect)
4. Set environment variable (opsional):

   ```
   NEXT_PUBLIC_SITE_URL=https://bmifree.com
   ```

5. Deploy — selesai.

Vercel akan menjalankan `npm run build` dan melayani static pages dari `generateStaticParams`.

## Struktur folder

```
web/
├── app/                          # App Router pages
│   ├── layout.tsx                # Root layout + Inter font + theme
│   ├── page.tsx                  # Homepage
│   ├── tools/[category]/[slug]/  # Dynamic tool pages
│   ├── blog/                     # Blog index + [slug]
│   ├── privacy/ terms/ about/ contact/
│   └── globals.css
├── components/
│   ├── ui/                       # shadcn: Button, Card, Input, etc.
│   ├── layout/                   # Header, Footer, ThemeProvider
│   ├── tools/                    # ToolShell, ImageTool engine
│   ├── ads/AdSlot.tsx            # Placeholder iklan
│   └── blog/MdxContent.tsx
├── content/
│   ├── tools/image/*.json        # Tool content (1 file = 1 URL)
│   └── blog/*.mdx                # Blog articles
├── lib/
│   ├── tools.ts                  # Tool registry + helpers
│   ├── seo.ts                    # Metadata + JSON-LD
│   ├── blog.ts                   # MDX file reader
│   ├── storage.ts                # localStorage prefs/history
│   └── utils.ts
└── public/
```

## Menambah tool baru

1. Buat JSON di `content/tools/image/nama-slug.json`
2. Import di `lib/tools.ts` → tambahkan ke array `ALL_TOOLS`
3. Deploy — URL `/tools/image/nama-slug` otomatis tersedia

Tidak perlu komponen baru selama mode sudah didukung `ImageTool` (`resize`, `compress`, `convert`, `dimensions`).

## Menambah artikel blog

1. Buat file `content/blog/judul-artikel.mdx` dengan frontmatter YAML
2. Gunakan internal link: `[teks](/tools/image/slug)`
3. Artikel muncul otomatis di `/blog`

## Arsitektur SEO

- Setiap tool page: unique `title`, `description`, H1 (`headline`), intro, tutorial, FAQ (4), related tools (3)
- JSON-LD: `SoftwareApplication` + `FAQPage`
- Blog: JSON-LD `Article` + internal links ke tool pages

## Privasi

File gambar **tidak pernah diunggah**. Pemrosesan 100% client-side via Canvas API. localStorage opsional untuk tema dan riwayat alat.

## Lisensi

MIT
