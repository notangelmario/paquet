/**@jsx h */
import { h, type JSX } from "preact";
import { tw } from "@/lib/twind.ts";

export type Props = {
	disableGutters?: boolean;
};

const Container = (props: Props & JSX.IntrinsicElements["h1"]) => {
	return (
		<div
			{...props}
			class={`${tw`md:container

				${!props.disableGutters && "px-4"}`} 
				${props.class || ""}
			`}
		>
			{props.children}
		</div>
	);
};

export default Container;
