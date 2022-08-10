import type { User } from "./User.ts";

export type App = {
	id: string;

	name: string;
	author: string;
	owner?: User;
	url: string;

	icon_small: string;
	icon_large: string;
	
	category: Category;

	description: string;

	features?: {
		desktop?: boolean;
		mobile?: boolean;
		offline?: boolean;
		openSource?: boolean;
	};

	lighthouse?: LighthouseScores;

	approved: boolean;
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