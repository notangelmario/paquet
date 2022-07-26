/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";

type Props = {
	direction?: "horizontal" | "vertical";
};

const Stack = (props: Props & h.JSX.IntrinsicElements["h1"]) => {
	return (
		<div
			{...props}
			class={`${tw`flex ${
				props.direction === "vertical" ? "flex-row" : "flex-col"
			} gap-y-4`} ${props.class || ""}`}
		>
			{props.children}
		</div>
	);
};

export default Stack;
