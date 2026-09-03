
/**
 * Header Doc
 * Tujuan    : Single source of truth untuk semua data personal situs (identitas, sosial, tentang saya).
 *             User cukup mengisi nilai di file ini — UI (Header, Footer, Home, About) otomatis ter-update.
 * Caller    : Header.astro, Footer.astro (via SocialLinks.astro),
 *             pages/index.astro, pages/about.astro
 * Dependensi: Tidak ada (murni data statis, tanpa I/O).
 * Main Exports: profile (objek), socialLinks (array), skills (objek)
 * Side Effects: Tidak ada (pure data module).
 */

/* =========================================================================
   TEMPLATE DATA PERSONAL — ISI BAGIAN YANG DITANDI "FILL"
   =========================================================================
   Cara pakai:
   1. Ganti semua nilai placeholder di bawah dengan data kamu.
   2. Hapus atau komentari sosial media yang tidak dipakai di socialLinks.
   3. Tidak perlu edit komponen mana pun — semua halaman baca dari sini.
   ========================================================================= */

export const profile = {
  /* FILL: Nama kamu — dipakai di header, footer, dan hero (TANPA possessive 's —
            komponen yang menambahkan "-nya" sendiri bila perlu) */
  name: 'Angga Adithiya',

  /* FILL: Peran/jabatan singkat — tampil di bawah nama (hero) */
  role: 'Software Engineer',

  /* FILL: Tagline 1 kalimat — tampil di hero. Maksimal ±100 karakter agar tetap tajam. */
  tagline: 'Software Engineer yang membangun sistem dari kebutuhan nyata, bukan asumsi.',

  /* FILL: Biodata singkat 2-3 kalimat — tampil di halaman About dan section home. */
  shortBio:
    'Software Engineer dengan pengalaman sekitar 3 tahun di ekosistem JavaScript modern, kini bekerja penuh waktu di Tumbira sambil menangani berbagai proyek lintas domain, dari sistem operasional kafe hingga platform distribusi multi-level. ' +
    'Sedang memperluas kemampuan ke Go dan dunia server untuk mengejar performa aplikasi yang lebih baik. ' +
    'Terbuka untuk proyek freelance dan kolaborasi di luar pekerjaan utama.',

  /* FILL: Biodata panjang untuk halaman About — boleh beberapa paragraf (array of string). */
  longBio: [
    'Saya memulai karier di dunia software sejak Mei 2024, berawal sebagai Fullstack Developer (frontend, kemudian merambah ke backend), hingga kini berperan sebagai Software Engineer. Saat ini saya bekerja penuh waktu sebagai Software Engineer di Tumbira, sebuah software house, tempat saya terlibat dalam berbagai proyek dengan skala dan kompleksitas berbeda. Selama kurang lebih tiga tahun perjalanan ini, saya sudah menangani proyek lintas domain, mulai dari sistem manajemen operasional kafe (Ladang Coffee) sebagai Software Engineer sekaligus DevOps, platform distribusi multi-level berbasis QR (Oilos) sebagai Fullstack Developer, dashboard operasional pencucian bus untuk konteks TransJakarta (Cling Dashboard) sebagai Frontend Developer, hingga sistem informasi manajemen Request Order dan Purchase Order untuk Program Makan Bergizi Gratis (ERP Mardikarya/MBG) sebagai Fullstack Developer.',
    'Saya berpengalaman dengan ekosistem JavaScript modern, mulai dari Node.js, Express, React, Next.js, SvelteKit, Astro.js, Elysia.js, hingga runtime dan package manager seperti Bun, pnpm, npm, dan yarn. Saat ini saya sedang memperluas kemampuan dengan mempelajari Go dari nol dan mendalami dunia server secara menyeluruh, didorong oleh keinginan mengejar performa aplikasi yang lebih baik dan terus mengikuti perkembangan teknologi, terutama di sisi DevOps. Saya juga sempat menjadi mentor Web Development selama lebih dari setahun di Lintang Academy, Kecamatan Baturaden, Kabupaten Banyumas, Jawa Tengah. Filosofi kerja saya adalah membangun sistem yang benar-benar merepresentasikan kebutuhan nyata di lapangan, bukan asumsi di atas kertas, dengan tetap menjaga kesederhanaan penggunaan di sisi pengguna akhir.',
    'Meski saat ini bekerja penuh waktu di Tumbira, saya membuka diri untuk proyek freelance sebagai kerja sampingan sekaligus kolaborasi proyek yang bisa membantu saya mengasah kemampuan di use case yang berbeda-beda. Saya tertarik pada proyek yang membutuhkan penguasaan penuh dari frontend hingga backend, khususnya yang punya kompleksitas alur bisnis nyata atau sisi infrastruktur yang menantang.',
  ],

  /* FILL: Lokasi/kota — opsional, kosongkan string jika tidak mau ditampilkan */
  location: 'Bogor, Indonesia',

  /* FILL: Deskripsi meta (maks 160 karakter) untuk halaman About — SEO/OG */
  metaDescription:
    'Software Engineer di Tumbira — frontend hingga backend, sistem operasional nyata, dan eksplorasi Go & DevOps.',

  /* FILL: Email kontak — dipakai di footer dan CTA contact */
  email: 'anggaadithiya@gmail.com',

  /* FILL: URL CV/Resume — opsional, kosongkan string jika belum ada */
  resumeUrl: '',
};

