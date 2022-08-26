import "dotenv";
import AppDetails from "../../app.json" assert { type: "json" };

export default AppDetails;

export const DEV_MODE = !Deno.env.get("DENO_DEPLOYMENT_ID") || Deno.env.get("DEV_MODE")