const INTERNAL_KEY = Deno.env.get("INTERNAL_KEY")!;

export const authenticate = (req: Request) => {
	if (!req.headers.has("Authorization")) {
		return false;
	}

	const token = req.headers.get("Authorization")!.split(" ")[1];

	if (token !== INTERNAL_KEY) {
		return false;
	}

	return true;
};

export const rewriteToApi = async (req: Request) => {
	const url = new URL(req.url);

	return await fetch(url.origin + "/api" + url.pathname, {
		headers: req.headers,
		method: req.method,
		body: req.body,
	});
}
