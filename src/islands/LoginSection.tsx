/**@jsx h */
/**@jsxFrag Fragment */
import { h, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import Button from "@/components/Button.tsx";
import { useSupabase } from "@/hooks/useSupabase.ts";
import { Session } from "supabase";

type Props = {
	supabaseUrl: string,
	supabaseKey: string,
	redirectTo: string | undefined
}

async function handleAuthChange(session: Session) {
    await fetch('/api/auth', {
      	method: 'POST',
      	headers: new Headers({ 'Content-Type': 'application/json' }),
      	credentials: 'same-origin',
		body: JSON.stringify({ session }),
	})
}

export default function LoginSection(props: Props) {
	const supabase = useSupabase(props.supabaseUrl, props.supabaseKey);

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			console.log("auth change", event, session);

			if (event === "SIGNED_IN" && session) {
				handleAuthChange(session);
			}
		});

		return () => {
			authListener?.unsubscribe();
		}
	}, [])

	const login = () => {
		supabase.auth.signIn({
			provider: "github",
		}, {
			redirectTo: props.redirectTo,
		});
	}

	return (
		<>
			<p>{JSON.stringify(supabase.auth.user())}</p>
			<Button onClick={login}>
				Login with GitHub
			</Button>
		</>
	)
}