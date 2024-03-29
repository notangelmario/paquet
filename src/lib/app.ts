import "dotenv";

export const APP = {
	version: "6.1.0",
	codename: "Gabriela",
	githubRepo: "https://github.com/roseto/paquet",
	umamiUrl: Deno.env.get("UMAMI_URL"),
	umamiId: Deno.env.get("UMAMI_ID"),
};

export const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");
