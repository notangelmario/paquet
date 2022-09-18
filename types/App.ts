import { z } from "zod";

export const CategorySchema = z.object({
	id: z.string(),
	icon: z.string(),
	name: z.string(),
});

export const FeatureSchema = z.object({
	id: z.string(),
	icon: z.string(),
	name: z.string(),
})

export const AppSchema = z.object({
	id: z.string().uuid(),

	name: z.string().max(50),
	description: z.string().max(500),
	author: z.string().max(50),
	url: z.string().url(),
	categories: z.array(z.string()),

	icon_small: z.string().url(),
	icon_large: z.string().url(),

	manifest_url: z.string().url().endsWith(".webmanifest")
		.or(z.string().url().endsWith(".json")).nullable(),
	manifest_hash: z.string().regex(/^[a-f0-9]{64}$/gi),

	extra: z.object({
		features: z.array(z.string()),

		github_url: z.string().url().startsWith("https://github.com/").nullable(),
		gitlab_url: z.string().url().startsWith("https://gitlab.com/").nullable(),
	}).nullable(),

	category: z.string(),
});

export type App = z.infer<typeof AppSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Feature = z.infer<typeof FeatureSchema>;
