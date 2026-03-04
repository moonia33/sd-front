<script lang="ts">
	type SolutionItem = {
		title: string;
		short?: string;
		descriptionHtml?: string;
	};

	type Props = {
		title?: string;
		short?: string;
		descriptionHtml?: string;
		items?: SolutionItem[];
	};

	let { title = '', short = '', descriptionHtml = '', items = [] }: Props = $props();
</script>

<!-- Icon Blocks -->
<div class="mx-auto max-w-340 px-4 xl:px-0">
	<!-- Grid -->
	<div class="grid gap-12 md:grid-cols-2">
		<div class="lg:w-3/4">
			<h2 class="text-3xl font-bold text-gray-800 lg:text-4xl dark:text-neutral-200">{title}</h2>
			{#if short}
				<p class="mt-3 text-gray-800 dark:text-neutral-200">{short}</p>
			{/if}
			{#if descriptionHtml}
				<div class="mt-4 text-gray-600 dark:text-neutral-300">
					{@html descriptionHtml}
				</div>
			{/if}
		</div>
		<!-- End Col -->

		<div class="m-auto space-y-6 lg:space-y-10">
			{#each items as item (item.title)}
				<div class="flex gap-x-5 sm:gap-x-8">
					<span
						class="mx-auto inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
						aria-hidden="true"
					>
						<svg
							class="size-5 shrink-0"
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
							<path d="M20 6 9 17 4 12" />
						</svg>
					</span>
					<div class="grow">
						<h3 class="text-base font-semibold text-gray-800 sm:text-lg dark:text-neutral-200">
							{item.title}
						</h3>
						{#if item.short}
							<p class="mt-1 text-gray-600 dark:text-neutral-300">{item.short}</p>
						{/if}
						{#if item.descriptionHtml}
							<div class="mt-2 text-gray-600 dark:text-neutral-300">
								{@html item.descriptionHtml}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
		<!-- End Col -->
	</div>
	<!-- End Grid -->
</div>
<!-- End Icon Blocks -->
