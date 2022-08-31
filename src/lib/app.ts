import "dotenv";

export const APP = {
	version: "0.7.1",
	codename: "Rodia",
};

export const DEV_MODE = !Deno.env.get("DENO_DEPLOYMENT_ID") ||
	Deno.env.get("DEV_MODE");
