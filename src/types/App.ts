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
	id: z.string(),

	name: z.string().min(1).max(50),
	author: z.string().min(1).max(50),
	url: z.string().url(),

	iconSmall: z.string().url(),
	iconLarge: z.string().url(),

	description: z.string().min(1).max(500),
	category: z.string(),

	features: z.array(z.string()),

	githubUrl: z.string().url().startsWith("https://github.com/").optional(),
	gitlabUrl: z.string().url().startsWith("https://gitlab.com/").optional(),
});

export type App = z.infer<typeof AppSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Feature = z.infer<typeof FeatureSchema>;