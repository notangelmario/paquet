/**@jsx h */
import { h } from "preact";
import { useSupabase } from "@/hooks/useSupabase.ts";
import Button, { Props as ButtonProps } from "@/components/Button.tsx";

export type Props = {
	supabaseUrl: string;
	supabaseKey: string;
}

async function handleLogout() {
	await fetch("/api/auth", {
		method: "DELETE",
		headers: new Headers({ "Content-Type": "application/json" }),
		credentials: "same-origin",
	});
}

export default function LogoutButton(props: Props & ButtonProps) {
	const supabase = useSupabase(props.supabaseUrl, props.supabaseKey);

	const logout = async () => {
		await Promise.all([
			supabase.auth.signOut(),
			handleLogout()
		]);

		globalThis.location.reload();
	}

	return (
		<Button
			{...props}
			onClick={logout}
		>
			Logout
		</Button>
	)
}