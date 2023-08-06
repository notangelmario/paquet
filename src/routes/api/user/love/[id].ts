import { Handlers } from "@/types/Handler.ts";
import { loveApp, unloveApp } from "@/lib/db.ts";

export const handler: Handlers = {
	async POST(req, ctx) {
		if (!ctx.state.isSignedIn) {
			return new Response("Unauthorized", { status: 401 });
		}

		const { id } = ctx.params;

		if (!id) {
			return new Response("No id specified", { status: 400 });
		}

		const res = await loveApp(req, id);

		if (!res) {
			return new Response("Something went wrong", { status: 500 });
		}

		return new Response("OK", { status: 200 });
	},
	async DELETE(req, ctx) {
		if (!ctx.state.isSignedIn) {
			return new Response("Unauthorized", { status: 401 });
		}

		const { id } = ctx.params;

		if (!id) {
			return new Response("No id specified", { status: 400 });
		}

		const res = await unloveApp(req, id);

		if (!res) {
			return new Response("Something went wrong", { status: 500 });
		}

		return new Response("OK", { status: 200 });
	},
};
