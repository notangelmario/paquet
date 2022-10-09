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

	console.log("Found", app.name);

	const manifest = await fetch(manifestUrl).then((res) => res.json());

	const hash = await digest(JSON.stringify(manifest));

	if (hash !== app?.manifest_hash) {
		console.log("Updating", app.name);
		
		let category = "";
		let icon_large = "";
		let icon_small = "";

		try {
			if (manifest.categories) {
				category = (manifest.categories[0] as string).toLowerCase();
			}

			if (manifest.icons) {
				for (const icon of manifest.icons) {
					const manifestParent = manifestUrl.split("/");
					manifestParent.pop();



					if (icon.sizes === "512x512" && !icon_large.length) {
						if (icon.src.startsWith("http")) {
							icon_large = icon.src;
						} else {
							icon_large = slashSlashes(manifestParent.join("/")) + "/" + slashSlashes(icon.src)
						}
					}
					if (icon.sizes === "256x256" && !icon_large.length) {
						if (icon.src.startsWith("http")) {
							icon_large = icon.src;
						} else {
							icon_large = slashSlashes(manifestParent.join("/")) + "/" + slashSlashes(icon.src)
						}
					}
					if (icon.sizes === "128x128" && !icon_small.length) {
						if (icon.src.startsWith("http")) {
							icon_small = icon.src;
						} else {
							icon_small = slashSlashes(manifestParent.join("/")) + "/" + slashSlashes(icon.src)
						}
					}
					if (icon.sizes === "192x192" && !icon_small.length) {
						if (icon.src.startsWith("http")) {
							icon_small = icon.src;
						} else {
							icon_small = slashSlashes(manifestParent.join("/")) + "/" + slashSlashes(icon.src)
						}
					}
				}
			} else continue;

			if (!icon_large.length || !icon_small.length) {
				console.log("Icons not generated properly!");
				continue
			}

			await supabase.from<App>("apps")
				.update({
					name: manifest?.name || undefined,
					description: manifest?.description || undefined,
					category: category || undefined,
					author: manifest?.author || undefined,
					manifest_hash: hash || undefined,
					icon_large: icon_large || undefined,
					icon_small: icon_small || undefined
				})
				.eq("id", app.id);
		} catch (e) {
			console.log(e);
		}	
	}
}

async function digest(message: string) {
	const msgUint8 = new TextEncoder().encode(message);
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
	return hashHex;
}

function slashSlashes(string: string) {
	return string.replace(/^\/|\/$/g, '');
}