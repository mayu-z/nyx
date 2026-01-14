import { measurePerformance } from '$lib/utils/performance';
import { getKV, setKV, isCacheStale } from '$lib/utils/edge-cache';
import type { KVNamespace } from '@cloudflare/workers-types';
export interface CommitLanguage {
	size: number;
	name: string;
	color: string;
}

export interface V2CommitItem {
	repo: string;
	additions: number;
	deletions: number;
	commitUrl: string;
	committedDate: string;
	oid: string;
	messageHeadline: string;
	messageBody: string;
}

export interface KatibV2Response {
	commits: V2CommitItem[];
	languages: CommitLanguage[];
	stats: { totalAdditions: number; totalDeletions: number; totalCommits: number };
}

export interface ProcessedCommit {
	repo: string;
	message: string;
	href: string;
	sha: string;
	date: string;
	additions?: number;
	deletions?: number;
}

export interface CommitData {
	commits: ProcessedCommit[];
	languages: CommitLanguage[];
	totalAdditions: number;
	totalDeletions: number;
	totalCommits: number;
}

const KV_KEY = 'katib:commits';
const TTL_MS = 60 * 60 * 1000; // 1 hour

// Fallback data as provided (v2 shape)
const FALLBACK_RAW: KatibV2Response = {
	commits: [
		{
			repo: 'mayu-z/github-card-creatorr',
			additions: 0,
			deletions: 0,
			commitUrl:
				'https://github.com/mayu-z/github-card-creatorr/commit/d9807c4911cac32f9e201195c837745645eedb69',
			committedDate: '2026-01-05T16:31:46Z',
			oid: 'd9807c4',
			messageHeadline: 'Delete public/favicon.ico',
			messageBody: ''
		},
		{
			repo: 'mayu-z/take',
			additions: 2,
			deletions: 2,
			commitUrl: 'https://github.com/mayu-z/take/commit/807b8599f8bbc022f62e8e10248fa18ac5c8f4ae',
			committedDate: '2026-01-05T14:16:10Z',
			oid: '807b859',
			messageHeadline: 'Update video source path',
			messageBody: ''
		},
		{
			repo: 'mayu-z/flappy-project-react',
			additions: 0,
			deletions: 36,
			commitUrl:
				'https://github.com/mayu-z/flappy-project-react/commit/2914b291b6c4c263baa7065058604ce8d3a1f812',
			committedDate: '2026-01-05T13:46:48Z',
			oid: '2914b29',
			messageHeadline: "Remove 'npm run eject' section from README",
			messageBody: ''
		},
		{
			repo: 'mayu-z/nvim-config',
			additions: 15,
			deletions: 8,
			commitUrl:
				'https://github.com/mayu-z/nvim-config/commit/d73346658330be57a5f34bf2391b5ad32b519341',
			committedDate: '2026-01-04T12:30:00Z',
			oid: 'd733466',
			messageHeadline: 'Update plugin configurations',
			messageBody: ''
		}
	],
	languages: [
		{ size: 450000, name: 'TypeScript', color: '#3178c6' },
		{ size: 320000, name: 'JavaScript', color: '#f1e05a' },
		{ size: 180000, name: 'Svelte', color: '#ff3e00' },
		{ size: 120000, name: 'CSS', color: '#663399' },
		{ size: 95000, name: 'HTML', color: '#e34c26' },
		{ size: 45000, name: 'Lua', color: '#000080' }
	],
	stats: { totalAdditions: 1250, totalDeletions: 380, totalCommits: 42 }
};

