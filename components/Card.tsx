import { type JSX } from "preact";

export type Props = {
	disableGutters?: boolean;
};

export default function Card(props: Props & JSX.IntrinsicElements["div"]) {
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
		></div>
	);
}
