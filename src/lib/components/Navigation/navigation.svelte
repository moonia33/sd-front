<script lang="ts">
	import { base, resolve } from '$app/paths';
	import type { NavLink } from '$lib/types/navigation';
	import { icons } from '@lucide/svelte';
	import type { Component } from 'svelte';
	import DarkMode from '$lib/components/DarkMode/dark.svelte';

	let { siteName, logoUrl, logoAlt, logoTitle, menuItems } = $props<{
		siteName?: string;
		logoUrl?: string;
		logoAlt?: string;
		logoTitle?: string;
		menuItems?: NavLink[];
	}>();

	function isInternalHref(href: string) {
		return href.startsWith('/');
	}

	function withBase(href: string) {
		return `${base}${href}`;
	}

	function splitTwoColumns(items: NavLink[]): [NavLink[], NavLink[]] {
		const mid = Math.ceil(items.length / 2);
		return [items.slice(0, mid), items.slice(mid)];
	}

	function normalizeIconName(iconName: string) {
		const trimmed = iconName.trim();
		if (!trimmed) return '';

		if (/^[A-Za-z][A-Za-z0-9]*$/.test(trimmed)) return trimmed;

		return trimmed
			.replace(/[^A-Za-z0-9]+/g, ' ')
			.trim()
			.split(' ')
			.filter(Boolean)
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
			.join('');
	}

	function resolveIcon(iconName: string | null | undefined): Component | null {
		const trimmed = iconName?.trim();
		if (!trimmed) return null;

		const iconMap = icons as unknown as Record<string, Component>;
		return iconMap[trimmed] ?? iconMap[normalizeIconName(trimmed)] ?? null;
	}
</script>

