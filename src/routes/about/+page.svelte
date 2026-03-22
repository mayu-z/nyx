<script lang="ts">
	import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-svelte';
	import Site from '$lib/config/common';

	const handleEmailClick = () => {
		const email = atob('Y29udGFjdEA=') + window.location.hostname;
		window.location.href = `mailto:${email}`;
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
					src="/images/unnamed.jpg"
					alt=" Mayuresh"
					class="h-full w-full rounded-md object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
				/>
			</div>

			<div class="space-y-4 md:col-span-2">
				<p class="text-subtext0 text-base leading-relaxed">
					Hey - I'm Mayuresh Singh, a backend and DevOps engineer based out of Bangalore, India. I'm
					in my final year of BCA at IFIM College, and I care about building systems that are
					reliable, maintainable, and fun to work on.
				</p>

				<p class="text-subtext0 text-base leading-relaxed">
					On the professional side, I co-founded C3 - a vendor-neutral cloud computing community
					spanning AWS, GCP, Azure, and Oracle - and I work as a DevOps engineer at Aexiz Solutions,
					handling CI/CD pipelines, infrastructure, and scaling. I've also shipped hackathon
					projects in multi-agent AI (Aletheia) and autonomous DevOps tooling (Zeus).
				</p>

				<p class="text-subtext0 text-base leading-relaxed">
					Outside of work, I play Ultimate Frisbee, shoot photos, and spend too much time
					configuring Neovim. Always open to interesting problems - feel free to book a chat.
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
					<span
						role="button"
						aria-label="Send an email to contact"
						class="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
						tabindex="0"
						onclick={handleEmailClick}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								handleEmailClick();
							}
						}}
					>
						<IconMail size={16} />
						mayuresh2k4@gmail.com
					</span>
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
