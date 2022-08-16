import { supabaseService } from "@supabase";
import type { Handler } from "@/types/Handler.ts";
import type { App } from "@/types/App.ts";


export const handler: Handler = async (_, ctx) => {
	const { accessToken } = ctx.state;

	if (!accessToken) {
		return new Response("Unauthorized", {
			status: 307,
			headers: {
				Location: "/login"
			}
		})
	}

	const { user } = await supabaseService.auth.api.getUser(accessToken);

	if (!user) {
		return new Response("Unauthorized", {
			status: 307,
			headers: {
				Location: "/login"
			}
		})
	}

	const { error, data: app } = await supabaseService.from<App>("apps")
		.insert({
			name: "New app",
			description: "",
			url: "",
			// deno-lint-ignore no-explicit-any
			category: "utils" as any,
			// deno-lint-ignore no-explicit-any
			owner: user.id as any,
			icon_large: "",
			icon_small: "",
			features: {
				mobile: false,
				desktop: false,
				openSource: false,
				offline: false
			},
			approved: false,
			ready_to_approve: false
		})
		.single();

	if (error && !app) {
		return new Response("Internal server error", {
			status: 500
		})
	}

	return new Response("OK", {
		status: 307,
		headers: {
			Location: `/developer/edit/${app.id}`
		}
	})
}