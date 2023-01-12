import { IS_BROWSER } from "$fresh/runtime.ts";
import Button from "@/components/Button.tsx";
import { supabase } from "@/lib/supabase-client.ts";
import { Provider } from "https://esm.sh/v102/@supabase/gotrue-js@2.6.1/dist/module/lib/types";

export default function LoginButtons() {
	const login = (provider: Provider) => {
		supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: window.location.origin,
			},
		});
	};

	return (
		<>
			<Button
				icon="google"
				outlined
				fullWidth
				onClick={() => login("google")}
				disabled={!IS_BROWSER}
			>
				Login with Google
			</Button>
			<Button
				icon="github"
				outlined
				fullWidth
				onClick={() => login("github")}
				disabled={!IS_BROWSER}
			>
				Login with GitHub
			</Button>
			<Button
				icon="gitlab"
				outlined
				fullWidth
				onClick={() => login("gitlab")}
				disabled={!IS_BROWSER}
			>
				Login with GitLab
			</Button>
		</>
	);
}
