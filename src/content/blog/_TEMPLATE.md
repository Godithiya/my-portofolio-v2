---
# =========================================================================
# TEMPLATE ARTIKEL BLOG — Cara pakai:
# 1. Duplikat file ini, rename jadi judul-artikel-kamu.md
#    (huruf kecil, tanda hubung; nama file jadi URL /blog/judul-artikel-kamu)
# 2. Isi semua field di bawah. Hapus blok komentar ini setelah selesai.
# 3. Body markdown (di bawah ---) adalah isi artikel.
# 4. Ekstensi .mdx juga bisa — dipakai kalau mau menyisipkan komponen interaktif.
# =========================================================================

# WAJIB — judul artikel
title: "Judul Artikel Kamu"

# WAJIB — deskripsi maksimal 160 karakter (dipakai untuk SEO & kartu blog)
description: "Ringkasan 1 kalimat tentang isi artikel ini."

# WAJIB — tanggal publish, format YYYY-MM-DD
pubDate: 2026-09-01

# OPSIONAL — tanggal terakhir diupdate. Hapus kalau belum pernah diupdate.
# updatedDate: 2026-09-10

# OPSIONAL — tags artikel (array of string). Default [] kalau dihapus.
tags: ["astro", "frontend"]

# OPSIONAL — true = artikel TIDAK ikut di-build production sama sekali.
#            Default false. Dipakai untuk draft yang belum siap.
draft: false

# OPSIONAL — gambar hero. Path publik (default upload CMS: public/images).
# heroImage: "/images/nama-gambar.jpg" (upload via CMS otomatis masuk sini, atau taruh manual di public/images)

# OPSIONAL — teks alt gambar hero (aksesibilitas). Kalau kosong, fallback = judul artikel.
# heroImageAlt: "Deskripsi singkat isi gambar hero"
---

Tulis pembuka artikel di sini — 1-2 paragraf yang menjelaskan apa yang akan dibaca pembaca.

## Sub-Judul Pertama

Isi bagian pertama. Gunakan paragraf pendek dan list supaya mudah discan.

## Sub-Judul Kedua

Isi bagian kedua. Kode bisa disisipkan dengan fenced code block:

```ts
const contoh = "hello world";
```

## Kesimpulan

Rangkum poin utama dan ajak pembaca beraksi (komentar, coba sendiri, kontak).
