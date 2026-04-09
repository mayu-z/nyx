<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { ProjectEntry } from '$types/projects';
	import { formatDate } from '$utils/date';

	type PageData = {
		projects: ProjectEntry[];
	};

	let { data }: { data: PageData } = $props();

	let activeProject = $state<ProjectEntry | null>(null);
	let cardPos = $state({ top: 0, left: 0 });
	let hideTimeout: ReturnType<typeof setTimeout>;

	function onRowEnter(project: ProjectEntry, event: MouseEvent) {
		clearTimeout(hideTimeout);
		activeProject = project;

		const row = event.currentTarget as HTMLElement;
		const rect = row.getBoundingClientRect();

		// Position card so its top sits 3-4px above the divider (bottom edge of row)
		const cardTop = rect.bottom - 4;

		let computedLeft = rect.left + rect.width / 2;
		if (computedLeft + 300 > window.innerWidth) {
			computedLeft = window.innerWidth - 300 - 16;
		}
		if (computedLeft < 16) {
			computedLeft = 16;
		}

		cardPos = {
			top: cardTop,
			left: computedLeft
		};
	}

	function onRowLeave() {
		hideTimeout = setTimeout(() => {
			activeProject = null;
		}, 150);
	}

	function onCardEnter() {
		clearTimeout(hideTimeout);
	}

	function onCardLeave() {
		activeProject = null;
	}

	function getGithubUrl(project: ProjectEntry): string | undefined {
		return (
			project.metadata.githubUrl ||
			project.metadata.links?.find((l) => l.url.includes('github.com'))?.url
		);
	}
</script>

<svelte:head>
	<meta name="description" content="A collection of projects by Mayuresh Singh." />
	<title>Projects | mayuu.me</title>
</svelte:head>

<div class="projects-container" role="list">
	<hr class="divider" />
	{#each data.projects as project}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="row-container"
			onmouseenter={(e) => onRowEnter(project, e)}
			onmouseleave={onRowLeave}
		>
			<a href={`/projects/${project.slug}`} class="project-row">
				<div class="row-left">
					<span class="name">{project.metadata.title}</span>
					<p class="row-desc">{project.metadata.description}</p>
				</div>
				<span class="date">{formatDate(project.metadata.date)}</span>
			</a>
		</div>
		<hr class="divider" />
	{/each}
</div>

{#if activeProject}
	{@const ghUrl = getGithubUrl(activeProject)}
	{@const displayUrl = ghUrl
		? ghUrl.replace(/^https?:\/\/(www\.)?/, '')
		: `github.com/mayu-z/${activeProject.slug}`}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="hover-card"
		style="top: {cardPos.top}px; left: {cardPos.left}px;"
		onmouseenter={onCardEnter}
		onmouseleave={onCardLeave}
		transition:fly={{ y: 4, duration: 150 }}
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
		{#if ghUrl}
			<a href={ghUrl} target="_blank" rel="noopener noreferrer" class="card-link block"
				>→ {displayUrl}</a
			>
		{:else}
			<div class="card-link">→ {displayUrl}</div>
		{/if}
	</div>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

	.projects-container {
		font-family: 'JetBrains Mono', monospace;
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		position: relative;
		overflow: visible;
	}

	.row-container {
		position: relative;
	}

	.project-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		padding: 1.2rem 0;
		cursor: pointer;
		text-decoration: none;
	}

	.row-left {
		min-width: 0;
		flex: 1;
	}

	.name {
		color: #cdd6f4;
		transition: color 0.15s ease;
		font-size: 28px;
		font-weight: 700;
		line-height: 1.2;
		display: block;
	}

	.project-row:hover .name {
		color: #b4befe;
	}

	.row-desc {
		color: #a6adc8;
		font-size: 15px;
		line-height: 1.4;
		margin-top: 6px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.date {
		color: #6c7086;
		font-size: 13px;
		white-space: nowrap;
		padding-top: 6px;
	}

	.divider {
		border: none;
		border-top: 1px solid #313244;
		margin: 0;
	}

	.hover-card {
		font-family: 'JetBrains Mono', monospace;
		position: fixed;
		background: #181825;
		border: 1px solid #313244;
		border-radius: 8px;
		padding: 16px;
		width: max-content;
		max-width: 300px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
		z-index: 50;
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
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-link {
		font-size: 12px;
		color: #b4befe;
		word-break: break-all;
		text-decoration: none;
		transition: color 0.15s ease;
	}

	a.card-link:hover {
		color: #cdd6f4;
		text-decoration: underline;
	}
</style>
