export interface TerminalLine {
	type: 'input' | 'output' | 'error' | 'ascii' | 'boot' | 'help' | 'image' | 'ls';
	content: string;
	command?: string; // For help type: the command name
	description?: string; // For help type: the description
	imageUrl?: string; // For image type: the image URL
	linkUrl?: string; // For image type: optional link URL
	linkText?: string; // For image type: optional link text
}

export interface Project {
	title: string;
	description: string;
	tech: string[];
	link?: string;
}

export interface Skill {
	category: string;
	items: string[];
}
