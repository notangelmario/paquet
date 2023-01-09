import { useEffect } from "preact/hooks";
import { createClient } from "supabase-client";

export default function UserHandler() {
    useEffect(() => {
        (async () => {
            const creds = await fetch("/env.json").then((res) => res.json());
            
            const supabase = createClient(creds.SUPABASE_URL, creds.SUPABASE_ANON_KEY);

            supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
                    // delete cookies on sign out
                    const expires = new Date(0).toUTCString()
                    document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
                    document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
                } else if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
                    const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
                    document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
                    document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
                }
            })
        })()
    }, []);

    return <div/>;
}
