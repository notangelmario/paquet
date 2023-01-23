import { type JSX } from "preact";

export type Props = {
	disableGutters?: boolean;
};

const Container = (props: Props & JSX.IntrinsicElements["h1"]) => {
	return (
		<div
			{...props}
			class={`md:container lg:!max-w-screen-lg
				${!props.disableGutters && "px-4"} 
				${props.class || ""}
			`}
		>
			{props.children}
		</div>
	);
};

export default Container;
