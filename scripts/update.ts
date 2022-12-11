import "dotenv";
import { createClient } from "supabase";
import { CATEGORIES } from "@/lib/categories.ts";
import { App } from "@/types/App.ts";
import Vibrant from "npm:node-vibrant"
import { WebAppManifest } from "https://esm.sh/v96/@types/web-app-manifest@1.0.2/index.d.ts";

const supabase = createClient(
	Deno.env.get("SUPABASE_URL")!,
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const ICONS_SIZES = ["128x128", "192x192", "256x256", "512x512"];

const { data: apps } = await supabase.from("apps")
	.select("*");

if (!apps) {
	Deno.exit();
}

const appsWithError: string[] = [];

for (const app of apps) {
	const manifestUrl = app.manifest_url;

	if (!manifestUrl) continue;

	console.log("Found", app.name);

	let manifest: WebAppManifest | undefined;

	try {
		manifest = await fetch(manifestUrl).then((
			res,
		) => res.json());
	} catch (err) {
		console.error("Could not fetch manifest", err);
		appsWithError.push(app.name);
		continue;
	}

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
		const screenshots_source: string[] = [];
		const screenshots: string[] = [];
		let icon_url = "";
		let accent_color = "";

		try {
			if (manifest.categories) {
				for (const manifestCategory of manifest.categories) {
					if (CATEGORIES.find((c) => c.id === manifestCategory)) {
						category = manifestCategory;
						break;
					}
				}
			}

			if (manifest.screenshots) {
				for (const screenshot of manifest.screenshots) {
					if (screenshot.src.startsWith("http")) {
						screenshots_source.push(screenshot.src);
					} else if (screenshot.src.startsWith("/")) {
						screenshots_source.push(
							slashSlashes(app.url) + "/" +
								slashSlashes(screenshot.src),
						);
					} else {
						screenshots_source.push(
							slashSlashes(manifestParent.join("/")) + "/" +
								slashSlashes(screenshot.src),
						);
					}
				}
			}

			if (manifest.icons) {
				let icons: WebAppManifest["icons"] = [];
				const maskable_icons = manifest.icons
					.filter((a: WebAppManifest["icons"]) => {
						if (!a.sizes) return false;

						if (!ICONS_SIZES.includes(a.sizes)) return false;
						return a.purpose?.startsWith("maskable");
					});

				if (maskable_icons.length) {
					icons = [...maskable_icons];
				} else {
					icons = [...manifest.icons];
				}

				for (const icon of icons) {
					for (const size of ICONS_SIZES) {
						if (icon.sizes === size && !icon_url) {
							if (icon.src.startsWith("http")) {
								icon_url = icon.src;
							} else if (icon.src.startsWith("/")) {
								icon_url = slashSlashes(app.url) + "/" +
									slashSlashes(icon.src);
							} else {
								icon_url =
									slashSlashes(manifestParent.join("/")) +
									"/" + slashSlashes(icon.src);
							}
						}
					}
				}
			} else {
				appsWithError.push(app.name);
				continue;
			}

			if (!icon_url.length) {
				console.warn("Icons not fetched properly!");
				appsWithError.push(app.name);
				continue;
			}

			console.log(icon_url);

			const icon_blob = await fetch(icon_url, {
				headers: {
					"Accept":
						"image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
				},
			}).then((res) => res.blob());

			try {
				const iconColorPalette = await Vibrant.from(icon_url).getPalette();
				
				if (iconColorPalette.Vibrant) {
					accent_color = iconColorPalette.Vibrant?.hex;
				}
			} catch {
				console.warn("Could not get accent color");
				appsWithError.push(app.name);
				continue;
			}


			const icon = await uploadAndGetUrl(app.id, icon_blob, "icons/icon");

			for (let i = 0; i < screenshots_source.length; i++) {
				const blob = await fetch(screenshots_source[i], {
					headers: {
						"Accept":
							"image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
					},
				}).then((res) => res.blob());

				const screenshot = await uploadAndGetUrl(
					app.id,
					blob,
					`screenshots/${i}`,
				);

				if (screenshot) {
					screenshots.push(screenshot);
				}
			}

			await supabase.from("apps")
				.update({
					name: manifest?.name || undefined,
					description: manifest?.description || undefined,
					category: category || undefined,
					// deno-lint-ignore no-explicit-any
					author: (manifest as unknown as any)?.author || undefined,
					screenshots: screenshots.length ? screenshots : undefined,
					accent_color: accent_color || undefined,
					manifest_hash: hash || undefined,
					icon: icon || undefined,
				})
				.eq("id", app.id);
		} catch (e) {
			console.log(e);
			appsWithError.push(app.name);
		}
	}
}

console.log(`\n${appsWithError.length} apps with errors`);
console.log(appsWithError.join(", "));

async function digest(message: string) {
	const msgUint8 = new TextEncoder().encode(message);
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(
		"",
	);
	return hashHex;
}

async function uploadAndGetUrl(id: string, uint: Blob, name: string) {
	const { error } = await supabase.storage
		.from("apps")
		.upload(`${id}/${name}.png`, uint, {
			upsert: true,
		});

	if (!error) {
		const { data } = supabase.storage
			.from("apps")
			.getPublicUrl(`${id}/${name}.png`);

		if (data) {
			return data.publicUrl;
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
	return string.replace(/^\/|\/$/g, "");
}
