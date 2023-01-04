import "dotenv";
import { exec } from "https://deno.land/x/execute@v1.1.0/mod.ts";

export const APP = {
	version: "bf3e778",
	codename: "Bianca",
};

export const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");
