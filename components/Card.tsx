import { type JSX } from "preact";

export type Props = {
	disableGutters?: boolean;
} & JSX.IntrinsicElements["div"];

export default function Card(props: Props) {
	return (
		<div
			{...props}
			class={`
				bg-paper-light
				dark:bg-paper-dark
				rounded
				overflow-hidden
				
				${!props.disableGutters && "p-4"}
				${props.class || ""}
			`}
		>
		</div>
	);
}
