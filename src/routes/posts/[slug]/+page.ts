import { getAllPosts, getPostBySlug } from '$lib/content/posts';
import { createContentPage } from '$lib/utils/pagemeta';

const { load } = createContentPage({
	getAll: getAllPosts,
	getBySlug: getPostBySlug
});

export { load };
