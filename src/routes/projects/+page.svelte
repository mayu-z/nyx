<script lang="ts">
	import { IconFolders, IconBrandGithub, IconExternalLink } from '@tabler/icons-svelte';
	import type { ProjectEntry } from '$types/projects';
	import { formatDate } from '$utils/date';
	import ProjectTags from '$components/projects/ProjectTags.svelte';

	type PageData = {
		projects: ProjectEntry[];
	};

	let { data }: { data: PageData } = $props();

	function getGithubUrl(project: ProjectEntry): string | undefined {
		return (
			project.metadata.githubUrl ||
			project.metadata.links?.find((l) => l.url.includes('github.com'))?.url
		);
	}

	function getDemoUrl(project: ProjectEntry): string | undefined {
		return (
			project.metadata.demoUrl ||
			project.metadata.links?.find((l) => l.text === 'Demo' || l.text === 'Live')?.url
		);
	}
</script>

<svelte:head>
	<meta name="description" content="A collection of projects by Mayuresh Singh." />
</svelte:head>

<div class="space-y-8">
	<h1 class="mb-8 flex items-center gap-3 text-3xl font-bold">
		<IconFolders size={30} class="text-accent" />
		<span>Projects</span>
	</h1>

	{#if data.projects.length > 0}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each data.projects as project (project.slug)}
				{@const ghUrl = getGithubUrl(project)}
				{@const demoUrl = getDemoUrl(project)}
				<div
					class="border-surface0 bg-base hover:border-accent group relative block space-y-3 rounded-xl border p-5 shadow-lg transition-colors duration-200"
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

					<a href={`/projects/${project.slug}`} class="block">
						{#if project.metadata.image}
							<img
								src={project.metadata.image.url}
								alt={project.metadata.image.alt}
								class="mb-4 aspect-video w-full rounded-md"
								style:view-transition-name="project-img-{project.slug}"
							/>
						{:else}
							<div class="bg-surface2 mb-4 aspect-video w-full rounded-md"></div>
						{/if}
						<div class="flex items-center justify-between gap-3 pe-3">
							<h2
								class="text-text group-hover:text-accent min-w-0 flex-1 truncate text-xl font-semibold"
								style:view-transition-name="project-title-{project.slug}"
							>
								{project.metadata.title}
							</h2>
							<p class="text-overlay1 shrink-0 text-xs whitespace-nowrap">
								{formatDate(project.metadata.date)}
							</p>
						</div>
						<p class="text-subtext0 line-clamp-3 text-sm">{project.metadata.description}</p>
					</a>

					<ProjectTags {project} />
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-subtext1">No projects published yet.</p>
	{/if}
</div>
