import { readItems, readSingleton } from '@directus/sdk';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import {
	directusAssetUrl,
	getDirectusServerClient,
	type ApieMane,
	type Area,
	type Service,
	type Seminar,
	type WhyUsItem
} from '$lib/server/directus';
import { renderMarkdownToHtml } from '$lib/server/markdown';

export type AboutHeroData = {
	imageUrl: string | null;
	title: string;
	santrauka: string;
	descriptionHtml: string;
	legalName: string;
	subtitle: string;
	ctaLabel: string;
	ctaLink: string;
	seo?: ApieMane['seo'];
	jsonLd?: ApieMane['json_ld'];
};

export type WhyUsData = {
	heading: string;
	descriptionHtml: string;
	stats: Array<{ stats: string; description: string }>;
};

export type CompetentionsData = {
	heading: string;
	descriptionHtml: string;
};

export type SeminarsData = {
	heading: string;
	text: string;
	items: Array<{ data: string; tema: string; istaiga: string }>;
};

export type MyServiceData = {
	heading: string;
	descriptionHtml: string;
	items: Array<{ title: string; description: string; slug: string; icon: string }>;
};

export type MyAreasData = {
	heading: string;
	descriptionHtml: string;
	items: Array<{ id: string; title: string; description: string; icon: string; fullPath: string }>;
};

