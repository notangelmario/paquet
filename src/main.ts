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

import { migrate } from "../scripts/migrate.ts";

if (Deno.env.get("MIGRATE_FROM_SUPABASE") === "1") {
	await migrate();
	console.log("Migrated from Supabase");
}

// @ts-ignore: I don't care about the type of the manifest
await start(manifest, {
	plugins: [
		// @ts-ignore: I don't care about the type of this plugin
		twindPlugin(twindConfig),
		kvInsightsPlugin(),
	],
	port: parseInt(Deno.env.get("PORT") || "3000"),
});
