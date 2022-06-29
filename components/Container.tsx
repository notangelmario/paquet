/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";


const Container = (props: h.JSX.IntrinsicElements["h1"]) => {
	return (
		<div
			{...props}
			className={`${tw`md:container px-4`} ${props.className}`}
		>
			{props.children}
		</div>
	)
}

export default Container;