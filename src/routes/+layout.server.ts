import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	// Mocked footer data to avoid API calls
	return {
		footerData: {
			value: '0'
		}
	};
};
