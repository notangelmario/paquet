import { type JSX } from "preact";

export type Props = {
	disableGutters?: boolean;
	inset?: boolean;
} & JSX.IntrinsicElements["div"];

export default function Card(props: Props) {
	return (
		<div
			{...props}
			class={`
				relative
				rounded
				overflow-hidden
				border border-light-dark dark:border-dark-light
				${
				props.inset
					? "shadow-inset-light dark:shadow-inset-dark"
					: "shadow-outset-light dark:shadow-outset-dark"
			}
				grainy

				${!props.disableGutters && "p-4"}
				${props.class || ""}
			`}
		>
			{props.children}
		</div>
	);
}
