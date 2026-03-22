<script lang="ts">
	import LinkWithIcon from '$components/LinkWithIcon.svelte';
	import Featured, { type FeaturedProject } from '$components/layout/Featured.svelte';
	import { IconArrowRight, IconExternalLink, IconActivity } from '@tabler/icons-svelte';
	import Site from '$lib/config/common';
	import { Home } from '$lib/config/pages';
	import Experience from '$components/Experience.svelte';
	import LocationMap from '$components/bento/LocationMap.svelte';
	import TimeWaster from '$components/bento/TimeWaster.svelte';
	import type { CommitData } from '$lib/api/commits';

	type PageData = {
		featuredProjects: FeaturedProject[];
		commitData: CommitData;
		latestPosts: {
			slug: string;
			metadata: { title: { text: string; config?: string }; published_at: string };
		}[];
	};

	let { data }: { data: PageData } = $props();
	const langTotal = $derived((data.commitData?.languages || []).reduce((a, l) => a + l.size, 0));
	const topLanguages = $derived((data.commitData?.languages || []).slice(0, 6));
</script>

<div class="mx-auto max-w-6xl space-y-12 px-0 py-8 md:space-y-16 md:px-4 md:py-12">
	<!-- Section 1: Hero / Introduction -->
	<section class="space-y-5 px-4 md:px-0">
		<h1 class="text-3xl font-bold md:text-4xl">Hey, I'm Mayuresh.</h1>
		<p class="text-text text-base font-medium md:text-lg">
			Backend & DevOps engineer. CS student building real systems.
		</p>
		<p class="text-subtext0 max-w-prose text-lg leading-relaxed">
			I work at the intersection of backend engineering and infrastructure - building reliable
			systems with Go, containerizing them with Docker, and shipping them through CI/CD pipelines.
			Currently a BCA student in Bangalore, co-founder of C3 (a cloud computing community), and
			DevOps engineer at Aexiz Solutions.
			<br /><br />
			Right now I'm deep into RAG systems and agentic AI workflows - and building things that actually
			work in production, not just on localhost.
		</p>

		<div class="flex flex-wrap items-center gap-3 pt-1">
			<a
				href="/projects"
				class="bg-accent hover:bg-accent/90 focus:ring-accent/60 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-base text-sm font-semibold transition-colors focus:ring-2 focus:outline-none"
			>
				<span>View Projects</span>
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

	<!-- Section: Minimal Experience Row -->
	<Experience />

	<!-- Section: Featured Projects -->
	<Featured projects={data.featuredProjects} maxProjects={2} />

	<!-- Section: Bento Grid Container -->
	<section class="px-4 md:px-0">
		<h2 class="sr-only">Dashboard / Highlights</h2>
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
				<h3 class="text-text text-sm font-semibold">Languages</h3>
				<div class="border-surface0 bg-base rounded-xl border p-4 shadow-lg">
					{#if langTotal > 0}
						<ul class="space-y-2.5" aria-label="Language breakdown">
							{#each topLanguages as lang (lang.name)}
								{@const percent = Math.round((lang.size / langTotal) * 100)}
								<li>
									<div class="mb-1 flex items-center justify-between gap-3 text-xs">
										<span class="text-subtext0 inline-flex items-center gap-2">
											<span
												class="inline-block h-2.5 w-2.5 rounded-full"
												style={`background-color: ${lang.color};`}
											></span>
											{lang.name}
										</span>
										<span class="text-overlay1">{percent}%</span>
									</div>
									<div class="bg-surface2 h-2 w-full rounded-md">
										<div
											class="h-full rounded-md"
											style={`width: ${percent}%; background-color: ${lang.color};`}
										></div>
									</div>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="text-subtext1 text-sm italic">
							Language stats will show after recent commits load.
						</p>
					{/if}
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-text text-sm font-semibold">Location</h3>
				<LocationMap />
			</div>

			<div class="space-y-2">
				<h3 class="text-text text-sm font-semibold">Click Counter</h3>
				<TimeWaster />
			</div>
		</div>
	</section>
</div>
