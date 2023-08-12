import { getCookies } from "$std/http/cookie.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getSessionId } from "deno-kv-oauth";
import { rewriteToApi } from "@/lib/api.ts";

export const handler = (req: Request, ctx: MiddlewareHandlerContext) => {
	const cookies = getCookies(req.headers);
	const sessionId = getSessionId(req);

	ctx.state.isSignedIn = !!sessionId;
	ctx.state.analyticsDisabled = cookies?.["analytics-disabled"] === "true";

	// Check if we are in api subdomain
	if (req.headers.get("host")?.startsWith("api.") && !(new URL(req.url).pathname.startsWith("/api"))) {
		console.log("Rewriting to API", req.url);
		return rewriteToApi(req);
	}

	return ctx.next();
};
