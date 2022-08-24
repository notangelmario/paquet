import manifest from "@/fresh.gen.ts";
import type { Handlers } from "@/types/Handler.ts";
import type { App } from "@/types/App.ts";
import { SitemapContext } from "fresh-seo";
import { supabase } from "@/lib/supabase.ts";


const excludedRoutes = ["/api/auth/login", "/api/auth/logout", "/gfm.css"]

export const handler: Handlers = {
	async GET() {
		const sitemap = new SitemapContext("https://paquet.shop", manifest);

		const { data: apps } = await supabase.from<App>("apps")
			.select("*")

		if (!apps) {
			return sitemap.render();
		}

		// Add app routes
		apps.forEach((app) => {
			sitemap.add(`/app/${app.id}`);
		});

		excludedRoutes.forEach((route) => {
			sitemap.remove(route);
		});

		return sitemap.render();
	},
};
