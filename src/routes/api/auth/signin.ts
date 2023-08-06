import { Handler } from "$fresh/server.ts";
import { signIn } from "deno-kv-oauth";
import { createOAuthClient } from "@/lib/oauth.ts";

export const handler: Handler = async (req) => {
	const OAuthClient = createOAuthClient(req, "github");

	if (!OAuthClient) {
		return new Response("Invalid provider", { status: 400 });
	}

	return await signIn(req, OAuthClient);
};
