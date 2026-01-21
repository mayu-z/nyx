import React, { useEffect, useRef } from 'react';

interface HeartRainProps {
	isActive: boolean;
	containerRef?: React.RefObject<HTMLElement>;
}

interface Heart {
	x: number;
	y: number;
	speed: number;
	size: number;
	opacity: number;
}

const HeartRain: React.FC<HeartRainProps> = ({ isActive, containerRef }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const heartsRef = useRef<Heart[]>([]);
	const imageRef = useRef<HTMLImageElement | null>(null);
	const animationFrameRef = useRef<number | undefined>(undefined);

	useEffect(() => {
		if (!isActive) {
			heartsRef.current = [];
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			return;
		}

		const canvas = canvasRef.current;
		const container = containerRef?.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const resizeCanvas = () => {
			const rect = container.getBoundingClientRect();
			canvas.width = rect.width;
			canvas.height = rect.height;
		};
		resizeCanvas();

		const resizeObserver = new ResizeObserver(resizeCanvas);
		resizeObserver.observe(container);

		const img = new Image();
		img.src = '/heart.png';
		imageRef.current = img;

		const numColumns = Math.floor(canvas.width / 40);

		for (let i = 0; i < numColumns; i++) {
			heartsRef.current.push({
				x: i * (canvas.width / numColumns) + Math.random() * 20,
				y: Math.random() * -canvas.height,
				speed: 2 + Math.random() * 4,
				size: 20 + Math.random() * 40,
				opacity: 0.6 + Math.random() * 0.4
			});
		}

		const animate = () => {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			heartsRef.current.forEach((heart, index) => {
				heart.y += heart.speed;

				if (heart.y > canvas.height + heart.size) {
					heart.y = -heart.size;
					heart.x = index * (canvas.width / numColumns) + Math.random() * 20;
					heart.speed = 2 + Math.random() * 4;
					heart.size = 20 + Math.random() * 40;
					heart.opacity = 0.6 + Math.random() * 0.4;
				}

				if (imageRef.current && imageRef.current.complete) {
					ctx.globalAlpha = heart.opacity;
					ctx.drawImage(imageRef.current, heart.x, heart.y, heart.size, heart.size);
					ctx.globalAlpha = 1;
				}
			});

			animationFrameRef.current = requestAnimationFrame(animate);
		};

		img.onload = () => {
			animate();
		};

		if (img.complete) {
			animate();
		}

		return () => {
			resizeObserver.disconnect();
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [isActive, containerRef]);

	if (!isActive) return null;

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none absolute inset-0 z-10"
			style={{ mixBlendMode: 'normal' }}
		/>
	);
};

export default HeartRain;
