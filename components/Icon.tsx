import type { JSX } from "preact";

export interface Props {
	width?: number;
	height?: number;
	name?: string;
	class?: string;
	inline?: boolean;
	error?: boolean;
}

export default function Icon(props: Props & JSX.IntrinsicElements["img"]) {
	return (
		<img
			{...props}
			class={`w-8 h-8 ${!props.error ? "dark:(filter invert)" : ""} ${
				props.inline ? "inline align-middle" : ""
			} ${props.class || ""}`}
			style={{
				width: props.width,
				height: props.height,
				filter: props.error
					? "invert(30%) sepia(43%) saturate(2843%) hue-rotate(335deg) brightness(105%) contrast(90%)"
					: undefined,
			}}
			src={`/icons/${props.name}.svg`}
		/>
	);
}
