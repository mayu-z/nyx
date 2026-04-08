<script lang="ts">
	import LinkWithIcon from '$components/LinkWithIcon.svelte';
	import Featured, { type FeaturedProject } from '$components/layout/Featured.svelte';
	import { IconArrowRight, IconExternalLink, IconActivity } from '@tabler/icons-svelte';
	import Site from '$lib/config/common';
	import { Home } from '$lib/config/pages';
	import Experience from '$components/Experience.svelte';
	import LocationMap from '$components/bento/LocationMap.svelte';
	import type { CommitData } from '$lib/api/commits';
	import { OPEN_TO_WORK } from '$lib/config/site';

	type PageData = {
		featuredProjects: FeaturedProject[];
		commitData: CommitData;
		latestPosts: {
			slug: string;
			metadata: { title: { text: string; config?: string }; published_at: string };
		}[];
	};

	let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto max-w-6xl space-y-12 px-0 py-8 md:space-y-16 md:px-4 md:py-12">
	<!-- Section 1: Hero / Introduction -->
	<section class="space-y-5 px-4 md:px-0">
		<h1 class="text-3xl font-bold md:text-4xl">Hey, I'm Mayuresh.</h1>

		{#if OPEN_TO_WORK}
			<span class="status-badge available">
				<span class="status-dot"></span>
				Open to internships & collaborations
			</span>
		{/if}

		<p class="text-text text-base font-medium md:text-lg">
			Backend & DevOps engineer. Building reliable systems that scale.
		</p>
		<p class="text-subtext0 max-w-prose text-lg leading-relaxed">
			I work at the intersection of backend engineering and infrastructure - building reliable
			systems with Go, containerizing them with Docker, and shipping them through CI/CD pipelines.
			Currently a BCA student in Bangalore, part of C3 (a cloud computing community), and DevOps
			engineer at Aexiz Solutions.
			<br /><br />
			Right now I'm deep into RAG systems and agentic AI workflows - and building things that actually
			work in production, not just on localhost.
		</p>

		<div class="flex flex-wrap items-center gap-3 pt-1">
			<a
				href="/projects"
				class="bg-accent hover:bg-accent/90 focus:ring-accent/60 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-base text-sm font-semibold text-white transition-colors focus:ring-2 focus:outline-none"
			>
				<span>See my work</span>
				<IconArrowRight size={16} />
			</a>
			<a
				href="https://cal.com/mayuresh-singh/secret"
				target="_blank"
				rel="noopener noreferrer"
				class="border-surface1 text-subtext0 hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors"
			>
				<span>Let's talk</span>
			</a>
		</div>
		<div class="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
			{#each Home.socialLinks as link (link.href)}
				<LinkWithIcon
					href={link.href}
					text={link.text}
					icon={link.icon}
					external={true}
					class="text-sm"
				/>
				{#if link !== Home.socialLinks[Home.socialLinks.length - 1]}
					<span class="text-surface1 text-xs">|</span>
				{/if}
			{/each}
			<span class="text-surface1 text-xs">|</span>
			<a
				href="/about"
				class="group text-subtext1 hover:text-accent inline-flex items-center gap-1 text-sm transition-colors duration-200"
			>
				<span>More about me</span>
				<IconArrowRight
					size={16}
					class="transition-transform duration-200 group-hover:translate-x-0.5"
				/>
			</a>
		</div>
	</section>

	<!-- Section: Tech Stack -->
	<section class="stack-section px-4 md:px-0">
		<p class="section-eyebrow">Stack</p>
		<div class="stack-grid">
			<div class="stack-group">
				<span class="stack-label">Languages</span>
				<div class="stack-tags">
					<span>Go</span><span>TypeScript</span><span>Python</span><span>Lua</span>
				</div>
			</div>
			<div class="stack-group">
				<span class="stack-label">Infrastructure</span>
				<div class="stack-tags">
					<span>Docker</span><span>CI/CD</span><span>PostgreSQL</span><span>Redis</span>
				</div>
			</div>
			<div class="stack-group">
				<span class="stack-label">Currently deep in</span>
				<div class="stack-tags">
					<span>RAG</span><span>Agentic AI</span><span>FastAPI</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Section: Minimal Experience Row -->
	<Experience />

	<!-- Section: Featured Projects -->
	<Featured projects={data.featuredProjects} maxProjects={2} />

	<!-- Section: Activity -->
	<section class="px-4 md:px-0">
		<h2 class="sr-only">Activity</h2>
		<div class="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2">
			<div class="space-y-2">
				<h3 class="text-text text-sm font-semibold">Recent Activity</h3>
				<div class="border-surface0 bg-base rounded-xl border p-4 shadow-lg">
					<div class="mb-3 flex items-center justify-between gap-2 text-sm">
						<h4 class="text-text flex items-center gap-2 font-semibold">
							<IconActivity size={16} class="text-accent" />
							<span>Latest Commits</span>
						</h4>
						<a
							href="https://katib.jsn.cam"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="See how this is calculated Katib"
							class="text-accent/80 hover:text-accent text-xs font-medium transition-colors"
						>
							[info]
						</a>
					</div>
					{#if data.commitData?.commits?.length > 0}
						<ul class="space-y-1.5 text-sm">
							{#each data.commitData.commits.slice(0, 4) as commit (commit.sha)}
								<li>
									<a
										href={commit.href}
										target="_blank"
										rel="noopener noreferrer"
										class="text-subtext0 hover:text-accent flex min-w-0 items-center gap-2"
										title={`${commit.repo}: ${commit.message}`}
									>
										<span class="text-text shrink-0 font-medium">{commit.repo.split('/')[1]}:</span>
										<span class="min-w-0 flex-1 truncate">{commit.message}</span>
										{#if commit.additions !== undefined && commit.deletions !== undefined}
											<span class="shrink-0 text-xs whitespace-nowrap">
												<span class="text-green">+{commit.additions}</span>
												<span class="text-surface1">/</span>
												<span class="text-red">-{commit.deletions}</span>
											</span>
										{/if}
									</a>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="text-subtext1 text-sm italic">No recent public commits.</p>
					{/if}
					<div class="mt-3">
						<a
							href={Site.out.github}
							target="_blank"
							rel="noopener noreferrer"
							class="group text-accent inline-flex items-center gap-1 text-sm hover:underline"
						>
							<span>View on GitHub</span>
							<IconExternalLink
								size={14}
								class="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
							/>
						</a>
					</div>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-text text-sm font-semibold">Location</h3>
				<LocationMap />
			</div>
		</div>
	</section>
</div>

<style>
	/* Status badge */
	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-subtext0);
		background: color-mix(in oklch, var(--color-green) 12%, transparent);
		border: 1px solid color-mix(in oklch, var(--color-green) 25%, transparent);
	}

	.status-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background-color: var(--color-green);
		animation: pulse-dot 2s ease-in-out infinite;
	}

	@keyframes pulse-dot {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.5;
			transform: scale(0.85);
		}
	}

	/* Tech stack section */

	.section-eyebrow {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-overlay1);
		margin-bottom: 0.75rem;
	}

	.stack-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1.25rem;
	}

	.stack-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.stack-label {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-subtext0);
	}

	.stack-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.stack-tags span {
		display: inline-block;
		padding: 0.2rem 0.6rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-text);
		background: var(--color-surface0);
		transition:
			background-color 0.15s,
			color 0.15s;
	}

	.stack-tags span:hover {
		background: var(--color-surface1);
		color: var(--color-accent);
	}
</style>
