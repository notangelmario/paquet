import { updateApps } from "./checkUpdates.ts";

function main() {
	updateApps(Deno.args);
}

main();