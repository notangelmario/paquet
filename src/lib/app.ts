import { join } from "$std/path/mod.ts";
import { App, AppSchema } from "@/types/App.ts";
import { CATEGORY_IDS } from "@/lib/categories.ts";
import appIndex from "../../apps/index.json" assert { type: "json" };


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

interface GetAppsProps {
	limit?: number;
	category?: string;
	random?: boolean;
}

export const getApps = async (props?: GetAppsProps): Promise<App[] | null> => {
	if (props?.category) {
		if (!CATEGORY_IDS.includes(props.category)) {
			return null;
		}
	}
	const categoryToQuery: keyof typeof appIndex.categories = props?.category as keyof typeof appIndex.categories;

	let apps: App[] = []
	const loopLimit = 
		categoryToQuery 
			? props?.limit 
				? (props.limit > appIndex.categories[categoryToQuery].length) 
					? appIndex.categories[categoryToQuery].length 
					: props.limit
				: appIndex.categories[categoryToQuery].length
			: props?.limit
				? (props.limit > appIndex.all.length) 
					? appIndex.all.length 
					: props.limit
				: appIndex.all.length;



	if (props?.random) {
		for (let i = 0; i < (categoryToQuery ? appIndex.categories[categoryToQuery].length : appIndex.all.length); i++) {
			const app = await getApp(categoryToQuery ? appIndex.categories[categoryToQuery][i] : appIndex.all[i]);

			if (app) {
				apps.push(app);
			}
		}

		shuffleArray(apps);

		apps = apps.slice(0, loopLimit);

	} else {
		for (let i = 0; i < loopLimit; i++) {
			const app = await getApp(categoryToQuery ? appIndex.categories[categoryToQuery][i] : appIndex.all[i]);

			if (app) {
				apps.push(app);
			}
		}
	}

	return apps;
}

// Durstenfeld shuffle
function shuffleArray(array: unknown[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}