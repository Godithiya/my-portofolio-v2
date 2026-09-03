/**
 * Header Doc
 * Tujuan    : robots.txt dinamis — host diambil dari konfigurasi site Astro
 *             (env SITE_URL saat build) sehingga selalu konsisten dengan
 *             canonical/sitemap tanpa file statis yang bisa telat update.
 * Caller    : Astro router (route "/robots.txt")
 * Dependensi: Tidak ada eksternal (pakai context.site dari Astro)
 * Main Functions: GET(context) — handler resmi Astro endpoint
 * Side Effects: Tidak ada I/O selain render teks saat build (static).
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap-index.xml', site)}`].join(
    '\n',
  );
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
