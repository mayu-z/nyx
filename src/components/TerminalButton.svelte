<script lang="ts">
	import { IconTerminal2 } from '@tabler/icons-svelte';

	let { toggleTerminal } = $props<{
		toggleTerminal: () => void;
	}>();
</script>

<button
	onclick={toggleTerminal}
	class="text-text hover:text-accent cursor-pointer rounded px-3 py-2 text-sm font-medium transition-colors duration-150"
	aria-label="Open terminal"
	title="Open terminal"
>
	<IconTerminal2 size={20} />
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
</style>
