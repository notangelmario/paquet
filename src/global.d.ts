import type { SupabaseClient } from "supabase";

declare global {
	interface Window {
		supabase: SupabaseClient;
	}
}
