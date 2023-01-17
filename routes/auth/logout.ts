import { deleteCookie } from "$std/http/cookie.ts"
import { Handler } from "@/types/Handler.ts";


export const handler: Handler = () => {
	const res = new Response(null, {
		status: 307,
		headers: {
			"location": "/",
		}
	});

	deleteCookie(res.headers, "pb_auth", { path: "/" });

	return res;
}
