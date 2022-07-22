/**@jsx h */
/**@jsxFrag Fragment */
import { h, Fragment } from "preact";
import Button from "@/components/Button.tsx";
import { useSupabase } from "@/hooks/useSupabase.ts";


type Props = {
	supabaseUrl: string,
	supabaseKey: string,
}

export default function LoginSection(props: Props) {
	const supabase = useSupabase(props.supabaseUrl, props.supabaseKey);

	const login = async () => {
		console.log(globalThis.location.origin + "/login")

		supabase.auth.signIn({
			provider: "github"
		}, {
			redirectTo: globalThis.location.origin + "/login"
		});
	}

	return (
		<>
			<Button onClick={login}>
				Login with GitHub
			</Button>
		</>
	)
}