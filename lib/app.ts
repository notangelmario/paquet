import "dotenv";

export const APP = {
	version: "0.10.13",
	codename: "Rodia",
};

export const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");
