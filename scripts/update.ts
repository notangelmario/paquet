import "dotenv";
import { createClient } from "supabase";
import { App } from "@/types/App.ts";
import { WebAppManifest } from "https://esm.sh/v96/@types/web-app-manifest@1.0.2/index.d.ts";
import { resize } from "deno_image";

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

	const manifest: WebAppManifest | undefined = await fetch(manifestUrl).then((res) => res.json());

	const hash = await digest(JSON.stringify(manifest));

	if (!manifest) {
		console.log("Couldn't fetch manifest");
		break;
	}

	if (hash !== app?.manifest_hash || Deno.args[0] === "--force") {
		console.log("Updating", app.name);
		
		const manifestParent = manifestUrl.split("/");
		manifestParent.pop();

		let category = "";
		const screenshots: string[] = [];
		let icon_large_url = "";
		let icon_small_url = "";

		try {
			if (manifest.categories) {
				category = (manifest.categories[0] as string).toLowerCase();
			}

			if (manifest.screenshots) {
				for (const screenshot of manifest.screenshots) {
					if (screenshot.src.startsWith("http")) {
						screenshots.push(screenshot.src);
					} else {
						screenshots.push(slashSlashes(manifestParent.join("/")) + "/" + slashSlashes(screenshot.src))
					}
				}
			}

			if (manifest.icons) {
				for (const icon of manifest.icons) {
					for (const size of ["512x512", "256x256", "192x192"]) {
						if (icon.sizes === size && !icon_large_url.length) {
							if (icon.src.startsWith("http")) {
								icon_large_url = icon.src;
							} else {
								icon_large_url = slashSlashes(manifestParent.join("/")) + "/" + slashSlashes(icon.src)
							}
						}
					}
					for (const size of ["192x192", "128x128"]) {
						if (icon.sizes === size && !icon_small_url.length) {
							if (icon.src.startsWith("http")) {
								icon_small_url = icon.src;
							} else {
								icon_small_url = slashSlashes(manifestParent.join("/")) + "/" + slashSlashes(icon.src)
							}
						}
					}
				}
			} else continue;

			if (!icon_large_url.length || !icon_large_url.length) {
				console.warn("Icons not generated properly!");
				continue
			}

			const icon_small_blob = await fetch(icon_small_url).then((res) => res.blob())
			const icon_large_blob = await fetch(icon_large_url).then((res) => res.blob())

			const icon_large = await uploadAndGetUrl(app.id, icon_large_blob, "icon_large");
			const icon_small = await uploadAndGetUrl(app.id, icon_small_blob, "icon_small");

			await supabase.from<App>("apps")
				.update({
					name: manifest?.name || undefined,
					description: manifest?.description || undefined,
					category: category || undefined,
					// deno-lint-ignore no-explicit-any
					author: (manifest as unknown as any)?.author || undefined,
					screenshots: screenshots.length ? screenshots : undefined,
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

async function uploadAndGetUrl(id: string, uint: Uint8Array, name: string) {
	const { error } = await supabase.storage
		.from("apps")
		.upload(`${id}/icons/${name}.png`, uint, {
			upsert: true
		});

	if (!error) {
		const { data } = await supabase.storage
			.from("apps")
			.getPublicUrl(`${id}/icons/${name}.png`);
		
		if (data) {
			return data.publicURL;
		} else {
			console.error("Could not get public url!");
			return null;
		}
	} else {
		console.log(error);
		return null;
	}
}

function slashSlashes(string: string) {
	return string.replace(/^\/|\/$/g, '');
}