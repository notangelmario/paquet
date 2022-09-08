import { type JSX } from "preact";
import { tw } from "@/lib/twind.ts";

export type Props = {
	direction?: "horizontal" | "vertical";
};

export default function Stack(props: Props & JSX.IntrinsicElements["div"]) {
	return (
		<div
			{...props}
			class={`${tw`flex ${
				props.direction === "horizontal" ? "flex-row" : "flex-col"
			} gap-4`} ${props.class || ""}`}
		>
			{props.children}
		</div>
	);
}
