import React, { useState } from 'react';
import TerminalWindow from './TerminalWindow';
import Terminal from './Terminal';

interface TerminalContainerProps {
	onClose?: () => void;
	onMinimize?: () => void;
	onExpand?: () => void;
	isFullscreen?: boolean;
}

const TerminalContainer: React.FC<TerminalContainerProps> = ({
	onClose,
	onMinimize,
	onExpand,
	isFullscreen = false
}) => {
	const [theme, setTheme] = useState<'dark' | 'light'>('dark');

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
	};

	const handleHeartRainToggle = (active: boolean) => {
		// Handle heart rain toggle if needed
	};

	const isDark = theme === 'dark';

	return (
		<div
			className={`relative flex h-full w-full items-center justify-center p-0 ${isDark ? 'bg-[#1e1e2e]' : 'bg-zinc-50'} overflow-hidden`}
		>
			{/* Background with subtle animated gradients */}
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div
					className={`absolute top-0 -left-4 h-72 w-72 ${isDark ? 'bg-[#94e2d5]/10' : 'bg-emerald-500/20'} animate-blob rounded-full opacity-30 mix-blend-multiply blur-3xl filter`}
				/>
				<div
					className={`absolute top-0 -right-4 h-72 w-72 ${isDark ? 'bg-[#89b4fa]/10' : 'bg-sky-500/20'} animate-blob animation-delay-2000 rounded-full opacity-30 mix-blend-multiply blur-3xl filter`}
				/>
				<div
					className={`absolute -bottom-8 left-20 h-72 w-72 ${isDark ? 'bg-[#cba6f7]/10' : 'bg-purple-500/20'} animate-blob animation-delay-4000 rounded-full opacity-30 mix-blend-multiply blur-3xl filter`}
				/>
			</div>

			{/* Main Terminal UI */}
			<TerminalWindow
				theme={theme}
				isFullscreen={isFullscreen}
				onRedClose={onClose}
				onYellowMinimize={onMinimize}
				onGreenExpand={onExpand}
			>
				<Terminal
					theme={theme}
					onThemeToggle={toggleTheme}
					onHeartRainToggle={handleHeartRainToggle}
				/>
			</TerminalWindow>
		</div>
	);
};

export default TerminalContainer;
