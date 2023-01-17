import "dotenv";

export const APP = {
	version: "2.1.1",
	deno: Deno.version.deno,
	codename: "Bianca",
};

export const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");
