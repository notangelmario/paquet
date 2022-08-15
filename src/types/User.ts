import { z } from "zod";

export const UserSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1),
	avatar_url: z.string().url()
})

export type User = z.infer<typeof UserSchema>;