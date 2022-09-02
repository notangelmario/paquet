import { IS_BROWSER } from "$fresh/runtime.ts";

export const useInstalled = (): boolean => {
	return IS_BROWSER && globalThis.matchMedia("(display-mode: standalone)").matches;
};