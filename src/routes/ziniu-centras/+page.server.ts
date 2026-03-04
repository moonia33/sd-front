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
					'tags.tags_id.id',
					'tags.tags_id.name',
					'tags.tags_id.slug',
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
