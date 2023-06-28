import { supabase } from "@/lib/supabase-client.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import ListItem from "@/components/ListItem.tsx";

export default function LogoutButton() {
	const logout = () => {
		supabase.auth.signOut().then(() => {
			window.location.reload();
		});
	};

	return (
		<ListItem
			icon="logout"
			button
			title="Log out"
			disabled={!IS_BROWSER}
			onClick={logout}
			divider
		/>
	);
}
