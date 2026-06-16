/*
 * Copyright (c) 2025. Jason Cameron
 * All Rights Reserved
 */
import Site from '$lib/config/common';
import createRedirects from '$utils/redirects';

const redirects = createRedirects([
	{ paths: ['/github', '/gh'], url: Site.out.github },
	{ paths: ['/linkedin', '/li'], url: Site.out.linkedin },
	{ paths: '/bluesky', url: Site.out.bluesky },
	{ paths: ['/insta', '/ig'], url: Site.out.instagram },
	{ paths: ['/cal', '/chat'], url: Site.out.calcom },
	{ paths: '/repo', url: Site.repo.url }
]);

export default redirects;
