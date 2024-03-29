import { Handler } from "@/types/Handler.ts";
import { WebAppManifest } from "https://esm.sh/v96/@types/web-app-manifest@1.0.2/index.d.ts";
import { getApp } from "@/lib/db.ts";

export const handler: Handler = async (_, ctx) => {
	const id = ctx.url.searchParams.get("id");
	const app = await getApp(id || "");

	if (!id || !app) {
		return new Response(null, { 
			status: 302,
			headers: {
				Location: "/home"
			}
		});
	}

	const manifest: WebAppManifest = {
		name: app.name,
		short_name: app.name,
		categories: app.categories,
		description: app.description,
		icons: [
			{
				src: app.icon,
				type: "image/png"
			}
		],
		start_url: "/wrapped?id=" + app.id,
		scope: "/wrapped",
		theme_color: app.accentColor,
		background_color: app.accentColor,
		display: "standalone",
	}

	return new Response(JSON.stringify(manifest), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};