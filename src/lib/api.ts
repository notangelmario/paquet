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
