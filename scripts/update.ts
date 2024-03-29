import { AppSpec } from "@/types/App.ts";
import { updateApps } from "./checkUpdates.ts";

async function main() {
	const args = Deno.args;
	const appDir = Deno.readDir("./apps");
	const appsSpecs: AppSpec[] = []; 

	for await (const dirEntry of appDir) {
		if (!dirEntry.isFile || !dirEntry.name.endsWith(".json")) {
			continue;
		}

		const app = JSON.parse(
			await Deno.readTextFile(`./apps/${dirEntry.name}`),
		) as AppSpec;

		appsSpecs.push(app);
	}

	const appIds = !args.includes("ALL") ? args.filter((arg) => appsSpecs.some((app) => app.id === arg)) : appsSpecs.map((app) => app.id);

	updateApps(appIds);
}

main();
