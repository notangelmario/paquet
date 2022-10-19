import "dotenv";
import { createClient } from "supabase";
import { App } from "@/types/App.ts";
import { WebAppManifest } from "https://esm.sh/v96/@types/web-app-manifest@1.0.2/index.d.ts";

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
		const icons: string[] = [];
		let icon_large_url = "";
		let icon_small_url = "";

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
					if (icon.sizes === "512x512" && !icon_large_url.length) {
						if (icon.src.startsWith("http")) {
							icon_large_url = icon.src;
						} else {
							icon_large_url = slashSlashes(manifestParent.join("/")) + "/" + slashSlashes(icon.src)
						}
					}
					if (icon.sizes === "256x256" && !icon_large_url.length) {
						if (icon.src.startsWith("http")) {
							icon_large_url = icon.src;
						} else {
							icon_large_url = slashSlashes(manifestParent.join("/")) + "/" + slashSlashes(icon.src)
						}
					}
					if (icon.sizes === "192x192" && !icon_large_url.length) {
						if (icon.src.startsWith("http")) {
							icon_large_url = icon.src;
						} else {
							icon_large_url = slashSlashes(manifestParent.join("/")) + "/" + slashSlashes(icon.src)
						}
					}
					
					if (icon.sizes === "128x128" && !icon_small_url.length) {
						if (icon.src.startsWith("http")) {
							icon_small_url = icon.src;
						} else {
							icon_small_url = slashSlashes(manifestParent.join("/")) + "/" + slashSlashes(icon.src)
						}
					}
					if (icon.sizes === "192x192" && !icon_small_url.length) {
						if (icon.src.startsWith("http")) {
							icon_small_url = icon.src;
						} else {
							icon_small_url = slashSlashes(manifestParent.join("/")) + "/" + slashSlashes(icon.src)
						}
					}
				}
			} else continue;

			if (!icon_large_url.length || !icon_small_url.length) {
				console.warn("Icons not generated properly!");
				continue
			}

			const iconsToFetch = [icon_small_url, icon_large_url];

			for (let i = 0; i < iconsToFetch.length; i++) {
				const icon = iconsToFetch[i];

				const res = await fetch(icon);

				const { error } = await supabase.storage
					.from("apps")
					.upload(`${app.id}/icons/${i}.png`, await res.blob(), {
						upsert: true
					});

				if (!error) {
					const { data } = await supabase.storage
						.from("apps")
						.getPublicUrl(`${app.id}/icons/${i}.png`);
					
					if (data) {
						icons.push(data?.publicURL)
					} else {
						console.error("Could not get public url!")
					}
				} else {
					console.log(error);
				}
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
					icon_large: icons[1] || undefined,
					icon_small: icons[0] || undefined
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