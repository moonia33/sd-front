<script lang="ts">
	type ServiceItem = {
		id?: string;
		title: string;
		description?: string;
		href?: string;
		imageUrl?: string | null;
	};

	type Props = {
		heading?: string;
		items?: ServiceItem[];
	};

	let {
		heading = 'Susijusios\npaslaugos',
		items = [
			{
				id: 'demo-1',
				title: 'Paslaugos pavyzdys',
				description: 'Trumpas aprašymas.',
				href: '#',
				imageUrl:
					'https://images.unsplash.com/photo-1664574654529-b60630f33fdb?auto=format&fit=crop&w=560&q=80'
			},
			{
				id: 'demo-2',
				title: 'Kita paslauga',
				description: 'Trumpas aprašymas.',
				href: '#',
				imageUrl:
					'https://images.unsplash.com/photo-1669824774762-65ddf29bee56?auto=format&fit=crop&w=560&q=80'
			}
		]
	}: Props = $props();

	function normalizeHref(href: string | undefined) {
		const trimmed = href?.trim();
		if (!trimmed || trimmed === '#') return null;
		return trimmed;
	}
</script>

<!-- Card Blog -->
<div class="mx-auto max-w-340 px-4 xl:px-0">
	<div class="pb-12">
		<h2 class="text-2xl font-bold text-gray-800 md:text-4xl md:leading-tight dark:text-neutral-200">
			{@html heading.replace(/\n/g, '<br />')}
		</h2>
	</div>
	<!-- Grid -->
	<div class="grid gap-6 lg:grid-cols-2">
		{#each items as item (item.id ?? item.title)}
			{@const href = normalizeHref(item.href)}
			{#if href}
				<a class="group rounded-xl focus:outline-hidden sm:flex" {href}>
					<div
						class="relative h-50 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-50 sm:w-62.5 dark:bg-neutral-700"
					>
						{#if item.imageUrl}
							<img
								class="absolute start-0 top-0 size-full object-cover"
								src={item.imageUrl}
								alt={item.title}
							/>
						{/if}
					</div>

					<div class="grow">
						<div class="flex h-full flex-col p-4 sm:p-6">
							<h3
								class="text-lg font-semibold text-gray-800 group-hover:text-blue-700 group-focus:text-blue-700 sm:text-2xl dark:text-neutral-200 dark:group-hover:text-blue-600 dark:group-focus:text-blue-600"
							>
								{item.title}
							</h3>
							{#if item.description}
								<p class="mt-2 text-gray-600 dark:text-neutral-300">{item.description}</p>
							{/if}
						</div>
					</div>
				</a>
			{:else}
				<div class="group rounded-xl sm:flex">
					<div
						class="relative h-50 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-50 sm:w-62.5 dark:bg-neutral-700"
					>
						{#if item.imageUrl}
							<img
								class="absolute start-0 top-0 size-full object-cover"
								src={item.imageUrl}
								alt={item.title}
							/>
						{/if}
					</div>

					<div class="grow">
						<div class="flex h-full flex-col p-4 sm:p-6">
							<h3 class="text-lg font-semibold text-gray-800 sm:text-2xl dark:text-neutral-200">
								{item.title}
							</h3>
							{#if item.description}
								<p class="mt-2 text-gray-600 dark:text-neutral-300">{item.description}</p>
							{/if}
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<!-- End Grid -->
</div>
<!-- End Card Blog -->
