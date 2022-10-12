import "dotenv";

export const APP = {
	version: "0.9.0",
	codename: "Rodia",
};

export const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");
