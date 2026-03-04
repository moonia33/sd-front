import { createDirectus, rest, staticToken } from '@directus/sdk';
import { PUBLIC_APIURL } from '$env/static/public';
import { DIRECTUS_TOKEN } from '$env/static/private';

type Fetch = typeof fetch;

export type Site = {
	id?: string;
	site_name?: string;
	domain?: string;
	brand_name?: string;
	favicon?: string | null;
	logo_default?: string | null;
	logo_dark?: string | null;
	contact_email?: string;
	contact_phone?: string;
	faq_title?: string | null;
	faq_short?: string | null;
	faq_description?: string | null;
	google_analytics_id?: string | null;
	facebook_pixel_id?: string | null;
	tag_manager_id?: string | null;
	header_scripts?: string | null;
	footer_scripts?: string | null;
	profiles?: Array<{ profile_title?: string; link?: string; [key: string]: unknown }> | null;
	navigation?: string[] | null;
	[key: string]: unknown;
};

export type SeoFields = {
	title?: string;
	meta_description?: string;
	focus_keyphrase?: string;
	og_image?: string;
	sitemap?: {
		priority?: string;
		change_frequency?: string;
	};
	no_index?: boolean;
	no_follow?: boolean;
	additional_fields?: Record<string, unknown>;
	[key: string]: unknown;
};

export type WhyUsItem = {
	id?: string;
	stats?: string;
	description?: string;
	[key: string]: unknown;
};

export type ApieMane = {
	id?: string;
	image?: string;
	title?: string;
	santrauka?: string;
	description?: string;
	kodel_h2?: string;
	kodel_description?: string;
	title_h2?: string;
	paslaugos_h3?: string;
	paslaugos_text?: string;
	sritys_h3?: string;
	sritys_text?: string;
	subtitle?: string;
	cta_label?: string;
	cta_link?: string;
	legal_name?: string;
	learning_description?: string;
	seminarai_h3?: string;
	seminarai_text?: string;
	stats_cards?: string[];
	seminarai?: string[];
	services?: string[];
	paslaugos?: string[];
	teises_sritys?: string[];
	areas?: string[];
	sritys?: string[];
	json_ld?: string;
	seo?: SeoFields;
	[key: string]: unknown;
};

export type Service = {
	id?: string;
	title_h1?: string;
	short_description?: string;
	description_short?: string;
	service_image?: string | null;
	slug?: string;
	icon?: string;
	[key: string]: unknown;
};

export type ProblemItem = {
	id?: string;
	status?: string;
	title_h3?: string;
	short?: string;
	description?: string;
	icon?: string | null;
	[key: string]: unknown;
};

export type SolutionItem = {
	id?: string;
	status?: string;
	title_h3?: string;
	short?: string;
	description?: string;
	icon?: string | null;
	[key: string]: unknown;
};

export type ProcessStep = {
	id?: string;
	status?: string;
	title_h3?: string;
	description?: string;
	icon?: string | null;
	[key: string]: unknown;
};

export type FaqItem = {
	id?: string;
	status?: string;
	question?: string;
	answer?: string;
	icon?: string | null;
	[key: string]: unknown;
};

export type Page = {
	id?: string;
	slug?: string;
	label?: string;
	icon?: string;
	short_description?: string;
	[key: string]: unknown;
};

export type Seminar = {
	id?: string;
	data?: string;
	tema?: string;
	istaiga?: string;
	[key: string]: unknown;
};

export type Area = {
	id: string;
	h1_title?: string;
	label?: string;
	subtitle?: string;
	short_description?: string;
	description?: string;
	icon?: string;
	full_path?: string;
	status?: string;
	parent?: string | null;
	general_image?: string | null;
	tags?: unknown;
	h2_problem_title?: string;
	problem_short?: string;
	problem_description?: string | null;
	problem_image?: string | null;
	h2_solution_title?: string;
	solution_short?: string;
	solution_description?: string | null;
	solution_image?: string | null;
	h2_process_title?: string;
	process_short?: string;
	process_image?: string | null;
	faq_title_h2?: string;
	faq_short?: string;
	faq_description?: string | null;
	json_ld?: string | null;
	seo?: SeoFields;
	children?: unknown;
	problem_item?: unknown;
	solution_item?: unknown;
	process_step?: unknown;
	faq_item?: unknown;
	faq_anchor?: string | null;
	process_anchor?: string | null;
	solution_anchor?: string | null;
	problem_anchor?: string | null;
	apie_mane?: string | null;
	[key: string]: unknown;
};

export type Article = {
	id?: string;
	title_h1?: string;
	subtitle?: string;
	short_description?: string;
	article?: string;
	slug?: string;
	tags?: unknown;
	status?: string;
	date_created?: string;
	date_updated?: string;
	image?: string;
	seo?: SeoFields;
	json_ld?: string;
	[key: string]: unknown;
};

export type Tag = {
	id?: string;
	sort?: number | null;
	name?: string;
	slug?: string;
	[key: string]: unknown;
};

export type NavigationItemType =
	| 'url'
	| 'pages'
	| 'areas'
	| 'articles'
	| 'services'
	| 'group'
	| string;

export type NavigationItem = {
	id?: string;
	sort?: number | null;
	date_created?: string;
	title?: string;
	type?: NavigationItemType;
	parent?: string | null;
	navigation?: string | null;
	url?: string | null;
	text?: string | null;
	icon_name?: string | null;
	page?: Page | string | null;
	area?: Area | string | null;
	article?: Article | string | null;
	service?: Service | string | null;
	children?: NavigationItem[];
	[key: string]: unknown;
};

export type Navigation = {
	id: string;
	date_created?: string;
	title?: string;
	is_active?: boolean;
	sites?: string | Site | null;
	items?: Array<NavigationItem | string>;
	[key: string]: unknown;
};

export type DirectusSchema = {
	sites: Site[];
	apie_mane: ApieMane;
	why_us_items: WhyUsItem[];
	seminarai: Seminar[];
	pages: Page[];
	services: Service[];
	tags: Tag[];
	areas: Area[];
	articles: Article[];
	problem_items: ProblemItem[];
	solution_items: SolutionItem[];
	process_steps: ProcessStep[];
	faq_items: FaqItem[];
	navigation: Navigation[];
	navigation_items: NavigationItem[];
};

export function directusAssetUrl(fileId: string | null | undefined) {
	if (!fileId) return null;
	return `/directus/assets/${fileId}`;
}

export function getDirectusServerClient(customFetch?: Fetch) {
	const options = customFetch ? { globals: { fetch: customFetch } } : {};

	return createDirectus<DirectusSchema>(PUBLIC_APIURL, options)
		.with(rest())
		.with(staticToken(DIRECTUS_TOKEN));
}
