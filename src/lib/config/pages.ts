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
		{ href: Site.out.x, text: '', icon: IconBrandX }
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
		role: 'Co-Founder',
		url: 'https://www.c3.aexiz.com/',
		logoUrl: '/logos/c3.svg',
		logoAlt: 'C3 Logo',
		startDate: '2026-01-20',
		details:
			'Community Lead @ c3, helping cloud enthusiasts connect, learn, and grow through conducting hackathons and workshops realted to cloud computing.',
		logoScale: 1.15
	},
	{
		company: 'Aexiz',
		role: 'CTO',
		url: 'https://www.aexiz.com/',
		logoUrl: '/logos/aexiz.svg',
		logoAlt: 'Aexiz Logo',
		startDate: '2024-09-01',
		details:
			'As CTO, I led the development of Aexiz, an innovative startup revolutionizing eco-friendly Shopify fulfillment with edge based sustainable warehousing technology and seamless logistics integrations.'
	},
	{
		company: 'Deep Hackathon',
		role: 'Participant',
		url: 'https://hackcanada.org/',
		logoUrl: '/logos/hero.svg',
		logoAlt: 'Deep Logo',
		startDate: '2024-09-01',
		endDate: '2025-05-01',
		details:
			"Co-launched Deep, Hackathons Canada's premier national hackathon series. Organized the inaugural event (February 21–23, 2025), secured partnerships with Google, WarpDev, and Microsoft and more, oversaw all development, workshops, and mentorship sessions for 400+ participants.",
		logoScale: 0.85
	}
];
