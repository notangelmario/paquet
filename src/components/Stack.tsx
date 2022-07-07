/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";


const Stack = (props: h.JSX.IntrinsicElements["h1"]) => {
	return (
		<div
			{...props}
			class={`${tw`flex flex-col gap-y-2`} ${props.class || ""}`}
		>
			{props.children}
		</div>
	)
}

export default Stack;