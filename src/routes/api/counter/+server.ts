import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const COUNTER_KEY = 'global-click-counter';

// In-memory store for development (when KV is not available)
let devCounter = 0;

// GET /api/counter - Get current count
export const GET: RequestHandler = async ({ platform }) => {
	try {
		const kv = platform?.env?.NYXCACHE;

		if (!kv) {
			// Development fallback - use in-memory counter
			return json({ count: devCounter, dev: true });
		}

		const countStr = await kv.get(COUNTER_KEY);
		const count = countStr ? parseInt(countStr, 10) : 0;

		return json({ count, dev: false });
	} catch (error) {
		console.error('Error getting counter:', error);
		return json({ count: devCounter, error: 'Failed to get counter', dev: true }, { status: 500 });
	}
};

// POST /api/counter - Increment counter
export const POST: RequestHandler = async ({ platform }) => {
	try {
		const kv = platform?.env?.NYXCACHE;

		if (!kv) {
			// Development fallback - increment in-memory counter
			devCounter++;
			return json({ count: devCounter, dev: true });
		}

		// Get current count
		const countStr = await kv.get(COUNTER_KEY);
		const currentCount = countStr ? parseInt(countStr, 10) : 0;

		// Increment
		const newCount = currentCount + 1;

		// Store back
		await kv.put(COUNTER_KEY, newCount.toString());

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
export const DELETE: RequestHandler = async ({ platform }) => {
	try {
		const kv = platform?.env?.NYXCACHE;

		if (!kv) {
			// Development fallback - reset in-memory counter
			devCounter = 0;
			return json({ count: 0, dev: true, message: 'Counter reset to 0' });
		}

		// Reset to 0 in KV
		await kv.put(COUNTER_KEY, '0');

		return json({ count: 0, dev: false, message: 'Counter reset to 0' });
	} catch (error) {
		console.error('Error resetting counter:', error);
		devCounter = 0;
		return json({ count: 0, error: 'Failed to reset counter', dev: true }, { status: 500 });
	}
};
