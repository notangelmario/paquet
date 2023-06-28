/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { start } from "$fresh/server.ts";
import manifest from "@/fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "@/twind.config.ts";

await start(manifest, {
	plugins: [
		// @ts-ignore: I don't care about the type of this plugin
		twindPlugin(twindConfig),
	],
	port: parseInt(Deno.env.get("PORT") || "3000"),
});
