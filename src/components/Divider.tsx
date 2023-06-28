import type { JSX } from "preact";

export type Props = {
	inset?: boolean;
};

export default function Divider(props: Props & JSX.IntrinsicElements["hr"]) {
	return (
		<hr
			{...props}
			class={`
				border-t-1 border-dark-light border-opacity-25
				dark:(border-light-dark border-opacity-25)
				${props.inset ? "mx-4" : ""}
				${props.class || ""}
			`}
		/>
	);
}
