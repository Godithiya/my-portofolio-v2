# Multi-Theme Portfolio

Personal portfolio yang menampilkan karya + kemampuan desain/frontend lewat **multi design-system**: pengunjung bisa ganti 4 tema visual secara instan tanpa reload.

| Tema | Karakter |
|---|---|
| Swiss Minimalist (default) | Grid, tipografi monumental, aksen merah |
| Modern Dark | Ambient glow, gradient text, glass |
| Neo Brutalism | Border tebal, hard shadow, sticker |
| Neumorphism | Dual shadow extruded/inset, soft pill |

## Stack

- [Astro](https://astro.build) v7 — static output, 0 JS framework
- [Tailwind CSS](https://tailwindcss.com) v4 — CSS-first config, token per tema via `[data-theme]`
- Content Collections + Zod (blog MDX, projects MD)
- Font self-hosted (fontsource): Inter, Space Grotesk, DM Sans
- Ikon: lucide + simple-icons (via astro-icon)

## Menjalankan

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # output ke dist/
pnpm preview
```

Dev server background (sesuai CLAUDE.md): `pnpm astro dev --background`, kelola dengan `astro dev stop|status|logs`.

## Mengisi Konten

| Data | Lokasi |
|---|---|
| Data personal (nama, bio, sosial, skills) | `src/data/profile.ts` |
| Project baru | duplikat `src/content/projects/_TEMPLATE.md` |
| Artikel baru | duplikat `src/content/blog/_TEMPLATE.md` |

Tanggal wajib format `YYYY-MM-DD`. Frontmatter divalidasi Zod saat build — build gagal = konten tidak lolos.

## Deploy

1. Push ke GitHub, hubungkan ke Vercel/Netlify.
2. **Wajib** set env `SITE_URL` (contoh `https://namakamu.com`) — dipakai untuk canonical, og:url, sitemap, RSS, dan robots.txt. Production build tanpa env ini mencetak warning.
3. Build command `pnpm build`, output directory `dist`.

## Arsitektur

Lihat [`SYSTEM_MAP.md`](./SYSTEM_MAP.md) — peta navigasi kode (modul, alur, konfigurasi, risiko). Spesifikasi produk & desain: `docs/architecture/`, `docs/design-system/`.
