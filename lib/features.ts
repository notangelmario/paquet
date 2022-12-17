import type { Feature } from "@/types/App.ts";

export const FEATURES: Feature[] = [
	{
		id: "desktop",
		name: "Desktop optimized",
		icon: "computer",
	},
	{
		id: "mobile",
		name: "Mobile optimized",
		icon: "smartphone",
	},
	{
		id: "offline",
		name: "Works offline",
		icon: "cloud_off",
	},
	{
		id: "auth",
		name: "Requires authentication",
		icon: "lock",
	},
	{
		id: "openSource",
		name: "Open source",
		icon: "code",
	}
];
