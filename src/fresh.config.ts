import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

export default defineConfig({
	plugins: [
		tailwind(),
	],
	port: parseInt(Deno.env.get("PORT") || "3000"),
});
