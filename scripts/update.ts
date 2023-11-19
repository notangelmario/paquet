import "dotenv";
import type { App } from "@/types/App.ts";
import { CATEGORIES } from "@/lib/categories.ts";
import { WebAppManifest } from "https://esm.sh/v96/@types/web-app-manifest@1.0.2/index.d.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import { DEV } from "@/lib/app.ts";
import { Certificate } from "@/types/Certificate.ts";
import { createApp, getApps, updateApp } from "@/lib/db.ts";

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
	features: string[];
	author?: string;
	authorLink?: string;
	githubUrl?: string;
	gitlabUrl?: string;
	accentColor?: string;
	version: string | number;
	certificateUrl?: string;
}

export const checkUpdates = async () => {
	const appDir = Deno.readDir("./apps");
	const appsSpecs: AppSpec[] = [];
	const apps: App[] = await getApps([]);

	for await (const dirEntry of appDir) {
		if (!dirEntry.isFile || !dirEntry.name.endsWith(".json")) {
			continue;
		}

		const app = JSON.parse(
			await Deno.readTextFile(`./apps/${dirEntry.name}`),
		) as App;

		appsSpecs.push(app);
	}

	// Check if app with appSpec.id to see if it exists or needs to be created
	for (const appSpec of appsSpecs) {
		const app: App | undefined = apps.find((a) => a.id === appSpec.id);

		// Needs to create app
		if (!app) {
			const appData = await generateAppFields(appSpec, null);

			if (!appData) continue;

			createApp(appData);
			continue;
		}

		// Update
		if (app.version !== appSpec.version) {
			const appData = await generateAppFields(appSpec, app);

			if (!appData) continue;

			updateApp(appSpec.id, appData);
			continue;
		}
	}

	async function generateAppFields(
		appSpec: AppSpec,
		appCurrentData: App | null,
	): Promise<App | null> {
		let manifestUrl: string;

		if (!appSpec.manifestUrl) {
			const body = await fetch(appSpec.url, {
				headers: {
					Accept: "text/html",
				},
			})
				.then((res) => res.text())
				.catch((err) => {
					console.log(err);
					return null;
				});

			if (!body) {
				console.error(`Could not fetch ${appSpec.url}`);
				return null;
			}

			// Get only the head tag
			const head = body.match(/<head[^>]*>([\s\S.]*)<\/head>/i)?.[0] ||
				"";
			const headParsed = new DOMParser().parseFromString(
				head,
				"text/html",
			);

			if (!headParsed) {
				console.error(`Could not parse head of ${appSpec.url}`);
				return null;
			}

			const manifestValue = headParsed.querySelector("link[rel=manifest]")
				?.getAttribute("href") || "";

			manifestUrl = manifestValue.startsWith("http")
				? manifestValue
				: relativeToAbsolute(manifestValue, appSpec.url);
		} else {
			manifestUrl = appSpec.manifestUrl;
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
			return null;
		}

		const hash = await digest(JSON.stringify(manifest));

		if (!manifest) {
			return null;
		}

		if (
			DEV ||
			(hash !== appCurrentData?.manifestHash ||
				appCurrentData.version !== appSpec.version)
		) {
			console.log(`Updating ${appSpec.id}...`);

			const manifestSplit = manifestUrl.split("/");
			manifestSplit.pop();
			const manifestParent = manifestSplit.join("/");

			let categories: string[] = [];
			const screenshots_urls: string[] = [];
			let icon_url = "";
			let accent_color = "";

			let description = manifest?.description;
			// deno-lint-ignore no-explicit-any
			let author = (manifest as unknown as any)?.author ||
				appSpec.author || "";
			let cover_url = "";

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
						)
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
							icon_url = relativeToAbsolute(
								icon.src,
								manifestParent,
							);
						}
					}
				}
			} else {
				console.error("No icons found");
				return null;
			}

			if (!icon_url.length) {
				console.error("Icons not fetched properly!");
				return null;
			}

			accent_color = manifest.theme_color || "";

			if (!description || !author) {
				const html = await fetch(appSpec.url).then((res) => res.text());

				const headParsed = new DOMParser().parseFromString(
					html,
					"text/html",
				);

				if (!headParsed) {
					console.error(
						"Could not parse html for description and author info",
					);
					return null;
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
						cover_url = relativeToAbsolute(cover_url, appSpec.url);
					}
				}
			}

			let certificate: Certificate | undefined;
			if (appSpec.certificateUrl) {
				console.log("Verifying certificate...");

				const certRes = await fetch(appSpec.certificateUrl, {
					headers: {
						Accept: "application/json",
					},
				});

				if (certRes.status === 200) {
					const certificateData = await certRes.json() as Certificate;

					if (
						certificateData.url && certificateData.signature &&
						certificateData.issuedAt
					) {
						certificate = certificateData;
					}
				}
			}

			return {
				id: appSpec.id,
				url: appSpec.url,
				manifestUrl: manifestUrl,
				features: appSpec.features || appCurrentData?.features,
				name: manifest?.name || appCurrentData?.name || "",
				description: description || appCurrentData?.description || "",
				categories: appSpec.categories || categories ||
					appCurrentData?.categories,
				author: author || appSpec?.author || appCurrentData?.author,
				authorLink: appSpec.authorLink || appCurrentData?.authorLink,
				screenshots: screenshots_urls.length
					? screenshots_urls
					: appCurrentData?.screenshots,
				accentColor: accent_color || appSpec.accentColor ||
					appCurrentData?.accentColor || "",
				manifestHash: hash,
				certificate,
				icon: icon_url || appCurrentData?.icon || "",
				cover: cover_url || appCurrentData?.icon,
				version: appSpec.version,
			};
		}

		return null;
	}
};

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