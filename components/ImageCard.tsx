import type { JSX } from "preact";
import Card from "./Card.tsx";

interface Props {
	image: string;
}

export default function ImageCard(props: Props & JSX.IntrinsicElements["div"]) {
	<Card
		{...props}
		class={`relative ${props.class || ""}`}
	>
		<img 
			src={props.image}
			class="absolute top-0 left-0 w-full h-full opacity-50"
		/>
		{props.children}
	</Card>
}