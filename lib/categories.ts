import type { Category } from "@/types/App.ts";

export const CATEGORIES: Category[] = [
	{
		id: "news",
		icon: "newspaper",
		name: "News",
	},
	{
		id: "social",
		icon: "group",
		name: "Social",
	},
	{
		id: "entertainment",
		icon: "movie",
		name: "Entertainment",
	},
	{
		id: "utilities",
		icon: "build",
		name: "Utilities",
	},
	{
		id: "productivity",
		icon: "work",
		name: "Productivity",
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
		id: "development",
		icon: "code",
		name: "Development",
	},
	{
		id: "lifestyle",
		icon: "heart",
		name: "Lifestyle",
	},
];

export const getCategory = (
	categoryId: Category["id"],
): Category | undefined => {
	const foundCategory = CATEGORIES.find((category) =>
		category.id === categoryId
	);

	if (foundCategory) return foundCategory;

	let customCategory = categoryId[0].toUpperCase() + categoryId.slice(1);
	customCategory = customCategory.replace("_", " ");
	customCategory = customCategory.replace("-", " ");

	return {
		icon: "",
		id: categoryId,
		name: customCategory,
	};
};

export const searchCategory = (search: string): Category[] => {
	const searchTerms = search.toLowerCase().split(" ");

	return CATEGORIES.filter((category) => {
		return searchTerms.every((word) =>
			category.name.toLowerCase().includes(word)
		);
	});
};
