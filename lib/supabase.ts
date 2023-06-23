import "dotenv";
import { createClient } from "supabase";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

export const supabase = createClient(
	SUPABASE_URL,
	SUPABASE_ANON_KEY,
	{
		auth: {
			persistSession: false
		}
	}
);

export const supabaseAs = (access_token: string) => {
	return createClient(
		SUPABASE_URL,
		SUPABASE_ANON_KEY,
		{
			global: {
				headers: {
					"Authorization": `Bearer ${access_token}`,
				},
			},
		},
	);
};
