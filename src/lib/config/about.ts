export type AchievementItem =
	| string
	| {
			title: string;
			description?: string;
			href: string;
			date?: string;
	  };

export const achievements: AchievementItem[] = [
	// Professional Achievements
	'Deep Co-Founder',
	'Aexiz ',
	'Lab Assistant @ York University',
	{ title: 'Medici Grant Recipient', href: 'https://www.1517fund.com/medici-project' },
	{
		title: 'Stan Sr Full Stack Engineer',
		description: 'Senior Full Stack Engineer at Stan',
		href: 'https://stan.store',
		date: '2025'
	},
	'11x Hackathon Winner'
];
