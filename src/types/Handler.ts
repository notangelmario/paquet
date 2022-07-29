import type { User } from "supabase";
import type { Handler as FreshHandler } from "$fresh/server.ts";

type MiddlewareProps = {
	accessToken?: string;
	developer?: boolean;
	user?: User;
}

export type Handler = FreshHandler<unknown, MiddlewareProps>;