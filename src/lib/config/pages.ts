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
		role: 'Finalist',
		url: 'https://hackcanada.org/',
		logoUrl: '/logos/hero.svg',
		logoAlt: 'Deep Logo',
		startDate: '2025-01-01',
		endDate: '2025-01-02',
		details:
			'Finalist at the 24-hour Deep Hackathon (2025). Built Aletheia — a multi-agent AI fact-checking system using LangGraph, FastAPI, and Aptos for on-chain verification.',
		logoScale: 0.85
	},
	{
		company: 'Rift Hackathon',
		role: 'Finalist',
		url: 'https://github.com/Antxnrx/zeus',
		logoUrl: '/logos/rift.png',
		logoAlt: 'Rift Logo',
		startDate: '2026-01-01',
		endDate: '2026-01-02',
		details:
			'Finalist at RIFT 2026. Built Zeus — an autonomous CI/CD healing agent that detects failing tests, generates fixes with LLM analysis, and auto-commits them via FastAPI + Redis.',
		logoScale: 0.85
	}
];
