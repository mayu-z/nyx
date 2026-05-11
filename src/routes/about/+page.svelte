<script lang="ts">
	import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-svelte';
	import Site from '$lib/config/common';

	let copiedEmail = $state(false);

	const handleEmailClick = () => {
		navigator.clipboard.writeText('mayuresh2k4@gmail.com');
		copiedEmail = true;
		setTimeout(() => {
			copiedEmail = false;
		}, 2000);
	};
</script>

<svelte:head>
	<title>About Me | Mayu</title>
</svelte:head>

<div class="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-6">
	<!-- About Me Section -->
	<section class="space-y-6">
		<h1 class="flex items-center gap-3 text-3xl font-bold md:text-4xl">
			<span>About Me</span>
		</h1>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="md:col-span-1">
				<img
					src="/images/about-photo.jpg"
					alt="Mayuresh Singh, backend and infrastructure engineer"
					class="h-full w-full rounded-md object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
				/>
			</div>

			<div class="space-y-4 md:col-span-2">
				<p class="text-subtext0 text-base leading-relaxed">
					Hey - I'm Mayuresh Singh, a backend and infrastructure engineer based out of Bangalore,
					India. I'm in my final year of BCA at IFIM College, and I care about building systems that
					are reliable, maintainable, and fun to work on.
				</p>

				<p class="text-subtext0 text-base leading-relaxed">
					On the professional side, I am actively involved in C3 - a vendor-neutral cloud computing
					community spanning AWS, GCP, Azure, and Oracle - and I lead engineering at Aexiz, handling
					CI/CD pipelines, infrastructure, and scaling. I've also shipped hackathon projects in
					multi-agent AI (Aletheia) and autonomous DevOps tooling (Zeus).
				</p>

				<p class="text-subtext0 text-base leading-relaxed">
					Outside of work, I Competative chess, read books, and spend too much time configuring
					Neovim. Always open to interesting problems - feel free to book a chat.
				</p>

				<div class="flex flex-wrap gap-3 pt-2">
					<a
						href={Site.out.github}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
					>
						<IconBrandGithub size={16} />
						GitHub
					</a>

					<span class="text-surface1">*</span>

					<a
						href={Site.out.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
					>
						<IconBrandLinkedin size={16} />
						LinkedIn
					</a>

					<span class="text-surface1">*</span>
					<button
						aria-label="Copy email address"
						class="hover:text-accent relative inline-flex cursor-pointer items-center gap-1.5 text-sm transition-colors"
						onclick={handleEmailClick}
					>
						<IconMail size={16} />
						mayuresh2k4[at]gmail.com
						{#if copiedEmail}
							<span
								class="bg-surface0 text-text absolute -top-8 left-1/2 -translate-x-1/2 rounded-md px-2 py-1 text-xs whitespace-nowrap shadow-md"
							>
								Copied!
							</span>
						{/if}
					</button>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	/* Offset for fixed navbar when navigating to anchors */
	:global(html) {
		scroll-padding-top: 5rem;
	}
</style>
