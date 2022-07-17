import { IS_BROWSER } from "$fresh/runtime.ts";

/**
 * Checks if the app is installed.
 * This is to be used on client side.
 * 
 * @param {boolean} [initial] Initial value passed from {@link useInstalledServerSide}
 * @returns Whether the app is installed or not
 */
export const useInstalled = (initial?: boolean): boolean => {
	if (initial !== undefined && !IS_BROWSER) {
		return initial;
	}

	return IS_BROWSER &&
		globalThis.matchMedia("(display-mode: standalone)").matches;
};

/**
 * Check if the app is installed.
 * This is to be used on server side.
 * This is less precise since it only checks search params.
 * 
 * @param req Request object
 * @returns Whether the app is installed or not
 */
export const useInstalledServerSide = (req: Request): boolean => {
	const searchParams = new URLSearchParams(req.url.split("?")[1]);

	return searchParams.get("utm_source") === "pwa";
};
