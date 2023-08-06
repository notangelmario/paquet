import manifest from "@/fresh.gen.ts";
import type { Handlers } from "@/types/Handler.ts";
import { SitemapContext } from "fresh_seo";
import { getApps } from "@/lib/db.ts";

const excludedRoutes = [
	"/gfm.css",
	"/app/error",
	"/api/cookie",
	"/api/image-proxy",
	"/env.js",
];

export const handler: Handlers = {
	async GET() {
		const sitemap = new SitemapContext("https://paquet.app", manifest);
		const docs = Deno.readDir("docs");

		const allApps = await getApps(100);

		if (!allApps) {
			return sitemap.render();
		}

		// Add app routes
		allApps.forEach((app) => {
			sitemap.add(`/app/${app.id}`);
		});

		for await (const dirEntry of docs) {
			sitemap.add(`/docs/${dirEntry.name.slice(0, -3)}`);
		}

		excludedRoutes.forEach((route) => {
			sitemap.remove(route);
		});

		return sitemap.render();
	},
};
