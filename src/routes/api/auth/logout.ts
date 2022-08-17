import { Handler } from "$fresh/server.ts";
import { deleteCookie } from "$std/http/cookie.ts";

export const handler: Handler = () => {
	const res = new Response("OK", {
		status: 307,
		headers: {
			Location: "/",
		},
	});

	try {
		deleteCookie(res.headers, "access_token", {
			path: "/",
		});

		deleteCookie(res.headers, "refresh_token", {
			path: "/",
		});

		deleteCookie(res.headers, "expires_at", {
			path: "/",
		});

		return res;
	} catch {
		return new Response("Error", { status: 500 });
	}
};
