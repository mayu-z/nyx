<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import React from 'react';
	import { createRoot } from 'react-dom/client';
	import TerminalContainer from '$lib/terminal/TerminalContainer';

	let { isOpen = $bindable(false) } = $props();
	let isFullscreen = $state(false);
	let isMounted = $state(false);
	let terminalContainer = $state<HTMLDivElement | undefined>();
	let root: any = null;

	onMount(() => {
		isMounted = true;
	});

	onDestroy(() => {
		if (root) {
			root.unmount();
			root = null;
		}
	});

	$effect(() => {
		if (!isMounted || !terminalContainer) return;

		if (isOpen) {
			// Create a fresh root each time we open
			if (root) {
				root.unmount();
			}
			root = createRoot(terminalContainer);
			root.render(
				React.createElement(TerminalContainer, {
					onClose: handleClose,
					onMinimize: handleMinimize,
					onExpand: handleExpand,
					isFullscreen
				})
			);
		} else {
			// Unmount when closing
			if (root) {
				root.unmount();
				root = null;
			}
		}
	});

	function handleClose() {
		isOpen = false;
		isFullscreen = false;
	}

	function handleMinimize() {
		isOpen = false;
		isFullscreen = false;
	}

	function handleExpand() {
		isFullscreen = !isFullscreen;
	}
</script>

{#if isOpen && isMounted}
	<div class="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
		<div
			class={`pointer-events-auto ${
				isFullscreen
					? 'w-full h-full'
					: 'w-full max-w-4xl h-[600px] rounded-lg shadow-2xl'
			} transition-all duration-300`}
		>
			<div bind:this={terminalContainer} id="terminal-root" class="w-full h-full"></div>
		</div>
	</div>

	{#if isFullscreen}
		<!-- Fullscreen overlay background -->
		<div class="fixed inset-0 bg-black/20 z-30 pointer-events-none"></div>
	{:else}
		<!-- Center overlay for windowed mode -->
		<div class="fixed inset-0 bg-black/30 z-30 pointer-events-none"></div>
	{/if}
{/if}

<style>
	:global(#terminal-root) {
		width: 100%;
		height: 100%;
	}
</style>

