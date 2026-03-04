import { readItems, readSingleton } from '@directus/sdk';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import {
	directusAssetUrl,
	getDirectusServerClient,
	type ApieMane,
	type Article
} from '$lib/server/directus';
import { renderMarkdownToHtml } from '$lib/server/markdown';

export type ArticleDetail = {
	slug: string;
	title: string;
	subtitle: string;
	shortDescription: string;
	date: string;
	imageUrl: string | null;
	tags: string[];
	contentHtml: string;
};

function normalizeTags(raw: unknown): string[] {
	const tags: string[] = [];
	const seen = new Set<string>();

	const push = (value: string) => {
		const clean = value.trim();
		if (!clean || seen.has(clean)) return;
		seen.add(clean);
		tags.push(clean);
	};

	if (typeof raw === 'string') {
		push(raw);
		return tags;
	}

	if (!Array.isArray(raw)) return tags;

	for (const entry of raw) {
		if (typeof entry === 'string') {
			push(entry);
			continue;
		}

		if (!entry || typeof entry !== 'object') continue;
		const obj = entry as Record<string, unknown>;

		const direct = obj.name;
		if (typeof direct === 'string') {
			push(direct);
			continue;
		}

		const tagsId = obj.tags_id;
		if (tagsId && typeof tagsId === 'object') {
			const name = (tagsId as { name?: unknown }).name;
			const slug = (tagsId as { slug?: unknown }).slug;
			if (typeof name === 'string') push(name);
			else if (typeof slug === 'string') push(slug);
			continue;
		}

		const slug = obj.slug;
		if (typeof slug === 'string') push(slug);
	}

	return tags;
}

function looksLikeHtml(value: string) {
	return /<\/?[a-z][\s\S]*>/i.test(value);
}

function getHttpStatusFromDirectusError(cause: unknown): number | null {
	const maybe = cause as { response?: { status?: unknown } };
	const status = maybe?.response?.status;
	return typeof status === 'number' ? status : null;
}

export const load: PageServerLoad = async ({ fetch, params }) => {
	const directus = getDirectusServerClient(fetch);

	let authorName = '';
	try {
		const apie = (await directus.request(readSingleton('apie_mane'))) as ApieMane;
		authorName = apie.legal_name ?? '';
	} catch (cause) {
		console.error('Failed to load singleton `apie_mane` from Directus (author)', cause);
	}

	let articles: Article[];
	try {
		articles = await directus.request(
			readItems('articles', {
				filter: {
					slug: { _eq: params.slug },
					status: { _eq: 'published' }
				},
				limit: 1,
				fields: [
					'id',
					'slug',
					'title_h1',
					'subtitle',
					'short_description',
					'article',
					'date_created',
					'date_updated',
					'image',
					'tags.tags_id.id',
					'tags.tags_id.name',
					'tags.tags_id.slug',
					'seo'
				]
			})
		);
	} catch (cause) {
		console.error('Failed to load `articles` from Directus by slug', { slug: params.slug, cause });
		const status = getHttpStatusFromDirectusError(cause);
		if (status === 401) throw error(502, 'CMS autentifikacijos klaida');
		if (status === 403) throw error(403, 'Straipsnis neprieinamas');
		throw error(502, 'Nepavyko gauti straipsnio iš CMS');
	}

	const article = (articles ?? [])[0];
	if (!article || typeof article.slug !== 'string') {
		throw error(404, 'Straipsnis nerastas');
	}

	const rawBody = article.article ?? '';
	const contentHtml = rawBody
		? looksLikeHtml(rawBody)
			? rawBody
			: renderMarkdownToHtml(rawBody)
		: '';

	const detail: ArticleDetail = {
		slug: article.slug,
		title: article.title_h1 ?? '',
		subtitle: article.subtitle ?? '',
		shortDescription: article.short_description ?? '',
		date: article.date_updated ?? article.date_created ?? '',
		imageUrl: directusAssetUrl(article.image),
		tags: normalizeTags(article.tags),
		contentHtml
	};

	return {
		authorName,
		article: detail,
		seo: article.seo,
		jsonLd: article.json_ld
	};
};
