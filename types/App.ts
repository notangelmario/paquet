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

	icon: string;
	accent_color: string;

	manifest_url: string;
	manifest_hash: string;

	features: string[] | null;

	/** @deprecated */
	verified: boolean;

	github_url: string | null;
	gitlab_url: string | null;

	approved: boolean;

	addedOn: number;
}
