import type { Handler } from "$fresh/server.ts";
import { supabaseService } from "@supabase";
import { setCookie } from "$std/http/cookie.ts";
import { githubAPI } from "@/utils/github.ts";


export const handler: Handler = async (req) => {
	const url = new URL(req.url);
	const code = url.searchParams.get("code");

	if (!code) {
		return new Response("No code", { status: 400 });
	}

	// try {
		const accessToken = await githubAPI.getAccessToken(code);

		setCookie(req.headers, {
			name: "access_token",
			value: accessToken,
			maxAge: 60 * 60 * 24 * 7,
			httpOnly: true,
		})

		const userData = await githubAPI.getUserData(accessToken);

		const { data: existingUser } = await supabaseService.from("users").select("id").eq("username", userData.username).single();

		if (!existingUser) {
			supabaseService.auth.api.createUser({
				email: userData.email,
				user_metadata: {
					username: userData.username,
				}
			})
		}

		return Response.redirect(new URL(req.url).origin)
	// } catch(e) {
		// return new Response(e.message, { status: 500 })
	// }
}