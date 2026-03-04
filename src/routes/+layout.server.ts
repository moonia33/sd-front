import { readItem } from '@directus/sdk';
import type { LayoutServerLoad } from './$types';

import { PUBLIC_SITE_ID } from '$env/static/public';
import {
	directusAssetUrl,
	getDirectusServerClient,
	type Navigation,
	type NavigationItem,
	type Site
} from '$lib/server/directus';

import type { NavLink } from '$lib/types/navigation';

const DEFAULT_SITE_ID = '3523a2f2-f7f7-427b-8081-45a13fbbb850';

function asObject<T extends Record<string, unknown>>(value: unknown): T | null {
	return value && typeof value === 'object' ? (value as T) : null;
}

function resolveHref(item: NavigationItem): string | null {
	const type = item.type;
	if (type === 'url') return typeof item.url === 'string' ? item.url : null;

	if (type === 'pages') {
		const page = asObject<{ slug?: unknown }>(item.page);
		const slug = page?.slug;
		return typeof slug === 'string' && slug.length ? `/${slug}` : null;
	}

	if (type === 'areas') {
		const area = asObject<{ full_path?: unknown; slug?: unknown }>(item.area);
		const fullPath = area?.full_path;
		if (typeof fullPath === 'string' && fullPath.length) return fullPath;
		const slug = area?.slug;
		return typeof slug === 'string' && slug.length ? `/${slug}` : null;
	}

	if (type === 'services') {
		const service = asObject<{ slug?: unknown }>(item.service);
		const slug = service?.slug;
		return typeof slug === 'string' && slug.length ? `/p/${slug}` : null;
	}

	if (type === 'articles') {
		const article = asObject<{ slug?: unknown }>(item.article);
		const slug = article?.slug;
		return typeof slug === 'string' && slug.length ? `/ziniu-centras/${slug}` : null;
	}

	return null;
}

function resolveDescription(item: NavigationItem): string | null {
	if (item.type === 'services') {
		const service = asObject<{ short_description?: unknown }>(item.service);
		const sd = service?.short_description;
		if (typeof sd === 'string' && sd.trim().length) return sd.trim();
	}

	if (item.type === 'areas') {
		const area = asObject<{ short_description?: unknown }>(item.area);
		const sd = area?.short_description;
		if (typeof sd === 'string' && sd.trim().length) return sd.trim();
	}

	if (item.type === 'pages') {
		const page = asObject<{ short_description?: unknown }>(item.page);
		const sd = page?.short_description;
		if (typeof sd === 'string' && sd.trim().length) return sd.trim();
	}

	if (item.type === 'articles') {
		const article = asObject<{ short_description?: unknown }>(item.article);
		const sd = article?.short_description;
		if (typeof sd === 'string' && sd.trim().length) return sd.trim();
	}

	if (typeof item.text === 'string' && item.text.trim().length) return item.text.trim();

	return null;
}

function resolveIconName(item: NavigationItem): string | null {
	if (item.type === 'services') {
		const service = asObject<{ icon?: unknown }>(item.service);
		const icon = service?.icon;
		if (typeof icon === 'string' && icon.trim().length) return icon.trim();
	}

	if (item.type === 'areas') {
		const area = asObject<{ icon?: unknown }>(item.area);
		const icon = area?.icon;
		if (typeof icon === 'string' && icon.trim().length) return icon.trim();
	}

	if (item.type === 'pages') {
		const page = asObject<{ icon?: unknown }>(item.page);
		const icon = page?.icon;
		if (typeof icon === 'string' && icon.trim().length) return icon.trim();
	}

	if (item.type === 'articles') {
		const article = asObject<{ og_image?: unknown; icon?: unknown }>(item.article);
		const icon = article?.icon;
		if (typeof icon === 'string' && icon.trim().length) return icon.trim();
	}

	if (typeof item.icon_name === 'string' && item.icon_name.trim().length)
		return item.icon_name.trim();

	return null;
}

function resolveTitle(item: NavigationItem): string {
	const type = item.type;
	if (type === 'areas') {
		const area = asObject<{ label?: unknown; h1_title?: unknown }>(item.area);
		const label = area?.label;
		if (typeof label === 'string' && label.length) return label;
		const h1 = area?.h1_title;
		if (typeof h1 === 'string' && h1.length) return h1;
	}
	if (type === 'services') {
		const service = asObject<{ title_h1?: unknown }>(item.service);
		const title = service?.title_h1;
		if (typeof title === 'string' && title.trim().length) return title.trim();
	}
	if (type === 'pages') {
		const page = asObject<{ label?: unknown }>(item.page);
		const label = page?.label;
		if (typeof label === 'string' && label.trim().length) return label.trim();
	}
	if (type === 'articles') {
		const article = asObject<{ title_h1?: unknown }>(item.article);
		const title = article?.title_h1;
		if (typeof title === 'string' && title.trim().length) return title.trim();
	}
	return typeof item.title === 'string' ? item.title : '';
}

