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
			className={`w-full ${isFullscreen ? 'h-screen' : 'max-h-150'} flex h-150 flex-col ${isDark ? 'bg-[#181825]/80' : 'bg-white/80'} rounded-xl border backdrop-blur-xl ${isDark ? 'border-[#45475a]/50' : 'border-zinc-300/50'} animate-in fade-in zoom-in overflow-hidden shadow-2xl duration-500`}
		>
			{/* MacOS-style title bar */}
			<div
				className={`h-10 ${isDark ? 'bg-[#11111b]/50' : 'bg-zinc-100/50'} flex shrink-0 items-center border-b px-4 ${isDark ? 'border-[#45475a]/30' : 'border-zinc-300/30'} select-none`}
			>
				<div className="flex gap-2">
					<button
						onClick={onRedClose}
						className="group flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded-full bg-[#FF5F56] text-[#4c0000] transition-colors hover:bg-[#FF5F56]/80"
						title="Close"
						aria-label="Close terminal"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 14 14"
							className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<path
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								d="M3 3l8 8M3 11l8-8"
								fill="none"
							/>
						</svg>
					</button>
					<button
						onClick={onYellowMinimize}
						className="group flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded-full bg-[#FFBD2E] text-[#855900] transition-colors hover:bg-[#FFBD2E]/80"
						title="Minimize"
						aria-label="Minimize terminal"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 14 14"
							className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<path
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								d="M3 7h8"
								fill="none"
							/>
						</svg>
					</button>
					<button
						onClick={onGreenExpand}
						className="group flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded-full bg-[#27C93F] text-[#006500] transition-colors hover:bg-[#27C93F]/80"
						title="Expand"
						aria-label="Expand terminal"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 14 14"
							className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<path
								stroke="currentColor"
								strokeWidth="1.2"
								fill="none"
								d="M1.5 5.5V1.5h4M1.5 1.5l4 4M12.5 8.5v4h-4M12.5 12.5l-4-4"
							/>
						</svg>
					</button>
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
