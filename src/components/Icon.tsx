/**@jsx h */
import { h } from "preact"
import { tw } from "@/lib/twind.ts";

export interface Props {
	width?: number;
	height?: number;
	name?: string;
	class?: string;
	inline?: boolean
}

export default function Icon(props: Props) {
	return (
		<img
			class={tw`w-8 h-8 dark:(filter invert) ${props.inline ? "inline align-middle" : ""} ${props.class || ""}`}
			style={{
				width: props.width,
				height: props.height
			}}
			src={`/icons/${props.name}.svg`}
		/>
	)
}