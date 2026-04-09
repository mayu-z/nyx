import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-svelte';
import Site from '$lib/config/common';

export const Home = {
	socialLinks: [
		{
			href: Site.out.github,
			text: 'GitHub',
			icon: IconBrandGithub
		},
		{
			href: Site.out.linkedin,
			text: 'LinkedIn',
			icon: IconBrandLinkedin
		},
		{ href: Site.out.x, text: 'Twitter', icon: IconBrandX }
	]
};

export interface ExperienceTimelineItem {
	company: string;
	role: string;
	url: string;
	logoUrl: string;
	logoAlt: string;
	startDate: string;
	endDate?: string; // optional endDate. If present, it's a past role.
	details?: string; // Optional details for expansion
	logoScale?: number; // Optional logo scale multiplier
}

export const experienceTimeline: ExperienceTimelineItem[] = [
	{
		company: 'C3',
		role: 'Community Lead',
		url: 'https://c3.aexiz.com',
		logoUrl: '/logos/c3.svg',
		logoAlt: 'C3 Logo',
		startDate: '2026-01-20',
		details:
			'Community Lead @ c3, helping cloud enthusiasts connect, learn, and grow through conducting hackathons and workshops realted to cloud computing.',
		logoScale: 1.15
	},
	{
		company: 'Aexiz',
		role: 'DevOps Engineer',
		url: 'https://www.aexiz.com/',
		logoUrl: '/logos/aexiz.svg',
		logoAlt: 'Aexiz Logo',
		startDate: '2024-09-01',
		details:
			'Working across multiple Aexiz Solutions projects as a DevOps engineer, focused on CI/CD pipelines, health checks, infrastructure as code, version control, and orchestration.'
	},
	{
		company: 'Deep Hackathon',
		role: 'Participant',
		url: 'https://hackcanada.org/',
		logoUrl: '/logos/hero.svg',
		logoAlt: 'Deep Logo',
		startDate: '2025-01-01',
		endDate: '2025-01-02',
		details:
			'Participated in a 24-hour Deep Hackathon in 2025 and built Aletheia, which is listed in the projects section.',
		logoScale: 0.85
	},
	{
		company: 'Rift Hackathon',
		role: 'Participant',
		url: 'https://github.com/Antxnrx/zeus',
		logoUrl: '/logos/rift.png',
		logoAlt: 'Rift Logo',
		startDate: '2026-01-01',
		endDate: '2026-01-02',
		details:
			'Participated in Rift Hackathon (2026) and built Zeus: a CI/CD pipeline health-check and improvement system that runs tests and reports pipeline reliability.',
		logoScale: 0.85
	}
];
