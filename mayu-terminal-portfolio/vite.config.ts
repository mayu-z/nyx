import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, '.', '');
	return {
		base: '/terminal/', // Set base path for assets
		server: {
			port: 5400,
			host: '0.0.0.0'
		},
		plugins: [react()],
		define: {
			'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
			'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
		},
		build: {
			outDir: 'dist',
			assetsDir: 'assets',
			rollupOptions: {
				output: {
					manualChunks: undefined
				}
			}
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, '.')
			}
		}
	};
});
