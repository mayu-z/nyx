import React, { useEffect, useRef } from 'react';

interface HeartRainProps {
	isActive: boolean;
}

interface Heart {
	x: number;
	y: number;
	speed: number;
	size: number;
	opacity: number;
}

const HeartRain: React.FC<HeartRainProps> = ({ isActive }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const heartsRef = useRef<Heart[]>([]);
	const imageRef = useRef<HTMLImageElement | null>(null);
	const animationFrameRef = useRef<number>();

	useEffect(() => {
		if (!isActive) {
			// Clear hearts when inactive
			heartsRef.current = [];
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			return;
		}

		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Set canvas size
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);

		// Load heart image
		const img = new Image();
		img.src = '/heart.png';
		imageRef.current = img;

		// Initialize hearts array
		const numColumns = Math.floor(canvas.width / 40); // Spacing similar to Matrix

		// Create initial hearts at random positions
		for (let i = 0; i < numColumns; i++) {
			heartsRef.current.push({
				x: i * (canvas.width / numColumns) + Math.random() * 20,
				y: Math.random() * -canvas.height, // Start above screen
				speed: 2 + Math.random() * 4, // Random speed
				size: 20 + Math.random() * 40, // Random size (20-60px)
				opacity: 0.6 + Math.random() * 0.4 // Random opacity (0.6-1.0)
			});
		}

		const animate = () => {
			// Semi-transparent black to create trail effect (higher opacity = shorter trails)
			ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Update and draw hearts
			heartsRef.current.forEach((heart, index) => {
				// Update position
				heart.y += heart.speed;

				// Reset heart if it goes off screen
				if (heart.y > canvas.height + heart.size) {
					heart.y = -heart.size;
					heart.x = index * (canvas.width / numColumns) + Math.random() * 20;
					heart.speed = 2 + Math.random() * 4;
					heart.size = 20 + Math.random() * 40;
					heart.opacity = 0.6 + Math.random() * 0.4;
				}

				// Draw heart
				if (imageRef.current && imageRef.current.complete) {
					ctx.globalAlpha = heart.opacity;
					ctx.drawImage(imageRef.current, heart.x, heart.y, heart.size, heart.size);
					ctx.globalAlpha = 1;
				}
			});

			animationFrameRef.current = requestAnimationFrame(animate);
		};

		// Start animation when image is loaded
		img.onload = () => {
			animate();
		};

		// Start animation immediately if image is already cached
		if (img.complete) {
			animate();
		}

		return () => {
			window.removeEventListener('resize', resizeCanvas);
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [isActive]);

	if (!isActive) return null;

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none fixed inset-0 z-50"
			style={{ mixBlendMode: 'normal' }}
		/>
	);
};

export default HeartRain;
