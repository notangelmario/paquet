import type { Feature } from "@/types/App.ts";

export const FEATURES: Feature[] = [
	{
		id: "desktop",
		name: "Desktop optimized",
		icon: "laptop",
	},
	{
		id: "mobile",
		name: "Mobile optimized",
		icon: "mobile",
	},
	{
		id: "offline",
		name: "Works offline",
		icon: "cloud-off",
	},
	{
		id: "auth",
		name: "Requires authentication",
		icon: "lock",
	},
	{
		id: "openSource",
		name: "Open source",
		icon: "source-code",
	},
];
