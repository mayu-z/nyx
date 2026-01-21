import React, { type ReactNode } from 'react';

interface TerminalWindowProps {
	children: ReactNode;
	theme: 'dark' | 'light';
	isFullscreen?: boolean;
	onRedClose?: () => void;
	onYellowMinimize?: () => void;
	onGreenExpand?: () => void;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({
	children,
	theme,
	isFullscreen = false,
	onRedClose,
	onYellowMinimize,
	onGreenExpand
}) => {
	const isDark = theme === 'dark';

	return (
		<div
			className={`w-full ${isFullscreen ? 'h-screen' : 'max-h-[600px]'} flex h-[600px] flex-col ${isDark ? 'bg-[#181825]/80' : 'bg-white/80'} rounded-xl border backdrop-blur-xl ${isDark ? 'border-[#45475a]/50' : 'border-zinc-300/50'} animate-in fade-in zoom-in overflow-hidden shadow-2xl duration-500`}
		>
			{/* MacOS-style title bar */}
			<div
				className={`h-10 ${isDark ? 'bg-[#11111b]/50' : 'bg-zinc-100/50'} flex shrink-0 items-center border-b px-4 ${isDark ? 'border-[#45475a]/30' : 'border-zinc-300/30'} select-none`}
			>
				<div className="flex gap-2">
					<button
						onClick={onRedClose}
						className="h-3 w-3 cursor-pointer rounded-full bg-[#FF5F56] transition-colors hover:bg-[#FF5F56]/80"
						title="Close"
						aria-label="Close terminal"
					/>
					<button
						onClick={onYellowMinimize}
						className="h-3 w-3 cursor-pointer rounded-full bg-[#FFBD2E] transition-colors hover:bg-[#FFBD2E]/80"
						title="Minimize"
						aria-label="Minimize terminal"
					/>
					<button
						onClick={onGreenExpand}
						className="h-3 w-3 cursor-pointer rounded-full bg-[#27C93F] transition-colors hover:bg-[#27C93F]/80"
						title="Expand"
						aria-label="Expand terminal"
					/>
				</div>
				<div
					className={`flex-1 text-center text-xs font-medium ${isDark ? 'text-[#6c7086]' : 'text-zinc-600'} terminal-font`}
				>
					mayu — zsh — 80x24
				</div>
				<div className="w-16" />
			</div>

			{/* Content Area */}
			<div className="relative flex-1 overflow-hidden">{children}</div>
		</div>
	);
};

export default TerminalWindow;
