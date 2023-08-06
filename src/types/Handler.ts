import type {
	Handler as FreshHandler,
	Handlers as FreshHandlers,
} from "$fresh/server.ts";
import { User } from "@/types/User.ts";

export type MiddlewareProps = {
	user?: User;
	analyticsDisabled?: boolean;
};

export type Handler = FreshHandler<unknown, MiddlewareProps>;
export type Handlers = FreshHandlers<unknown, MiddlewareProps>;
