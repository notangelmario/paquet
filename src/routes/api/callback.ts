import type { Handler } from "$fresh/server.ts";
import { setCookies } from "$std/http/cookie";
import { githubAPI } from "@/utils/github.ts";


export const handler: Handler = async (req: Request): Promise<Response> => {
	const url = new URL(req.url);
	const code = url.searchParams.get("code");

	if (!code) {
		return new Response("No code", { status: 400 });
	}

	try {
		const accessToken = await githubAPI.getAccessToken(code);

		setCookie

		return Response.redirect(new URL(req.url).origin)
	} catch(e) {
		return new Response(e.message, { status: 500 })
	}
}