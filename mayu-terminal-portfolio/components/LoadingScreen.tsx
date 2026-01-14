import React, { useState, useEffect } from 'react';
import TerminalWindow from './TerminalWindow';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
	const [completedMessages, setCompletedMessages] = useState<string[]>([]);
	const [currentMessage, setCurrentMessage] = useState('');
	const [showThickCursor, setShowThickCursor] = useState(false);

	useEffect(() => {
		const bootMessages = [
			'Initializing terminal...',
			'Loading user profile...',
			'Mounting portfolio filesystem...',
			'Starting shell session...',
			'Connecting to portfolio server...',
			'Loading project database...',
			'Initializing command interface...'
		];

		let messageIndex = 0;
		let charIndex = 0;

		const typeCharacter = () => {
			if (messageIndex < bootMessages.length) {
				const message = bootMessages[messageIndex];

				if (charIndex < message.length) {
					// Type next character
					setCurrentMessage(message.substring(0, charIndex + 1));
					setShowThickCursor(false);
					charIndex++;
					setTimeout(typeCharacter, 15); // 15ms per character - faster typing
				} else {
					// Line complete - show thick cursor briefly
					setShowThickCursor(true);
					setTimeout(() => {
						// Move to next line
						setCompletedMessages((prev) => [...prev, message]);
						setCurrentMessage('');
						charIndex = 0;
						messageIndex++;
						setShowThickCursor(false);
						setTimeout(typeCharacter, 100); // Brief pause before next line
					}, 150); // Show thick cursor for 150ms
				}
			} else {
				// All messages complete - show portfolio
				setTimeout(onComplete, 300);
			}
		};

		typeCharacter();
	}, [onComplete]);

	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#1e1e2e] p-6 sm:p-12">
			<div className="absolute inset-0 -z-10">
				<div className="animate-blob absolute top-0 -left-4 h-72 w-72 rounded-full bg-[#94e2d5]/10 opacity-30 mix-blend-multiply blur-3xl filter" />
				<div className="animate-blob animation-delay-2000 absolute top-0 -right-4 h-72 w-72 rounded-full bg-[#89b4fa]/10 opacity-30 mix-blend-multiply blur-3xl filter" />
				<div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-[#cba6f7]/10 opacity-30 mix-blend-multiply blur-3xl filter" />
			</div>

			<TerminalWindow theme="dark">
				<div className="terminal-font absolute inset-0 flex flex-col justify-center overflow-y-auto p-4">
					{/* Completed messages */}
					{completedMessages.map((msg, i) => (
						<div key={i} className="mb-1 flex items-center">
							<span className="mr-3 text-[#a6e3a1]">✓</span>
							<span className="text-[#cdd6f4]">{msg}</span>
						</div>
					))}

					{/* Currently */}
					{currentMessage && (
						<div className="mb-1 flex items-center">
							<span className="mr-3 text-[#a6e3a1]">✓</span>
							<span className="text-[#cdd6f4]">{currentMessage}</span>
							<span
								className={`animate-blink ml-1 inline-block bg-[#cdd6f4] ${
									showThickCursor ? 'h-6 w-3' : 'h-5 w-1'
								}`}
								style={{ transition: 'width 0.1s ease-out, height 0.1s ease-out' }}
							></span>
						</div>
					)}
				</div>
			</TerminalWindow>
		</div>
	);
};

export default LoadingScreen;
