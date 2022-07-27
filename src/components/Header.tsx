/**@jsx h */
import { h, type JSX } from "preact";
import { tw } from "@twind";

export default function Header (props: JSX.IntrinsicElements["h1"]) {
	return (
		<h1
			{...props}
			class={`${tw`text-5xl font-light pt-16`} ${props.class || ""}`}
		/>
	);
}
