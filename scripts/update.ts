import "dotenv";
import type { App } from "@/types/App.ts";
import { createClient } from "supabase";
import Vibrant from "npm:node-vibrant";
import Jimp from "npm:jimp";
import { CATEGORIES } from "@/lib/categories.ts";
import { WebAppManifest } from "https://esm.sh/v96/@types/web-app-manifest@1.0.2/index.d.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";

const supabase = createClient(
	Deno.env.get("SUPABASE_URL")!,
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const ICONS_SIZES = ["96x96", "128x128", "192x192", "256x256", "512x512"];

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
	let manifestUrl: string;

	if (!app.manifest_url) {
		const body = await fetch(app.url, {
			headers: {
				Accept: "text/html",
			},
		})
			.then((res) => res.text())
			.catch((err) => {
				console.log(err);
				appsWithError.push(app.name);
				return null;
			});

		if (!body) {
			return;
		}

		// Get only the head tag
		const head = body.match(/<head[^>]*>([\s\S.]*)<\/head>/i)?.[0] || "";
		const headParsed = new DOMParser().parseFromString(head, "text/html");

		if (!headParsed) {
			console.error(`Could not parse head of ${app.url}`);
			appsWithError.push(app.id);
			return;
		}

		const manifestValue = headParsed.querySelector("link[rel=manifest]")
			?.getAttribute("href") || "";

		manifestUrl = manifestValue.startsWith("http")
			? manifestValue
			: new URL(manifestValue, app.url.replace(/\/?$/, "/")).toString();
	} else {
		manifestUrl = app.manifest_url;
	}

	let manifest: WebAppManifest | undefined;
	try {
		manifest = await fetch(manifestUrl, {
			headers: {
				Accept:
					"application/manifest+json, application/json, application/webmanifest",
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
		const manifestSplit = manifestUrl.split("/");
		manifestSplit.pop();
		const manifestParent = manifestSplit.join("/");

		let categories: string[] = [];
		const screenshots_urls: string[] = [];
		let icon_url = "";
		let accent_color = "";

		let description = manifest?.description;
		// deno-lint-ignore no-explicit-any
		let author = (manifest as unknown as any)?.author;
		let cover_url = "";

		if (Array.isArray(manifest.categories)) {
			categories = manifest.categories
				.filter((x: string) => typeof x === "string")
				.filter((x: string) =>
					CATEGORIES.find((c) => c.id === x || c.aliases?.includes(x))
				)
				.map((x: string) =>
					CATEGORIES.find((c) => c.id === x || c.aliases?.includes(x))
						?.id || x
				);

			// This eliminates duplicates
			categories = [...new Set(categories)];
		}

		if (manifest.screenshots) {
			for (const screenshot of manifest.screenshots) {
				screenshots_urls.push(relativeToAbsolute(screenshot.src, manifestParent))
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

			// The reason why this is used and
			// not the URL api, is because
			// some icons cover edge cases that
			// the URL api doesn't handle correctly

			for (const icon of icons) {
				for (const size of ICONS_SIZES) {
					if (icon.sizes === size && !icon_url) {
						icon_url = relativeToAbsolute(icon.src, manifestParent)
					}
				}
			}
		} else {
			console.error("No icons found");
			appsWithError.push(app.name);
			return;
		}

		if (!icon_url.length) {
			console.error("Icons not fetched properly!");
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
			console.error("Could not get accent color");
			console.error(e);
			console.log(icon_url);
			appsWithError.push(app.name);
			return;
		}


		if (!description || !author) {
			const html = await fetch(app.url).then((res) => res.text());

			const headParsed = new DOMParser().parseFromString(
				html,
				"text/html",
			);

			if (!headParsed) {
				console.error(
					"Could not parse html for description and author info",
				);
				appsWithError.push(app.name);
				return;
			}

			if (!description) {
				description =
					headParsed.querySelector("meta[name='description']")
						?.getAttribute("content") || "";
			}

			if (!author) {
				author = headParsed.querySelector("meta[name='author']")
					?.getAttribute("content") || "";
			}

			if (!cover_url) {
				cover_url =
					headParsed.querySelector("meta[property='og:image']")
						?.getAttribute("content") || "";

				if (cover_url) {
					cover_url = relativeToAbsolute(cover_url, app.url);
				}
			}
		}

		await supabase.from("apps")
			.update({
				name: manifest?.name || undefined,
				description: description || undefined,
				categories: categories || undefined,
				author: author || undefined,
				screenshots: screenshots_urls || undefined,
				accent_color: accent_color,
				manifest_hash: hash,
				icon: icon_url || undefined,
				cover: cover_url || undefined,
			})
			.eq("id", app.id);
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

function slashSlashes(string: string) {
	return string.replace(/^\/|\/$/g, "");
}

function relativeToAbsolute(url: string, baseUrl: string) {
	if (url.startsWith("http")) {
		return url;
	} else if (url.startsWith("//")) {
		return "https:" + url;
	} else if (url.startsWith("/")) {
		return slashSlashes(new URL(baseUrl).origin) + "/" + slashSlashes(url);
	} else {
		return slashSlashes(baseUrl) +
			"/" + slashSlashes(url);
	}
}
