import { type JSX } from "preact";

export type Props = {
	direction?: "horizontal" | "vertical";
};

export default function Stack(props: Props & JSX.IntrinsicElements["div"]) {
	return (
		<div
			{...props}
			class={`
				flex
				gap-4
				${props.direction === "horizontal" ? "flex-row" : "flex-col"}
				${props.class || ""}
			`}
		>
			{props.children}
		</div>
	);
}
