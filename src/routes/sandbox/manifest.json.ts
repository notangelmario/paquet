import { Handler } from "@/types/Handler.ts";
import { WebAppManifest } from "https://esm.sh/v96/@types/web-app-manifest@1.0.2/index.d.ts";
import { getApp } from "@/lib/db.ts";
import { buildImageUrl, getImageSize } from "@/lib/image.ts";

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
				src: buildImageUrl(app.icon, 96, 96),
				type: "image/png",
				sizes: "96x96",
				purpose: "any",
			},
			{
				src: buildImageUrl(app.icon, 144, 144),
				type: "image/png",
				sizes: "144x144",
				purpose: "any",
			}
		],
		screenshots: app.screenshots ? await Promise.all(app.screenshots.map(async (screenshot) => {
			const sizes = await getImageSize(screenshot);

			if (!sizes) {
				return null;
			}

			return {
				src: screenshot,
				type: "image/png",
				sizes: `${sizes.width}x${sizes.height}`,
				form_factor: sizes.width > sizes.height ? "wide" : "narrow",
			};
		})).then((screenshots) => screenshots.filter((screenshot) => screenshot !== null)).then((screenshots) => screenshots as WebAppManifest["screenshots"]) : [],
		start_url: "/sandbox?id=" + app.id,
		scope: "/sandbox",
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
