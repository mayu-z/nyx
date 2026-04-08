<script lang="ts">
	import { IconStar, IconBrandGithub, IconExternalLink } from '@tabler/icons-svelte';
	import type { ProjectMetadata } from '$types/projects';
	import ProjectTags from '$components/projects/ProjectTags.svelte';
	import type { ProjectEntry } from '$types/projects';

	function getGithubUrl(project: FeaturedProject): string | undefined {
		return (
			project.metadata.githubUrl ||
			project.metadata.links?.find((l) => l.url.includes('github.com'))?.url
		);
	}

	function getDemoUrl(project: FeaturedProject): string | undefined {
		return (
			project.metadata.demoUrl ||
			project.metadata.links?.find((l) => l.text === 'Demo' || l.text === 'Live')?.url
		);
	}

	export interface FeaturedProject {
		slug: string;
		metadata: ProjectMetadata;
	}

	type Props = {
		projects: FeaturedProject[];
		maxProjects: number;
	};

	let { projects, maxProjects }: Props = $props();

	// reduce projects down to maxProjects
	projects = projects.slice(0, maxProjects);
</script>

{#if projects.length > 0}
	<section class="px-4 py-8 md:px-0">
		<div class="mb-8 flex items-center justify-between">
			<h2 class="flex items-center gap-3 text-2xl font-semibold md:text-3xl">
				<IconStar size={28} class="text-accent" />
				<span>Featured Projects</span>
			</h2>
			<a
				href="/projects"
				class="group text-subtext0 hover:text-accent hidden items-center gap-1 text-sm transition-colors duration-200 sm:inline-flex"
			>
				<span>Browse all projects →</span>
			</a>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each projects as project (project.slug)}
				{@const ghUrl = getGithubUrl(project)}
				{@const demoUrl = getDemoUrl(project)}
				<div
					class="border-surface0 bg-mantle hover:border-accent focus-visible:border-accent group relative overflow-hidden rounded-xl border shadow-lg transition-all duration-300 hover:shadow-xl"
				>
					<!-- Quick links -->
					{#if ghUrl || demoUrl}
						<div class="absolute top-3 right-3 z-10 flex items-center gap-1.5">
							{#if ghUrl}
								<a
									href={ghUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="bg-surface0/80 hover:bg-accent text-subtext0 flex h-7 w-7 items-center justify-center rounded-md backdrop-blur-sm transition-all duration-150 hover:text-base"
									title="View on GitHub"
									onclick={(e) => e.stopPropagation()}
								>
									<IconBrandGithub size={15} />
								</a>
							{/if}
							{#if demoUrl}
								<a
									href={demoUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="bg-surface0/80 hover:bg-accent text-subtext0 flex h-7 w-7 items-center justify-center rounded-md backdrop-blur-sm transition-all duration-150 hover:text-base"
									title="Live demo"
									onclick={(e) => e.stopPropagation()}
								>
									<IconExternalLink size={15} />
								</a>
							{/if}
						</div>
					{/if}

					<a href={`/projects/${project.slug}`} class="block focus:outline-none">
						{#if project.metadata.image}
							<div class="overflow-hidden">
								<img
									src={project.metadata.image.url}
									alt={project.metadata.image.alt}
									class="aspect-video w-full transition-transform duration-300 group-hover:scale-105"
									style:view-transition-name="project-img-{project.slug}"
								/>
							</div>
						{/if}

						<div class="space-y-3 p-5">
							<h3
								class="text-text group-hover:text-accent text-xl font-semibold transition-colors"
								style:view-transition-name="project-title-{project.slug}"
							>
								{project.metadata.title}
							</h3>
							<p class="text-subtext0 line-clamp-2 text-sm">{project.metadata.description}</p>

							{#if project.metadata.tags && project.metadata.tags.length > 0}
								<div class="flex items-center gap-x-2 pt-1 text-xs">
									<ProjectTags {project} />
								</div>
							{/if}
						</div>
					</a>
				</div>
			{/each}
		</div>

		<!-- Link for smaller screens -->
		<div class="mt-6 text-center sm:hidden">
			<a
				href="/projects"
				class="text-subtext0 hover:text-accent text-sm transition-colors duration-200"
			>
				Browse all projects →
			</a>
		</div>
	</section>
{/if}
