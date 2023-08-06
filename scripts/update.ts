import "dotenv";
import type { App } from "@/types/App.ts";
import { CATEGORIES } from "@/lib/categories.ts";
import { WebAppManifest } from "https://esm.sh/v96/@types/web-app-manifest@1.0.2/index.d.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";

const INTERNAL_KEY = Deno.env.get("INTERNAL_KEY")!;

const ICONS_SIZES = [
	"96x96",
	"120x120",
	"128x128",
	"144x144",
	"192x192",
	"256x256",
	"512x512",
];

export interface AppSpec {
	id: string;
	url: string;
	manifestUrl?: string;
	categories?: string[];
	author?: string;
	authorLink?: string;
	githubUrl?: string;
	gitlabUrl?: string;
	accentColor?: string;
	version: string | number;
}

// Read all app.json's from the apps folder
const appDir = Deno.readDir("./apps");
const apps: AppSpec[] = [];

for await (const dirEntry of appDir) {
	if (!dirEntry.isFile || !dirEntry.name.endsWith(".json")) {
		continue;
	}

	const app = JSON.parse(
		await Deno.readTextFile(`./apps/${dirEntry.name}`),
	) as App;

	apps.push(app);
}


const appsWithError: string[] = [];

console.log("Updating...");

for (const app of apps) {
	const appCurrentData: App = await fetch("http://localhost:3000/api/apps/" + app.id, {
		headers: {
			Authorization: `Bearer ${INTERNAL_KEY}`,
		},
	}).then((res) => res.json())
		.catch((err) => {
			console.log(err);
			appsWithError.push(app.id);
			return null;
		});

	if (!appCurrentData) {
		// App does not exist, create it
		const res = await fetch("http://localhost:3000/api/apps/" + app.id, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${INTERNAL_KEY}`,
			},
			body: JSON.stringify(app),
		});

		if (!res.ok) {
			console.error(`Could not create app ${app.id}`);
			appsWithError.push(app.id);
			continue;
		}
		
		// App created, remove from error list
		const index = appsWithError.indexOf(app.id);
		if (index > -1) {
			appsWithError.splice(index, 1);
		}
	}

	let manifestUrl: string;

	if (!app.manifestUrl) {
		const body = await fetch(app.url, {
			headers: {
				Accept: "text/html",
			},
		})
			.then((res) => res.text())
			.catch((err) => {
				console.log(err);
				appsWithError.push(app.id);
				return null;
			});

		if (!body) {
			console.error(`Could not fetch ${app.url}`);
			appsWithError.push(app.id);
			continue;
		}

		// Get only the head tag
		const head = body.match(/<head[^>]*>([\s\S.]*)<\/head>/i)?.[0] || "";
		const headParsed = new DOMParser().parseFromString(head, "text/html");

		if (!headParsed) {
			console.error(`Could not parse head of ${app.url}`);
			appsWithError.push(app.id);
			continue;
		}

		const manifestValue = headParsed.querySelector("link[rel=manifest]")
			?.getAttribute("href") || "";

		manifestUrl = manifestValue.startsWith("http")
			? manifestValue
			: relativeToAbsolute(manifestValue, app.url);

	} else {
		manifestUrl = app.manifestUrl;
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
		appsWithError.push(app.id);
		console.log(manifestUrl);
		continue;
	}

	const hash = await digest(JSON.stringify(manifest));

	if (!manifest) {
		console.log("Couldn't fetch manifest");
		continue;
	}

	if (hash !== appCurrentData?.manifestHash || appCurrentData.version !== app.version) {
		const manifestSplit = manifestUrl.split("/");
		manifestSplit.pop();
		const manifestParent = manifestSplit.join("/");

		let categories: string[] = [];
		const screenshots_urls: string[] = [];
		let icon_url = "";
		let accent_color = "";

		let description = manifest?.description;
		// deno-lint-ignore no-explicit-any
		let author = (manifest as unknown as any)?.author || app.author || "";
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
				screenshots_urls.push(
					relativeToAbsolute(screenshot.src, manifestParent),
				);
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
						icon_url = relativeToAbsolute(icon.src, manifestParent);
					}
				}
			}
		} else {
			console.error("No icons found");
			appsWithError.push(app.id);
			continue;
		}

		if (!icon_url.length) {
			console.error("Icons not fetched properly!");
			appsWithError.push(app.id);
			continue;
		}

		accent_color = manifest.theme_color || "";

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
				appsWithError.push(app.id);
				continue;
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

		const res = await fetch("http://localhost:3000/api/apps/" + app.id, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${INTERNAL_KEY}`,
			},
			body: JSON.stringify({
				name: manifest?.name || appCurrentData?.name,
				description: description || appCurrentData?.description,
				categories: app.categories || categories.length ? categories : appCurrentData?.categories,
				author: author || app?.author || appCurrentData?.author,
				screenshots: screenshots_urls.length
					? screenshots_urls
					: appCurrentData?.screenshots,
				accentColor: accent_color || app.categories || appCurrentData?.accentColor,
				manifestHash: hash,
				icon: icon_url || appCurrentData?.icon,
				cover: cover_url || appCurrentData?.icon,
				version: app.version,
			}),
		});

		if (res.status !== 200) {
			console.error("Could not update app");
			console.error(await res.text());
			appsWithError.push(app.id);
			continue;
		}

	}

	console.log(`Updated ${app.id}`);
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
