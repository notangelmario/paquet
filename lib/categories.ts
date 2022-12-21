import type { Category } from "@/types/App.ts";

export const CATEGORIES = [
	{
		id: "news",
		icon: "news",
		name: "News",
	},
	{
		id: "social",
		icon: "users",
		name: "Social",
	},
	{
		id: "entertainment",
		icon: "movie",
		name: "Entertainment",
	},
	{
		id: "utilities",
		icon: "tool",
		name: "Utilities",
	},
	{
		id: "productivity",
		icon: "briefcase",
		name: "Productivity",
	},
	{
		id: "games",
		icon: "gamepad",
		name: "Games",
	},
	{
		id: "music",
		icon: "music",
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
] as const;

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
