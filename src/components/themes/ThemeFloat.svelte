<script>
	import ThemeSelector from '$components/themes/ThemeSelector.svelte';
	import ColorSelector from '$components/themes/ColorSelector.svelte';
	import { IconPalette, IconX } from '@tabler/icons-svelte';

	let isOpen = $state(false);

	function toggle() {
		isOpen = !isOpen;
	}

	function close() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-40"
		onclick={close}
		onkeydown={(e) => e.key === 'Escape' && close()}
	></div>
{/if}

<!-- Floating trigger button -->
<button
	onclick={toggle}
	class="theme-float-btn"
	aria-label="Open theme picker"
	title="Theme & accent color"
>
	{#if isOpen}
		<IconX size={20} />
	{:else}
		<IconPalette size={20} />
	{/if}
</button>

<!-- Panel -->
{#if isOpen}
	<div class="theme-float-panel" role="dialog" aria-label="Theme picker">
		<ThemeSelector />
		<ColorSelector />
	</div>
{/if}

<style>
	.theme-float-btn {
		position: fixed;
		bottom: 1.25rem;
		right: 1.25rem;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		background: var(--color-surface0);
		color: var(--color-accent);
		border: 1px solid var(--color-surface1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		cursor: pointer;
		transition:
			background-color 0.2s,
			transform 0.2s,
			box-shadow 0.2s;
	}

	.theme-float-btn:hover {
		background: var(--color-surface1);
		transform: scale(1.08);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
	}

	.theme-float-panel {
		position: fixed;
		bottom: 4.5rem;
		right: 1.25rem;
		z-index: 50;
		width: 280px;
		max-height: 80vh;
		overflow-y: auto;
		padding: 1rem;
		border-radius: 0.75rem;
		background: var(--color-mantle);
		border: 1px solid var(--color-surface0);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
		animation: float-in 0.2s ease-out;
	}

	@keyframes float-in {
		from {
			opacity: 0;
			transform: translateY(8px) scale(0.96);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>
