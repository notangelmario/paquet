import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState, useEffect } from "preact/hooks";


export interface RequiredAppData {
	id: string,
	name: string,
	icon: string,
	url: string
}


export const useLibrary = () => {
	const [loading, setLoading] = useState(true);
	const [apps, setApps] = useState<RequiredAppData[]>([]);

	useEffect(() => {
		if (IS_BROWSER) {
			setApps(JSON.parse(localStorage.getItem("library") || "{}")?.["apps"] || []);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		if (!Array.isArray(apps)) {
			setApps([]);
		}

		localStorage.setItem("library", JSON.stringify({ apps: apps || [] }));
	}, [apps]);

	return {
		apps,
		setApps,
		loading
	}
}
