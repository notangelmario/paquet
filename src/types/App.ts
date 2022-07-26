export type App = {
	id: string;

	name: string;
	author: string;
	url: string;
	iconLarge: string;
	iconSmall: string;
	/**@deprecated Use iconLarge and iconSmall instead. To be removed */
	iconUrl?: string;

	/**@deprecated Use category instead. To be removed */
	categoryId: string;

	category: Category;

	description: string;

	features?: {
		desktop?: boolean;
		mobile?: boolean;
		offline?: boolean;
		openSource?: boolean;
	};

	lighthouse?: LighthouseScores;

	/** @deprecated To be removed*/
	appStoreLink?: string;
	/** @deprecated To be removed*/
	playStoreLink?: string;
};

export type LighthouseScores = {
	performance: number;
	accessibility: number;
	bestPractices: number;
	seo: number;
	updatedAt: number;
};

export type Category = {
	id: string;
	name: string;
	icon: string;
};
