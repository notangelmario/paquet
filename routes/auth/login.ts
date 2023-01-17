import { Handler } from "@/types/Handler.ts";
import { getPocketbase } from "@/lib/pocketbase.ts";
import { setCookie } from "$std/http/cookie.ts";


export const handler: Handler = async (req) => {
	const pocketbase = getPocketbase();
	const redirectUrl = new URL(req.url).origin + "/auth/callback";
	const params = new URL(req.url).searchParams;
	const providerName = params.get("provider") ?? "";

	const provider = await pocketbase.collection("users")
		.listAuthMethods()
		.then((providers) => providers.authProviders.filter((provider) => provider.name === providerName)[0]);
	
	if (!provider) {
		return new Response("Provider not found", { status: 404 });
	}

	const res = new Response("Redirecting...", {
		status: 307,
		headers: {
			"Location": provider.authUrl + redirectUrl,
		}
	});

	setCookie(res.headers, {
		name: "provider_name",
		value: providerName,
		path: "/",
		maxAge: 60 * 5
	})

	setCookie(res.headers, {
		name: "code_verifier",
		value: provider.codeVerifier,
		path: "/",
		maxAge: 60 * 5
	})

	return res;
}
