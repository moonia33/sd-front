<script lang="ts">
	import { resolve } from '$app/paths';
	import { icons } from '@lucide/svelte';
	import type { Component } from 'svelte';

	type AreaItem = {
		id: string;
		title: string;
		description: string;
		icon: string;
		fullPath: string;
	};

	type Props = {
		heading?: string;
		descriptionHtml?: string;
		items?: AreaItem[];
	};

	let { heading = '', descriptionHtml = '', items = [] }: Props = $props();

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

	function normalizePath(fullPath: string) {
		const trimmed = fullPath.trim();
		if (!trimmed) return null;
		const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
		return normalized as `/${string}`;
	}
</script>

<!-- Card Section -->
<div class="mx-auto max-w-340 px-4 py-12 lg:py-20">
	<!-- Title -->
	<div class="mb-10 max-w-3xl lg:mb-14">
		{#if heading}
			<h2
				class="text-2xl font-semibold text-gray-900 md:text-2xl md:leading-tight dark:text-neutral-200"
			>
				{heading}
			</h2>
		{/if}
		{#if descriptionHtml}
			<div class="mt-1 text-gray-700 dark:text-neutral-400">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html descriptionHtml}
			</div>
		{/if}
	</div>
	<!-- End Title -->

	<!-- Grid -->
	<div class="grid gap-3 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-3">
		{#each items as area (area.id)}
			{@const href = normalizePath(area.fullPath)}
			{@const Icon = resolveIcon(area.icon)}
			{#if href}
				<a
					class="group flex flex-col rounded-xl border border-gray-200 bg-white shadow-2xs transition hover:shadow-md focus:shadow-md focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800"
					href={resolve(href)}
				>
					<div class="p-4 md:p-5">
						<div class="flex items-center justify-between gap-x-3">
							<div class="grow">
								<h3
									class="font-semibold text-gray-800 group-hover:text-blue-700 dark:text-neutral-200 dark:group-hover:text-blue-600"
								>
									{area.title}
								</h3>
								<p class="text-sm text-gray-600 dark:text-neutral-400">{area.description}</p>
							</div>
							{#if Icon}
								<div>
									<Icon
										class="size-5 shrink-0 text-gray-800 dark:text-neutral-200"
										aria-hidden="true"
									/>
								</div>
							{/if}
						</div>
					</div>
				</a>
			{:else}
				<div
					class="flex flex-col rounded-xl border border-gray-200 bg-white shadow-2xs dark:border-neutral-700 dark:bg-neutral-800"
				>
					<div class="p-4 md:p-5">
						<div class="flex items-center justify-between gap-x-3">
							<div class="grow">
								<h3 class="font-semibold text-gray-800 dark:text-neutral-200">{area.title}</h3>
								<p class="text-sm text-gray-600 dark:text-neutral-400">{area.description}</p>
							</div>
							{#if Icon}
								<div>
									<Icon
										class="size-5 shrink-0 text-gray-800 dark:text-neutral-200"
										aria-hidden="true"
									/>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<!-- End Grid -->
</div>
<!-- End Card Section -->
