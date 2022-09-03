import { join } from "$std/path/mod.ts";
import { App, AppSchema } from "@/types/App.ts";


export const getApp = async (id: string): Promise<App | null> => {
	try {
		const appContent = await Deno.readTextFile(join("apps", id, "app.json"))
		const app = AppSchema.parse(JSON.parse(appContent));

		return app;
	} catch(e) {
		console.log(e);
		return null;
	}
}