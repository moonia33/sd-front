<script lang="ts">
	type FaqItem = {
		id?: string;
		question: string;
		answerHtml: string;
	};

	type Props = {
		title?: string;
		short?: string;
		descriptionHtml?: string;
		items?: FaqItem[];
	};

	let {
		title = 'Dažniausiai užduodami klausimai',
		short = 'Atsakymai į dažniausiai užduodamus klausimus.',
		descriptionHtml = '',
		items = [
			{
				id: 'demo-1',
				question: 'Ar galiu bet kada nutraukti?',
				answerHtml:
					'<p>Taip, galite nutraukti bet kada. Jei turėsite pastabų — bus labai naudinga jas išgirsti.</p>'
			},
			{
				id: 'demo-2',
				question: 'Kaip vyksta konsultacija?',
				answerHtml:
					'<p>Sutariame laiką, aptariame situaciją ir susidėliojame aiškius tolimesnius žingsnius.</p>'
			}
		]
	}: Props = $props();

	function itemKey(item: FaqItem, index: number) {
		return item.id?.trim() || `faq-${index}`;
	}
</script>

<!-- FAQ -->
<div class="mx-auto max-w-340 px-4 xl:px-0">
	<!-- Grid -->
	<div class="grid gap-10 md:grid-cols-5">
		<div class="md:col-span-2">
			<div class="max-w-xs">
				<h2
					class="text-2xl font-bold text-gray-800 md:text-4xl md:leading-tight dark:text-neutral-200"
				>
					{title}
				</h2>
				{#if short}
					<p class="mt-1 hidden text-gray-600 md:block dark:text-neutral-300">{short}</p>
				{/if}
				{#if descriptionHtml}
					<div class="mt-4 hidden text-gray-600 md:block dark:text-neutral-300">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html descriptionHtml}
					</div>
				{/if}
			</div>
		</div>
		<!-- End Col -->

		<div class="md:col-span-3">
			<!-- Accordion -->
			<div class="hs-accordion-group divide-y divide-gray-200 dark:divide-neutral-700">
				{#each items as item, index (itemKey(item, index))}
					{@const key = itemKey(item, index)}
					{@const headingId = `hs-faq-heading-${key}`}
					{@const collapseId = `hs-faq-collapse-${key}`}
					{@const isFirst = index === 0}

					<div
						class={isFirst ? 'hs-accordion active pb-3' : 'hs-accordion pt-6 pb-3'}
						id={headingId}
					>
						<button
							class="hs-accordion-toggle group inline-flex w-full items-center justify-between gap-x-3 rounded-lg pb-3 text-start font-semibold text-gray-800 transition hover:text-gray-500 focus:outline-hidden md:text-lg dark:text-neutral-200 dark:hover:text-neutral-400"
							aria-expanded={isFirst}
							aria-controls={collapseId}
						>
							{item.question}
							<svg
								class="hs-accordion-active:hidden block size-5 shrink-0 text-gray-600 group-hover:text-gray-500 dark:text-neutral-300 dark:group-hover:text-neutral-400"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg
							>
							<svg
								class="hs-accordion-active:block hidden size-5 shrink-0 text-gray-600 group-hover:text-gray-500 dark:text-neutral-300 dark:group-hover:text-neutral-400"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg
							>
						</button>

						<div
							id={collapseId}
							class={isFirst
								? 'hs-accordion-content w-full overflow-hidden transition-[height] duration-300'
								: 'hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300'}
							role="region"
							aria-labelledby={headingId}
						>
							<div class="text-gray-600 dark:text-neutral-300">
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html item.answerHtml}
							</div>
						</div>
					</div>
				{/each}
			</div>
			<!-- End Accordion -->
		</div>
		<!-- End Col -->
	</div>
	<!-- End Grid -->
</div>
<!-- End FAQ -->
