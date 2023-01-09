import { useEffect } from "preact/hooks";
import { useSupabase } from "@/hooks/useSupabase.ts";

export default function UserHandler() {
    useEffect(() => {
        (async () => {
            const supabase = await useSupabase();

            supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
                    // delete cookies on sign out
                    const expires = new Date(0).toUTCString()
                    document.cookie = `supabase-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
                    document.cookie = `supabase-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
                } else if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
                    const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
                    document.cookie = `supabase-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
                    document.cookie = `supabase-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
                }
            })
        })()
    }, []);

    return <div/>;
}
