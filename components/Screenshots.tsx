import SlideContainer from "./SlideContainer.tsx";
import SlideItem from "./SlideItem.tsx";


interface Props {
	screenshots: string[],
	class: string
}

export default function Screenshots(props: Props) {
	return (
		<SlideContainer
			snap
			class={props.class}
		>
			{props.screenshots.map((screenshot, idx) => (
				<SlideItem
					key={idx}
					isLast={props.screenshots && idx === props.screenshots.length - 1}
				>
					<img
						class="max-w-2xl h-64"
						src={screenshot}
					/>
				</SlideItem>
			))}
		</SlideContainer>
	)
}