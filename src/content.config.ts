/**
 * Header Doc
 * Tujuan    : Definisi Content Collections — schema Zod untuk collection `blog`
 *             dan `projects`. Validasi jalan saat build; entry gagal = build gagal
 *             (SRS FR-31 fail-fast). File _TEMPLATE.md dikecualikan dari loader.
 * Caller    : Astro content layer (astro:content); dikonsumsi halaman via
 *             getCollection('blog') / getCollection('projects')
 * Dependensi: astro:content (defineCollection, glob), astro/zod
 * Main Exports: collections { blog, projects }
 * Side Effects: Membaca file .md/.mdx dari src/content/{blog,projects} saat build.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const utcDate = z
	.preprocess(
		(v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
		z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Gunakan format tanggal YYYY-MM-DD (contoh: 2024-06-01)'),
	)
	.transform((s) => new Date(`${s}T12:00:00Z`));

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: ['**/*.md', '!**/_TEMPLATE.md'] }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string().max(160),
			pubDate: utcDate,
			updatedDate: utcDate.optional(),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
			// String path (biasanya '/images/...' dari upload Decap CMS di public/images)
			heroImage: z.string().optional(),
			heroImageAlt: z.string().optional(),
		}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: ['**/*.md', '!**/_TEMPLATE.md'] }),
	schema: z.object({
		title: z.string(),
		description: z.string().max(200),
		// private = link demo/repo disembunyikan, diganti badge "Private project"
		status: z.enum(['public', 'private']).default('public'),
		role: z.string().optional(),
		period: z.string().optional(),
		demoUrl: z
			.string()
			.url()
			.refine((url) => url.startsWith('https://'), 'URL harus https://')
			.optional(),
		repoUrl: z
			.string()
			.url()
			.refine((url) => url.startsWith('https://'), 'URL harus https://')
			.optional(),
		techStack: z.array(z.string()),
		pubDate: utcDate,
	}),
});

export const collections = { blog, projects };
