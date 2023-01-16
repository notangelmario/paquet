// @deno-types="pocketbase-types"
import PocketBase from "pocketbase";
import { IS_BROWSER } from "$fresh/runtime.ts";

const DEV = IS_BROWSER && window.location.hostname === "localhost";
export const pocketbase = new PocketBase(DEV ? "http://localhost:8090" : "https://pocketbase.io");

export const AuthMethodNames = new Map<string, string>([
	["google", "Google"],
	["facebook", "Facebook"],
	["twitter", "Twitter"],
	["github", "GitHub"],
	["gitlab", "GitLab"],
	["microsof", "Microsoft"],
]);

