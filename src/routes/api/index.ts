import { Handler } from "@/types/Handler.ts";

const region = Deno.env.get("DENO_REGION") || "localhost";

export const handler: Handler = () => {
	return new Response("Hello World from " + region + "!\n");
};
