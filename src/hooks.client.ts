import type { ClientInit, HandleClientError } from '@sveltejs/kit';

export const init: ClientInit = async () => {
	await import('./lib/client/init');
};

export const handleError: HandleClientError = ({ error }) => {
	console.error(error);
};
