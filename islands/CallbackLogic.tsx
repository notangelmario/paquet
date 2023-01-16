import { useEffect } from "preact/hooks";
import { PageProps } from "$fresh/server.ts";
import { pocketbase } from "@/lib/pocketbase-client.ts";

export default function CallbackLogic(props: PageProps) {
	useEffect(() => {
		const params = new URL(props.url).searchParams;
		const code = params.get("code") ?? "";
		const state = params.get("state") ?? "";

		const provider = JSON.parse(sessionStorage.getItem("provider") ?? "{}");

		if (!provider || !code || !state) {
			return;
		}

		const redirectUrl = new URL(window.location.href).origin + "/auth/callback";

		pocketbase.collection("users")
			.authWithOAuth2(
				provider.name,
				code,
				provider.codeVerifier,
				redirectUrl
			)
			.then((user) => {
				console.log(user);
				window.location.href = "/";
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	return <div/>
}
