/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { start } from "$fresh/server.ts";
import manifest from "@/fresh.gen.ts";

import "dotenv";

import { checkUpdates } from "../scripts/update.ts";
import { DEV } from "@/lib/app.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "@/twind.config.ts";

import { kvInsightsPlugin, createQueueValueHandler } from "deno-kv-insights";

import { freshSEOPlugin } from "fresh-seo";

const kvInsightsQueueValueHandler = createQueueValueHandler();
const kv = await Deno.openKv();
const docs = Deno.readDirSync("docs");

kv.listenQueue(async (value: unknown) => {
  await kvInsightsQueueValueHandler(value);
});

checkUpdates();

if (!DEV) {
	Deno.cron("App updates", "0 0 */1 * *", checkUpdates);
}

// @ts-ignore: I don't care about the type of the manifest
await start(manifest, {
	plugins: [
		// @ts-ignore: I don't care about the type of this plugin
		twindPlugin(twindConfig),
		kvInsightsPlugin({ kv }),
		freshSEOPlugin(manifest, {
			include: [
				...Array.from(docs).map((doc) => `/docs/${doc.name}`),
			],
			exclude: ["/app/error", "/api/**", "/gfm.css", "/offline"],
		}),
	],
	port: parseInt(Deno.env.get("PORT") || "3000"),
});
