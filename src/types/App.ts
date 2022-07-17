export type App = {
	id: string;

	name: string;
	author: string;
	url: string;
	iconLarge: string;
	iconSmall: string;
	/**@deprecated This is no longer used */
	iconUrl?: string;
	categoryId: string;
	description: string;

	// Not fully implemented yet
	lighthouse?: {
		performance: number;
		accessibility: number;
		bestPractice: number;
		seo: number;
		updatedAt: number;
	};

	// DEPRECATED. To be removed
	appStoreLink?: string;
	playStoreLink?: string;
};
