import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import { supabaseService } from "@supabase";


export const handler = async (req: Request, ctx: MiddlewareHandlerContext) => {
	const cookies = await getCookies(req.headers);

	const res = await ctx.next();


	if (["expires_at", "refresh_token"].every((key) => cookies[key])) {
		const accessTokenExpired = new Date().getTime() > parseInt(cookies["expires_at"]);

		if (accessTokenExpired) {
			const { data } = await supabaseService.auth.api.refreshAccessToken(cookies["refresh_token"]);

			if (data?.access_token && data?.refresh_token && data?.expires_at) {
				setCookie(res.headers, {
					name: "access_token",
					value: data.access_token,
					maxAge: 365 * 24 * 60 * 60,
					httpOnly: true,
					sameSite: "Strict",
					path: "/",
				})
			
				setCookie(res.headers, {
					name: "refresh_token",
					value: data.refresh_token,
					maxAge: 365 * 24 * 60 * 60,
					httpOnly: true,
					sameSite: "Strict",
					path: "/",
				})
				
				setCookie(res.headers, {
					name: "expires_at",
					value: data.expires_at.toString(),
					maxAge: 365 * 24 * 60 * 60,
					httpOnly: true,
					sameSite: "Strict",
					path: "/",
				})
			}
		}
	}

	return res;
}