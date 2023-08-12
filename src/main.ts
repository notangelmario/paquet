/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { start } from "$fresh/server.ts";
import manifest from "@/fresh.gen.ts";

import "dotenv";

import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "@/twind.config.ts";

import { kvInsightsPlugin } from "deno-kv-insights";

import { freshSEOPlugin } from "fresh-seo";

const docs = Deno.readDirSync("docs");

// @ts-ignore: I don't care about the type of the manifest
await start(manifest, {
	plugins: [
		// @ts-ignore: I don't care about the type of this plugin
		twindPlugin(twindConfig),
		kvInsightsPlugin(),
		freshSEOPlugin(manifest, {
			include: [
				...Array.from(docs).map((doc) => `/docs/${doc.name}`)
			],
			exclude: ["/app/error", "/api/**", "/gfm.css", "/offline"],
		}),
	],
	port: parseInt(Deno.env.get("PORT") || "3000"),
});
