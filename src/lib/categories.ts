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
		aliases: ["chat", "messenger", "messaging"],
	},
	{
		id: "entertainment",
		icon: "movie",
		name: "Entertainment",
		aliases: ["music", "video", "movies", "tv", "streaming"],
	},
	{
		id: "utilities",
		icon: "tool",
		name: "Utilities",
		aliases: ["tool", "tools", "utility"],
	},
	{
		id: "productivity",
		icon: "briefcase",
		name: "Productivity",
		aliases: ["work", "business", "office"],
	},
	{
		id: "games",
		icon: "gamepad",
		name: "Games",
		aliases: ["game", "gaming"],
	},
	{
		id: "music",
		icon: "music",
		name: "Music",
		aliases: ["audio", "sound"],
	},
	{
		id: "development",
		icon: "code",
		name: "Development",
		aliases: [
			"code",
			"coding",
			"program",
			"programming",
			"developer",
			"developers",
		],
	},
	{
		id: "lifestyle",
		icon: "heart",
		name: "Lifestyle",
		aliases: ["photo", "travel", "trip", "health"],
	},
];

export const getCategory = (
	categoryId: Category["id"],
): Category | undefined => {
	const foundCategory = CATEGORIES.find((category) =>
		category.id === categoryId || category?.aliases?.includes(categoryId)
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
