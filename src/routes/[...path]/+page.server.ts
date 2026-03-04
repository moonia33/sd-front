import { readItem, readItems, readSingleton } from '@directus/sdk';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import type { QueryFilter } from '@directus/sdk';

import {
	directusAssetUrl,
	getDirectusServerClient,
	type DirectusSchema,
	type ApieMane,
	type Area,
	type Article,
	type FaqItem,
	type ProblemItem,
	type ProcessStep,
	type Service,
	type SolutionItem,
	type WhyUsItem
} from '$lib/server/directus';
import { renderMarkdownToHtml } from '$lib/server/markdown';

function extractRelationIds(raw: unknown, preferredKeys: string[] = []): string[] {
	if (!Array.isArray(raw)) return [];

	const ids: string[] = [];
	const seen = new Set<string>();

	for (const entry of raw) {
		if (typeof entry === 'string') {
			const id = entry.trim();
			if (id && !seen.has(id)) {
				seen.add(id);
				ids.push(id);
			}
			continue;
		}

		if (!entry || typeof entry !== 'object') continue;
		const obj = entry as Record<string, unknown>;

		const keysToTry = preferredKeys.length
			? preferredKeys
			: Object.keys(obj).filter((k) => k !== 'id' && k.endsWith('_id'));

		let extracted: string | null = null;
		for (const key of keysToTry) {
			const value = obj[key];
			if (typeof value === 'string') {
				const id = value.trim();
				if (id) {
					extracted = id;
					break;
				}
			}
			if (value && typeof value === 'object') {
				const nestedId = (value as { id?: unknown }).id;
				if (typeof nestedId === 'string') {
					const id = nestedId.trim();
					if (id) {
						extracted = id;
						break;
					}
				}
			}
		}

		if (!extracted && typeof obj.id === 'string') {
			const id = obj.id.trim();
			if (id) extracted = id;
		}

		if (extracted && !seen.has(extracted)) {
			seen.add(extracted);
			ids.push(extracted);
		}
	}

	return ids;
}

function pickFirstString(...values: Array<unknown>): string {
	for (const value of values) {
		if (typeof value === 'string' && value.trim().length) return value.trim();
	}
	return '';
}

function extractPublished<T extends { id?: string }>(order: string[], items: T[]): T[] {
	const byId = new Map(items.map((item) => [item.id, item] as const));
	return order.map((id) => byId.get(id)).filter((v): v is T => Boolean(v));
}

function normalizeFullPath(paramPath: string | undefined): string {
	const clean = typeof paramPath === 'string' ? paramPath.trim() : '';
	if (!clean) return '/';
	return clean.startsWith('/') ? clean : `/${clean}`;
}

