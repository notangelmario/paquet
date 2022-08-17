/**@jsx h */
import { h, type JSX } from "preact";
import { tw } from "@twind";

export type Props = {
	icon?: string
}

export default function Header(props: Props & JSX.IntrinsicElements["h1"]) {
	return (
		<h1
			{...props}
			class={`${tw`text-5xl font-light pt-16`} ${props.class || ""}`}
		>
			{props.icon &&
					<span
						class={tw`material-symbols-outlined !text-5xl !align-bottom mr-1`}
					>
						{props.icon}
					</span>
			}
			{props.children}
		</h1>
	);
}
