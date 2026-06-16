import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchLatestCommits } from '$lib/api/commits';

// GET /api/commits - Fetch latest commits for client-side polling
export const GET: RequestHandler = async ({ platform }) => {
	try {
		const kv = platform?.env?.NYXCACHE;
		const commitData = await fetchLatestCommits(kv);

		return json(commitData, {
			headers: {
				'Cache-Control': 'public, s-maxage=300, max-age=120, stale-while-revalidate=600'
			}
		});
	} catch (error) {
		console.error('Error fetching commits:', error);
		return json(
			{ commits: [], languages: [], totalAdditions: 0, totalDeletions: 0, totalCommits: 0 },
			{ status: 500 }
		);
	}
};
