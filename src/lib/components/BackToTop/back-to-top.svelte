<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		threshold?: number;
	};

	let { threshold = 240 }: Props = $props();

	let visible = $state(false);
	let progress = $state(0);

	const radius = 18;
	const circumference = 2 * Math.PI * radius;

	function update() {
		if (typeof window === 'undefined') return;

		const scrollTop = window.scrollY ?? 0;
		const scrollHeight = document.documentElement.scrollHeight ?? 0;
		const clientHeight = document.documentElement.clientHeight ?? 0;
		const maxScroll = Math.max(0, scrollHeight - clientHeight);

		visible = scrollTop > threshold;
		progress = maxScroll === 0 ? 0 : Math.min(1, Math.max(0, scrollTop / maxScroll));
	}

	function scrollToTop() {
		if (typeof window === 'undefined') return;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(() => {
		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update, { passive: true });
	});

	onDestroy(() => {
		if (typeof window === 'undefined') return;
		window.removeEventListener('scroll', update);
		window.removeEventListener('resize', update);
	});
</script>

{#if visible}
	<button
		type="button"
		class="fixed right-6 bottom-6 z-50 inline-flex size-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-2xs hover:bg-gray-50 focus:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
		aria-label="Grįžti į puslapio viršų"
		onclick={scrollToTop}
	>
		<span class="sr-only">Į viršų</span>

		<svg class="absolute inset-0 size-12 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
			<circle
				cx="24"
				cy="24"
				r={radius}
				fill="none"
				stroke="currentColor"
				stroke-width="4"
				class="text-gray-200 dark:text-neutral-700"
			/>
			<circle
				cx="24"
				cy="24"
				r={radius}
				fill="none"
				stroke="currentColor"
				stroke-width="4"
				stroke-linecap="round"
				stroke-dasharray={circumference}
				stroke-dashoffset={circumference * (1 - progress)}
				class="text-gray-900 dark:text-white"
			/>
		</svg>

		<svg
			class="relative size-5"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="M12 19V5" />
			<path d="m5 12 7-7 7 7" />
		</svg>
	</button>
{/if}
