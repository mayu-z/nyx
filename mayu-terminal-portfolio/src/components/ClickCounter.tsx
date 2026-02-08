import React, { useState, useEffect } from 'react';

const ABACUS_API = 'https://abacus.jasoncameron.dev';
const NAMESPACE = 'mayu-terminal-portfolio';
const KEY = 'global-clicks';
const LOCAL_STORAGE_KEY = 'local-click-count';

export const ClickCounter: React.FC = () => {
	const [globalCount, setGlobalCount] = useState<number>(0);
	const [localCount, setLocalCount] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Load local count from localStorage on mount
	useEffect(() => {
		const savedLocalCount = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (savedLocalCount) {
			setLocalCount(parseInt(savedLocalCount, 10));
		}
	}, []);

	// Fetch initial global count on mount
	useEffect(() => {
		const fetchGlobalCount = async () => {
			try {
				const response = await fetch(`${ABACUS_API}/get/${NAMESPACE}/${KEY}`);
				if (response.ok) {
					const data = await response.json();
					setGlobalCount(data.value || 0);
				}
			} catch (err) {
				console.error('Failed to fetch global count:', err);
				setError('Failed to load global count');
			} finally {
				setIsLoading(false);
			}
		};

		fetchGlobalCount();
	}, []);

	const handleClick = async () => {
		// Increment local count
		const newLocalCount = localCount + 1;
		setLocalCount(newLocalCount);
		localStorage.setItem(LOCAL_STORAGE_KEY, newLocalCount.toString());

		// Increment global count via API
		try {
			const response = await fetch(`${ABACUS_API}/hit/${NAMESPACE}/${KEY}`);
			if (response.ok) {
				const data = await response.json();
				setGlobalCount(data.value);
			}
		} catch (err) {
			console.error('Failed to increment global count:', err);
			setError('Failed to update global count');
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-8">
			{/* Global Counter - Top */}
			<div className="flex flex-col items-center gap-2">
				<p className="text-sm font-medium tracking-wider text-[#a6adc8] uppercase">Global Clicks</p>
				<div className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-6xl font-bold text-transparent">
					{isLoading ? '...' : globalCount.toLocaleString()}
				</div>
				{error && <p className="mt-1 text-xs text-red-400">{error}</p>}
			</div>

			{/* Click Button */}
			<button
				onClick={handleClick}
				disabled={isLoading}
				className="transform rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-xl font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
			>
				Click me
			</button>

			{/* Local Counter - Bottom */}
			<div className="flex flex-col items-center gap-2">
				<p className="text-sm font-medium tracking-wider text-[#a6adc8] uppercase">Your Clicks</p>
				<p className="text-3xl font-medium text-[#cdd6f4]">
					<span className="font-bold text-purple-400">{localCount.toLocaleString()}</span>
				</p>
			</div>
		</div>
	);
};
