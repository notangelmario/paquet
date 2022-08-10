import { supabaseService } from "@supabase";
import { Handler } from "@/types/Handler.ts";


export const handler: Handler = async (req, ctx) => {
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const appId = params.get("id");
	const { user, developer } = ctx.state;

	if (!user || !developer) {
		return new Response("Unauthorized", {
			status: 307,
			headers: {
				Location: "/login",
			},
		});
	}

	const { data: app } = await supabaseService.from("apps")
		.select("*")
		.eq("id", appId)
		.eq("owner", user.id)
		.single();

	if (!app) {
		return new Response("Unauthorized", {
			status: 307,
			headers: {
				Location: "/dashboard",
			},
		})
	}

	const { error } = await supabaseService.from("apps")
		.update({
			name: params.get("name") || undefined,
			description: params.get("description") || undefined,
			icon_small: params.get("icon_small") || undefined,
			icon_large: params.get("icon_large") || undefined,
			features: {
				mobile: params.get("features-mobile") === "on",
				desktop: params.get("features-desktop") === "on",
				offline: params.get("features-offline") === "on",
				openSource: params.get("features-openSource") === "on",
			}
		})
		.eq("id", appId)

	if (!error) {
		return new Response("OK", {
			status: 200,
		});
	}

	return new Response("Internal Server Error", {
		status: 500,
		headers: {
			Location: "/dashboard",
		},
	});
}