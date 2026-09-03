# SRS — Personal Portfolio Website
**Software Requirement Specification**
Versi: 1.0 | Status: Draft | Turunan dari: PRD v1.0

---

## 1. Functional Requirements

### 1.1 Content Management (Blog)

| ID | Requirement |
|---|---|
| FR-01 | Sistem HARUS membaca konten blog dari file `.md`/`.mdx` di `src/content/blog/` menggunakan Astro Content Collections. |
| FR-02 | Setiap entry blog HARUS divalidasi terhadap schema Zod sebelum build berhasil (lihat §2.1 Validasi). |
| FR-03 | Sistem HARUS generate satu halaman statis per entry blog secara otomatis (`getStaticPaths`), tanpa perlu routing manual. |
| FR-04 | Halaman list blog HARUS menampilkan entry terurut berdasarkan `pubDate` terbaru, dan HARUS mengecualikan entry dengan `draft: true`. |

### 1.2 Sistem Theming

| ID | Requirement |
|---|---|
| FR-10 | Sistem HARUS menyediakan minimal 5 tema visual yang dapat dipilih pengunjung (Fase 1). |
| FR-11 | Tema aktif HARUS diterapkan lewat atribut `data-theme` pada elemen `<html>`. |
| FR-12 | Pilihan tema pengunjung HARUS disimpan di `localStorage` dan tetap berlaku di kunjungan berikutnya (persistent). |
| FR-13 | Sistem HARUS menerapkan tema tersimpan **sebelum** hydration React terjadi (inline script di `<head>`), untuk mencegah flash tema salah (FOUC). |
| FR-14 | Jika nilai tema di `localStorage` tidak valid/dikenali, sistem HARUS fallback ke tema default (Swiss Minimalist) tanpa error. |
| FR-15 | Theme switcher HARUS dapat diakses dari semua halaman (persisten di layout/navbar). |

### 1.3 Komponen & Interaktivitas

| ID | Requirement |
|---|---|
| FR-20 | Komponen UI interaktif (button, dialog, dll.) HARUS menggunakan shadcn/ui berbasis React, di-mount sebagai island. |
| FR-21 | Setiap island HARUS menggunakan directive hydration yang sesuai konteksnya (lihat §3.2 Behavior Spec — Hydration Strategy). |
| FR-22 | Animasi (Motion) dan elemen 3D (Three.js) HARUS diisolasi sebagai komponen island terpisah dari konten statis. |

### 1.4 Deployment

| ID | Requirement |
|---|---|
| FR-30 | Setiap push ke branch utama HARUS memicu build & deploy otomatis (CI/CD) di platform hosting. |
| FR-31 | Build HARUS gagal (fail fast) jika ada entry blog yang tidak lolos validasi schema — mencegah deploy konten cacat. |

---

## 2. Validasi

### 2.1 Schema Konten Blog (Zod)

| Field | Tipe | Wajib? | Aturan |
|---|---|---|---|
| `title` | string | Ya | min 1 karakter |
| `description` | string | Ya | maks 160 karakter (SEO) |
| `pubDate` | date (coerce) | Ya | format tanggal valid |
| `updatedDate` | date (coerce) | Tidak | — |
| `tags` | array of string | Tidak | default: `[]` |
| `draft` | boolean | Tidak | default: `false` |
| `heroImage` | string | Tidak | — |

### 2.2 Validasi Tema

- Nilai `data-theme` HARUS berasal dari enum tetap (whitelist), bukan string bebas — mencegah nilai tema rusak/sembarangan tersimpan di `localStorage` (mis. dari edit manual browser devtools) merusak tampilan.

---

## 3. Behavior Specification

### 3.1 Alur Anti-FOUC (Flash of Unstyled/Wrong Content)

1. Browser mulai parsing `<head>`.
2. Inline script (bukan modul, bukan async) dieksekusi sinkron: baca `localStorage`, validasi terhadap whitelist tema, set `data-theme` pada `<html>`.
3. CSS ter-load dengan tema yang benar sejak render pertama.
4. React/island hydrate belakangan — tidak mempengaruhi tema yang sudah diterapkan.

### 3.2 Hydration Strategy per Tipe Komponen

| Tipe komponen | Directive | Alasan |
|---|---|---|
| Elemen di atas fold (hero, navbar interaktif) | `client:load` | Harus interaktif sesegera mungkin |
| Elemen di bawah fold (card project, animasi scroll) | `client:visible` | Hemat resource, hydrate saat masuk viewport |
| Elemen non-kritis (tooltip, dialog jarang dipakai) | `client:idle` | Hydrate setelah browser idle |
| Konten teks/blog murni | *(tanpa directive — statis)* | Tidak butuh JS sama sekali |

### 3.3 Perilaku saat Ganti Tema

- Ganti tema HARUS terjadi tanpa reload/navigasi halaman (client-side attribute swap).
- Ganti tema HARUS langsung menulis ke `localStorage` (bukan menunggu unload/blur).

---

## 4. Non-Functional Requirements

| Kategori | Requirement |
|---|---|
| **Performa** | Lighthouse Performance ≥ 90 di setiap tema; total JS per halaman blog statis mendekati 0 KB di luar island yang benar-benar dipakai. |
| **Aksesibilitas** | Kontras warna teks/background WCAG AA minimum di **setiap** tema — perhatian khusus untuk Neumorphism (rawan kontras rendah by design) dan Neo Brutalism (rawan terlalu tinggi/harsh). |
| **Maintainability** | Menambah tema baru TIDAK BOLEH mengharuskan perubahan pada komponen konten (blog, project card) — hanya perubahan di layer token/tema. |
| **Portability** | Arsitektur tidak boleh terkunci ke satu platform hosting — harus bisa pindah dari Vercel ke Netlify (atau sebaliknya) tanpa reformat kode. |
| **Observability** | Build gagal harus menghasilkan pesan error yang menunjuk field/entry spesifik yang salah (bukan generic error). |

---

## 5. Business/Application Rules

| ID | Rule |
|---|---|
| BR-01 | Tema default untuk pengunjung baru (belum pernah pilih tema) adalah **Swiss Minimalist**. |
| BR-02 | Entry blog dengan `draft: true` tidak boleh muncul di production build sama sekali (bukan cuma disembunyikan di UI). |
| BR-03 | Tema kategori "token-only" wajib 100% bisa diterapkan lewat override CSS variable — tidak boleh ada logic JS kondisional per tema untuk elemen yang sama di kategori ini. |
| BR-04 | Tema kategori "struktural" boleh menggunakan komponen wrapper berbeda, tapi HARUS tetap menerima props/slot yang sama dengan tema lain (kontrak komponen konsisten). |
