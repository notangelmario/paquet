import "dotenv";

export const APP = {
	version: "1.1.4",
	codename: "Andreea",
};

export const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");
