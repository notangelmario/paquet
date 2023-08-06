import { getCookies, setCookie } from "$std/http/cookie.ts";
import { Handlers } from "@/types/Handler.ts";

export const handler: Handlers = {
	GET(req) {
		const cookieToGet = new URL(req.url).searchParams.get("name");

		if (cookieToGet) {
			const cookies = getCookies(req.headers);
			const cookie = cookies?.[cookieToGet];
			if (cookie) {
				return new Response(cookie);
			}
		}

		return new Response("No cookie to get", { status: 404 });
	},
	async POST(req) {
		const cookieToSet = await req.json();

		if (cookieToSet) {
			const res = new Response("OK");
			setCookie(res.headers, {
				name: cookieToSet.name,
				value: cookieToSet.value,
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
				path: "/",
				httpOnly: true,
				secure: true,
			});
			return res;
		}

		return new Response("No cookie to set", { status: 404 });
	},
	async PUT(req) {
		const cookieToUpdate = await req.json();

		if (cookieToUpdate) {
			const res = new Response("OK");
			setCookie(res.headers, {
				name: cookieToUpdate.name,
				value: cookieToUpdate.value,
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
				path: "/",
				httpOnly: true,
				secure: true,
				sameSite: "Strict",
			});
			return res;
		}

		return new Response("No cookie to update", { status: 404 });
	},
};
