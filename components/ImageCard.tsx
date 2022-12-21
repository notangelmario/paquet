import type { JSX } from "preact";
import Card from "./Card.tsx";

interface Props {
	image: string;
}

export default function ImageCard(props: Props & JSX.IntrinsicElements["div"]) {
	return (
		<Card class="relative">
			<img
				src={props.image}
				class="absolute top-0 left-0 w-full h-full opacity-30 object-cover"
			/>
			<div
				class={`relative min-w-max min-h-max ${props.class || ""}`}
			>
				{props.children}
			</div>
		</Card>
	);
}
