import { IS_BROWSER } from "$fresh/runtime.ts";
import Button from "@/components/Button.tsx";
import { Provider } from "https://esm.sh/v102/@supabase/gotrue-js@2.6.1/dist/module/lib/types";

export default function LoginButtons() {
	const login = (provider: Provider) => {
		console.log("login", provider);
	};

	return (
		<>
			<Button
				icon="google"
				fullWidth
				onClick={() => login("google")}
				disabled={!IS_BROWSER}
			>
				Login with Google
			</Button>
			<Button
				icon="github"
				fullWidth
				onClick={() => login("github")}
				disabled={!IS_BROWSER}
			>
				Login with GitHub
			</Button>
			<Button
				icon="gitlab"
				fullWidth
				onClick={() => login("gitlab")}
				disabled={!IS_BROWSER}
			>
				Login with GitLab
			</Button>
		</>
	);
}
