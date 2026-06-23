# Keyword Plan — Poetry Generator (Bing-focused)

> Dokumen ini KHUSUS riset keyword Bing untuk cluster `poetry generator`.
> Sumber data: Bing autosuggest (alphabet-soup scrape) seed `poetry generator`.
> Status: draft riset, BELUM divalidasi volume. Validasi wajib di Microsoft Advertising Keyword Planner sebelum produksi.

## 1. Insight utama

`poetry generator` punya intent kuat tapi **kualitas output adalah taruhannya**. Dua pendekatan:

- **Template / mad-libs (client-side)**: user isi kata kunci (tema, kata benda, suasana) → tool merangkai puisi dari pola. Cepat, privat, tanpa biaya API. Tapi output terasa "mekanis".
- **AI/LLM (server-side)**: kualitas jauh lebih baik (`poetry generator ai` adalah keyword #2), tapi butuh API berbayar + backend, melanggar pola "semua di browser".

Keyword `poetry generator ai` & `ai poetry generator` muncul sangat tinggi → **ekspektasi user condong ke AI**. Tool template murni bisa mengecewakan. Putuskan dulu pendekatannya sebelum build.

## 2. Cluster keyword nyata

| Intent | Keyword pendukung | Catatan |
|---|---|---|
| Head term | `poetry generator`, `poetry generator online`, `poetry generator free`, `poetry generator free online` | Core |
| AI | `poetry generator ai`, `ai poetry generator`, `ai poetry generator free`, `poetry generator ai free` | Sinyal ekspektasi AI sangat kuat |
| Edukasi | `poetry generator for students`, `poetry generator for kids`, `poetry generator for beginners`, `poetry generator 5th/6th/7th/8th/9th grade` | Segmen sekolah jelas & ramah long-tail |
| Jenis puisi | `slam poetry generator`, `poetry prompt generator`, `poetry generator by theme`, `poetry generator by famous poets` | Bisa jadi sub-tool/preset |
| Tema | `poetry generator about love`, `about life`, `about nature`, `about friendship`, `about heartbreak` | Bahan preset tema + landing |
| Bahasa | `poetry generator in spanish`, `in english`, `in hindi` | Sinyal multi-bahasa |

## 3. Noise yang dibuang

- **Kebingungan "generator" listrik**: `poetry generator vs synchronous generator`, `vs induction generator`, `versus gravity feed`, `versus segmentor` — ini orang salah cari mesin/genset. Buang.
- Preposisi/phrase junk: `beneath`, `amid`, `circa`, `unto`, `upon`, `besides`, `alongside`, `despite`, `underneath`, `upside down`, `till`, `unto the lord`.
- Brand/entitas acak: `post malone`, `come and see`, `down for maintenance`.
- Programmer: `poetry generator in python`, `in java`, `github`, `open source` (kecuali mau target dev — beda audiens).

## 4. Peringatan kompetisi

1. Banyak pemain AI besar (poem-generator.* , ChatGPT, dll.) sudah memenuhi `poetry generator ai`.
2. Tool template murni sulit menang di head term karena ekspektasi AI.
3. Peluang realistis ada di **long-tail edukasi**: `poetry generator for kids`, `for 5th grade`, `acrostic/haiku generator`, `rhyme/prompt generator` — intent spesifik, kompetisi lebih rendah, dan cocok pola template.

## 5. Prioritas halaman yang disarankan

1. **Poem Prompt / Idea Generator** (paling realistis client-side)
   Target: `poetry prompt generator`, `poetry generator ideas`, `poetry generator by theme`
   Alasan: template cocok, tidak menjanjikan "AI puisi sempurna".

2. **Haiku / Acrostic Generator** (micro-tool terstruktur)
   Alasan: format puisi punya aturan jelas → template terasa natural & berguna.

3. **Poetry Generator for Kids / Students**
   Target: `poetry generator for kids`, `for students`, `5th–9th grade`
   Alasan: long-tail edukasi, kompetisi lebih lunak.

4. **AI Poetry Generator** (FASE lanjut, butuh keputusan backend)
   Hanya jika siap pakai LLM API. Jangan paksa template ke slot ini.

## 6. Title / meta draft (prompt generator)

- Title: `Poetry Prompt & Idea Generator — Free, No Signup`
- Meta: `Get instant poetry prompts and starting lines by theme — love, nature, life. Free creative tool that runs in your browser, great for students and beginners.`

## 7. Langkah berikutnya

1. Putuskan: template client-side vs AI backend (ini menentukan kelayakan).
2. Validasi `poetry prompt generator`, `haiku generator`, `poetry generator for kids` di Keyword Planner.
3. Kalau template: mulai dari haiku/acrostic/prompt (paling jujur secara kualitas).
