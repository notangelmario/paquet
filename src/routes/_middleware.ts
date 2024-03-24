import { getCookies } from "$std/http/cookie.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";

export const handler = (req: Request, ctx: MiddlewareHandlerContext) => {
	const cookies = getCookies(req.headers);
	ctx.state.analyticsDisabled = cookies?.["analytics-disabled"] === "true";

	return ctx.next();
};
