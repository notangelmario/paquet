import { Handler } from "$fresh/server.ts";
import { signOut } from "deno-kv-oauth";

export const handler: Handler = async (req) => {
	return await signOut(req, "/home");
};
