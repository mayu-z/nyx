import React, { useState } from 'react';
import TerminalWindow from './components/TerminalWindow';
import Terminal from './components/Terminal';
import LoadingScreen from './components/LoadingScreen';
import { ClickCounter } from './src/components/ClickCounter';

const App: React.FC = () => {
	const [theme, setTheme] = useState<'dark' | 'light'>('dark');
	const [isLoading, setIsLoading] = useState(true);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
	};

	const handleLoadingComplete = () => {
		setIsLoading(false);
	};

	const handleHeartRainToggle = (active: boolean) => {
		// This function is no longer needed since HeartRain is handled within Terminal
		// But we keep it for compatibility with Terminal component
	};

	const isDark = theme === 'dark';

	// Show loading screen first
	if (isLoading) {
		return <LoadingScreen onComplete={handleLoadingComplete} />;
	}

	return (
		<div
			className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden p-6 sm:p-12 ${isDark ? 'bg-[#1e1e2e]' : 'bg-zinc-50'}`}
		>
			{/* Background with subtle animated gradients */}
			<div className="absolute inset-0 -z-10">
				<div
					className={`absolute top-0 -left-4 h-72 w-72 ${isDark ? 'bg-[#94e2d5]/10' : 'bg-emerald-500/20'} animate-blob rounded-full opacity-30 mix-blend-multiply blur-3xl filter`}
				/>
				<div
					className={`absolute top-0 -right-4 h-72 w-72 ${isDark ? 'bg-[#89b4fa]/10' : 'bg-sky-500/20'} animate-blob animation-delay-2000 rounded-full opacity-30 mix-blend-multiply blur-3xl filter`}
				/>
				<div
					className={`absolute -bottom-8 left-20 h-72 w-72 ${isDark ? 'bg-[#cba6f7]/10' : 'bg-purple-500/20'} animate-blob animation-delay-4000 rounded-full opacity-30 mix-blend-multiply blur-3xl filter`}
				/>

				{/* Subtle grid pattern */}
				<div
					className={`absolute inset-0 ${isDark ? "bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" : ''} pointer-events-none opacity-20`}
				/>
				<div
					className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.05]'}`}
					style={{
						backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`,
						backgroundSize: '40px 40px'
					}}
				/>
			</div>

			{/* Click Counter */}
			<ClickCounter />
		</div>
	);
};

export default App;
