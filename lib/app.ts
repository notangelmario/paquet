import "dotenv";
import { exec } from "https://deno.land/x/execute@v1.1.0/mod.ts";



export const APP = {
	version: await exec("git rev-parse --short HEAD"),
	codename: "Bianca",
};

export const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");
