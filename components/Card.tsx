import { type JSX } from "preact";

export type Props = {
	disableGutters?: boolean;
};

export default function Card(props: Props & JSX.IntrinsicElements["div"]) {
	return (
		<div
			class={`
				bg-paper-light
				dark:bg-paper-dark
				rounded
				
				${!props.disableGutters && "p-4"}
				${props.class || ""}
			`}
		>
			{props.children}
		</div>
	);
}
