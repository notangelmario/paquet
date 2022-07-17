import { Handler } from "$fresh/server.ts";
import { supabaseService } from "@supabase";
import { setCookie } from "$std/http/cookie.ts";
import { githubAPI } from "@/utils/github.ts";


export const handler: Handler = async (req) =>{
	const url = new URL(req.url);
	const code = url.searchParams.get("code");

	if (!code) {
		return Response.redirect(new URL(req.url).origin);
	}

	try {
		const accessToken = await githubAPI.getAccessToken(code);

		const userData = await githubAPI.getUserData(accessToken);

		const { data: existingUser } = await supabaseService.from("users")
			.select("*").eq("id", userData.id).single();

		if (!existingUser) {
			supabaseService.from("users",)
				.insert({
					id: userData.id,
					username: userData.username,
					email: userData.email,
				})
				.single();
		}

		const res = Response.redirect(new URL(req.url).origin);

		setCookie(res.headers, {
			name: "access_token",
			value: accessToken,
			maxAge: 60 * 60 * 24 * 7,
			httpOnly: true,
			secure: false,
		});

		return res;
	} catch (e) {
		console.log(e);
		return Response.redirect(new URL(req.url).origin);
	}
};
