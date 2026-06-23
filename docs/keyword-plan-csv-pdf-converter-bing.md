# Keyword Plan — CSV ⇄ PDF Converter (Bing-focused)

> Dokumen ini KHUSUS riset keyword Bing untuk pasangan tool `csv to pdf` dan `pdf to csv`.
> Sumber data: Bing autosuggest (alphabet-soup scrape) seed `csv to pdf` dan `pdf to csv`.
> Status: draft riset, BELUM divalidasi volume. Validasi wajib di Microsoft Advertising Keyword Planner sebelum produksi.

## 1. Insight utama

Ada **dua arah konversi** dengan tingkat kesulitan teknis yang sangat berbeda:

- **CSV → PDF**: mudah dibuat 100% client-side (parse CSV → render tabel ke canvas/HTML → cetak PDF via jsPDF/pdf-lib). Cocok dengan filosofi situs (privasi, tanpa upload).
- **PDF → CSV**: SULIT. Butuh ekstraksi tabel dari PDF (text-layer parsing, deteksi kolom, kadang OCR untuk PDF hasil scan). Tidak realistis dibuat berkualitas tinggi sepenuhnya client-side untuk PDF kompleks/scan.

Implikasi strategi: **mulai dari `csv to pdf` dulu** (cepat, bisa client-side, intent jelas). `pdf to csv` ditunda atau dibatasi ke PDF dengan text layer + tabel sederhana, dengan ekspektasi yang jujur ke user.

## 2. Cluster keyword nyata

### CSV → PDF
| Intent | Keyword pendukung | Catatan |
|---|---|---|
| Head term | `csv to pdf`, `csv to pdf converter`, `csv to pdf online`, `csv to pdf free` | Core, kompetitif (ilovepdf, smallpdf, zamzar) |
| Gratis/online | `csv to pdf converter free`, `csv to pdf free online`, `csv to pdf online converter` | Intent transaksional sehat |
| Branded (jangan ditarget langsung) | `csv to pdf ilovepdf`, `csv to pdf adobe`, `csv to pdf zamzar` | Sinyal kompetitor, bukan target organik kita |
| Konteks fitur | `csv to pdf with formatting`, `csv to pdf without losing formatting`, `csv to pdf table`, `csv to pdf per page`, `csv to pdf large file` | Bahan FAQ + fitur produk |
| Ekosistem | `csv to pdf excel`, `csv to pdf google sheets`, `csv to pdf libreoffice` | Bisa jadi artikel "how to" pendukung |

### PDF → CSV
| Intent | Keyword pendukung | Catatan |
|---|---|---|
| Head term | `pdf to csv`, `pdf to csv converter`, `pdf to csv free`, `pdf to csv online` | Kompetitif |
| **High commercial intent** | `pdf to csv bank statement`, `pdf to csv bank statement converter`, `pdf to csv bank converter` | Nilai tinggi TAPI paling sulit (layout bank beragam) |
| Ekstraksi tabel | `pdf to csv excel`, `pdf to csv extractor`, `pdf to csv table converter` | Inti masalah teknis |
| Bulk | `pdf to csv bulk converter` | Butuh batch, effort tinggi |

## 3. Sinyal bahasa / pasar

| Bahasa | Sinyal keyword | Implikasi |
|---|---|---|
| Prancis | `csv to pdf gratuit`, `pdf to csv gratis` | Peluang varian `fr` |
| Jerman | `csv to pdf umwandeln` | Sinyal `de` |
| Global/EN | mayoritas | Basis `en` |

## 4. Noise yang dibuang

Jangan ditarget — artefak alphabet-soup:

- Programmer-only: `python`, `pandas`, `java`, `javascript`, `json`, `r script`, `matlab`, `nuget`, `django`, `maven`, `library`, `source code` — intent developer, bukan tool web sekali-klik.
- Preposisi/phrase junk: `beneath`, `amid`, `circa`, `unto`, `upon`, `besides`, `alongside`, `despite`, `underneath`, `upside down`, `worth it`, `near me`.
- Salah ketik/entitas: `hsv to pdx flights`, `acv to pdx`, `vs cdf`, `94fbr`, `yuzu`.

## 5. Peringatan kompetisi

1. SERP `csv to pdf` / `pdf to csv` dikuasai brand besar: **ilovepdf, smallpdf, adobe, zamzar, convertio**.
2. Mereka punya domain authority tinggi + fitur lengkap (batch, OCR, cloud).
3. Diferensiasi kita: **100% client-side untuk CSV→PDF** (privasi, tanpa upload, instan) — ini angle jujur dan kuat untuk konten + trust.

## 6. Prioritas halaman yang disarankan

1. **CSV to PDF Converter** (BUILD DULU)
   Target: `csv to pdf`, `csv to pdf converter`, `csv to pdf online free`, `csv to pdf with formatting`
   Alasan: bisa client-side, intent jelas, selaras privasi situs.

2. **PDF to CSV (text-based)** (FASE 2, opsional)
   Target: `pdf to csv`, `pdf to csv excel`, `pdf to csv table`
   Batasan jujur: hanya PDF dengan text layer + tabel sederhana; bukan scan/OCR.

3. **PDF Bank Statement to CSV** (FASE 3, hati-hati)
   Target: `pdf to csv bank statement`
   Catatan: nilai komersial tinggi tapi paling sulit + sensitif (data finansial). Pertimbangkan hanya jika bisa benar-benar akurat & privat.

## 7. Title / meta draft (CSV → PDF)

- Title: `CSV to PDF Converter — Free, Online, No Upload`
- Meta: `Convert CSV to a clean PDF table directly in your browser. Free, no signup, files never leave your device. Keep formatting, set page layout.`

## 8. Langkah berikutnya

1. Validasi `csv to pdf converter` & `pdf to csv bank statement` di Microsoft Advertising Keyword Planner.
2. Build `csv to pdf` sebagai tool kategori baru (mis. `convert` / `document`).
3. Tunda `pdf to csv` sampai solusi ekstraksi tabel matang.
