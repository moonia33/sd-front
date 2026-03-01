<script lang="ts">
	import Breadcrumb from '$lib/components/BreadCrumb/breadcrumb.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const dateFormatter = new Intl.DateTimeFormat('lt-LT', {
		year: 'numeric',
		month: 'long',
		day: '2-digit'
	});

	function formatDate(dateIso: string) {
		const date = new Date(dateIso);
		return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date);
	}
</script>

<svelte:head>
	<title>{data.article.title || 'Straipsnis'}</title>
	{#if data.seo?.meta_description}
		<meta name="description" content={data.seo.meta_description} />
	{/if}
	{#if data.jsonLd}
		<script type="application/ld+json">
{@html data.jsonLd}
		</script>
	{/if}
</svelte:head>

<Breadcrumb
	items={[
		{ label: 'Pagrindinis', href: '/' },
		{ label: 'Žinių centras', href: '/ziniu-centras' },
		{ label: data.article.title || 'Straipsnis' }
	]}
/>

<div
	class="mx-auto mb-8 max-w-5xl rounded-2xl bg-slate-100 px-4 pt-6 pb-12 sm:px-6 lg:px-8 lg:pt-10 dark:bg-gray-950"
>
	<header class="space-y-3">
		<h1 class="text-2xl font-bold text-gray-800 md:text-3xl dark:text-neutral-200">
			{data.article.title}
		</h1>

		{#if data.article.subtitle}
			<p class="text-lg text-gray-800 dark:text-neutral-200">{data.article.subtitle}</p>
		{/if}

		<div
			class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-neutral-400"
		>
			{#if data.authorName}
				<span>{data.authorName}</span>
				<span aria-hidden="true">•</span>
			{/if}
			{#if data.article.date}
				<time datetime={data.article.date}>{formatDate(data.article.date)}</time>
			{/if}
		</div>

		{#if data.article.shortDescription}
			<p class="text-gray-700 dark:text-neutral-300">{data.article.shortDescription}</p>
		{/if}
	</header>

	{#if data.article.imageUrl}
		<figure class="mt-8">
			<img
				class="w-full rounded-xl object-cover"
				src={data.article.imageUrl}
				alt=""
				loading="lazy"
			/>
		</figure>
	{/if}

	{#if data.article.tags.length > 0}
		<div class="mt-6 flex flex-wrap gap-2">
			{#each data.article.tags as tag (tag)}
				<span
					class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800 dark:bg-neutral-700 dark:text-neutral-200"
				>
					{tag}
				</span>
			{/each}
		</div>
	{/if}

	{#if data.article.contentHtml}
		<div class="prose mt-8 max-w-none dark:prose-invert">
			{@html data.article.contentHtml}
		</div>
	{:else}
		<p class="mt-8 text-gray-600 dark:text-neutral-400">Turinio nėra.</p>
	{/if}
</div>
