import { Handler } from "$fresh/server.ts";
import { supabaseService } from "@supabase";
import { setCookie } from "$std/http/cookie.ts";
import { githubAPI } from "@/utils/github.ts";


export const handler: Handler = async (req) =>{
	const url = new URL(req.url); // WARNING! URL is localhost for some reason.
	const code = url.searchParams.get("code");

	if (!code) {
		return Response.redirect(new URL(req.url).origin);
	}

	// try {
		const accessToken = await githubAPI.getAccessToken(code);
		const userData = await githubAPI.getUserData(accessToken);

		const { data: existingUserId } = await supabaseService
			.from("users")
			.select("id")
			.eq("id", userData.id)
			.single();

		if (!existingUserId) {
			console.log("Creating user...");

			await supabaseService
				.from("users",)
				.insert([{
					id: userData.id,
					username: userData.username,
					email: userData.email,
				}])
		}

		const res = new Response(`<head><meta http-equiv="Refresh" content="0; URL=/user"></head>`, {
			headers: new Headers({
				"Content-Type": "text/html",
			})
	 	});

		setCookie(res.headers, {
			name: "access_token",
			value: accessToken,
			maxAge: 60 * 60 * 24 * 7,
			httpOnly: true,
			sameSite: "Strict",
			path: "/",
		});

		return res;
	// } catch (e) {
		// console.log(e);
		// return Response.redirect(new URL(req.url).origin);
	// }
};
