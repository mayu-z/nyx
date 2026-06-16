<script lang="ts">
	import { IconDownload, IconFileTypePdf } from '@tabler/icons-svelte';
</script>

<svelte:head>
	<title>Resume - Mayuresh Singh</title>
</svelte:head>

<div class="mx-auto max-w-5xl space-y-6 px-4 py-8 md:px-6">
	<!-- Header -->
	<div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
		<h1 class="flex items-center gap-3 text-3xl font-bold md:text-4xl">
			<IconFileTypePdf size={32} class="text-accent" />
			<span>My Resume</span>
		</h1>
		<a
			href="/resume.pdf"
			download="Mayu_Singh_Resume.pdf"
			class="bg-accent inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-base text-sm font-semibold shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
		>
			<IconDownload size={18} />
			Download PDF
		</a>
	</div>

	<!-- PDF Embed -->
	<div class="border-surface0 overflow-hidden rounded-xl border shadow-lg">
		<object
			data="/resume.pdf"
			type="application/pdf"
			class="h-[80vh] w-full"
			title="Mayuresh Singh's Resume"
		>
			<!-- Fallback for browsers that don't support object -->
			<iframe src="/resume.pdf" class="h-[80vh] w-full border-0" title="Mayuresh Singh's Resume"
			></iframe>
		</object>
	</div>

	<!-- Fallback link -->
	<p class="text-subtext0 text-center text-sm">
		Can't see the PDF?
		<a href="/resume.pdf" target="_blank" rel="noopener noreferrer" class="link text-accent">
			Open it in a new tab
		</a>
	</p>
</div>
