/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import "dotenv";
import { start } from "$fresh/server.ts";
import manifest from "@/fresh.gen.ts";
import { DEV } from "@/lib/app.ts";
import { createQueueValueHandler } from "deno-kv-insights";

import config from "@/fresh.config.ts";
import { updateApps } from "../scripts/checkUpdates.ts";
import { _wipeKv } from "@/lib/db.ts";

const kv = await Deno.openKv();
const kvInsightsQueueValueHandler = createQueueValueHandler();
kv.listenQueue(async (value: unknown) => {
  await kvInsightsQueueValueHandler(value);
});


if (!DEV) {
	Deno.cron("App updates", "0 0 */1 * *", updateApps);
} else {
	updateApps();
}

// @ts-ignore: I don't care about the type of the manifest
await start(manifest, config);
