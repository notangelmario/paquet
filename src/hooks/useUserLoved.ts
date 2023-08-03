import { useEffect, useState } from "preact/hooks";

export interface RequiredAppData {
	id: string;
	name: string;
	icon: string;
	author: string;
	url: string;
}

export const useUserLoved = (ssrApps?: RequiredAppData[]) => {
	const [loading, setLoading] = useState(true);
	const [apps, setAppsRaw] = useState<RequiredAppData[]>(ssrApps || []);

	const setApps = async (apps: RequiredAppData[]) => {
	};

	return {
		apps,
		setApps,
		loading,
	};
};
