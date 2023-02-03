import SlideContainer from "@/components/SlideContainer.tsx";
import SlideItem from "@/components/SlideItem.tsx";

interface Props {
	screenshots: string[];
	class: string;
}

export default function Screenshots(props: Props) {
	return (
		<SlideContainer
			class={props.class}
		>
			{props.screenshots.map((screenshot, idx) => (
				<SlideItem
					key={idx}
					isLast={props.screenshots &&
						idx === props.screenshots.length - 1}
				>
					<img
						class="max-w-2xl max-h-96"
						src={screenshot}
					/>
				</SlideItem>
			))}
		</SlideContainer>
	);
}
