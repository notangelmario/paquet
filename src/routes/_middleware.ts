import { getCookies } from "$std/http/cookie.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getSessionId } from "deno-kv-oauth";
import { rewriteToApi } from "@/lib/api.ts";

export const handler = (req: Request, ctx: MiddlewareHandlerContext) => {
	const cookies = getCookies(req.headers);
	const sessionId = getSessionId(req);

	ctx.state.isSignedIn = !!sessionId;
	ctx.state.analyticsDisabled = cookies?.["analytics-disabled"] === "true";

	return ctx.next();
};
