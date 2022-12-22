import { getCategory } from "@/lib/categories.ts";
import Button from "@/components/Button.tsx";
import SlideContainer from "@/components/SlideContainer.tsx";
import SlideItem from "@/components/SlideItem.tsx";

interface Props {
	categoryIds: string[];
}

export default function SlideCategories({ categoryIds }: Props) {
	return (
		<SlideContainer class="mt-4">
			{categoryIds.map((categoryId, idx) =>
				getCategory(categoryId)?.id
					? (
						<SlideItem
							isLast={idx ===
								categoryIds.filter((a) => getCategory(a))
									.length}
						>
							<a href={`/category/${categoryId}`}>
								<Button
									outlined
									icon={getCategory(categoryId)?.icon}
								>
									{getCategory(categoryId)?.name}
								</Button>
							</a>
						</SlideItem>
					)
					: null
			)}
		</SlideContainer>
	);
}
