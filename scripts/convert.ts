import "dotenv";
import { createClient } from "supabase";
import { App } from "@/types/App.ts";

const supabase = createClient(
	Deno.env.get("SUPABASE_URL")!,
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const file = Deno.readTextFileSync("app_features.json");
const appsFeatures = JSON.parse(file);

for (const [appId, features] of Object.entries(appsFeatures)) {
	const { data: app } = await supabase.from<App>("apps")
			.select("id, features")
			.eq("id", appId)
			.single();

	if (app) {
			await supabase.from<App>("apps")
					.update({ features: features as string[] })
					.eq("id", appId);
	}
}
