<script lang="ts">
	import Breadcrumb from '$lib/components/BreadCrumb/breadcrumb.svelte';
	import AreasHero from '$lib/components/areas/AreasHero/areashero.svelte';
	import ProblemCard from '$lib/components/areas/ProblemCard/problemcard.svelte';
	import Solution from '$lib/components/areas/Solution/solution.svelte';
	import Process from '$lib/components/areas/Process/process.svelte';
	import Faq from '$lib/components/Faq/faq.svelte';
	import AreasCard from '$lib/components/AreasCard/areas-card.svelte';
	import RelatedServices from '$lib/components/RalatedServices/related-services.svelte';
	import RelatedPosts from '$lib/components/RelatedPosts/related-posts.svelte';
	import WhyUs from '$lib/components/apie/WhyUs/whyus.svelte';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const hasChildren = $derived(data.childrenAreas.length > 0);
	const hasFaqItems = $derived(data.faq.items.length > 0);

	function buildJsonLdScript(jsonLd: string) {
		const trimmed = jsonLd.trim();
		if (!trimmed) return '';

		if (/^<script[\s>]/i.test(trimmed)) return trimmed;

		try {
			const parsed = JSON.parse(trimmed);
			const safeJson = JSON.stringify(parsed).replace(/<\//g, '<\\/');
			return '<script type="application/ld+json">' + safeJson + '</scr' + 'ipt>';
		} catch (_err) {
			void _err;
			return '';
		}
	}
</script>

<svelte:head>
	<title>{data.area.seoTitle}</title>
	{#if data.area.seoDescription}
		<meta name="description" content={data.area.seoDescription} />
	{/if}
	{#if data.area.jsonLd}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html buildJsonLdScript(data.area.jsonLd)}
	{/if}
</svelte:head>

<Breadcrumb items={data.breadcrumb} />

<AreasHero
	title={data.area.title}
	subtitle={data.area.subtitle}
	shortDescription={data.area.shortDescription}
/>
<hr class="border-gray-200 dark:border-gray-800" />
<section id={data.anchors.problem} class="scroll-mt-24 bg-white py-14 dark:bg-black">
	<ProblemCard
		title={data.problem.title}
		short={data.problem.short}
		descriptionHtml={data.problem.descriptionHtml}
		imageUrl={data.problem.imageUrl}
		items={data.problem.items}
	/>
</section>

{#if hasChildren}
	<hr class="border-gray-200 dark:border-gray-800" />
	<section id="areas" class="scroll-mt-24 bg-white py-14 dark:bg-black">
		<AreasCard items={data.childrenAreas} />
	</section>
{/if}

<section id={data.anchors.solution} class="scroll-mt-24 bg-gray-100 py-14 dark:bg-gray-950">
	<Solution
		title={data.solution.title}
		short={data.solution.short}
		descriptionHtml={data.solution.descriptionHtml}
		items={data.solution.items}
	/>
</section>

<section id={data.anchors.process} class="scroll-mt-24 bg-white py-14 dark:bg-black">
	<Process
		title={data.process.title}
		short={data.process.short}
		imageUrl={data.process.imageUrl}
		steps={data.process.steps}
	/>
</section>

{#if data.whyUs}
	<section class="scroll-mt-24 bg-gray-100 py-14 dark:bg-gray-950">
		<WhyUs
			heading={data.whyUs.heading}
			descriptionHtml={data.whyUs.descriptionHtml}
			stats={data.whyUs.stats}
		/>
	</section>
{/if}
<hr class="border-gray-200 dark:border-gray-800" />
<section id="related-services" class="scroll-mt-24 bg-white py-14 dark:bg-black">
	<RelatedServices items={data.relatedServices} />
</section>

{#if hasFaqItems}
	<section id={data.anchors.faq} class="scroll-mt-24 bg-gray-100 py-14 dark:bg-gray-950">
		<Faq
			title={data.faq.title}
			short={data.faq.short}
			descriptionHtml={data.faq.descriptionHtml}
			items={data.faq.items}
		/>
	</section>
{/if}

<section id="related-posts" class="scroll-mt-24 bg-white py-14 dark:bg-black">
	<RelatedPosts items={data.relatedPosts} />
</section>
