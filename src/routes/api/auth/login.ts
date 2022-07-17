import "dotenv";
import type { Handler } from "$fresh/server.ts";

const GITHUB_API_URL = "https://github.com/login/oauth/authorize";

export const handler: Handler = () => {
	const url = new URL(GITHUB_API_URL);
	url.searchParams.set("client_id", Deno.env.get("GITHUB_CLIENT_ID")!);

	return Response.redirect(url)
};
