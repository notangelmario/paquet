/**@jsx h */
import { h, type JSX } from "preact";
import { tw } from "@twind";
import { btn } from "@/utils/sharedUi.ts";

export type Props = {
	icon?: string;
	brand?: boolean;
	fullWidth?: boolean;
	children?: string;
	outlined?: boolean;
	red?: boolean;
};

export default function Button(props: Props & JSX.IntrinsicElements["button"]) {
	return (
		<button
			{...props}
			class={tw`
				${!props.disabled && btn}
				rounded px-8 py-2
				${props.red ? "border-red-500" : "border-current"}
				
				${
				props.outlined
					? `bg-transparent border ${props.red ? "text-red-500" : "text-current"}`
					: `${props.red ? "bg-red-500" : "bg-primary"} text-white`
			}
				flex flex-row flex-nowrap gap-2 justify-center items-center
				
				${props.disabled ? "opacity-25 cursor-not-allowed" : ""}

				${props.fullWidth ? "w-full" : ""}
				${props.class || ""}
			`}
		>
			{props.icon &&
				<span
					class={tw
						`align-middle text-base material-symbols-outlined`}
				>
					{props.icon}
				</span>
			}
			{props.children}
		</button>
	);
}
