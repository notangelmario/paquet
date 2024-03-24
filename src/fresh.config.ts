import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { kvInsightsPlugin } from "deno-kv-insights";

const kv = await Deno.openKv();

export default defineConfig({
	plugins: [
		tailwind(),
		kvInsightsPlugin({ kv }),
	],
	port: parseInt(Deno.env.get("PORT") || "3000"),
})
