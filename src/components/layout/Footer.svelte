<script lang="ts">
	import { PUBLIC_COMMIT_SHA } from '$env/static/public';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Site, { Socials } from '$lib/config/common';
	import {
		IconClock,
		IconBrandGithub,
		IconBrandLinkedin,
		IconMail,
		IconCalendar
	} from '@tabler/icons-svelte';

	const { value } = $props();

	const year = new Date().getFullYear();
	const shortSha = PUBLIC_COMMIT_SHA ? PUBLIC_COMMIT_SHA.substring(0, 7) : '';
	const commitLinkUrl = PUBLIC_COMMIT_SHA ? `${Site.repo.commitBaseUrl}${PUBLIC_COMMIT_SHA}` : '#';

	let currentTime = $state('');

	function updateTime() {
		currentTime = new Intl.DateTimeFormat('en-US', {
			timeZone: 'Asia/Kolkata',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		}).format(new Date());
	}

	onMount(() => {
		if (browser) {
			updateTime();
			const interval = setInterval(updateTime, 1000);

			return () => {
				clearInterval(interval);
			};
		}
	});
</script>

<div class="relative m-auto mx-5 mb-5">
	<!-- Raised webring section that morphs into the footer -->
	<div class="relative">
		<!-- The raised section for the webring -->
		<div
			class="bg-crust border-surface0/20 absolute -top-10 right-5 z-10 flex items-center rounded-t-lg border-t border-r border-l px-4 py-2 shadow-sm md:right-8"
		>
			<div class="text-subtext1 flex items-center gap-x-1 text-xs whitespace-nowrap md:text-sm">
				<span class="text-overlay1">Webrings:</span>
				<abbr title="Catppuccin webring" class="no-underline">
					<a
						href="https://ctp-webr.ing/"
						target="_blank"
						rel="noopener noreferrer"
						class="saturate-[0.5] transition-colors duration-200"
						title="CTP Webring"
					>
						<span class="text-rosewater">c</span><span class="text-green">p</span><span
							class="text-blue">t</span
						>
					</a>
				</abbr>
				<span class="text-xs leading-none opacity-75">
					<span class="opacity-40">&lbrace;</span><a
						href="https://ctp-webr.ing/json/previous"
						target="_blank"
						rel="noopener noreferrer"
						class="text-accent hover:text-accent/80 px-0.5 align-top transition-colors duration-200"
						title="Previous site in webring">&lt;</a
					><span class="text-accent opacity-40">|</span><a
						href="https://ctp-webr.ing/json/next"
						target="_blank"
						rel="noopener noreferrer"
						class="text-accent hover:text-accent/80 px-0.5 align-top transition-colors duration-200"
						title="Next site in webring">&gt;</a
					><span class="opacity-40">&rbrace;</span>
				</span>
			</div>
		</div>
	</div>

	<!-- Main footer -->
	<footer
		class="bg-crust text-subtext0 border-surface0/20 flex h-auto flex-col items-center gap-y-4 rounded-lg border p-5 text-sm"
	>
		<!-- Row 1: Name & tagline -->
		<div class="text-center">
			<p class="text-text font-semibold">Mayuresh Singh</p>
			<p class="text-subtext1 text-xs">Backend & Infrastructure Engineer</p>
		</div>

		<!-- Row 2: Social links -->
		<div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
			<a
				href={Site.out.github}
				target="_blank"
				rel="noopener noreferrer"
				class="text-subtext1 hover:text-accent inline-flex items-center gap-1.5 text-xs transition-colors duration-200"
			>
				<IconBrandGithub size={14} />
				<span>GitHub</span>
			</a>
			<a
				href={Site.out.linkedin}
				target="_blank"
				rel="noopener noreferrer"
				class="text-subtext1 hover:text-accent inline-flex items-center gap-1.5 text-xs transition-colors duration-200"
			>
				<IconBrandLinkedin size={14} />
				<span>LinkedIn</span>
			</a>
			<a
				href="mailto:mayuresh2k4@gmail.com"
				class="text-subtext1 hover:text-accent inline-flex items-center gap-1.5 text-xs transition-colors duration-200"
			>
				<IconMail size={14} />
				<span>Email</span>
			</a>
			<a
				href={Site.out.calcom}
				target="_blank"
				rel="noopener noreferrer"
				class="text-subtext1 hover:text-accent inline-flex items-center gap-1.5 text-xs transition-colors duration-200"
			>
				<IconCalendar size={14} />
				<span>Book a call</span>
			</a>
		</div>

		<!-- Row 3: Built with / license / status -->
		<div class="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs">
			<span class="text-overlay1">Built with SvelteKit</span>
			<span class="text-surface0">·</span>
			<span class="whitespace-nowrap">
				AGPL v3 ·
				<a
					href={Site.repo.url}
					target="_blank"
					rel="noopener noreferrer"
					class="text-accent hover:text-accent/80 transition-colors duration-200"
				>
					Source on GitHub
				</a>
			</span>

			<span class="text-surface0">·</span>

			<div class="flex items-center gap-1.5 whitespace-nowrap" title="Service Status">
				<span class="relative flex h-2.5 w-2.5">
					<span
						class="animate-duration-[2000ms] bg-green/75 absolute inline-flex h-full w-full animate-ping rounded-full"
					></span>
					<span class="bg-green relative inline-flex h-2.5 w-2.5 rounded-full"></span>
				</span>
				<span class="text-subtext1">All Services Nominal</span>
			</div>
		</div>

		<!-- Row 4: Time + commit (minimal) -->
		<div class="flex items-center gap-3 text-xs">
			<div class="flex items-center gap-1.5" title="Current Time (GMT+5:30)">
				<IconClock size={12} class="text-subtext1" />
				<span class="text-accent font-mono">{currentTime}</span>
			</div>

			{#if PUBLIC_COMMIT_SHA && PUBLIC_COMMIT_SHA !== 'dev'}
				<span class="text-surface0">·</span>
				<a
					href={commitLinkUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="text-overlay1 hover:text-accent font-mono transition-colors duration-200"
					title="View deployment commit ({PUBLIC_COMMIT_SHA})"
				>
					{shortSha}
				</a>
			{/if}
		</div>
	</footer>
</div>
<!-- {/* local build / dev text removed from visible UI */} -->
