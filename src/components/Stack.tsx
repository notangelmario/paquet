/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";


const Stack = (props: h.JSX.IntrinsicElements["h1"]) => {
	return (
		<div
			{...props}
			className={`${tw`flex flex-col gap-y-4`} ${props.className || ""}`}
		>
			{props.children}
		</div>
	)
}

export default Stack;