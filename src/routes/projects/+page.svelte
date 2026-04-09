<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { ProjectEntry } from '$types/projects';
	import { formatDate } from '$utils/date';

	type PageData = {
		projects: ProjectEntry[];
	};

	let { data }: { data: PageData } = $props();

	let activeProject = $state<ProjectEntry | null>(null);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let innerWidth = $state(0);

	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}

	function getGithubUrl(project: ProjectEntry): string | undefined {
		return (
			project.metadata.githubUrl ||
			project.metadata.links?.find((l) => l.url.includes('github.com'))?.url
		);
	}
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	<meta name="description" content="A collection of projects by Mayuresh Singh." />
	<title>Projects | mayuu.me</title>
</svelte:head>

<div class="projects-container" onmousemove={handleMouseMove} role="list">
	<hr class="divider" />
	{#each data.projects as project}
		<a
			href={`/projects/${project.slug}`}
			class="project-row"
			onmouseenter={() => (activeProject = project)}
			onmouseleave={() => (activeProject = null)}
		>
			<span class="name">{project.metadata.title}</span>
			<span class="date">{formatDate(project.metadata.date)}</span>
		</a>
		<hr class="divider" />
	{/each}
</div>

{#if activeProject}
	{@const ghUrl = getGithubUrl(activeProject)}
	{@const displayUrl = ghUrl
		? ghUrl.replace(/^https?:\/\/(www\.)?/, '')
		: `github.com/mayu-z/${activeProject.slug}`}
	<div
		class="hover-card"
		transition:fly={{ y: 4, duration: 150 }}
		style="
			left: {mouseX + 16 > innerWidth - 300 ? mouseX - 280 : mouseX + 16}px;
			top: {mouseY + 8}px;
		"
	>
		{#if activeProject.metadata.image}
			<img
				src={activeProject.metadata.image.url}
				alt={activeProject.metadata.image.alt || activeProject.metadata.title}
				class="card-image"
			/>
		{/if}
		<div class="card-repo">{activeProject.metadata.title}</div>
		<div class="card-date">{formatDate(activeProject.metadata.date)}</div>
		<hr class="card-divider" />
		<div class="card-desc">{activeProject.metadata.description}</div>
		<div class="card-stats">★ — ⑂ —</div>
		<div class="card-link">→ {displayUrl}</div>
	</div>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

	.projects-container {
		font-family: 'JetBrains Mono', monospace;
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
	}

	.project-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 0;
		cursor: pointer;
		text-decoration: none;
	}

	.name {
		color: #cdd6f4;
		transition: color 0.15s ease;
		font-size: 15px;
	}

	.project-row:hover .name {
		color: #b4befe;
	}

	.date {
		color: #6c7086;
		font-size: 13px;
	}

	.divider {
		border: none;
		border-top: 1px solid #313244;
		margin: 0;
	}

	.hover-card {
		font-family: 'JetBrains Mono', monospace;
		position: fixed;
		pointer-events: none;
		background: #181825;
		border: 1px solid #313244;
		border-radius: 8px;
		padding: 16px;
		width: 260px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
		z-index: 100;
	}

	.card-image {
		width: 100%;
		aspect-ratio: 16/9;
		object-fit: cover;
		border-radius: 4px;
		margin-bottom: 12px;
		background-color: #313244;
	}

	.card-repo {
		font-weight: 700;
		color: #cdd6f4;
		margin-bottom: 4px;
		font-size: 14px;
	}

	.card-date {
		font-size: 12px;
		color: #6c7086;
		margin-bottom: 8px;
	}

	.card-divider {
		border: none;
		border-top: 1px solid #313244;
		margin: 8px 0;
	}

	.card-desc {
		font-size: 13px;
		color: #a6adc8;
		line-height: 1.4;
		margin-bottom: 12px;
		/* Line clamp to 3 lines just in case descriptions are long */
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-stats {
		font-size: 12px;
		color: #6c7086;
		margin-bottom: 8px;
	}

	.card-link {
		font-size: 12px;
		color: #b4befe;
		word-break: break-all;
	}

	@media (max-width: 600px) {
		.hover-card {
			display: none;
		}
	}
</style>
