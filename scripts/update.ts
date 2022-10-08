import "dotenv";
import { createClient } from "supabase";
import { App } from "@/types/App.ts";

const supabase = createClient(
	Deno.env.get("SUPABASE_URL")!,
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const { data: apps } = await supabase.from<App>("apps")
	.select("*");

if (!apps) {
	Deno.exit();
}

for (const app of apps) {
	const manifestUrl = app.manifest_url;

	if (!manifestUrl) continue;

	console.log("Found ", app.name);

	const manifest = await fetch(manifestUrl).then((res) => res.json());

	const hash = await digest(JSON.stringify(manifest));

	if (hash !== app?.manifest_hash) {
		console.log("Updating ", app.name);

		await supabase.from<App>("apps")
			.update({
				name: manifest?.name,
				description: manifest?.description,
				author: manifest?.author,
				manifest_hash: hash,
			})
			.eq("id", app.id);
	}
}

async function digest(message: string) {
	const msgUint8 = new TextEncoder().encode(message);
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(
		"",
	);
	return hashHex;
}
