<script lang="ts">
	type AreaCardItem = {
		id?: string;
		title: string;
		description?: string;
		href?: string;
	};

	type Props = {
		heading?: string;
		items?: AreaCardItem[];
	};

	let {
		heading = 'Jau žinote konkrečiau? Pasirinkite',
		items = [
			{ id: 'demo-1', title: 'Management', description: '4 job positions', href: '/' },
			{ id: 'demo-2', title: 'Content Writer', description: '10 job positions', href: '/' },
			{ id: 'demo-3', title: 'Analytics', description: '14 job positions', href: '/' }
		]
	}: Props = $props();

	function normalizeHref(href: string | undefined) {
		const trimmed = href?.trim();
		if (!trimmed) return null;
		return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
	}
</script>

<!-- Card Section -->
<div class="mx-auto max-w-340 px-4 xl:px-0">
	<div class="mb-10 max-w-340 lg:mb-14">
		<h3 class="text-2xl font-semibold text-gray-800 md:text-3xl dark:text-neutral-200">
			{heading}
		</h3>
	</div>
	<!-- Grid -->
	<div class="grid gap-3 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-3">
		{#each items as item (item.id ?? item.title)}
			{@const href = normalizeHref(item.href)}
			{#if href}
				<a
					class="group flex flex-col rounded-xl border border-gray-200 bg-white shadow-2xs transition hover:shadow-md focus:shadow-md focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800"
					{href}
				>
					<div class="p-4 md:p-5">
						<div class="flex items-center justify-between gap-x-3">
							<div class="grow">
								<h3
									class="font-semibold text-gray-800 group-hover:text-blue-700 dark:text-neutral-200 dark:group-hover:text-blue-600"
								>
									{item.title}
								</h3>
								{#if item.description}
									<p class="text-sm text-gray-500 dark:text-neutral-400">{item.description}</p>
								{/if}
							</div>
							<div>
								<svg
									class="size-5 shrink-0 text-gray-800 dark:text-neutral-200"
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
							</div>
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
								<h3 class="font-semibold text-gray-800 dark:text-neutral-200">{item.title}</h3>
								{#if item.description}
									<p class="text-sm text-gray-500 dark:text-neutral-400">{item.description}</p>
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<!-- End Grid -->
</div>
<!-- End Card Section -->
