import type { Handler } from "$fresh/server.ts";

export const handler: Handler = (): Response => {
	const url = new URL("https://github.com/login/oauth/authorize");
	url.searchParams.set("client_id", Deno.env.get("GITHUB_CLIENT_ID") || "");
  	url.searchParams.set("redirect_uri", "http://127.0.0.1/path");
	
	return Response.redirect(url.href, 302);
}