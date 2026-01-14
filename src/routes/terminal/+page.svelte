<script lang="ts">
	import { onMount } from 'svelte';
	
	let loaded = false;
	
	onMount(() => {
		loaded = true;
	});
</script>

<svelte:head>
	<title>Terminal - Mayu Singh</title>
	<meta name="description" content="Interactive terminal portfolio" />
</svelte:head>

{#if loaded}
	<div class="fixed inset-0 w-full h-full bg-[#1e1e2e]">
		<iframe
			src="/terminal/index.html"
			title="Terminal Portfolio"
			class="w-full h-full border-0"
			sandbox="allow-scripts allow-same-origin allow-forms"
		/>
	</div>
{/if}

<style>
	:global(body) {
		overflow: hidden;
	}
</style>
