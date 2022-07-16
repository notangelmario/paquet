import type { Handler } from "$fresh/server.ts";

export const handler: Handler = (req: Response): Response => {
	const url = new URL("https://github.com/login/oauth/authorize");
	url.searchParams.set("client_id", Deno.env.get("GITHUB_CLIENT_ID") || "");
  	// url.searchParams.set("redirect_uri", new URL(req.url).origin + "/api/callback");

	console.log(url.href)
	
	return Response.redirect(url, 302);
}