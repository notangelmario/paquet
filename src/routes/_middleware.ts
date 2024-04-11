import { getCookies } from "$std/http/cookie.ts";
import { FreshContext } from "$fresh/server.ts";

export const handler = (req: Request, ctx: FreshContext) => {
	const cookies = getCookies(req.headers);
	ctx.state.analyticsDisabled = cookies?.["analytics-disabled"] === "true";

	return ctx.next();
};
