# Deployment Guide

Situs ini adalah static site (Astro). Tidak ada server runtime — hosting mana pun
yang bisa serve file statis bisa dipakai. Rekomendasi: **Vercel** atau **Netlify**
(keduanya gratis untuk personal).

---

## 0. Prasyarat

- Repo GitHub berisi kode ini (lihat langkah 1).
- Node.js ≥ 22.12.0 + pnpm (untuk build lokal).

## 1. Push ke GitHub

```bash
git branch -M main          # jika belum di main
git remote add origin git@github.com:Godithiya/my-portofolio-v2.git
git push -u origin main
```

> Repo ini sengaja mengecualikan `docs/projects/`, `docs/design-system/`,
> `SYSTEM_MAP.md`, dan `.claude/` via `.gitignore` — dokumen internal klien
> tidak ikut ter-publish.

## 2. Hubungkan ke Hosting

### Vercel

1. [vercel.com/new](https://vercel.com/new) → import repo `my-portofolio-v2`.
2. Framework Preset: **Astro** (terdeteksi otomatis).
3. Build Command: `pnpm build` · Output Directory: `dist`.
4. **Environment Variables** (Production + Preview):
   - `SITE_URL` = URL produksi final, contoh `https://anggaadithiya.com`
     (tanpa trailing slash). Wajib — tanpa ini canonical/og:url/sitemap/RSS
     memakai `http://localhost:4321` dan build mencetak warning.
5. Deploy.

### Netlify

1. [app.netlify.com](https://app.netlify.com) → Add new site → Import from Git.
2. Build Command: `pnpm build` · Publish Directory: `dist`.
3. **Environment Variables** (Site settings → Environment):
   - `SITE_URL` = URL produksi final (sama seperti di atas).
4. Deploy.

## 2b. Aktifkan CMS Visual (Decap + Netlify Identity)

1. Netlify dashboard → site → **Integrations → Netlify Identity → Enable**.
2. Identity → **Registration**: pilih `Invite only` → **Invite users** →
   invite email kamu → konfirmasi dari inbox.
3. Identity → **Services → Git Gateway → Enable** (memberi CMS akses commit
   ke repo atas namamu).
4. Buka `https://<domain>/admin/` → login dengan akun Identity.
5. Tulis post/project di panel → **Save draft** (jadi PR) → **Publish** →
   merge ke main → auto-deploy.

> Editor di `/admin/` juga bisa dipakai dari `pnpm dev` dengan backend
> `local` — sementara ubah `backend.name` di `public/admin/config.yml`
> menjadi `local` (jangan di-commit).

## 3. Domain Custom (opsional)

- Vercel: Project → Settings → Domains → tambah domain → ikuti instruksi DNS
  (A record `76.76.21.21` atau CNAME `cname.vercel-dns.com`).
- Netlify: Site configuration → Domain management → Add domain → ikuti DNS
  (CNAME ke `<site>.netlify.app`).
- SSL otomatis dari hosting.
- Setelah domain aktif: perbarui env `SITE_URL` ke domain final, lalu redeploy
  agar canonical/sitemap/RSS ikut berubah.

## 4. Verifikasi Pasca-Deploy

- [ ] Buka homepage — ganti 4 tema via select, refresh: tema tersimpan, tanpa flash.
- [ ] `/blog/membangun-multi-design-system/` terbuka, nav anchor kembali ke landing.
- [ ] View source: `<link rel="canonical">` memakai domain produksi (bukan localhost).
- [ ] `https://<domain>/sitemap-index.xml` dan `/rss.xml` memakai domain produksi.
- [ ] `https://<domain>/robots.txt` memuat baris `Sitemap:`.
- [ ] Jalankan Lighthouse (Chrome DevTools) per tema — target Performance ≥ 90 (PRD §8).
- [ ] Cek mobile: hamburger menu, shelf swipe, tidak ada horizontal scroll.

## 5. Alur Konten Harian

- Post baru: duplikat `src/content/blog/_TEMPLATE.md` → isi → commit → push → auto-deploy.
- Project baru: duplikat `src/content/projects/_TEMPLATE.md` → isi (`status: "private"`
  untuk project klien) → commit → push.
- Post/project dengan `draft: true` / folder `_TEMPLATE.md` tidak pernah ikut build.
