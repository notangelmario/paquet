// @deno-types="pocketbase-types"
import PocketBase from "pocketbase";


const DEV = Deno.env.get("DENO_DEPLOYMENT_ID") === undefined;
export const pocketbase = new PocketBase(DEV ? "http://localhost:8090" : "https://pocketbase.io");
