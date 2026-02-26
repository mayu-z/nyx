/*
 * Copyright (c) 2025. Jason Cameron
 * All Rights Reserved
 */

import { getAllTutorials, getTutorialBySlug } from '$lib/content/tutorials';
import { createContentPage } from '$lib/utils/pagemeta';

const { load } = createContentPage({
	getAll: getAllTutorials,
	getBySlug: getTutorialBySlug
});

export { load };
