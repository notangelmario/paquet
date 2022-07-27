/**@jsx h */
import { h, type JSX } from "preact";
import { tw } from "@twind";

export type Props = {
	disableGutters?: boolean;
};

export default function Card(props: Props & JSX.IntrinsicElements["div"]) {
	return (
		<div
			class={`${tw`
					bg-paper-light
					dark:bg-paper-dark
					${!props.disableGutters && "p-4"}
					rounded
				`} 
				${props.class || ""}
			`}
		>
			{props.children}
		</div>
	);
}
