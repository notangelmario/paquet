import type { SupabaseClient } from "supabase";

declare global {
	interface Window {
		installPrompt: any;
		supabase: SupabaseClient;
	}
}