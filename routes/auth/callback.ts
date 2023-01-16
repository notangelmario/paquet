import { Handler } from "@/types/Handler.ts";
import { getCookies } from "$std/http/cookie.ts";
import { pocketbase } from "@/lib/pocketbase.ts";


export const handler: Handler = (req) => {
	const params = new URL(req.url).searchParams;
	const code = params.get("code") ?? "";
	const state = params.get("state") ?? "";

	const cookies = getCookies(req.headers);
	const providerName = cookies["provider_name"] ?? "";
	const codeVerifier = cookies["code_verifier"] ?? "";


	if (!providerName || !code || !state || !codeVerifier) {
		return new Response("Invalid request", {
			status: 400,
		});
	}

	const redirectUrl = new URL(req.url).origin + "/auth/callback";

	pocketbase.collection("users")
		.authWithOAuth2(
			providerName,
			code,
			codeVerifier,
			redirectUrl
		)
		.then((user) => {
			console.log(user);
		})
		.catch((e) => {
			console.log(e);
		});

	return new Response("Redirecting...", {
		status: 307,
		headers: {
			"Location": "/",
		},
	})
}
