import { Handler } from "$fresh/server.ts";
import { handleCallback } from "deno-kv-oauth";
import { createOAuthClient } from "@/lib/oauth.ts";

export const handler: Handler = async (req) => {
	const provider = new URL(req.url).searchParams.get("provider");
	// const redirectUrl = new URL(req.url).searchParams.get("redirectUrl");

	if (!provider) {
		return new Response("No provider specified", { status: 400 });
	}

	const OAuthClient = createOAuthClient(req, provider);

	if (!OAuthClient) {
		return new Response("Invalid provider", { status: 400 });
	}

	const { response } = await handleCallback(req, OAuthClient, "/home");

	return response;
};
