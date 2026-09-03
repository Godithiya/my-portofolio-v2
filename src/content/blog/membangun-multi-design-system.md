---
# =========================================================================
# CASE STUDY, nilai showcase tinggi (PRD F7). Konten REAL, bukan dummy.
# =========================================================================
title: 'Membangun Portofolio Multi-Design-System dengan Astro + Tailwind v4'
description: 'Anatomi situs portofolio yang bisa ganti 4 tema visual secara instan, token CSS, anti-FOUC, dan disiplin 0 JS framework.'
pubDate: 2026-09-02
tags: ['astro', 'tailwind', 'design-system', 'frontend']
draft: false
---

Portofolio biasanya menampilkan daftar project. Situs ini mencoba hal lain: **situsnya sendiri adalah project-nya**. Satu markup, empat design-system utuh: Swiss Minimalist, Modern Dark, Neo Brutalism, Neumorphism, yang bisa dipilih pengunjung secara instan tanpa reload. Tulisan ini membedah cara membangunnya.

## Aturan main: tema = CSS, bukan JavaScript

Keputusan arsitektur paling penting: **pergantian tema tidak boleh menjalankan logika JS apa pun**. Tidak ada `if (theme === 'dark')` di komponen. Konsekuensinya, menambah tema baru tidak pernah menyentuh komponen konten, cukup satu blok CSS baru.

Mekanismenya: atribut `data-theme` di `<html>`, lalu satu blok selector per tema:

```css
[data-theme='modern-dark'] {
  color-scheme: dark;
  --background: #050506;
  --foreground: #ededf0;
  --accent: #5e6ad2;
  /* ...35 variabel lagi... */
}
```

Semua komponen memakai utilitas semantik (`bg-background`, `text-muted-foreground`, `border-border`) yang dipetakan Tailwind v4 lewat `@theme inline`. Utilitas itu resolve `var()` saat runtime, jadi swap atribut = swap seluruh identitas visual.

## Jebakan #1: benturan token dengan shadcn

Versi awal punya bug senyap: `@theme inline` shadcn mendeklarasikan ulang `--color-background: var(--background)`, menimpa kontrak token yang ada. Hasilnya: klik ganti tema hanya mengubah radius dan shadow, warna tidak bergerak.

Pelajarannya: **jangan punya dua sumber kebenaran**. Solusinya, setiap blok `[data-theme]` mendefinisikan langsung set variabel semantik lengkap, dan `@theme` hanya memetakan, bukan mendefinisikan nilai.

## Jebakan #2: FOUC saat load

Tema tersimpan di `localStorage`, tapi HTML statis sudah ter-render sebelum JS jalan. Tanpa langkah ekstra, pengunjung tema gelap akan melihat kedipan putih setiap pindah halaman.

Solusinya tiga lapis:

1. `<html data-theme="swiss-minimalist">`, default server-rendered, aman tanpa JS.
2. Script inline kecil di `<head>` (sebelum paint) membaca `localStorage` dan memperbaiki atribut, dibungkus `try/catch` karena browser dengan cookie diblokir bisa melempar `SecurityError`.
3. Whitelist tema diinjeksi dari satu modul TypeScript via `define:vars`, script inline dan switcher tidak mungkin berbeda daftar.

## 0 JS framework, tetap interaktif

Satu-satunya komponen interaktif adalah pemilih tema, dan ia sengaja **bukan** island React. Cukup `<select>` native + sepuluh baris script inline. Hasilnya: nol byte framework di setiap halaman, tanpa hydration delay, dan aksesibilitas keyboard gratis dari platform.

Animasi halus (blob ambient di tema dark, star berputar di neo brutalism) murni CSS keyframe, seluruhnya tunduk pada `prefers-reduced-motion`.

## Identitas per tema tanpa duplikasi markup

Hero yang sama tampil berbeda di tiap tema hanya lewat CSS:

| Tema | Perlakuan hero |
| --- | --- |
| Swiss Minimalist | Tipografi 900 uppercase, bilah merah, grid 24px, lingkaran Bauhaus |
| Modern Dark | Teks gradient, glow radial, label monospace |
| Neo Brutalism | Stiker kuning miring, highlight box, star outline berputar |
| Neumorphism | Panel extruded, lingkaran konsentris inset |

Pola yang sama berlaku untuk navbar, select, bahkan marker timeline. Tidak ada satu pun `data-theme` conditional di file `.astro`.

## Detail kecil yang sering lolos

Beberapa bug yang baru ketahuan setelah di-audit:

- **Zona waktu build machine.** `pubDate` yang di-parse sebagai waktu lokal lalu ditampilkan dalam UTC menggeser tanggal mundur satu hari. Solusinya: schema hanya menerima `YYYY-MM-DD`, dinormalisasi ke tengah hari UTC.
- **Draft harus benar-benar tidak dibangun**, bukan sekadar disembunyikan di list, tapi juga hilang dari RSS, sitemap, dan `getStaticPaths`.
- **Code block per tema.** Shiki di-set dual-theme; blok kode ikut gelap hanya di tema gelap lewat variabel `--shiki-dark`.

## Penutup

Total JS framework di situs ini: nol. Semua "keajaiban" ganti tema berdiri di atas fitur CSS yang sudah ada sejak lama, custom property dan selector atribut. Kadang batasan justru fitur: dengan melarang JS menyentuh tema, sistemnya jadi lebih sederhana, lebih cepat, dan mustahil drift antar tema.

Kode lengkapnya ada di [repo GitHub](https://github.com/Godithiya/my-portofolio-v2), silakan bedah.
