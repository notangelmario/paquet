import { createClient, SupabaseClient } from "supabase";

export const useSupabase = (
	supabaseUrl: string,
	supabaseKey: string,
): SupabaseClient => {
	return createClient(
		supabaseUrl,
		supabaseKey,
		{
			multiTab: false
		}
	);
};
