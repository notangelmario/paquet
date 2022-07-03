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
			{...props}
			className={tw`
				${btn} rounded px-8 py-2 bg-primary text-white
				flex flex-row flex-nowrap gap-2 justify-center items-center

				${props.fullWidth ? "w-full" : ""}
				${props.className || ""}
			`}
		>
			{props.icon && 
				<span 
					className={tw`align-middle text-base material-symbols-outlined`}
				>
					{props.icon}
				</span>
			}
			{props.children}
		</button>
	)
}