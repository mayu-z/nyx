/*
 * Copyright (c) 2025. Jason Cameron
 * All Rights Reserved
 */

import type { Load, ServerLoad, Config } from '@sveltejs/kit';

interface ContentService<T> {
	getAll: () => T[];
	getBySlug: (slug: string) => unknown;
}

interface ContentEntry {
	slug: string;
}

type EntryGenerator = Config['entries'];

export function createContentPage<T extends ContentEntry>({
	getAll,
	getBySlug
}: ContentService<T>) {
	const prerender = true;
	const entries: EntryGenerator = () => getAll().map((p) => ({ slug: p.slug }));
	const load: Load = ({ params }) =>
		getBySlug((params as { slug: string }).slug) as Record<string, any>;
	return { prerender, entries, load };
}

export function createListingPage<T>(getAll: () => T[], key: string) {
	const load: ServerLoad = () => ({
		[key]: getAll()
	});
	return { load };
}
