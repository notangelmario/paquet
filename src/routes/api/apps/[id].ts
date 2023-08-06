import { Handlers } from "$fresh/server.ts";
import { createApp, getApp, updateApp } from "@/lib/db.ts";
import { authenticate } from "@/lib/api.ts";
import { App } from "@/types/App.ts";

export const handler: Handlers = {
	async GET(_, ctx) {
		const { id } = ctx.params;

		if (!id) {
			return new Response("Missing id", {
				status: 400,
			});
		}
		
		const app = await getApp(id);

		if (!app) {
			return new Response("App not found", {
				status: 404,
			});
		}

		return new Response(JSON.stringify(app), {
			headers: {
				"content-type": "application/json",
			},
		});
	},
	async POST(req) {
		if (!authenticate(req)) {
			return new Response("Unauthorized", {
				status: 401,
			});
		}

		const body: App = await req.json();
		
		const exists = await getApp(body.id);

		if (exists) {
			return new Response("App already exists", {
				status: 409,
			});
		}

		const res = await createApp(body);

		if (!res) {
			return new Response("Could not create app", {
				status: 500,
			});
		}
		
		return new Response("App created", {
			status: 201,
		});
	},
	async PATCH(req, ctx) {
		if (!authenticate(req)) {
			return new Response("Unauthorized", {
				status: 401,
			});
		}

		const { id } = ctx.params;

		if (!id) {
			return new Response("Missing id", {
				status: 400,
			});
		}

		const app = await getApp(id);
		
		if (!app) {
			return new Response("App not found", {
				status: 404,
			});
		}

		const body: App = await req.json();
		
		const res = await updateApp(id, body);

		if (!res) {
			return new Response("Could not update app", {
				status: 500,
			});
		}

		return new Response("App updated", {
			status: 200,
		});
	}
}
