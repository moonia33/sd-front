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
	<title>Žinių centras</title>
</svelte:head>

<Breadcrumb items={[{ label: 'Pagrindinis', href: '/' }, { label: 'Žinių centras' }]} />

<div class="mx-auto max-w-340 px-4 pt-6 pb-12 sm:px-6 lg:px-8 lg:pt-10">
	<h1 class="text-2xl font-bold text-gray-800 md:text-3xl dark:text-neutral-200">Žinių centras</h1>

	{#if data.articles.length === 0}
		<p class="mt-4 text-gray-600 dark:text-neutral-400">Šiuo metu straipsnių nėra.</p>
	{:else}
		<div class="mt-6 space-y-4">
			{#each data.articles as article (article.slug)}
				<article
					class="rounded-xl border border-gray-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900"
				>
					<div class="flex items-start justify-between gap-6">
						<div class="min-w-0">
							<a
								href={`/ziniu-centras/${article.slug}`}
								class="text-lg font-semibold text-gray-800 hover:underline dark:text-neutral-200"
							>
								{article.title}
							</a>

							{#if article.subtitle}
								<p class="mt-1 text-gray-700 dark:text-neutral-300">{article.subtitle}</p>
							{/if}

							{#if article.shortDescription}
								<p class="mt-2 text-sm text-gray-600 dark:text-neutral-400">
									{article.shortDescription}
								</p>
							{/if}

							<div
								class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-neutral-400"
							>
								{#if data.authorName}
									<span>{data.authorName}</span>
									<span aria-hidden="true">•</span>
								{/if}
								{#if article.date}
									<time datetime={article.date}>{formatDate(article.date)}</time>
								{/if}
							</div>

							{#if article.tags.length > 0}
								<div class="mt-3 flex flex-wrap gap-2">
									{#each article.tags as tag (tag)}
										<span
											class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800 dark:bg-neutral-700 dark:text-neutral-200"
										>
											{tag}
										</span>
									{/each}
								</div>
							{/if}
						</div>

						{#if article.imageUrl}
							<img
								src={article.imageUrl}
								alt=""
								class="hidden h-20 w-28 shrink-0 rounded-lg object-cover sm:block"
								loading="lazy"
							/>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	{/if}
</div>
