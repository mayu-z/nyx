import { Project, Skill } from './types';

export const PREFIX = 'myr';

export const MAYU_ASCII = `
███╗   ███╗ █████╗ ██╗   ██╗██╗   ██╗
████╗ ████║██╔══██╗╚██╗ ██╔╝██║   ██║
██╔████╔██║███████║ ╚████╔╝ ██║   ██║
██║╚██╔╝██║██╔══██║  ╚██╔╝  ██║   ██║
██║ ╚═╝ ██║██║  ██║   ██║   ╚██████╔╝
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ 
                                     
`;

export const PROJECTS: Project[] = [
	{
		title: 'Project Alpha',
		description: 'An AI-powered dashboard for predictive analytics.',
		tech: ['React', 'TypeScript', 'Gemini API', 'D3.js'],
		link: 'https://github.com'
	},
	{
		title: 'Neon Nexus',
		description: 'A high-performance real-time chat application with E2E encryption.',
		tech: ['Node.js', 'WebSockets', 'Redis', 'Tailwind'],
		link: 'https://github.com'
	},
	{
		title: 'EcoTrack',
		description: 'Mobile-first web app for tracking carbon footprints.',
		tech: ['React Native', 'Firebase', 'Google Maps API'],
		link: 'https://github.com'
	}
];

export const SKILLS: Skill[] = [
	{
		category: 'Languages',
		items: ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go']
	},
	{
		category: 'Frontend',
		items: ['React', 'Next.js', 'Tailwind CSS', 'Three.js', 'Framer Motion']
	},
	{
		category: 'Backend',
		items: ['Node.js', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Docker']
	}
];

export const HELP_COMMANDS = [
	{ cmd: 'banner', desc: 'Show the ASCII art banner and welcome message' },
	{ cmd: 'help', desc: 'Show this help menu' },
	{ cmd: 'start', desc: 'Initialize session and show identity' },
	{ cmd: 'about', desc: 'Learn more about me and my goals' },
	{ cmd: 'projects', desc: 'View my portfolio projects' },
	{ cmd: 'skills', desc: 'See my technical skills and technologies' },
	{ cmd: 'contact', desc: 'Get my contact information' },
	{ cmd: 'ls', desc: 'List available commands' },
	{ cmd: 'pwd', desc: 'Show current directory' },
	{ cmd: 'date', desc: 'Show current date/time' },
	{ cmd: 'whoami', desc: 'Show current user' },
	{ cmd: 'resume', desc: 'Download my resume' },
	{ cmd: 'theme', desc: 'Switch between light/dark themes' },
	{ cmd: 'matrix', desc: 'Matrix effect (easter egg)' },
	{ cmd: 'fortune', desc: 'Get a random programming quote' },
	{ cmd: 'demo', desc: 'Run interactive demo' },
	{ cmd: 'nvim', desc: 'View my Neovim configuration' },
	{ cmd: 'clear', desc: 'Clear the terminal screen' }
];

export const PROGRAMMING_QUOTES = [
	'"Talk is cheap. Show me the code." - Linus Torvalds',
	'"Programs must be written for people to read, and only incidentally for machines to execute." - Harold Abelson',
	'"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
	'"First, solve the problem. Then, write the code." - John Johnson',
	'"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
	'"Simplicity is the soul of efficiency." - Austin Freeman',
	'"Make it work, make it right, make it fast." - Kent Beck',
	'"Clean code always looks like it was written by someone who cares." - Robert C. Martin',
	'"The best error message is the one that never shows up." - Thomas Fuchs',
	'"Debugging is twice as hard as writing the code in the first place." - Brian Kernighan',
	'"It\'s not a bug – it\'s an undocumented feature." - Anonymous',
	'"The most disastrous thing that you can ever learn is your first programming language." - Alan Kay',
	'"Walking on water and developing software from a specification are easy if both are frozen." - Edward V. Berard',
	'"Before software can be reusable it first has to be usable." - Ralph Johnson',
	'"The function of good software is to make the complex appear to be simple." - Grady Booch'
];
