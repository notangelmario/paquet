import type { Category } from "@/types/App.ts";

export const CATEGORIES: Category[] = [
	{
		id: "utilities",
		icon: "build",
		name: "Utilities",
	},
	{
		id: "games",
		icon: "videogame_asset",
		name: "Games",
	},
	{
		id: "music",
		icon: "music_note",
		name: "Music",
	},
	{
		id: "social",
		icon: "group",
		name: "Social",
	},
	{
		id: "development",
		icon: "code",
		name: "Development",
	},
	{
		id: "travel",
		icon: "flight",
		name: "Travel",
	},
];

export const getCategory = (
	categoryId: Category["id"],
): Category | undefined => {
	return CATEGORIES.find((category) => category.id === categoryId);
};
