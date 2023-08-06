import { MiddlewareHandlerContext } from "$fresh/src/server/types.ts";

export const handler = [handleKVInsightsAuthorization];

const INTERNAL_KEY = Deno.env.get("INTERNAL_KEY");

function handleKVInsightsAuthorization(
	request: Request,
	context: MiddlewareHandlerContext,
) {
	const authorizationValue = request.headers.get("Authorization");
	if (authorizationValue) {
		const basicUserPasswordMatch = authorizationValue.match(
			/^Basic\s+(.*)$/,
		);
		if (basicUserPasswordMatch) {
			const [user, password] = atob(basicUserPasswordMatch[1]).split(":");
			if (user === "paquet" && password === INTERNAL_KEY) {
				return context.next();
			}
		}
	}

	return new Response("401 Unauthorized", {
		status: 401,
		statusText: "Unauthorized",
		headers: {
			"www-authenticate": `Basic realm="yourrealm"`,
		},
	});
}
