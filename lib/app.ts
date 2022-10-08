import "dotenv";

export const APP = {
	version: "0.8.0",
	codename: "Rodia",
};

export const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");
