import "dotenv";
import { createClient } from "supabase";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_KEY")!;

export const supabase = 
createClient(
	SUPABASE_URL,
	SUPABASE_ANON_KEY
);

export const supabaseService = createClient(
	SUPABASE_URL,
	SUPABASE_SERVICE_KEY
);