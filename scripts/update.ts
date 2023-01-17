import "dotenv";
import type { App } from "@/types/App.ts";
import { createClient } from "supabase";
import Vibrant from "npm:node-vibrant";
import Jimp from "npm:jimp";
import { CATEGORIES } from "@/lib/categories.ts";
import { WebAppManifest } from "https://esm.sh/v96/@types/web-app-manifest@1.0.2/index.d.ts";

const supabase = createClient(
	Deno.env.get("SUPABASE_URL")!,
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const IMAGES_URL = "https://paquet.shop/app";

const ICONS_SIZES = ["128x128", "192x192", "256x256", "512x512"];

let apps: App[] = [];

if (Deno.args.length) {
	if (Deno.args[0] !== "--force") {
		const { data } = await supabase.from("apps")
			.select("*")
			.eq("id", Deno.args[0]);

		if (data) {
			apps = data;
		} else {
			console.error("Could not get apps!");
			Deno.exit(1);
		}
	} else {
		const { data } = await supabase.from("apps")
			.select("*");

		if (!data) {
			Deno.exit();
		}

		apps = data;
	}
}

const appsWithError: string[] = [];

console.log("Updating...");

await Promise.all(apps.map(async (app) => {
	const manifestUrl = app.manifest_url;

	if (!manifestUrl) return;

	let manifest: WebAppManifest | undefined;

	try {
		manifest = await fetch(manifestUrl, {
			headers: {
				Accept: "application/json",
			},
		}).then((
			res,
		) => res.json());
	} catch (err) {
		console.error("Could not fetch manifest", err);
		appsWithError.push(app.name);
		return;
	}

	const hash = await digest(JSON.stringify(manifest));

	if (!manifest) {
		console.log("Couldn't fetch manifest");
		return;
	}

	if (hash !== app?.manifest_hash || Deno.args.includes("--force")) {
		const manifestParent = manifestUrl.split("/");
		manifestParent.pop();

		let categories: string[] = [];
		const screenshots_source: string[] = [];
		const screenshots: string[] = [];
		let icon_url = "";
		let accent_color = "";

		try {
			if (Array.isArray(manifest.categories)) {
				categories = manifest.categories
					.filter((x: string) => typeof x === "string")
					.filter((x: string) =>
						CATEGORIES.find((c) =>
							c.id === x || c.aliases?.includes(x)
						)
					)
					.map((x: string) =>
						CATEGORIES.find((c) =>
							c.id === x || c.aliases?.includes(x)
						)?.id || x
					);

				// This eliminates duplicates
				categories = [...new Set(categories)];
			}

			if (manifest.screenshots) {
				for (const screenshot of manifest.screenshots) {
					if (screenshot.src.startsWith("http")) {
						screenshots_source.push(screenshot.src);
					} else if (screenshot.src.startsWith("//")) {
						screenshots_source.push("https://" + screenshot.src.slice(2));
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
					.filter((a) => {
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

								// Aparently some apps use "//" at the beginning
								// and the browser actually understands it????
							} else if (icon.src.startsWith("//")) {
								icon_url = "https://" + icon.src.slice(2);
							} else if (icon.src.startsWith("/")) {
								icon_url =
									slashSlashes(new URL(app.url).origin) +
									"/" + slashSlashes(icon.src);
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
				return;
			}

			if (!icon_url.length) {
				console.warn("Icons not fetched properly!");
				appsWithError.push(app.name);
				return;
			}

			const icon_blob = await Jimp.read(icon_url)
				.then((image) => image.resize(128, 128))
				.then((image) => image.getBufferAsync(Jimp.MIME_PNG))
				.then((buffer) => new Blob([new Uint8Array(buffer)]))
				.catch((err) => {
					console.error("Could not fetch icon", err);
					console.log(icon_url);
					appsWithError.push(app.name);
					return;
				});

			if (!icon_blob) return;

			try {
				const iconColorPalette = await Vibrant.from(icon_url)
					.getPalette();

				if (iconColorPalette.Vibrant) {
					accent_color = iconColorPalette.Vibrant?.hex;
				}
			} catch (e) {
				console.warn("Could not get accent color");
				console.warn(e);
				console.log(icon_url);
				appsWithError.push(app.name);
				return;
			}

			await clearAppFromStorage(app.id, "icons");
			await clearAppFromStorage(app.id, "screenshots");

			await uploadAndGetUrl(app.id, icon_blob, "icons/icon");

			for (let i = 0; i < screenshots_source.length; i++) {
				const blob = await fetch(screenshots_source[i], {
					headers: {
						"Accept":
							"image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
					},
				}).then((res) => res.blob());

				if (!blob) {
					console.warn("Could not fetch screenshot(s)");
					console.log(screenshots_source[i]);
					appsWithError.push(app.name);
					return;
				}

				await uploadAndGetUrl(
					app.id,
					blob,
					`screenshots/${i}`,
				);

				screenshots.push(`${IMAGES_URL}/${app.id}/screenshot?n=${i}`);
			}

			await supabase.from("apps")
				.update({
					name: manifest?.name || undefined,
					description: manifest?.description || undefined,
					categories: categories.length ? categories : undefined,
					// deno-lint-ignore no-explicit-any
					author: (manifest as unknown as any)?.author || undefined,
					screenshots: screenshots.length ? screenshots : undefined,
					screenshots_original: screenshots_source.length
						? screenshots_source
						: undefined,
					accent_color: accent_color,
					manifest_hash: hash,
					icon: `${IMAGES_URL}/${app.id}/icon`,
					icon_original: icon_url,
				})
				.eq("id", app.id);
		} catch (e) {
			console.log(e);
			appsWithError.push(app.name);
		}
	}
}));

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

async function clearAppFromStorage(id: string, folderName: string) {
	const { data: files } = await supabase.storage
		.from("apps")
		.list(id);
	const folders = files?.map((a) => a.name) || [];

	if (!folders.includes(folderName)) return;

	const { data: list } = await supabase.storage.from("apps").list(
		`${id}/${folderName}`,
	);
	const filesToRemove = list?.map((x) => `${id}/${folderName}/${x.name}`) ||
		[];

	if (!filesToRemove) return;

	const { error } = await supabase.storage
		.from("apps")
		.remove(filesToRemove);

	if (error) {
		console.log(error);
	}
}

async function uploadAndGetUrl(id: string, uint: Blob, name: string) {
	const { error } = await supabase.storage
		.from("apps")
		.upload(`${id}/${name}.png`, uint, {
			upsert: true,
		});

	if (error) {
		console.log(error);
		return null;
	}
}

function slashSlashes(string: string) {
	return string.replace(/^\/|\/$/g, "");
}
