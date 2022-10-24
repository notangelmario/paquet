import "dotenv";
import { createClient } from "supabase";
import { App } from "@/types/App.ts";

const supabase = createClient(
	Deno.env.get("SUPABASE_URL")!,
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const { data: apps } = await supabase.from<App>("apps")
		.select("id, features");

let appsFeatures: Record<string, string[]> = {};

for (const app of apps!) {
		appsFeatures = {
				...appsFeatures,
				[app.id]: [...Object.keys(app.features!)]
		}
}

Deno.writeTextFileSync("app_features.json", JSON.stringify(appsFeatures))
