import "dotenv";
import { createClient } from "supabase";
import { pocketbase } from "@/lib/pocketbase.ts";

const supabase = createClient(
	Deno.env.get("SUPABASE_URL")!,
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const { data: apps } = await supabase.from("apps")
	.select("*")

if (!apps) {
	Deno.exit();
}

for (const app of apps) {
	// @ts-ignore: Unreachable code error
	const icon = await fetch(app.icon_original).then((res) => res.blob());
	const screenshots: Blob[] = [];
	
	if (app.screenshots) {
		for (const screenshot of app.screenshots) {
			// @ts-ignore: Unreachable code error
			screenshots.push(await fetch(screenshot).then((res) => res.blob()));
		}
	}


	const data = new FormData();

	console.log(app.features);

	data.append("name", app.name);
	data.append("author", app.author);
	data.append("description", app.description);
	data.append("added_at", new Date(app.addedOn).toISOString());
	data.append("accent_color", app.accent_color);
	data.append("icon", new File([icon], "icon.png", { type: "image/png" }));
	data.append("github_url", app.github_url ?? "");
	data.append("gitlab_url", app.gitlab_url ?? "");
	data.append("url", app.url);
	if (app.screenshots) {
		for (const screenshot of screenshots) {
			data.append("screenshots", new File([screenshot], "screenshot.png", { type: "image/png" }));
		}
	}
	for (const feature of app.features) {
		data.append("features", feature);
	}
	for (const category of app.categories) {
		data.append("categories", category);
	}

	console.log(data);

	await pocketbase.collection("apps")
		.create(data);
}