function isPublishedRelation(value: unknown): boolean {
	const obj = asObject<{ status?: unknown }>(value);
	const status = obj?.status;
	if (typeof status !== 'string') return true;
	return status === 'published';
}

function isNavItemPublished(item: NavigationItem): boolean {
	if (item.type === 'areas') return isPublishedRelation(item.area);
	if (item.type === 'services') return isPublishedRelation(item.service);
	if (item.type === 'articles') return isPublishedRelation(item.article);
	if (item.type === 'pages') return isPublishedRelation(item.page);
	return true;
}

function toNavLinkOrNull(raw: NavigationItem): NavLink | null {
	const children = Array.isArray(raw.children)
		? raw.children.map(toNavLinkOrNull).filter((c): c is NavLink => !!c)
		: [];

	if (raw.type === 'group') {
		if (children.length === 0) return null;
	} else {
		if (!isNavItemPublished(raw)) return null;
	}

	const title = resolveTitle(raw);
	if (!title.trim()) return null;

	return {
		id: raw.id ?? `${raw.title ?? ''}-${raw.sort ?? ''}`,
		title,
		href: resolveHref(raw),
		description: resolveDescription(raw),
		iconName: resolveIconName(raw),
		children
	};
}

async function loadNavigation(
	directus: ReturnType<typeof getDirectusServerClient>,
	navigationId: string
): Promise<NavLink[]> {
	let nav: Navigation | null = null;
	try {
		nav = (await directus.request(
			readItem('navigation', navigationId, {
				fields: [
					'id',
					'title',
					'is_active',
					'items.*',
					'items.children.*',
					'items.text',
					'items.icon_name',
					'items.children.text',
					'items.children.icon_name',
					'items.page.slug',
					'items.page.label',
					'items.page.short_description',
					'items.page.icon',
					'items.page.status',
					'items.area.full_path',
					'items.area.slug',
					'items.area.label',
					'items.area.h1_title',
					'items.area.short_description',
					'items.area.icon',
					'items.area.status',
					'items.service.slug',
					'items.service.title_h1',
					'items.service.short_description',
					'items.service.icon',
					'items.service.status',
					'items.article.slug',
					'items.article.title_h1',
					'items.article.short_description',
					'items.article.status',
					'items.children.page.slug',
					'items.children.page.label',
					'items.children.page.short_description',
					'items.children.page.icon',
					'items.children.page.status',
					'items.children.area.full_path',
					'items.children.area.slug',
					'items.children.area.label',
					'items.children.area.h1_title',
					'items.children.area.short_description',
					'items.children.area.icon',
					'items.children.area.status',
					'items.children.service.slug',
					'items.children.service.title_h1',
					'items.children.service.short_description',
					'items.children.service.icon',
					'items.children.service.status',
					'items.children.article.slug',
					'items.children.article.title_h1',
					'items.children.article.short_description',
					'items.children.article.status'
				]
			})
		)) as Navigation;
	} catch (cause) {
		console.error('Failed to load navigation from Directus', { navigationId, cause });
		return [];
	}

	if (!nav?.is_active) return [];
	const items = (Array.isArray(nav.items) ? nav.items : []).filter(
		(i): i is NavigationItem => !!i && typeof i === 'object'
	);
	return items.map(toNavLinkOrNull).filter((i): i is NavLink => !!i);
}

export const load: LayoutServerLoad = async ({ fetch }) => {
	const directus = getDirectusServerClient(fetch);

	const siteId = PUBLIC_SITE_ID || DEFAULT_SITE_ID;

	let site: Site | null = null;
	try {
		site = (await directus.request(
			readItem('sites', siteId, {
				fields: [
					'id',
					'domain',
					'site_name',
					'brand_name',
					'favicon',
					'logo_default',
					'logo_dark',
					'contact_email',
					'contact_phone',
					'faq_title',
					'faq_short',
					'faq_description',
					'header_scripts',
					'footer_scripts',
					'navigation',
					'profiles'
				]
			})
		)) as Site;
	} catch (cause) {
		console.error('Failed to load `sites` record from Directus', { siteId, cause });
	}

	const siteAssets = {
		faviconUrl: directusAssetUrl(site?.favicon),
		logoDefaultUrl: directusAssetUrl(site?.logo_default),
		logoDarkUrl: directusAssetUrl(site?.logo_dark)
	};

	const navMain = await loadNavigation(directus, 'main');
	const navFooter = await loadNavigation(directus, 'footer');

	return {
		site,
		siteAssets,
		navigation: {
			main: navMain,
			footer: navFooter
		}
	};
};
