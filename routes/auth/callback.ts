import { Handler } from "@/types/Handler.ts";
import { getCookies, deleteCookie, setCookie } from "$std/http/cookie.ts";
import { getPocketbase } from "@/lib/pocketbase.ts";


export const handler: Handler = async (req) => {
	const pocketbase = getPocketbase();
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

	const result = await pocketbase.collection("users")
		.authWithOAuth2(
			providerName,
			code,
			codeVerifier,
			redirectUrl,
		).catch((err) => {
			console.error(err);
			return null;
		});
	
	if (!result) {
		const res = new Response("Error", {
			status: 500,
		});

		deleteCookie(res.headers, "provider_name", { path: "/" });
		deleteCookie(res.headers, "code_verifier", { path: "/" });

		return res;
	}

	if (result.meta) {
		await pocketbase.collection("users")
			.update(result.record.id, {
				name: result.meta.name,
				avatar_url: result.meta.avatarUrl,
			});
	}

	const res = new Response("Redirecting...", {
		status: 307,
		headers: {
			"Location": "/",
		},
	})

	deleteCookie(res.headers, "provider_name", { path: "/" });
	deleteCookie(res.headers, "code_verifier", { path: "/" });

	const cookie = pocketbase.authStore.exportToCookie({ httpOnly: false })

	// Parse cookie
	const cookieValue = cookie.split(";")[0].replace("pb_auth=", "");

	setCookie(res.headers, {
		name: "pb_auth",
		value: cookieValue,
		path: "/",
		secure: true
	});

	return res;
}
