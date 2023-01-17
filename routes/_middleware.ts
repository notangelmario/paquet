import { getCookies } from "$std/http/cookie.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getPocketbase, getUser } from "@/lib/pocketbase.ts";

export const handler = async (req: Request, ctx: MiddlewareHandlerContext) => {
	const pocketbase = getPocketbase();
	const cookies = getCookies(req.headers);
	const auth_cookie = cookies["pb_auth"];

	

	if (auth_cookie) {
		pocketbase.authStore.loadFromCookie(req.headers.get("Cookie") ?? "");

		try {
			// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
			pocketbase.authStore.isValid && await pocketbase.collection('users').authRefresh();
			ctx.state.user = await getUser(pocketbase);
		} catch (_) {
			pocketbase.authStore.clear();
		}
	}

	const res = await ctx.next();

	pocketbase.authStore.onChange(() => {
		res?.headers.set('set-cookie', pocketbase.authStore.exportToCookie());
	});

	return res;
};
