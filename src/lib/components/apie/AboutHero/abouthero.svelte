<script lang="ts">
	import { resolve } from '$app/paths';

	type Props = {
		title?: string;
		imageUrl?: string | null;
		santrauka?: string;
		descriptionHtml?: string;
		legalName?: string;
		subtitle?: string;
		ctaLabel?: string;
		ctaLink?: string;
	};

	let {
		title = '',
		imageUrl = null,
		santrauka = '',
		descriptionHtml = '',
		legalName = '',
		subtitle = '',
		ctaLabel = '',
		ctaLink = '#'
	}: Props = $props();

	const fallbackImage =
		'https://teisine-konsultacija.lt/wp-content/uploads/2025/05/Advokato_kontora_daiva_rudzenskiene-3.jpg';
</script>

<!-- Testimonials -->
<div class="mx-auto max-w-340 px-4 py-12 lg:py-20">
	<!-- Grid -->
	<div class="md:grid md:grid-cols-3 md:items-center md:gap-10 lg:gap-16">
		<div class="mb-24 hidden sm:px-6 md:mb-0 md:block">
			<div class="relative">
				<img
					class="rounded-xl"
					src={imageUrl || fallbackImage}
					alt={title.trim() || legalName.trim() || 'Avatar'}
				/>

				<!-- SVG Element -->
				<div class="absolute inset-s-0 bottom-0 -z-1 -translate-x-14 translate-y-10">
					<svg
						class="h-auto max-w-40 text-gray-100 dark:text-neutral-500"
						width="696"
						height="653"
						viewBox="0 0 696 653"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="72.5" cy="29.5" r="29.5" fill="currentColor" />
						<circle cx="171.5" cy="29.5" r="29.5" fill="currentColor" />
						<circle cx="270.5" cy="29.5" r="29.5" fill="currentColor" />
						<circle cx="369.5" cy="29.5" r="29.5" fill="currentColor" />
						<circle cx="468.5" cy="29.5" r="29.5" fill="currentColor" />
						<circle cx="567.5" cy="29.5" r="29.5" fill="currentColor" />
						<circle cx="666.5" cy="29.5" r="29.5" fill="currentColor" />
						<circle cx="29.5" cy="128.5" r="29.5" fill="currentColor" />
						<circle cx="128.5" cy="128.5" r="29.5" fill="currentColor" />
						<circle cx="227.5" cy="128.5" r="29.5" fill="currentColor" />
						<circle cx="326.5" cy="128.5" r="29.5" fill="currentColor" />
						<circle cx="425.5" cy="128.5" r="29.5" fill="currentColor" />
						<circle cx="524.5" cy="128.5" r="29.5" fill="currentColor" />
						<circle cx="623.5" cy="128.5" r="29.5" fill="currentColor" />
						<circle cx="72.5" cy="227.5" r="29.5" fill="currentColor" />
						<circle cx="171.5" cy="227.5" r="29.5" fill="currentColor" />
						<circle cx="270.5" cy="227.5" r="29.5" fill="currentColor" />
						<circle cx="369.5" cy="227.5" r="29.5" fill="currentColor" />
						<circle cx="468.5" cy="227.5" r="29.5" fill="currentColor" />
						<circle cx="567.5" cy="227.5" r="29.5" fill="currentColor" />
						<circle cx="666.5" cy="227.5" r="29.5" fill="currentColor" />
						<circle cx="29.5" cy="326.5" r="29.5" fill="currentColor" />
						<circle cx="128.5" cy="326.5" r="29.5" fill="currentColor" />
						<circle cx="227.5" cy="326.5" r="29.5" fill="currentColor" />
						<circle cx="326.5" cy="326.5" r="29.5" fill="currentColor" />
						<circle cx="425.5" cy="326.5" r="29.5" fill="currentColor" />
						<circle cx="524.5" cy="326.5" r="29.5" fill="currentColor" />
						<circle cx="623.5" cy="326.5" r="29.5" fill="currentColor" />
						<circle cx="72.5" cy="425.5" r="29.5" fill="currentColor" />
						<circle cx="171.5" cy="425.5" r="29.5" fill="currentColor" />
						<circle cx="270.5" cy="425.5" r="29.5" fill="currentColor" />
						<circle cx="369.5" cy="425.5" r="29.5" fill="currentColor" />
						<circle cx="468.5" cy="425.5" r="29.5" fill="currentColor" />
						<circle cx="567.5" cy="425.5" r="29.5" fill="currentColor" />
						<circle cx="666.5" cy="425.5" r="29.5" fill="currentColor" />
						<circle cx="29.5" cy="524.5" r="29.5" fill="currentColor" />
						<circle cx="128.5" cy="524.5" r="29.5" fill="currentColor" />
						<circle cx="227.5" cy="524.5" r="29.5" fill="currentColor" />
						<circle cx="326.5" cy="524.5" r="29.5" fill="currentColor" />
						<circle cx="425.5" cy="524.5" r="29.5" fill="currentColor" />
						<circle cx="524.5" cy="524.5" r="29.5" fill="currentColor" />
						<circle cx="623.5" cy="524.5" r="29.5" fill="currentColor" />
						<circle cx="72.5" cy="623.5" r="29.5" fill="currentColor" />
						<circle cx="171.5" cy="623.5" r="29.5" fill="currentColor" />
						<circle cx="270.5" cy="623.5" r="29.5" fill="currentColor" />
						<circle cx="369.5" cy="623.5" r="29.5" fill="currentColor" />
						<circle cx="468.5" cy="623.5" r="29.5" fill="currentColor" />
						<circle cx="567.5" cy="623.5" r="29.5" fill="currentColor" />
						<circle cx="666.5" cy="623.5" r="29.5" fill="currentColor" />
					</svg>
				</div>
				<!-- End SVG Element -->
			</div>
		</div>
		<!-- End Col -->

		<div class="col-span-2">
			<!-- Blockquote -->
			<blockquote class="relative">
				<svg
					class="absolute inset-s-0 top-0 size-24 -translate-x-8 -translate-y-4 transform text-gray-800/20 dark:text-neutral-200/20"
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
						fill="currentColor"
					/>
				</svg>

				<div class="relative z-10">
					<p class="mb-3 text-xs font-semibold text-gray-500 uppercase dark:text-neutral-500">
						{santrauka}
					</p>

					<div class="text-xl text-gray-800 dark:text-neutral-200">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html descriptionHtml}
					</div>
				</div>

				<footer class="mt-6">
					<div class="flex items-center">
						<div class="shrink-0 md:hidden">
							<img
								class="size-12 rounded-full"
								src={imageUrl || fallbackImage}
								alt={title.trim() || legalName.trim() || 'Avatar'}
							/>
						</div>
						<div class="ms-4 md:ms-0">
							<div class="font-script text-5xl text-gray-800 dark:text-neutral-200">
								{legalName}
							</div>
							<div class="text-xs text-gray-600 dark:text-neutral-300">
								{subtitle}
							</div>
						</div>
					</div>
				</footer>

				<div class="mt-8 lg:mt-14">
					{#if ctaLink.startsWith('/')}
						<a
							class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 focus:bg-gray-800 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-100 dark:focus:bg-neutral-100"
							href={resolve(ctaLink as `/${string}`)}
						>
							{ctaLabel}
						</a>
					{:else}
						<!-- eslint-disable svelte/no-navigation-without-resolve -->
						<a
							class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 focus:bg-gray-800 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-100 dark:focus:bg-neutral-100"
							href={ctaLink}
						>
							{ctaLabel}
						</a>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
					{/if}
				</div>
			</blockquote>
			<!-- End Blockquote -->
		</div>
		<!-- End Col -->
	</div>
	<!-- End Grid -->
</div>
<!-- End Testimonials -->
