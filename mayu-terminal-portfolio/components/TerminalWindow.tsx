import React, { ReactNode } from 'react';

interface TerminalWindowProps {
	children: ReactNode;
	theme: 'dark' | 'light';
	isFullscreen: boolean;
	onClose: () => void;
	onMinimize: () => void;
	onToggleFullscreen: () => void;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({
	children,
	theme,
	isFullscreen,
	onClose,
	onMinimize,
	onToggleFullscreen
}) => {
	const isDark = theme === 'dark';

	return (
		<>
			<div
				className={`flex flex-col ${isDark ? 'bg-[#181825]' : 'bg-white'} border ${isDark ? 'border-[#45475a]/50' : 'border-zinc-300/50'} overflow-hidden shadow-2xl transition-all duration-200 ease-in-out ${
					isFullscreen
						? 'fixed inset-0 z-[9999] h-screen w-screen max-w-none rounded-none'
						: 'animate-in fade-in zoom-in-95 relative h-[600px] w-full max-w-4xl rounded-xl duration-200'
				}`}
			>
				{/* MacOS Titlebar */}
				<div
					className={`h-10 ${isDark ? 'bg-[#11111b]' : 'bg-zinc-100'} flex shrink-0 items-center border-b px-4 ${isDark ? 'border-[#45475a]/30' : 'border-zinc-300/30'} select-none`}
				>
					<div className="flex gap-2">
						{/* Red Button - Close */}
						<button
							className="h-3 w-3 cursor-pointer rounded-full bg-[#FF5F56] transition-all duration-150 hover:bg-[#FF5F56]/90 hover:shadow-md active:bg-[#FF5F56]"
							title="Close"
							onClick={onClose}
							aria-label="Close terminal"
						/>
						{/* Yellow Button - Minimize */}
						<button
							className="h-3 w-3 cursor-pointer rounded-full bg-[#FFBD2E] transition-all duration-150 hover:bg-[#FFBD2E]/90 hover:shadow-md active:bg-[#FFBD2E]"
							title="Minimize"
							onClick={onMinimize}
							aria-label="Minimize terminal"
						/>
						{/* Green Button - Fullscreen */}
						<button
							className="h-3 w-3 cursor-pointer rounded-full bg-[#27C93F] transition-all duration-150 hover:bg-[#27C93F]/90 hover:shadow-md active:bg-[#27C93F]"
							title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
							onClick={onToggleFullscreen}
							aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
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

			<style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes fadeInZoom {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-in {
            animation: fadeInZoom 0.2s ease-out forwards;
          }
          .zoom-in-95 {
            animation: fadeInZoom 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .fade-in {
            animation: fadeIn 0.15s ease-out forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        }
      `}</style>
		</>
	);
};

export default TerminalWindow;
