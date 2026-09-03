/**
 * Header Doc
 * Tujuan    : Helper akses collection blog — SATU definisi filter draft +
 *             sorting pubDate terbaru. Dipakai semua konsumen blog agar
 *             aturan tidak berbeda-beda antar file.
 * Caller    : src/pages/index.astro (landing), src/pages/blog/[...slug].astro,
 *             src/pages/rss.xml.js
 * Dependensi: astro:content (getCollection)
 * Main Exports: getPublishedPosts()
 * Side Effects: Membaca content collection saat build (tidak ada I/O runtime).
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  return getCollection('blog', ({ data }) => !data.draft).then((posts) =>
    posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()),
  );
}
