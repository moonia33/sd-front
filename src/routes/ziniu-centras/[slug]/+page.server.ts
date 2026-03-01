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
	if (Array.isArray(raw)) return raw.filter((t): t is string => typeof t === 'string');
	if (typeof raw === 'string' && raw.trim()) return [raw];
	return [];
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
					'tags',
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
