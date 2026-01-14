import {
	type Icon,
	IconBrandCodepen,
	IconBrandGithub,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandX
} from '@tabler/icons-svelte';
import { dev } from '$app/environment';
import Wakatime from '$lib/icons/Wakatime.svelte';

interface Site {
	name: string;
	url: string;
	description: string;
	tags: string[];
	seo: {
		author: string;
		birthDate: string;
		worksFor: {
			name: string;
			url: string;
		};
		location: {
			city: string;
			region: string;
			country: string;
		};
	};
	abacus: { instance: string; namespace: string; key: string };
	out: {
		github: string;
		linkedin: string;
		calcom: string;
		wakatime: string;
		codepen: string;
		instagram: string;
		x: string;
	};
	repo: { url: string; commitBaseUrl: string };
}

const Site: Site = {
	name: 'Mayu Singh',
	url: dev ? 'http://localhost:5173' : 'https://mayusingh.dev',
	description:
		'Mayu Singh - Senior Software Engineer in Toronto, Canada. I like occasionally building cool shit',
	tags: [
		'Mayu Singh',
		'Senior Software Engineer',
		'Toronto Software Developer',
		'Canada',
		'Golang Developer',
		'Python Developer',
		'DevOps Engineer',
		'Software Engineering',
		'Backend Developer',
		'Full Stack Developer',
		'Hackathon Developer',
		'Toronto Tech',
		'Canadian Developer',
		'Web Development',
		'Cloud Computing',
		'API Development',
		'Software Architecture'
	],
	seo: {
		author: 'Mayu Singh',
		birthDate: '2004-02-12',
		worksFor: {
			name: 'Stan',
			url: 'https://stan.store'
		},
		location: {
			city: 'Toronto',
			region: 'Ontario',
			country: 'Canada'
		}
	},
	abacus: {
		instance: 'https://abacus.jasoncameron.dev',
		namespace: 'jasoncameron',
		key: 'portfolio'
	},
	out: {
		github: 'https://github.com/mayu-z',
		linkedin: 'https://www.linkedin.com/in/mayu-esh/',
		calcom: 'https://cal.com/mayuresh-singh/secret',
		wakatime: 'https://wakatime.com/@jasonlovesdoggo',
		codepen: 'https://codepen.io/take-',
		instagram: 'https://www.instagram.com/inyorskin/',
		x: 'https://x.com/Mayday_lives'
	},
	repo: {
		url: 'https://github.com/mayu-z/nyx',
		commitBaseUrl: 'https://github.com/mayu-z/nyx/commit/'
	}
};

export default Site;

export const Socials = [
	{
		url: Site.out.github,
		label: 'GitHub',
		icon: IconBrandGithub,
		footer: true
	},
	{
		url: Site.out.linkedin,
		label: 'LinkedIn',
		icon: IconBrandLinkedin,
		footer: true
	},
	{
		url: Site.out.x,
		label: 'X',
		icon: IconBrandX,
		footer: true
	},
	{
		url: Site.out.codepen,
		label: 'CodePen',
		icon: IconBrandCodepen,
		footer: false
	},
	{
		url: Site.out.instagram,
		label: 'Instagram',
		icon: IconBrandInstagram,
		footer: true
	},
	{
		url: Site.out.wakatime,
		label: 'WakaTime',
		icon: Wakatime as unknown as Icon,
		footer: false
	}
];
