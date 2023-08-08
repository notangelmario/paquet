import { Certificate } from "@/types/Certificate.ts";

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

export interface App {
	id: string;

	name: string;

	author: string;
	authorLink?: string;

	url: string;
	manifestUrl: string;
	manifestHash: string;

	screenshots?: string[];
	cover?: string;

	description: string;
	categories: string[];

	icon: string;
	accentColor: string;

	features: string[];

	githubUrl?: string;
	gitlabUrl?: string;

	addedOn?: string;

	version: string | number;
	certificate?: Certificate;
}
