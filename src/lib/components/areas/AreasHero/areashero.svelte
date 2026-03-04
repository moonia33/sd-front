<script lang="ts">
	type Props = {
		title?: string;
		subtitle?: string;
		shortDescription?: string;
	};

	let { title = '', subtitle = '', shortDescription = '' }: Props = $props();
</script>

<!-- Hero -->
<div class="overflow-hidden bg-white pb-12 dark:bg-neutral-800">
	<div class="mx-auto max-w-340 px-4 xl:px-0">
		<h1 class="text-5xl font-semibold text-gray-700 md:text-6xl dark:text-neutral-200">
			<span class="text-primary">{title} </span>

			{#if subtitle}
				{subtitle}
			{/if}
		</h1>
		{#if shortDescription}
			<div class="mt-5 max-w-340">
				<p class="text-lg text-gray-700 dark:text-neutral-300">{shortDescription}</p>
			</div>
		{/if}
	</div>
</div>
<!-- End Hero -->
