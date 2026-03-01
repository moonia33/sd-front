import { getDirectusServerClient } from '$lib/server/directus';
import type { PageServerLoad } from './$types';
import { readItem, readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';
import { PUBLIC_SITE_ID } from '$env/static/public';
import type { Site } from '$lib/server/directus';

export const load: PageServerLoad = async ({ fetch }) => {
	const directus = getDirectusServerClient(fetch);

	let site: Site | undefined;
	if (PUBLIC_SITE_ID) {
		try {
			site = await directus.request(readItem('sites', PUBLIC_SITE_ID));
		} catch {
			// Fallback: if the specific ID isn't accessible, use the first available site
			const sites = await directus.request(readItems('sites', { limit: 1 }));
			site = sites?.[0];
		}
	} else {
		const sites = await directus.request(readItems('sites', { limit: 1 }));
		site = sites?.[0];
	}

	if (!site) {
		throw error(404, 'Site not found');
	}

	return {
		site
	};
};
