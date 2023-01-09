import Button from "@/components/Button.tsx";
import { useSupabase } from "@/hooks/useSupabase.ts";

export default function LoginButtons() {
    const loginWithGitHub = async () => {
        const supabase = await useSupabase();

        supabase.auth.signInWithOAuth({
            provider: "github"
        })
    }

    return (
        <>
            <Button
                icon="github"
                outlined
                fullWidth
                onClick={loginWithGitHub}
            >
                Login with GitHub
            </Button>
        </>
    )
}
