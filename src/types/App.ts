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
	features: string[];
	author?: string;
	authorUrl?: string;
	githubUrl?: string;
	gitlabUrl?: string;
	accentColor?: string;
	allowSandboxInstall?: boolean;
}


export interface App {
	id: string;

	name: string;

	author: string;
	authorUrl?: string;

	url: string;
	manifestUrl: string;
	manifestHash: string;

	screenshots?: string[];
	cover?: string;

	description?: string;
	categories: string[];

	icon: string;
	accentColor: string;

	features: string[];

	githubUrl?: string;
	gitlabUrl?: string;
}
