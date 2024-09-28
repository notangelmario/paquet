import "dotenv";

export const APP = {
	version: "6.3.0",
	codename: "Gabriela",
	githubRepo: "https://github.com/notangelmario/paquet",
};

export const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");
