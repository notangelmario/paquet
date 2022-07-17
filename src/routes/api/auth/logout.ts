import type { Handler } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";

export const handler: Handler = () => {
	const res = new Response(`<head><meta http-equiv="Refresh" content="0; URL=/"></head>`, {
		headers: new Headers({
			"Content-Type": "text/html",
		})
	});

	setCookie(res.headers, {
		name: "access_token",
		value: "",
		maxAge: 0,
		httpOnly: true,
		sameSite: "Strict",
		path: "/",
	});

	return res;
};
