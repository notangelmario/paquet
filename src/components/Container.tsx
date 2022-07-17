/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";

type Props = {
	disableGutters?: boolean;
};

const Container = (props: Props & h.JSX.IntrinsicElements["h1"]) => {
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
