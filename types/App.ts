export interface Category {
	id: string;
	icon: string;
	name: string;
}

export interface Feature {
	id: string;
	icon: string;
	name: string;
}

// We use null instead of optional because Supabase
// does not support undefined

export interface App {
	id: string;

	name: string;
	author: string;
	url: string;
	screenshots: string[] | null;

	description: string;
	category: string;

	/** @deprecated deprecated in favor of icon */
	icon_small: string;
	/** @deprecated deprecated in favor of icon */
	icon_large: string;
	icon: string;

	manifest_url: string;
	manifest_hash: string;

	features: {
		desktop?: boolean;
		mobile?: boolean;
		offline?: boolean;
		openSource?: boolean;
	} | null;

	verified: boolean;

	github_url: string | null;
	gitlab_url: string | null;

	approved: boolean;
}
