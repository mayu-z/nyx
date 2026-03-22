<script lang="ts">
	import { mainNavItems, moreNavItems } from '$lib/config/navItems';
	import { IconX } from '@tabler/icons-svelte';
	import { page } from '$app/state';
	import ThemeSelector from '$components/themes/ThemeSelector.svelte';
	import ColorSelector from '$components/themes/ColorSelector.svelte';

	let { isOpen, closeSidebar } = $props<{
		isOpen: boolean;
		closeSidebar: () => void;
	}>();

	let currentPath = $derived(page.url.pathname);

	function isItemActive(href?: string, external?: boolean): boolean {
		if (!href || external) return false;
		return currentPath === href || currentPath.startsWith(`${href}/`);
	}

	function handleItemClick() {
		closeSidebar();
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-30 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
		onclick={closeSidebar}
		onkeydown={(e) => e.key === 'Escape' && closeSidebar()}
		role="button"
		tabindex="-1"
		aria-label="Close sidebar"
	></div>
{/if}

<aside
	class={`bg-mantle text-text border-surface0 fixed inset-y-0 right-0 z-40 flex w-64 transform flex-col border-l shadow-xl transition-transform duration-300 ease-in-out ${
		isOpen ? 'translate-x-0' : 'translate-x-full'
	}`}
	id="sidebar-nav"
>
	<div class="border-surface0 flex h-16 shrink-0 items-center justify-between border-b p-4">
		<span class="text-accent font-mono text-lg font-semibold">Navigation</span>
		<button
			onclick={closeSidebar}
			class="text-subtext1 hover:text-red rounded"
			aria-label="Close navigation menu"
		>
			<IconX size={24} />
		</button>
	</div>

	<div class="border-surface0 shrink-0 border-b p-4">
		<div class="pb-1">
			<ThemeSelector />
		</div>
		<ColorSelector />
	</div>

	<nav class="flex-1 overflow-y-auto p-4">
		<ul class="space-y-2" role="list">
			{#each mainNavItems as item (item.title)}
				{@const isActive = isItemActive(item.href, item.external)}
				<li>
					<a
						href={item.href}
						target={item.external ? '_blank' : undefined}
						rel={item.external ? 'noopener noreferrer' : undefined}
						class={`focus:bg-surface1 block rounded p-2 transition-colors duration-150 focus:outline-none ${
							isActive ? 'text-text bg-surface0' : 'text-text hover:bg-surface0'
						}`}
						aria-current={isActive ? 'page' : undefined}
						onclick={handleItemClick}
					>
						<span class="inline-flex items-center gap-2">
							<span
								class={`h-1.5 w-1.5 rounded-full transition-opacity ${isActive ? 'bg-accent opacity-100' : 'opacity-0'}`}
								aria-hidden="true"
							></span>
							{item.title}
						</span>
					</a>
				</li>
			{/each}

			<li><hr class="border-surface1 my-2 border-t" /></li>

			<li class="text-subtext0 px-2 py-1 text-xs font-semibold tracking-wider uppercase">More</li>

			{#each moreNavItems as item (item.title)}
				{@const isActive = isItemActive(item.href, item.external)}
				<li>
					<a
						href={item.href}
						target={item.external ? '_blank' : undefined}
						rel={item.external ? 'noopener noreferrer' : undefined}
						class={`focus:bg-surface1 block rounded p-2 transition-colors duration-150 focus:outline-none ${
							isActive ? 'text-text bg-surface0' : 'text-text hover:bg-surface0'
						}`}
						aria-current={isActive ? 'page' : undefined}
						onclick={closeSidebar}
					>
						<span class="inline-flex items-center gap-2">
							<span
								class={`h-1.5 w-1.5 rounded-full transition-opacity ${isActive ? 'bg-accent opacity-100' : 'opacity-0'}`}
								aria-hidden="true"
							></span>
							{item.title}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>
