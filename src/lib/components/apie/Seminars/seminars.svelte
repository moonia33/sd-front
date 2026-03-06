<!-- Susijusi kolekcija seminarai  rikiavimas pagal seminarai.data viršuje naujausios-->
<script lang="ts">
	type SeminarItem = {
		data: string;
		tema: string;
		istaiga: string;
	};

	type Props = {
		heading?: string;
		text?: string;
		items?: SeminarItem[];
		pageSize?: number;
	};

	let { heading = '', text = '', items = [], pageSize = 10 }: Props = $props();

	let page = $state(1);

	const totalItems = $derived(items.length);
	const totalPages = $derived(Math.max(1, Math.ceil(totalItems / pageSize)));

	$effect(() => {
		if (page < 1) page = 1;
		if (page > totalPages) page = totalPages;
	});

	const startIndex = $derived(totalItems === 0 ? 0 : (page - 1) * pageSize + 1);
	const endIndex = $derived(Math.min(page * pageSize, totalItems));
	const pagedItems = $derived(items.slice((page - 1) * pageSize, page * pageSize));

	function goTo(nextPage: number) {
		page = Math.min(totalPages, Math.max(1, nextPage));
	}

	type PageToken = number | 'ellipsis';

	const pageTokens = $derived(
		(() => {
			if (totalPages <= 6) {
				return Array.from({ length: totalPages }, (_, i) => i + 1) as PageToken[];
			}

			return [1, 2, 3, 4, 'ellipsis', totalPages] as PageToken[];
		})()
	);
</script>

<!-- Table Section -->
<div class="mx-auto max-w-340 px-4 py-12 lg:py-20">
	<!-- Card -->
	<div class="flex flex-col">
		<div
			class="overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700"
		>
			<div class="inline-block min-w-full align-middle">
				<div
					class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xs dark:border-neutral-700 dark:bg-neutral-800"
				>
					<!-- Header -->
					<div
						class="grid gap-3 border-b border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700"
					>
						<div>
							<h2 class="text-xl font-semibold text-gray-800 dark:text-neutral-200">
								{heading}
							</h2>
							<p class="text-sm text-gray-600 dark:text-neutral-300">{text}</p>
						</div>
					</div>
					<!-- End Header -->

					<!-- Table -->
					<table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
						<thead class="bg-gray-50 dark:bg-neutral-800">
							<tr>
								<th scope="col" class="px-6 py-3 text-start">
									<span class="text-xs font-semibold text-gray-800 uppercase dark:text-neutral-200">
										Data
									</span>
								</th>
								<th scope="col" class="px-6 py-3 text-start">
									<span class="text-xs font-semibold text-gray-800 uppercase dark:text-neutral-200">
										Tema
									</span>
								</th>
								<th scope="col" class="px-6 py-3 text-start">
									<span class="text-xs font-semibold text-gray-800 uppercase dark:text-neutral-200">
										Organizatorius
									</span>
								</th>
							</tr>
						</thead>

						<tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
							{#if pagedItems.length === 0}
								<tr>
									<td colspan="3" class="px-6 py-10 text-center">
										<span class="text-sm text-gray-600 dark:text-neutral-300">Įrašų nėra</span>
									</td>
								</tr>
							{:else}
								{#each pagedItems as seminar (seminar.data + '|' + seminar.tema)}
									<tr>
										<td class="px-6 py-3 whitespace-nowrap">
											<span class="text-sm text-gray-800 dark:text-neutral-200">{seminar.data}</span
											>
										</td>
										<td class="px-6 py-3">
											<span class="text-sm font-medium text-gray-800 dark:text-neutral-200">
												{seminar.tema}
											</span>
										</td>
										<td class="px-6 py-3">
											<span class="text-sm text-gray-600 dark:text-neutral-300">
												{seminar.istaiga}
											</span>
										</td>
									</tr>
								{/each}
							{/if}
						</tbody>
					</table>
					<!-- End Table -->

					<!-- Footer / Pagination -->
					<div class="border-t border-gray-200 px-6 py-4 dark:border-neutral-700">
						<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<div class="text-sm text-gray-600 dark:text-neutral-300">
								{#if totalItems === 0}
									Rodoma 0 iš 0
								{:else}
									Rodoma {startIndex}–{endIndex} iš {totalItems}
								{/if}
							</div>

							<nav class="inline-flex items-center gap-1" aria-label="Seminarų puslapiavimas">
								<button
									type="button"
									class="inline-flex cursor-pointer items-center gap-x-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
									onclick={() => goTo(page - 1)}
									disabled={page <= 1}
									aria-label="Ankstesnis puslapis"
								>
									Atgal
								</button>

								{#each pageTokens as token (token)}
									{#if token === 'ellipsis'}
										<span
											class="inline-flex size-9 items-center justify-center text-sm text-gray-500 dark:text-neutral-400"
											aria-hidden="true"
										>
											…
										</span>
									{:else}
										<button
											type="button"
											class={token === page
												? 'inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-sm font-semibold text-gray-800 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-200'
												: 'inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-sm text-gray-800 hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700'}
											onclick={() => goTo(token)}
											aria-label={`Puslapis ${token}`}
											aria-current={token === page ? 'page' : undefined}
										>
											{token}
										</button>
									{/if}
								{/each}

								<button
									type="button"
									class="inline-flex cursor-pointer items-center gap-x-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
									onclick={() => goTo(page + 1)}
									disabled={page >= totalPages}
									aria-label="Kitas puslapis"
								>
									Pirmyn
								</button>
							</nav>
						</div>
					</div>
					<!-- End Footer / Pagination -->
				</div>
			</div>
		</div>
	</div>
	<!-- End Card -->
</div>
<!-- End Table Section -->
