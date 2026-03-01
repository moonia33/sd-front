<script lang="ts">
	type Props = {
		heading?: string;
		descriptionHtml?: string;
	};

	let { heading = '', descriptionHtml = '' }: Props = $props();
</script>

<!-- Approach -->
<div class="mx-auto max-w-5xl px-4 py-12 lg:py-20">
	<!-- Title -->

	<h2
		class="pb-4 text-xl font-semibold text-gray-800 md:text-2xl md:leading-tight dark:text-neutral-200"
	>
		{heading}
	</h2>
	<div class="mt-1 text-gray-800 dark:text-neutral-400">
		{@html descriptionHtml}
	</div>

	<!-- End Title -->
</div>

<!-- End Approach -->
