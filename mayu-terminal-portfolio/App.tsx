import React, { useState, useEffect } from 'react';
import TerminalWindow from './components/TerminalWindow';
import Terminal from './components/Terminal';
import LoadingScreen from './components/LoadingScreen';
import HeartRain from './components/HeartRain';

const App: React.FC = () => {
	const [theme, setTheme] = useState<'dark' | 'light'>('dark');
	const [isLoading, setIsLoading] = useState(true);
	const [heartRainActive, setHeartRainActive] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isTerminalVisible, setIsTerminalVisible] = useState(true);

	// Listen for parent window messages to show/hide terminal
	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.data?.type === 'SHOW_TERMINAL') {
				setIsTerminalVisible(true);
			} else if (event.data?.type === 'HIDE_TERMINAL') {
				setIsTerminalVisible(false);
			}
		};

		window.addEventListener('message', handleMessage);
		return () => window.removeEventListener('message', handleMessage);
	}, []);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
	};

	const handleLoadingComplete = () => {
		setIsLoading(false);
	};

	const handleHeartRainToggle = (active: boolean) => {
		setHeartRainActive(active);
	};

	const handleClose = () => {
		console.log('Close button clicked, sending message...');
		try {
			window.parent.postMessage({ type: 'CLOSE_TERMINAL' }, '*');
		} catch (e) {
			console.error('Error sending close message:', e);
		}
	};

	const handleMinimize = () => {
		console.log('Minimize button clicked, sending message...');
		try {
			window.parent.postMessage({ type: 'MINIMIZE_TERMINAL' }, '*');
		} catch (e) {
			console.error('Error sending minimize message:', e);
		}
	};

	const handleToggleFullscreen = () => {
		setIsFullscreen((prev) => !prev);
	};

	const isDark = theme === 'dark';

	// Show loading screen first
	if (isLoading) {
		return <LoadingScreen onComplete={handleLoadingComplete} />;
	}

	// If terminal is not visible, show transparent background
	if (!isTerminalVisible) {
		return (
			<div
				className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-transparent`}
			>
				<style>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          .animate-pulse-slow {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .7; }
          }
          @keyframes blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s infinite;
          }
        `}</style>
			</div>
		);
	}

	return (
		<div
			className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden ${isDark ? 'bg-[#1e1e2e]' : 'bg-zinc-50'} ${isFullscreen ? 'p-0' : 'p-6 sm:p-12'}`}
		>
			{/* Background with subtle animated gradients */}
			{!isFullscreen && (
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
						className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.05]'}`}
						style={{
							backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`,
							backgroundSize: '40px 40px'
						}}
					/>
				</div>
			)}

			{/* Main Terminal UI */}
			<div
				className={`${isFullscreen ? 'fixed inset-0 z-[9999]' : 'relative'} flex h-full w-full items-center justify-center`}
			>
				<TerminalWindow
					theme={theme}
					isFullscreen={isFullscreen}
					onClose={handleClose}
					onMinimize={handleMinimize}
					onToggleFullscreen={handleToggleFullscreen}
				>
					<Terminal
						theme={theme}
						onThemeToggle={toggleTheme}
						onHeartRainToggle={handleHeartRainToggle}
					/>
				</TerminalWindow>
			</div>

			{/* Heart Rain Effect */}
			<HeartRain isActive={heartRainActive} />

			<style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .7; }
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
		</div>
	);
};

export default App;
