<script lang="ts">
	import {
		IconUser,
		IconBrandGithub,
		IconBrandLinkedin,
		IconMail,
		IconDog,
		IconStar,
		IconRocket,
		IconCode
	} from '@tabler/icons-svelte';
	import Site from '$lib/config/common';
	import AnchorHeader from '$lib/components/AnchorHeader.svelte';

	const handleEmailClick = () => {
		const email = atob('Y29udGFjdEA=') + window.location.hostname;
		window.location.href = `mailto:${email}`;
	};

	type str = string; // my IDE yells at me if i use string in the snippet. :shrug:
	type num = number; // my IDE yells at me if i use string in the snippet. :shrug:
</script>

<svelte:head>
	<title>About Me | Mayu</title>
</svelte:head>

{#snippet ExternalLink(href: str, text: str)}
	<a {href} target="_blank" rel="noopener noreferrer" class="link">
		{text}
	</a>
{/snippet}

{#snippet GithubProject(title: str, href: str, stars: num)}
	<a {href} id={title.toLowerCase()} target="_blank" rel="noopener noreferrer" class="link">
		{title}
	</a>

	<span class="inline-flex items-center space-x-1 text-sm">
		<!--  <CountUp duration={300} value={stars} />-->
		{stars}
		<IconStar class="ml-1" size={14} />
	</span>
{/snippet}

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
					alt="Jason Cameron"
					class="h-full w-full rounded-md object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
				/>
			</div>

			<div class="space-y-4 md:col-span-2">
				<p class="text-subtext0 text-base leading-relaxed">
					<b>Hey!</b> I'm Mayu Singh <a class="link" href="/socials">(@mayu-z)</a> — a
					Software Engineer by passion based out of Bangalore, India. I like to make
					<a href="/projects" class="link">cool projects</a>
					when i'm bored. <!--todo: make toronto canada something cool-->
				</p>

				<p class="text-subtext0 text-base leading-relaxed">
					Some of my more notable work includes architecting the logistics infrastructure at
					{@render ExternalLink('https://www.aexiz.com/', 'Aexiz')} as CTO, where we leverage edge
					computing for sustainable fulfillment. I also co-launched
					{@render ExternalLink('https://deep.hackathon.com/', 'Deep')}, a national platform for
					student innovation, and develop high-scale AI systems at
					{@render ExternalLink('https://stan.store', 'Stan')}. My niche lies at the intersection of
					robust backend development and system design, with a particular interest in building
					efficient, maintainable architectures that scale.
				</p>

				<p class="text-subtext0 text-base leading-relaxed">
					Outside of software, I enjoy playing Ultimate frisbee, <a
						href="/photos"
						class="link"
						target="_blank">photography</a
					>, organizing/participating at/mentoring hackathons and spending time with my dog, Bella (<a
						href="#bella"
						class="link">see below</a
					>). I also have a passion for exploring the world in general! Feel free to
					<a href={Site.out.calcom} target="_blank" rel="noopener noreferrer" class="link"
						>book a chat</a
					> if you'd like to connect.
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

		
	<!-- <section id="hobbies-section" class="space-y-8">
		

		
		<div class="bg-base rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md">
			<AnchorHeader
				level="h3"
				id="bella"
				class="mb-5 flex items-center gap-2 text-xl font-semibold"
			>
				<IconDog size={24} class="text-accent" />
				My Dog (Bella!)
			</AnchorHeader>

			<div class="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
				<img
					src="/images/bella/bella-autumn-2022.webp"
					alt="A landscape of Bella in the autumn by a pond"
					class="h-40 w-full rounded-md object-cover shadow-sm transition-transform duration-300 hover:scale-[1.03]"
				/>
				<img
					src="/images/bella/bella-portrait-2022.webp"
					alt="Portrait of Bella taken playing with a tennis ball"
					class="h-40 w-full rounded-md object-cover shadow-sm transition-transform duration-300 hover:scale-[1.03]"
				/>
				<img
					src="/images/bella/bella-portrait-2024.webp"
					alt="Landscape of Bella lying next to a stick looking at the sky"
					class="h-40 w-full rounded-md object-cover shadow-sm transition-transform duration-300 hover:scale-[1.03]"
				/>
			</div>

			
		</div>
	</section> -->
</div>

<style>
	/* Offset for fixed navbar when navigating to anchors */
	:global(html) {
		scroll-padding-top: 5rem; /* Adjust based on your navbar height */
	}

	/* Custom scrollbar */
	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.05);
		border-radius: 10px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: var(--color-accent);
		border-radius: 10px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: var(--color-accent-hover);
	}
</style>
