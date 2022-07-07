import { IS_BROWSER } from "$fresh/runtime.ts"


export const useInstalled = (initial?: boolean): boolean => {
	if (initial !== undefined && !IS_BROWSER) {
		return initial;
	}

	return IS_BROWSER && window.matchMedia("(display-mode: standalone)").matches;
}

export const useInstalledServerSide = (req: Request): boolean => {
	let searchParams = new URLSearchParams(req.url.split("?")[1]);
	  
	return searchParams.get("utm_source") === "pwa";
}