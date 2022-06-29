import "dotenv";
import { createClient } from "supabase";

export const supabase = createClient(
	Deno.env.get("SUPABASE_URL") || "",
	Deno.env.get("SUPABASE_ANON_KEY") || "",
)