import { Handler } from "@/types/Handler.ts";

const CERTIFICATE_PUBLIC_KEY = Deno.env.get("CERTIFICATE_PUBLIC_KEY")!;

export const handler: Handler = () => {
	return new Response(CERTIFICATE_PUBLIC_KEY, {
		headers: {
			"Content-Type": "text/plain",
		},
	});
}