function processResponse(data: KatibV2Response): CommitData {
	const commits: ProcessedCommit[] = (data.commits || []).map((c) => ({
		repo: c.repo,
		message: c.messageHeadline,
		href: c.commitUrl,
		sha: c.oid,
		date: c.committedDate,
		additions: c.additions,
		deletions: c.deletions
	}));

	const totalAdditions =
		data.stats?.totalAdditions ?? commits.reduce((acc, c) => acc + (c.additions || 0), 0);
	const totalDeletions =
		data.stats?.totalDeletions ?? commits.reduce((acc, c) => acc + (c.deletions || 0), 0);
	const totalCommits = data.stats?.totalCommits ?? commits.length;

	return {
		commits,
		languages: data.languages || [],
		totalAdditions,
		totalDeletions,
		totalCommits
	};
}

const GITHUB_USERNAME = 'mayu-z';

interface GitHubEvent {
	type: string;
	repo: { name: string };
	payload: {
		commits?: Array<{ sha: string; message: string }>;
		head?: string;
	};
	created_at: string;
}

interface GitHubCommitDetail {
	sha: string;
	commit: { message: string; author: { date: string } };
	html_url: string;
	stats?: { additions: number; deletions: number };
}

/**
 * Fetches the latest commits from GitHub API
 */
async function fetchFromGitHub(): Promise<KatibV2Response | null> {
	try {
		// Fetch recent events
		const eventsRes = await fetch(
			`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=30`,
			{ headers: { 'User-Agent': 'nyx-portfolio' } }
		);

		if (!eventsRes.ok) return null;

		const events: GitHubEvent[] = await eventsRes.json();

		// Get push events with commits
		const pushEvents = events
			.filter((e) => e.type === 'PushEvent' && e.payload.commits?.length)
			.slice(0, 10);

		// Collect unique commits from different repos
		const seenRepos = new Set<string>();
		const commits: V2CommitItem[] = [];

		for (const event of pushEvents) {
			if (seenRepos.has(event.repo.name) || commits.length >= 4) continue;
			seenRepos.add(event.repo.name);

			const latestCommit = event.payload.commits![event.payload.commits!.length - 1];

			// Try to get commit details for additions/deletions
			let additions = 0;
			let deletions = 0;
			try {
				const detailRes = await fetch(
					`https://api.github.com/repos/${event.repo.name}/commits/${latestCommit.sha}`,
					{ headers: { 'User-Agent': 'nyx-portfolio' } }
				);
				if (detailRes.ok) {
					const detail: GitHubCommitDetail = await detailRes.json();
					additions = detail.stats?.additions || 0;
					deletions = detail.stats?.deletions || 0;
				}
			} catch {
				// Ignore, use 0s
			}

			commits.push({
				repo: event.repo.name,
				additions,
				deletions,
				commitUrl: `https://github.com/${event.repo.name}/commit/${latestCommit.sha}`,
				committedDate: event.created_at,
				oid: latestCommit.sha.substring(0, 7),
				messageHeadline: latestCommit.message.split('\n')[0].substring(0, 72),
				messageBody: ''
			});
		}

		if (commits.length === 0) return null;

		return {
			commits,
			languages: FALLBACK_RAW.languages, // Keep static languages for now
			stats: {
				totalAdditions: commits.reduce((a, c) => a + c.additions, 0),
				totalDeletions: commits.reduce((a, c) => a + c.deletions, 0),
				totalCommits: commits.length
			}
		};
	} catch {
		return null;
	}
}

/**
 * Fetches the latest commits - tries GitHub API first, falls back to static data
 */
export async function fetchLatestCommits(kv?: KVNamespace): Promise<CommitData> {
	// Try to get from cache first
	if (kv) {
		const cached = await getKV<KatibV2Response>(kv, KV_KEY);
		if (cached && !isCacheStale(cached, TTL_MS)) {
			return processResponse(cached.data);
		}
	}

	// Fetch from GitHub
	const githubData = await fetchFromGitHub();

	if (githubData) {
		// Cache the result if KV is available
		if (kv) {
			await setKV(kv, KV_KEY, githubData);
		}
		return processResponse(githubData);
	}

	// Fall back to static data
	return processResponse(FALLBACK_RAW);
}
