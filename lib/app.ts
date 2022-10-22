import "dotenv";

export const APP = {
	version: "0.10.3",
	codename: "Rodia",
};

export const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");