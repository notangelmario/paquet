import { type JSX } from "preact";

type Props = {
	isLast?: boolean;
	snap?: boolean;
	equal?: boolean;
	disableGutters?: boolean;
};

export default function SlideItem(props: Props & JSX.IntrinsicElements["div"]) {
	return (
		<div
			{...props}
			class={`
				${props.isLast ? `${!props.disableGutters ? "!pr-4" : ""} md:pr-0` : ""} 
				${props.equal ? "flex-1" : ""}
				${!props.disableGutters ? "pl-4" : ""}

				${props.class || ""}
			`}
			style={{
				scrollSnapAlign: props.snap ? "start" : undefined,
				...props.style as Record<string, string>,
			}}
		/>
	);
}
