<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import LinkWithIcon from '$components/LinkWithIcon.svelte';
	import Featured, { type FeaturedProject } from '$components/layout/Featured.svelte';
	import { IconArrowRight, IconExternalLink, IconActivity } from '@tabler/icons-svelte';
	import Site from '$lib/config/common';
	import { Home } from '$lib/config/pages';
	import Experience from '$components/Experience.svelte';
	import LocationMap from '$components/bento/LocationMap.svelte';
	import type { CommitData, ProcessedCommit } from '$lib/api/commits';
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

	// --- Live commit polling ---
	const POLL_INTERVAL = 3 * 60 * 1000; // 3 minutes
	const TIME_TICK = 30_000; // update relative timestamps every 30s

	let liveCommits = $state<ProcessedCommit[]>(data.commitData?.commits ?? []);
	let lastUpdated = $state<Date>(new Date());
	let isRefreshing = $state(false);
	let now = $state(Date.now());

	let pollTimer: ReturnType<typeof setInterval>;
	let tickTimer: ReturnType<typeof setInterval>;

	function relativeTime(dateStr: string): string {
		const diff = now - new Date(dateStr).getTime();
		const seconds = Math.floor(diff / 1000);
		if (seconds < 60) return 'just now';
		const minutes = Math.floor(seconds / 60);
		if (minutes < 60) return `${minutes}m ago`;
		const hours = Math.floor(minutes / 60);
		if (hours < 24) return `${hours}h ago`;
		const days = Math.floor(hours / 24);
		return `${days}d ago`;
	}

	async function refreshCommits() {
		if (isRefreshing) return;
		isRefreshing = true;
		try {
			const res = await fetch('/api/commits');
			if (res.ok) {
				const freshData: CommitData = await res.json();
				if (freshData.commits?.length) {
					liveCommits = freshData.commits;
					lastUpdated = new Date();
				}
			}
		} catch {
			// silently fail, keep showing existing data
		} finally {
			isRefreshing = false;
		}
	}

	onMount(() => {
		// poll for new commits
		pollTimer = setInterval(refreshCommits, POLL_INTERVAL);
		// tick relative timestamps
		tickTimer = setInterval(() => {
			now = Date.now();
		}, TIME_TICK);
	});

	onDestroy(() => {
		clearInterval(pollTimer);
		clearInterval(tickTimer);
	});
</script>

<div class="mx-auto max-w-6xl space-y-12 px-0 py-8 md:space-y-16 md:px-4 md:py-12">
	<!-- Section 1: Hero / Introduction -->
	<section class="space-y-5 px-4 md:px-0">
		<h1 class="text-3xl font-bold md:text-4xl">Hey, I'm Mayuresh.</h1>

		{#if OPEN_TO_WORK}
			<span class="status-badge available">
				<span class="status-dot"></span>
				Open to Backend / DevOps / Infra roles — remote or Bangalore
			</span>
		{/if}

		<p class="text-text text-base font-medium md:text-lg">
			Backend & DevOps — Go services, Docker infra, and CI/CD pipelines that don't page you at 3 AM.
		</p>
		<p class="text-subtext0 max-w-prose text-lg leading-relaxed">
			I write Go services and wire up the infra around them — Docker, CI/CD, PostgreSQL, the works.
			Currently deep in RAG systems and agentic AI workflows, figuring out how to make them hold up
			beyond localhost. BCA student in Bangalore, DevOps at Aexiz, community lead at C3, and I
			occasionally win hackathons.
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
				href="https://cal.com/mayuresh-singh/chat"
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
				<div class="commit-card border-surface0 bg-base rounded-xl border p-4 shadow-lg">
					<div class="mb-3 flex items-center justify-between gap-2 text-sm">
						<h4 class="text-text flex items-center gap-2 font-semibold">
							<IconActivity size={16} class="text-accent" />
							<span>Latest Commits</span>
						</h4>
						<span class="live-badge" class:refreshing={isRefreshing}>
							<span class="live-dot"></span>
							<span class="live-text">LIVE</span>
						</span>
					</div>
					{#if liveCommits.length > 0}
						<ul class="space-y-1.5 text-sm">
							{#each liveCommits.slice(0, 5) as commit (commit.sha)}
								<li class="commit-row">
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
										<span class="commit-time text-overlay0 shrink-0 text-xs"
											>{relativeTime(commit.date)}</span
										>
									</a>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="text-subtext1 text-sm italic">No recent public commits.</p>
					{/if}
					<div class="mt-3 flex items-center justify-between">
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
						<span class="text-overlay0 text-xs">
							Updated {relativeTime(lastUpdated.toISOString())}
						</span>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<h3 class="text-text text-sm font-semibold">Location</h3>
				<div class="flex-1">
					<LocationMap />
				</div>
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

	/* Live commit badge */
	.live-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.15rem 0.5rem;
		border-radius: 9999px;
		background: color-mix(in oklch, var(--color-green) 10%, transparent);
		border: 1px solid color-mix(in oklch, var(--color-green) 20%, transparent);
		transition: opacity 0.3s ease;
	}

	.live-badge.refreshing {
		opacity: 0.5;
	}

	.live-dot {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		background-color: var(--color-green);
		animation: live-pulse 2s ease-in-out infinite;
	}

	.live-text {
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: var(--color-green);
	}

	@keyframes live-pulse {
		0%,
		100% {
			opacity: 1;
			box-shadow: 0 0 0 0 color-mix(in oklch, var(--color-green) 40%, transparent);
		}
		50% {
			opacity: 0.6;
			box-shadow: 0 0 0 4px color-mix(in oklch, var(--color-green) 0%, transparent);
		}
	}

	/* Commit row */
	.commit-row {
		transition:
			transform 0.15s ease,
			opacity 0.15s ease;
	}

	.commit-row:hover {
		transform: translateX(2px);
	}

	.commit-time {
		font-variant-numeric: tabular-nums;
	}

	/* Commit card shimmer on refresh */
	.commit-card {
		position: relative;
		overflow: hidden;
	}
</style>
