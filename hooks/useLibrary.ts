import { useEffect, useState } from "preact/hooks";
import { getPocketbase } from "@/lib/pocketbase-client.ts";
import { RecordPocket } from "../lib/pocketbase.ts";

export interface RequiredAppData {
	id: string;
	name: string;
	icon: string;
	author: string;
	url: string;
}

export const useLibrary = (ssrApps?: RequiredAppData[]) => {
	const pocketbase = getPocketbase();
	const [loading, setLoading] = useState(true);
	const [apps, setAppsRaw] = useState<RequiredAppData[]>(ssrApps || []);

	useEffect(() => {
		(async () => {
			const user = pocketbase.authStore.model;

			if (!user) {
				setLoading(false);
				return;
			}

			const userRecord = await pocketbase.collection("users")
					.getOne(user.id, { expand: "library" });

			if (userRecord) {
				setAppsRaw(userRecord.expand.library.map((app: RecordPocket) => ({
					...app,
					icon: pocketbase.getFileUrl(app, app.icon, { thumb: "48x48" })
				})) || []);
			}

			setLoading(false);
		})();
	}, []);

	const setApps = async (apps: RequiredAppData[]) => {
		const user = pocketbase.authStore.model;

		if (!user) {
			return;
		}

		try {
			await pocketbase.collection("users")
				.update(user.id, { library: apps.map((app) => app.id) });

			setAppsRaw(apps);
		} catch (err) {
			console.error(err);
		}
	};

	return {
		apps,
		setApps,
		loading,
	};
};
