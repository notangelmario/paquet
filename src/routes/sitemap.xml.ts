import { join } from "$std/path/mod.ts";
import manifest from "@/fresh.gen.ts";
import type { Handlers } from "@/types/Handler.ts";
import { getApps } from "@/lib/app.ts";
import { SitemapContext } from "fresh-seo";

const excludedRoutes = [
	"/gfm.css",
	"/app/error",
];

export const handler: Handlers = {
	async GET() {
		const sitemap = new SitemapContext("https://paquet.shop", manifest);
		const developerDocs = Deno.readDir(join("docs", "developers"));

		const apps = await getApps();

		if (!apps) {
			return sitemap.render();
		}

		// Add app routes
		apps.forEach((app) => {
			sitemap.add(`/app/${app.id}`);
		});

		for await (const dirEntry of developerDocs) {
			sitemap.add(`/developers/docs/${dirEntry.name.slice(0, -3)}`);
		}

		excludedRoutes.forEach((route) => {
			sitemap.remove(route);
		});

		return sitemap.render();
	},
};
