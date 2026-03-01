export type DirectusEnvelope<T> = {
	data: T;
};

export type DirectusListEnvelope<T> = {
	data: T[];
};

export type Status = 'draft' | 'published' | 'archived';

export type SEO = {
	meta_title?: string;
	meta_description?: string;
	og_image?: string;
	canonical_url?: string;
	[key: string]: unknown;
};

export type Site = {
	id: number;
	name: string;
	domain: string | null;
	status: Status | string | null;
	is_default: boolean | null;
	seo_title_default: string | null;
	seo_description_default: string | null;
	logo: number | null;
	tagline: string | null;
};

export type Media = {
	id: number;
	file: string;
	alt: string | null;
	title: string | null;
	caption: string | null;
	credit: string | null;
	ai_generated_alt: boolean | null;
	ai_prompt_context: string | null;
	site: number | null;
};

export type LogoAsset = {
	id: number;
	url: string;
	alt: string;
	title: string | null;
};

export type Sritis = {
	id: number;
	status: Status | string;
	title: string | null;
	menu_label?: string | null;
	menu_description?: string | null;
	menu_icon?: string | null;
	slug: string | null;
	full_path: string | null;
	seo: SEO | null;
	site: number | Site | null;
	parent: number | Sritis | null;
	content_builder?: Array<{
		collection: string;
		item: Record<string, unknown> | null;
		sort?: number | null;
	}> | null;
};
