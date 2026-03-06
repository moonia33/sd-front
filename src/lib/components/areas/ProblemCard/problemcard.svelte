<!-- Features -->
<script lang="ts">
	import { icons } from '@lucide/svelte';
	import type { Component } from 'svelte';

	type ProblemItem = {
		title: string;
		icon?: string | null;
		short?: string;
		descriptionHtml?: string;
	};

	type Props = {
		title?: string;
		short?: string;
		descriptionHtml?: string;
		imageUrl?: string | null;
		imageAlt?: string;
		items?: ProblemItem[];
	};

	let {
		title = '',
		short = '',
		descriptionHtml = '',
		imageUrl = null,
		imageAlt = 'Problemos iliustracija',
		items = []
	}: Props = $props();

	const iconMap = icons as unknown as Record<string, Component>;
	const fallbackIcon = iconMap.SquareCheckBig ?? null;

	function normalizeIconName(iconName: string) {
		const trimmed = iconName.trim();
		if (!trimmed) return '';
		if (/^[A-Za-z][A-Za-z0-9]*$/.test(trimmed)) return trimmed;

		return trimmed
			.replace(/[^A-Za-z0-9]+/g, ' ')
			.trim()
			.split(' ')
			.filter(Boolean)
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
			.join('');
	}

	function resolveIcon(iconName: string | null | undefined): Component | null {
		const trimmed = typeof iconName === 'string' ? iconName.trim() : '';
		if (!trimmed) return fallbackIcon;

		return iconMap[trimmed] ?? iconMap[normalizeIconName(trimmed)] ?? fallbackIcon;
	}
</script>

<!-- Features -->
<div class="mx-auto max-w-340 px-4 xl:px-0">
	<!-- Grid -->
	<div class="md:grid md:grid-cols-3 md:items-start md:gap-12">
		<div class="m-auto">
			{#if imageUrl}
				<img class="rounded-xl" src={imageUrl} alt={imageAlt} loading="lazy" />
			{:else}
				<div class="min-h-64 rounded-xl bg-gray-100 dark:bg-neutral-700"></div>
			{/if}
		</div>
		<!-- End Col -->

		<div class="mt-10 md:col-span-2 md:mt-0">
			<div class="space-y-6 sm:space-y-8">
				<!-- Title -->
				<div class="space-y-2 md:space-y-4">
					<h2 class="text-3xl font-bold text-gray-800 lg:text-4xl dark:text-neutral-200">
						{title}
					</h2>
					{#if short}
						<p class="text-lg font-medium text-gray-700 dark:text-neutral-200">{short}</p>
					{/if}
					{#if descriptionHtml}
						<div class="text-gray-500 dark:text-neutral-400">
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html descriptionHtml}
						</div>
					{/if}
				</div>
				<!-- End Title -->

				<!-- List -->
				{#if items.length > 0}
					<ul class="space-y-3 sm:space-y-4">
						{#each items as item (item.title)}
							{@const Icon = resolveIcon(item.icon)}
							<li class="flex gap-x-3">
								<span
									class="mt-1 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-200"
									aria-hidden="true"
								>
									{#if Icon}
										<Icon class="size-3.5 shrink-0" aria-hidden="true" />
									{:else}
										<svg
											class="size-3.5 shrink-0"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<polyline points="20 6 9 17 4 12" />
										</svg>
									{/if}
								</span>
								<div class="grow">
									<p class="text-gray-700 dark:text-neutral-200">
										<span class="font-semibold">{item.title}</span>
										{#if item.short}
											<span class="text-gray-500 dark:text-neutral-400"> — {item.short}</span>
										{/if}
									</p>
									{#if item.descriptionHtml}
										<div class="mt-2 text-gray-500 dark:text-neutral-400">
											<!-- eslint-disable-next-line svelte/no-at-html-tags -->
											{@html item.descriptionHtml}
										</div>
									{/if}
								</div>
							</li>
						{/each}
					</ul>
				{/if}
				<!-- End List -->
			</div>
		</div>
		<!-- End Col -->
	</div>
	<!-- End Grid -->
</div>
<!-- End Features -->
