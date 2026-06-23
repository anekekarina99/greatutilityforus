# Keyword Plan — Compound Interest Calculator (Bing-focused)

> Dokumen ini KHUSUS riset keyword Bing untuk tool baru `compound-interest-calculator`.
> Sumber data: Bing autosuggest (alphabet-soup scrape) seed `compound interest calculator`.
> Status: draft riset, BELUM divalidasi volume. Validasi wajib di Microsoft Advertising Keyword Planner sebelum produksi.

## 1. Kenapa Bing (konteks)

- Data autosuggest yang dikumpulkan berasal dari **Bing**, bukan Google.
- Untuk angka volume Bing yang sahih, gunakan **Microsoft Advertising → Keyword Planner** (bukan Google Keyword Planner).
- Catatan penting: ranking SEO tetap SATU konten untuk Google + Bing. Plan ini fokus riset Bing, tapi konten finalnya melayani kedua mesin.
- Volume Bing biasanya jauh lebih kecil dari Google (~1/10–1/20), profil user cenderung desktop / Windows / usia lebih tua / pasar AS.

## 2. Primary keyword

- **`compound interest calculator`** → jadi title, H1 (`headline`), dan URL tool.
- URL rencana: `/tools/finance/compound-interest-calculator`

## 3. Cluster long-tail (sudah dibersihkan dari noise)

| Intent | Keyword | Dipakai untuk |
|---|---|---|
| Setoran rutin | with deposits, with monthly contributions, recurring deposit | Fitur input + FAQ |
| Frekuensi bunga | daily, monthly, annually, semi annually, continuously | Opsi dropdown di tool |
| Tujuan | to double your money, over time, to pay off loan/debt | Headline / intro |
| Lawan kata | compound vs simple interest, daily vs monthly | FAQ + artikel pendukung |
| Objek | on savings, on loan, on investment, credit card | Varian tool / related tools |
| Cara hitung | formula, how to calculate, by hand, without calculator | Tutorial + FAQ |
| Format/ekspor | excel, google sheets | Artikel blog pendukung (bukan tool) |
| Withdrawal | with withdrawals | Fitur lanjutan |

## 4. Sinyal geo / pasar (peluang lokalisasi)

| Negara/pasar | Sinyal di autosuggest | Implikasi |
|---|---|---|
| Indonesia | `indonesia`, `rupiah` | Sudah ada audiens ID — buat versi `id` (deposito/rupiah) |
| India | `inr`, `fd calculator`, `recurring deposit` | Intent "FD/RD" khas India, pasar besar |
| US | `401k`, `403b`, `457`, `529`, `s&p 500`, `voo`, `edward jones`, `dave ramsey`, `nerdwallet` | Intent pensiun/investasi |
| Canada | `near toronto`, `near ottawa`, `near vancouver`, `outside canada` | Target awal (Bing kuat di Canada) |
| UK | `uk`, `gcse`, `year 8` | Intent edukasi/sekolah |

> Catatan: istilah pensiun beda per negara — US (401k/403b/529), Canada (RRSP/TFSA), India (FD/RD), Indonesia (deposito). Jangan pukul rata.

## 5. Kandidat FAQ (dari modifier pertanyaan)

- How does compound interest work / how is it calculated?
- Compound vs simple interest — apa bedanya?
- Daily vs monthly compounding — mana lebih untung?
- How to calculate compound interest by hand (without a calculator)?
- Which compound interest formula to use?
- Is the compound interest result accurate?

## 6. Kebutuhan fitur tool (didorong keyword)

Keyword paling banyak menuntut fitur berikut, jadi tool jangan polos:

1. Input setoran rutin: **monthly contributions / deposits** (dan opsi withdrawals).
2. Pilihan **frekuensi compounding**: daily, monthly, quarterly, semi-annually, annually, continuously.
3. Output: future value, total interest, total principal, (opsional) tabel per tahun / grafik.
4. Mata uang fleksibel (USD, CAD, IDR/rupiah, INR) untuk dukung lokalisasi.

Formula inti:

```
A = P (1 + r/n)^(n·t)          // bunga majemuk dasar
// dengan setoran rutin (future value of a series) ditambahkan terpisah
```

## 7. Noise yang DIBUANG (jangan dipakai)

Semua suggestion mengandung: `beneath, unto, circa, amid, alongside, besides, behind, despite, upside down, santa, board games, xbox, z score, x axis, x y, opposite, outside the box`. Ini artefak generate autosuggest, bukan pencarian nyata.

## 8. Langkah berikutnya

1. Validasi volume cluster di **Microsoft Advertising Keyword Planner** (Location: Canada + pasar lain).
2. Cross-check di Google Keyword Planner sebagai pembanding.
3. Finalisasi: 1 primary + 5–8 long-tail per pasar/bahasa.
4. Bangun tool: kategori `finance` + engine `CalculatorTool` + konten JSON.
5. Lokalisasi mulai dari Indonesia (rupiah) & Canada, lalu India & US.

## 9. Arsitektur (catatan implementasi)

- Tambah kategori baru di `lib/tools.ts` → `CATEGORIES` (`finance`).
- Tambah engine map `CATEGORY_ENGINES.finance = "CalculatorTool"`.
- Generalisasi `ToolContent` (`mode`/`presets` saat ini khusus gambar) agar mendukung kalkulator.
- Routing `/tools/[category]/[slug]` sudah dinamis → otomatis jalan begitu konten + engine ada.
