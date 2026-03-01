<script lang="ts">
	import AboutHero from '$lib/components/apie/AboutHero/abouthero.svelte';
	import WhyUs from '$lib/components/apie/WhyUs/whyus.svelte';
	import Competentions from '$lib/components/apie/Competentions/competentions.svelte';
	import Breadcrumb from '$lib/components/BreadCrumb/breadcrumb.svelte';
	import MyAreas from '$lib/components/apie/MyAreas/myareas.svelte';
	import MyService from '$lib/components/apie/MyService/myservice.svelte';
	import Seminars from '$lib/components/apie/Seminars/seminars.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const seoTitle = data.hero.seo?.title || data.hero.title || 'Apie mane';
	const seoDescription = data.hero.seo?.meta_description || data.hero.santrauka || '';
</script>

<svelte:head>
	<title>{seoTitle}</title>
	{#if seoDescription}
		<meta name="description" content={seoDescription} />
	{/if}
</svelte:head>
<Breadcrumb />
<AboutHero
	imageUrl={data.hero.imageUrl}
	title={data.hero.title}
	santrauka={data.hero.santrauka}
	descriptionHtml={data.hero.descriptionHtml}
	legalName={data.hero.legalName}
	subtitle={data.hero.subtitle}
	ctaLabel={data.hero.ctaLabel}
	ctaLink={data.hero.ctaLink}
/>

<section id="kodel" class="mt-10 bg-slate-100 dark:bg-black">
	<WhyUs
		heading={data.whyUs.heading}
		descriptionHtml={data.whyUs.descriptionHtml}
		stats={data.whyUs.stats}
	/>
</section>

<section id="kompetencijos" class="bg-white dark:bg-black">
	<Competentions
		heading={data.competentions.heading}
		descriptionHtml={data.competentions.descriptionHtml}
	/>
	<hr class="mx-auto my-2 w-1/2 border-t-1 border-blue-800 dark:border-gray-700" />
	<Seminars heading={data.seminars.heading} text={data.seminars.text} items={data.seminars.items} />
</section>

<section id="paslaugos" class="bg-slate-100 dark:bg-black">
	<MyService
		heading={data.myService.heading}
		descriptionHtml={data.myService.descriptionHtml}
		items={data.myService.items}
	/>
</section>

<section id="kompetencijos" class="bg-white dark:bg-black">
	<Competentions
		heading={data.competentions.heading}
		descriptionHtml={data.competentions.descriptionHtml}
	/>
</section>

<section id="mano-sritys" class="bg-slate-100 dark:bg-black">
	<MyAreas
		heading={data.myAreas.heading}
		descriptionHtml={data.myAreas.descriptionHtml}
		items={data.myAreas.items}
	/>
</section>
