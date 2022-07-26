/**@jsx h */
import { cloneElement, h, type JSX, toChildArray, VNode } from "preact";
import { tw } from "@twind";

type Props = {
	snap?: boolean;
};

export default function SlideContainer(
	props: Props & JSX.IntrinsicElements["div"],
) {
	return (
		<div
			{...props}
			class={tw`flex flex-row overflow-x-scroll md:container ${
				props.class || ""
			}`}
			style={{
				...props.style as Record<string, string>,
				scrollSnapType: props.snap ? "x mandatory" : undefined,
			}}
		>
			{toChildArray(props.children).map((child) => (
				cloneElement(child as VNode, { snap: props.snap })
			))}
		</div>
	);
}
