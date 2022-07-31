import type { User } from "supabase";
import type { Handler as FreshHandler, Handlers as FreshHandlers } from "$fresh/server.ts";

type MiddlewareProps = {
	accessToken?: string;
	developer?: boolean;
	user?: User;
}

export type Handler = FreshHandler<unknown, MiddlewareProps>;
export type Handlers = FreshHandlers<unknown, MiddlewareProps>;