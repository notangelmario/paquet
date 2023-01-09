import { Handler } from "@/types/Handler.ts";


export const handler: Handler = () => {
    return Response.json({
        SUPABASE_URL: Deno.env.get("SUPABASE_URL"),
        SUPABASE_ANON_KEY: Deno.env.get("SUPABASE_ANON_KEY"),
    });
};
