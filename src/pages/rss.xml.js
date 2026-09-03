/**
 * Header Doc
 * Tujuan    : Endpoint RSS feed (/rss.xml) — item artikel blog terurut tanggal,
 *             TANPA draft (aturan filter dari data/blog.ts).
 * Caller    : Astro router (route "/rss.xml"); link-nya ada di BaseHead.astro
 * Dependensi: getPublishedPosts (data/blog.ts), @astrojs/rss, consts.ts
 * Main Functions: GET(context) — handler resmi Astro endpoint
 * Side Effects: Tidak ada I/O selain render XML saat build (static).
 */
import rss from '@astrojs/rss';
import { getPublishedPosts } from '../data/blog';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getPublishedPosts();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
		})),
	});
}
