# Keyword Plan — Random Generator (Google-focused)

> Dokumen ini KHUSUS riset keyword Google untuk cluster `random generator`.
> Sumber data: Google Keyword Planner, periode 1 Juni 2025 – 31 Mei 2026.
> Pasangan dokumen: `keyword-plan-random-generator-bing.md` (versi Bing).

## 0. Cara baca data Keyword Planner

- Kolom `Currency: IDR` = mata uang **akun Google Ads**, bukan penanda lokasi pencarian.
- Yang menentukan negara/bahasa adalah setting **Location** + **Language** saat export.
- `Avg. monthly searches` muncul sebagai angka kasar karena akun belum belanja iklan → pakai sebagai indikasi relatif.
- `Competition` = kompetisi iklan, bukan kesulitan SEO.

## 1. Insight utama

Data Google menunjukkan `random generator` adalah cluster sangat besar, tapi head term-nya terlalu kompetitif.

Head term volume besar:
- `random number generator` — sangat besar
- `rng generator`
- `random no generator`
- `rng number generator`
- `random gen`
- `number generator`
- `randomizer`
- `random number`
- `randompasswordgenerator`

Masalah:
1. Google punya widget bawaan untuk random number generator.
2. Banyak pemain besar seperti `random.org`.
3. Banyak keyword punya intent instan, bukan intent membaca konten.

Strategi: jangan mulai dari head term. Mulai dari long-tail spesifik yang bisa dilayani dengan halaman/tool jelas.

## 2. Keyword yang dibuang / ditunda

### Programmer / coding intent

Keyword berikut bukan target tool online umum karena user mencari kode atau dokumentasi:

- `java random`
- `javascript random number`
- `c# random`
- `csharp random`
- `golang random int`
- `numpy random`
- `nodejs random`
- `typescript random number`
- `flutter random number`
- `sql random number`
- `random number in python`
- `generate a random number in java`
- `create random number in javascript`

### Teori RNG / cryptography intent

Keyword berikut lebih cocok untuk artikel teknis, bukan tool pertama:

- `prng`
- `csprng`
- `mersenne twister`
- `linear congruential generator`
- `blum blum shub generator`
- `cryptographically secure random number generator`
- `hardware random number generator`
- `true random number generator`
- `trng`

## 3. Cluster paling bernilai — Pick a Number / Range

Ini cluster paling menarik dari data Google: intent user awam, volume berulang, dan lebih spesifik daripada head term.

Keyword inti:
- `pick a number between 1 and 10`
- `pick a number between 1 and 100`
- `choose a number between 1 and 10`
- `choose a number between 1 and 100`
- `pick a number 1 through 10`
- `pick a number 1 through 100`
- `number generator 1 to 10`
- `number generator 1 to 100`
- `random number picker 1 10`
- `random number picker 1 100`
- `number randomizer 1 10`
- `1 10 random number generator`
- `1 100 random number generator`

Rekomendasi tool:

**Random Number Generator by Range**

Fitur:
- Min / max number input
- Preset cepat: 1–10, 1–20, 1–100, 1–1000, 1–6
- Generate single number
- Generate multiple numbers
- Allow duplicates / no duplicates
- Copy result

URL rencana:
`/tools/random/random-number-generator`

## 4. Cluster bagus lain

| Cluster | Keyword inti | Catatan |
|---|---|---|
| Random picker / selector | `randomizer`, `random picker`, `random selector`, `list randomiser`, `random generator from list` | Cocok untuk memilih item dari daftar |
| Name picker from list | `name randomizer`, `random name picker from list`, `names in a hat generator`, `pick name out of hat`, `list of random names` | Bagus untuk classroom, raffle, giveaway |
| Password generator | `randompassword`, `randompasswordgenerator`, `random pw`, `random 8 character password` | Evergreen, harus punya pesan keamanan |
| Digit / PIN / code | `4 digit number generator`, `random 4 digit number`, `4 digit code generator`, `pin number generator` | Bisa jadi tool turunan |
| Raffle / lucky draw | `lucky draw number generator`, `raffle number generator`, `quick pick generator` | Bisa digabung ke random picker |
| Random date | `random date`, `random date generator`, `give me a random date` | Micro-tool tambahan |

## 5. Prioritas halaman versi Google

1. **Random Number Generator by Range**  
   Target utama: `pick a number between 1 and 10`, `pick a number between 1 and 100`, `random number generator`.

2. **Random Picker / Name Picker From List**  
   Target: `random picker`, `random selector`, `random name picker from list`, `name randomizer`.

3. **Random Password Generator**  
   Target: `randompasswordgenerator`, `randompassword`, `random pw`.

4. **4 Digit Number / PIN Generator**  
   Target: `4 digit number generator`, `random 4 digit number`, `4 digit code generator`.

5. **Random Date Generator**  
   Target: `random date generator`, `give me a random date`.

## 6. Suggested title / meta untuk halaman pertama

Title:
```
Random Number Generator — Pick a Number Between 1 and 10 or 1 and 100
```

Meta description:
```
Pick a random number between any range. Use quick presets like 1 to 10, 1 to 100, or set your own min and max. Free, instant, and browser-based.
```

## 7. Catatan strategi

- Untuk Google, prioritas berubah dari plan Bing: **range number generator** terlihat paling kuat.
- Wheel/spinner dan team generator tetap menarik, tapi tidak sekuat data Bing.
- Hindari membuat satu halaman `random generator` generik. Jadikan itu hub kategori.
- Jangan target keyword programmer di halaman tool umum.
- Tool ini bisa dibuat client-side sepenuhnya, cocok dengan arsitektur situs.

## 8. Langkah berikutnya

1. Jika masuk roadmap, buat kategori baru `random` atau `utility`.
2. Mulai dari `random-number-generator` karena data Google paling kuat.
3. Setelah stabil, turunkan halaman long-tail/preset seperti:
   - `pick-a-number-between-1-and-10`
   - `pick-a-number-between-1-and-100`
   - `random-4-digit-number-generator`
4. Bandingkan lagi dengan dokumen Bing sebelum menentukan urutan produksi final.
