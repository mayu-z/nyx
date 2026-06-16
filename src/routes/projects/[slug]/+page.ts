import { getAllProjects, getProjectBySlug } from '$lib/content/projects';
import { createContentPage } from '$lib/utils/pagemeta';

const { load } = createContentPage({
	getAll: getAllProjects,
	getBySlug: getProjectBySlug
});

export { load };
