import { Handler } from "@/types/Handler.ts";

export const handler: Handler = () => {
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/home"
		}
	});
}
