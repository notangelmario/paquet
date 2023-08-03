import manifest from "@/fresh.gen.ts";
import type { Handlers } from "@/types/Handler.ts";
import { SitemapContext } from "fresh_seo";

const excludedRoutes = [
	"/gfm.css",
	"/app/error",
];

export const handler: Handlers = {
	async GET() {
		const sitemap = new SitemapContext("https://paquet.app", manifest);
		const docs = Deno.readDir("docs");

		for await (const dirEntry of docs) {
			sitemap.add(`/docs/${dirEntry.name.slice(0, -3)}`);
		}

		excludedRoutes.forEach((route) => {
			sitemap.remove(route);
		});

		return sitemap.render();
	},
};