export const load: PageServerLoad = async ({ fetch }) => {
	const directus = getDirectusServerClient(fetch);

	function extractRelationIds(raw: unknown, preferredKeys: string[]): string[] {
		if (!Array.isArray(raw)) return [];

		const ids: string[] = [];
		for (const entry of raw) {
			if (typeof entry === 'string') {
				ids.push(entry);
				continue;
			}

			if (!entry || typeof entry !== 'object') continue;
			const obj = entry as Record<string, unknown>;

			if (typeof obj.id === 'string') {
				ids.push(obj.id);
				continue;
			}

			for (const key of preferredKeys) {
				const value = obj[key];
				if (typeof value === 'string') {
					ids.push(value);
					break;
				}
				if (
					value &&
					typeof value === 'object' &&
					typeof (value as { id?: unknown }).id === 'string'
				) {
					ids.push((value as { id: string }).id);
					break;
				}
			}
		}

		return ids;
	}

	let apie: ApieMane;
	try {
		apie = await directus.request(readSingleton('apie_mane'));
	} catch (cause) {
		console.error('Failed to load singleton `apie_mane` from Directus', cause);
		throw error(502, 'Nepavyko gauti duomenų iš CMS');
	}

	const hero: AboutHeroData = {
		imageUrl: directusAssetUrl(apie.image),
		title: apie.title ?? '',
		santrauka: apie.santrauka ?? '',
		descriptionHtml: renderMarkdownToHtml(apie.description),
		legalName: apie.legal_name ?? '',
		subtitle: apie.subtitle ?? '',
		ctaLabel: apie.cta_label ?? '',
		ctaLink: apie.cta_link ?? '#',
		seo: apie.seo,
		jsonLd: apie.json_ld
	};

	const statsCardIds = Array.isArray(apie.stats_cards) ? apie.stats_cards : [];
	let orderedStatsCards: WhyUsItem[] = [];

	if (statsCardIds.length > 0) {
		let cards: WhyUsItem[];
		try {
			cards = await directus.request(
				readItems('why_us_items', {
					filter: { id: { _in: statsCardIds } },
					limit: 50,
					fields: ['id', 'stats', 'description']
				})
			);
		} catch (cause) {
			console.error('Failed to load `why_us_items` from Directus', cause);
			throw error(502, 'Nepavyko gauti statistikos kortelių iš CMS');
		}

		const byId = new Map(cards.map((card) => [card.id, card] as const));
		orderedStatsCards = statsCardIds
			.map((id) => byId.get(id))
			.filter((card): card is WhyUsItem => Boolean(card));
	}

	if (orderedStatsCards.length !== 4) {
		console.error('WhyUs expects exactly 4 stats cards', {
			statsCardIds,
			resolvedCount: orderedStatsCards.length
		});
		throw error(502, 'CMS konfigūracija neteisinga (statistikos kortelės)');
	}

	const whyUs: WhyUsData = {
		heading: apie.kodel_h2 ?? '',
		descriptionHtml: renderMarkdownToHtml(apie.kodel_description),
		stats: orderedStatsCards.map((card) => ({
			stats: card.stats ?? '',
			description: card.description ?? ''
		}))
	};

	const competentions: CompetentionsData = {
		heading: apie.title_h2 ?? '',
		descriptionHtml: renderMarkdownToHtml(apie.learning_description)
	};

	const seminarIds = Array.isArray(apie.seminarai) ? apie.seminarai : [];
	let seminarsItems: Seminar[] = [];

	if (seminarIds.length > 0) {
		try {
			seminarsItems = await directus.request(
				readItems('seminarai', {
					filter: { id: { _in: seminarIds } },
					sort: ['-data'],
					limit: 200,
					fields: ['id', 'data', 'tema', 'istaiga']
				})
			);
		} catch (cause) {
			console.error('Failed to load related `seminarai` from Directus', cause);
			throw error(502, 'Nepavyko gauti seminarų iš CMS');
		}
	}

	const seminars: SeminarsData = {
		heading: apie.seminarai_h3 ?? '',
		text: apie.seminarai_text ?? '',
		items: seminarsItems.map((s) => ({
			data: s.data ?? '',
			tema: s.tema ?? '',
			istaiga: s.istaiga ?? ''
		}))
	};

	const serviceIds = extractRelationIds(
		Array.isArray(apie.services)
			? apie.services
			: Array.isArray(apie.paslaugos)
				? apie.paslaugos
				: [],
		['services_id', 'service_id']
	);

	let orderedServices: Service[] = [];

	if (serviceIds.length > 0) {
		let services: Service[];
		try {
			services = await directus.request(
				readItems('services', {
					filter: { id: { _in: serviceIds }, status: { _eq: 'published' } },
					limit: 50,
					fields: ['id', 'title_h1', 'short_description', 'slug', 'icon']
				})
			);
		} catch (cause) {
			console.error('Failed to load related `services` from Directus', cause);
			throw error(502, 'Nepavyko gauti paslaugų iš CMS');
		}

		const byId = new Map(services.map((service) => [service.id, service] as const));
		orderedServices = serviceIds
			.map((id) => byId.get(id))
			.filter((service): service is Service => Boolean(service));
	}

	const myService: MyServiceData = {
		heading: apie.paslaugos_h3 ?? '',
		descriptionHtml: renderMarkdownToHtml(apie.paslaugos_text),
		items: orderedServices.map((s) => ({
			title: s.title_h1 ?? '',
			description: s.short_description ?? s.description_short ?? '',
			slug: s.slug ?? '',
			icon: s.icon ?? ''
		}))
	};

	const areaIds = extractRelationIds(
		Array.isArray(apie.teises_sritys)
			? apie.teises_sritys
			: Array.isArray(apie.areas)
				? apie.areas
				: Array.isArray(apie.sritys)
					? apie.sritys
					: [],
		['areas_id', 'area_id']
	);

	let orderedAreas: Area[] = [];

	if (areaIds.length > 0) {
		let areas: Area[];
		try {
			areas = await directus.request(
				readItems('areas', {
					filter: { id: { _in: areaIds }, status: { _eq: 'published' } },
					limit: 100,
					fields: ['id', 'h1_title', 'short_description', 'icon', 'full_path']
				})
			);
		} catch (cause) {
			console.error('Failed to load related `areas` from Directus', cause);
			throw error(502, 'Nepavyko gauti sričių iš CMS');
		}

		const byId = new Map(areas.map((area) => [area.id, area] as const));
		orderedAreas = areaIds.map((id) => byId.get(id)).filter((area): area is Area => Boolean(area));
	}

	const myAreas: MyAreasData = {
		heading: apie.sritys_h3 ?? '',
		descriptionHtml: renderMarkdownToHtml(apie.sritys_text),
		items: orderedAreas.map((a) => ({
			id: a.id,
			title: a.h1_title ?? '',
			description: a.short_description ?? '',
			icon: a.icon ?? '',
			fullPath: a.full_path ?? ''
		}))
	};

	return { hero, whyUs, competentions, seminars, myService, myAreas };
};
