import "dotenv";

export const APP = {
	version: "4.2.2",
	codename: "Dorina",
	githubRepo: "https://github.com/notangelmario/paquet",
	umamiUrl: Deno.env.get("UMAMI_URL"),
	umamiId: Deno.env.get("UMAMI_ID")
};

export const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");
