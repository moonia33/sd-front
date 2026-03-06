<script lang="ts">
	import Breadcrumb from '$lib/components/BreadCrumb/breadcrumb.svelte';
	import Areashero from '$lib/components/areas/AreasHero/areashero.svelte';
	import ProblemCard from '$lib/components/areas/ProblemCard/problemcard.svelte';
	import Solution from '$lib/components/areas/Solution/solution.svelte';
	import Process from '$lib/components/areas/Process/process.svelte';
	import Faq from '$lib/components/Faq/faq.svelte';
	import RelatedServices from '$lib/components/RalatedServices/related-services.svelte';
	import AreasCard from '$lib/components/AreasCard/areas-card.svelte';
	import RelatedPosts from '$lib/components/RelatedPosts/related-posts.svelte';
	import ButtonAnimated from '$lib/components/ButtonAnimated/rotateborder.svelte';
</script>

<svelte:head>
	<title>"Pavadinimas"</title>
	<meta name="description" content="aprašymas" />
</svelte:head>

<Breadcrumb />
<Areashero />
<section id="problema" class="bg-white py-14 dark:bg-black">
	<ProblemCard />
	<ButtonAnimated />
</section>
<section id="areas" class="bg-gray-100 py-14 dark:bg-gray-950">
	<AreasCard />
</section>
<section id="sprendimas" class="bg-gray-100 py-14 dark:bg-gray-950">
	<Solution />
</section>
<section id="procesas" class="bg-white py-14 dark:bg-black">
	<Process />
</section>
<section id="related-services" class="bg-gray-100 py-14 dark:bg-gray-950">
	<RelatedServices />
</section>
<section id="faq" class="bg-gray-100 py-14 dark:bg-gray-950">
	<Faq />
</section>
<section id="related-posts" class="bg-white py-14 dark:bg-black">
	<RelatedPosts />
</section>
