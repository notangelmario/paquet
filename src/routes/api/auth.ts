import { Handlers } from "$fresh/server.ts";
import { deleteCookie, getCookies, setCookie } from "$std/http/cookie.ts";
import { Session } from "supabase";

export const handler: Handlers = {
	POST: async (req) => {
		const res = new Response();

		const { session }: { session: Session } = await req.json();

		if (!session.access_token) {
			return new Response("Missing access_token", { status: 400 });
		}

		setCookie(res.headers, {
			name: "access_token",
			value: session.access_token,
			maxAge: 60 * 60,
			httpOnly: true,
			sameSite: "Strict",
			path: "/",
		});

		return res;
	},
	GET: async (req) => {
		const cookies = await getCookies(req.headers);

		return Response.json({ cookies });
	},
	DELETE: () => {
		const res = new Response();

		deleteCookie(res.headers, "access_token");

		return res;
	},
};
