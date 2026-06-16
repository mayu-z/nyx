<script lang="ts">
	import { onMount } from 'svelte';
	import { IconMapPin, IconSun, IconMoon } from '@tabler/icons-svelte';
	import { browser } from '$app/environment';

	let mapContainer = $state<HTMLDivElement>();
	let leafletLoaded = $state(false);
	let mapFailed = $state(false);
	let mapInstance: any = null;
	let currentTime = $state('');
	let isDaytime = $state(true);

	function updateTime() {
		const now = new Date();
		const bangaloreTime = new Intl.DateTimeFormat('en-US', {
			timeZone: 'Asia/Kolkata',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		}).format(now);
		currentTime = bangaloreTime;

		// Check if daytime (6 AM - 9 PM)
		const hour = parseInt(bangaloreTime.split(':')[0]);
		isDaytime = hour >= 6 && hour < 21;
	}

	onMount(() => {
		// Start clock
		updateTime();
		const interval = setInterval(updateTime, 1000);

		// Set a 2-second timeout for map loading fallback
		const fallbackTimeout = setTimeout(() => {
			if (!leafletLoaded) {
				mapFailed = true;
			}
		}, 2000);

		// Handle async map loading
		(async () => {
			if (browser && mapContainer) {
				try {
					const L = (await import('leaflet')).default;
					await import('leaflet/dist/leaflet.css');
					mapInstance = L.map(mapContainer, {
						zoomControl: false,
						attributionControl: false,
						dragging: true,
						scrollWheelZoom: true,
						doubleClickZoom: true,
						boxZoom: true,
						keyboard: true,
						touchZoom: true
					}).setView([12.9716, 77.5946], 11);

					L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
						maxZoom: 19,
						attribution: '',
						keepBuffer: 4,
						updateWhenIdle: false,
						updateWhenZooming: false
					}).addTo(mapInstance);

					// Add a pulsing marker for Bangalore
					const pulseIcon = L.divIcon({
						className: 'pulse-marker',
						iconSize: [20, 20],
						iconAnchor: [10, 10],
						html: '<div class="pulse-marker-dot"></div><div class="pulse-marker-ring"></div>'
					});
					L.marker([12.9716, 77.5946], { icon: pulseIcon }).addTo(mapInstance);

					leafletLoaded = true;
					mapFailed = false;
					clearTimeout(fallbackTimeout);
				} catch {
					mapFailed = true;
				}
			}
		})();

		return () => {
			clearInterval(interval);
			clearTimeout(fallbackTimeout);
		};
	});

	function recenterMap() {
		if (mapInstance) {
			mapInstance.setView([12.9716, 77.5946], 11);
		}
	}
</script>

<div
	class="location-card border-surface0 bg-base flex h-full flex-col rounded-xl border p-4 shadow-lg"
>
	<button
		onclick={recenterMap}
		class="text-text hover:text-accent mb-3 flex w-full cursor-pointer items-center gap-2 text-left text-sm font-semibold transition-colors"
	>
		<IconMapPin size={16} class="text-accent" />
		Currently Based In 📍
	</button>
	<div class="bg-surface0 relative w-full flex-1 overflow-hidden rounded-lg">
		{#if browser}
			<div bind:this={mapContainer} class="bg-surface0 relative z-0 h-full w-full"></div>
			{#if !leafletLoaded}
				{#if mapFailed}
					<!-- Static fallback after 2 seconds -->
					<div class="absolute inset-0 flex flex-col items-center justify-center gap-2">
						<span class="text-2xl">📍</span>
						<span class="text-subtext0 text-sm font-medium">Bangalore, KA</span>
						<span class="text-overlay0 text-xs">India</span>
					</div>
				{:else}
					<!-- Shimmer skeleton placeholder -->
					<div class="shimmer-container absolute inset-0">
						<div class="shimmer-bg"></div>
						<div class="shimmer-content">
							<div class="shimmer-pin"></div>
							<div class="shimmer-line shimmer-line-1"></div>
							<div class="shimmer-line shimmer-line-2"></div>
						</div>
					</div>
				{/if}
			{/if}
		{:else}
			<div class="absolute inset-0 flex flex-col items-center justify-center gap-2">
				<span class="text-2xl">📍</span>
				<span class="text-subtext0 text-sm font-medium">Bangalore, KA</span>
				<span class="text-overlay0 text-xs">India</span>
			</div>
		{/if}
	</div>
	<div class="mt-3 flex items-center justify-between gap-2">
		<button
			onclick={recenterMap}
			class="text-subtext0 hover:text-accent cursor-pointer text-xs whitespace-nowrap transition-colors"
		>
			Bangalore, KA
		</button>
		{#if currentTime}
			<div class="flex items-center gap-1">
				{#if isDaytime}
					<IconSun size={12} class="text-yellow" />
				{:else}
					<IconMoon size={12} class="text-blue" />
				{/if}
				<span class="text-accent font-mono text-xs whitespace-nowrap">
					{currentTime}
				</span>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(.leaflet-container) {
		background: var(--color-base) !important;
	}

	:global(.leaflet-tile-container) {
		background: var(--color-base) !important;
	}

	:global(.leaflet-pane) {
		background: var(--color-base) !important;
	}

	/* Shimmer skeleton animation */
	.shimmer-container {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-surface0);
	}

	.shimmer-bg {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			110deg,
			transparent 25%,
			color-mix(in oklch, var(--color-surface1) 40%, transparent) 37%,
			transparent 50%
		);
		background-size: 200% 100%;
		animation: shimmer 1.8s ease-in-out infinite;
	}

	.shimmer-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		z-index: 1;
	}

	.shimmer-pin {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background: var(--color-surface1);
	}

	.shimmer-line {
		height: 0.5rem;
		border-radius: 0.25rem;
		background: var(--color-surface1);
	}

	.shimmer-line-1 {
		width: 5rem;
	}

	.shimmer-line-2 {
		width: 3rem;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	.location-card {
		min-height: 280px;
	}

	/* Pulsing map marker */
	:global(.pulse-marker) {
		background: none !important;
		border: none !important;
	}

	:global(.pulse-marker-dot) {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-accent);
		transform: translate(-50%, -50%);
		box-shadow: 0 0 6px 2px color-mix(in oklch, var(--color-accent) 50%, transparent);
	}

	:global(.pulse-marker-ring) {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 2px solid var(--color-accent);
		transform: translate(-50%, -50%);
		animation: marker-pulse 2s ease-out infinite;
		opacity: 0.7;
	}

	@keyframes marker-pulse {
		0% {
			transform: translate(-50%, -50%) scale(0.5);
			opacity: 0.7;
		}
		100% {
			transform: translate(-50%, -50%) scale(2.5);
			opacity: 0;
		}
	}
</style>
