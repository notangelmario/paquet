import { Handler } from "@/types/Handler.ts";

export const handler: Handler = () => {
	const { SUPABASE_URL, SUPABASE_ANON_KEY } = Deno.env.toObject();

	// Create a javascript file to set envs as global variables under window.env
	const envFile = `window.env = {
        SUPABASE_URL: "${SUPABASE_URL}",
        SUPABASE_ANON_KEY: "${SUPABASE_ANON_KEY}",
    }`;

	return new Response(envFile, {
		headers: {
			"content-type": "application/javascript",
		},
	});
};
