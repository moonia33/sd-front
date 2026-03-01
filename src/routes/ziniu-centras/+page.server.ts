import { readItems, readSingleton } from '@directus/sdk';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import {
	directusAssetUrl,
	getDirectusServerClient,
	type ApieMane,
	type Article
} from '$lib/server/directus';

export type ArticleListItem = {
	slug: string;
	title: string;
	subtitle: string;
	shortDescription: string;
	date: string;
	imageUrl: string | null;
	tags: string[];
};

function normalizeTags(raw: unknown): string[] {
	if (Array.isArray(raw)) return raw.filter((t): t is string => typeof t === 'string');
	if (typeof raw === 'string' && raw.trim()) return [raw];
	return [];
}

export const load: PageServerLoad = async ({ fetch }) => {
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
				filter: { status: { _eq: 'published' } },
				sort: ['-date_created'],
				limit: 100,
				fields: [
					'id',
					'slug',
					'title_h1',
					'subtitle',
					'short_description',
					'date_created',
					'date_updated',
					'image',
					'tags',
					'status'
				]
			})
		);
	} catch (cause) {
		console.error('Failed to load `articles` from Directus', cause);
		throw error(502, 'Nepavyko gauti straipsnių iš CMS');
	}

	const items: ArticleListItem[] = (articles ?? [])
		.filter((a) => typeof a.slug === 'string' && a.slug.length > 0)
		.map((a) => ({
			slug: a.slug as string,
			title: a.title_h1 ?? '',
			subtitle: a.subtitle ?? '',
			shortDescription: a.short_description ?? '',
			date: a.date_updated ?? a.date_created ?? '',
			imageUrl: directusAssetUrl(a.image),
			tags: normalizeTags(a.tags)
		}));

	return {
		authorName,
		articles: items
	};
};
