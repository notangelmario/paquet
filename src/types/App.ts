export interface Category {
	id: string;
	icon: string;
	name: string;
	aliases?: string[];
}

export interface Feature {
	id: string;
	icon: string;
	name: string;
}

// Properties in plural are arrays but are stored 
// as strings in the database.
export interface App {
	id: string;

	name: string;

	author: string;

	url: string;
	screenshots: string | null;
	cover: string | null;

	description: string;
	categories: string;

	icon: string;
	accent_color: string;

	manifest_url: string;
	manifest_hash: string;

	features: string | null;

	github_url: string | null;
	gitlab_url: string | null;

	approved: boolean;

	added_on: number;
}
