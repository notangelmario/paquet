import { MiddlewareHandlerContext } from "$fresh/server.ts";

export const handler = (_: Request, ctx: MiddlewareHandlerContext) => {
	return ctx.next();
};
