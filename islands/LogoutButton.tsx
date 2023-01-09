import Button from "@/components/Button.tsx";
import { supabase } from "@/lib/supabase-client.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function LogoutButton() {
    const logout = () => {
        supabase.auth.signOut().then(() => {
            window.location.reload();
        });
    }

    return (
        <>
            <Button
                icon="logout"
                error
                onClick={logout}
                disabled={!IS_BROWSER}
                class="m-4 mt-0 w-64"
            >
                Log out
            </Button>
        </>
    )
}
