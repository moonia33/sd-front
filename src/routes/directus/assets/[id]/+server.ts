import { PUBLIC_APIURL } from '$env/static/public';
import { DIRECTUS_TOKEN } from '$env/static/private';
import type { RequestHandler } from './$types';

function pickHeader(upstream: Headers, name: string) {
	const value = upstream.get(name);
	return value ? [name, value] : null;
}

export const GET: RequestHandler = async ({ fetch, params }) => {
	const id = params.id;
	const base = PUBLIC_APIURL.replace(/\/+$/, '');
	const url = `${base}/assets/${encodeURIComponent(id)}`;

	const upstream = await fetch(url, {
		headers: {
			Authorization: `Bearer ${DIRECTUS_TOKEN}`
		}
	});

	if (!upstream.ok || !upstream.body) {
		return new Response(await upstream.text(), {
			status: upstream.status,
			headers: {
				'Content-Type': upstream.headers.get('Content-Type') ?? 'text/plain; charset=utf-8'
			}
		});
	}

	const headers = new Headers();
	for (const entry of [
		pickHeader(upstream.headers, 'Content-Type'),
		pickHeader(upstream.headers, 'Content-Length'),
		pickHeader(upstream.headers, 'Cache-Control'),
		pickHeader(upstream.headers, 'ETag'),
		pickHeader(upstream.headers, 'Last-Modified')
	]) {
		if (entry) headers.set(entry[0], entry[1]);
	}

	return new Response(upstream.body, {
		status: upstream.status,
		headers
	});
};
