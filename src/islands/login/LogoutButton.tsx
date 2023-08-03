import { IS_BROWSER } from "$fresh/runtime.ts";
import ListItem from "@/components/ListItem.tsx";

export default function LogoutButton() {
	const logout = () => {
		console.log("logout");
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
