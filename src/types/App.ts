export interface Category {
	id: string;
	icon: string;
	name: string;
	aliases?: string[];
}

export interface Feature {
	id: string;
	name: string;
	icon: string;
}

export interface AppSpec {
	id: string;
	url: string;
	manifestUrl?: string;
	categories?: string[];
	features: ["openSource" | "auth" | "mobile" | "desktop" | "offline"];
	author?: string;
	authorUrl?: string;
	githubUrl?: string;
	gitlabUrl?: string;
	accentColor?: string;
	allowSandbox?: boolean;
}

export interface App {
	id: string;

	name: string;

	author: string;
	authorUrl?: string;

	description?: string;
	categories: string[];

	url: string;
	manifestUrl: string;
	manifestHash: string;

	icon: string;
	screenshots?: string[];
	cover?: string;

	accentColor: string;

	features: ["openSource" | "auth" | "mobile" | "desktop" | "offline"];

	githubUrl?: string;
	gitlabUrl?: string;

	allowSandbox?: boolean;
}
