<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { onDestroy, onMount, tick } from 'svelte';
	import Navigation from '$lib/components/Navigation/navigation.svelte';
	import Footer from '$lib/components/Footer/footer.svelte';
	import BackToTop from '$lib/components/BackToTop/back-to-top.svelte';
	import '../app.css';

	let { children, data } = $props();

	let isNavigating = $state(false);
	let progress = $state(0);
	let showTimeout: ReturnType<typeof setTimeout> | null = null;
	let finishTimeout: ReturnType<typeof setTimeout> | null = null;
	let progressInterval: ReturnType<typeof setInterval> | null = null;

	function normalizeHeadScripts(raw: unknown): string | null {
		if (typeof raw !== 'string') return null;
		const trimmed = raw.trim();
		if (!trimmed) return null;

		// If CMS stores JSON-LD content without <script>, browsers may move it out of <head>.
		// Wrap it to keep it valid.
		const looksLikeJson =
			(trimmed.startsWith('{') && trimmed.endsWith('}')) ||
			(trimmed.startsWith('[') && trimmed.endsWith(']'));
		const containsHtml = trimmed.includes('<');
		if (!containsHtml && looksLikeJson) {
			return '<script type="application/ld+json">' + trimmed + '</scr' + 'ipt>';
		}

		return trimmed;
	}

	function normalizeBodyScripts(raw: unknown): string | null {
		if (typeof raw !== 'string') return null;
		const trimmed = raw.trim();
		if (!trimmed) return null;

		// If CMS stores plain JS without <script>, wrap it to avoid rendering as text.
		if (!trimmed.includes('<')) {
			return '<script>' + trimmed + '</scr' + 'ipt>';
		}

		return trimmed;
	}

	function clearProgressTimers() {
		if (showTimeout) {
			clearTimeout(showTimeout);
			showTimeout = null;
		}
		if (finishTimeout) {
			clearTimeout(finishTimeout);
			finishTimeout = null;
		}
		if (progressInterval) {
			clearInterval(progressInterval);
			progressInterval = null;
		}
	}

	function startProgress() {
		clearProgressTimers();
		isNavigating = false;
		progress = 0;

		// Subtle delay to avoid flicker on very fast navigations
		showTimeout = setTimeout(() => {
			isNavigating = true;
			progress = 0.12;
			progressInterval = setInterval(() => {
				// Ease towards ~90% while the navigation is in-flight
				progress = Math.min(0.9, progress + (1 - progress) * 0.12);
			}, 120);
		}, 120);
	}

	function finishProgress() {
		if (showTimeout && !isNavigating) {
			clearTimeout(showTimeout);
			showTimeout = null;
			return;
		}
		if (!isNavigating) return;

		clearProgressTimers();
		progress = 1;
		finishTimeout = setTimeout(() => {
			isNavigating = false;
			progress = 0;
		}, 220);
	}

	const autoInitPreline = async () => {
		if (typeof window === 'undefined') return;

		// Ensure Preline + plugins are loaded before trying to auto-init components
		await import('$lib/client/init');

		const hs = (window as unknown as { HSStaticMethods?: { autoInit?: () => void } })
			.HSStaticMethods;
		hs?.autoInit?.();
	};

	onMount(() => {
		void autoInitPreline();
	});

	beforeNavigate(() => {
		startProgress();
	});

	afterNavigate(async () => {
		// Wait until the new DOM is in place
		await tick();
		await autoInitPreline();
		finishProgress();
	});

	onDestroy(() => {
		clearProgressTimers();
	});
</script>

<svelte:head>
	{#if data?.siteAssets?.faviconUrl}
		<link rel="icon" href={data.siteAssets.faviconUrl} />
	{/if}
	{#if data?.site?.header_scripts}
		{@const headerScripts = normalizeHeadScripts(data.site.header_scripts)}
		{#if headerScripts}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html headerScripts}
		{/if}
	{/if}
</svelte:head>

<a
	href="#content"
	class="bg-background text-foreground border-layer-line sr-only fixed top-2 left-2 z-[60] rounded-md border px-3 py-2 focus:not-sr-only focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
>
	Pereiti prie turinio
</a>

<div class="overflow-hidden">
	<header
		class="bg-navbar border-navbar-line sticky top-0 z-50 flex w-full flex-wrap border-b py-2 md:flex-nowrap md:justify-start"
	>
		<Navigation
			siteName={data?.site?.site_name ?? undefined}
			logoUrl={data?.siteAssets?.logoDefaultUrl ?? undefined}
			logoTitle={data?.site?.site_name ?? undefined}
			menuItems={data?.navigation?.main ?? []}
		/>
	</header>

	<main id="content" tabindex="-1">
		{@render children()}
	</main>

	<footer class="dark:bg-inverse mt-auto w-full bg-slate-200">
		<hr />
		<Footer site={data?.site ?? null} menuItems={data?.navigation?.footer ?? []} />
	</footer>
</div>

<BackToTop />

{#if data?.site?.footer_scripts}
	{@const footerScripts = normalizeBodyScripts(data.site.footer_scripts)}
	{#if footerScripts}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html footerScripts}
	{/if}
{/if}

<!-- Subtle navigation progress bar -->
<div aria-hidden="true" class="pointer-events-none fixed top-0 left-0 z-50 h-0.5 w-full">
	<div
		class="bg-primary h-full origin-left transition-[transform,opacity] duration-300 ease-out"
		style:opacity={isNavigating ? 1 : 0}
		style:transform={`scaleX(${progress})`}
	></div>
</div>
