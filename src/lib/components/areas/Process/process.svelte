<script lang="ts">
	type Step = {
		title: string;
		descriptionHtml?: string;
	};

	type Props = {
		title?: string;
		short?: string;
		imageUrl?: string | null;
		imageAlt?: string;
		steps?: Step[];
	};

	let {
		title = 'Procesas',
		short = '',
		imageUrl = null,
		imageAlt = 'Proceso iliustracija',
		steps = []
	}: Props = $props();
</script>

<!-- Approach -->
<div class="mx-auto max-w-340 px-4 xl:px-0">
	<!-- Title -->
	<div class="mb-10 max-w-340 lg:mb-14">
		<h2 class="text-2xl font-semibold text-gray-800 md:text-4xl dark:text-neutral-200">{title}</h2>
		{#if short}
			<p class="mt-1 text-gray-500 dark:text-neutral-400">{short}</p>
		{/if}
	</div>
	<!-- End Title -->

	<!-- Grid -->
	<div class="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-center lg:gap-16">
		<div class="aspect-w-16 aspect-h-9 lg:aspect-none">
			{#if imageUrl}
				<img class="w-full rounded-xl object-cover" src={imageUrl} alt={imageAlt} loading="lazy" />
			{:else}
				<div class="h-full min-h-64 w-full rounded-xl bg-gray-100 dark:bg-neutral-700"></div>
			{/if}
		</div>
		<!-- End Col -->

		<!-- Timeline -->
		<div class="lg:col-span-2">
			{#each steps as step, index (step.title)}
				<div class="ms-1 flex gap-x-5">
					<div
						class="relative after:absolute after:start-4 after:top-8 after:bottom-0 after:-translate-x-[0.5px] after:border-s after:border-gray-200 last:after:hidden dark:after:border-neutral-700"
					>
						<div class="relative z-10 flex size-8 items-center justify-center">
							<span
								class="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-xs font-semibold text-blue-600 uppercase dark:border-neutral-700 dark:text-blue-500"
							>
								{index + 1}
							</span>
						</div>
					</div>

					<div class="grow pt-0.5 pb-8 sm:pb-12">
						<p class="text-sm text-gray-500 lg:text-base dark:text-neutral-400">
							<span class="text-gray-800 dark:text-neutral-200">{step.title}</span>
						</p>
						{#if step.descriptionHtml}
							<div class="mt-2 text-gray-500 dark:text-neutral-400">
								{@html step.descriptionHtml}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
		<!-- End Timeline -->
	</div>
	<!-- End Grid -->
</div>

<!-- End Approach -->
