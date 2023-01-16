import { getCookies } from "$std/http/cookie.ts";
import { supabase } from "@/lib/supabase.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";

export const handler = async (req: Request, ctx: MiddlewareHandlerContext) => {
	const cookies = getCookies(req.headers);
	const access_token = cookies["supabase-access-token"];

	// if (access_token) {
	// 	const { data } = await supabase.auth.getUser(access_token);

	// 	if (data.user) {
	// 		ctx.state.user = {
	// 			id: data.user.id,
	// 			email: data.user.email,
	// 			name: data.user.user_metadata?.full_name,
	// 			avatar_url: data.user.user_metadata?.avatar_url,
	// 			providers: data.user.app_metadata?.providers,
	// 			access_token,
	// 		};
	// 	}
	// }

	return ctx.next();
};
