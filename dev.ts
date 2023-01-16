#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import { decompress } from "https://deno.land/x/zip@v1.2.4/mod.ts";

const PB_VERSION = "0.11.2"

const pbPresent = await Deno.lstat("pocketbase").catch(() => false);

if (!pbPresent) {
	console.log("Downloading PocketBase...");
	let file = `https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_{os}_{arch}.zip`;

	if (Deno.build.os === "linux" && Deno.build.arch === "aarch64") {
		file = file.replace("{os}", "linux").replace("{arch}", "arm64");
	}
	else if (Deno.build.os === "linux" && Deno.build.arch === "x86_64") {
		file = file.replace("{os}", "linux").replace("{arch}", "amd64");
	}
	else if (Deno.build.os === "darwin" && Deno.build.arch === "aarch64") {
		file = file.replace("{os}", "darwin").replace("{arch}", "arm64");
	}
	else if (Deno.build.os === "darwin" && Deno.build.arch === "x86_64") {
		file = file.replace("{os}", "darwin").replace("{arch}", "amd64");
	}
	else if (Deno.build.os === "windows" && Deno.build.arch === "aarch64") {
		file = file.replace("{os}", "windows").replace("{arch}", "arm64");
	}
	else if (Deno.build.os === "windows" && Deno.build.arch === "x86_64") {
		file = file.replace("{os}", "windows").replace("{arch}", "amd64");
	} else {
		console.error("Unsupported platform");
		Deno.exit(1);
	}
	const zip = await fetch(file).then((res) => {
		if (!res.ok) {
			console.error("Failed to download PocketBase");
			Deno.exit(1);
		}
		return res.arrayBuffer()
	});
	await Deno.writeFile("pocketbase.zip", new Uint8Array(zip));
	await decompress("pocketbase.zip", "pocketbase");
	await Deno.remove("pocketbase.zip");
}
Promise.all([
	Deno.run({
		cmd: ["./pocketbase/pocketbase", "serve"],
		stdout: "inherit",
		stderr: "inherit",
	}).status(),
	dev(import.meta.url, "./main.ts"),
])
