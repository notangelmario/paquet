import type { User } from "./User.ts";

export type App = {
	id: string;

	name: string;
	author: string;
	owner?: User;
	url: string;

	/**@deprecated Use icon_large instead. To be removed */
	iconLarge: string;
	/**@deprecated Use icon_small instead. To be removed */
	iconSmall: string;
	
	icon_small: string;
	icon_large: string;
	
	/**@deprecated Use iconLarge and iconSmall instead. To be removed */
	iconUrl?: string;

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
	updated_at: number;
};

export type Category = {
	id: string;
	name: string;
	icon: string;
};