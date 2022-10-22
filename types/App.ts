export interface Category {
	id: string,
	icon: string,
	name: string,
}

export interface Feature {
	id: string,
	icon: string,
	name: string,
}

// We use null instead of optional because Supabase
// does not support undefined

export interface App {
	id: string,

	name: string,
	author: string,
	url: string,
	manifest_url: string,
	manifest_hash: string,

	/** @deprecated deprecated in favor of icon */
	icon_small: string,
	/** @deprecated deprecated in favor of icon */
	icon_large: string,
	icon: string,
	screenshots: string[] | null,

	description: string,
	category: string,
	verified: boolean,

	features: {
		desktop?: boolean,
		mobile?: boolean,
		offline?: boolean,
		openSource?: boolean,
	} | null,

	github_url: string | null,
	gitlab_url: string | null,

	approved: boolean,
}