/* =========================================================================
   SOSIAL MEDIA — hapus/komentari entry yang tidak dipakai.
   label: nama yang tampil untuk screen reader & tooltip.
   url  : link profil kamu (BUKAN link template).
   icon : nama ikon brand dari simple-icons (tanpa prefix "simple-icons:").
          Cek nama lain: https://simpleicons.org — contoh: github, linkedin,
          x, instagram, youtube, dribbble, mastodon.
          Kosongkan string '' untuk fallback ikon link generik.
   ========================================================================= */
export const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/Godithiya', icon: 'github' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/angga-adithiya-146b51366', icon: 'linkedin' },
  // TODO-FILL: ganti dengan username Instagram kamu sebelum deploy —
  // link placeholder TIDAK boleh ikut ke production.
  { label: 'Instagram', url: 'https://www.instagram.com/godithiya/', icon: 'instagram' },
] as const;

/* =========================================================================
   SKILL / TEKNOLOGI — tampil di halaman About.
   Kelompokkan per kategori agar rapi. Tambah/kurangi sesuai kebutuhan.
   ========================================================================= */
export const skills = {
  'Frontend': ['Javascript', 'TypeScript', 'React JS', 'SvelteKit', 'Next.js', 'Astro JS', 'Tailwind CSS'],
  'Backend': ['Node.js', 'Express', 'Elysia.js', 'Go (learning)', 'Bun', 'PostgreSQL'],
  'Tools': ['Git', 'Github', 'PNPM', 'NPM', 'Yarn', 'VScode'],
} as const;

/* =========================================================================
   TIMELINE PERJALANAN — tampil di section About sebagai garis waktu.
   period : rentang waktu (contoh '2024 — Sekarang'). Kosongkan '' bila belum
            pasti — UI tetap menampilkan kartu tanpa label periode.
   role   : jabatan/peran. org: nama perusahaan/proyek. desc: 1-2 kalimat.
   Urutan: paling baru di atas.
   ========================================================================= */
export const timeline = [
  {
    period: '2025 — Sekarang',
    role: 'Software Engineer',
    org: 'Tumbira (Software House)',
    desc: 'Terlibat di berbagai proyek klien dengan skala dan kompleksitas berbeda, dari sistem operasional hingga platform distribusi.',
  },
  {
    period: '2026',
    role: 'Software Engineer & DevOps',
    org: 'Ladang Coffee',
    desc: 'Sistem manajemen operasional kafe, sekaligus menangani sisi DevOps.',
  },
  {
    period: '2025',
    role: 'Fullstack Developer',
    org: 'Oilos',
    desc: 'Platform distribusi multi-level berbasis QR.',
  },
  {
    period: '2025',
    role: 'Fullstack Developer',
    org: 'ERP Mardikarya',
    desc: 'Sistem informasi Request Order & Purchase Order untuk Program Makan Bergizi Gratis.',
  },
  {
    period: '2025',
    role: 'Mentor Web Development',
    org: 'Lintang Academy',
    desc: 'Lebih dari setahun membimbing calon developer di Baturaden, Jawa Tengah.',
  },
  {
    period: '2024',
    role: 'Frontend Developer',
    org: 'Cling Dashboard',
    desc: 'Dashboard operasional pencucian bus untuk konteks TransJakarta.',
  },
] as const;
