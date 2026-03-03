<script lang="ts">
	type Stat = { stats: string; description: string };

	type Props = {
		heading?: string;
		descriptionHtml?: string;
		stats?: Stat[];
	};

	let { heading = '', descriptionHtml = '', stats = [] }: Props = $props();
</script>

<!-- Testimonials with Stats -->
<div class="mx-auto max-w-340 px-4 py-12 lg:py-20">
	<!-- Grid -->
	<div class="lg:grid lg:grid-cols-12 lg:items-center lg:justify-between lg:gap-16">
		<div class="lg:col-span-5 lg:col-start-1">
			<!-- Title -->
			<div class="mb-8">
				<h2 class="mb-2 pb-4 text-xl font-semibold text-black lg:text-2xl dark:text-neutral-200">
					{heading}
				</h2>
				<div class=" text-gray-900 dark:text-neutral-300">
					{@html descriptionHtml}
				</div>
			</div>
			<!-- End Title -->
		</div>
		<!-- End Col -->

		<div class="mt-10 lg:col-span-6 lg:col-end-13 lg:mt-0">
			<div class="space-y-6 sm:space-y-8">
				<!-- List -->
				<ul
					class="grid grid-cols-2 divide-x divide-x-2 divide-y divide-y-2 divide-gray-300 overflow-hidden dark:divide-neutral-700"
				>
					{#each stats.slice(0, 4) as item}
						<li class="-m-0.5 flex flex-col p-4 sm:p-8">
							<div
								class="font-semi-bold mb-2 flex items-end gap-x-2 text-3xl text-gray-800 sm:text-3xl dark:text-neutral-200"
							>
								{item.stats}
							</div>
							<p class="text-sm text-gray-600 dark:text-neutral-300">
								{item.description}
							</p>
						</li>
					{/each}
				</ul>
				<!-- End List -->
			</div>
		</div>
		<!-- End Col -->
	</div>
	<!-- End Grid -->
</div>
<!-- End Testimonials with Stats -->
