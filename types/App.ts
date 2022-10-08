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

	name: z.string().min(1).max(50),
	author: z.string().min(1).max(50),
	url: z.string().url(),
	manifest_url: z.string().url().endsWith(".webmanifest")
		.or(z.string().url().endsWith(".json")).nullable(),
	manifest_hash: z.string(),


	icon_small: z.string().url(),
	icon_large: z.string().url(),

	description: z.string().min(1).max(500),
	category: z.string(),

	features: z.object({
		desktop: z.boolean().default(false).optional(),
		mobile: z.boolean().default(false).optional(),
		offline: z.boolean().default(false).optional(),
		openSource: z.boolean().default(false).optional(),
	}).nullable(),

	github_url: z.string().url().startsWith("https://github.com/").nullable(),
	gitlab_url: z.string().url().startsWith("https://gitlab.com/").nullable(),

	approved: z.boolean().default(false)
});

export type App = z.infer<typeof AppSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Feature = z.infer<typeof FeatureSchema>;
