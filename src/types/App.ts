import { z } from "zod";
import { UserSchema } from "./User.ts";


export const CategorySchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	icon: z.string()
})

export const AppSchema = z.object({
	id: z.string().uuid(),

	name: z.string().min(1).max(50),
	author: z.string().min(1).max(50).optional(),
	owner: UserSchema.optional(),
	url: z.string().url(),

	icon_small: z.string().url(),
	icon_large: z.string().url(),

	description: z.string().min(1).max(500),
	category: CategorySchema,
	
	features: z.object({
		desktop: z.boolean().default(false).optional(),
		mobile: z.boolean().default(false).optional(),
		offline: z.boolean().default(false).optional(),
		openSource: z.boolean().default(false).optional(),
	}).optional(),

	approved: z.boolean().default(false),
});

export type App = z.infer<typeof AppSchema>;
export type Category = z.infer<typeof CategorySchema>;