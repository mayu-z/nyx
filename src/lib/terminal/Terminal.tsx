import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { TerminalLine } from './types';
import {
	PREFIX,
	MAYU_ASCII,
	HELP_COMMANDS,
	PROJECTS,
	SKILLS,
	PROGRAMMING_QUOTES
} from './constants';
import HeartRain from './HeartRain';

interface TerminalProps {
	theme: 'dark' | 'light';
	onThemeToggle: () => void;
	onHeartRainToggle: (active: boolean) => void;
}

const Terminal: React.FC<TerminalProps> = ({ theme, onThemeToggle, onHeartRainToggle }) => {
	const [history, setHistory] = useState<TerminalLine[]>([
		{ type: 'ascii', content: MAYU_ASCII },
		{ type: 'output', content: '> Terminalized portfolio' },
		{ type: 'output', content: '> Backend Development • DevOps • Gopher' },
		{ type: 'output', content: `> Type 'help' for all commands.` }
	]);
	const [inputValue, setInputValue] = useState('');
	const [matrixMode, setMatrixMode] = useState(false);
	const [heartRainMode, setHeartRainMode] = useState(false);
	const [suggestedCommands, setSuggestedCommands] = useState<string[]>([]);
	const [commandHistory, setCommandHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const scrollRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const matrixCanvasRef = useRef<HTMLCanvasElement>(null);
	const terminalContainerRef = useRef<HTMLDivElement>(null);

	const handleInputChange = (value: string) => {
		setInputValue(value);

		const commandInput = value.trim().toLowerCase();
		if (commandInput) {
			const matches = HELP_COMMANDS.map((h) => h.cmd).filter((cmd) => cmd.startsWith(commandInput));
			setSuggestedCommands(matches);
		} else {
			setSuggestedCommands([]);
		}
	};

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [history]);

	const handleTerminalClick = () => {
		inputRef.current?.focus();
	};

	useEffect(() => {
		onHeartRainToggle(heartRainMode);
	}, [heartRainMode, onHeartRainToggle]);

	useEffect(() => {
		if (!matrixMode || !matrixCanvasRef.current) return;

		const canvas = matrixCanvasRef.current;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
		const fontSize = 14;
		const columns = canvas.width / fontSize;
		const drops: number[] = [];

		for (let i = 0; i < columns; i++) {
			drops[i] = Math.random() * -100;
		}

		const draw = () => {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = '#0F0';
			ctx.font = `${fontSize}px monospace`;

			for (let i = 0; i < drops.length; i++) {
				const text = chars[Math.floor(Math.random() * chars.length)];
				ctx.fillText(text, i * fontSize, drops[i] * fontSize);

				if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}
				drops[i]++;
			}
		};

		const interval = setInterval(draw, 33);
		return () => clearInterval(interval);
	}, [matrixMode]);

	const processCommand = (input: string) => {
		const trimmedInput = input.trim();
		if (!trimmedInput) return;

		setHistory((prev) => [...prev, { type: 'input', content: trimmedInput }]);

		setCommandHistory((prev) => [...prev, trimmedInput]);
		setHistoryIndex(-1);

		const cmd = trimmedInput.toLowerCase();

		switch (cmd) {
			case 'banner':
				setHistory((prev) => [
					...prev,
					{ type: 'ascii', content: MAYU_ASCII },
					{ type: 'output', content: 'Welcome to Mayu Portfolio Terminal.' },
					{ type: 'output', content: `Type '${PREFIX} help' to see available commands.` }
				]);
				break;

			case 'help':
				setHistory((prev) => [
					...prev,
					{ type: 'output', content: 'Available Commands:' },
					...HELP_COMMANDS.map((h) => ({
						type: 'help' as const,
						content: '',
						command: h.cmd,
						description: h.desc
					}))
				]);
				break;

			case 'start':
				setHistory((prev) => [
					...prev,
					{ type: 'ascii', content: MAYU_ASCII },
					{ type: 'output', content: 'Initialization complete. Welcome, user.' },
					{
						type: 'output',
						content: 'I am Mayu, a creative developer pushing the boundaries of the web.'
					}
				]);
				break;

			case 'about':
				setHistory((prev) => [
					...prev,
					{
						type: 'output',
						content:
							"Hello! I'm Mayu, a Senior Full Stack Engineer with a passion for building immersive digital experiences."
					},
					{
						type: 'output',
						content:
							'I specialize in React, high-performance distributed systems, and modern UI/UX design.'
					},
					{
						type: 'output',
						content: 'Based in Tokyo, I spend my time exploring the intersection of art and code.'
					}
				]);
				break;

			case 'projects':
				setHistory((prev) => [
					...prev,
					{ type: 'output', content: '--- RECENT WORKS ---' },
					...PROJECTS.map((p) => ({
						type: 'project' as const,
						content: p.description,
						title: p.title,
						tech: p.tech
					}))
				]);
				break;

			case 'skills':
				setHistory((prev) => [
					...prev,
					{ type: 'output', content: '--- TECHNICAL ARSENAL ---' },
					...SKILLS.map((s) => ({
						type: 'output' as const,
						content: `${s.category}: ${s.items.join(', ')}`
					}))
				]);
				break;

			case 'contact':
				setHistory((prev) => [
					...prev,
					{ type: 'output', content: "Let's connect! Here's where you can find me:" },
					{ type: 'output', content: '' },
					{ type: 'output', content: 'GitHub: github.com/mayu-z' },
					{ type: 'output', content: 'LinkedIn: linkedin.com/in/mayu-esh' },
					{ type: 'output', content: 'Email: mayuresh2k4@gmail.com' },
					{ type: 'output', content: 'Location: India' }
				]);
				break;

			case 'ls':
				const commands = HELP_COMMANDS.map((h) => h.cmd);
				const commandsPerRow = 3;
				const rows: string[] = [];

				for (let i = 0; i < commands.length; i += commandsPerRow) {
					const rowCommands = commands.slice(i, i + commandsPerRow);
					const formattedRow = rowCommands.map((cmd) => `• ${cmd.padEnd(15)}`).join('');
					rows.push(formattedRow);
				}

				setHistory((prev) => [
					...prev,
					{ type: 'output', content: 'Available commands:' },
					...rows.map((row) => ({ type: 'ls' as const, content: row }))
				]);
				break;

			case 'pwd':
				setHistory((prev) => [...prev, { type: 'output', content: '/home/mayu/portfolio' }]);
				break;

			case 'date':
				const now = new Date();
				const dateStr = now.toLocaleString('en-US', {
					weekday: 'short',
					year: 'numeric',
					month: 'short',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					timeZoneName: 'short'
				});
				setHistory((prev) => [...prev, { type: 'output', content: dateStr }]);
				break;

			case 'whoami':
				setHistory((prev) => [...prev, { type: 'output', content: 'Mayu' }]);
				break;

			case 'resume':
				setHistory((prev) => [
					...prev,
					{ type: 'output', content: 'Resume download will be available soon!' },
					{ type: 'output', content: 'Check back later or contact me directly for my resume.' }
				]);
				break;

			case 'theme':
				onThemeToggle();
				setHistory((prev) => [
					...prev,
					{
						type: 'output',
						content: `Theme switched to ${theme === 'dark' ? 'light' : 'dark'} mode.`
					}
				]);
				break;

			case 'matrix':
				if (matrixMode) {
					setMatrixMode(false);
					setHistory((prev) => [
						...prev,
						{ type: 'output', content: 'Matrix effect disabled. Welcome back to reality.' }
					]);
				} else {
					setMatrixMode(true);
					setHistory((prev) => [
						...prev,
						{
							type: 'output',
							content: 'Entering the Matrix... Press ESC or type "myr matrix" again to exit.'
						}
					]);
				}
				break;

			case 'annie':
				if (heartRainMode) {
					setHeartRainMode(false);
					setHistory((prev) => [
						...prev,
						{ type: 'output', content: '💔 Heart rain stopped. Missing you already...' }
					]);
				} else {
					setHeartRainMode(true);
					setHistory((prev) => [
						...prev,
						{
							type: 'output',
							content: '💖 Raining hearts for Annie... Type "annie" again to stop.'
						}
					]);
				}
				break;

			case 'fortune':
				const randomQuote =
					PROGRAMMING_QUOTES[Math.floor(Math.random() * PROGRAMMING_QUOTES.length)];
				setHistory((prev) => [...prev, { type: 'output', content: randomQuote }]);
				break;

			case 'demo':
				setHistory((prev) => [
					...prev,
					{ type: 'output', content: 'Starting interactive demo...' }
				]);

				setTimeout(() => {
					setHistory((prev) => [...prev, { type: 'ascii', content: MAYU_ASCII }]);
				}, 500);

				setTimeout(() => {
					setHistory((prev) => [
						...prev,
						{ type: 'output', content: '> Showcasing portfolio features...' }
					]);
				}, 1500);

				setTimeout(() => {
					setHistory((prev) => [
						...prev,
						{ type: 'output', content: '> Try commands like: projects, skills, contact, fortune' }
					]);
				}, 2500);

				setTimeout(() => {
					setHistory((prev) => [
						...prev,
						{ type: 'output', content: '> Demo complete! Type "help" for all commands.' }
					]);
				}, 3500);
				break;

			case 'nvim':
				setHistory((prev) => [
					...prev,
					{
						type: 'image',
						content: 'Visit my Nvim config',
						imageUrl: '/nvim-config.png',
						linkUrl: 'https://github.com/mayu-z/nvim-config',
						linkText: 'here'
					}
				]);
				break;

			case 'clear':
				setHistory([]);
				break;

			default:
				setHistory((prev) => [
					...prev,
					{
						type: 'error',
						content: `Unknown command: '${cmd}'. Type 'help' for available options.`
					}
				]);
				break;
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		processCommand(inputValue);
		setInputValue('');
		setSuggestedCommands([]);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Tab' && suggestedCommands.length === 1) {
			e.preventDefault();
			setInputValue(suggestedCommands[0]);
			setSuggestedCommands([]);
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (commandHistory.length === 0) return;

			const newIndex =
				historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);

			setHistoryIndex(newIndex);
			setInputValue(commandHistory[newIndex]);
			setSuggestedCommands([]);
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (commandHistory.length === 0 || historyIndex === -1) return;

			const newIndex = historyIndex + 1;

			if (newIndex >= commandHistory.length) {
				setHistoryIndex(-1);
				setInputValue('');
			} else {
				setHistoryIndex(newIndex);
				setInputValue(commandHistory[newIndex]);
			}
			setSuggestedCommands([]);
		}
	};

	return (
		<div
			ref={terminalContainerRef}
			className="custom-scrollbar terminal-font absolute inset-0 cursor-text overflow-y-auto p-4"
			onClick={handleTerminalClick}
		>
			<div ref={scrollRef} className="h-full overflow-y-auto">
				<div className="mb-4 space-y-2">
					{history.map((line, i) => (
						<div key={i} className="wrap-break-word whitespace-pre-wrap">
							{line.type === 'input' && (
								<span className="flex">
									<span className="text-[#94e2d5]">mayu</span>
									<span className={`${theme === 'dark' ? 'text-[#cdd6f4]' : 'text-zinc-900'}`}>
										@
									</span>
									<span className="text-[#cba6f7]">portfolio</span>
									<span className={`${theme === 'dark' ? 'text-[#cdd6f4]' : 'text-zinc-900'}`}>
										:
									</span>
									<span className="text-[#89dceb]">~</span>
									<span className={`${theme === 'dark' ? 'text-[#cdd6f4]' : 'text-zinc-900'}`}>
										${' '}
									</span>
									<span
										className={`${theme === 'dark' ? 'text-[#cdd6f4]' : 'text-zinc-900'} font-medium`}
									>
										{line.content}
									</span>
								</span>
							)}
							{line.type === 'output' && (
								<div
									className={`${
										line.content === 'Available Commands:'
											? 'text-[#94e2d5]'
											: theme === 'dark'
												? 'text-[#bac2de]'
												: 'text-zinc-700'
									} ml-6`}
								>
									{line.content}
								</div>
							)}
							{line.type === 'help' && (
								<div className="ml-6 flex">
									<span className="text-[#f9e2af]">{line.command?.padEnd(12)}</span>
									<span className={`${theme === 'dark' ? 'text-[#cdd6f4]' : 'text-zinc-900'}`}>
										{' '}
										- {line.description}
									</span>
								</div>
							)}
							{line.type === 'error' && (
								<div className="ml-6 text-[#f38ba8]">Error: {line.content}</div>
							)}
							{line.type === 'ascii' && (
								<pre className="animate-pulse-slow leading-tight font-bold text-[#89b4fa]">
									{line.content}
								</pre>
							)}
							{line.type === 'image' && (
								<div className="my-4 ml-6">
									<img
										src={line.imageUrl}
										alt="Neovim Configuration"
										className="h-auto max-w-full rounded-lg border border-emerald-400/30 shadow-lg"
										style={{ maxHeight: '400px', objectFit: 'contain' }}
									/>
									<div className={`mt-2 ${theme === 'dark' ? 'text-[#bac2de]' : 'text-zinc-700'}`}>
										{line.content}{' '}
										{line.linkUrl && line.linkText && (
											<a
												href={line.linkUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="text-[#94e2d5] underline transition-colors hover:text-[#a6e3a1]"
											>
												{line.linkText}
											</a>
										)}
									</div>
								</div>
							)}
							{line.type === 'ls' && <div className="ml-6 text-[#a6e3a1]">{line.content}</div>}
							{line.type === 'project' && (
								<div className="mb-3 ml-6">
									<div className="font-semibold text-[#a6e3a1]">&gt; {line.title}</div>
									<div className={`${theme === 'dark' ? 'text-[#bac2de]' : 'text-zinc-700'} ml-2`}>
										{line.content}
									</div>
									<div
										className={`${theme === 'dark' ? 'text-[#94e2d5]' : 'text-zinc-600'} ml-2 text-sm`}
									>
										Tech: {line.tech?.join(', ')}
									</div>
								</div>
							)}
						</div>
					))}
				</div>

				<form onSubmit={handleSubmit} className="flex items-center">
					<span className="text-[#94e2d5]">mayu</span>
					<span className={`${theme === 'dark' ? 'text-[#cdd6f4]' : 'text-zinc-900'}`}>@</span>
					<span className="text-[#cba6f7]">portfolio</span>
					<span className={`${theme === 'dark' ? 'text-[#cdd6f4]' : 'text-zinc-900'}`}>:</span>
					<span className="text-[#89dceb]">~</span>
					<span className={`${theme === 'dark' ? 'text-[#cdd6f4]' : 'text-zinc-900'}`}>$ </span>
					<input
						ref={inputRef}
						type="text"
						value={inputValue}
						onChange={(e) => handleInputChange(e.target.value)}
						onKeyDown={handleKeyDown}
						className={`flex-1 border-none bg-transparent outline-none ${theme === 'dark' ? 'text-[#cdd6f4]' : 'text-zinc-900'} caret-[#94e2d5]`}
						autoFocus
						autoComplete="off"
						spellCheck="false"
					/>
				</form>

				{suggestedCommands.length > 0 && (
					<div className="mt-2 text-xs text-zinc-500">
						Suggested commands: {suggestedCommands.join(', ')}
					</div>
				)}
			</div>

			{heartRainMode && (
				<HeartRain
					isActive={heartRainMode}
					containerRef={terminalContainerRef as React.RefObject<HTMLElement>}
				/>
			)}

			{matrixMode && (
				<canvas
					ref={matrixCanvasRef}
					className="pointer-events-none fixed inset-0 z-50"
					style={{ mixBlendMode: 'screen' }}
				/>
			)}
		</div>
	);
};

export default Terminal;