<nav class="mx-auto w-full max-w-340 px-4 md:px-6 lg:px-8">
	<div class="relative md:flex md:items-center md:justify-between">
		<div class="flex items-center justify-between">
			<a
				class="flex-none focus:opacity-80 focus-visible:outline-current focus-visible:outline-2 focus-visible:outline-offset-2"
				href={resolve('/')}
				aria-label={siteName ?? 'Home'}
			>
				{#if logoUrl}
					<img
						class="h-auto w-28"
						src={logoUrl}
						alt={logoAlt ?? siteName ?? 'Logo'}
						title={logoTitle ?? undefined}
					/>
				{:else}
					<span class="text-layer-foreground text-lg font-semibold">{siteName ?? 'Logo'}</span>
				{/if}
			</a>

			<div class="d-flex flex md:hidden">
				<DarkMode />
				<button
					type="button"
					class="hs-collapse-toggle border-layer-line text-layer-foreground hover:bg-muted-hover focus:bg-muted-focus ml-2 flex size-9 items-center justify-center rounded-lg border text-sm font-semibold focus-visible:outline-current focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50"
					id="hs-navbar-page-demo-pricing-collapse"
					aria-expanded="false"
					aria-controls="hs-navbar-page-demo-pricing"
					aria-label="Toggle navigation"
					data-hs-collapse="#hs-navbar-page-demo-pricing"
				>
					<svg
						class="hs-collapse-open:hidden size-4 shrink-0"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="3" x2="21" y1="6" y2="6" />
						<line x1="3" x2="21" y1="12" y2="12" />
						<line x1="3" x2="21" y1="18" y2="18" />
					</svg>
					<svg
						class="hs-collapse-open:block hidden size-4 shrink-0"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>
			</div>
		</div>

		<div
			id="hs-navbar-page-demo-pricing"
			class="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:block md:overflow-visible"
			aria-labelledby="hs-navbar-page-demo-pricing-collapse"
			role="region"
		>
			<div
				class="[&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb max-h-[75vh] overflow-hidden overflow-y-auto md:max-h-none md:overflow-visible md:overflow-y-visible [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-none"
			>
				<div
					class="divide-navbar-divider mt-5 flex flex-col gap-x-0 divide-y divide-dashed md:mt-0 md:flex-row md:items-center md:justify-end md:gap-x-7 md:divide-y-0 md:divide-solid md:ps-7"
				>
					{#each menuItems ?? [] as item (item.id)}
						{#if item.children?.length}
							{@const [leftColumn, rightColumn] = splitTwoColumns(item.children)}
							<div
								class="hs-dropdown py-3 [--adaptive:none] [--is-collapse:true] [--strategy:static] md:py-4 md:[--is-collapse:false] md:[--strategy:absolute]"
							>
								<button
									type="button"
									class="text-navbar-nav-foreground hover:text-muted-foreground-1 focus:text-muted-foreground-1 flex w-full items-center font-medium focus-visible:outline-current focus-visible:outline-2 focus-visible:outline-offset-2"
									aria-haspopup="menu"
									aria-expanded="false"
								>
									{item.title}
									<svg
										class="text-muted-foreground-1 ms-2 size-2.5"
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
										></path>
									</svg>
								</button>

								<div
									class="hs-dropdown-menu hs-dropdown-open:opacity-100 relative inset-s-0 top-full z-10 hidden w-full min-w-60 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:inset-s-0 before:-top-5 before:h-5 before:w-full md:duration-150"
									role="menu"
									aria-orientation="vertical"
								>
									<div class="md:mx-6 lg:mx-8">
										<div
											class="bg-dropdown border-dropdown-line rounded-lg border py-2 md:shadow-2xl"
										>
											<div class="gap-4 py-1 md:grid md:grid-cols-2 md:p-2 lg:grid-cols-2">
												<div class="flex flex-col">
													{#each leftColumn as child (child.id)}
														{#if child.href}
															{@const Icon = resolveIcon(child.iconName)}
															<a
																class="group text-navbar-nav-foreground hover:bg-navbar-nav-hover focus:bg-navbar-nav-focus flex gap-x-4 rounded-lg p-3 focus-visible:outline-current focus-visible:outline-2 focus-visible:outline-offset-2"
																href={isInternalHref(child.href)
																	? withBase(child.href)
																	: child.href}
															>
																{#if Icon}
																	<Icon
																		class="mt-1 size-6 shrink-0 text-current"
																		aria-hidden="true"
																	/>
																{/if}
																<div class="min-w-0 grow">
																	<p class="text-foreground pb-2 font-medium">{child.title}</p>
																	{#if child.description}
																		<p class="text-muted-foreground-1">
																			{child.description}
																		</p>
																	{/if}
																</div>
															</a>
														{/if}
													{/each}
												</div>
												<div class="flex flex-col">
													{#each rightColumn as child (child.id)}
														{#if child.href}
															{@const Icon = resolveIcon(child.iconName)}
															<a
																class="group text-navbar-nav-foreground hover:bg-navbar-nav-hover focus:bg-navbar-nav-focus flex gap-x-4 rounded-lg p-3 focus-visible:outline-current focus-visible:outline-2 focus-visible:outline-offset-2"
																href={isInternalHref(child.href)
																	? withBase(child.href)
																	: child.href}
															>
																{#if Icon}
																	<Icon
																		class="mt-1 size-6 shrink-0 text-current"
																		aria-hidden="true"
																	/>
																{/if}
																<div class="min-w-0 grow">
																	<p class="text-foreground pb-2 font-medium">{child.title}</p>
																	{#if child.description}
																		<p class="text-muted-foreground-1">
																			{child.description}
																		</p>
																	{/if}
																</div>
															</a>
														{/if}
													{/each}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						{:else if item.href}
							<a
								class="text-navbar-nav-foreground hover:text-muted-foreground-1 focus:text-muted-foreground-1 py-3 font-medium focus:outline-hidden md:py-6"
								href={isInternalHref(item.href) ? withBase(item.href) : item.href}
							>
								{item.title}
							</a>
						{/if}
					{/each}

					<div class="hidden md:block">
						<DarkMode />
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>
