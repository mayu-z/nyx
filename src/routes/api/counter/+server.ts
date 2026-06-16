import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Redis } from '@upstash/redis';
import { env } from '$env/dynamic/private';

const COUNTER_KEY = 'global-click-counter';

// In-memory store for development (when Redis env vars are not set)
let devCounter = 0;

function getRedis(): Redis | null {
	const url = env.UPSTASH_REDIS_REST_URL;
	const token = env.UPSTASH_REDIS_REST_TOKEN;

	if (!url || !token) return null;

	return new Redis({ url, token });
}

// GET /api/counter - Get current count
export const GET: RequestHandler = async () => {
	try {
		const redis = getRedis();

		if (!redis) {
			// Development fallback - use in-memory counter
			return json({ count: devCounter, dev: true });
		}

		const count = (await redis.get<number>(COUNTER_KEY)) ?? 0;

		return json({ count, dev: false });
	} catch (error) {
		console.error('Error getting counter:', error);
		return json({ count: devCounter, error: 'Failed to get counter', dev: true }, { status: 500 });
	}
};

// POST /api/counter - Increment counter
export const POST: RequestHandler = async () => {
	try {
		const redis = getRedis();

		if (!redis) {
			// Development fallback - increment in-memory counter
			devCounter++;
			return json({ count: devCounter, dev: true });
		}

		const newCount = await redis.incr(COUNTER_KEY);

		return json({ count: newCount, dev: false });
	} catch (error) {
		console.error('Error incrementing counter:', error);
		devCounter++;
		return json(
			{ count: devCounter, error: 'Failed to increment counter', dev: true },
			{ status: 500 }
		);
	}
};

// DELETE /api/counter - Reset counter to 0
export const DELETE: RequestHandler = async () => {
	try {
		const redis = getRedis();

		if (!redis) {
			// Development fallback - reset in-memory counter
			devCounter = 0;
			return json({ count: 0, dev: true, message: 'Counter reset to 0' });
		}

		await redis.set(COUNTER_KEY, 0);

		return json({ count: 0, dev: false, message: 'Counter reset to 0' });
	} catch (error) {
		console.error('Error resetting counter:', error);
		devCounter = 0;
		return json({ count: 0, error: 'Failed to reset counter', dev: true }, { status: 500 });
	}
};
