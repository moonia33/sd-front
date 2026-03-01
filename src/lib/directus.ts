import { createDirectus, rest } from '@directus/sdk';
import { PUBLIC_APIURL } from '$env/static/public';

type Fetch = typeof fetch;

export default function getDirectusInstance(customFetch?: Fetch) {
	const options = customFetch ? { globals: { fetch: customFetch } } : {};
	return createDirectus(PUBLIC_APIURL, options).with(rest());
}
