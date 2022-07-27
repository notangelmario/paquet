/**@jsx h */
import { h, type JSX } from "preact";
import { tw } from "@twind";

export type Props = {
	direction?: "horizontal" | "vertical";
};

export default function Stack(props: Props & JSX.IntrinsicElements["div"]) {
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
}