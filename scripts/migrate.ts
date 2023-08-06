import "dotenv";
import { createClient } from "supabase";
import { _wipeKv, createApp } from "@/lib/db.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";

const supabase = createClient(
	Deno.env.get("SUPABASE_URL")!,
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

export const migrate = async () => {
	_wipeKv();
	await Deno.remove("./apps", { recursive: true });
	await Deno.mkdir("./apps");

	const { data: apps } = await supabase.from("apps").select("*");

	if (!apps) {
		throw new Error("Failed to fetch apps");
	}

	for (const app of apps) {
		const url = new URL(app.url);
		const origin = url.origin
			.replace("https://", "")
			.replace("www.", "");
		// Reverse the domain name
		// Also add the pathname to the end of the domain name
		// with dots as separators
		let appId = origin.split(".").reverse().join(".");
		appId = appId + (url.pathname !== "/" ? url.pathname.replaceAll("/", ".") : "");


		let manifestUrl = "";

		if (!app.manifest_url) {
			try {
				const body = await fetch(app.url, {
					headers: {
						Accept: "text/html",
					},
				})
					.then((res) => res.text())
					.catch((err) => {
						console.log(err);
					});

				if (!body) {
					console.error(`Could not fetch ${app.url}`);

					continue;
				}

				// Get only the head tag
				const head = body?.match(/<head[^>]*>([\s\S.]*)<\/head>/i)?.[0] || "";
				const headParsed = new DOMParser().parseFromString(head, "text/html");

				if (!headParsed) {
					console.error(`Could not parse head of ${app.url}`);
				}

				const manifestValue = headParsed?.querySelector("link[rel=manifest]")
					?.getAttribute("href") || "";

				manifestUrl = manifestValue.startsWith("http")
					? manifestValue
					: new URL(manifestValue, app.url.replace(/\/?$/, "/")).toString();
			} catch (err) {
				console.error(`Failed to fetch ${app.url}`);
			}
		} else {
			manifestUrl = app.manifest_url;
		}

		const manifestHash = await fetch(manifestUrl)
			.then((res) => res.text())
			.then((text) => {
				return crypto.subtle.digest("SHA-1", new TextEncoder().encode(text));
			})
			.then((hash) => {
				return Array.from(new Uint8Array(hash))
					.map((b) => b.toString(16).padStart(2, "0"))
					.join("");
			});

		const appObj = {
			id: appId,
			url: app.url,
			features: app.features || undefined,
			githubUrl: app.github_url || undefined,
			gitlabUrl: app.gitlab_url || undefined,
			manifestUrl: manifestUrl,
			manifestHash: manifestHash,
			categories: app.categories,
			cover: app.cover || undefined,
			author: app.author || undefined,
			name: app.name,
			icon: app.icon,
			accentColor: app.accent_color,
			description: app.description,
			addedOn: app.added_on || undefined,
			screenshots: app.screenshots || undefined,
			version: 1
		};

		await createApp(appObj);

		const data = new TextEncoder().encode(JSON.stringify({
			id: appId,
			url: app.url,
			manifestUrl: manifestUrl,
			features: app.features || undefined,
			githubUrl: app.github_url || undefined,
			gitlabUrl: app.gitlab_url || undefined,
			categories: app.categories,
			author: app.author || undefined,
			accentColor: app.accent_color,
			addedOn: app.added_on || undefined,
			version: 1
		}, null, 4));
		await Deno.writeFile("./apps/" + appId + ".json", data);
	}
}

