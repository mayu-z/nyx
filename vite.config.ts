import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		{
			...visualizer({
				emitFile: true,
				filename: 'stats.html'
			}),
			apply: 'build'
		}
	],
	server: {
		fs: {
			allow: ['.']
		}
	},
	// We render a small React island (the terminal) inside Svelte.
	// Vite/esbuild can compile TSX/JSX without @vitejs/plugin-react, which avoids
	// React Fast Refresh preamble injection requirements in SvelteKit.
	esbuild: {
		jsx: 'automatic',
		jsxImportSource: 'react'
	}
});
