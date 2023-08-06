import type {
	Handler as FreshHandler,
	Handlers as FreshHandlers,
	RouteContext as FreshRouteContext,
} from "$fresh/server.ts";

export type MiddlewareProps = {
	isSignedIn?: boolean;
	analyticsDisabled?: boolean;
};

export type Handler = FreshHandler<unknown, MiddlewareProps>;
export type Handlers = FreshHandlers<unknown, MiddlewareProps>;
export type RouteContext = FreshRouteContext<unknown, MiddlewareProps>;
