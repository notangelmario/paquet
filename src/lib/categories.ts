import type { Category } from "@/types/App.ts";

export const CATEGORY_IDS: string[] = [
	"utilites",
	"games",
	"music",
	"social",
	"development",
	"travel"
]

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

export const getCategory = (categoryId: string): Category | null => {
	return CATEGORIES.find((category) => category.id === categoryId) || null
}