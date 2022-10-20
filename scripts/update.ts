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

	if (hash !== app?.manifest_hash || Deno.args[0] === "--force" ) {
		console.log("Updating", app.name);
		
		const manifestParent = manifestUrl.split("/");
		manifestParent.pop();

		let category = "";
		const screenshots: string[] = [];
		let icon_url = "";

		try {
			if (manifest.categories) {
				category = (manifest.categories[0] as string).toLowerCase();
			}

			if (manifest.screenshots) {
				for (let i = 0; i < manifest.screenshots.length; i++) {
					const screenshot = manifest.screenshots[i];
					let url;

					if (screenshot.src.startsWith("http")) {
						url = screenshot.src;
					} else {
						url = slashSlashes(manifestParent.join("/")) + "/" + slashSlashes(screenshot.src);
					}

					const res = await fetch(url);

					const { error } = await supabase.storage
						.from("apps")
						.upload(`${app.id}/screenshots/${i}.png`, await res.blob(), {
							upsert: true
						});

					if (!error) {
						const { data } = await supabase.storage
							.from("apps")
							.getPublicUrl(`${app.id}/screenshots/${i}.png`);
						
						if (data) {
							screenshots.push(data?.publicURL)
						} else {
							console.error("Could not get public url!")
						}
					} else {
						console.log(error);
					}
				}
			}

			if (manifest.icons) {
				for (const icon of manifest.icons) {
					for (const size of ["512x512", "256x256", "192x192"]) {
						if (icon.sizes === size && !icon_url.length) {
							if (icon.src.startsWith("http")) {
								icon_url = icon.src;
							} else {
								icon_url = slashSlashes(manifestParent.join("/")) + "/" + slashSlashes(icon.src)
							}
						}
					}
				}
			} else continue;

			if (!icon_url.length) {
				console.error("Icon not found!");
				continue
			}


			const res = await fetch(icon_url);
			const uint = new Uint8Array(await res.arrayBuffer())

			const icon_large = await resize(uint, { width: 256, height: 256 });
			const icon_small = await resize(uint, { width: 64, height: 64 });

			const icon_large_url = await uploadAndGetUrl(app.id, icon_large, "icon_large");
			const icon_small_url = await uploadAndGetUrl(app.id, icon_small, "icon_small");
				

			if (!icon_large_url || !icon_small_url) {
				console.error("Icons not generated properly!")
				continue;
			}

			await supabase.from<App>("apps")
				.update({
					name: manifest?.name || undefined,
					description: manifest?.description || undefined,
					category: category || undefined,
					// deno-lint-ignore no-explicit-any
					author: (manifest as unknown as any)?.author || undefined,
					screenshots: screenshots.length ? screenshots : undefined,
					manifest_hash: hash || undefined,
					icon_large: icon_large_url || undefined,
					icon_small: icon_small_url || undefined
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