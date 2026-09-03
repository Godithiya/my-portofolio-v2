/**
 * Header Doc
 * Tujuan    : Single source of truth daftar tema + default. Dikonsumsi oleh
 *             anti-FOUC script (BaseLayout, via define:vars) dan ThemeSwitcher —
 *             mencegah whitelist dobel yang bisa saling telat update.
 *             Catatan: script inline memakai indexOf langsung (tidak bisa import
 *             fungsi) — validasi tetap dari array THEMES yang sama.
 * Caller    : src/layouts/BaseLayout.astro, src/components/ThemeSwitcher.astro
 * Dependensi: Tidak ada (pure data)
 * Main Exports: THEMES, DEFAULT_THEME
 * Side Effects: Tidak ada.
 */

export const THEMES = [
  'swiss-minimalist',
  'neo-brutalism',
  'neumorphism',
  'modern-dark',
] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = 'swiss-minimalist';
