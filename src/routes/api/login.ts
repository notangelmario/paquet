import type { Handler } from "$fresh/server.ts";

export const handler: Handler = (): Response => {
	const url = new URL("https://github.com/login/oauth/authorize");
	url.searchParams.set("client_id", Deno.env.get("GITHUB_CLIENT_ID") || "");

	return Response.redirect(url, 302);
}