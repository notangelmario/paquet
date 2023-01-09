import type {
	Handler as FreshHandler,
	Handlers as FreshHandlers,
} from "$fresh/server.ts";

type MiddlewareProps = {
    user?: {
        id: string;
        email: string;
        name: string;
    };
};

export type Handler = FreshHandler<unknown, MiddlewareProps>;
export type Handlers = FreshHandlers<unknown, MiddlewareProps>;
