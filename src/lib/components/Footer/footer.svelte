<script lang="ts">
	import { base, resolve } from '$app/paths';
	import type { NavLink } from '$lib/types/navigation';

	type SiteLike = {
		site_name?: string;
		brand_name?: string;
		contact_email?: string;
		contact_phone?: string;
		profiles?: Array<{ profile_title?: string; link?: string }> | null;
	};

	let { site, menuItems } = $props<{ site?: SiteLike | null; menuItems?: NavLink[] }>();

	function isInternalHref(href: string) {
		return href.startsWith('/');
	}

	function withBase(href: string) {
		return `${base}${href}`;
	}
</script>

<!-- ========== FOOTER ========== -->
<footer class="mx-auto mt-auto w-full max-w-340 px-4 py-10 sm:px-6 lg:px-8">
	<!-- Grid -->
	<div class="mb-10 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-4">
		<div class="col-span-full hidden lg:col-span-1 lg:block">
			<a
				class="flex-none text-xl font-semibold text-gray-800 focus:opacity-80 focus-visible:outline-current focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-neutral-200"
				href={resolve('/')}
				aria-label={site?.site_name ?? 'Brand'}
			>
				{site?.brand_name ?? site?.site_name ?? 'Brand'}
			</a>
			<p class="mt-3 text-xs text-gray-600 sm:text-sm dark:text-neutral-300">
				© {new Date().getFullYear()}
				{site?.site_name ?? ''}
			</p>
			{#if site?.contact_email || site?.contact_phone}
				<div class="mt-4 grid gap-2 text-sm">
					{#if site?.contact_email}
						<a
							class="text-gray-600 hover:text-gray-800 focus:text-gray-800 focus-visible:outline-current focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-neutral-300 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
							href={`mailto:${site.contact_email}`}
						>
							{site.contact_email}
						</a>
					{/if}
					{#if site?.contact_phone}
						<a
							class="text-gray-600 hover:text-gray-800 focus:text-gray-800 focus-visible:outline-current focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-neutral-300 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
							href={`tel:${site.contact_phone}`}
						>
							{site.contact_phone}
						</a>
					{/if}
				</div>
			{/if}
		</div>
		<!-- End Col -->

		{#each menuItems ?? [] as section (section.id)}
			<div>
				<h4 class="text-xs font-semibold text-gray-800 uppercase dark:text-neutral-200">
					{section.title}
				</h4>

				<div class="mt-3 grid space-y-3 text-sm">
					{#if section.children?.length}
						{#each section.children as link (link.id)}
							{#if link.href}
								<p>
									<a
										class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:text-gray-800 focus-visible:outline-current focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-neutral-300 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
										href={isInternalHref(link.href) ? withBase(link.href) : link.href}
									>
										{link.title}
									</a>
								</p>
							{/if}
						{/each}
					{:else if section.href}
						<p>
							<a
								class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:text-gray-800 focus-visible:outline-current focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-neutral-300 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
								href={isInternalHref(section.href) ? withBase(section.href) : section.href}
							>
								{section.title}
							</a>
						</p>
					{/if}
				</div>
			</div>
			<!-- End Col -->
		{/each}
	</div>
	<!-- End Grid -->

	<div class="mt-5 border-t border-gray-200 pt-5 dark:border-neutral-700">
		<div class="sm:flex sm:items-center sm:justify-between">
			<div class="flex flex-wrap items-center gap-3">
				{#if site?.profiles?.length}
					<div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
						{#each site.profiles as p (p.link)}
							{#if p?.link}
								<a
									class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:text-gray-800 focus-visible:outline-current focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-neutral-300 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
									href={p.link}
									target="_blank"
									rel="noreferrer"
								>
									{p.profile_title ?? p.link}
								</a>
							{/if}
						{/each}
					</div>
				{/if}
			</div>

			<div class="mt-3 sm:hidden">
				<a
					class="flex-none text-xl font-semibold text-gray-800 focus:opacity-80 focus-visible:outline-current focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-neutral-200"
					href={resolve('/')}
					aria-label={site?.site_name ?? 'Brand'}
				>
					{site?.brand_name ?? site?.site_name ?? 'Brand'}
				</a>
				<p class="mt-1 text-xs text-gray-600 sm:text-sm dark:text-neutral-300">
					© {new Date().getFullYear()}
					{site?.site_name ?? ''}
				</p>
			</div>
		</div>
	</div>
</footer>
<!-- ========== END FOOTER ========== -->
