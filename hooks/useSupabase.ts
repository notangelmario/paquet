import { createClient } from "supabase-client";

export const useSupabase = async () => {
    const env = await fetch("/env.json").then((res) => res.json());

    return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
}