export const load: PageServerLoad = async ({ fetch, params, parent }) => {
	const directus = getDirectusServerClient(fetch);
	const fullPath = normalizeFullPath(params.path);
	const parentData = await parent();
	const site = parentData?.site;

	let area: Area | null = null;
	try {
		const areas = await directus.request(
			readItems('areas', {
				filter: { full_path: { _eq: fullPath }, status: { _eq: 'published' } },
				limit: 1,
				fields: [
					'id',
					'status',
					'h1_title',
					'label',
					'subtitle',
					'short_description',
					'description',
					'icon',
					'full_path',
					'parent',
					'general_image',
					'tags.tags_id.id',

					'h2_problem_title',
					'problem_short',
					'problem_description',
					'problem_image',
					'problem_item.*',
					'problem_anchor',

					'h2_solution_title',
					'solution_short',
					'solution_description',
					'solution_image',
					'solution_item.*',
					'solution_anchor',

					'h2_process_title',
					'process_short',
					'process_image',
					'process_step.*',
					'process_anchor',

					'faq_title_h2',
					'faq_short',
					'faq_description',
					'faq_item.*',
					'faq_anchor',

					'children',
					'apie_mane',
					'json_ld',
					'seo'
				]
			})
		);
		area = areas[0] ?? null;
	} catch (cause) {
		console.error('Failed to load `areas` by full_path', { fullPath, cause });
		throw error(502, 'Nepavyko gauti sričių duomenų iš CMS');
	}

	if (!area) throw error(404, 'Puslapis nerastas');

	const problemItemIds = extractRelationIds(area.problem_item, [
		'problem_items_id',
		'problem_item_id'
	]);
	const solutionItemIds = extractRelationIds(area.solution_item, [
		'solution_items_id',
		'solution_item_id'
	]);
	const processStepIds = extractRelationIds(area.process_step, [
		'process_steps_id',
		'process_step_id'
	]);
	const faqItemIds = extractRelationIds(area.faq_item, ['faq_items_id', 'faq_item_id']);
	const childrenIds = extractRelationIds(area.children, [
		'areas_id',
		'area_id',
		'children_id',
		'child_id'
	]);
	const areaTagIds = extractRelationIds(area.tags, ['tags_id']);

	let problemItems: ProblemItem[] = [];
	if (problemItemIds.length) {
		problemItems = await directus.request(
			readItems('problem_items', {
				filter: { id: { _in: problemItemIds }, status: { _eq: 'published' } },
				limit: 100,
				fields: ['id', 'title_h3', 'short', 'description', 'icon', 'status']
			})
		);
	}

	let solutionItems: SolutionItem[] = [];
	if (solutionItemIds.length) {
		solutionItems = await directus.request(
			readItems('solution_items', {
				filter: { id: { _in: solutionItemIds }, status: { _eq: 'published' } },
				limit: 100,
				fields: ['id', 'title_h3', 'short', 'description', 'icon', 'status']
			})
		);
	}

	let processSteps: ProcessStep[] = [];
	if (processStepIds.length) {
		processSteps = await directus.request(
			readItems('process_steps', {
				filter: { id: { _in: processStepIds }, status: { _eq: 'published' } },
				limit: 100,
				fields: ['id', 'title_h3', 'description', 'icon', 'status']
			})
		);
	}

	let faqItems: FaqItem[] = [];
	if (faqItemIds.length) {
		faqItems = await directus.request(
			readItems('faq_items', {
				filter: { id: { _in: faqItemIds }, status: { _eq: 'published' } },
				limit: 100,
				fields: ['id', 'question', 'answer', 'icon', 'status']
			})
		);
	}

	let childrenAreas: Area[] = [];
	if (childrenIds.length) {
		childrenAreas = await directus.request(
			readItems('areas', {
				filter: { id: { _in: childrenIds }, status: { _eq: 'published' } },
				limit: 100,
				fields: ['id', 'h1_title', 'label', 'short_description', 'icon', 'full_path', 'status']
			})
		);
	}

	let parentArea: Area | null = null;
	const parentId =
		typeof area.parent === 'string'
			? area.parent
			: area.parent &&
				  typeof area.parent === 'object' &&
				  typeof (area.parent as { id?: unknown }).id === 'string'
				? ((area.parent as { id: string }).id ?? '')
				: '';
	if (parentId.length) {
		try {
			parentArea = (await directus.request(
				readItem('areas', parentId, {
					fields: ['id', 'h1_title', 'label', 'short_description', 'icon', 'full_path', 'status']
				})
			)) as Area;
		} catch {
			parentArea = null;
		}
	}

	let services: Service[] = [];
	try {
		services = await directus.request(
			readItems('services', {
				filter: { status: { _eq: 'published' } },
				sort: ['sort'],
				limit: 10,
				fields: ['id', 'title_h1', 'short_description', 'service_image', 'slug', 'icon', 'status']
			})
		);
	} catch (cause) {
		console.error('Failed to load `services` for related-services', { cause });
		services = [];
	}

	let articles: Article[] = [];
	try {
		const baseQuery = {
			sort: ['-date_created'],
			limit: 4,
			fields: ['id', 'title_h1', 'slug', 'image', 'status', 'date_created']
		};

		if (areaTagIds.length) {
			type ArticlesFilter = QueryFilter<DirectusSchema, Article>;
			articles = await directus.request(
				readItems('articles', {
					...baseQuery,
					filter: {
						status: { _eq: 'published' },
						tags: { tags_id: { _in: areaTagIds } }
					} as unknown as ArticlesFilter
				})
			);
		}

		if (!areaTagIds.length || articles.length === 0) {
			articles = await directus.request(
				readItems('articles', {
					...baseQuery,
					filter: { status: { _eq: 'published' } }
				})
			);
		}
	} catch (cause) {
		console.error('Failed to load `articles` for related-posts', { cause });
		articles = [];
	}

	let apie: ApieMane | null = null;
	let whyUsStats: WhyUsItem[] = [];
	try {
		apie = (await directus.request(readSingleton('apie_mane'))) as ApieMane;
	} catch (cause) {
		console.error('Failed to load singleton `apie_mane` for areas', cause);
		apie = null;
	}

	if (apie && Array.isArray(apie.stats_cards) && apie.stats_cards.length) {
		try {
			const cards = (await directus.request(
				readItems('why_us_items', {
					filter: { id: { _in: apie.stats_cards }, status: { _eq: 'published' } },
					limit: 50,
					fields: ['id', 'stats', 'description', 'status']
				})
			)) as WhyUsItem[];

			whyUsStats = extractPublished(apie.stats_cards as string[], cards);
		} catch (cause) {
			console.error('Failed to load `why_us_items` for areas', cause);
			whyUsStats = [];
		}
	}

	const title = pickFirstString(area.h1_title, area.label);
	const description = pickFirstString(area.short_description, area.description);

	const seoTitle =
		typeof area.seo?.title === 'string' && area.seo.title.trim().length ? area.seo.title : title;
	const seoDescription =
		typeof area.seo?.meta_description === 'string' && area.seo.meta_description.trim().length
			? area.seo.meta_description
			: description;

	const problemAnchor = pickFirstString(area.problem_anchor, 'problema');
	const solutionAnchor = pickFirstString(area.solution_anchor, 'sprendimas');
	const processAnchor = pickFirstString(area.process_anchor, 'procesas');
	const faqAnchor = pickFirstString(area.faq_anchor, 'faq');

	const orderedFaqItems = faqItemIds.length ? extractPublished(faqItemIds, faqItems) : [];

	const faqTitle = pickFirstString(
		area.faq_title_h2,
		site?.faq_title,
		'Dažniausiai užduodami klausimai'
	);
	const faqShort = pickFirstString(
		area.faq_short,
		site?.faq_short,
		'Atsakymai į dažniausiai užduodamus klausimus.'
	);
	const areaFaqDescription = pickFirstString(area.faq_description);
	const siteFaqDescription = pickFirstString(site?.faq_description);
	const faqDescriptionHtml = areaFaqDescription
		? renderMarkdownToHtml(areaFaqDescription)
		: siteFaqDescription
			? `<div class="markdown">${siteFaqDescription}</div>`
			: '';

	return {
		area: {
			id: area.id,
			title,
			subtitle: area.subtitle ?? '',
			shortDescription: area.short_description ?? '',
			fullPath: area.full_path ?? fullPath,
			seoTitle,
			seoDescription,
			jsonLd: typeof area.json_ld === 'string' ? area.json_ld : null
		},
		breadcrumb: [
			{ label: 'Pradžia', href: '/' },
			...(parentArea
				? [
						{
							label: pickFirstString(parentArea.label, parentArea.h1_title) || 'Tėvinė sritis',
							href: parentArea.full_path ?? undefined
						}
					]
				: []),
			{ label: title }
		],
		anchors: {
			problem: problemAnchor,
			solution: solutionAnchor,
			process: processAnchor,
			faq: faqAnchor
		},
		problem: {
			title: area.h2_problem_title ?? 'Problema',
			short: area.problem_short ?? '',
			descriptionHtml: renderMarkdownToHtml(area.problem_description),
			imageUrl: directusAssetUrl(area.problem_image),
			items: extractPublished(problemItemIds, problemItems).map((item) => ({
				title: item.title_h3 ?? '',
				icon: typeof item.icon === 'string' ? item.icon : '',
				short: item.short ?? '',
				descriptionHtml: renderMarkdownToHtml(item.description)
			}))
		},
		childrenAreas: extractPublished(childrenIds, childrenAreas).map((child) => ({
			id: child.id,
			title: pickFirstString(child.label, child.h1_title),
			description: child.short_description ?? '',
			href: child.full_path ?? ''
		})),
		solution: {
			title: area.h2_solution_title ?? 'Sprendimas',
			short: area.solution_short ?? '',
			descriptionHtml: renderMarkdownToHtml(area.solution_description),
			items: extractPublished(solutionItemIds, solutionItems).map((item) => ({
				title: item.title_h3 ?? '',
				short: item.short ?? '',
				descriptionHtml: renderMarkdownToHtml(item.description)
			}))
		},
		process: {
			title: area.h2_process_title ?? 'Procesas',
			short: area.process_short ?? '',
			imageUrl: directusAssetUrl(area.process_image),
			steps: extractPublished(processStepIds, processSteps).map((step) => ({
				title: step.title_h3 ?? '',
				descriptionHtml: renderMarkdownToHtml(step.description)
			}))
		},
		whyUs: apie
			? {
					heading: apie.kodel_h2 ?? '',
					descriptionHtml: renderMarkdownToHtml(apie.kodel_description),
					stats: whyUsStats.map((s) => ({
						stats: s.stats ?? '',
						description: s.description ?? ''
					}))
				}
			: null,
		faq: {
			title: faqTitle,
			short: faqShort,
			descriptionHtml: faqDescriptionHtml,
			items: orderedFaqItems.map((item) => ({
				id: item.id ?? '',
				question: item.question ?? '',
				answerHtml: renderMarkdownToHtml(item.answer)
			}))
		},
		relatedServices: services.map((s) => ({
			id: s.id ?? '',
			title: s.title_h1 ?? '',
			description: s.short_description ?? s.description_short ?? '',
			imageUrl: directusAssetUrl(s.service_image),
			href: s.slug ? `/p/${s.slug}` : ''
		})),
		relatedPosts: articles.map((a) => ({
			id: a.id ?? '',
			title: a.title_h1 ?? '',
			href: a.slug ? `/ziniu-centras/${a.slug}` : '',
			imageUrl: directusAssetUrl(a.image)
		}))
	};
};
