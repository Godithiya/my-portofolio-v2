# Task Breakdown — Personal Portfolio Website
Versi: 2.0 | Status: In Progress | Turunan dari: PRD, SRS, UI/UX Flow v1.0
Revisi 2.0: disesuaikan dengan realisasi implementasi — one-page landing (keputusan user),
tanpa React/shadcn, 4 tema token-only, shelf scroll-snap, project private.

---

## Fase 0 — Setup Project

- [x] Inisialisasi project Astro (`pnpm create astro@latest`)
- [x] Tambah integrasi: `pnpm astro add tailwind` (React DITAMBAH lalu DIHAPUS —
      tidak ada island framework; reinstall `pnpm astro add react` bila Motion/Three.js dibutuhkan)
- [x] Setup `tsconfig.json` path alias (`@/*`)
- [x] shadcn/ui sempat di-init lalu dihapus total (tidak ada komponen yang memakai)
- [x] Repo Git (branch utama: `main`)
- [ ] Hubungkan repo ke Vercel/Netlify (auto-deploy dari branch utama)
- [ ] Deploy pertama untuk validasi pipeline CI/CD berjalan

## Fase 1 — Fondasi Konten & 4 Tema Token-Only

**Content Layer**
- [x] `src/content.config.ts` — collection `blog` (schema per SRS §2.1: title,
      description ≤160, pubDate ISO-only → UTC noon, updatedDate, tags, draft, heroImage, heroImageAlt)
- [x] Post dummy untuk testing (5 post, semua `draft: true`)
- [x] Case-study post real: "Membangun Portofolio Multi-Design-System" (published)
- [x] Landing section `#blog` — shelf scroll-snap semua post non-draft
- [x] Halaman detail blog `/blog/:slug` (draft TIDAK dibangun — SRS BR-02)

**Halaman Dasar**
- [x] `BaseLayout.astro` (inline anti-FOUC script guarded + SSR default theme)
- [x] LANDING one-page: hero, about (bio + journey timeline + skills), projects,
      blog, contact — halaman /about, /projects, /blog list DIGABUNG ke `/` (keputusan user)
- [x] Blog detail + 404 bergaya + rss.xml + robots.txt dinamis

**Sistem Tema (Token Layer)**
- [x] Token kontrak: warna via var semantik shadcn-style, non-warna via `--dt-{radius,shadow,shadow-hover,font}`
- [x] `global.css` — `@theme` + `@theme inline` + 4 blok `[data-theme]`
- [x] Tema: **Swiss Minimalist** (grid pattern, tipografi 900, red accent)
- [x] Tema: **Modern Dark** (blob ambient, gradient text, glass navbar, color-scheme dark)
- [x] Tema: **Neo Brutalism** (halftone dots bold, stiker, hard shadow, push button)
- [x] Tema: **Neumorphism** (extruded/inset, panel hero, pill)
- [x] `ThemeSwitcher` — `<select>` native + script inline vanilla (bukan React island)
- [x] Identitas per tema: hero, navbar, post-header, section-title, chip, tombol — CSS murni
- [x] Kontras WCAG: swiss CTA black-on-red 5.7:1, neu muted-fg ≥4.5:1 (audit penuh Fase 3)
- [x] Font per tema self-hosted: Inter, Space Grotesk, DM Sans (fontsource variable)

**Icon**
- [x] `@lucide/astro` (generik) + `astro-icon`/simple-icons (brand sosial media)

## Fase 2 — Tema Struktural (Flex Piece)

- [ ] Pilih 1 tema struktural: Art Deco atau Bauhaus
- [ ] Desain elemen dekoratif (SVG/aset kustom) untuk tema ini
- [ ] Komponen wrapper terpisah (kontrak props/slot sama — SRS BR-04)
- [ ] Integrasikan ke ThemeSwitcher + whitelist `themes.ts`
- [ ] Test lintas halaman

## Fase 3 — Launch

- [x] Final review lintas 4 tema (kontras, layout, konsistensi komponen) — berulang via
      MCP browser setiap ronde perbaikan
- [ ] Cek Lighthouse Performance per tema (target ≥ 90, PRD §8) — butuh live URL / preview
- [x] Env `SITE_URL` (canonical, og:url, sitemap, RSS, robots) — config siap, warning
      saat production build tanpa env
- [ ] Setup domain custom + SSL
- [ ] Publish/umumkan situs

## Fase 4 — Konten Reguler

- [x] 1 artikel case-study: "Membangun Portofolio Multi-Design-System dengan Astro +
      Tailwind v4" (PRD F7)
- [ ] Rencanakan cadence publish blog berikutnya

## Fase 5 — Island Interaktif & Ekspansi Tema

- [ ] Island animasi (Motion) di hero/transisi scroll — butuh `pnpm astro add react`
      atau pakai vanilla motion
- [ ] Island Three.js bila ada use case yang pas
- [x] Seluruh animasi menghormati `prefers-reduced-motion` (blob float, star spin,
      smooth scroll, shelf)
- [ ] Ekspansi tema tambahan (Luxury → Professional → Playful Geometric → Claymorphism →
      Kinetic), siklus: desain → implementasi → test lintas halaman → review kontras

## Ekstra di luar breakdown awal (realisasi)

- [x] Project collection: `status` public/private (private = badge gembok, tanpa link),
      `role`, `period`; 5 entri real dari docs/projects/* (Ladang Coffee, Oilos,
      Cling Dashboard, ERP Mardikarya, Duta Niaga Sejalan)
- [x] Shelf scroll-snap untuk Projects & Blog + tombol prev/next vanilla (auto-hide)
- [x] Data personal terpusat: `src/data/profile.ts` (bio, timeline, skills, sosial)
- [x] Template konten: `src/content/{blog,projects}/_TEMPLATE.md`
- [x] Favicon + apple-touch-icon dari logo brand
- [x] 4 ronde code review (~46 temuan) — semua ditangani

---

## Definition of Done (per Fase)

Sebuah fase dianggap selesai jika:
1. Semua checklist tercentang.
2. Tidak ada error build.
3. Sudah di-deploy dan dicek langsung di URL production (bukan cuma localhost).
4. Untuk fase yang menyentuh tema: sudah dicek di semua tema yang relevan, bukan
   cuma tema default.
