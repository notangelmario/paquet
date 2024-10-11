/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import "dotenv";
import { start } from "$fresh/server.ts";
import manifest from "@/fresh.gen.ts";
import { DEV } from "@/lib/app.ts";

import config from "@/fresh.config.ts";
import { updateApps } from "../scripts/checkUpdates.ts";

if (DEV) {
	updateApps();
}

// @ts-ignore: I don't care about the type of the manifest
await start(manifest, config);
