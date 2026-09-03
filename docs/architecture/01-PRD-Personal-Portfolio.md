# PRD — Personal Portfolio Website
**Product Requirements Document**
Versi: 1.0 | Status: Draft

---

## 1. Latar Belakang & Tujuan Produk

Personal portfolio website yang berfungsi ganda:
1. **Showcase karier** — menampilkan project, pengalaman, dan tulisan (blog) pemilik situs.
2. **Showcase kemampuan desain/frontend** — fitur utama yang membedakan situs ini dari portofolio pada umumnya adalah **sistem multi design-system yang bisa di-switch oleh pengunjung** (mis. Swiss Minimalist, Modern Dark, Neo Brutalism, Neumorphism, Art Deco, dst).

> Catatan penting: karena tujuan #2 adalah untuk memamerkan kemampuan desain, fitur multi-tema ini **bukan** fitur pelengkap — ini adalah bagian dari value proposition utama produk. Prioritaskan kualitas & konsistensi tiap tema di atas jumlah tema.

## 2. Masalah yang Diselesaikan

- Portofolio developer/desainer umumnya terlihat generik (template-based) dan sulit membuktikan kemampuan desain secara langsung.
- Recruiter/klien butuh cara cepat menilai rentang kemampuan estetika, bukan cuma membaca daftar skill di CV.

## 3. Target Pengguna (User Personas)

| Persona | Kebutuhan | Perilaku |
|---|---|---|
| **Recruiter/HR** | Kesan profesional cepat, mudah cari kontak & CV | Scan cepat, waktu terbatas — butuh default tampilan netral & profesional |
| **Sesama developer/desainer** | Validasi teknis mendalam — kualitas kode, kualitas desain per tema | Eksplorasi lebih dalam, cek konsistensi antar tema |
| **Klien potensial (freelance)** | Bukti kualitas kerja & rentang gaya yang bisa dikerjakan | Melihat variasi tema sebagai portofolio gaya visual |
| **Pembaca blog** | Konten teknis/insight yang relevan | Datang dari search engine/social media ke satu artikel spesifik |

## 4. Ruang Lingkup (Scope)

### 4.1 In-Scope — Fase 1 (MVP)
- Halaman Home (profil singkat, highlight project)
- Halaman Projects (daftar karya)
- Blog (list + detail artikel), dikelola lewat Astro Content Collections (file Markdown/MDX di repo)
- Sistem multi design-system: **5 tema** di rilis pertama (lihat §6)
- Theme switcher yang persistent (tersimpan di browser pengunjung)
- Deploy otomatis (CI/CD) ke platform hosting gratis (Vercel/Netlify)

### 4.2 Out-of-Scope — Fase 1 (dipertimbangkan untuk fase berikutnya)
- 7 tema desain sisanya (Bauhaus, Luxury, Kinetic, Playful Geometric, Claymorphism, Professional — kecuali salah satu dijadikan tema struktural fase 1)
- CMS visual (headless CMS/UI form untuk nulis blog) — fase 1 tetap manual via file Markdown
- Autentikasi user, komentar blog, dashboard admin
- Multi-bahasa (i18n)

## 5. Fitur Utama

| # | Fitur | Prioritas |
|---|---|---|
| F1 | Halaman Home & Projects statis | Must-have |
| F2 | Blog berbasis Content Collections (MDX) | Must-have |
| F3 | Theme switcher — 5 tema fase 1 | Must-have |
| F4 | Persistensi pilihan tema (localStorage) + anti-flash saat load | Must-have |
| F5 | Komponen interaktif (shadcn/ui) di elemen yang relevan | Should-have |
| F6 | Animasi/3D (Motion, Three.js) sebagai island terpisah | Should-have |
| F7 | Blog case-study: "cara membangun sistem multi-tema ini" | Should-have (nilai showcase tinggi) |
| F8 | 1 tema struktural tambahan (Art Deco/Bauhaus) sebagai flex piece | Nice-to-have (fase 2) |

## 6. Daftar 5 Tema Fase 1 & Peran Masing-Masing

1. **Swiss Minimalist** — default/tema pertama dibuka. Netral, mudah dibaca, first-impression aman untuk recruiter yang terburu-buru.
2. **Modern Dark** — alternatif populer, low-effort tinggi-impact.
3. **Neo Brutalism** — pembeda visual yang tegas, murni token-based.
4. **Neumorphism** — menunjukkan penguasaan detail shadow/depth CSS.
5. *(Fase 2, opsional di fase 1 kalau waktu memungkinkan)* **Art Deco / Bauhaus** — tema struktural, bukti kemampuan di luar sekadar swap warna.

## 7. Alur Pengguna Tingkat Tinggi

1. Pengunjung membuka situs → tampil dengan tema default (Swiss Minimalist).
2. Pengunjung menjelajah Home/Projects/Blog seperti biasa.
3. Pengunjung melihat theme switcher (CTA jelas, mis. "Coba ganti gaya desain →").
4. Pengunjung memilih tema lain → seluruh situs berubah tampilan secara instan, konten tetap sama.
5. Pilihan tema tersimpan; kunjungan berikutnya tetap memakai tema terakhir dipilih.

## 8. Metrik Keberhasilan (Success Metrics)

- Lighthouse Performance score ≥ 90 di setiap tema (bukan cuma tema default).
- Waktu ganti tema terasa instan (< 100ms perceived, tanpa reload halaman).
- Tidak ada elemen UI yang "pecah" (broken layout/kontras buruk) di salah satu dari 5 tema.
- Situs live & dapat diakses publik (bukan cuma localhost).

## 9. Asumsi & Batasan

- Dikerjakan solo, di luar waktu kerja utama — timeline fleksibel, prioritas kualitas atas kecepatan.
- Hosting gratis (Vercel/Netlify) — batasan bandwidth/build minutes tier gratis harus diperhatikan.
- Tidak ada budget desain aset premium — ilustrasi/dekorasi (untuk tema struktural) dibuat sendiri atau pakai aset open-source/SVG custom.

## 10. Roadmap Fase

| Fase | Fokus |
|---|---|
| Fase 0 | Setup project, arsitektur token dasar |
| Fase 1 | 4 tema token-only + konten Home/Projects/Blog dasar |
| Fase 2 | 1 tema struktural (flex piece) |
| Fase 3 | Launch/deploy publik |
| Fase 4 | Konten blog reguler + case-study post |
| Fase 5 | Island interaktif (Motion/Three.js) + ekspansi tema sisanya |
