/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Button from "@/components/Button.tsx";
import { useSupabase } from "@/hooks/useSupabase.ts";
import { Session } from "supabase";

type Props = {
	supabaseUrl: string;
	supabaseKey: string;
	redirectTo: string | undefined;
};

async function handleSignIn(session: Session) {
	await fetch("/api/auth", {
		method: "POST",
		headers: new Headers({ "Content-Type": "application/json" }),
		credentials: "same-origin",
		body: JSON.stringify({ session }),
	});
}

export default function LoginSection(props: Props) {
	const supabase = useSupabase(props.supabaseUrl, props.supabaseKey, {
		detectSessionInUrl: true,
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_IN" && session) {
				setLoading(true);
				handleSignIn(session).finally(() => setLoading(false));
			}
		});
	}, []);

	const login = () => {
		supabase.auth.signIn({
			provider: "github",
		}, {
			redirectTo: props.redirectTo,
		});
	};

	return (
		<>
			<Button
				onClick={login}
				disabled={loading}
			>
				Login with GitHub
			</Button>
		</>
	);
}
