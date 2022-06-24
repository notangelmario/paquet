import type { Category } from "../types/Category";

export const categories: Category[] = [
	{
		id: "social",
		name: "Social"
	},
	{
		id: "music",
		name: "Music"
	},
	{
		id: "videos",
		name: "Videos"
	},
	{
		id: "tools",
		name: "Tools"
	}
];

export const getCategory = (id: string) => {
	if (categories.find((value) => value.id === id)) {
		return categories.find((value) => value.id === id)?.name;
	} else {
		return id[0].toUpperCase() + id.slice(1)
	}
}