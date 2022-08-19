import { z } from "zod";

export const CategorySchema = z.object({
	id: z.string(),
	icon: z.string(),
	name: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
