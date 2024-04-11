import type { JSX } from "preact";
import Icon, { Props as IconProps } from "@/components/Icon.tsx";

export interface ButtonProps {
	icon?: string;
	iconProps?: IconProps;
	fullWidth?: boolean;
	variant?: "outset" | "primary" | "secondary" | "error" | "outlined";
}

const _variants = {
	"outset": "btn-outset",
	"primary": "btn-primary",
	"secondary": "btn-secondary",
	"error": "btn-error",
	"outlined": "btn-outlined",
}

export default function Button(
	props: ButtonProps & JSX.IntrinsicElements["button"],
) {

	return (
		<button
			{...props}
			class={`
				btn-${props.variant || "outset"}
				relative rounded px-8 py-2 text-base
				${props.variant === "error" ? "border-error" : "border-current"}
				
				${
				props.variant === "outlined"
					? "btn bg-transparent border text-current"
					: ""
			}
				flex flex-row flex-nowrap gap-2 justify-center items-center
				
				${props.fullWidth ? "w-full" : ""}
				${props.class || ""}
			`}
		>
			{props.icon &&
				(
					<Icon
						name={props.icon}
						size={18}
						inline
						{...props.iconProps}
					/>
				)}
			{props.children}
		</button>
	);
}
