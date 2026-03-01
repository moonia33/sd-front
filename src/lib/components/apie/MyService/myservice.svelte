<!-- Icon Blocks -->
<script lang="ts">
	import { icons } from '@lucide/svelte';
	import type { Component } from 'svelte';

	type ServiceItem = {
		title: string;
		description: string;
		slug: string;
		icon: string;
	};

	type Props = {
		heading?: string;
		descriptionHtml?: string;
		items?: ServiceItem[];
	};

	let { heading = '', descriptionHtml = '', items = [] }: Props = $props();

	function serviceHref(slug: string) {
		if (!slug) return null;
		return slug.startsWith('/') ? slug : `/paslaugos/${slug}`;
	}

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

	function resolveIcon(iconName: string): Component | null {
		const trimmed = iconName?.trim();
		if (!trimmed) return null;

		const iconMap = icons as unknown as Record<string, Component>;
		return iconMap[trimmed] ?? iconMap[normalizeIconName(trimmed)] ?? null;
	}
</script>

<div class="mx-auto max-w-5xl px-4 py-12 lg:py-20">
	<!-- <div class="mx-auto max-w-4xl"> -->
	<!-- Grid -->
	<div class="grid gap-12">
		<div>
			<h2 class="text-2xl font-semibold text-gray-800 lg:text-2xl dark:text-neutral-200">
				{heading}
			</h2>
			<div class="mt-3 text-gray-800 dark:text-neutral-200">{@html descriptionHtml}</div>
		</div>

		<div class="space-y-6 lg:space-y-10">
			{#each items as service}
				{@const Icon = resolveIcon(service.icon)}
				<div class="flex gap-x-5 sm:gap-x-8">
					{#if Icon}
						<Icon
							class="mt-2 size-6 shrink-0 text-gray-800 dark:text-neutral-200"
							aria-hidden="true"
						/>
					{/if}
					<div class="grow">
						<h3 class="text-base font-semibold text-gray-800 sm:text-lg dark:text-neutral-200">
							{service.title}
						</h3>
						<p class="mt-1 text-gray-600 dark:text-neutral-300">
							{service.description}
						</p>

						{#if serviceHref(service.slug)}
							<a
								class="mt-2 inline-flex cursor-pointer text-sm font-semibold text-gray-800 hover:underline dark:text-neutral-200"
								href={serviceHref(service.slug) ?? '/'}
							>
								Plačiau
							</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
	<!-- End Grid -->
	<!-- </div> -->
</div>
<!-- End Icon Blocks -->
