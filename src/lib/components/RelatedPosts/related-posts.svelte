<script lang="ts">
	import { resolve } from '$app/paths';

	type PostItem = {
		id?: string;
		title: string;
		href?: string;
		imageUrl?: string | null;
		category?: string;
	};

	type Props = {
		heading?: string;
		subheading?: string;
		items?: PostItem[];
		ctaLabel?: string;
		ctaHref?: string;
	};

	let {
		heading = 'Naujausi įrašai',
		subheading = 'Keli naudingi straipsniai ir naujienos.',
		items = [
			{
				id: 'demo-1',
				title: 'Pavyzdinis straipsnis',
				href: '/ziniu-centras',
				imageUrl:
					'https://images.unsplash.com/photo-1668869713519-9bcbb0da7171?auto=format&fit=crop&w=560&q=80',
				category: 'Naujienos'
			},
			{
				id: 'demo-2',
				title: 'Dar vienas įrašas',
				href: '/ziniu-centras',
				imageUrl:
					'https://images.unsplash.com/photo-1668584054035-f5ba7d426401?auto=format&fit=crop&w=560&q=80',
				category: 'Įžvalgos'
			}
		],
		ctaLabel = 'Žinių centras',
		ctaHref = '/ziniu-centras'
	}: Props = $props();

	function normalizeHref(href: string | undefined) {
		const trimmed = href?.trim();
		if (!trimmed || trimmed === '#') return null;
		const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
		return normalized as `/${string}`;
	}
</script>

<!-- Card Blog -->
<div class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<!-- Title -->
	<div class="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
		<h2 class="text-2xl font-bold text-gray-800 md:text-4xl md:leading-tight dark:text-neutral-200">
			{heading}
		</h2>
		{#if subheading}
			<p class="mt-1 text-gray-600 dark:text-neutral-300">{subheading}</p>
		{/if}
	</div>
	<!-- End Title -->

	<!-- Grid -->
	<div class="mb-10 grid gap-6 sm:grid-cols-2 lg:mb-14 lg:grid-cols-4">
		{#each items as item (item.id ?? item.title)}
			{@const href =
				normalizeHref(item.href) ?? normalizeHref(ctaHref) ?? ('/ziniu-centras' as `/${string}`)}
			<a
				class="group flex flex-col rounded-xl border border-gray-200 bg-white shadow-2xs transition hover:shadow-md focus:shadow-md focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800"
				href={resolve(href)}
			>
				<div class="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-neutral-700">
					{#if item.imageUrl}
						<img class="w-full rounded-t-xl object-cover" src={item.imageUrl} alt={item.title} />
					{/if}
				</div>
				<div class="p-4 md:p-5">
					{#if item.category}
						<p class="mt-2 text-xs text-gray-600 uppercase dark:text-neutral-300">
							{item.category}
						</p>
					{/if}
					<h3
						class="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-700 dark:text-neutral-200 dark:group-hover:text-blue-600"
					>
						{item.title}
					</h3>
				</div>
			</a>
		{/each}
	</div>
	<!-- End Grid -->

	<!-- Card -->
	<div class="text-center">
		<div
			class="inline-block rounded-full border border-gray-200 bg-white shadow-2xs dark:bg-neutral-800"
		>
			<div class="flex items-center gap-x-2 px-4 py-3">
				<p class="text-gray-600 dark:text-neutral-300">Norite daugiau?</p>
				<a
					class="inline-flex items-center gap-x-1.5 font-medium text-blue-600 decoration-2 hover:underline focus:underline focus:outline-hidden dark:text-blue-500"
					href={resolve(normalizeHref(ctaHref) ?? ('/ziniu-centras' as `/${string}`))}
				>
					{ctaLabel}
					<svg
						class="size-4 shrink-0"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
					>
				</a>
			</div>
		</div>
	</div>
	<!-- End Card -->
</div>
<!-- End Card Blog -->
