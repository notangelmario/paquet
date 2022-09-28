import { supabase } from "./lib/supabase.ts";
import type { App } from "./types/App.ts";

const { data: apps } = await supabase.from<App>("apps")
	.select("*");


Deno.mkdir("apps", { recursive: true });

if (!apps) {
	Deno.exit()
}

for (const app of apps) {
	let appId = app.url.replace("https://", "");
	appId = appId.replace(/^\/|\/$/g, "");
	appId = appId.replace("/", "-");

	await Deno.mkdir(`apps/${appId}`);
	
	const appDetails = {
		id: appId,
		name: app.name,
		description: app.description,
		author: app.author,
		icon_small: app.icon_small,
		icon_large: app.icon_large,
		category: app.category,
		github_url: app.github_url,
		gitlab_url: app.gitlab_url,
		features: Object.entries(app.features || {})
	}

	await Deno.writeTextFile(`apps/${appId}/details.json`, JSON.stringify(appDetails, null, "\t"));
}