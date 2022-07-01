/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { btn } from "../utils/ui.ts";

type Props = {
	icon?: string;
	fullWidth?: boolean;
	children?: any
}

export default function Button(props: Props & h.JSX.IntrinsicElements["button"]) {
	return (
		<button
			className={tw`
				${btn} block rounded px-8 py-2 bg-primary text-white 

				${props.fullWidth ? "w-full" : ""}
				${props.className || ""}
			`}
			{...props}
		>
			{props.icon && 
				<span 
					className={tw`align-middle mr-2 text-base material-symbols-outlined`}
				>
					{props.icon}
				</span>
			}
			{props.children}
		</button>
	)
}