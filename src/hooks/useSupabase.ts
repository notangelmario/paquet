import { createClient, SupabaseClient, SupabaseClientOptions } from "supabase";

export const useSupabase = (
	supabaseUrl: string,
	supabaseKey: string,
	options?: SupabaseClientOptions,
): SupabaseClient => {
	return createClient(
		supabaseUrl,
		supabaseKey,
		{
			multiTab: false,
			detectSessionInUrl: false,
			...options,
		},
	);
};
