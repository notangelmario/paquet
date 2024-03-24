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
import tailwind from "$fresh/plugins/tailwind.ts";

import { kvInsightsPlugin, createQueueValueHandler } from "deno-kv-insights";

import { freshSEOPlugin } from "fresh-seo";

const kvInsightsQueueValueHandler = createQueueValueHandler();
const kv = await Deno.openKv();
const docs = Deno.readDirSync("docs");

kv.listenQueue(async (value: unknown) => {
  await kvInsightsQueueValueHandler(value);
});


if (!DEV) {
	Deno.cron("App updates", "0 0 */1 * *", checkUpdates);
} else {
	Deno.env.get("CHECK_APPS") && checkUpdates();
}

// @ts-ignore: I don't care about the type of the manifest
await start(manifest, {
	plugins: [
		tailwind(),
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
