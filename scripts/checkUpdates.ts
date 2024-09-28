import "dotenv";
import type { App, AppSpec } from "@/types/App.ts";
import { CATEGORIES } from "@/lib/categories.ts";
import { WebAppManifest } from "https://esm.sh/v96/@types/web-app-manifest@1.0.2/index.d.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import { createApp, getApps, removeApp, updateApp } from "@/lib/db.ts";

const ICONS_SIZES = [
	"96x96",
	"120x120",
	"128x128",
	"144x144",
	"192x192",
	"256x256",
	"512x512",
];

export async function digest(message: string) {
	const msgUint8 = new TextEncoder().encode(message);
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(
		"",
	);
	return hashHex;
}

const objectContains = (object: object, keys: string[]) => keys.every(k => k in object)

export function slashSlashes(string: string) {
	return string.replace(/^\/|\/$/g, "");
}

export function relativeToAbsolute(url: string, baseUrl: string) {
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

export const fetchManifestUrlFromIndex = async (
	url: string,
): Promise<string | null> => {
	const body = await fetch(url, {
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
		console.error(`Could not fetch ${url}`);
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
		console.error(
			`[fetchManifestUrlFromIndex] Could not parse head of ${url}`,
		);
		return null;
	}

	const manifestValue = headParsed.querySelector("link[rel=manifest]")
		?.getAttribute("href") || "";

	const manifestUrl = manifestValue.startsWith("http")
		? manifestValue
		: relativeToAbsolute(manifestValue, url);

	return manifestUrl;
};

export const fetchManifest = async (
	manifestUrl: string,
): Promise<WebAppManifest | null> => {
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
	} catch {
		console.error(
			`[fetchManifest] Could not fetch manifest from ${manifestUrl}`,
		);
	}

	return manifest || null;
};

export const fetchIndexProps = async (
	url: string,
): Promise<Pick<App, "author" | "description" | "cover"> | null> => {
	const body = await fetch(url, {
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
		console.error(`Could not fetch ${url}`);
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
		console.error(`[fetchIndexProps] Could not parse head of ${url}`);
		return null;
	}

	const author =
		headParsed.querySelector('meta[name="author"]')?.getAttribute(
			"content",
		) || "";
	const description =
		headParsed.querySelector('meta[name="description"]')?.getAttribute(
			"content",
		) || "";
	const cover =
		headParsed.querySelector('meta[property="og:image"]')?.getAttribute(
			"content",
		) || "";

	return { author, description, cover };
};

export const getIcon = (
	manifest: WebAppManifest,
	manifestUrl: string,
): string | null => {
	const manifestSplit = manifestUrl.split("/");
	manifestSplit.pop();
	const manifestParent = manifestSplit.join("/");
	const icons = manifest.icons || [];

	const maskableIcons = icons.filter((icon) => icon.purpose === "maskable");
	const pngIcons = icons.filter((icon) =>
		icon.src.replace(/\?.*/, "").endsWith(".png")
	);
	const svgIcons = icons.filter((icon) =>
		icon.src.replace(/\?.*/, "").endsWith(".svg")
	);

	const maskableIconsBySize = ICONS_SIZES.map((size) =>
		maskableIcons.find((icon) => icon.sizes === size)
	);
	const maskableIcon = maskableIconsBySize.find((icon) => icon !== undefined);
	if (maskableIcon) {
		return relativeToAbsolute(maskableIcon.src, manifestParent);
	}

	const svgIcon = svgIcons[0];

	if (svgIcon) {
		return relativeToAbsolute(svgIcon.src, manifestParent);
	}

	const pngIconsBySize = ICONS_SIZES.map((size) =>
		pngIcons.find((icon) => icon.sizes === size)
	);
	const pngIcon = pngIconsBySize.find((icon) => icon !== undefined);
	if (pngIcon) {
		return relativeToAbsolute(pngIcon.src, manifestParent);
	}

	return null;
};

export const getScreenshots = (
	manifest: WebAppManifest,
	manifestUrl: string,
): string[] => {
	const manifestSplit = manifestUrl.split("/");
	manifestSplit.pop();
	const manifestParent = manifestSplit.join("/");
	const screenshots = manifest.screenshots || [];
	return screenshots.map((screenshot) =>
		relativeToAbsolute(screenshot.src, manifestParent)
	);
};

export const getCategories = (manifest: WebAppManifest): string[] => {
	const categories = manifest.categories || [];
	const manifestCategories = categories.map((category) => {
		const foundCategory = CATEGORIES.find((c) =>
			c.id === category || c.aliases?.includes(category)
		);
		return foundCategory?.id || category;
	});

	return [...new Set(manifestCategories)];
};

export const getCoverUrl = async (
	coverUrl: string,
): Promise<string | null> => {
	const res = await fetch(coverUrl, {
		headers: {
			Accept: "image/*",
		},
	})
		.catch(() => {
			console.error(`Could not fetch cover image from ${coverUrl}`);
			return null;
		});

	if (res?.ok) {
		return coverUrl;
	}

	return null;
};

export const generateApp = async (
	appSpec: AppSpec,
	existingApp: App | null,
	manifest: WebAppManifest,
	manifestUrl: string,
	url: string,
): Promise<App | null> => {
	const icon = getIcon(manifest, manifestUrl);
	const screenshots = getScreenshots(manifest, manifestUrl);
	const { author, description, cover } = await fetchIndexProps(url) || {};
	const coverUrl = cover ? await getCoverUrl(cover) : undefined;
	const categories = getCategories(manifest);

	const newApp: Partial<App> = {
		id: appSpec.id,
		name: manifest.name || manifest.short_name,
		description: manifest.description || description,
		icon: icon || "",
		screenshots: screenshots,
		url: url,
		cover: coverUrl || undefined,
		// @ts-ignore Some manifests may have author
		author: appSpec.author || manifest.author || author,
		accentColor: appSpec.accentColor || manifest.theme_color || "#212121",
		categories: appSpec.categories || categories || [],
		features: appSpec.features,
		manifestUrl: appSpec.manifestUrl || url,
		manifestHash: await digest(JSON.stringify(manifest)),
		githubUrl: appSpec.githubUrl || undefined,
		gitlabUrl: appSpec.gitlabUrl || undefined,
		authorUrl: appSpec.authorUrl || undefined,
	};

	const updatedApp = { ...existingApp, ...newApp } as App;

	if (!objectContains(updatedApp, ["id", "name", "author", "icon", "description"])) {
		console.log(
			`[generateApp] Missing required fields for ${appSpec.id}. Skipping.`,
		);
		return null;
	}

	return updatedApp;
};

export const updateApps = async (specificAppIds: string[] = []) => {
	const appDir = Deno.readDir("./apps");
	const appSpecs: AppSpec[] = [];
	const allAppSpecIds: string[] = [];
	const apps: App[] = await getApps();

	for await (const dirEntry of appDir) {
		if (!dirEntry.isFile || !dirEntry.name.endsWith(".json")) {
			continue;
		}

		const app = JSON.parse(
			await Deno.readTextFile(`./apps/${dirEntry.name}`),
		) as AppSpec;

		appSpecs.push(app);
		allAppSpecIds.push(app.id);
	}

	// Check every appSpec to see if it exists or needs to be created
	// updated or deleted
	// Check manifest hash to see if it needs to be updated
	for (const appSpec of appSpecs) {
		const app: App | undefined = apps.find((a) => a.id === appSpec.id);

		console.log(`Checking ${appSpec.id}`);

		// Needs to create app
		if (!app) {
			console.log(`Creating ${appSpec.id}`);

			const manifestUrl = appSpec.manifestUrl ||
				(await fetchManifestUrlFromIndex(appSpec.url));
			if (!manifestUrl) continue;

			const manifest = await fetchManifest(manifestUrl);
			if (!manifest) continue;

			const appData = await generateApp(
				appSpec,
				null,
				manifest,
				manifestUrl,
				appSpec.url,
			);

			if (!appData) continue;

			createApp(appData);
			continue;
		}

		// Update
		const manifest = await fetchManifest(app.manifestUrl);
		if (!manifest) continue;

		const manifestHash = await digest(JSON.stringify(manifest));

		if (
			(app.manifestHash !== manifestHash) ||
			specificAppIds.includes(appSpec.id)
		) {
			console.log(
				`Updating ${appSpec.id} ${
					specificAppIds.includes(appSpec.id) ? "FORCEFULLY" : ""
				}`,
			);

			const manifestUrl = appSpec.manifestUrl ||
				(await fetchManifestUrlFromIndex(appSpec.url));
			if (!manifestUrl) continue;

			const appData = await generateApp(
				appSpec,
				app,
				manifest,
				manifestUrl,
				app.url,
			);

			if (!appData) continue;

			updateApp(appSpec.id, appData);
			continue;
		}
	}

	// Delete
	console.log(`Checking for apps to delete`);
	const appIds = await getApps().then((apps) => apps.map((app) => app.id));
	const appsToDelete = appIds.filter((id) => !allAppSpecIds.includes(id));

	for (const appId of appsToDelete) {
		console.log(`Deleting ${appId}`);
		removeApp(appId);
	}
};
